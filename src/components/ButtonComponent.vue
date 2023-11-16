<template>
  <button
    v-if="mode !== 'list'"
    type="button"
    class="text-gray-900 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
    @click="handleButtonClick"
    :disabled="tvshow && tvStore.isInMyList(tvshow, 'list') !== false"
  >
    {{ textButton }}
  </button>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { ShowInterface, UpdateButtonTextState } from "@/types/ShowInterface";
import { useTvShowStore } from "@/stores/tvshow/index";
// import { useButtonStore } from "@/stores/ButtonStore"

const tvStore = useTvShowStore();

const props = defineProps<UpdateButtonTextState>();

const textButton = ref("");
onMounted(() => {
  handleButtonValue();
});
const handleButtonClick = () => {
  console.log(props.mode);

  if (props.mode === "watch") {
    tvStore.randWhatToWatch();
    tvStore.buttonWatchClick = true;
  }

  // checks if the tvshow prop exists
  if (props.tvshow) {
    tvStore.actionList(props.tvshow, props.mode);
  }
  handleButtonValue();
};

const handleButtonValue = () => {
  // filter onclick states
  switch (props.mode) {
    case "search":
      //switch vals if the show exist in the list or not
      textButton.value =
        tvStore.isInMyList(props.tvshow as ShowInterface, "list") !== false
          ? "Ajouté"
          : "Ajouter à ma liste";
      break;
    case "list":
      textButton.value = "Ajouté";
      break;
    case "watch":
      textButton.value = "Je vais regarder quoi ce soir ?";
      break;
    default:
      textButton.value = "";
  }
};
</script>

<style lang="postcss"></style>
