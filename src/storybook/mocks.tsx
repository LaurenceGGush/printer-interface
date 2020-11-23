import React, { FC, useEffect, useState } from "react"

import { useUpdateAtom } from "jotai/utils"

import { Moonraker } from "../moonraker/moonraker"
import { infoAtom, printerAtom, statusAtom } from "../store"
import { PrinterInfo, PrinterStatus } from "../store/interfaces"
import noopObj from "../utilities/noopProxy"
import { fileMeta, gcodes } from "./mockdata"

export const noopPrinter = noopObj({
	filemeta: () => fileMeta,
	listGcodes: () => gcodes,
}) as Moonraker

interface MockStoreProps {
	printer?: Moonraker
	info?: PrinterInfo
	status?: PrinterStatus
}
export const MockStore: FC<MockStoreProps> = ({
	children,
	printer = noopPrinter,
	info,
	status,
}) => {
	const setPrinter = useUpdateAtom(printerAtom)
	const setInfo = useUpdateAtom(infoAtom)
	const setStatus = useUpdateAtom(statusAtom)

	const [stateUpdated, setStateUpdated] = useState(false)

	useEffect(() => {
		setPrinter(() => printer)
		info && setInfo(() => info)
		status && setStatus(status)
		setStateUpdated(true)
	}, [setPrinter, setInfo, setStatus, info, status, printer])

	if (!stateUpdated) {
		return <></>
	}

	return <>{children}</>
}
