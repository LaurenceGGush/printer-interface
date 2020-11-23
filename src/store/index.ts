import merge from "deepmerge"
import { atom } from "jotai"
import { atomWithReducer } from "jotai/utils"

import { Moonraker } from "../moonraker/moonraker"
import { PrinterInfo, PrinterStatus } from "./interfaces"

const statusReducer = (status: PrinterStatus, newStatus: any) => {
	// console.info('update', newStatus)

	if (newStatus["gcode_macro DOCK_INIT"]) {
		newStatus.dock = newStatus["gcode_macro DOCK_INIT"]
		delete newStatus["gcode_macro DOCK_INIT"]
	}
	return merge.all([status, newStatus], {
		arrayMerge: (_, sourceArray) => sourceArray,
	})
}

export const printerAtom = atom<Moonraker | undefined>(undefined)
export const infoAtom = atom<PrinterInfo>({})
export const statusAtom = atomWithReducer({}, statusReducer)
