<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  dateRange: {
    type: Object,
    default: () => ({ start: "", end: "" }),
  },
});

const startDate = ref(props.dateRange.start);
const endDate = ref(props.dateRange.end);

const emit = defineEmits(["update:dateRange"]);

function emitDateRange() {
  emit("update:dateRange", { start: startDate.value, end: endDate.value });
}

watch([startDate, endDate], () => {
  emitDateRange();
});
</script>

<template>
  <div class="date-range-filter">
    <label class="block mb-2 font-semibold">Date Range</label>
    <div class="flex space-x-4">
      <div class="w-1/2">
        <label for="start-date" class="block text-sm text-gray-600"
          >Start Date</label
        >
        <input
          type="date"
          id="start-date"
          v-model="startDate"
          @change="emitDateRange"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div class="w-1/2">
        <label for="end-date" class="block text-sm text-gray-600"
          >End Date</label
        >
        <input
          type="date"
          id="end-date"
          v-model="endDate"
          @change="emitDateRange"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  </div>
</template>
