<script setup lang="ts">
import { Article } from '@/types/NewtType'

definePageMeta({
  layout: 'blog-layout'
})

const route = useRoute()
const router = useRouter()

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
  <div class="articleContentsWrapper">
    <ArticleContents v-if="data" :article="data" />
    <div v-else class="loading__text">読み込み中です...</div>
    <button class="buttonStyleReset backButton" @click="() => router.back()">
      <i class="material-icons-outlined">keyboard_double_arrow_left</i>
      BACK
    </button>
  </div>
</template>

<style lang="scss" scoped>
.articleContentsWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading__text {
  color: var(--text-white);
}

.backButton {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-white);
  transition: 0.3s;
  margin-top: 32px;
  font-size: 16px;
}

.backButton:hover {
  color: var(--text-hoverBlack);
}
</style>
