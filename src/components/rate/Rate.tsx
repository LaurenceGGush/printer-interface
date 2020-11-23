import React, { FC } from "react"

import {
	Tag,
	TagLeftIcon,
	TagProps,
	useColorModeValue,
	useTheme,
} from "@chakra-ui/react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { IconType } from "react-icons"
import { IoIosAirplane } from "react-icons/io"

export interface RateProps extends TagProps {
	icon: IconType
	rate: number
	nominal: number
	highlight: string
	isDisabled?: boolean
}
const Rate: FC<RateProps> = ({
	icon = IoIosAirplane,
	rate = 1,
	nominal = 1,
	highlight = "cornflowerblue",
	isDisabled,
	...rest
}) => {
	const active = rate !== nominal

	const theme = useTheme()

	const backgroundColour = useColorModeValue(
		theme.colors.gray[100],
		theme.colors.gray[700],
	)

	const inactiveHighlight = useColorModeValue(
		theme.colors.gray[300],
		theme.colors.gray[600],
	)

	if (!active) {
		highlight = inactiveHighlight
	}

	return (
		<RateWrapper
			as="button"
			bg={backgroundColour}
			highlight={highlight}
			disabled={isDisabled}
			{...rest}
		>
			<Icon as={icon} />

			<Separator>/</Separator>

			<TheRate>
				<span>
					{(rate * 100).toFixed(0)}
					{/* <small>%</small> */}
				</span>
			</TheRate>
		</RateWrapper>
	)
}

const disabled = css`
	opacity: 0.5;
	cursor: not-allowed;
`

const RateWrapper = styled(Tag, {
	shouldForwardProp: (prop: string) => !["highlight"].includes(prop),
})`
	padding-left: ${(props) => props.theme.space[2]};
	padding-right: 0;

	overflow: hidden;
	align-items: stretch;

	cursor: pointer;

	${(props) => props.disabled && disabled}

	--colour: ${(props) => props.highlight};
`

const Icon = styled(TagLeftIcon)`
	font-size: ${(props) => props.theme.fontSizes.sm};
	height: auto;
	margin-right: 0.25rem;
`

const Separator = styled.span`
	color: var(--colour);
	background: var(--colour);
	width: 0.4em;
	margin-right: -0.2em;

	display: inline-block;
	transform: skewX(-10deg);
`

const TheRate = styled.span`
	font-size: ${(props) => props.theme.fontSizes.lg};
	color: ${(props) => props.theme.colors.gray[800]};
	background: var(--colour);
	padding: 0 ${(props) => props.theme.space[2]} 0 0;

	display: flex;
	align-items: center;

	z-index: 10;

	span {
		height: 1em;
		line-height: 1;
	}
`

export default Rate
