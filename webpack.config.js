// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // ...其他配置...
  module: {
    rules: [
      // ...其他规则...
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // Make sure to include the plugin!
    new VueLoaderPlugin()
  ]
};