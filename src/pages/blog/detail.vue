<script setup lang="ts">
import { Article } from '@/types/NewtType'

definePageMeta({
  layout: 'blog-layout'
})

const route = useRoute()
const router = useRouter()

const article = ref<Article>()

const getBlogDetail = async () => {
  const { data } = await useAsyncData(() => {
    const query = '/api/getBlogDetail?id=' + route.query.id
    return $fetch(query)
  })

  article.value = data.value as Article
}

await getBlogDetail()

const postExcerpt = article.value?.postExcerpt || ''
const strippedExcerpt = postExcerpt.replace(/(<([^>]+)>)/gi, '')

useHead({
  title: article.value?.topicTitle,
  meta: [
    {
      name: 'description',
      content: strippedExcerpt
    },
    {
      property: 'og:title',
      content: article.value?.topicTitle
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
      content: article.value?.thumbnail.src
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
    <ArticleContents v-if="article" :article="article" />
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
