import React from "react"

import { TabsProps } from "@chakra-ui/react"
import { Story } from "@storybook/react/types-6-0"

import { ComponentDecorator } from "../../../storybook/decorators"
import Tabs from "./Tabs"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Sections/Tabs",
	component: Tabs,
	decorators: [ComponentDecorator],
}

export const Default: Story<TabsProps> = (args) => <Tabs {...args} />
