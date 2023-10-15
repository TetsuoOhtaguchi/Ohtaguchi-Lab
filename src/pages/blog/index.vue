<script setup lang="ts">
import { Article } from '@/types/NewtType'

definePageMeta({
  layout: 'blog-layout'
})

onMounted(() => {
  setTimeout(() => {
    window.scrollTo({
      top: 0
    })
  }, 0)
})

const route = useRoute()

const pageNumber = ref<number>()
if (!route.query.page) {
  pageNumber.value = 1
} else {
  pageNumber.value = Number(route.query.page)
}

const skipValue = ref<number>((pageNumber.value - 1) * 10)

const { data } = await useAsyncData(async () => {
  const runtimeConfig = useRuntimeConfig()
  const { $newtClient } = useNuxtApp()

  const res = await $newtClient.getContents<Article>({
    appUid: runtimeConfig.public.NUXT_NEWT_APP_UID,
    modelUid: runtimeConfig.public.NUXT_NEWT_BLOG_MODEL_UID,
    query: {
      skip: skipValue.value,
      limit: 10,
      tag: route.query.tag
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
})
</script>

<template>
  <div class="blogIndex">
    <div>
      <ul class="articleCard__ul">
        <li v-for="item in data" :key="item._id">
          <ArticleCard :article="item" />
        </li>
      </ul>

      <div class="pagination__container">
        <Pagination :articles="data?.length" />
      </div>
    </div>

    <Sidebar />
  </div>
</template>

<style lang="scss" scoped>
.blogIndex {
  display: flex;
  justify-content: center;
  padding: 96px 16px 64px;
  gap: 40px;
  @media screen and (max-width: 1117px) {
    flex-direction: column;
    align-items: center;
    gap: 64px;
  }
}

.articleCard__ul {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.pagination__container {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}
</style>
