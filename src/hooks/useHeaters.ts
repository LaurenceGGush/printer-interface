import { useMemo } from "react"

import { useSelector } from "jotai/utils"

import { statusAtom } from "../store"
import { Heater, PrinterStatus } from "../store/interfaces"

interface IdHeater extends Heater {
	id: string
}

const selectHeaters = (status: PrinterStatus) => {
	let heaters = []

	for (const heater of status.heaters?.available_heaters || []) {
		heaters.push({
			...status[heater],
			temperature: toOneDP(status[heater]?.temperature || 0),
			id: heater,
		} as IdHeater)
	}

	return heaters
}
const equalHeaters = (next: Array<IdHeater>, prev: Array<IdHeater>) => {
	if (next?.length !== prev?.length) {
		return false
	}

	for (const nextHeater of next) {
		const prevHeater = prev.find((heater) => heater.id === nextHeater.id)

		if (!prevHeater) {
			return false
		}

		if (nextHeater.target !== prevHeater.target) {
			return false
		}

		if (
			nextHeater.temperature > prevHeater.temperature + 0.2 ||
			nextHeater.temperature < prevHeater.temperature - 0.2
		) {
			return false
		}
	}

	return true
}

const useHeaters = () => {
	const heaters = useSelector(statusAtom, selectHeaters, equalHeaters)

	const groupedHeaters = useMemo(() => {
		let extruders = []
		let beds = []
		let generics = []

		for (const heater of heaters) {
			if (heater.id.match(/^extruder/)) {
				extruders.push(heater)
			} else if (heater.id.match(/^heater_bed/)) {
				beds.push(heater)
			} else {
				generics.push(heater)
			}
		}

		// console.info("heaters", extruders, beds, generics)

		return { extruders, beds, generics } as {
			extruders: IdHeater[]
			beds: IdHeater[]
			generics: IdHeater[]
		}
	}, [heaters])

	return groupedHeaters
}

const toOneDP = (num: number) => {
	return Math.round(num * 10) / 10
}

export default useHeaters
