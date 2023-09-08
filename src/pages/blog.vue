<script setup lang="ts">
import { Article } from '@/types/NewtType'

const { data } = await useAsyncData(async () => {
  const runtimeConfig = useRuntimeConfig()
  const { $newtClient } = useNuxtApp()

  const res = await $newtClient.getContents<Article>({
    appUid: runtimeConfig.public.NUXT_NEWT_APP_UID,
    modelUid: runtimeConfig.public.NUXT_NEWT_BLOG_MODEL_UID
  })

  return res.items.map((item: Article) => {
    return {
      _id: item._id,
      _sys: item._sys,
      topicTitle: item.topicTitle,
      thumbnail: item.thumbnail,
      postExcerpt: item.postExcerpt,
      body: item.body,
      slug: item.slug
    }
  })
})

// const handlerArticleOpen = async (id: string) => {
//   const target = data.value?.find(article => article.id === id)
//   console.log(target, 'get article!')
// }
</script>

<template>
  <div>
    <h1>Blog</h1>

    <div class="articleCard__container">
      <ArticleCard v-for="item in data" :key="item._id" :article="item" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.articleCard__container {
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
  padding: 0px 32px;
}
</style>
