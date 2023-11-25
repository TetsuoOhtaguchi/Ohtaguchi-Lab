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

const articles = ref<Article[]>()

const getBlogList = async () => {
  const { data } = await useAsyncData(() => {
    const query =
      '/api/getBlogList?page=' + skipValue.value + '&tag=' + route.query.tag
    return $fetch(query)
  })

  articles.value = data.value as Article[]
}

await getBlogList()

// クエリの変更を監視する
watch(
  () => route.query,
  async () => {
    // クエリが変更されるたびに、ブログ情報を取得する
    await getBlogList()
  }
)

useHead({
  title: 'Ohtaguchi Lab Blog',
  meta: [
    {
      name: 'description',
      content:
        'プログラミングや学んだIT技術、開発に携わった案件、日常の出来事などを書き残すためのブログです。'
    },
    {
      property: 'og:title',
      content: 'Ohtaguchi Lab Blog'
    },
    {
      property: 'og:description',
      content:
        'プログラミングや学んだIT技術、開発に携わった案件、日常の出来事などを書き残すためのブログです。'
    },
    {
      property: 'og:url',
      content: 'https://ohtaguchi-lab.com/blog'
    },
    {
      property: 'og:site_name',
      content: 'Ohtaguchi Lab Blog'
    }
  ]
})
</script>

<template>
  <div>
    <ul
      v-if="articles?.length !== 0 && articles !== null"
      class="articleCard__ul"
    >
      <li v-for="item in articles" :key="item._id">
        <ArticleCard :article="item" />
      </li>
    </ul>

    <div v-else class="article__space">
      <span>In preparation. 🙏</span>
    </div>

    <div class="pagination__container">
      <Pagination :articles="articles?.length" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.articleCard__ul {
  display: flex;
  flex-direction: column;
  gap: 64px;
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

.pagination__container {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}
</style>
