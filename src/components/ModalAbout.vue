<template>
  <h3 class="modal__title">About</h3>
  <div class="modalAbout__itemContainer">
    <img
      src="@/assets/images/pngs/noimage.png"
      alt="noimage画像"
      class="modalAbout__authorImage"
    />
    <p class="modalAboutr__authorText">
      太田口鉄夫 | Ohtaguchi Tetsuo
      <br />
      <br />
      テストテキストテストテキストテストテキストテストテキスト。<br />
      テストテキストテストテキストテストテキストテストテキストテストテキストテストテキストテストテキストテストテキストテストテキストテストテキスト。<br />
      テストテキストテストテキストテストテキストテストテキストテストテキストテストテキストテストテキストテストテキストテストテキストテストテキスト。
    </p>
  </div>
</template>

<style lang="scss" scoped>
.modal__title {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 18px;
  font-weight: 600;
}

.modalAbout__itemContainer {
  display: flex;
  gap: 32px;
  max-width: 650px;
  @media screen and (max-width: 416px) {
    flex-direction: column;
  }
}

.modalAbout__authorImage {
  background-color: var(--bg-white);
  height: 175px;
  width: 175px;
  object-fit: cover;
  vertical-align: bottom;
}

.modalAboutr__authorText {
  font-size: 12px;
  text-align: justify;
  text-justify: inter-ideograph;
  line-height: 170%;
}
</style>
