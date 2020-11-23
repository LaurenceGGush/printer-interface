import React from "react"

import { Story } from "@storybook/react/types-6-0"

import { ComponentDecorator } from "../../../storybook/decorators"
import Move from "./Move"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Screens/Move",
	component: Move,
	decorators: [ComponentDecorator],
}

export const Default: Story = (args) => <Move {...args} />
