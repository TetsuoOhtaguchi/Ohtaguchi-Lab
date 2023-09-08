// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ohtaguchi Lab',
      htmlAttrs: {
        lang: 'ja'
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
  nitro: {
    preset: 'firebase'
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  srcDir: 'src/',
  css: ['@/assets/css/reset.css', '@/assets/css/variable.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/sanitizeArticleBody.scss";'
        }
      }
    }
  },
  components: ['~/components'],
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,

      NUXT_NEWT_SPACE_UID: process.env.NUXT_NEWT_SPACE_UID,
      NUXT_NEWT_CDN_API_TOKEN: process.env.NUXT_NEWT_CDN_API_TOKEN,
      NUXT_NEWT_APP_UID: process.env.NUXT_NEWT_APP_UID,
      NUXT_NEWT_BLOG_MODEL_UID: process.env.NUXT_NEWT_BLOG_MODEL_UID
    }
  }
})
