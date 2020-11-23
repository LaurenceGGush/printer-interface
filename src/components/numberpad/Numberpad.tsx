import React, { FC } from "react"

import { Button, IconButton, IconButtonProps, Tag } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { TiBackspace, TiCancel, TiDelete, TiTick } from "react-icons/ti"

export interface NumberPadProps {
	placeholder?: number
	value?: number
	setValue: (value?: number | Function) => void
	handleTick: () => void
	handleCancel: () => void
}
const NumberPad: FC<NumberPadProps> = (
	{ placeholder, value, setValue, handleTick, handleCancel },
	...rest
) => {
	const handleNumber = (number: number) => {
		setValue((value?: number) => parseInt(`${value || ""}${number}`, 10))
	}
	const handleBack = () =>
		setValue((value?: number) => {
			const truncated = Math.trunc((value || 0) / 10)
			return truncated || undefined
		})

	const handleClear = () => setValue(undefined)

	return (
		<NumberPadWrapper {...rest}>
			<Display>
				{typeof value === "number" ? (
					value
				) : (
					<DisplayPlaceHolder>{placeholder}</DisplayPlaceHolder>
				)}
			</Display>

			<ActionButton
				aria-label="backspace"
				colorScheme="grey"
				onClick={handleBack}
				icon={<TiBackspace />}
			/>
			<ActionButton
				aria-label="clear"
				colorScheme="grey"
				onClick={handleClear}
				icon={<TiDelete />}
			/>
			<ActionButton
				aria-label="cancel"
				colorScheme="red"
				onClick={handleCancel}
				icon={<TiCancel />}
			/>
			<ActionButton
				aria-label="tick"
				colorScheme="green"
				onClick={handleTick}
				icon={<TiTick />}
			/>

			{[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((number) => (
				<Button
					key={number}
					size="sm"
					borderWidth="0.1em"
					onClick={() => handleNumber(number)}
				>
					{number}
				</Button>
			))}
		</NumberPadWrapper>
	)
}

const NumberPadWrapper = styled.div`
	width: 100%;
	margin: 0 auto ${(props) => props.theme.sizes[2]};

	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-flow: dense;
	gap: ${(props) => props.theme.sizes[1]};

	Button:last-of-type {
		grid-column: 2;
	}
`

const Display = styled(Tag)`
	font-size: ${(props) => props.theme.fontSizes["lg"]};
	grid-column: 1/4;
`

const DisplayPlaceHolder = styled.span`
	color: lightgrey;
`

const ActionButton: FC<IconButtonProps> = (props) => (
	<IconButton size="sm" gridColumn={4} {...props} />
)

export default NumberPad
