<template>
  <form>
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Rechercher une série</label
    >
    <div class="relative py-4">
      <div class="absolute right-2.5 p-4 pointer-events-none" id="search-icon">
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        v-model.trim="searchInput"
        @input="searchStore.showSearch"
        type="search"
        id="default-search"
        class="block w-full p-4 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Rechercher une série..."
      />
    </div>
  </form>

  <div class="overflowy" v-if="searchStore.results.searchResults.length > 0">
    <div
      v-for="tvshow in searchStore.results.searchResults"
      :key="tvshow?.show?.id"
      class="mb-4"
    >
      <show-card :tvshow="tvshow" mode="search" />
    </div>
    <hr />
  </div>
  <div v-else-if="!searchStore.getSearchQuery">
    Commencez à écrir pour effectuer une recherche.
  </div>
  <div v-else>
    Pas de résultats pour <strong>{{ searchStore.getSearchQuery }}</strong>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSearchStore } from "@/stores/search/index";
import ShowCard from "@/components/ShowCard.vue";

const searchStore = useSearchStore();

const searchInput = computed({
  get: () => searchStore.getSearchQuery,
  set: v => searchStore.setSearchQuery(v)
});
</script>

<style lang="postcss">
#search-icon {
  height: 3.4rem;
}
#search-icon svg {
  height: 1.4rem;
}
.overflowy {
  overflow-y: scroll;
  height: 400px;
}
</style>
