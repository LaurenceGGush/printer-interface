import React from "react"

import { Story } from "@storybook/react/types-6-0"
import { FiSquare } from "react-icons/fi"

import Nozzle from "../../icons/Nozzle"
import { ComponentDecorator } from "../../storybook/decorators"
import Temperature, { TemperatureProps } from "./Temperature"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Components/Temperature",
	component: Temperature,
	decorators: [ComponentDecorator],
	argTypes: {
		current: { control: { type: "range", min: 0, max: 300, step: 1 } },
		target: { control: { type: "range", min: 0, max: 300, step: 1 } },
		min: { control: { type: "range", min: 0, max: 300, step: 1 } },
		max: { control: { type: "range", min: 0, max: 300, step: 1 } },
	},
}

const Template: Story<TemperatureProps> = (args) => <Temperature {...args} />

export const Default = Template.bind({})

export const Heating = Template.bind({})
Heating.args = {
	icon: Nozzle,
	current: 200,
	target: 250,
}

export const Cooling = Template.bind({})
Cooling.args = {
	icon: Nozzle,
	current: 200,
	target: 0,
}

export const HotHotHot = Template.bind({})
HotHotHot.args = {
	icon: Nozzle,
	current: 301,
}

export const HotBed = Template.bind({})
HotBed.args = {
	icon: FiSquare,
	current: 58,
	target: 60,
	min: 20,
	max: 100,
}
