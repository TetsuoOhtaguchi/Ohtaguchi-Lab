// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ohtaguchi Lab',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [{ charset: 'utf-8' }],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined'
        }
      ]
    }
  },
  typescript: {
    strict: true
  },
  srcDir: 'src/',
  css: ['@/assets/css/reset.css', '@/assets/css/variable.css'],
  components: ['~/components']
})
