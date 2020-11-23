import React, { FC, useState } from "react"

import {
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from "@chakra-ui/react"
import { FiChevronDown } from "react-icons/fi"

import usePrinter from "../../../hooks/usePrinter"
import {
	useActiveExtruder,
	usePrintingOrPaused,
	useSelectedTool,
} from "../../../hooks/usePrinterStatus"
import { Moonraker } from "../../../moonraker/moonraker"
import PushButtonGroup from "../../pushButtons"

const Tools: FC = () => {
	const printer = usePrinter()
	const { printingOrPaused } = usePrintingOrPaused()
	const currentExtruder = useActiveExtruder()
	const selectedTool = useSelectedTool()

	console.info("tools")

	return (
		<>
			<Flex justifyContent="space-between">
				<Menu>
					<MenuButton
						isDisabled={printingOrPaused}
						as={Button}
						size="sm"
						rightIcon={<FiChevronDown />}
					>
						E{currentExtruder}
					</MenuButton>

					<MenuList>
						<MenuOptionGroup value={`${currentExtruder}`}>
							{["0", "1", "2"].map((extruder) => (
								<MenuItemOption
									key={extruder}
									value={extruder}
									onClick={() => printer.extruder(extruder)}
								>
									E{extruder}
								</MenuItemOption>
							))}
						</MenuOptionGroup>
					</MenuList>
				</Menu>

				<Menu>
					<MenuButton
						isDisabled={printingOrPaused}
						as={Button}
						size="sm"
						rightIcon={<FiChevronDown />}
					>
						{typeof selectedTool === "undefined"
							? "Tools"
							: `T${selectedTool}`}
					</MenuButton>

					<MenuList>
						<MenuOptionGroup value={`${selectedTool}`}>
							{["0", "1", "2"].map((tool) => (
								<MenuItemOption
									key={tool}
									value={tool}
									onClick={() => printer.tool(tool)}
								>
									T{tool}
								</MenuItemOption>
							))}
						</MenuOptionGroup>
					</MenuList>
				</Menu>

				<Button
					size="sm"
					isDisabled={printingOrPaused}
					onClick={() => printer.dropoff()}
				>
					DO
				</Button>
			</Flex>

			<Extrude printer={printer} />

			<Button mt={1} onClick={() => printer.nozzleScrub()}>
				Nozzle Scrub
			</Button>
		</>
	)
}

export type ExtrudeProps = {
	printer: Moonraker
}
const Extrude: FC<ExtrudeProps> = ({ printer }) => {
	const { printingOrPaused } = usePrintingOrPaused()
	const [feed, setFeed] = useState(2)
	const [howfar, setHowfar] = useState(5)

	const speeds = [1, 2, 5, 10, 20]
	const distances = [1, 5, 10, 50, 100]

	return (
		<>
			<PushButtonGroup
				mt={2}
				stretch
				isDisabled={printingOrPaused}
				value={feed}
				updateValue={(speed: number) => setFeed(speed)}
				options={speeds.map((speed) => ({
					label: speed.toString(),
					value: speed,
				}))}
			/>

			<PushButtonGroup
				mt={1}
				stretch
				isDisabled={printingOrPaused}
				value={howfar}
				updateValue={(distance: number) => setHowfar(distance)}
				options={distances.map((distance) => ({
					label: distance.toString(),
					value: distance,
				}))}
			/>

			<Flex mt={2} justifyContent="space-between">
				<Button
					mr={1}
					isDisabled={printingOrPaused}
					onClick={() => printer.extrude(-howfar, feed)}
				>
					Backup
				</Button>
				<Button
					isDisabled={printingOrPaused}
					onClick={() => printer.extrude(howfar, feed)}
				>
					Onward
				</Button>
			</Flex>
		</>
	)
}

export default Tools
