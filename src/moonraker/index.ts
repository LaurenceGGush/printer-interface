import { GcodeFile } from "../hooks/useGcodes"
import { PrinterInfo, PrinterStatus } from "../store/interfaces"
import Connection from "./connection"
import methods from "./definitions"

// if not in dev and running locally connect directly to moonraker
const socketUrl =
	process.env.NODE_ENV !== "development" &&
	global.document.location.hostname === "localhost"
		? "ws://0.0.0.0/websocket"
		: "ws://192.168.1.158/websocket"

async function moonraker() {
	const connection = await Connection(socketUrl)
	// console.info("socket", socket)

	return {
		gcode(script: string) {
			return connection.request(methods.gcode_script.method, { script })
		},

		info(): Promise<PrinterInfo> {
			return connection.request(methods.printer_info.method).then(
				(result: any) => result,
				(error) => console.error(error),
			)
		},

		status(objects: object) {
			return connection
				.request(methods.object_status.method, {
					objects,
				})
				.then(
					(result: any) => result.status,
					(error) => console.error(error),
				)
		},

		subscribeKlippyReady(callback: () => void) {
			connection.subscribe(methods.notify_klippy_ready.method, callback)

			return () =>
				connection.unsubscribe(methods.notify_klippy_ready.method)
		},
		subscribeKlippyDisconnected(callback: () => void) {
			connection.subscribe(
				methods.notify_klippy_disconnected.method,
				callback,
			)

			return () =>
				connection.unsubscribe(
					methods.notify_klippy_disconnected.method,
				)
		},
		subscribeSocketClosed(callback: () => void) {
			connection.subscribe("socketClosed", callback)

			return () => connection.unsubscribe("socketClosed")
		},
		subscribeSocketOpened(callback: () => void) {
			connection.subscribe("socketOpened", callback)

			return () => connection.unsubscribe("socketOpened")
		},

		subscribeStatusUpdates(
			objects: object,
			callback: (newStatus: PrinterStatus) => void,
		) {
			connection.request(methods.object_subscription.method, {
				objects,
			})
			connection.subscribe(
				methods.notify_status.method,
				(newStatus: PrinterStatus[]) => callback(newStatus[0]),
			)

			return () => connection.unsubscribe(methods.notify_status.method)
		},

		async restart() {
			console.info(
				"restart",
				await connection.request(methods.restart.method),
			)
		},
		async reallyRestart() {
			console.info(
				"really restart",
				await connection.request(methods.firmware_restart.method),
			)
		},
		async reboot() {
			console.info(
				"reboot",
				await connection.request(methods.reboot.method),
			)
		},

		async fanSpeed(speed = 0) {
			console.info(
				`fan speed: ${speed}`,
				await connection.request(methods.gcode_script.method, {
					script: `m106 s${speed * 2.55}`,
				}),
			)
		},

		async queryEndstops() {
			console.info(
				"endstops",
				await connection.request(methods.query_endstops.method),
			)
		},

		async start(filename: string) {
			console.info(
				"start",
				await connection.request(methods.start_print.method, {
					filename,
				}),
			)
		},
		async pause() {
			console.info(
				"pause",
				await connection.request(methods.pause_print.method),
			)
		},
		async resume() {
			console.info(
				"resume",
				await connection.request(methods.resume_print.method),
			)
		},
		async cancel() {
			console.info(
				"cancel",
				await connection.request(methods.cancel_print.method),
			)
		},

		async extruderTemperature(temperature: number, extruder = 0) {
			console.info(
				"e temp",
				await connection.request(methods.gcode_script.method, {
					script: `m104 t${extruder} s${temperature}`,
				}),
			)
		},
		async bedTemperature(temperature: number) {
			console.info(
				"bed temp",
				await connection.request(methods.gcode_script.method, {
					script: `m140 s${temperature}`,
				}),
			)
		},
		async feedRate(rate = 100) {
			console.info(
				"feed rate",
				await connection.request(methods.gcode_script.method, {
					script: `m220 s${rate}`,
				}),
			)
		},
		async flowRate(rate = 100) {
			console.info(
				"flow rate",
				await connection.request(methods.gcode_script.method, {
					script: `m221 s${rate}`,
				}),
			)
		},
		leds() {
			connection.request(methods.gcode_script.method, {
				script: `LEDS`,
			})
		},

		async listGcodes(): Promise<GcodeFile[]> {
			return await connection.request(methods.file_list.method)
		},
		filemeta(filename: string): object {
			return connection.request(methods.metadata.method, {
				filename,
			})
		},

		async loadGcode(filename: string) {
			console.info(
				"loaded gcode",
				await connection.request(methods.gcode_script.method, {
					script: `M23 ${filename}`,
				}),
			)
		},
		async unLoadGcode() {
			console.info(
				"unloaded gcode",
				await connection.request(methods.gcode_script.method, {
					script: `SDCARD_RESET_FILE`,
				}),
			)
		},

		async init() {
			console.info(
				"INIT",
				await connection.request(methods.gcode_script.method, {
					script: `INIT`,
				}),
			)
		},
		async tram() {
			console.info(
				"Tram",
				await connection.request(methods.gcode_script.method, {
					script: `Z_TILT_ADJUST`,
				}),
			)
		},

		async extruder(extruder: string) {
			const ext = parseInt(extruder, 10)
				? `extruder${extruder}`
				: "extruder"
			console.info(
				`E${extruder}`,
				await connection.request(methods.gcode_script.method, {
					script: `activate_extruder extruder=${ext}`,
				}),
			)
		},

		async tool(tool: string) {
			console.info(
				`T${tool}`,
				await connection.request(methods.gcode_script.method, {
					script: `T${tool}`,
				}),
			)
		},
		async dropoff() {
			console.info(
				"dropoff",
				await connection.request(methods.gcode_script.method, {
					script: `TOOL_DROPOFF`,
				}),
			)
		},

		async moveBy(distance: number, axis: string) {
			console.info(
				`${axis} ${distance}`,
				await connection.request(methods.gcode_script.method, {
					script: `MOVE_BY A=${axis} D=${distance}`,
				}),
			)
		},

		async extrude(distance: number, feed: number) {
			console.info(
				`E ${distance}`,
				await connection.request(methods.gcode_script.method, {
					script: `MOVE_BY A=E D=${distance} F=${feed * 60}`,
				}),
			)
		},

		async nozzleScrub() {
			console.info(
				"scrub",
				await connection.request(methods.gcode_script.method, {
					script: `NOZZLE_SCRUB`,
				}),
			)
		},

		async turnOffMotors() {
			console.info(
				"turn off motors",
				await connection.request(methods.gcode_script.method, {
					script: `M84`,
				}),
			)
		},
	}
}

export default moonraker
