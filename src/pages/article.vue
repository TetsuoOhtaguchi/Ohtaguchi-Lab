<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Article } from '@/types/NewtType'

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
  margin-top: 100px;
  padding: 0 16px;
}
</style>
