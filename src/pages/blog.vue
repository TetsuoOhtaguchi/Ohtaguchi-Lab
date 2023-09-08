<script setup lang="ts">
import { Article } from '@/types/NewtType'

const { data } = await useAsyncData(async () => {
  const runtimeConfig = useRuntimeConfig()
  const { $newtClient } = useNuxtApp()

  const res = await $newtClient.getContents<Article>({
    appUid: runtimeConfig.public.NUXT_NEWT_APP_UID,
    modelUid: runtimeConfig.public.NUXT_NEWT_BLOG_MODEL_UID
  })

  return res.items.map((item: Article) => {
    return {
      id: item._id,
      topicTitle: item.topicTitle,
      thumbnail: item.thumbnail,
      postExcerpt: item.postExcerpt,
      body: item.body,
      slug: item.slug,
      publishedAt: item.publishedAt,
      updatedAt: item.updatedAt
    }
  })
})

const handlerArticleOpen = async (id: string) => {
  const target = data.value?.find(article => article.id === id)
  console.log(target, 'get article!')
}
</script>

<template>
  <div>
    <h1>Ohtaguchi Lab</h1>
    <span>blog.vue</span>

    <div class="articleCard__container">
      <div v-for="item in data" :key="item.id">
        <article class="articleCard" @click="handlerArticleOpen(item.id)">
          <NuxtLink
            class="articleCard__topicContainer"
            :to="{ path: '/article', query: { id: item.id } }"
          >
            <h2 class="articleCard__topicTitle__sp">{{ item.topicTitle }}</h2>

            <img :src="item.thumbnail.src" class="articleCard__image" />

            <div>
              <h2 class="articleCard__topicTitle__pc">{{ item.topicTitle }}</h2>

              <div class="articleCard__timeContainer">
                <time class="articleCard__time">
                  <i
                    class="material-icons-outlined articleCard__time__materialIcon"
                  >
                    edit
                  </i>
                  {{ formatDate(item.publishedAt) }}
                </time>
                <time class="articleCard__time">
                  <i
                    class="material-icons-outlined articleCard__time__materialIcon"
                  >
                    update
                  </i>
                  {{ formatDate(item.updatedAt) }}
                </time>
              </div>
              <p class="articleCard__postExcerpt">{{ item.postExcerpt }}</p>
            </div>
          </NuxtLink>

          <!-- <div v-html="$sanitize(item.body)" class="articleCard__body" /> -->
        </article>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.articleCard__container {
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
  padding: 0px 32px;
}

.articleCard {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  display: flex;
  flex-direction: column;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: 0.3s;
  padding: 16px;
  width: 100%;
  max-width: 870px;
}

.articleCard__topicContainer {
  display: flex;
  gap: 16px;
  text-decoration: none;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
}

.articleCard__topicTitle__pc {
  width: 528px;
  font-size: 24px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-main);
  @media screen and (max-width: 935px) {
    width: calc(100vw - 406px);
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
}

.articleCard__topicTitle__sp {
  display: none;
  @media screen and (max-width: 700px) {
    display: block;
    width: calc(100vw - 64px);
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.articleCard__timeContainer {
  display: flex;
  gap: 24px;
  margin: 16px 0 20px;
  @media screen and (max-width: 700px) {
    margin: 0 0 16px 0;
  }
}

.articleCard__time {
  font-size: 12px;
  color: var(--text-black);
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
}

.articleCard__time__materialIcon {
  font-size: 12px;
  color: var(--text-black);
}

.articleCard:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.articleCard__image {
  width: calc(100vw - 64px);
  max-width: 326px;
  height: calc(calc(100vw - 64px) / 1.618);
  max-height: 202px;
  object-fit: cover;
  vertical-align: bottom;
  @media screen and (max-width: 700px) {
    max-width: 100%;
    max-height: 393px;
  }
}

.articleCard__postExcerpt {
  color: var(--text-black);
  @media screen and (max-width: 700px) {
    font-size: 14px;
  }
}
</style>
