import { useAsyncMemo } from "use-async-memo"

import usePrinter from "./usePrinter"

interface Thumbnail {
	width: number
	height: number
	size: number
	data: string
}
interface FileMeta {
	filename?: string
	size?: number
	modified?: string
	slicer?: string
	slicer_version?: string
	first_layer_height?: number
	first_layer_bed_temp?: number
	first_layer_extr_temp?: number
	layer_height?: number
	object_height?: number
	estimated_time?: number
	filament_total?: number

	thumbnails?: Thumbnail[]
}

const useFileMeta = (filename?: string): FileMeta => {
	const printer = usePrinter()

	const metadata = useAsyncMemo(
		async () => {
			if (!printer || !filename) {
				return {}
			}

			const result = await printer.filemeta(filename)
			// console.log(result)
			return result
		},
		[printer, filename],
		{},
	)

	// console.info("meta", filename, metadata)

	return metadata
}

export default useFileMeta
