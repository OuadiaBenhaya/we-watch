<template>
  <div class="overflowy" v-if="mode === 'list' && tvStore.myList !== null">
    <div v-for="tvshow in tvStore.myList" :key="tvshow?.show?.id" class="mb-4">
      <show-card :tvshow="tvshow" mode="list" />
    </div>
  </div>
  <div v-else-if="mode === 'watch' && tvStore.buttonWatchClick">
    <show-card :tvshow="tvStore.suggestWhatToWatch" :mode="mode" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import ShowCard from "@/components/ShowCard.vue";
import { ShowCardInterface } from "@/components/ShowCard";
import { useTvShowStore } from "@/stores/tvshow";

const tvStore = useTvShowStore();
defineProps<ShowCardInterface>();
</script>
