export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: "/vendor/jquery/jquery.min.js" },
      { src: "/vendor/bootstrap/js/bootstrap.bundle.min.js" },
      { src: "/vendor/jquery-easing/jquery.easing.min.js" },
      { src: "/js/sb-admin-2.min.js" },
      // thema front
      { src: "/subuh/js/jquery.min.js" }, 
      { src: "/subuh/js/slick.min.js" }, 
      { src: "/subuh/js/plyr.min.js" }, 
      { src: "/subuh/js/masonry.pkgd.min.js" }, 
      { src: "/subuh/js/imagesloaded.pkgd.min.js" }, 
      { src: "/subuh/js/vimeo.player.min.js" }, 
      //{ src: "/subuh/js/main.js" }, 
    ]
  },
  /*
  ** Global CSS
  */
 css: [
  'assets/css/style.css',
  'quill/dist/quill.snow.css',
  'quill/dist/quill.bubble.css',
  'quill/dist/quill.core.css',
  // sbadmin
  //'@/assets/vendor/fontawesome-free/css/all.min.css',
  //'@/assets/css/sb-admin-2.min.css',
  // thema front
  '@/assets/subuh/css/pro.min.css',
  '@/assets/subuh/css/elegant.css',
  '@/assets/subuh/css/custom_bootstrap.css',
  '@/assets/subuh/css/slick.css',
  '@/assets/subuh/css/plyr.min.css',
  '@/assets/subuh/css/style.css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    //{ src: '~plugins/ckeditor', ssr: false }
    { src: "~plugins/vue-quill-editor.js", ssr: false },
    { src: "~plugins/Sweetalert.js", ssr: false },
    //thema
    //{ src: "~plugins/main.js",ssr: false},
  ],
  /**
   * Router Settings
   */
  router:{
    middleware :['authenticated']
  },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    
  },
  
}
