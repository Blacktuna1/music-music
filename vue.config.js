module.exports = {
  pages: {
      index: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        charset: 'UTF-8' // ���ñ��뷽ʽΪUTF-8
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
  //���������������ÿ�����������devServer���Ĵ���
  //�Ա��ڿ��������п���ͨ�����������͵�ָ���ķ������ϡ�
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