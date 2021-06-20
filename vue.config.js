const path = require('path')
const merge = require('webpack-merge')
const isLib = process.env.npm_lifecycle_event === 'build:lib'
const isProd = process.env.NODE_ENV === 'production'
const inlineLimit = 204800 // 200KB

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  outputDir: 'build',
  publicPath: './',
  css: {
    extract: false
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Pdf Canvas Docs'
    }
  },
  configureWebpack: config => {
    if (isProd) {
      if (isLib) {
        config.output.libraryExport = 'default'
        config.externals = {
          'pdfjs-dist': 'pdfjsLib',
          './pdf.worker.js': 'pdfjsWorker'
        }
      } else {
        config.externals = {
          vue: 'Vue',
          'highlight.js': 'hljs'
        }
      }
    } else {
      config.externals = {
        'pdfjsLib': 'pdfjsLib',
        'pdfjsWorker': 'pdfjsWorker'
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('md-loader')
      .loader(path.resolve(__dirname, './md-loader/index.js'))

    config.module.rule('svg').uses.clear()

    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options =>
        merge(options, {
          limit: inlineLimit
        })
      )
  }
}
