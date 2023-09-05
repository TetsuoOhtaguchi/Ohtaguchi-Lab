import { createClient } from 'newt-client-js'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const newtClient = createClient({
    spaceUid: runtimeConfig.public.NUXT_NEWT_SPACE_UID as string,
    token: runtimeConfig.public.NUXT_NEWT_CDN_API_TOKEN as string,
    apiType: 'cdn'
  })

  return {
    provide: {
      newtClient
    }
  }
})
