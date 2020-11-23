import { useState } from "react"

import { useAsyncMemo } from "use-async-memo"

import usePrinter from "./usePrinter"

const sortByDate: (a: any, b: any) => number = (a, b) => b.modified - a.modified

const process = (gcodes: any[]): GcodeFile[] => {
	return gcodes.map((gcode) => {
		const name = gcode.filename.replace(/\.gcode$/, "")
		const modified = new Date(gcode.modified * 1000)

		return {
			...gcode,
			name,
			modified,
		}
	})
}

export interface GcodeFile {
	filename: string
	modified: Date
	size: number
	name: string
}

const useGcodes = (): [GcodeFile[] | undefined, () => void] => {
	const printer = usePrinter()
	const [now, setNow] = useState(new Date())

	const gcodes = useAsyncMemo(
		async () => {
			if (!printer) {
				return []
			}

			const result = await printer.listGcodes()
			const sorted = result?.sort(sortByDate)
			const processed = process(sorted.slice(0, 10))

			return processed
		},
		[printer, now],
		[],
	)

	return [gcodes, () => setNow(new Date())]
}

export default useGcodes
