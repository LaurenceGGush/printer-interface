import React, { FC, useCallback, useEffect, useState } from "react"

import { Box, Flex, useColorModeValue, useTheme } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { BiCircle } from "react-icons/bi"
import { IoMdWifi } from "react-icons/io"
import { RiKeyboardLine } from "react-icons/ri"

import Knob from "../knob"
import NumberPad from "../numberpad"
import PushButtonGroup from "../pushButtons"
import Slide from "../slide"

export interface AdjustProps {
	placeholder?: number
	min?: number
	max?: number
	onChange?: (value: number) => void
	onSubmit?: (value: number | null) => void
	onCancel: () => void
}
const Adjust: FC<AdjustProps> = ({
	placeholder = 0,
	min = 0,
	max = 100,
	onChange,
	onSubmit,
	onCancel,
	...rest
}) => {
	const [value, setValue] = useState<number>()
	const [adjuster, setAdjuster] = useState("slide")
	const theme = useTheme()

	useEffect(() => {
		if (typeof value === "number" && typeof onChange === "function") {
			onChange(value)
		}
	}, [onChange, value])

	const setMmValue = useCallback(
		(arg?: number | Function) => {
			setValue((currentValue) => {
				let newValue = arg
				if (typeof arg === "function") {
					newValue = arg(currentValue)
				}

				if (typeof newValue !== "number") {
					return
				}

				return Math.min(max, Math.max(min, newValue))
			})
		},
		[max, min],
	)

	const setMValue = useCallback(
		(arg?: number | Function) => {
			setValue((currentValue) => {
				const newValue =
					typeof arg === "function" ? arg(currentValue) : arg

				if (typeof newValue !== "number") {
					return
				}

				return Math.min(max, newValue)
			})
		},
		[max],
	)

	const handleTick = () => {
		onSubmit && onSubmit(value || null)
	}

	const background = useColorModeValue("white", theme.colors.gray[800])

	const adjustProps = {
		placeholder,
		value,
		setValue: setMmValue,
		handleTick,
		handleCancel: onCancel,
	}

	const adjustOptions = [
		{ icon: IoMdWifi, value: "slide" },
		{ icon: BiCircle, value: "knob" },
	]
	if (!onChange) {
		adjustOptions.push({ icon: RiKeyboardLine, value: "pad" })
	}

	console.info("adjust")

	return (
		<AdjustWrapper bg={background} {...rest}>
			{adjuster === "slide" && (
				<Slide
					min={min}
					max={max}
					updateOnChange={typeof onChange === "function"}
					{...adjustProps}
				/>
			)}

			{adjuster === "knob" && <Knob {...adjustProps} />}

			{adjuster === "pad" && (
				<NumberPad
					placeholder={placeholder}
					value={value}
					setValue={setMValue}
					handleTick={handleTick}
					handleCancel={onCancel}
					{...rest}
				/>
			)}

			<Flex justifyContent="center">
				<PushButtonGroup
					size="sm"
					options={adjustOptions}
					value={adjuster}
					updateValue={setAdjuster}
				/>
			</Flex>
		</AdjustWrapper>
	)
}

const AdjustWrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: space-between;
`

export default Adjust
