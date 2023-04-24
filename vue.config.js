module.exports = {
  pages: {
      index: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        charset: 'UTF-8' // 设置编码方式为UTF-8
      }
  },
  configureWebpack: {
      resolve: {
          alias: {
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'network': '@/network',
              'views': '@/views',
              'plugins': '@/plugins',
          }
      }
  },
  //该配置项用于设置开发服务器（devServer）的代理，
  //以便在开发过程中可以通过代理将请求发送到指定的服务器上。
  devServer: {
      proxy: {
          '/api': {
              // target: 'https://www.codeman.store',
              target: 'http://www.codeman.ink:3000',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/api': ''
              }
          },
          'm7': {
              target: 'http://m7.music.126.net',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/m7': ''
              }
          },
          'm701': {
              target: 'http://m701.music.126.net',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/m701': ''
              }
          },
          'm8': {
              target: 'http://m8.music.126.net',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/m8': ''
              }
          },
          'm801': {
              target: 'http://m801.music.126.net',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/m801': ''
              }
          }
      }
  },
}