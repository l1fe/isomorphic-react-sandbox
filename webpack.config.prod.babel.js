import webpack from 'webpack';
import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
  mode: 'production',
  entry: [
    'babel-regenerator-runtime',
    path.resolve(__dirname, 'src/'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
};
