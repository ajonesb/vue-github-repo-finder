<script setup>
import { ref, computed } from "vue";
import LanguageFilter from "@/components/LanguageFilter.vue";
import DateRangeFilter from "@/components/DateRangeFilter.vue";
import StarFilter from "@/components/StarFilter.vue";
import RepoTile from "@/components/RepoTile.vue";
import { useRepoStore } from "@/stores/repos";
import { storeToRefs } from "pinia";

const repoStore = useRepoStore();
const { repos, loading, error } = storeToRefs(repoStore);

const selectedLanguages = ref([]);
const dateRange = ref({ start: null, end: null });
const minStars = ref(100);

const reposByLanguage = computed(() => {
  const result = {};
  selectedLanguages.value.forEach((lang) => {
    result[lang] = repos.value
      .filter((repo) => repo.language === lang)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  });
  return result;
});

async function searchRepos() {
  repoStore.clearRepos();
  for (const language of selectedLanguages.value) {
    await repoStore.fetchRepos(
      language,
      dateRange.value.start,
      dateRange.value.end,
      minStars.value
    );
  }
}

function loadMoreRepos(language) {
  repoStore.fetchRepos(
    language,
    dateRange.value.start,
    dateRange.value.end,
    minStars.value,
    reposByLanguage.value[language].length / 30 + 1 // Calculate the next page
  );
}

function onScroll(event, language) {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadMoreRepos(language);
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8" style="max-width: 51%; margin: auto">
    <h1 class="text-3xl font-bold mb-6">GitHub Repository Finder</h1>
    <div class="filters space-y-4 mb-8">
      <LanguageFilter v-model:selectedLanguages="selectedLanguages" />
      <DateRangeFilter v-model:dateRange="dateRange" />
      <StarFilter v-model:minStars="minStars" />
      <button
        @click="searchRepos"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition duration-300"
      >
        Search Repositories
      </button>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Loading repositories...</p>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
      role="alert"
    >
      <p class="font-bold">Error</p>
      <p>{{ error }}</p>
    </div>

    <div
      v-else-if="Object.keys(reposByLanguage).length === 0"
      class="text-center py-8 text-gray-600"
    >
      No repositories found. Try adjusting your search criteria.
    </div>

    <div v-else class="space-y-8">
      <div
        v-for="(langRepos, lang) in reposByLanguage"
        :key="lang"
        class="language-section"
      >
        <h2 class="text-2xl font-bold mb-4">{{ lang }}</h2>
        <div
          class="repo-list space-y-4 max-h-96 overflow-y-auto"
          @scroll="onScroll($event, lang)"
        >
          <RepoTile v-for="repo in langRepos" :key="repo.id" :repo="repo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters {
  @apply bg-gray-100 p-6 rounded-lg shadow-md;
}
</style>
