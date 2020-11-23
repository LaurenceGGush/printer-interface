import React, { useState } from "react"

import { Box, Tag } from "@chakra-ui/react"
import { Story } from "@storybook/react/types-6-0"

import { ComponentDecorator } from "../../storybook/decorators"
import PushButtons, { PushButtonsProps } from "./PushButtons"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Components/PushButtons",
	component: PushButtons,
	decorators: [ComponentDecorator],
}

const Template: Story<PushButtonsProps> = (args) => {
	const [value, setValue] = useState(args.options[0].value)
	args = { ...args, value, updateValue: setValue }

	return (
		<>
			<PushButtons {...args} />

			<Box>
				<Tag mt={2} size="sm">
					Value: {value}
				</Tag>
			</Box>
		</>
	)
}

export const Default = Template.bind({})
Default.args = {
	size: "sm",
	stretch: false,
	options: [
		{
			label: "one",
			value: 1,
		},
		{
			label: "two",
			value: 2,
		},
	],
}

export const Stretched = Template.bind({})
Stretched.args = {
	size: "sm",
	stretch: true,
	options: [
		{
			label: "a",
			value: 1,
		},
		{
			label: "b",
			value: 2,
		},
		{
			label: "c",
			value: 3,
		},
	],
}
