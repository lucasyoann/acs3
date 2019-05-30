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
			    test: /\.css$/,
			    include: /stylesheets|node_modules/,
			    use: ["style-loader", "css-loader"]
			},
			{
			    test: /\.scss$/,
			    include: /stylesheets/,
			    use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			}
	  ]
  },
  plugins: [
    new CleanWebpackPlugin(
    	helpers.root('src/main/webapp/dist'),
	    {
	        root: helpers.root(),
	        verbose: true
	    }
	),
    new HtmlWebpackPlugin({
    	template: 'src/main/webapp/index.html'
    })
  ],
  resolve:{
	  extensions: [".js", ".ts", ".scss"]
  }
};