<script setup lang="ts">
// スクロールさせない関数
function disableScroll(e: Event) {
  e.preventDefault()
}

// スクロールさせない設定
onMounted(() => {
  // PC
  document.addEventListener('touchmove', disableScroll, { passive: false })
  // SP
  document.addEventListener('mousewheel', disableScroll, { passive: false })
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>
