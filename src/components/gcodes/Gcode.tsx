import React, { FC, useEffect, useState } from "react"

import { Box, Image, ListItem, ListItemProps } from "@chakra-ui/react"
import styled from "@emotion/styled"
import sAgo from "s-ago"

import useFileMeta from "../../hooks/useFileMeta"
import { GcodeFile } from "../../hooks/useGcodes"
export interface GcodeProps extends ListItemProps {
	gcode: GcodeFile
}
const Gcode: FC<GcodeProps> = ({ gcode, ...rest }) => {
	const { thumbnails } = useFileMeta(gcode.filename)
	const thumb = thumbnails && thumbnails[0]
	const [when, setWhen] = useState(sAgo(gcode.modified))

	useEffect(() => {
		const interval = setInterval(() => {
			setWhen(sAgo(gcode.modified))
		}, 60000)

		return () => clearInterval(interval)
	}, [when, setWhen, gcode.modified])

	return (
		<GcodeItem {...rest}>
			{thumb && (
				<GcodeImage src={`data:image/jpg;base64,${thumb.data}`} />
			)}

			<Box minWidth="0" flexGrow={1}>
				<GcodeName>{gcode.name}</GcodeName>

				<GcodeDetails>
					<p>{when}</p>
					<p>{(gcode.size / 1024 / 1024).toFixed(1)}Mb</p>
				</GcodeDetails>
			</Box>
		</GcodeItem>
	)
}

const GcodeItem = styled(ListItem)`
	display: flex;
`

const GcodeImage = styled(Image)`
	background: ${(props) => props.theme.colors.gray[200]};
	width: 2.25rem;
	height: 2.25rem;

	margin: ${(props) => props.theme.sizes[1]}
		${(props) => props.theme.sizes[1]} 0 0;

	border-radius: ${(props) => props.theme.sizes[1]};
`

const GcodeName = styled.p`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const GcodeDetails = styled.div`
	display: flex;
	justify-content: space-between;

	font-size: ${(props) => props.theme.fontSizes.xs};
	color: ${(props) => props.theme.colors.gray[500]};
`

export default Gcode
