import { createContext, FC } from "react"

import useAdjustMachine from "../machines/adjuster"

type MachineContext = ReturnType<typeof useAdjustMachine> | undefined
export const machineContext = createContext<MachineContext>(undefined)

const MachineProvider: FC = ({ children }) => {
	const {
		isAdjusting,
		adjustContext,
		closeAdjust,
		createSendAdjust,
	} = useAdjustMachine()

	return (
		<machineContext.Provider
			value={{
				isAdjusting,
				adjustContext,
				closeAdjust,
				createSendAdjust,
			}}
		>
			{children}
		</machineContext.Provider>
	)
}

export default MachineProvider
