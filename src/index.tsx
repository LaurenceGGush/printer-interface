import React, { StrictMode } from "react"

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { Provider as JotaiProvider } from "jotai"
import ReactDOM from "react-dom"

import MachineProvider from "./machines"
import Printer from "./Printer"
import Store from "./store/Store"
import theme from "./theme/theme"

ReactDOM.render(
	<StrictMode>
		<JotaiProvider>
			<MachineProvider>
				<ChakraProvider theme={theme}>
					<ColorModeScript initialColorMode="light" />

					<Store />

					<Printer />
				</ChakraProvider>
			</MachineProvider>
		</JotaiProvider>
	</StrictMode>,
	document.getElementById("root"),
)
