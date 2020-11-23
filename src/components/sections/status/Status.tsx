import React, { FC, useEffect } from "react"

import { Box } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { BiTachometer } from "react-icons/bi"
import { FiSquare } from "react-icons/fi"
import { RiRefreshLine } from "react-icons/ri"
import { WiStrongWind } from "react-icons/wi"

import useAdjustMachine from "../../../hooks/useAdjustMachine"
import useHeaters from "../../../hooks/useHeaters"
import usePrinter from "../../../hooks/usePrinter"
import { usePrinterReady } from "../../../hooks/usePrinterInfo"
import { useSpeedsAndFeeds } from "../../../hooks/usePrinterStatus"
import Nozzle from "../../../icons/Nozzle"
import Adjust from "../../adjust"
import Rate from "../../rate"
import Temperature from "../../temperature"

const Status: FC = () => {
	const { printerReady } = usePrinterReady()
	const { isAdjusting, adjustContext, closeAdjust } = useAdjustMachine()

	useEffect(() => {
		if (!printerReady) {
			closeAdjust()
		}
	}, [printerReady, closeAdjust])

	// console.info("status")

	return (
		<StatusWrapper>
			{isAdjusting && (
				<StatusAdjust {...adjustContext.props} onCancel={closeAdjust} />
			)}

			<HeatersStatus />
			<SpeedsAndFeedsStatus />
		</StatusWrapper>
	)
}

const HeatersStatus: FC = () => {
	const printer = usePrinter()
	const { printerReady } = usePrinterReady()
	const heaters = useHeaters()
	const { adjustContext, closeAdjust, createSendAdjust } = useAdjustMachine()

	const handleExtruderTemp = (extruder: number) => (temperature: number) => {
		printer.extruderTemperature(temperature, extruder)
		closeAdjust()
	}

	const handleBedTemp = (temperature: number) => {
		printer.bedTemperature(temperature)
		closeAdjust()
	}

	const statusItemDisabled = (id: string) =>
		!printerReady || (!!adjustContext.id && adjustContext.id !== id)

	console.info("heaters")

	if (heaters) {
		return (
			<StatusRow>
				{heaters.extruders.map((heater, extruder) => (
					<Temperature
						key={heater.id}
						mt={1}
						icon={Nozzle}
						current={heater.temperature}
						min={20}
						max={260}
						target={heater.target}
						isDisabled={statusItemDisabled(heater.id)}
						onClick={createSendAdjust(heater.id, {
							// extruder or array index, same difference
							onSubmit: handleExtruderTemp(extruder),
							min: 180,
							max: 300,
							placeholder: heater.target,
						})}
					/>
				))}

				{heaters.beds.map((heater) => (
					<Temperature
						key={heater.id}
						mt={1}
						icon={FiSquare}
						current={heater.temperature}
						min={20}
						max={100}
						target={heater.target}
						isDisabled={statusItemDisabled(heater.id)}
						onClick={createSendAdjust(heater.id, {
							onSubmit: handleBedTemp,
							min: 20,
							max: 123,
							placeholder: heater?.target,
						})}
					/>
				))}
			</StatusRow>
		)
	}

	return <></>
}

const SpeedsAndFeedsStatus: FC = () => {
	const printer = usePrinter()
	const { printerReady } = usePrinterReady()
	const { speed_factor, extrude_factor, fan_speed } = useSpeedsAndFeeds()
	const { adjustContext, closeAdjust, createSendAdjust } = useAdjustMachine()

	const handleFeedRate = (rate: number) => {
		printer.feedRate(rate)
		closeAdjust()
	}

	const handleFlowRate = (rate: number) => {
		printer.flowRate(rate)
		closeAdjust()
	}
	const handleFanSpeed = (speed: number) => {
		printer.fanSpeed(speed)
	}

	const statusItemDisabled = (id: string) =>
		!printerReady || (!!adjustContext.id && adjustContext.id !== id)

	console.info("speeds")

	if (!speed_factor || !extrude_factor) {
		return <></>
	}

	return (
		<StatusRow>
			<Rate
				icon={BiTachometer}
				highlight="lightsalmon"
				rate={speed_factor}
				nominal={1}
				isDisabled={statusItemDisabled("speed")}
				onClick={createSendAdjust("speed", {
					onSubmit: handleFeedRate,
					max: 200,
					placeholder: speed_factor * 100,
				})}
			/>

			<Rate
				icon={WiStrongWind}
				highlight="cadetblue"
				rate={extrude_factor}
				nominal={1}
				isDisabled={statusItemDisabled("extrude")}
				onClick={createSendAdjust("extrude", {
					onSubmit: handleFlowRate,
					max: 200,
					placeholder: extrude_factor * 100,
				})}
			/>

			<Rate
				icon={RiRefreshLine}
				highlight="cornflowerblue"
				rate={fan_speed}
				nominal={0}
				isDisabled={statusItemDisabled("fan")}
				onClick={createSendAdjust("fan", {
					onChange: handleFanSpeed,
					max: 100,
					placeholder: (fan_speed * 100).toFixed(0),
				})}
			/>
		</StatusRow>
	)
}

const StatusWrapper = styled(Box)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;

	width: 100%;

	margin-top: ${(props: any) => props.theme.sizes[1]};
`

const StatusRow = styled.div`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	width: 100%;

	gap: ${(props: any) => props.theme.sizes[1]};

	margin-top: ${(props: any) => props.theme.sizes[1]};

	z-index: 100;
`

const StatusAdjust = styled(Adjust)`
	position: absolute;

	top: 0;
	height: 100%;
	left: 0;
	right: 0;

	padding: ${(props) => props.theme.sizes[4]}
		${(props) => props.theme.sizes[1]} 0;

	z-index: 10;
`

export default Status
