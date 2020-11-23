import React from "react"

import { Story } from "@storybook/react/types-6-0"

import { ComponentDecorator } from "../../../storybook/decorators"
import { errorInfo, startupInfo } from "../../../storybook/mockdata"
import { MockStore } from "../../../storybook/mocks"
import Klippy from "./Klippy"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Screens/Klippy",
	component: Klippy,
	decorators: [ComponentDecorator],
}

const Template: Story = (args) => <Klippy {...args} />

export const Ready = Template.bind({})

export const Starting = Template.bind({})
Starting.decorators = [
	(Story) => (
		<MockStore info={startupInfo}>
			<Story />
		</MockStore>
	),
]

export const Error = Template.bind({})
Error.decorators = [
	(Story) => (
		<MockStore info={errorInfo}>
			<Story />
		</MockStore>
	),
]
