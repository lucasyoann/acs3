const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: 'dist'
	},
	output: {
	    path: helpers.root('dist'),
	    publicPath: '/',
	    filename: '[name].bundle.js',
	    chunkFilename: '[id].chunk.js'
	},
	optimization: {
	    noEmitOnErrors: true
	},
	module: {
	    rules: [
	    	{
	    	    test: /\.ts$/,
	    	    loaders: [
	    	        'babel-loader',
	    	        {
	    	            loader: 'awesome-typescript-loader',
	    	            options: {
	    	                configFileName: helpers.root('tsconfig.json')
	    	            }
	    	        },
	    	        'angular2-template-loader',
	    	        'angular-router-loader'
	    	    ],
	    	    exclude: [/node_modules/]
	    	}
	  ]
  },
  devServer: {
	    historyApiFallback: true,
	    stats: 'minimal'
  }
});