import React from "react"

import styled from "@emotion/styled"

import { useFilename } from "../../../hooks/usePrinterStatus"
import Gcodes from "../../gcodes"
import Printing from "../../printing"

const Print = () => {
	const filename = useFilename()

	console.log("print")

	return (
		<PrintingWrapper>
			{filename ? <Printing /> : <Gcodes />}
		</PrintingWrapper>
	)
}

const PrintingWrapper = styled.div`
	height: 100%;
`

export default Print
