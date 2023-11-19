<template>
  <div
    v-if="tvshow"
    class="flex sm:grid-cols-2 justify-between bg-white border border-gray-200 rounded-lg shadow flex-col sm:flex-row hover:bg-gray-50"
  >
    <div class="flex flex-col w-full lg:flex-row items-center">
      <img
        class="object-cover sm:w-auto h-30 rounded-t-lg md:w-48 md:rounded-none md:rounded-l-lg md:h-auto"
        :src="
          tvshow?.show.image
            ? tvshow.show.image.medium
            : 'https://placehold.co/210x295'
        "
        :alt="tvshow?.show?.name"
      />
      <div
        class="flex items-center justify-between flex-row w-full p-4 leading-normal"
      >
        <div class="infos-container">
          <h5
            class="mb-2 font-bold text-lg tracking-tight md:text-xl lg:text-xxl text-red-900"
          >
            {{ tvshow?.show?.name }}
          </h5>
          <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <p>{{ tvshow?.show?.averageRuntime }} min</p>
            <p>{{ tvshow?.show?.rating.average }}</p>
            <small>{{ filterYear(tvshow?.show?.premiered || "0") }}</small>
            <p v-if="mode === 'watch'" v-html="tvshow?.show.summary"></p>
          </div>
        </div>
        <!-- checkbox  -->
        <input
          v-if="mode === 'list'"
          type="checkbox"
          @click="tvshow && tvStore.actionList(tvshow, mode)"
          :checked="tvshow && tvStore.isInMyList(tvshow, 'watch') !== false"
          class="w-8 h-8 accent-black border-gray-300 rounded focus:ring-black"
        /><!-- #checkbox -->
        <!-- Search List Button -->
        <button-component
          :disabled="isDisabledButton"
          v-if="mode === 'search'"
          :primary="true"
          @click="addToMyListAction(tvshow)"
          >{{
            isDisabledButton ? "Ajouté" : "Ajouter à ma liste"
          }}</button-component
        >
        <!-- #Search List Button -->
      </div>
    </div>
  </div>
  <div v-else>Pas de résultats.</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import ButtonComponent from "@/components/ButtonComponent.vue"
import { ShowCardInterface, ShowInterface } from "@/types/ShowInterface"
import { useTvShowStore } from "@/stores/tvshow/index"
const tvStore = useTvShowStore()
const props = defineProps<ShowCardInterface>()

const disableButtonId = ref<ShowInterface["show"]["id"]>()
const isDisabledButton = computed(() => {
  return (
    props.tvshow.show.id === disableButtonId.value ||
    tvStore.isInMyList(props.tvshow, "list") !== false
  )
})
const addToMyListAction = (tvshow: ShowInterface) => {
  if (!tvStore.isInMyList(tvshow, "list")) {
    tvStore.actionList(tvshow, "search")
    disableButtonId.value = tvshow.show.id
  }
}

const filterYear = (value: string): string => {
  const year = new Date(value).getFullYear()
  return `${year}`
}
</script>
<style lang="postcss" scoped>
button:disabled {
  cursor: not-allowed;
  @apply bg-gray-50 text-black !important;
}
</style>
