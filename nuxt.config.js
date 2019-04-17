const pkg = require('./package')
const { createRenderer } = require('vue-server-renderer')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/common.css',
    '@/static/font/iconfont.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@plugins/directive.js',
    {
      src: '@plugins/directive.js',
      ssr: true
    }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    prefix: '/api',
    credentials: true
  },

  proxy: {
    // '/api': {
    //   target: 'http://localhost:5000'
    //   // : 'http://yapi.demo.qunar.com/mock/16752'
    // },
    // changeOrigin: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },
  },

}
