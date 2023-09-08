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
  console.log(res)

  return res
})
</script>

<template>
  <article class="articleContents boxShadow">
    <h1>{{ data?.topicTitle }}</h1>

    <div>
      <time :datetime="data?._sys.raw.firstPublishedAt">
        {{ formatDate(data?._sys.raw.firstPublishedAt) }}
      </time>
      <time :datetime="data?._sys.raw.updatedAt">
        {{ formatDate(data?._sys.raw.updatedAt) }}
      </time>
    </div>

    <!-- <img :src="data?.thumbnail.src" /> -->

    <p>{{ data?.postExcerpt }}</p>

    <!-- todo ここにbodyの目次が欲しい -->

    <div v-html="$sanitize(data?.body)" class="article__body" />
  </article>
</template>

<style lang="scss">
.articleContents {
  width: 870px;
}
</style>
