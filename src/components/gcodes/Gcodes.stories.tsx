import React from "react"

import { Story } from "@storybook/react/types-6-0"

import { Moonraker } from "../../moonraker/moonraker"
import { ComponentDecorator } from "../../storybook/decorators"
import { MockStore } from "../../storybook/mocks"
import noopObj from "../../utilities/noopProxy"
import Gcodes from "./Gcodes"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Components/Gcodes",
	component: Gcodes,
	decorators: [ComponentDecorator],
}

const noGcodesNoopPrinter = noopObj({
	listGcodes: () => [],
}) as Moonraker

const Template: Story = (args) => <Gcodes {...args} />

export const Default = Template.bind({})

export const NoGcodes = Template.bind({})
NoGcodes.decorators = [
	(Story) => (
		<MockStore printer={noGcodesNoopPrinter}>
			<Story />
		</MockStore>
	),
]
