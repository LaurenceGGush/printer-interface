import React from "react"

import { Story } from "@storybook/react/types-6-0"

import { ComponentDecorator } from "../../storybook/decorators"
import Adjust, { AdjustProps } from "./Adjust"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Components/Adjust",
	component: Adjust,
	decorators: [ComponentDecorator],
}

const Template: Story<AdjustProps> = (args) => <Adjust {...args} />

export const Default = Template.bind({})
Default.args = {
	onSubmit: () => {},
	onCancel: () => {},
}

export const UpdateOnChange = Template.bind({})
UpdateOnChange.args = {
	onChange: (value) => console.info("change:", value),
	onCancel: () => {},
}
