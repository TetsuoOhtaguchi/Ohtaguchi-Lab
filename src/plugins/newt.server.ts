import { createClient } from 'newt-client-js'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const newtClient = createClient({
    spaceUid: runtimeConfig.newt.spaceUid,
    token: runtimeConfig.newt.cdnApiToken,
    apiType: 'cdn'
  })

  return {
    provide: {
      newtClient
    }
  }
})
