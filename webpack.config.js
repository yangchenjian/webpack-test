var path = require('path')
//extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var webpack = require('webpack')

module.exports={
	entry: './src/entry.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'js/[name].min.[chunkhash].js',
		hashDigestLength:3
	},
	mode: 'production',
	plugins:[
		new ExtractTextPlugin({
			filename: "css/[name].min.[chunkhash].css",
			disable: false,
			allChunks: true
		}),
		new HtmlWebpackPlugin(),
		new HtmlWebpackPlugin({ 
		template: path.resolve(__dirname,'index.html'),
      	minify:{
                removeAttributeQuotes:true,
                collapseWhitespace:true
            }
    })
	],
	optimization: {
    	minimizer: [
      	new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
	module:{
		rules:[
			{
				test:/\.css$/,
				use: ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:{
						loader:'css-loader',
						options: {
                           sourceMap: true,
                           improtloaders:1,
                           minimize: true
                        }
					}
				})
			}
			]
			
	}


}	
