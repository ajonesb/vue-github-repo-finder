<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  selectedLanguages: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:selectedLanguages"]);

const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "Go",
  "Rust",
];
const searchTerm = ref("");
const showDropdown = ref(false);

const filteredLanguages = computed(() => {
  return languages.filter(
    (lang) =>
      lang.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
      !props.selectedLanguages.includes(lang)
  );
});

function selectLanguage(lang) {
  emit("update:selectedLanguages", [...props.selectedLanguages, lang]);
  searchTerm.value = "";
  showDropdown.value = false;
}

function removeLanguage(lang) {
  emit(
    "update:selectedLanguages",
    props.selectedLanguages.filter((l) => l !== lang)
  );
}

function onBlur() {
  // Use setTimeout to allow click events on dropdown items to fire before hiding the dropdown
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
}
</script>

<template>
  <div class="language-filter">
    <div
      v-if="props.selectedLanguages.length > 0"
      class="selected-languages mb-2"
    >
      <span
        v-for="lang in props.selectedLanguages"
        :key="lang"
        class="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
      >
        {{ lang }}
        <button
          @click="removeLanguage(lang)"
          class="ml-1 text-blue-500 hover:text-blue-700"
        >
          ×
        </button>
      </span>
    </div>
    <div class="relative">
      <input
        v-model="searchTerm"
        @focus="showDropdown = true"
        @blur="onBlur"
        placeholder="Search language..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div
        v-if="showDropdown && filteredLanguages.length > 0"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
      >
        <button
          v-for="lang in filteredLanguages"
          :key="lang"
          @mousedown="selectLanguage(lang)"
          class="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          {{ lang }}
        </button>
      </div>
    </div>
  </div>
</template>
