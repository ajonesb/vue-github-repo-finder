<script setup>
import { ref, computed, watch } from "vue";
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
const hasSearched = ref(false);
const dateError = ref("");

const isSearchValid = computed(() => {
  return (
    selectedLanguages.value.length > 0 &&
    dateRange.value.start &&
    dateRange.value.end &&
    !dateError.value
  );
});

const nonEmptyRepoLanguages = computed(() => {
  return Object.keys(reposByLanguage.value).filter(
    (lang) => reposByLanguage.value[lang].length > 0
  );
});

const reposByLanguage = computed(() => {
  const result = {};
  selectedLanguages.value.forEach((lang) => {
    const filteredRepos = repos.value
      .filter((repo) => repo.language === lang)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
    if (filteredRepos.length > 0) {
      result[lang] = filteredRepos;
    }
  });
  return result;
});

watch(dateRange, validateDateRange, { deep: true });

function validateDateRange() {
  dateError.value = "";
  if (dateRange.value.start && dateRange.value.end) {
    const start = new Date(dateRange.value.start);
    const end = new Date(dateRange.value.end);
    const today = new Date();

    if (start > today || end > today) {
      dateError.value = "Dates cannot be in the future.";
    } else if (start > end) {
      dateError.value = "Start date must be before end date.";
    }
  }
}

async function searchRepos() {
  if (!isSearchValid.value) return;

  hasSearched.value = true;
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
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-1xl text-center font-bold mb-6 uppercase">
      GitHub Repository Finder
    </h1>
    <div class="flex flex-col lg:flex-row lg:space-x-6">
      <!-- Left side: Filters -->
      <div class="w-full lg:w-1/3 mb-6 lg:mb-0">
        <div class="bg-gray-100 p-6 rounded-lg shadow-md">
          <LanguageFilter v-model:selectedLanguages="selectedLanguages" />
          <DateRangeFilter v-model:dateRange="dateRange" class="mt-4" />
          <StarFilter v-model:minStars="minStars" class="mt-4" />
          <div v-if="dateError" class="text-red-500 text-sm mt-2">
            {{ dateError }}
          </div>
          <button
            @click="searchRepos"
            :disabled="!isSearchValid"
            :class="[
              'w-full mt-4 font-semibold px-4 py-2 rounded transition duration-300',
              isSearchValid
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
          >
            Search Repositories
          </button>
        </div>
      </div>

      <!-- Right side: Results -->
      <div class="w-full lg:w-2/3">
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

        <div v-else-if="!hasSearched" class="text-center py-8 text-gray-600">
          Use the filters on the left to search for repositories.
        </div>

        <div
          v-else-if="nonEmptyRepoLanguages.length === 0"
          class="text-center py-8 text-gray-600"
        >
          No repositories found. Try adjusting your search criteria.
        </div>

        <div v-else class="space-y-8">
          <div
            v-for="lang in nonEmptyRepoLanguages"
            :key="lang"
            class="language-section bg-white shadow rounded-lg p-4"
          >
            <h2 class="text-2xl font-bold mb-4">{{ lang }}</h2>
            <div
              class="repo-list space-y-4 max-h-96 overflow-y-auto"
              @scroll="onScroll($event, lang)"
            >
              <RepoTile
                v-for="repo in reposByLanguage[lang]"
                :key="repo.id"
                :repo="repo"
              />
            </div>
          </div>
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
