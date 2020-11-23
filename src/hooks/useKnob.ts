import { MutableRefObject, useCallback, useEffect, useRef } from "react"

export const useKnob = (setValue: (x: Function) => void, step = 5) => {
	const ref = useRef(null)

	const handlePointerMove = useCallback(
		(offsetLeft, offsetTop, offsetWidth, offsetHeight) => (
			event: PointerEvent,
		) => {
			const { x, y } = event
			const midX = offsetLeft + offsetWidth / 2
			const midY = offsetTop + offsetHeight / 2

			setValue((value: number) => value + knob(x, y, midX, midY, step))
		},
		[setValue, step],
	)

	useEffect(() => moveEffect(ref, handlePointerMove), [handlePointerMove])

	return ref
}

export const useSlide = (
	min: number,
	max: number,
	setValue: (x: Function | number) => void,
) => {
	const ref = useRef(null)

	const handlePointerMove = useCallback(
		(offsetLeft, offsetTop, offsetWidth, offsetHeight) => (
			event: PointerEvent,
		) => {
			const { x, y } = event
			const midX = offsetLeft + offsetWidth / 2
			const posY = offsetTop + offsetHeight

			const position = slide(x, y, midX, posY, min, max)

			setValue(position)
		},
		[setValue, min, max],
	)

	useEffect(() => moveEffect(ref, handlePointerMove), [handlePointerMove])

	return ref
}

function moveEffect(
	ref: MutableRefObject<HTMLElement | null>,
	handleMove: (
		left: number,
		top: number,
		width: number,
		height: number,
	) => (e: PointerEvent) => void,
) {
	const { current } = ref
	if (!current) {
		return
	}

	const { left, top, width, height } = current.getBoundingClientRect()

	const handlePointerMove = handleMove(left, top, width, height)

	const handlePointerDown = () => {
		lastVal = 0
		current.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		})
		current.addEventListener("pointerup", handlePointerUp, {
			passive: true,
		})
	}
	const handlePointerUp = () => {
		current.removeEventListener("pointermove", handlePointerMove)
		current.removeEventListener("pointerup", handlePointerUp)
	}
	current.addEventListener("pointerdown", handlePointerDown, {
		passive: true,
	})

	return () => {
		current.removeEventListener("pointerdown", handlePointerDown)
		current.removeEventListener("pointerup", handlePointerUp)
		current.removeEventListener("pointermove", handlePointerMove)
	}
}

let lastVal: number
function knob(
	x: number,
	y: number,
	midX: number,
	midY: number,
	step = 5,
	steps = 3,
) {
	const val = xyToVal(x, y, midX, midY)

	if (!lastVal) {
		lastVal = val
		return 0
	}

	const difference = val - lastVal
	const direction = difference >= 0 ? 1 : -1
	const amplitude = Math.round(Math.abs(difference) / steps)

	if (!amplitude) {
		return 0
	}

	lastVal = val

	if (amplitude > 100 / steps - steps) {
		return direction * step
	}

	return direction * amplitude * step
}

function slide(
	x: number,
	y: number,
	midX: number,
	posY: number,
	min = 0,
	max = 300,
	step = 5,
) {
	const val = xyToVal(x, y, midX, posY, min, max, 110, 140)

	return Math.round(val / step) * step
}

function xyToVal(
	cursorX: number,
	cursorY: number,
	positionX: number,
	positionY: number,
	min = 0,
	max = 100,
	offset = 0,
	arc = 360,
) {
	const x = cursorY - positionY
	const y = -(cursorX - positionX)

	const TAU = 2 * Math.PI

	const offsetRad = degToRad(offset)
	const arcRad = degToRad(arc)

	let angle = Math.atan2(y, x) - offsetRad
	if (arcRad !== TAU && angle < 0 && angle > -0.5) {
		angle = 0
	} else if (angle < 0) {
		angle += TAU
	}

	const normalised = Math.round((angle * (max - min)) / arcRad + min)

	return normalised
}

function degToRad(degrees: number) {
	return (degrees * Math.PI) / 180
}
