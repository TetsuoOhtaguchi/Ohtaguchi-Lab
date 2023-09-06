<script setup lang="ts">
import { Blog } from '@/types/NewtType'

const { data } = await useAsyncData(async () => {
  const runtimeConfig = useRuntimeConfig()
  const { $newtClient } = useNuxtApp()

  const res = await $newtClient.getContents<Blog>({
    appUid: runtimeConfig.public.NUXT_NEWT_APP_UID,
    modelUid: runtimeConfig.public.NUXT_NEWT_BLOG_MODEL_UID
  })

  return res.items.map((item: Blog) => {
    return {
      id: item._id,
      topicTitle: item.topicTitle,
      publishedAt: item.publishedAt,
      updatedAt: item.updatedAt,
      body: item.body,
      slug: item.slug
    }
  })
})

const handlerArticleOpen = async (id: string) => {
  const target = data.value?.find(article => article.id === id)
  console.log(target?.body, 'get article!')
}
</script>

<template>
  <div>
    <h1>Ohtaguchi Lab</h1>
    <span>blog.vue</span>

    <div class="card__container">
      <div
        v-for="item in data"
        :key="item.id"
        class="card"
        @click="handlerArticleOpen(item.id)"
      >
        <span>{{ item.topicTitle }}</span>
        <span>{{ formatDate(item.publishedAt) }}</span>
        <span>{{ formatDate(item.updatedAt) }}</span>
        <div v-html="$sanitize(item.body)" class="blog__body" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card__container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.card {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  // gap: 24px;
  cursor: pointer;
}

.card:hover {
  opacity: 0.7;
}
</style>
