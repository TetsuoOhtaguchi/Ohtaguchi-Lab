<script setup lang="ts">
defineProps({
  /**
   * 制御
   * @example true | false
   */
  disabled: { type: Boolean, required: true }
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    :disabled="disabled"
    type="submit"
    class="buttonStyleReset sendButton"
    :class="{
      sendButton__disabled: disabled,
      sendButton__disabledRelease: !disabled
    }"
    @click="() => emit('click')"
  >
    Send
  </button>
</template>

<style lang="scss" scoped>
.sendButton {
  width: 200px;
  height: 48px;
  background-color: var(--bg-cardBlack);
  font-size: 16px;
  transition: 0.3s;
}

.sendButton__disabled {
  color: var(--text-black);
  cursor: not-allowed;
}

.sendButton__disabledRelease {
  color: var(--text-white);
  cursor: pointer;
}

.sendButton__disabledRelease:hover {
  box-shadow: 0px 0px 150px rgba(255, 255, 255, 1);
}
</style>
