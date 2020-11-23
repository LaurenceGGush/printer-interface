import equal from "fast-deep-equal"
import { useAtom } from "jotai"
import { useSelector } from "jotai/utils"

import { statusAtom } from "../store"
import { PrinterStatus } from "../store/interfaces"

const usePrinterStatus = () => useAtom(statusAtom)[0]
export default usePrinterStatus

const selectPrintingState = (status: PrinterStatus) => {
	const state = status?.print_stats?.state

	return {
		printing: state === "printing",
		paused: state === "paused",
		printingOrPaused: state === "printing" || state === "paused",
	}
}
export const usePrintingOrPaused = () =>
	useSelector(statusAtom, selectPrintingState, equal)

const selectSpeedsAndFeeds = (status: PrinterStatus) => ({
	speed_factor: status?.gcode_move?.speed_factor,
	extrude_factor: status?.gcode_move?.extrude_factor,
	fan_speed: status?.fan?.speed || 0,
})
export const useSpeedsAndFeeds = () =>
	useSelector(statusAtom, selectSpeedsAndFeeds, equal)

const selectActiveExtruder = (status: PrinterStatus) =>
	parseInt(status?.toolhead?.extruder?.replace("extruder", "") || "0", 10)
export const useActiveExtruder = () =>
	useSelector(statusAtom, selectActiveExtruder)

const selectSelectedTool = (status: PrinterStatus) => {
	const tool = status.dock?.tool_number
	return tool ? parseInt(tool, 10) - 1 : undefined
}
export const useSelectedTool = () => useSelector(statusAtom, selectSelectedTool)

const selectPrintFilename = (status: PrinterStatus) =>
	status?.print_stats?.filename
export const useFilename = () => useSelector(statusAtom, selectPrintFilename)
