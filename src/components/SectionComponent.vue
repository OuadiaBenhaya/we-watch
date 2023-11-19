<template>
  <div
    :class="[
      'block bg-white',
      titleSlot
        ? 'p-6 border border-gray-400'
        : 'flex justify-center items-center first:min-h-[100px] md:auto'
    ]"
  >
    <h5
      v-if="titleSlot"
      class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
    >
      {{ titleSlot }}
    </h5>
    <hr v-if="titleSlot" class="border-1 border-gray-400" />
    <p class="text-base text-neutral-600 dark:text-neutral-200">
      <slot name="contentSlot"></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import { SectionComponentState } from "./SectionComponent"

// Access props using defineProps
const props = defineProps<SectionComponentState>()

// Access the slots directly
const titleSlot = props.title
</script>

<style lang="postcss"></style>
