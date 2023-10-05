<script setup lang="ts">
import { Article } from '@/types/NewtType'

definePageMeta({
  layout: 'blog-layout'
})

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
</script>

<template>
  <div class="articleCard__container">
    <ArticleCard v-for="item in data" :key="item._id" :article="item" />
  </div>
</template>

<style lang="scss" scoped>
.articleCard__container {
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
  padding: 96px 16px;
}
</style>
