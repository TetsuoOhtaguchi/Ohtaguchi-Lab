<script setup lang="ts">
const route = useRoute()

// NewtのAPIリクエストのエラーチェックを行う
const errorStatus = useNewtApiErrorCheck(route.query.status, route.query.code)

function disableScroll(e: Event) {
  e.preventDefault()
}

// スクロールさせない設定
onMounted(() => {
  document.addEventListener('touchmove', disableScroll, { passive: false })
  document.addEventListener('mousewheel', disableScroll, { passive: false })
})
</script>

<template>
  <div class="thanksPage">
    <div class="thanksPage__itemContainer">
      <div class="thanksPage__logoWrapper">
        <Logo size="small" color="white" alt="フリーランスWeb Ohtaguchi Lab" />
      </div>

      <span
        v-if="!errorStatus.error && errorStatus.message === ''"
        class="thanksPage__transmissionComplete__text"
      >
        送信完了
      </span>

      <span
        v-if="errorStatus.error && errorStatus.message !== ''"
        class="thanksPage__transmissionComplete__text errorTextColor"
      >
        送信失敗
      </span>

      <p
        v-if="!errorStatus.error && errorStatus.message === ''"
        class="thanksPage__thanksMessage"
      >
        お問い合わせいただき、誠にありがとうございます。<br />
        お問い合わせ内容を確認し、<br />
        3営業日以内に担当者よりご連絡差し上げます。<br />
        3営業日を経過してもご連絡がない場合、お手数をおかけしますが、再度お問い合わせフォームをご利用いただきますようお願い申し上げます。
      </p>

      <p
        v-if="errorStatus.error && errorStatus.message !== ''"
        class="thanksPage__thanksMessage"
      >
        お問い合わせいただき、誠にありがとうございます。<br />
        <span class="errorTextColor">
          {{ errorStatus.message }}
        </span>
        、送信に失敗しました。<br />
        お手数をおかけしますが、お時間を置いて再度お問い合わせフォームをご利用いただきますようお願い申し上げます。<br />
        Error Code：<span class="errorTextColor">{{ errorStatus.code }}</span>
      </p>

      <NuxtLink to="/" class="nuxtLink topButton__wrapper">
        <button class="buttonStyleReset topButton">top</button>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thanksPage {
  color: var(--text-white);
  height: 100vh;
  display: grid;
  place-items: center;
}

.thanksPage__itemContainer {
  width: 530px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media screen and (max-width: 560px) {
    width: calc(100vw - 30px);
  }
}

.thanksPage__logoWrapper {
  height: auto;
  width: 400px;
  margin: 0 auto;
  @media screen and (max-width: 430px) {
    width: 100%;
  }
}

.thanksPage__transmissionComplete__text {
  font-size: 24px;
  text-align: center;
  font-weight: 600;
}

.thanksPage__thanksMessage {
  text-align: center;
  line-height: 2rem;
}

.errorTextColor {
  color: var(--main-color);
}

.topButton__wrapper {
  display: flex;
  justify-content: center;
}

.topButton {
  width: 200px;
  height: 48px;
  color: var(--text-white);
  background-color: var(--bg-cardBlack);
  font-size: 16px;
  transition: 0.3s;
}

.topButton:hover {
  box-shadow: 0px 0px 150px rgba(255, 255, 255, 1);
}
</style>
