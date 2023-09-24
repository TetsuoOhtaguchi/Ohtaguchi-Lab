<script setup lang="ts">
import { ref } from 'vue'
import { Howl } from 'howler'

defineProps({
  /**
   * カラー
   * @example 'white' | 'black'
   */
  color: { type: String as PropType<'white' | 'black'>, required: true }
})

const emit = defineEmits<{
  (e: 'playAudio'): void
}>()

const audioSrc = ref('')
const sound = ref<Howl | null>(null)
const playingFlug = ref(false)

onMounted(async () => {
  try {
    const audioSrcModule = await import('../assets/audios/augment-torus.mp3')
    audioSrc.value = audioSrcModule.default
  } catch (error) {
    console.log(error)
  }
})

watch(audioSrc, () => {
  audioSrc.value = audioSrc.value!
})

const playAudio = () => {
  // howler.jsで曲を生成する
  sound.value = new Howl({
    src: [audioSrc.value],
    volume: 0.5,
    loop: true,
    autoplay: false
  })

  if (!sound.value) return

  // 再生ステータスがfalseの場合、曲を再生する
  if (!sound.value.playing()) {
    sound.value.play()
    playingFlug.value = true
    emit('playAudio')
  }
}

const stopAudio = () => {
  if (!sound.value) return

  // 再生ステータスがtrueの場合、曲を停止する
  if (sound.value.playing()) {
    sound.value.stop()
    playingFlug.value = false
  }
}
</script>

<template>
  <div class="audioPlayer">
    <transition name="ripple">
      <div v-show="playingFlug">
        <div class="positionAbsoluteCenter audioPlayer__ripple" />
        <div
          class="positionAbsoluteCenter audioPlayer__ripple audioPlayer__ripple--delay1"
        />
        <div
          class="positionAbsoluteCenter audioPlayer__ripple audioPlayer__ripple--delay2"
        />
        <div
          class="positionAbsoluteCenter audioPlayer__ripple audioPlayer__ripple--delay3"
        />
      </div>
    </transition>

    <button class="positionAbsoluteCenter buttonStyleReset audioPlayer__button">
      <div
        v-show="!playingFlug"
        class="audioPlayer__button__iconContainer"
        @click="playAudio"
      >
        <div
          class="positionAbsoluteCenter icon__triangle"
          :class="{
            icon__triangle__bg__white: color === 'white',
            icon__triangle__bg__black: color === 'black'
          }"
        />
        <img
          v-show="color === 'white'"
          src="@/assets/images/svgs/Turntable-icon-white.svg"
          alt="再生ボタンの画像"
          class="icon__turntable"
        />
        <img
          v-show="color === 'black'"
          src="@/assets/images/svgs/Turntable-icon-black.svg"
          alt="再生ボタンの画像"
          class="icon__turntable"
        />
      </div>
      <div
        v-show="playingFlug"
        class="audioPlayer__button__iconContainer"
        @click="stopAudio"
      >
        <div
          class="positionAbsoluteCenter icon__box"
          :class="{
            icon__box__bg__white: color === 'white',
            icon__box__bg__black: color === 'black'
          }"
        />
        <img
          v-show="color === 'white'"
          src="@/assets/images/svgs/Turntable-icon-white.svg"
          alt="停止ボタンの画像"
          class="icon__turntable"
        />
        <img
          v-show="color === 'black'"
          src="@/assets/images/svgs/Turntable-icon-black.svg"
          alt="停止ボタンの画像"
          class="icon__turntable"
        />
      </div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.audioPlayer {
  position: relative;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  overflow: hidden;
}

.ripple-enter-avtive,
.ripple-leave-active {
  opacity: 1;
  transition: 1s;
}

.ripple-enter-from,
.ripple-leave-to {
  opacity: 0;
}

.audioPlayer__ripple {
  top: 50%;
  left: 50%;
  width: 95px;
  height: 95px;
  border: solid 3px #fff;
  border-radius: 50%;
  opacity: 0;
  animation: ripplesAnimation 4s linear infinite;
}

.audioPlayer__ripple--delay1 {
  animation-delay: 1s;
}

.audioPlayer__ripple--delay2 {
  animation-delay: 2s;
}

.audioPlayer__ripple--delay3 {
  animation-delay: 3s;
}

.audioPlayer__button {
  top: 50%;
  left: 50%;
  width: 70px;
}

.audioPlayer__button__iconContainer {
  position: relative;
}

.icon__triangle {
  top: 50%;
  left: 45%;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  height: 0;
  width: 0;
}

.icon__triangle__bg__white {
  border-left: 20px solid var(--bg-white);
}

.icon__triangle__bg__black {
  border-left: 20px solid var(--bg-black);
}

.icon__box {
  top: 50%;
  left: 41%;
  width: 20px;
  height: 20px;
}

.icon__box__bg__white {
  background-color: var(--bg-white);
}

.icon__box__bg__black {
  background-color: var(--bg-black);
}

.icon__turntable {
  vertical-align: middle;
  width: 100%;
}
</style>
