/**
 * No-op object, used to log and optionally mock data when rendering components
 * in storybook
 *
 * @param methods Methods to override
 */
const noopObj = (methods: any = {}, log = logger) =>
	new Proxy(
		{},
		{
			get: (_, key) => {
				if (methods[key]) {
					return methods[key]
				}

				return (...args: any) => log(key, args)
			},
		},
	)

const logger = (key: string | number | symbol, args: any) =>
	console.info("noop", key, args)

export default noopObj
