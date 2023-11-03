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
    type: Object as PropType<Article | null>,
    required: true
  }
})
</script>

<template>
  <article class="articleContents">
    <div class="articleContents__articleHeader">
      <h1 class="articleContents__articleHeader__h1">
        {{ article?.topicTitle }}
      </h1>

      <div class="articleContents__articleHeader__timeContainer">
        <time
          :datetime="article?._sys.raw.firstPublishedAt"
          class="articleContents__articleHeader__time"
        >
          <i
            class="material-icons-outlined articleContents__articleHeader__materialIcon"
          >
            edit
          </i>
          {{ useFormatData(article?._sys.raw.firstPublishedAt) }}
        </time>
        <time
          :datetime="article?._sys.updatedAt"
          class="articleContents__articleHeader__time"
        >
          <i
            class="material-icons-outlined articleContents__articleHeader__materialIcon"
          >
            update
          </i>
          {{ useFormatData(article?._sys.updatedAt) }}
        </time>
      </div>

      <img
        :src="article?.thumbnail.src"
        class="articleContents__articleHeader__thumbnail"
      />

      <div
        v-html="$sanitize(article?.postExcerpt)"
        class="articleContents__articleHeader__postExcerpt"
      />
    </div>

    <div v-html="$sanitize(article?.body)" class="articleContents__body" />
  </article>
</template>

<style lang="scss">
.articleContents {
  max-width: 870px;
  width: 100%;
  overflow-wrap: break-word;
  text-align: justify;
  text-justify: inter-ideograph;
  background-color: var(--bg-cardBlack);
}

.articleContents__articleHeader {
  padding: 32px 32px 0 32px;
  @media screen and (max-width: 700px) {
    padding: 16px;
  }
}

.articleContents__articleHeader__h1 {
  font-size: 28px;
  line-height: 1.6;
  color: var(--text-articleWhite);
  @media screen and (max-width: 700px) {
    font-size: 20px;
  }
}

.articleContents__articleHeader__timeContainer {
  display: flex;
  gap: 32px;
  margin: 64px 0 32px;
  color: var(--text-articleWhite);
  @media screen and (max-width: 700px) {
    gap: 16px;
    margin: 32px 0 16px;
  }
}

.articleContents__articleHeader__time {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
}

.articleContents__articleHeader__materialIcon {
  font-size: 12px;
}

.articleContents__articleHeader__thumbnail {
  width: calc(100vw - 64px);
  max-width: 806px;
  height: calc(calc(100vw - 64px) / 1.618);
  max-height: 499px;
  object-fit: cover;
  vertical-align: bottom;
  @media screen and (max-width: 902px) {
    width: calc(100vw - 96px);
    height: calc(calc(100vw - 96px) / 1.618);
  }
  @media screen and (max-width: 700px) {
    width: calc(100vw - 64px);
    height: calc(calc(100vw - 64px) / 1.618);
  }
}
</style>
