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

const route = useRoute()
const blogLength = ref<number>(0)
const currentNumber = ref<number>(Number(route.query.page) || 1)

if (data.value) {
  blogLength.value = data.value?.length
}

const articleArray = computed(() => {
  return data.value?.filter(
    (article, index) =>
      index + 1 >= currentNumber.value * 10 - 9 &&
      index + 1 <= currentNumber.value * 10
  )
})

const pageSelectHandler = (current: number) => {
  currentNumber.value = current
}
</script>

<template>
  <div class="articleCard__container">
    <ArticleCard v-for="item in articleArray" :key="item._id" :article="item" />
  </div>

  <div class="pagination__container">
    <Pagination :blogLength="blogLength" @currentNumber="pageSelectHandler" />
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

.pagination__container {
  display: flex;
  justify-content: center;
}
</style>
