<script setup>
import { ref, computed } from "vue";

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
const selectedLanguages = ref([]);

const filteredLanguages = computed(() => {
  return languages.filter(
    (lang) =>
      lang.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
      !selectedLanguages.value.includes(lang)
  );
});

function selectLanguage(lang) {
  selectedLanguages.value.push(lang);
  searchTerm.value = "";
}

function removeLanguage(lang) {
  selectedLanguages.value = selectedLanguages.value.filter((l) => l !== lang);
}

function filterLanguages() {
  // This function is called on input, but we don't need to do anything
  // extra here since filteredLanguages is a computed property
}
</script>

<template>
  <div>
    <input
      v-model="searchTerm"
      @input="filterLanguages"
      placeholder="Search language..."
    />
    <div v-if="filteredLanguages.length > 0">
      <button
        v-for="lang in filteredLanguages"
        :key="lang"
        @click="selectLanguage(lang)"
      >
        {{ lang }}
      </button>
    </div>
    <div v-if="selectedLanguages.length > 0">
      <span v-for="lang in selectedLanguages" :key="lang" class="chip">
        {{ lang }}
        <button @click="removeLanguage(lang)">x</button>
      </span>
    </div>
  </div>
</template>
