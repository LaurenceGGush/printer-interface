import React, { FC, useState } from "react"

import { Button } from "@chakra-ui/react"
import styled from "@emotion/styled"

import usePrinter from "../../../hooks/usePrinter"

const rotateSizes = (state: number) => {
	switch (state) {
		case 0:
			return 1
		case 1:
			return 2
		case 2:
			return 0
		default:
			return 0
	}
}

const Move: FC = () => {
	const printer = usePrinter()

	const [xySize, setXYSize] = useState(0)
	const [zSize, setZSize] = useState(1)

	const xyDistances = [
		[100, 10],
		[1, 0.1],
		[0.1, 0.01],
	]
	const zDistances = xyDistances

	const fontSizes = ["md", "sm", "xs"]

	console.log("move")

	return (
		<CrossMoveWrapper>
			<ControlButton mr={1} size="sm" onClick={() => printer.init()}>
				H
			</ControlButton>

			<ControlButton
				gridRow={1}
				gridColumn={4}
				fontSize={fontSizes[xySize]}
				onClick={() => setXYSize(rotateSizes)}
			>
				{"<X/Y>"}
			</ControlButton>

			{xyDistances[xySize].map((distance) => (
				<YButton
					key={distance}
					onClick={() => printer.moveBy(distance, "Y")}
				>
					{distance}
				</YButton>
			))}
			{xyDistances[xySize].map((distance) => (
				<ControlButton
					key={distance}
					gridRow={3}
					onClick={() => printer.moveBy(-distance, "X")}
				>
					{distance}
				</ControlButton>
			))}

			{xyDistances[xySize]
				.slice()
				.reverse()
				.map((distance) => (
					<YButton
						key={distance}
						onClick={() => printer.moveBy(-distance, "Y")}
					>
						{distance}
					</YButton>
				))}
			{xyDistances[xySize]
				.slice()
				.reverse()
				.map((distance) => (
					<ControlButton
						key={distance}
						gridRow={3}
						onClick={() => printer.moveBy(distance, "X")}
					>
						{distance}
					</ControlButton>
				))}

			<ControlButton
				gridRow={1}
				gridColumn={6}
				fontSize={fontSizes[zSize]}
				onClick={() => setZSize(rotateSizes)}
			>
				{"<Z>"}
			</ControlButton>

			{zDistances[zSize].map((distance, index) => (
				<ControlButton
					key={distance}
					gridRow={index + 2}
					gridColumn={6}
					onClick={() => printer.moveBy(-distance, "Z")}
				>
					{distance}
				</ControlButton>
			))}

			{zDistances[zSize]
				.slice()
				.reverse()
				.map((distance, index) => (
					<ControlButton
						key={distance}
						gridRow={index + 4}
						gridColumn={6}
						onClick={() => printer.moveBy(distance, "Z")}
					>
						{distance}
					</ControlButton>
				))}

			<ControlButton
				mr={1}
				size="sm"
				onClick={() => printer.turnOffMotors()}
			>
				M84
			</ControlButton>
		</CrossMoveWrapper>
	)
}

const CrossMoveWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-template-rows: repeat(5, 1fr);
	gap: 0.25rem;

	max-width: 20rem;
	margin: 0 auto;
`

const ControlButton = styled(Button)`
	min-width: 2.5rem;
	height: 2.25rem;
`

const YButton = styled(ControlButton)`
	grid-column: 2/4;
	max-width: calc(50% - 0.25rem);
	margin-left: calc(25% + calc(0.25rem / 4));
`

export default Move
