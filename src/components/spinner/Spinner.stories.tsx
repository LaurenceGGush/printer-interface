import React from "react"

import { Story } from "@storybook/react/types-6-0"

import { ComponentDecorator } from "../../storybook/decorators"
import Spinner from "./Spinner"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Components/Spinner",
	component: Spinner,
	decorators: [ComponentDecorator],
}

const Template: Story = (args) => <Spinner {...args} />

export const Default = Template.bind({})
