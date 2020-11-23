import React from "react"

import { Story } from "@storybook/react/types-6-0"

import { ComponentDecorator } from "../../../storybook/decorators"
import { errorInfo } from "../../../storybook/mockdata"
import { MockStore } from "../../../storybook/mocks"
import Status from "./Status"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Sections/Status",
	component: Status,
	decorators: [ComponentDecorator],
}

const Template: Story = (args) => <Status {...args} />

export const Default = Template.bind({})

export const NotReady = Template.bind({})
NotReady.decorators = [
	(Story) => (
		<MockStore info={errorInfo}>
			<Story />
		</MockStore>
	),
]
