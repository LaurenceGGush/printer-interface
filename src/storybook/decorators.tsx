import React from "react"

import {
	Box,
	ChakraProvider,
	ColorModeScript,
	Flex,
	IconButton,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react"
import { Story } from "@storybook/react/types-6-0"
import { Provider as JotaiProvider } from "jotai"
import { FaMoon, FaSun } from "react-icons/fa"

import MachineProvider from "../machines"
import theme from "../theme/theme"
import { baseStatus, readyInfo } from "./mockdata"
import { MockStore } from "./mocks"

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
}

const ColorModeToggleBar = () => {
	const { toggleColorMode } = useColorMode()
	const SwitchIcon = useColorModeValue(FaMoon, FaSun)
	const nextMode = useColorModeValue("dark", "light")

	return (
		<Flex justify="flex-end">
			<IconButton
				position="absolute"
				top="0"
				right="0"
				size="xs"
				fontSize="xs"
				aria-label={`Switch to ${nextMode} mode`}
				variant="ghost"
				color="current"
				onClick={toggleColorMode}
				icon={<SwitchIcon />}
			/>
		</Flex>
	)
}

export const ProvidersDecorator = (Story: Story) => {
	return (
		<JotaiProvider>
			<MachineProvider>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode="light" />

					<MockStore info={readyInfo} status={baseStatus}>
						<Story />
					</MockStore>
				</ChakraProvider>
			</MachineProvider>
		</JotaiProvider>
	)
}

export const AppRootDecorator = (Story: Story) => (
	<div className="app-root">
		<Story />
	</div>
)

export const ComponentDecorator = (Story: Story) => (
	<>
		<ColorModeToggleBar />

		<Box maxWidth="480px" margin="0 auto" position="relative">
			<Story />
		</Box>
	</>
)
