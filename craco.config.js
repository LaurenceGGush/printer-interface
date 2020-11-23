module.exports = {
	babel: {
		plugins: [
			[
				"@emotion",
				{
					autoLabel: "always",
					sourceMap: true,
					labelFormat: "[filename][local]",
				},
			],
		],
	},
	// webpack: {
	// 	plugins: [
	// 		new (require("webpack-bundle-analyzer").BundleAnalyzerPlugin)(),
	// 	],
	// },
}
