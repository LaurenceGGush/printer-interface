import React, { FC } from "react"

import { Story } from "@storybook/react/types-6-0"
import { useUpdateAtom } from "jotai/utils"

import { Moonraker } from "../../../moonraker/moonraker"
import { statusAtom } from "../../../store"
import { ComponentDecorator } from "../../../storybook/decorators"
import { pausedStatus } from "../../../storybook/mockdata"
import { MockStore } from "../../../storybook/mocks"
import noopObj from "../../../utilities/noopProxy"
import Tools from "./Tools"

const ToolsDecorator: FC<Story> = (Story) => {
	const updateStatus = useUpdateAtom(statusAtom)
	const noopPrinter = noopObj({
		extruder: async (extruder: string) =>
			updateStatus({ toolhead: { extruder: `extruder${extruder}` } }),
		tool: async (tool: string) =>
			updateStatus({
				toolhead: { extruder: `extruder${tool}` },
				dock: {
					tool_number: `${parseInt(tool, 10) + 1}`,
				},
			}),
		dropoff: async () =>
			updateStatus({
				dock: {
					tool_number: undefined,
				},
			}),
	}) as Moonraker

	return (
		<MockStore printer={noopPrinter}>
			<Story />
		</MockStore>
	)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Screens/Tools",
	component: Tools,
	decorators: [ComponentDecorator, ToolsDecorator],
}

const Template: Story = (args) => <Tools {...args} />

export const Default = Template.bind({})

export const PrintingInProgress = Template.bind({})
PrintingInProgress.decorators = [
	(Story) => (
		<MockStore status={pausedStatus}>
			<Story />
		</MockStore>
	),
]
