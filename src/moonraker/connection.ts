import { uucid } from "uucid"

import deferred from "../utilities/deferred"

let socket: WebSocket

const errorExcludeList = [
	"Metadata not available for",
	//"Klippy Request Timed Out",
]
const requests = new Map()
const subscriptions = new Map()

async function connection(url: string) {
	if (socket instanceof WebSocket && socket.readyState === WebSocket.OPEN) {
		return { request, subscribe, unsubscribe }
	}

	await connect(url)

	return { request, subscribe, unsubscribe }
}

async function connect(url: string) {
	const { promise, resolve } = deferred()
	socket = new WebSocket(url)

	socket.onopen = (event) => {
		console.info("socket opened", event)

		if (subscriptions.has("socketOpened")) {
			subscriptions.get("socketOpened")()
		}

		// setTimeout(() => resolve(), 2000)
		resolve()
	}

	socket.onclose = (event) => {
		console.info(`socket closed: ${event.reason}`, `reconnecting in 1s`)

		if (subscriptions.has("socketClosed")) {
			subscriptions.get("socketClosed")()
		}

		setTimeout(() => {
			connect(url)
		}, 1000)
	}

	socket.onerror = (error) => {
		console.error("socket error: ", error)
		socket.close()
	}

	socket.onmessage = handleMessage

	return promise
}

async function request(
	method: string,
	params?: object,
	action = "",
): Promise<any> {
	if (socket.readyState !== WebSocket.OPEN) {
		return new Error("socket not open")
	}

	const { promise, resolve, reject } = deferred()

	const id = uucid()

	requests.set(id, {
		method,
		action,
		params,
		resolve,
		reject,
	})

	socket.send(createMessage(method, params, id))

	return promise
}

function subscribe(method: string, callback: Function) {
	console.info("sub", method)
	subscriptions.set(method, callback)
}

function unsubscribe(method: string) {
	console.info("unsub", method)
	subscriptions.delete(method)
}

function handleMessage(message: MessageEvent) {
	const data = JSON.parse(message.data)

	if (!Object.prototype.hasOwnProperty.call(data, "id")) {
		if (subscriptions.has(data.method)) {
			subscriptions.get(data.method)(data.params)
		}

		return
	}

	if (requests.has(data.id)) {
		const request = requests.get(data.id)
		requests.delete(data.id)

		if (data.error && data.error.message) {
			if (
				!errorExcludeList.find((element) =>
					data.error.message.startsWith(element),
				)
			) {
				console.error(
					`Response Error: ${request.action} > ${data.error.message}`,
				)

				const errorData = {
					id: data.id,
					method: request.method,
					action: request.action,
					data: {
						requestParams: request.params,
						error: data.error,
					},
				}

				request.reject(errorData)
			}
		} else {
			const result = data.result === "ok" ? true : data.result

			request.resolve(result)
		}
	}
}

function createMessage(method: string, params?: object, id?: string) {
	return JSON.stringify({
		jsonrpc: "2.0",
		method,
		params,
		id,
	})
}

export default connection
