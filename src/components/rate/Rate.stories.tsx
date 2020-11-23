import React from "react"

import { Story } from "@storybook/react/types-6-0"
import { BiTachometer } from "react-icons/bi"

import { ComponentDecorator } from "../../storybook/decorators"
import Rate, { RateProps } from "./Rate"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Components/Rate",
	component: Rate,
	decorators: [ComponentDecorator],
	argTypes: {
		highlight: { control: "color" },
		rate: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
		nominal: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
	},
}

const Template: Story<RateProps> = (args) => <Rate {...args} />

export const Default = Template.bind({})

export const SalmonTacho = Template.bind({})
SalmonTacho.args = {
	icon: BiTachometer,
	highlight: "lightsalmon",
	rate: 0.2,
	nominal: 1,
}
