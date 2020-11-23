import { useContext } from "react"

import { machineContext } from "../machines"

const useAdjustMachine = () => {
	const machine = useContext(machineContext)

	if (!machine) {
		throw new Error('Must be used inside "MachineProvider"')
	}

	return machine
}

export default useAdjustMachine
