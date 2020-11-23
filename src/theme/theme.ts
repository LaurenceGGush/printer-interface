import { extendTheme, theme as chakraTheme } from "@chakra-ui/react"

import Button from "./Button"

const dev = process.env.NODE_ENV === "development"

const baseTheme = {
	colors: {
		gray: {
			800: "#000410",
		},
		whiteAlpha: {
			50: "rgba(255,255,255,0.125)",
			100: "rgba(255,255,255,0.15)",
			200: "rgba(255,255,255,0.175)",
		},
		grey: chakraTheme.colors.gray,
	},
	components: {
		Button,
	},
	styles: {
		global: {
			html: {
				height: "100%",
				width: "100%",

				lineHeight: "inherit",

				fontSize: "2em",
			},

			body: {
				fontFamily: `"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
				"Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,

				margin: "0",
				padding: "0",

				width: "100%",
				height: "100%",
				maxHeight: "initial",
				minHeight: "initial",
				maxWidth: "initial",

				overflow: "hidden",

				"&.sb-show-main": {
					overflow: "auto",
				},
			},

			"#root": {
				height: "100%",
			},

			".app-root": {
				display: "flex",
				flexDirection: "column",
				alignContent: "space-between",
				position: "relative",

				height: "100%",

				maxHeight: "initial",
				minHeight: "initial",
				maxWidth: "initial",

				margin: "0",
			},

			code: {
				fontFamily: `source-code-pro, Menlo, Monaco, Consolas, "Courier New",
				monospace`,
			},
		},
	},
}

if (dev) {
	baseTheme.styles.global[".app-root"].maxHeight = "800px"
	baseTheme.styles.global[".app-root"].minHeight = "0"

	baseTheme.styles.global[".app-root"].maxWidth = "480px"

	baseTheme.styles.global[".app-root"].margin = "0 auto !important"
}

const theme = extendTheme(baseTheme)

export default theme
