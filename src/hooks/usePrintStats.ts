import { useMemo } from "react"

import { useSelector } from "jotai/utils"

import { statusAtom } from "../store"
import { PrinterStatus } from "../store/interfaces"
import useFileMeta from "./useFileMeta"
import { useFilename, usePrintingOrPaused } from "./usePrinterStatus"

const selectHeight = (status: PrinterStatus) =>
	status?.gcode_move?.gcode_position[2] || 0
const selectDuration = (status: PrinterStatus) =>
	status?.print_stats?.print_duration || 0
const selectProgress = (status: PrinterStatus) =>
	status?.virtual_sdcard?.progress || 0
const usePrintStats = () => {
	const printingOrPaused = usePrintingOrPaused()

	const print_height = useSelector(statusAtom, selectHeight)
	const print_duration = useSelector(statusAtom, selectDuration)
	const progress = useSelector(statusAtom, selectProgress)
	const filename = useFilename()

	const freindlyname = useMemo(() => filename?.replace(/\.gcode$/, ""), [
		filename,
	])

	const {
		object_height = 0,
		first_layer_height = 0,
		layer_height = 0,
		first_layer_bed_temp = 0,
		first_layer_extr_temp = 0,
		thumbnails,
	} = useFileMeta(filename)

	const thumb = thumbnails && thumbnails[1]

	const layers = useMemo(
		() =>
			Math.round((object_height - first_layer_height) / layer_height + 1),
		[first_layer_height, layer_height, object_height],
	)
	const layer = printingOrPaused
		? ((print_height - first_layer_height) / layer_height + 1).toFixed(0)
		: 0

	const elapsed = new Date(0)
	elapsed.setSeconds(print_duration)

	const remaining = useMemo(() => {
		const rem = new Date(0)
		if (progress) {
			rem.setSeconds((1 / progress) * print_duration - print_duration)
		}
		return rem
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress])

	return {
		filename,
		freindlyname,
		thumb,
		layers,
		layer,
		progress,
		object_height,
		print_height,
		elapsed,
		remaining,
		first_layer_bed_temp,
		first_layer_extr_temp,
	}
}

export default usePrintStats
