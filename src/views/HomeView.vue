<script setup>
import { ref, watch } from "vue";
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

function updateLanguages(languages) {
  selectedLanguages.value = languages;
}

function updateDateRange(range) {
  dateRange.value = range;
}

function updateMinStars(stars) {
  minStars.value = stars;
}

function searchRepos() {
  repoStore.fetchRepos(
    selectedLanguages.value.join(","),
    dateRange.value.start,
    dateRange.value.end,
    minStars.value
  );
}

// Auto-search when filters change
watch(
  [selectedLanguages, dateRange, minStars],
  () => {
    if (
      selectedLanguages.value.length > 0 &&
      dateRange.value.start &&
      dateRange.value.end
    ) {
      searchRepos();
    }
  },
  { deep: true }
);
</script>

<style scoped>
.filters {
  @apply bg-gray-100 p-6 rounded-lg shadow-md;
}
</style>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">GitHub Repository Finder</h1>
    <div class="filters space-y-4 mb-8">
      <LanguageFilter
        :selectedLanguages="selectedLanguages"
        @update:languages="updateLanguages"
      />
      <DateRangeFilter
        :dateRange="dateRange"
        @update:dateRange="updateDateRange"
      />
      <StarFilter :minStars="minStars" @update:minStars="updateMinStars" />
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

    <div v-else-if="repos.length === 0" class="text-center py-8 text-gray-600">
      No repositories found. Try adjusting your search criteria.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RepoTile v-for="repo in repos" :key="repo.id" :repo="repo" />
    </div>
  </div>
</template>
