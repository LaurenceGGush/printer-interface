import React, { FC, useEffect, useRef, useState } from "react"

import {
	Box,
	IconButton,
	Tag,
	useColorModeValue,
	useTheme,
} from "@chakra-ui/react"
import styled from "@emotion/styled"
import { CgClose } from "react-icons/cg"
import { TiCancel, TiTick } from "react-icons/ti"

import { useSlide } from "../../hooks/useKnob"

export interface SlideProps {
	min: number
	max: number
	placeholder?: number
	value?: number
	setValue: (x: Function | number) => void
	updateOnChange?: boolean
	handleTick?: () => void
	handleCancel: () => void
}
const Slide: FC<SlideProps> = ({
	min,
	max,
	placeholder,
	value,
	setValue,
	updateOnChange,
	handleTick,
	handleCancel,
	...rest
}) => {
	const [pathLength, setPathLength] = useState(0)
	const pathRef = useRef<SVGPathElement | null>(null)
	const slideRef = useSlide(min, max, setValue)
	const theme = useTheme()

	useEffect(() => {
		if (pathRef.current) {
			setPathLength(pathRef.current.getTotalLength())
		}
	}, [setPathLength])

	const percent = Math.max(
		0.001,
		1 -
			(max -
				((typeof value !== "undefined" ? value : placeholder) || 0)) /
				(max - min),
	)

	const arcColour = useColorModeValue(
		theme.colors.gray[100],
		theme.colors.gray[700],
	)
	const trailColour = useColorModeValue(
		theme.colors.white,
		theme.colors.gray[800],
	)
	const markerColour = useColorModeValue(
		theme.colors.gray[600],
		theme.colors.gray[400],
	)

	// console.info("slide")

	return (
		<SlideWrapper>
			<SlideArc
				ref={slideRef}
				arcColour={arcColour}
				trailColour={trailColour}
				markerColour={markerColour}
				gridColumn="1/6"
				gridRow="2/6"
				{...rest}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 222 110"
					width="100%"
				>
					<g transform="translate(-95 -80)">
						<path
							ref={pathRef}
							d="m292 160a99.3 99.3 0 0 0-172 0"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeWidth="50"
						/>
						{pathLength && (
							<>
								<path
									className="trail"
									d="m292 160a99.3 99.3 0 0 0-172 0"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeWidth="42"
									strokeDasharray={pathLength}
									strokeDashoffset={
										pathLength * (1 + percent)
									}
								/>
								<path
									className="marker"
									d="m292 160a99.3 99.3 0 0 0-172 0"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeWidth="34"
									strokeDasharray={`0.01 ${pathLength}`}
									strokeDashoffset={
										pathLength * (1 + percent)
									}
								/>
							</>
						)}
					</g>
				</svg>
			</SlideArc>

			<Tag gridColumn={updateOnChange ? "1/5" : "1/4"} fontSize="xl">
				{typeof value === "number" ? (
					value
				) : (
					<PlaceHolder>{placeholder}</PlaceHolder>
				)}
			</Tag>

			{updateOnChange ? (
				<IconButton
					aria-label="close"
					icon={<CgClose />}
					size="sm"
					gridColumn="5"
					colorScheme="red"
					onClick={handleCancel}
				/>
			) : (
				<>
					<IconButton
						aria-label="cancel"
						icon={<TiCancel />}
						size="sm"
						gridColumn="4"
						colorScheme="red"
						onClick={handleCancel}
					/>
					<IconButton
						aria-label="tick"
						icon={<TiTick />}
						size="sm"
						gridColumn="5"
						colorScheme="green"
						onClick={handleTick}
					/>
				</>
			)}
		</SlideWrapper>
	)
}

const SlideWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(5, 1fr);
	gap: ${(props) => props.theme.sizes[1]};
`

const SlideArc = styled(Box, {
	shouldForwardProp: (prop: string) =>
		!["arcColour", "trailColour", "markerColour"].includes(prop),
})`
	color: ${(props) => props.arcColour};

	touch-action: none;

	display: flex;
	justify-content: center;
	align-items: center;

	.trail {
		color: ${(props) => props.trailColour};
	}
	.marker {
		color: ${(props) => props.markerColour};
	}
`

const PlaceHolder = styled.span`
	color: lightgrey;
`

export default Slide
