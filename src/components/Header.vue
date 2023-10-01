<script setup lang="ts">
defineProps({
  /**
   * 表示フラグ
   * @example 'true' | 'false'
   */
  showFlug: { type: Boolean, required: true }
})

const emit = defineEmits<{
  (e: 'clickAbout'): void
  (e: 'clickContact'): void
}>()
</script>

<template>
  <header v-show="showFlug" class="header">
    <nav>
      <ul class="header__unorderedList">
        <li class="header__listItem" :class="{ showAbout: showFlug }">
          <button
            class="buttonStyleReset header__listItem__item"
            @click="emit('clickAbout')"
          >
            ABOUT
          </button>
        </li>
        <li class="header__listItem" :class="{ showBlog: showFlug }">
          <NuxtLink class="nuxtLink" to="/blog" target="_blank">
            <button class="buttonStyleReset header__listItem__item">
              BLOG
            </button>
          </NuxtLink>
        </li>
        <li class="header__listItem" :class="{ showContact: showFlug }">
          <button
            class="buttonStyleReset header__listItem__item"
            @click="emit('clickContact')"
          >
            CONTACT
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 4;
  width: 100%;
}

.header__unorderedList {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 55px;
  gap: 16px;
  padding: 0 16px;
}

.header__listItem {
  opacity: 0;
}

.header__listItem__item {
  font-size: 18px;
  cursor: pointer;
  color: var(--text-white);
  @media screen and (max-width: 700px) {
    font-size: 14px;
  }
}

.showAbout {
  animation: showAnimation 0.3s forwards;
  animation-delay: 1.3s;
}

.showBlog {
  animation: showAnimation 0.3s forwards;
  animation-delay: 1.6s;
}

.showContact {
  animation: showAnimation 0.3s forwards;
  animation-delay: 1.9s;
}
</style>
