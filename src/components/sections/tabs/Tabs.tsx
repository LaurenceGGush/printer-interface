import React, { FC, useEffect, useState } from "react"

import {
	Icon,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs as ChakraTabs,
	TabsProps as ChakraTabsProps,
} from "@chakra-ui/react"
import styled from "@emotion/styled"
import { AiOutlineExclamationCircle, AiOutlineInfoCircle } from "react-icons/ai"

import { usePrinterReady } from "../../../hooks/usePrinterInfo"
import { usePrintingOrPaused } from "../../../hooks/usePrinterStatus"
import Klippy from "../../screens/klippy"
import Move from "../../screens/move"
import Print from "../../screens/print"
import Tools from "../../screens/tools"

export interface TabsProps extends Partial<ChakraTabsProps> {}
const Tabs: FC<TabsProps> = (props) => {
	const { printerReady } = usePrinterReady()
	const { printingOrPaused } = usePrintingOrPaused()

	const [tabIndex, setTabIndex] = useState(
		printerReady ? (printingOrPaused ? 0 : 1) : 3,
	)

	useEffect(() => {
		if (!printerReady) {
			setTabIndex(3)
			return
		}

		printingOrPaused && setTabIndex(0)
	}, [printerReady, printingOrPaused])

	const handleTabChange = (index: number) => setTabIndex(index)

	console.log("tabs")

	return (
		<ChakraTabs
			size="sm"
			isLazy
			index={tabIndex}
			onChange={handleTabChange}
			display="flex"
			flexDirection="column"
			{...props}
		>
			<TabList display="flex" justifyContent="space-around">
				<Tab isDisabled={!printerReady}>Print</Tab>
				<Tab isDisabled={!printerReady || printingOrPaused}>Move</Tab>
				<Tab isDisabled={!printerReady}>Tools</Tab>
				<Tab minWidth={0}>
					<Icon
						as={
							printerReady
								? AiOutlineInfoCircle
								: AiOutlineExclamationCircle
						}
					/>
				</Tab>
			</TabList>

			<TabPanels mt={1} overflowY="hidden">
				<Panel>
					<Print />
				</Panel>

				<Panel>
					<Move />
				</Panel>

				<Panel>
					<Tools />
				</Panel>

				<Panel>
					<Klippy />
				</Panel>
			</TabPanels>
		</ChakraTabs>
	)
}

const Panel = styled(TabPanel)`
	height: 100%;
	padding: 0;
`

export default Tabs
