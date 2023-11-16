<template>
  <div
    v-if="tvshow"
    class="flex flex-row justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-50 sm:flex-row"
  >
    <div class="flex flex-row items-center">
      <img
        class="object-cover w-full rounded-t-lg w-20  md:h-auto md:w-48 md:rounded-none md:rounded-l-lg md:h-96"
        :src="
          tvshow?.show.image
            ? tvshow.show.image.medium
            : 'https://placehold.co/210x295'
        "
        :alt="tvshow?.show?.name"
      />
      <div
        class="flex flex-col justify-start sm:justify-between p-4 leading-normal"
      >
        <h5
          class="mb-2 text-2xl font-bold text-lg tracking-tight md:text-xl lg:text-xxl text-gray-900 dark:text-white"
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
    </div>
    <div class="flex items-center p-4 leading-normal">
      <!-- Search List Button -->
      <button-component v-if="mode !== 'watch'" :mode="mode" :tvshow="tvshow" />
      <!-- #Search List Button -->

      <!-- checkbox  -->
      <input
        v-if="mode === 'list'"
        type="checkbox"
        @click="tvshow && tvStore.actionList(tvshow, mode)"
        :checked="tvshow && tvStore.isInMyList(tvshow, 'watch') !== false"
        class="w-8 h-8 accent-black border-gray-300 rounded focus:ring-black"
      /><!-- #checkbox -->
    </div>
  </div>
  <div v-else>Pas de résultats.</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { ShowCardInterface } from "@/components/ShowCard";
import { useTvShowStore } from "@/stores/tvshow/index";

defineProps<ShowCardInterface>();

const tvStore = useTvShowStore();

const filterYear = (value: string): string => {
  const year = new Date(value).getFullYear();
  return `${year}`;
};
</script>
<style lang="postcss">
button:disabled {
  cursor: not-allowed;
  @apply bg-gray-50 !important;
}
</style>
