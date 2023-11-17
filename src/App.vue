<template>
  <div
    class="container px-10 py-10 grid grid-cols-1 gap-8 sm:grid-cols-2 mx-auto sm:grid-cols-1 md:px-0 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 sm:px-10"
  >
    <SectionComponent title="Rechercher">
      <template v-slot:contentSlot>
        <SearchComponent />
      </template>
    </SectionComponent>

    <SectionComponent title="Ma liste">
      <template v-slot:contentSlot>
        <list-section mode="list" :tvshow="null" />
      </template>
    </SectionComponent>
  </div>

  <div
    class="container mx-auto grid grid-cols-1 px-10 md:px-0 md:grid-cols-2 gap-8 sm:px-2"
  >
    <SectionComponent>
      <template v-slot:contentSlot>
        <button-component mode="watch" />
      </template>
    </SectionComponent>

    <SectionComponent>
      <template v-slot:contentSlot>
        <list-section mode="watch" :tvshow="null" />
      </template>
    </SectionComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import SearchComponent from "@/components/SearchUtil.vue"
import SectionComponent from "@/components/SectionComponent.vue"
import ButtonComponent from "@/components/ButtonComponent.vue"
import ListSection from "@/sections/ListSection.vue"
import { useTvShowStore } from "@/stores/tvshow"
const tvShowStore = useTvShowStore()

onMounted(() => {
  tvShowStore.myList = tvShowStore.getShowsFromLocalStorage("list")
})
</script>

<style lang="postcss">
#app {
  @apply bg-gray-100 min-h-screen;
}
</style>
