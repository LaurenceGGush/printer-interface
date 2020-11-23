import { useEffect } from "react"

import { useAtom } from "jotai"
import { useUpdateAtom } from "jotai/utils"

import moonraker from "../moonraker"
import { infoAtom, printerAtom, statusAtom } from "."
import { PrinterStatus } from "./interfaces"

const objects = {
	gcode_move: ["gcode_position", "speed_factor", "extrude_factor"],
	toolhead: ["extruder", "homed_axes"],
	extruder: null,
	extruder1: null,
	extruder2: null,
	heater_bed: null,
	heaters: ["available_heaters"],
	fan: ["speed"],
	virtual_sdcard: ["is_active", "progress"],
	print_stats: ["print_duration", "filename", "state"],
	display_status: ["progress"],
	idle_timeout: null,
	webhooks: null,
	"gcode_macro DOCK_INIT": ["tool_number"],
}

const Store = () => {
	const [printer, setPrinter] = useAtom(printerAtom)

	const [info, updateInfo] = useAtom(infoAtom)
	const updateStatus = useUpdateAtom(statusAtom)

	useEffect(() => {
		let unsubKlippyReady: () => void,
			unsubKlippyDisconnect: () => void,
			unsubStatus: () => void,
			unsubSocketClosed: () => void,
			unsubSocketOpened: () => void

		const asyncEffect = async () => {
			if (!printer) {
				const mprinter = await moonraker()
				const minfo = await mprinter.info()
				setPrinter(mprinter)
				updateInfo(minfo)
				return
			}

			if (info?.state === "closed") {
				unsubSocketOpened = printer.subscribeSocketOpened(async () => {
					updateInfo(await printer.info())
				})
				return
			}

			if (info?.state !== "ready") {
				console.log("ready")
				unsubKlippyReady = printer.subscribeKlippyReady(async () => {
					updateInfo(await printer.info())
				})
				return
			}

			updateStatus(await printer.status(objects))

			unsubStatus = printer.subscribeStatusUpdates(
				objects,
				(status: PrinterStatus) => {
					if (
						status?.webhooks?.state &&
						status?.webhooks?.state !== "ready"
					) {
						updateInfo({
							...info,
							state: status.webhooks.state,
							state_message: status.webhooks.state_message,
						})
					}

					updateStatus(status)
				},
			)
			unsubKlippyDisconnect = printer.subscribeKlippyDisconnected(() => {
				updateInfo({
					hostname: info.hostname,
					state_message: "Klippy Disconnected!\nReconnecting...",
					state: "startup",
				})
			})
			unsubSocketClosed = printer.subscribeSocketClosed(() => {
				updateInfo({
					hostname: info.hostname,
					state_message: "Socket closed!\nReconnecting...",
					state: "closed",
				})
			})
		}
		asyncEffect()

		return () => {
			if (unsubStatus) {
				unsubStatus()
			}
			if (unsubKlippyReady) {
				unsubKlippyReady()
			}
			if (unsubKlippyDisconnect) {
				unsubKlippyDisconnect()
			}
			if (unsubSocketClosed) {
				unsubSocketClosed()
			}
			if (unsubSocketOpened) {
				unsubSocketOpened()
			}
		}
	}, [printer, setPrinter, info, updateInfo, updateStatus])

	console.info("Store")

	return <></>
}

export default Store
