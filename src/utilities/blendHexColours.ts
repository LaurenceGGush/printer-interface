const hexColourValidator = new RegExp(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)

function blendHexColours(colour1: string, colour2: string, factor = 0.5) {
	let hex1 = (colour1.match(hexColourValidator) || [])[1]
	let hex2 = (colour2.match(hexColourValidator) || [])[1]

	if (!hex1 || !hex2) {
		// console.info({ colour1, hex1, colour2, hex2 })
		throw new Error("colors must be provided as hexes")
	}
	if (factor > 1 || factor < 0) {
		throw new Error("percentage must be between 0 and 1")
	}

	hex1 = threeToSix(hex1)
	hex2 = threeToSix(hex2)

	const rgb1 = hexToRgb(hex1)
	const rgb2 = hexToRgb(hex2)

	const blended = [
		(1 - factor) * rgb1[0] + factor * rgb2[0],
		(1 - factor) * rgb1[1] + factor * rgb2[1],
		(1 - factor) * rgb1[2] + factor * rgb2[2],
	]

	const hex = rgbToHex(blended)

	return `#${hex}`
}

function threeToSix(hex: string) {
	if (hex.length === 6) {
		return hex
	}

	return hex
		.split("")
		.map((char) => char + char)
		.join("")
}

function hexToRgb(hex: string) {
	return [
		parseInt(hex[0] + hex[1], 16),
		parseInt(hex[2] + hex[3], 16),
		parseInt(hex[4] + hex[5], 16),
	]
}

function rgbToHex(rgb: number[]) {
	return rgb
		.map((num) => Math.round(num).toString(16).padStart(2, "0"))
		.join("")
}

export default blendHexColours
