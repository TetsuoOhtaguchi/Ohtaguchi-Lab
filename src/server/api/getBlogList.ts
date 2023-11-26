import { createClient } from 'newt-client-js'
import { Article } from '../../types/NewtType'
import { defineEventHandler, getQuery } from 'h3'
import { type } from 'os'

export default defineEventHandler(async event => {
  // @ts-ignore
  const runtimeConfig = useRuntimeConfig()

  const newtClient = createClient({
    spaceUid: runtimeConfig.public.NUXT_NEWT_SPACE_UID as string,
    token: runtimeConfig.public.NUXT_NEWT_CDN_API_TOKEN as string,
    apiType: 'cdn'
  })

  const query = getQuery(event)
  const queryPageSkipValue = Number(query.page)
  const queryTag = query.tag

  if (queryTag === 'undefined') {
    // タグが選択されていない場合
    const res = await newtClient.getContents<Article>({
      appUid: runtimeConfig.public.NUXT_NEWT_APP_UID,
      modelUid: runtimeConfig.public.NUXT_NEWT_BLOG_MODEL_UID,
      query: {
        skip: queryPageSkipValue,
        limit: 10
      }
    })

    return res.items.map((item: Article) => {
      return {
        _id: item._id,
        _sys: item._sys,
        topicTitle: item.topicTitle,
        thumbnail: item.thumbnail,
        postExcerpt: item.postExcerpt,
        body: item.body,
        slug: item.slug,
        tag: item.tag
      }
    })
  } else {
    // タグが選択されている場合
    const res = await newtClient.getContents<Article>({
      appUid: runtimeConfig.public.NUXT_NEWT_APP_UID,
      modelUid: runtimeConfig.public.NUXT_NEWT_BLOG_MODEL_UID,
      query: {
        skip: queryPageSkipValue,
        limit: 10,
        tag: queryTag as string
      }
    })

    return res.items.map((item: Article) => {
      return {
        _id: item._id,
        _sys: item._sys,
        topicTitle: item.topicTitle,
        thumbnail: item.thumbnail,
        postExcerpt: item.postExcerpt,
        body: item.body,
        slug: item.slug,
        tag: item.tag
      }
    })
  }
})
