<script setup lang="ts">
defineProps({
  /**
   * ページ内の記事数
   * @example 10
   */
  articles: { type: Number, default: undefined }
})

const route = useRoute()

const pageNumber = ref<number>()
const tagNumber = ref<number>()

if (!route.query.page) {
  pageNumber.value = 1
} else {
  pageNumber.value = Number(route.query.page)
}

if (route.query.tag) {
  tagNumber.value = Number(route.query.tag)
}
</script>

<template>
  <div class="pagination">
    <NuxtLink
      v-show="pageNumber !== 1"
      class="nuxtLink linkWrapper"
      :to="{
        path: '/blog',
        query: { page: pageNumber! - 1, tag: tagNumber }
      }"
    >
      <i class="material-icons-outlined">keyboard_double_arrow_left</i>
      BACK
    </NuxtLink>
    <NuxtLink
      v-show="articles === 10"
      class="nuxtLink linkWrapper"
      :to="{
        path: '/blog',
        query: { page: pageNumber! + 1, tag: tagNumber }
      }"
    >
      NEXT
      <i class="material-icons-outlined">keyboard_double_arrow_right</i>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  color: var(--text-white);
  display: flex;
  gap: 32px;
}

.linkWrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-white);
  transition: 0.3s;
}

.linkWrapper:hover {
  color: var(--text-hoverBlack);
}
</style>
