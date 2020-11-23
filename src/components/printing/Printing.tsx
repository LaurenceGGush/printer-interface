import React, { FC } from "react"

import {
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	IconButton,
	Image,
	Tag,
	TagLabel,
	TagLeftIcon,
	useColorModeValue,
} from "@chakra-ui/react"
import styled from "@emotion/styled"
import { CgArrowLongUpL, CgTime } from "react-icons/cg"
import { IoIosPause, IoIosPlay, IoIosPower, IoMdReorder } from "react-icons/io"

import usePrinter from "../../hooks/usePrinter"
import {
	useActiveExtruder,
	usePrintingOrPaused,
} from "../../hooks/usePrinterStatus"
import usePrintStats from "../../hooks/usePrintStats"
import Spinner from "../spinner"

const Printing = () => {
	const printer = usePrinter()
	const { paused, printingOrPaused } = usePrintingOrPaused()
	const currentExtruder = useActiveExtruder()

	const {
		filename,
		freindlyname,
		thumb,
		layers,
		layer,
		object_height,
		print_height,
		progress,
		elapsed,
		remaining,
		first_layer_bed_temp,
		first_layer_extr_temp,
	} = usePrintStats()

	const handlePreheat = () => {
		printer.bedTemperature(first_layer_bed_temp)
		printer.extruderTemperature(first_layer_extr_temp, currentExtruder)
	}

	if (!filename || !object_height) {
		return (
			<Spinner
				thickness="0.125em"
				color="gray.700"
				emptyColor="gray.300"
				speed="2.5s"
			/>
		)
	}

	return (
		<>
			{printingOrPaused ? (
				<>
					<Progress value={progress * 100} />

					<PlayPause>
						<IconButton
							aria-label="button"
							icon={<IoIosPause />}
							onClick={() => printer.pause()}
							disabled={paused}
						/>
						<IconButton
							aria-label="button"
							icon={<IoIosPlay />}
							onClick={() => printer.resume()}
							disabled={!paused}
						/>
						<IconButton
							aria-label="button"
							icon={<IoIosPower />}
							onClick={() => printer.cancel()}
							disabled={!paused}
						/>
					</PlayPause>
				</>
			) : (
				<Flex justifyContent="space-between">
					<IconButton
						aria-label="button"
						icon={<IoIosPlay />}
						onClick={() => printer.start(filename)}
						disabled={printingOrPaused}
					/>

					<IconButton
						aria-label="button"
						icon={<IoIosPower />}
						onClick={printer.unLoadGcode}
						disabled={printingOrPaused}
					/>
				</Flex>
			)}

			<File>{freindlyname}</File>

			<Flex justifyContent="space-between">
				<Box maxWidth="50%">
					<StatTag>
						<StatTagLeftIcon as={IoMdReorder} />
						<TagLabel>{`${layer}/${layers}`}</TagLabel>
					</StatTag>

					<StatTag>
						<StatTagLeftIcon as={CgArrowLongUpL} />
						<TagLabel>
							{`${print_height.toFixed(2)}`}/
							{`${object_height.toFixed(0)}mm`}
						</TagLabel>
					</StatTag>

					<TimeTag time={elapsed} />
					<TimeTag time={remaining} />
				</Box>

				{thumb && (
					<PrintImage src={`data:image/jpg;base64,${thumb.data}`} />
				)}
			</Flex>

			{!printingOrPaused && (
				<Button mt={2} size="sm" onClick={handlePreheat}>
					B-{first_layer_bed_temp} E{currentExtruder}-
					{first_layer_extr_temp}
				</Button>
			)}
		</>
	)
}

interface ProgressProps {
	value: number
}
const Progress: FC<ProgressProps> = ({ value, ...rest }) => {
	const trackColor = useColorModeValue("grey.100", "whiteAlpha.300")

	return (
		<CircularProgress
			trackColor={trackColor}
			size={10}
			value={value}
			{...rest}
		>
			{!!value && (
				<CircularProgressLabel fontSize="0.75rem">
					{value.toFixed(0)}
				</CircularProgressLabel>
			)}
		</CircularProgress>
	)
}

const PlayPause = styled.div`
	float: right;

	button {
		margin-right: ${(props) => props.theme.sizes[1]};
	}
`

interface TimeTagProps {
	time: Date
}
const TimeTag: FC<TimeTagProps> = ({ time }) => (
	<StatTag>
		<StatTagLeftIcon as={CgTime} />
		<TagLabel>
			{`${time
				.getUTCHours()
				.toString()
				.padStart(1, "0")}h ${time
				.getUTCMinutes()
				.toString()
				.padStart(1, "0")}m`}
		</TagLabel>
	</StatTag>
)

const StatTag = styled(Tag)`
	white-space: nowrap;
	padding-left: ${(props) => props.theme.sizes[2]};
	padding-right: ${(props) => props.theme.sizes[2]};
	margin-top: ${(props) => props.theme.sizes[1]};
	margin-right: ${(props) => props.theme.sizes[1]};
`

const StatTagLeftIcon = styled(TagLeftIcon)`
	margin-right: ${(props) => props.theme.sizes[1]};
`

const File = styled(Tag)`
	display: inline-block;
	width: 100%;
	line-height: 1.6;
	margin-top: ${(props) => props.theme.sizes[1]};

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const PrintImage = styled(Image)`
	background: ${(props) => props.theme.colors.gray[200]};
	border-radius: ${(props) => props.theme.sizes[1]};
	margin-top: ${(props) => props.theme.sizes[1]};

	align-self: flex-start;
`

export default Printing
