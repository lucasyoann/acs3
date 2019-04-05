const path = require('path');
const helpers = require('./helpers');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
	    polyfills: './src/main/webapp/polyfills.ts',
	    main: './src/main/webapp/app.main.ts'
  },
  module: {
	    rules: [
		  {
			    test: /\.html$/,
			    loader: 'html-loader'
		  },
		  {
		    test: /\.(scss|sass)$/,
		    use: [
		        'to-string-loader',
		        { 
		            loader: 'css-loader', 
		            options: { 
		                sourceMap: true 
		            } 
		        },
		        { 
		            loader: 'sass-loader', 
		            options: { 
		                sourceMap: true 
		            } 
		        }
		    ],
		    include: helpers.root('src', 'webapp')
		  }
	  ]
  },
  plugins: [
    new CleanWebpackPlugin(
    	helpers.root('dist'),
	    {
	        root: helpers.root(),
	        verbose: true
	    }
	),
    new HtmlWebpackPlugin({
    	template: 'src/main/webapp/index.html'
    })
  ]
};