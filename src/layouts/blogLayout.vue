<template>
  <div>
    <Header :showFlag="true" designChange="blog" />
    <ScrollTopButton />

    <div class="contentsWrapper">
      <slot />
      <Sidebar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contentsWrapper {
  display: flex;
  justify-content: center;
  padding: 96px 16px 64px;
  gap: 40px;
  @media screen and (max-width: 1117px) {
    flex-direction: column;
    align-items: center;
    gap: 64px;
  }
}
</style>
