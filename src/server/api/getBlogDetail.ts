import { createClient } from 'newt-client-js'
import { Article } from '../../types/NewtType'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async event => {
  // @ts-ignore
  const runtimeConfig = useRuntimeConfig()

  const query = getQuery(event)
  const queryId = query.id

  const newtClient = createClient({
    spaceUid: runtimeConfig.public.NUXT_NEWT_SPACE_UID as string,
    token: runtimeConfig.public.NUXT_NEWT_CDN_API_TOKEN as string,
    apiType: 'cdn'
  })

  const res = await newtClient.getContent<Article>({
    appUid: runtimeConfig.public.NUXT_NEWT_APP_UID,
    modelUid: runtimeConfig.public.NUXT_NEWT_BLOG_MODEL_UID,
    contentId: queryId as string
  })

  return res
})
