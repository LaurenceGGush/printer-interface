import React, { useState } from "react"

import styled from "@emotion/styled"

import Header from "./components/sections/header"
import Status from "./components/sections/status"
import Tabs from "./components/sections/tabs"
import Spinner from "./components/spinner"
import { useHostname } from "./hooks/usePrinterInfo"
import usePrinterStatus from "./hooks/usePrinterStatus"

const Printer = () => {
	const hostname = useHostname()
	const [showDebug, setShowDebug] = useState(false)

	return (
		<>
			<Header toggleShowStatus={() => setShowDebug(!showDebug)} />

			{showDebug ? (
				<ShowStatus />
			) : hostname ? (
				<Main>
					<Tabs flexGrow={1} height="50%" />

					<Status />
				</Main>
			) : (
				<Spinner />
			)}
		</>
	)
}

const ShowStatus = () => {
	const status = usePrinterStatus()

	const sizes = {
		bheight: document.getElementsByTagName("body")[0].offsetHeight,
		bwidth: document.getElementsByTagName("body")[0].offsetWidth,
		wheight: window.outerHeight,
		wwidth: window.outerWidth,
		dpr: window.devicePixelRatio,
	}

	return (
		<Pre>
			{JSON.stringify(sizes, null, 2)}
			{JSON.stringify(status, null, 2)}
		</Pre>
	)
}

const Main = styled.main`
	display: flex;
	flex-direction: column;
	position: relative;
	align-content: space-between;
	flex-grow: 1;
	overflow: auto;
	overflow-x: visible;
	padding: ${(props) => props.theme.sizes[1]};
`

const Pre = styled.pre`
	font-size: 0.5rem;
	overflow-y: auto;
`

export default Printer
