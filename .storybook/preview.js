import { ProvidersDecorator } from "../src/storybook/decorators"

export const decorators = [ProvidersDecorator]

export const parameters = {
	options: {
		storySort: {
			order: [
				"Printer",
				"Sections",
				["Header", "Tabs", "Status"],
				"Screens",
				["Print", "Move", "Tools", "Klippy"],
				"Components",
			],
		},
	},
}
