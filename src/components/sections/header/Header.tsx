import React, { FC } from "react"

import { useColorMode, useColorModeValue } from "@chakra-ui/react"
import { Box, Flex, Heading, IconButton } from "@chakra-ui/react"
import { CgArrowsExpandRight } from "react-icons/cg"
import { FaMoon, FaSun } from "react-icons/fa"
import { FiSun } from "react-icons/fi"

import useCurrentTime from "../../../hooks/useCurrentTime"
import usePrinter from "../../../hooks/usePrinter"
import { useHostname, usePrinterReady } from "../../../hooks/usePrinterInfo"

export interface HeaderProps {
	toggleShowStatus: () => void
}
const Header: FC<HeaderProps> = ({ toggleShowStatus }) => {
	const printer = usePrinter()
	const hostname = useHostname()
	const { printerReady } = usePrinterReady()
	const currentTime = useCurrentTime()

	const { toggleColorMode } = useColorMode()
	const SwitchIcon = useColorModeValue(FaMoon, FaSun)
	const nextMode = useColorModeValue("dark", "light")

	console.log("header")

	return (
		<header>
			<Heading as="h1" fontSize="2xl" mt={0} mb={1} lineHeight={1}>
				<Box as="span" onClick={toggleShowStatus}>
					{hostname || "..."}
				</Box>
			</Heading>

			<Flex position="absolute" top="0" right="0">
				<Box mr={1} onClick={() => window.location.reload()}>
					{currentTime}
				</Box>

				<IconButton
					aria-label="fullscreen"
					icon={<CgArrowsExpandRight />}
					size="xs"
					bg="none"
					mr={1}
					cursor="pointer"
					onClick={() => {
						if (!document.fullscreenElement) {
							document.documentElement.requestFullscreen()
						} else {
							document.exitFullscreen()
						}
					}}
				/>
				<IconButton
					aria-label="Toggle LEDs"
					icon={<FiSun />}
					size="xs"
					bg="none"
					mr={1}
					cursor="pointer"
					onClick={() => printer.leds()}
					isDisabled={!printerReady}
				/>
				<IconButton
					size="xs"
					fontSize="xs"
					aria-label={`Switch to ${nextMode} mode`}
					variant="ghost"
					color="current"
					onClick={toggleColorMode}
					icon={<SwitchIcon />}
				/>
			</Flex>
		</header>
	)
}

export default Header
