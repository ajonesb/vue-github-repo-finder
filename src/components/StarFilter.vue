<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  minStars: {
    type: Number,
    default: 100,
  },
});

const stars = ref(props.minStars);

const emit = defineEmits(["update:minStars"]);

function emitMinStars() {
  emit("update:minStars", stars.value);
}

watch(stars, () => {
  emitMinStars();
});
</script>

<template>
  <div class="star-filter">
    <label for="min-stars" class="block mb-2 font-semibold"
      >Minimum Stars</label
    >
    <input
      type="number"
      id="min-stars"
      v-model.number="stars"
      min="0"
      @input="emitMinStars"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
  </div>
</template>
