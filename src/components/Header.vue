<script setup lang="ts">
defineProps({
  /**
   * 表示フラグ
   * @example 'true' | 'false'
   */
  showFlag: { type: Boolean, required: true },
  /**
   * デザイン変更
   * @example 'index' | 'blog'
   */
  designChange: { type: String as PropType<'index' | 'blog'>, default: 'index' }
})

const emit = defineEmits<{
  (e: 'clickAbout'): void
  (e: 'clickContact'): void
}>()
</script>

<template>
  <header
    v-show="showFlag"
    class="header"
    :class="{ flexBox__justify__content: designChange === 'index' }"
  >
    <nav v-show="designChange === 'index'">
      <ul class="header__unorderedList">
        <li class="header__listItem" :class="{ showAbout: showFlag }">
          <button
            class="buttonStyleReset header__listItem__item"
            @click="emit('clickAbout')"
          >
            ABOUT
          </button>
          <div class="header__listItem__underbar" />
        </li>
        <li class="header__listItem" :class="{ showBlog: showFlag }">
          <NuxtLink class="nuxtLink" to="/blog" target="_blank">
            <button class="buttonStyleReset header__listItem__item">
              BLOG
            </button>
            <div class="header__listItem__underbar" />
          </NuxtLink>
        </li>
        <li class="header__listItem" :class="{ showContact: showFlag }">
          <button
            class="buttonStyleReset header__listItem__item"
            @click="emit('clickContact')"
          >
            CONTACT
          </button>
          <div class="header__listItem__underbar" />
        </li>
      </ul>
    </nav>

    <h1 v-show="designChange === 'blog'">
      <NuxtLink class="nuxtLink header__logo__wrapper" to="/">
        <Logo
          size="small"
          color="white"
          alt="フリーランスWeb Ohtaguchi Lab ブログ"
        />
      </NuxtLink>
    </h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 4;
  width: calc(100vw - 32px);
  padding: 0 16px;
  height: 55px;
  display: flex;
  align-items: center;
}

.flexBox__justify__content {
  justify-content: flex-end;
}

.header__unorderedList {
  display: flex;
  gap: 16px;
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

.header__listItem__underbar {
  height: 1px;
  width: 0%;
  transition: 0.6s;
}

.header__listItem:hover .header__listItem__underbar {
  background-color: var(--bg-white);
  width: 100%;
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

.header__logo__wrapper {
  height: auto;
  width: 200px;
}
</style>
