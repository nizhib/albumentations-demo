const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');

module.exports = {
  css: {
    sourceMap: true
  },
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Albumentations',
        template: 'public/index.html'
      }),
      new WebappWebpackPlugin({
        logo: './src/assets/images/logo.png',
        cache: true,
        prefix: 'assets/images/icons/',
        inject: true,
        favicons: {
          appName: 'albumentations',
          appDescription: 'Albumentations',
          developerName: 'Evgeny Nizhibitsky',
          developerURL: 'https://github.com/albu/albumentations',
          background: '#fff',
          theme_color: '#ff0000',
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            windows: false,
            yandex: false,
          },
        },
      })
    ]
  },
  devServer: {
    proxy: {
      '^/api/': {
        target: 'http://127.0.0.1:5000',
        pathRewrite: {'^/api/' : ''},
        secure: false
      }
    }
  }
};
