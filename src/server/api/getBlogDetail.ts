import { createClient } from 'newt-client-js'
import { Article } from '../../types/NewtType'
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async event => {
  // @ts-ignore
  const runtimeConfig = useRuntimeConfig()

  const query = getQuery(event)
  const queryId = query.id

  const newtClient = createClient({
    spaceUid: runtimeConfig.newt.spaceUid,
    token: runtimeConfig.newt.cdnApiToken,
    apiType: 'cdn'
  })

  const res = await newtClient.getContent<Article>({
    appUid: 'appUidBlog',
    modelUid: 'modelUidArticle',
    contentId: queryId as string
  })

  return res
})
