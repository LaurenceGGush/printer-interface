import equal from "fast-deep-equal"
import { useAtom } from "jotai"
import { useSelector } from "jotai/utils"

import { infoAtom } from "../store"
import { PrinterInfo } from "../store/interfaces"

const usePrinterInfo = () => useAtom(infoAtom)[0]
export default usePrinterInfo

const selectPrinterReady = (info: PrinterInfo) => {
	const state = info?.state

	return {
		printerStarting: state === "startup",
		printerReady: state === "ready",
		printerError: state === "error" || state === "closed",
	}
}
export const usePrinterReady = () =>
	useSelector(infoAtom, selectPrinterReady, equal)

const selectHostname = (info: PrinterInfo) => info?.hostname
export const useHostname = () => useSelector(infoAtom, selectHostname)
