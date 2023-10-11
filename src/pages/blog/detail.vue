<script setup lang="ts">
import { Article } from '@/types/NewtType'

definePageMeta({
  layout: 'blog-layout'
})

const route = useRoute()

const { data } = await useAsyncData(async () => {
  const runtimeConfig = useRuntimeConfig()
  const { $newtClient } = useNuxtApp()

  const res = await $newtClient.getContent<Article>({
    appUid: runtimeConfig.public.NUXT_NEWT_APP_UID,
    modelUid: runtimeConfig.public.NUXT_NEWT_BLOG_MODEL_UID,
    contentId: route.query.id as string
  })

  return res
})
</script>

<template>
  <div class="articleVue">
    <ArticleContents v-if="data" :article="data" />
    <div v-else>読み込み中です...</div>
  </div>
</template>

<style lang="scss" scoped>
.articleVue {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 16px;
}
</style>
