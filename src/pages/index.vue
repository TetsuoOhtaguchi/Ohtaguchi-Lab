<script setup lang="ts">
const firstPlayback = ref(false)
const color = ref<'black' | 'white'>('black')
const colorChangeState = ref(false)
const headerShowFlug = ref(false)

const playAudio = () => {
  if (firstPlayback.value) return

  firstPlayback.value = true

  if (color.value === 'black') {
    setTimeout(() => {
      color.value = 'white'
      headerShowFlug.value = true
    }, 2600)
    setTimeout(() => {
      colorChangeState.value = true
    }, 4900)
  }
}

const aboutClickHandler = () => {
  console.log('aboutClickHandler')
}

const contactClickHandler = () => {
  console.log('contactClickHandler')
}
</script>

<template>
  <Header
    :showFlug="headerShowFlug"
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
      <Logo size="large" :color="color" />
    </div>

    <div class="positionAbsoluteCenter audioPlayer__wrapper">
      <div
        :class="{
          audioPlayer__upAndDownAnimation__style: !firstPlayback,
          audioPlayer__moveBottomAnimation__style: firstPlayback
        }"
      />
      <AudioPlayer :color="color" @playAudio="playAudio" />
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
  top: 56%;
  z-index: 3;
  color: var(--text-black);
  font-size: 12px;
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
</style>
