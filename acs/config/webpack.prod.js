const merge = require('webpack-merge');
const ngw = require('@ngtools/webpack');
const common = require('./webpack.common');
const helpers = require('./helpers');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('mini-css-extract-plugin');
const cssnano = require('cssnano');


module.exports = merge(common, {
  mode: 'production',
  output: {
	    path: helpers.root('dist'),
	    publicPath: '/',
	    filename: '[hash].js',
	    chunkFilename: '[id].[hash].chunk.js'
	},
  optimization: {
	    noEmitOnErrors: true,
	    splitChunks: {
	        chunks: 'all'
	    },
	    runtimeChunk: 'single',
	    minimizer: [
	        new UglifyJsPlugin({
	            cache: true,
	            parallel: true
	        }),
	         new OptimizeCSSAssetsPlugin({
	             cssProcessor: cssnano,
	             cssProcessorOptions: {
	                 discardComments: {
	                     removeAll: true
	                 }
	             },
	             canPrint: false
	         })
	    ]
	},
  module: {
	    rules: [
	        {
	            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
	            loader: '@ngtools/webpack'
	        }
	    ]
	},
  plugins: [
	    new ngw.AngularCompilerPlugin({
	        tsConfigPath: helpers.root('tsconfig.aot.json'),
	        entryModule: helpers.root('src', 'app', 'modules', 'app', 'app.module#AppModule')
	    })
	]
});