<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <h2 class="sidebarCategories__h2">Categories</h2>
  <ul class="sidebarCategories__categories__ul">
    <li class="sidebarCategories__categories__li">
      <NuxtLink
        :to="{
          path: '/blog',
          query: { page: 1 }
        }"
        class="nuxtLink sidebarCategories__categories__nuxtLink"
      >
        All
        <div
          class="sidebarCategories__categories__underbar"
          :class="{ sidebarCategories__select__categorie: !route.query.tag }"
        />
      </NuxtLink>
    </li>
    <li class="sidebarCategories__categories__li">
      <NuxtLink
        :to="{
          path: '/blog',
          query: { page: 1, tag: 1 }
        }"
        class="nuxtLink sidebarCategories__categories__nuxtLink"
      >
        HipHop
        <div
          class="sidebarCategories__categories__underbar"
          :class="{
            sidebarCategories__select__categorie: route.query.tag === '1'
          }"
        />
      </NuxtLink>
    </li>
    <li class="sidebarCategories__categories__li">
      <NuxtLink
        :to="{
          path: '/blog',
          query: { page: 1, tag: 2 }
        }"
        class="nuxtLink sidebarCategories__categories__nuxtLink"
      >
        Logo
        <div
          class="sidebarCategories__categories__underbar"
          :class="{
            sidebarCategories__select__categorie: route.query.tag === '2'
          }"
        />
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.sidebarCategories__h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
}

.sidebarCategories__categories__ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  @media screen and (max-width: 1117px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.sidebarCategories__categories__li {
  width: 90px;
  overflow: hidden;
  line-height: 1rem;
}

.sidebarCategories__categories__nuxtLink {
  color: var(--text-white);
}

.sidebarCategories__categories__underbar {
  height: 1px;
  width: 0%;
  transition: 0.6s;
}

.sidebarCategories__categories__nuxtLink:hover
  .sidebarCategories__categories__underbar {
  background-color: var(--bg-white);
  width: 100%;
}

.sidebarCategories__select__categorie {
  background-color: var(--bg-white);
  width: 100%;
}
</style>
