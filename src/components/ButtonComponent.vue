<template>
  <button :class="btnClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface ButtonInterface {
  primary?: Boolean
  secondary?: Boolean
}

// Props
const props = defineProps<ButtonInterface>()

// Emits
const emit = defineEmits(["click"])

// Computed class based on props
const btnClass = computed(() => ({
  "font-medium w-auto rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 focus:ring-4 focus:outline-none focus:ring-gray-100": true,
  "text-white bg-black hover:bg-gray-600": props.primary && true,
  "text-gray-900 bg-gray-100 hover:bg-gray-300": props.secondary && true
}))

// Click emit handler
const handleClick = () => {
  emit("click")
}
</script>

<style lang="postcss"></style>
