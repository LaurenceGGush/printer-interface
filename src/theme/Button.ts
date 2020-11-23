import { mode } from "@chakra-ui/theme-tools"

type Dict = Record<string, any>

type AccessibleColor = {
	bg?: string
	color?: string
	hoverBg?: string
	activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
	yellow: {
		bg: "yellow.400",
		color: "black",
		hoverBg: "yellow.500",
		activeBg: "yellow.600",
	},
	cyan: {
		bg: "cyan.400",
		color: "black",
		hoverBg: "cyan.500",
		activeBg: "cyan.600",
	},
}

function variantSolid(props: Dict) {
	const { colorScheme: c } = props

	if (c === "gray") {
		const bg = mode("gray.100", "gray.700")(props)

		return {
			bg,
			_hover: {
				bg: mode("gray.200", "whiteAlpha.300")(props),
				_disabled: {
					bg,
				},
			},
			_active: { bg: mode("gray.300", "whiteAlpha.400")(props) },
		}
	}

	const {
		bg = `${c}.500`,
		color = "white",
		hoverBg = `${c}.600`,
		activeBg = `${c}.700`,
	} = accessibleColorMap[c] || {}

	const background = mode(bg, `${c}.500`)(props)

	return {
		bg: background,
		color: mode(color, `gray.800`)(props),
		_hover: {
			bg: mode(hoverBg, `${c}.300`)(props),
			_disabled: {
				bg: background,
			},
		},
		_active: { bg: mode(activeBg, `${c}.400`)(props) },
	}
}

const Button = {
	variants: {
		solid: variantSolid,
	},
}

export default Button
