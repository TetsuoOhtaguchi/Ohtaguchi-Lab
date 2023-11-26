<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi'

const props = defineProps({
  /**
   * 表示フラグ
   * @example true: 表示 | false: 非表示
   */
  modelValue: { type: Boolean, required: true },
  /**
   * モーダルコンテンツ
   * @example 'about' | 'contact'
   */
  modalContentsItem: {
    type: String as PropType<'about' | 'contact' | ''>,
    default: ''
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'clickClose', val: boolean): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value: boolean) => {
    emit('update:modelValue', value)
  }
})

const showState = ref(false)
const modalContentsItem = ref<'about' | 'contact' | ''>('')
watch(model, () => {
  modalContentsItem.value = props.modalContentsItem
  if (!model.value) {
    showState.value = false
  }
  if (model.value) {
    setTimeout(() => {
      showState.value = true
    }, 3000)
  }
})

const closeClickHandler = () => {
  showState.value = false
  setTimeout(() => {
    model.value = false
    emit('clickClose', false)
  }, 3000)
}
</script>

<template>
  <div v-show="model" class="modal">
    <div class="modal__slotWrapper">
      <transition name="showItem">
        <div
          v-show="showState"
          class="modal__slot"
          :class="{
            modal__slot__about: modalContentsItem === 'about',
            modal__slot__contact: modalContentsItem === 'contact'
          }"
        >
          <slot />
        </div>
      </transition>
    </div>

    <transition name="showItem">
      <button
        v-show="showState"
        class="buttonStyleReset modal__closeButton"
        @click="closeClickHandler"
      >
        <i class="material-icons-outlined">close</i>
      </button>
    </transition>

    <div
      class="modal__line modal__line--1"
      :class="{ drawLineAnimation1: model && !showState }"
    />

    <div
      class="modal__line modal__line--2"
      :class="{ drawLineAnimation2: model && !showState }"
    />

    <div
      class="modal__line modal__line--3"
      :class="{ drawLineAnimation3: model && !showState }"
    />
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: relative;
}

.modal__slotWrapper {
  position: absolute;
  top: 0;
  z-index: 6;
  background-color: var(--bg-black);
  color: var(--text-white);
  width: 100vw;
  animation: modalAddHeightAnimation 1s forwards;
  animation-delay: 1s;
}

.modal__slot {
  transition: 0.3s;
  padding: 0 16px;
}

.modal__slot__about {
  display: grid;
  place-content: center;
  height: 100vh;
}

.modal__slot__contact {
  max-width: 500px;
  margin: 55px auto 0 auto;
  padding-bottom: 55px;
}

.showItem-enter-avtive,
.showItem-leave-active {
  opacity: 1;
}

.showItem-enter-from,
.showItem-leave-to {
  opacity: 0;
}

.modal__closeButton {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 7;
  color: var(--text-white);
  width: 30px;
  height: 30px;
  display: grid;
  align-items: center;
  border-radius: 50%;
  transition: 0.3s;
}
.modal__closeButton:hover {
  background-color: var(--text-white);
  color: var(--text-black);
}

.modal__line {
  background-color: var(--bg-white);
  position: absolute;
  z-index: 8;
  height: calc(100vh / 3);
  width: 0px;
}

.modal__line--1 {
  top: 0;
  right: 0;
}

.modal__line--2 {
  top: calc(100vh / 3);
}

.modal__line--3 {
  top: calc(calc(100vh / 3) * 2);
  right: 0;
}

.drawLineAnimation1 {
  animation: drawLineAnimation 2s forwards;
}

.drawLineAnimation2 {
  animation: drawLineAnimation 2s forwards;
  animation-delay: 0.5s;
}

.drawLineAnimation3 {
  animation: drawLineAnimation 2s forwards;
  animation-delay: 1s;
}
</style>
