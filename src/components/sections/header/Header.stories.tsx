import React from "react"

import { Story } from "@storybook/react/types-6-0"

import { AppRootDecorator } from "../../../storybook/decorators"
import { emptyInfo } from "../../../storybook/mockdata"
import { MockStore } from "../../../storybook/mocks"
import Header, { HeaderProps } from "./Header"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Sections/Header",
	component: Header,
	decorators: [AppRootDecorator],
}

const Template: Story<HeaderProps> = (args) => <Header {...args} />

export const Default = Template.bind({})

export const NotReady = Template.bind({})
NotReady.decorators = [
	(Story) => (
		<MockStore info={emptyInfo}>
			<Story />
		</MockStore>
	),
]
