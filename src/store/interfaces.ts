export interface PrinterInfo {
	state?: string
	state_message?: string
	hostname?: string
	software_version?: string
}

export interface Heater {
	temperature: number
	target: number
}

export type Heaters = Array<
	"extruder" | "extruder1" | "extruder2" | "extruder3" | "heater_bed"
>

export interface PrinterStatus {
	extruder?: Heater
	extruder1?: Heater
	extruder2?: Heater
	extruder3?: Heater
	heater_bed?: Heater
	heaters?: {
		//TODO add heater_generic_XX
		available_heaters: Heaters
	}
	gcode_move?: {
		speed_factor: number
		extrude_factor: number
		gcode_position: number[]
	}
	fan?: { speed: number }
	print_stats?: {
		state: string
		print_duration: number
		filename: string
	}
	virtual_sdcard?: {
		is_active: boolean
		progress?: number
	}
	display_status?: {
		progress: number
	}
	pause_resume?: {
		is_paused: boolean
	}
	toolhead?: { extruder: string }
	webhooks?: { state: string; state_message: string }
	dock?: { tool_number?: string }
}
