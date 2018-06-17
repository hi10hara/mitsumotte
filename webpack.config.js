const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoader = require('vue-loader/lib/plugin')
const {join,resolve} = require('path')
module.exports = {
  target:'web',
  mode:'development',
  entry:{
    main:join(__dirname, 'app-src','js','index.js')
  },
  resolve:{
    extensions: ['*', '.js', '.vue', '.json']
  },
  externals:{
    'Hammer':'root'
  },
  output:{
    path:join(__dirname, 'public', 'app', 'bundle'),
    filename:'[name].js'
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use:[
          {
            loader:'file-loader',
            options:{
              name:'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'bundle.css'
    }),
    new VueLoader()
  ]
}