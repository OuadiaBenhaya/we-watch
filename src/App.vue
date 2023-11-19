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
    <!-- Watch Suggestion Button -->
    <SectionComponent>
      <template v-slot:contentSlot>
        <button-component :secondary="true" @click="handleWatchSuggestion"
          >Je vais regarder quoi ce soir ?</button-component
        >
      </template>
    </SectionComponent>

    <!-- Watch Suggestion Component -->
    <SectionComponent>
      <template v-slot:contentSlot>
        <list-section
          v-if="tvShowStore.buttonWatchClick && selectedShow !== null"
          mode="watch"
          :tvshow="selectedShow"
        />
        <div v-else>
          Veuillez sélectionner des séries depuis <strong>Ma liste</strong>.
        </div>
      </template>
    </SectionComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import SearchComponent from "@/components/SearchUtil.vue"
import SectionComponent from "@/components/SectionComponent.vue"
import ButtonComponent from "@/components/ButtonComponent.vue"
import ListSection from "@/sections/ListSection.vue"
import { useTvShowStore } from "@/stores/tvshow"

const tvShowStore = useTvShowStore()
const selectedShow = ref(tvShowStore.randWhatToWatch())
const countWatchStore = ref(
  tvShowStore.getShowsFromLocalStorage("watch")?.length || 0
)
onMounted(() => {
  tvShowStore.myList = tvShowStore.getShowsFromLocalStorage("list")
})
// We use ref tvShowStore.rand to get a random Tvshow. If this show already suggested..
// then loop to have a new one
watch(selectedShow, (newShow, oldShow) => {
  countWatchStore.value =
    tvShowStore.getShowsFromLocalStorage("watch")?.length || 0

  if (countWatchStore.value === 1 && oldShow === undefined)
    tvShowStore.buttonWatchClick = true

  if (typeof oldShow == "object" && newShow?.show.id === oldShow?.show.id) {
    tvShowStore.buttonWatchClick = true
    if (countWatchStore.value !== 1) {
      selectedShow.value = tvShowStore.randWhatToWatch()
    }
  }
})

// What to watch handle function
const handleWatchSuggestion = (): void => {
  // affect a new value to the watch. We'll have (newShow and oldShow) declared
  selectedShow.value = tvShowStore.randWhatToWatch()
  tvShowStore.buttonWatchClick = true
}
</script>

<style lang="postcss">
#app {
  @apply bg-gray-100 min-h-screen;
}
</style>
