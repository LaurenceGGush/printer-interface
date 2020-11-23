import React, { FC } from "react"

import {
	Tag,
	TagLabel,
	TagLeftIcon,
	TagProps,
	useColorMode,
	useColorModeValue,
	useTheme,
} from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { IoIosFlame } from "react-icons/io"
import { IconType } from "react-icons/lib"

import Nozzle from "../../icons/Nozzle"
import blend from "../../utilities/blendHexColours"

const outsideTargetRange = (current: number, target: number) =>
	current < target - 1 || current > target + 1

const temperatureColour = (current: number, min: number, max: number) => {
	const factor = Math.min(1, Math.max(0.0001, (current - min) / (max - min)))
	const blue = "#3af"
	const coral = "#ff5252"

	const blended = blend(blue, coral, factor)
	const lightened = blend(blended, "#fff", 0.2)

	return lightened
}

export interface TemperatureProps extends TagProps {
	icon: IconType | typeof Nozzle
	current: number
	min: number
	max: number
	target: number
	isDisabled?: boolean
}
const Temperature: FC<TemperatureProps> = ({
	icon = IoIosFlame,
	current = 0,
	min = 0,
	max = 300,
	target = 0,
	isDisabled,
	...rest
}) => {
	const theme = useTheme()
	const { colorMode } = useColorMode()

	const backgroundColour = useColorModeValue(
		theme.colors.gray[100],
		theme.colors.gray[700],
	)

	let highlight = useColorModeValue(
		theme.colors.gray[300],
		theme.colors.gray[600],
	)
	if (current > 30 || target) {
		highlight = temperatureColour(current, min, max)
	}

	return (
		<TemperatureWrapper
			as="button"
			bg={backgroundColour}
			highlight={highlight}
			target={target}
			disabled={isDisabled}
			{...rest}
		>
			<Icon as={icon} target={`${target}`} />

			<Current>
				<span>
					{current.toFixed(1)}
					<small>º</small>
				</span>
			</Current>

			<Target target={target} colorMode={colorMode}>
				<TargetSeparator>/</TargetSeparator>

				{!!target && outsideTargetRange(current, target) && (
					<TargetNum>{target.toFixed(0)}</TargetNum>
				)}
			</Target>
		</TemperatureWrapper>
	)
}

const disabled = css`
	opacity: 0.5;
	cursor: not-allowed;
`

const TemperatureWrapper = styled(Tag, {
	shouldForwardProp: (prop: string) =>
		!["highlight", "target"].includes(prop),
})`
	align-items: stretch;

	font-size: ${(props) => props.theme.fontSizes.xl};
	line-height: 1.5;
	min-width: 0;

	padding-left: ${(props) => props.theme.space[2]};
	padding-right: 0;
	margin: 0;

	cursor: pointer;

	${(props) => props.disabled && disabled}

	--colour: ${(props) => props.highlight};
	--icon-colour: ${(props) => (!props.target ? "inherit" : props.highlight)};
`

const Icon = styled(TagLeftIcon)`
	font-size: ${(props) => props.theme.fontSizes.sm};
	height: auto;
	margin-right: 0.25rem;
	color: var(--icon-colour);
`

const Current = styled(TagLabel)`
	display: flex;
	align-items: center;

	padding-top: 0.366rem;
	padding-bottom: 0.366rem;
	padding-right: 0.3em;

	span {
		height: 1rem;
		line-height: 0.7;
	}
`

const Target = styled(TagLabel, {
	shouldForwardProp: (prop: string) =>
		!["target", "colorMode"].includes(prop),
})`
	display: flex;
	align-items: center;
	overflow: visible;

	font-size: ${(props) => props.theme.fontSizes.sm};
	color: ${(props) => props.theme.colors.gray[800]};
	background: var(--colour);
	min-width: 1em;
	max-width: 1.5em;
	padding: 0 ${(props) => props.theme.space[1]} 0 0.1rem;

	border-radius: 0 0.25rem 0.25rem 0;

	${(props) =>
		props.target &&
		`box-shadow: 0 0 0.05rem ${mode(
			"rgba(255, 255, 255, 0.5)",
			"rgba(0, 0, 0, 0.5)",
		)(props)}, 0 0 1em 0.125em var(--colour)`};

	z-index: 10;
`

const TargetSeparator = styled.span`
	display: inline-block;

	color: var(--colour);
	background: var(--colour);
	height: 100%;
	width: 0.4rem;
	margin-left: -0.275rem;

	transform: skewX(-10deg);
`

const TargetNum = styled.span`
	width: 2rem;
	margin-left: -0.4rem;
	text-align: center;

	transform: rotateZ(-80deg);
	transform-origin: 0.7125rem center;
`

export default Temperature
