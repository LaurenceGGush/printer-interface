import React, { FC } from "react"

import { Box, ChakraProps, Flex, IconButton, List } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { IoMdRefresh } from "react-icons/io"

import useGcodes from "../../hooks/useGcodes"
import usePrinter from "../../hooks/usePrinter"
import Spinner from "../spinner"
import Gcode from "./Gcode"

const Gcodes: FC<ChakraProps> = () => {
	const printer = usePrinter()
	const [gcodes, refreshGcodes] = useGcodes()

	if (!printer || !gcodes) {
		return <Spinner />
	}

	return (
		<Flex flexDirection="column" height="100%">
			<IconButton
				size="sm"
				aria-label="refresh"
				icon={<IoMdRefresh />}
				onClick={refreshGcodes}
			/>

			{gcodes && gcodes.length ? (
				<GcodeList>
					{gcodes.map((gcode) => (
						<Gcode
							key={gcode.filename + gcode.size}
							gcode={gcode}
							onClick={() => printer.loadGcode(gcode.filename)}
						/>
					))}
				</GcodeList>
			) : (
				<Box as="p" textAlign="center" mt={1}>
					No files found
				</Box>
			)}
		</Flex>
	)
}

const GcodeList = styled(List)`
	height: 100%;
	overflow-y: auto;
	border-radius: ${(props) => props.theme.sizes[1]};
`

export default Gcodes
