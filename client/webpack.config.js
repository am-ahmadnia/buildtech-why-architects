const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname + '/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg|jpg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/',
      //       },
      //     },
      //   ],
      // },
      ////////////////////////
      // {
      //   test: /\.(jpg|png|gif|svg|pdf|ico)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[path][name]-[hash:8].[ext]',
      //       },
      //     },
      //   ],
      // },
      ////////////////////
      {
        test: /\.(jpg|jpeg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
  },
};
