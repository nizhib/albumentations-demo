// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  css: {
    sourceMap: true
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Albumentations Demo'
        return args
      })
  },
  configureWebpack: {
    plugins: [
      // new HtmlWebpackPlugin({
      //   title: 'Albumentations Demo',
      //   template: 'public/index.html'
      // }),
      // new FaviconsWebpackPlugin({
      //   logo: './src/assets/images/logo.png',
      //   mode: 'webapp',
      //   devMode: 'webapp',
      //   cache: true,
      //   prefix: 'assets/images/icons/',
      //   inject: true,
      //   favicons: {
      //     appName: 'albumentations-demo',
      //     appDescription: 'Albumentations Demo',
      //     developerName: 'Evgeny Nizhibitsky',
      //     developerURL: 'https://github.com/nizhib',
      //     background: '#fff',
      //     theme_color: '#ff0000',
      //     icons: {
      //       android: true,
      //       appleIcon: true,
      //       appleStartup: false,
      //       coast: false,
      //       favicons: true,
      //       firefox: false,
      //       windows: false,
      //       yandex: false
      //     }
      //   }
      // })
    ]
  },
  devServer: {
    proxy: {
      '^/api/': {
        target: 'http://127.0.0.1:5000',
        pathRewrite: { '^/api/': '' },
        secure: false
      }
    }
  }
}
