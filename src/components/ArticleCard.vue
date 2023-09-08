<script setup lang="ts">
import { PropType } from 'vue'
import { Article } from '@/types/NewtType'

defineProps({
  /**
   * 記事情報
   * @example {
   *  _id: '64ed549cfc6b1d94d0fxxxxx',
   *  _sys: {
   *    raw: {
   *      createdAt: '2023-08-29T02:14:52.005Z',
   *      updatedAt: '2023-09-08T07:11:16.041Z',
   *      firstPublishedAt: '2023-08-29T02:14:52.005Z',
   *      publishedAt: '2023-09-06T08:37:42.049Z'
   *    },
   *    customOrder: 1,
   *    createdAt: '2023-08-29T02:14:52.005Z',
   *    updatedAt: '2023-09-06T08:37:42.049Z'
   *  },
   *  topicTitle: '記事タイトル',
   *  thumbnail: {
   *    _id: '64f83a497375fdc035f3a4eb',
   *    altText: '',
   *    description: '',
   *    fileName: 'example.png',
   *    fileSize: 3020,
   *    fileType: 'image/png',
   *    height: 400,
   *    metadata: {},
   *    src: 'https://ohtaguchi-lab.assets.newt.so/v1/b366ab46-33ed-4f4a-997c-a07cbaeb3da5/example.png',
   *    title: '',
   *    width: 720
   *  },
   *  postExcerpt: '記事抜粋です',
   *  body: '<p>ダミーテキスト</p>',
   *  slug: 'slugText'
   * }
   */
  article: {
    type: Object as PropType<Article>,
    required: true
  }
})
</script>

<template>
  <NuxtLink
    :to="{ path: '/article', query: { id: article._id, slug: article.slug } }"
    class="nuxtLink"
  >
    <article class="articleCard boxShadow">
      <div class="articleCard__topicContainer">
        <h2 class="articleCard__topicTitle__sp">{{ article.topicTitle }}</h2>

        <img :src="article.thumbnail.src" class="articleCard__image" />

        <div>
          <h2 class="articleCard__topicTitle__pc">
            {{ article.topicTitle }}
          </h2>

          <div class="articleCard__timeContainer">
            <time
              :datetime="article._sys.raw.firstPublishedAt"
              class="articleCard__time"
            >
              <i
                class="material-icons-outlined articleCard__time__materialIcon"
              >
                edit
              </i>
              {{ formatDate(article._sys.raw.firstPublishedAt) }}
            </time>
            <time :datetime="article._sys.updatedAt" class="articleCard__time">
              <i
                class="material-icons-outlined articleCard__time__materialIcon"
              >
                update
              </i>
              {{ formatDate(article._sys.updatedAt) }}
            </time>
          </div>
          <p class="articleCard__postExcerpt">{{ article.postExcerpt }}</p>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.articleCard {
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