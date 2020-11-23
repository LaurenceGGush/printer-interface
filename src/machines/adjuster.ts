import { useCallback, useMemo } from "react"

import { useMachine } from "react-robot"
import { createMachine, Machine, reduce, state, transition } from "robot3"

// states
const IDLE = "IDLE"
const ADJUSTING = "ADJUSTING"
// transitions
const ADJUST = "ADJUST"
export const CLOSE = "CLOSE"

const adjuster = createMachine(
	{
		[IDLE]: state(
			transition(
				ADJUST,
				ADJUSTING,
				reduce((_, ev: any) => ({ id: ev.id, props: ev.props })),
			),
		),
		[ADJUSTING]: state(
			transition(
				CLOSE,
				IDLE,
				reduce(() => ({})),
			),
		),
	},
	() => ({ id: "", props: {} }),
) as Machine

interface AdjustContext {
	id: string
	props: object
}

const useAdjustMachine = () => {
	const [current, send] = useMachine(adjuster)

	const isAdjusting = useMemo(() => current.name === ADJUSTING, [
		current.name,
	])

	const createSendAdjust = useCallback(
		(id: string, props: object) => () =>
			send({
				type: ADJUST,
				id,
				props,
			}),
		[send],
	)

	const closeAdjust = useCallback(() => send(CLOSE), [send])

	return {
		isAdjusting,
		adjustContext: current.context as AdjustContext,
		closeAdjust,
		createSendAdjust,
	}
}

export default useAdjustMachine
