import React, { useEffect } from "react"

import { Story } from "@storybook/react/types-6-0"
import { useAtom } from "jotai"

import Printer from "./Printer"
import { infoAtom } from "./store"
import { AppRootDecorator } from "./storybook/decorators"
import { disconnectedInfo, readyInfo } from "./storybook/mockdata"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Printer",
	component: Printer,
	decorators: [AppRootDecorator],
}

const Template: Story = (args) => <Printer {...args} />

export const Ready = Template.bind({})

export const DisconnectReconnect = Template.bind({})
DisconnectReconnect.decorators = [
	(Story) => {
		const [info, updateInfo] = useAtom(infoAtom)

		useEffect(() => {
			if (!info.hostname) {
				return
			}

			setTimeout(() => {
				info.state !== "ready"
					? updateInfo(readyInfo)
					: updateInfo(disconnectedInfo)
			}, 2000)
		}, [info, updateInfo])

		return <Story />
	},
]
