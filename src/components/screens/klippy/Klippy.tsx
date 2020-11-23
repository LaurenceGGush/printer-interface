import React, { FC } from "react"

import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	ButtonProps,
	Tag,
} from "@chakra-ui/react"
import { useSelector } from "jotai/utils"

import usePrinter from "../../../hooks/usePrinter"
import { usePrinterReady } from "../../../hooks/usePrinterInfo"
import { infoAtom } from "../../../store"
import { PrinterInfo } from "../../../store/interfaces"

const processMessage = (message: string) => {
	const parts = message.trim().split(/\n/)

	return [parts.shift() || "", parts.join(" ")]
}

const select = (info: PrinterInfo) => [
	processMessage(info.state_message || ""),
	info.software_version || "",
]

const Klippy: FC = () => {
	const printer = usePrinter()

	const [message, software_version] = useSelector(infoAtom, select)
	const { printerStarting, printerReady } = usePrinterReady()

	const alertStatus = printerReady
		? "info"
		: printerStarting
		? "warning"
		: "error"

	console.log("klippy")

	return (
		<>
			<Alert status={alertStatus} fontSize="0.6em" mb={1} display="block">
				<AlertIcon position="absolute" top={1} right={-1} />
				<AlertTitle>{message[0]}</AlertTitle>

				<AlertDescription display="block" lineHeight="1.3">
					{message[1]}
				</AlertDescription>
			</Alert>

			<KlippyButton onClick={() => printer.restart()}>
				Restart
			</KlippyButton>

			<KlippyButton onClick={() => printer.reallyRestart()}>
				Firmware restart
			</KlippyButton>

			<KlippyButton onClick={() => printer.reboot()}>
				Host restart
			</KlippyButton>

			{software_version && (
				<Tag mt={2} size="sm">
					{software_version}
				</Tag>
			)}
		</>
	)
}

const KlippyButton: FC<ButtonProps> = (props) => (
	<Button display="block" size="sm" mt={1} {...props} />
)

export default Klippy
