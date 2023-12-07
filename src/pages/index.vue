<script setup lang="ts">
const firstPlayback = ref(false)
const color = ref<'black' | 'white'>('black')
const colorChangeState = ref(false)
const headerShowFlag = ref(false)
const modalShowState = ref(false)
const modalContentsItem = ref<'about' | 'contact' | ''>('')

function disableScroll(e: Event) {
  e.preventDefault()
}

// スクロールさせない設定
onMounted(() => {
  document.addEventListener('touchmove', disableScroll, { passive: false })
  document.addEventListener('mousewheel', disableScroll, { passive: false })
})

const playAudio = () => {
  if (firstPlayback.value) return

  firstPlayback.value = true

  if (color.value === 'black') {
    setTimeout(() => {
      color.value = 'white'
      headerShowFlag.value = true
    }, 2600)
    setTimeout(() => {
      colorChangeState.value = true
    }, 4900)
  }
}

const aboutClickHandler = () => {
  modalShowState.value = true
  modalContentsItem.value = 'about'
}

const contactClickHandler = () => {
  modalShowState.value = true
  modalContentsItem.value = 'contact'

  // コンタクトのみスクロール非活性を解除
  document.removeEventListener('touchmove', disableScroll)
  document.removeEventListener('mousewheel', disableScroll)
}

const modalCloseHandler = (val: boolean) => {
  modalShowState.value = val
  modalContentsItem.value = ''

  document.addEventListener('touchmove', disableScroll, { passive: false })
  document.addEventListener('mousewheel', disableScroll, { passive: false })
}
</script>

<template>
  <Header
    :showFlag="headerShowFlag"
    @clickAbout="aboutClickHandler"
    @clickContact="contactClickHandler"
  />

  <div class="indexPage">
    <div
      class="firstViewMask"
      :class="{
        firstViewMask__colorChangeAnimation__style: firstPlayback,
        firstViewMask__fadeoutAnimation__style: colorChangeState
      }"
    />

    <div
      class="positionAbsoluteCenter logo__wrapper"
      :class="{ logo__showLogoAnimation__style: firstPlayback }"
    >
      <h1>
        <a tabindex="-1">
          <Logo
            size="large"
            :color="color"
            alt="フリーランスWeb Ohtaguchi Lab"
          />
        </a>
      </h1>
    </div>

    <div class="positionAbsoluteCenter audioPlayer__wrapper">
      <div
        :class="{
          audioPlayer__upAndDownAnimation__style: !firstPlayback,
          audioPlayer__moveBottomAnimation__style: firstPlayback
        }"
      />
      <AudioPlayer
        :color="color"
        :modalShowState="modalShowState"
        @playAudio="playAudio"
      />
    </div>

    <transition name="firstPlaybackTransition">
      <span
        v-show="!firstPlayback"
        class="positionAbsoluteCenter touchMe__text"
      >
        Touch Me
      </span>
    </transition>

    <transition name="firstPlaybackTransition">
      <button
        v-show="!firstPlayback"
        class="positionAbsoluteCenter buttonStyleReset volumeOffButton"
        @click="playAudio"
      >
        <i class="material-icons-outlined">volume_off</i>
      </button>
    </transition>

    <FirstViewVideo />

    <transition name="modalFadeoutMask">
      <div v-show="modalShowState" class="modalFadeoutMask" />
    </transition>

    <Modal
      class="modal"
      v-model="modalShowState"
      :modalContentsItem="modalContentsItem"
      @clickClose="modalCloseHandler"
    >
      <div v-show="modalContentsItem === 'about'">
        <ModalAbout />
      </div>
      <div v-show="modalContentsItem === 'contact'">
        <ModalContact :modalShowState="modalShowState" />
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.indexPage {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.firstViewMask {
  position: absolute;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-white);
}

.firstViewMask__colorChangeAnimation__style {
  animation: firstViewMaskColorChangeAnimation 1.3s forwards;
  animation-delay: 2.6s;
}

.firstViewMask__fadeoutAnimation__style {
  background-color: var(--bg-black);
  animation: hideAnimation 11s forwards;
}

.logo__wrapper {
  left: 50%;
  top: 50%;
  width: calc(100vw - 64px);
  max-width: 500px;
  z-index: 2;
  opacity: 0;
}

.logo__showLogoAnimation__style {
  animation: showAnimation 1.3s forwards;
  animation-delay: 1.3s;
}

.audioPlayer__wrapper {
  left: 50%;
  z-index: 3;
}

.touchMe__text {
  left: 50%;
  top: calc(100vh / 2 + 48px);
  z-index: 3;
  color: var(--text-black);
  font-size: 14px;
  font-weight: bold;
}

.volumeOffButton {
  left: 50%;
  top: 70%;
  z-index: 3;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--text-black);
}

.firstPlaybackTransition-enter-avtive,
.firstPlaybackTransition-leave-active {
  opacity: 1;
  transition: 0.3s;
}

.firstPlaybackTransition-enter-from,
.firstPlaybackTransition-leave-to {
  opacity: 0;
  margin-top: 16px;
}

.audioPlayer__upAndDownAnimation__style {
  animation: upAndDownAnimation 1.3s linear infinite;
}

.audioPlayer__moveBottomAnimation__style {
  animation: upAndDownAnimation none, moveBottomAnimation 1.3s forwards;
}

.modalFadeoutMask {
  position: absolute;
  top: 0;
  width: 100vw;
  background-color: var(--bg-black);
  z-index: 3;
  animation: modalAddHeightAnimation 1s forwards;
  animation-delay: 1s;
  transition: 0.3s;
}

.modalFadeoutMask-enter-avtive,
.modalFadeoutMask-leave-active {
  opacity: 1;
}

.modalFadeoutMask-enter-from,
.modalFadeoutMask-leave-to {
  opacity: 0;
}

.modal {
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 5;
}
</style>
