const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

const common = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"]
	}
}

const client = {
	entry: './src/client',
	output: {
		path: path.join(__dirname, 'static'),
		filename: 'js/client-bundle.js'
	},
	module: {
		rules: common.module.rules.concat([
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [
						'css-loader',
						{
							loader: 'clean-css-loader',
							options: {
								level: 2,
								inline: ['none']
							}
						}
					]
				})
			}
		])
	},
	plugins: [
		new ExtractTextPlugin('css/styles.css'),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			parallel: true,
			sourceMap: true,
			uglifyOptions: {
				compress: {
					dead_code: true,
					conditionals: true,
					comparisons: true,
					evaluate: true,
					booleans: true,
					loops: true,
					unused: true,
					toplevel: true,
					if_return: true,
					join_vars: true,
					cascade: true,
					collapse_vars: true,
					reduce_vars: true,
					warnings: false
				}
			}
		}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.(js|css)$/,
			threshold: 10240,
			minRatio: 0.8
		})
	],
	devtool: 'nosources-source-map'
}

const server = {
	entry: './src/server',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'server-bundle.js'
	},
	target: 'node',
	node: {
		__dirname: true
	},
	externals: [nodeExternals()],
	devtool: 'source-map'
}

module.exports = [
	Object.assign({}, common, client),
	Object.assign({}, common, server)
]
