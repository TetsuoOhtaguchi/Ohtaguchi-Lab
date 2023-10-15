<template>
  <div class="sidebar">
    <ul class="sidebar__ul">
      <li>
        <SidebarAuthor />
      </li>

      <li>
        <SidebarCategories />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  max-width: 220px;
  width: 100%;
  color: var(--text-articleWhite);
  @media screen and (max-width: 1117px) {
    max-width: 870px;
  }
}

.sidebar__ul {
  display: flex;
  flex-direction: column;
  gap: 64px;
  @media screen and (max-width: 1117px) {
    flex-direction: column-reverse;
  }
}
</style>
