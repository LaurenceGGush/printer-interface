import React, { FC } from "react"

import {
	Box,
	Button,
	ButtonGroup,
	ButtonGroupProps,
	Icon,
	useColorModeValue,
} from "@chakra-ui/react"
import styled from "@emotion/styled"
import { IconType } from "react-icons"

interface Option {
	label?: string
	icon?: IconType
	value: string | number
}

export interface PushButtonsProps extends ButtonGroupProps {
	value: any
	updateValue: Function
	stretch?: boolean
	options: Option[]
}
const PushButtons: FC<PushButtonsProps> = ({
	value,
	updateValue,
	stretch = false,
	options,
	...rest
}) => {
	const borderColour = useColorModeValue("gray.100", "gray.700")
	const backgroundColour = useColorModeValue("white", "gray.900")

	return (
		<ButtonGroup width={stretch ? "100%" : "auto"} isAttached {...rest}>
			{options.map((option) => (
				<GroupButton
					backgroundColor={
						value === option.value ? borderColour : backgroundColour
					}
					borderColor={borderColour}
					key={option.value}
					variant="outline"
					onClick={() => {
						updateValue(option.value)
					}}
				>
					{option.label && (
						<Box
							as="span"
							width={stretch ? "10" : "auto"}
							textAlign="center"
						>
							{option.label}
						</Box>
					)}
					{option.icon && <Icon as={option.icon} />}
				</GroupButton>
			))}
		</ButtonGroup>
	)
}

const GroupButton = styled(Button)`
	flex-grow: 1;

	border-width: 0.1em;
	margin-left: -0.1em;

	background-clip: border-box;

	&:first-of-type {
		margin-left: 0;
	}
`

export default PushButtons
