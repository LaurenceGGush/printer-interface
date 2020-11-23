import React, { FC, useEffect, useState } from "react"

import { Flex, Spinner as ChakraSpinner, SpinnerProps } from "@chakra-ui/react"
import styled from "@emotion/styled"

const Spinner: FC<SpinnerProps> = (props) => {
	const [className, setClassName] = useState("")

	useEffect(() => {
		let gogogo = true

		// WOWOWOWOW double raf FTW!!!!
		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				if (gogogo) {
					setClassName("mounted")
				}
			}),
		)
		return () => {
			gogogo = false
		}
	}, [])

	return (
		<Flex justifyContent="center">
			<FadeInSpinner
				className={className}
				thickness="0.125em"
				color="gray.700"
				emptyColor="gray.300"
				speed="2s"
				zIndex={1}
				{...props}
			/>
		</Flex>
	)
}

/**
 * Fade in spinner
 * delay the appearance of the spinner to stop
 * it flashing on screen before content is loaded
 */
const FadeInSpinner = styled(ChakraSpinner)`
	opacity: 0;
	transition: opacity 0.5s 0.5s;

	&.mounted {
		opacity: 1;
	}
`

export default Spinner
