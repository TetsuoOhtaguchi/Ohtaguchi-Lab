// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ohtaguchi Lab',
      htmlAttrs: {
        lang: 'ja'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Tetsuo Ohtaguchi | フリーランスエンジニアとして、テクノロジーの世界に挑戦中。Vue.js、Nuxt.jsを駆使し、魅力的なWeb体験の提供を目指す。'
        },
        {
          property: 'og:title',
          content: 'Ohtaguchi Lab'
        },
        {
          property: 'og:description',
          content:
            'フリーランスエンジニアとして、テクノロジーの世界に挑戦中。Vue.js、Nuxt.jsを駆使し、魅力的なWeb体験の提供を目指す。'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: 'https://ohtaguchi-lab.com/'
        },
        {
          property: 'og:image',
          content:
            'https://ohtaguchi-lab.com/assets/images/pngs/ohtaguchi_lab_icatch.png'
        },
        {
          property: 'og:site_name',
          content: 'Ohtaguchi Lab'
        },
        {
          property: 'og:locale',
          content: 'ja_JP'
        }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined'
        }
      ]
    }
  },
  nitro: {
    preset: 'firebase'
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  srcDir: 'src/',
  css: [
    '@/assets/css/reset.css',
    '@/assets/css/variable.css',
    '@/assets/css/keyframes.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/sanitizeArticle.scss";'
        }
      }
    }
  },
  components: ['~/components'],
  runtimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    newt: {
      spaceUid: '',
      cdnApiToken: ''
    }
  }
})
