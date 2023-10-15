<script setup lang="ts">
const showFlag = ref(false)

onMounted(() => {
  window.addEventListener('scroll', function () {
    if (!showFlag.value && document.documentElement.scrollTop > 0) {
      showFlag.value = true
      return
    }
    if (showFlag.value && document.documentElement.scrollTop === 0) {
      showFlag.value = false
      return
    }
  })
})

const clickHandler = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <transition name="scrollTopButton">
    <button
      v-show="showFlag"
      class="buttonStyleReset scrollTopButton"
      @click="clickHandler"
    >
      <i class="material-icons-outlined scrollTopButton__arrow">
        arrow_upward
      </i>
    </button>
  </transition>
</template>

<style lang="scss" scoped>
.scrollTopButton {
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  transition: 0.3s;
  background-color: var(--bg-black);
}

.scrollTopButton__arrow {
  color: var(--text-white);
  font-size: 30px;
}

.scrollTopButton-enter-avtive,
.scrollTopButton-leave-active {
  opacity: 1;
}

.scrollTopButton-enter-from,
.scrollTopButton-leave-to {
  opacity: 0;
}
</style>
