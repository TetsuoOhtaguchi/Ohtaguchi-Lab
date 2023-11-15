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

const postExcerpt = data.value?.postExcerpt || ''
const strippedExcerpt = postExcerpt.replace(/(<([^>]+)>)/gi, '')

useHead({
  title: data.value?.topicTitle,
  meta: [
    {
      name: 'description',
      content: strippedExcerpt
    },
    {
      property: 'og:title',
      content: data.value?.topicTitle
    },
    {
      property: 'og:description',
      content: strippedExcerpt
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'og:image',
      content: data.value?.thumbnail.src
    },
    {
      property: 'og:url',
      content: 'https://ohtaguchi-lab.com' + route.fullPath
    },
    {
      property: 'og:site_name',
      content: 'Ohtaguchi Lab Blog'
    }
  ]
})
</script>

<template>
  <div class="articleContentsWrapper">
    <ArticleContents v-if="data" :article="data" />
    <div v-else class="article__space">
      <span>Loading...</span>
    </div>

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

.article__space {
  width: 870px;
  text-align: center;
  font-size: 24px;
  color: var(--text-white);
  @media screen and (max-width: 870px) {
    width: calc(100vw - 32px);
  }
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
