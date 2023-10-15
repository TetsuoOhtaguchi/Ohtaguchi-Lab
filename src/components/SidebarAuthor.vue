<template>
  <h2 class="sidebarAuthor__h2">Author</h2>
  <div class="sidebarAuthor__itemContainer">
    <img
      src="@/assets/images/pngs/noimage.png"
      alt="noimage画像"
      class="sidebarAuthor__authorImage"
    />
    <p class="sidebarAuthor__authorText">
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
.sidebarAuthor__h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.sidebarAuthor__itemContainer {
  @media screen and (max-width: 1117px) {
    display: flex;
    gap: 32px;
  }
  @media screen and (max-width: 416px) {
    flex-direction: column;
  }
}

.sidebarAuthor__authorImage {
  background-color: var(--bg-white);
  height: 175px;
  width: 175px;
  object-fit: cover;
  vertical-align: bottom;
}

.sidebarAuthor__authorText {
  font-size: 12px;
  text-align: justify;
  text-justify: inter-ideograph;
  margin-top: 16px;
  line-height: 170%;
  @media screen and (max-width: 1117px) {
    margin-top: 0px;
  }
}
</style>
