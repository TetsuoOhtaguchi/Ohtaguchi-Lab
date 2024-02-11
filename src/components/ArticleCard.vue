<script setup lang="ts">
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
    :to="{
      path: '/blog/detail',
      query: { id: article._id, slug: article.slug }
    }"
    class="nuxtLink"
  >
    <article class="articleCard">
      <div class="articleCard__topicContainer">
        <h2 class="articleCard__topicTitle__sp">{{ article.topicTitle }}</h2>

        <img :src="article.thumbnail.src" class="articleCard__thumbnail" />

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
              {{ useFormatData(article._sys.raw.firstPublishedAt) }}
            </time>
            <time
              v-if="
                useFormatData(article._sys.raw.firstPublishedAt) !==
                useFormatData(article._sys.updatedAt)
              "
              :datetime="article._sys.updatedAt"
              class="articleCard__time"
            >
              <i
                class="material-icons-outlined articleCard__time__materialIcon"
              >
                update
              </i>
              {{ useFormatData(article._sys.updatedAt) }}
            </time>
          </div>
          <div
            v-html="$sanitize(article.postExcerpt)"
            class="articleCard__postExcerpt"
          />
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.articleCard {
  background-color: var(--bg-cardBlack);
  color: var(--text-articleWhite);
  display: flex;
  flex-direction: column;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: 0.3s;
  padding: 16px;
  max-width: 838px;
  width: 100%;
  @media screen and (max-width: 902px) {
    width: calc(100vw - 64px);
  }
}

.articleCard__topicContainer {
  display: flex;
  gap: 16px;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 32px;
  }
}

.articleCard__topicTitle__pc {
  width: 496px;
  font-size: 18px;
  font-weight: 600;
  color: var(--main-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 902px) {
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
    font-size: 20px;
    font-weight: 600;
    overflow-wrap: break-word;
    line-height: 1.3;
  }
}

.articleCard__timeContainer {
  display: flex;
  gap: 32px;
  margin: 16px 0 32px;
  @media screen and (max-width: 700px) {
    margin: 0 0 16px 0;
  }
}

.articleCard__time {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
}

.articleCard__time__materialIcon {
  font-size: 12px;
}

.articleCard:hover {
  box-shadow: 0px 0px 150px rgba(255, 255, 255, 1);
}

.articleCard__thumbnail {
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
</style>
