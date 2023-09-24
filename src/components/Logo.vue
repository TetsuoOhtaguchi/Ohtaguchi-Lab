<script setup lang="ts">
defineProps({
  /**
   * サイズ
   * @example 'large' | 'small'
   */
  size: { type: String as PropType<'large' | 'small'>, required: true },
  /**
   * カラー
   * @example 'white' | 'black'
   */
  color: { type: String as PropType<'white' | 'black'>, required: true }
})
</script>

<template>
  <img
    v-show="size === 'large' && color === 'white'"
    src="@/assets/images/svgs/ohtaguchi-lab-logo-large-white.svg"
    alt="事業ロゴ"
    class="logo"
  />

  <img
    v-show="size === 'small' && color === 'white'"
    src="@/assets/images/svgs/ohtaguchi-lab-logo-small-white.svg"
    alt="事業ロゴ"
    class="logo"
  />

  <img
    v-show="size === 'large' && color === 'black'"
    src="@/assets/images/svgs/ohtaguchi-lab-logo-large-black.svg"
    alt="事業ロゴ"
    class="logo"
  />

  <img
    v-show="size === 'small' && color === 'black'"
    src="@/assets/images/svgs/ohtaguchi-lab-logo-small-black.svg"
    alt="事業ロゴ"
    class="logo"
  />
</template>

<style lang="scss">
.logo {
  width: 100%;
  height: auto;
  vertical-align: middle;
}
</style>
