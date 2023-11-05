<template>
  <h3 class="modal__title">About</h3>
  <div class="modalAbout__itemContainer">
    <img
      src="@/assets/images/jpgs/ohtaguchi-lab-profile.jpg"
      alt="ohtaguchi lab profile image"
      class="modalAbout__authorImage"
    />
    <p class="modalAboutr__authorText">
      太田口鉄夫 | Tetsuo Ohtaguchi
      <br />
      <br />
      フリーランスエンジニアとして、テクノロジーの世界に挑戦中。Vue.js、Nuxt.jsを駆使し、魅力的なWeb体験の提供を目指す。デジタル作品において、デザインと技術を融合し、卓越した品質を追求する。<br />
      使命は、人々に感動を提供し、次世代に影響を与えるプロジェクトを生み出すこと。また、DJとしての一面も持ち、音楽と技術の融合から新たなインスピレーションを得ている。
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
