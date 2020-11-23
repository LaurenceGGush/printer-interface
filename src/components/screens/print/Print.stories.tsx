import React from "react"

import { Story } from "@storybook/react/types-6-0"

import { ComponentDecorator } from "../../../storybook/decorators"
import {
	pausedStatus,
	printingStatus,
	printLoadedStatus,
} from "../../../storybook/mockdata"
import { MockStore } from "../../../storybook/mocks"
import Print from "./Print"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Screens/Print",
	component: Print,
	decorators: [ComponentDecorator],
}

const Template: Story = (args) => <Print {...args} />

export const SelectingFile = Template.bind({})

export const Ready = Template.bind({})
Ready.decorators = [
	(Story) => (
		<MockStore status={printLoadedStatus}>
			<Story />
		</MockStore>
	),
]

export const InProgress = Template.bind({})
InProgress.decorators = [
	(Story) => (
		<MockStore status={printingStatus}>
			<Story />
		</MockStore>
	),
]

export const Paused = Template.bind({})
Paused.decorators = [
	(Story) => (
		<MockStore status={pausedStatus}>
			<Story />
		</MockStore>
	),
]
