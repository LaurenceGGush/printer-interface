import React, { FC } from "react"

import {
	AspectRatio,
	Box,
	IconButton,
	Tag,
	useColorModeValue,
	useTheme,
} from "@chakra-ui/react"
import styled from "@emotion/styled"
import { TiCancel, TiTick } from "react-icons/ti"

import { useKnob } from "../../hooks/useKnob"

export interface KnobProps {
	placeholder?: number
	value?: number
	setValue: (x: Function | number) => void
	step?: number
	handleTick: () => void
	handleCancel: () => void
}
const Knob: FC<KnobProps> = ({
	placeholder = 100,
	value,
	setValue,
	step = 1,
	handleTick,
	handleCancel,
	...rest
}) => {
	const knobRef = useKnob(setValue, step)
	const theme = useTheme()

	const backgroundOuter = useColorModeValue(
		theme.colors.gray[100],
		theme.colors.gray[700],
	)
	const backgroundInner = useColorModeValue("white", theme.colors.gray[800])

	return (
		<KnobWrapper {...rest}>
			<AspectRatio gridColumn="1/5" gridRow="1/6" width="100%" ratio={1}>
				<KnobOuter ref={knobRef} bg={backgroundOuter}>
					<KnobInner
						bg={backgroundInner}
						onClick={() => setValue(0)}
					/>
				</KnobOuter>
			</AspectRatio>

			<Tag fontSize="xl" ml={2}>
				{value || <PlaceHolder>{placeholder}</PlaceHolder>}
			</Tag>

			<IconButton
				aria-label="cancel"
				icon={<TiCancel />}
				size="sm"
				ml={2}
				gridRow="4"
				colorScheme="red"
				onClick={handleCancel}
			/>
			<IconButton
				aria-label="tick"
				icon={<TiTick />}
				size="sm"
				ml={2}
				gridRow="5"
				colorScheme="green"
				onClick={handleTick}
			/>
		</KnobWrapper>
	)
}

const KnobWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr) 1.25fr;
	grid-template-rows: repeat(5, 1fr);
	row-gap: ${(props) => props.theme.sizes[1]};

	width: 100%;

	margin: 0 auto ${(props) => props.theme.sizes[2]};
`

const KnobOuter = styled(Box)`
	border-radius: 50%;

	touch-action: none;

	display: flex;
	justify-content: center;
	align-items: center;
`

const KnobInner = styled(Box)`
	width: 50%;
	height: 50%;

	border-radius: 50%;
`

const PlaceHolder = styled.span`
	color: lightgrey;
`

export default Knob
