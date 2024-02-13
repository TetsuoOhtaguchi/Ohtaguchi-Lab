<script setup lang="ts">
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'

const props = defineProps({
  /**
   * モーダル表示ステート
   * @example true | false
   */
  modalShowState: { type: Boolean, required: true }
})

const name = ref('')
const mail = ref('')
const subject = ref('')
const message = ref('')

const nameError = ref(false)
const mailError = ref(false)
const messageError = ref(false)

const disabled = ref(true)

// 入力チェックを行う
watch(name, () => {
  if (!props.modalShowState) return
  // 名前の入力チェックを行う
  nameError.value = useValidationCheck(name.value, 'name')!
})
watch(mail, () => {
  if (!props.modalShowState) return
  // メールの入力チェックを行う
  mailError.value = useValidationCheck(mail.value, 'mail')!
})
watch(message, () => {
  if (!props.modalShowState) return
  // メッセージの入力チェックを行う
  messageError.value = useValidationCheck(message.value, 'message')!
})

//　ネーム、メール、メッセージにエラー・空欄がない場合、sendボタンのdisabledを解除する
watch([name, mail, message, nameError, mailError, messageError], () => {
  if (
    !name.value ||
    !mail.value ||
    !message.value ||
    nameError.value ||
    mailError.value ||
    messageError.value
  ) {
    disabled.value = true
  } else {
    disabled.value = false
  }
})

// モーダルを閉じた際に値をリセットする
watch(
  () => props.modalShowState,
  () => {
    if (!props.modalShowState) {
      name.value = ''
      mail.value = ''
      subject.value = ''
      message.value = ''

      nameError.value = false
      mailError.value = false
      messageError.value = false
    }
  }
)

const { vueApp } = useNuxtApp()
vueApp.use(VueReCaptcha, {
  siteKey: '6LfXwHApAAAAAMOtDUHaTzQSQG_XCTSVOpo_hT1J',
  loaderOptions: {
    autoHideBadge: true,
    renderParameters: {
      hl: 'ja'
    }
  }
})
const recaptchaInstance = useReCaptcha()

// 送信ボタンをクリックした際に、以下の処理を実行する
const sendClick = async () => {
  try {
    // reCAPTCHAの初期化を待つ
    await recaptchaInstance?.recaptchaLoaded()
    // reCAPTCHAでトークンを取得する
    const token = await recaptchaInstance?.executeRecaptcha('submit')
    if (!token) return

    // 整形処理を行う
    name.value = useZenkakuReplace(name.value)
    mail.value = mail.value.trim()
    subject.value = subject.value.trim() || '未入力'
    message.value = message.value.trim()
  } catch (error) {
    console.error('処理中にエラーが発生しました。', error)
  }
}
</script>

<template>
  <h3 class="modal__title">Contact</h3>
  <form method="post" action="https://ohtaguchi-lab.form.newt.so/v1/eAnOZYj0c">
    <div class="inputform__container">
      <Inputform
        v-model="name"
        inputField="name"
        label="Name"
        :error="nameError"
      />
      <Inputform
        v-model="mail"
        inputField="email"
        label="Mail"
        :error="mailError"
      />
      <Inputform v-model="subject" inputField="subject" label="Subject" />
      <Textarea
        v-model="message"
        textareaField="message"
        label="Message"
        :error="messageError"
      />
    </div>

    <div class="sendButton__wrapper">
      <SendButton :disabled="disabled" @click="sendClick" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.modal__title {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 18px;
  font-weight: 600;
}

.in__preparation__message {
  font-size: 24px;
  text-align: center;
}

.inputform__container {
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 529px) {
    width: calc(100vw - 30px);
    margin-top: 56px;
  }
}

.sendButton__wrapper {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>
