<script setup lang="ts">
const props = defineProps({
  /**
   * ブログ総数
   * @example 100
   */
  blogLength: { type: Number, required: true }
})

const emit = defineEmits<{
  (e: 'currentNumber', value: number): void
}>()

const route = useRoute()

const currentNumber = ref<number>()
if (!route.query.page) {
  currentNumber.value = 1
} else {
  currentNumber.value = Number(route.query.page)
}

const lastPage = ref<number>(0)
if (props.blogLength % 10 === 0) {
  lastPage.value = props.blogLength / 10
} else {
  lastPage.value = Math.floor(props.blogLength / 10) + 1
}

const list = computed(() => {
  const targetArray = []
  const numberToCheck = props.blogLength
  const divisor = 10
  const count = Math.floor(props.blogLength / 10)

  if (
    currentNumber.value &&
    numberToCheck > 50 &&
    numberToCheck % divisor === 0
  ) {
    // 50記事以上であり、10で割り切れる場合
    if (currentNumber.value <= 3) {
      // 現在地が3より小さい場合
      for (let i = 0; i < 5; i++) {
        targetArray.push(i + 1)
      }
    } else if (currentNumber.value > 3 && currentNumber.value < count - 2) {
      // 現在地が3より大きいく、末尾の番号から2下の値より小さい場合
      for (let i = currentNumber.value - 3; i < currentNumber.value + 2; i++) {
        targetArray.push(i + 1)
      }
    } else {
      // 現在地が末尾の番号から2下の間の場合
      for (let i = count - 5; i < count; i++) {
        targetArray.push(i + 1)
      }
    }
  } else if (
    currentNumber.value &&
    numberToCheck <= 50 &&
    numberToCheck % divisor === 0
  ) {
    // 50記事以下であり、10で割り切れる場合
    for (let i = 0; i < count; i++) {
      targetArray.push(i + 1)
    }
  } else if (
    currentNumber.value &&
    numberToCheck > 50 &&
    numberToCheck % divisor !== 0
  ) {
    // 50記事以上であり、10で割り切れない場合
    if (currentNumber.value <= 3) {
      // 現在地が3より小さい場合
      for (let i = 0; i < 5; i++) {
        targetArray.push(i + 1)
      }
    } else if (currentNumber.value > 3 && currentNumber.value < count - 1) {
      // 現在地が3より大きいく、末尾の番号から2下の値より小さい場合
      for (let i = currentNumber.value - 3; i < currentNumber.value + 2; i++) {
        targetArray.push(i + 1)
      }
    } else {
      // 現在地が末尾の番号から2下の間の場合
      for (let i = count - 4; i < count + 1; i++) {
        targetArray.push(i + 1)
      }
    }
  } else if (
    currentNumber.value &&
    numberToCheck <= 50 &&
    numberToCheck % divisor !== 0
  ) {
    // 50記事以下であり、10で割り切れない場合
    for (let i = 0; i < count + 1; i++) {
      targetArray.push(i + 1)
    }
  }

  return targetArray
})

const selectPageHandler = (pageNumber: number) => {
  currentNumber.value = pageNumber
  emit('currentNumber', currentNumber.value)
}
</script>

<template>
  <ul class="pagination">
    <NuxtLink
      v-if="blogLength > 50"
      :to="{
        path: '/blog',
        query: { page: 1 }
      }"
      class="nuxtLink pagination__list"
      @click="selectPageHandler(1)"
    >
      <i class="material-icons-outlined">keyboard_double_arrow_left</i>
    </NuxtLink>
    <li v-for="item in list" :key="item">
      <NuxtLink
        :to="{
          path: '/blog',
          query: { page: item }
        }"
        class="nuxtLink pagination__list"
        :class="{
          pagination__list__current: item === currentNumber,
          pagination__list__other: item !== currentNumber
        }"
        @click="selectPageHandler(item)"
      >
        {{ item }}
      </NuxtLink>
    </li>
    <NuxtLink
      v-if="blogLength > 50"
      :to="{
        path: '/blog',
        query: { page: lastPage }
      }"
      class="nuxtLink pagination__list"
      @click="selectPageHandler(lastPage)"
    >
      <i class="material-icons-outlined">keyboard_double_arrow_right</i>
    </NuxtLink>
  </ul>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 8px;
  width: fit-content;
}

.pagination__button {
  height: 32px;
  width: 32px;
  background-color: var(--bg-cardBlack);
  color: var(--text-white);
  font-size: 14px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  transition: 0.3s;
}

.pagination__button:hover {
  background-color: var(--bg-hoverBlack);
}

.pagination__list {
  height: 32px;
  width: 32px;
  color: var(--text-white);
  font-size: 14px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  transition: 0.3s;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.pagination__list__current {
  background-color: var(--bg-black);
  cursor: default;
}

.pagination__list__other {
  background-color: var(--bg-cardBlack);
  cursor: pointer;
}

.pagination__list__other:hover {
  background-color: var(--bg-hoverBlack);
}
</style>
