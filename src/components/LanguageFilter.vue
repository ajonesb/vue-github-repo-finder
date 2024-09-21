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

const selectedLanguage = ref("");

const availableLanguages = computed(() => {
  return languages.filter((lang) => !props.selectedLanguages.includes(lang));
});

function addLanguage() {
  if (
    selectedLanguage.value &&
    !props.selectedLanguages.includes(selectedLanguage.value)
  ) {
    emit("update:selectedLanguages", [
      ...props.selectedLanguages,
      selectedLanguage.value,
    ]);
    selectedLanguage.value = "";
  }
}

function removeLanguage(lang) {
  emit(
    "update:selectedLanguages",
    props.selectedLanguages.filter((l) => l !== lang)
  );
}
</script>

<template>
  <div class="language-filter">
    <div class="relative">
      <select
        id="language-select"
        v-model="selectedLanguage"
        @change="addLanguage"
        class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">Select a language</option>
        <option v-for="lang in availableLanguages" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>

    <div v-if="selectedLanguages.length > 0" class="mt-2 flex flex-wrap gap-2">
      <span
        v-for="lang in selectedLanguages"
        :key="lang"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
      >
        {{ lang }}
        <button
          type="button"
          @click="removeLanguage(lang)"
          class="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
        >
          <span class="sr-only">Remove {{ lang }}</span>
          <svg
            class="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              stroke-linecap="round"
              stroke-width="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      </span>
    </div>
  </div>
</template>


