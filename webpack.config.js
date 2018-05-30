const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      'src/index.html',
    ])
  ],
};
