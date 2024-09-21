<script setup>
import { computed, defineProps } from "vue";
import { format } from "date-fns";

const props = defineProps({
  repo: {
    type: Object,
    required: true,
  },
});

const formattedDate = computed(() => {
  return format(new Date(props.repo.created_at), "MMM d, yyyy");
});

const languageColor = computed(() => {
  const colors = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-green-500",
    Java: "bg-red-500",
    // Add more languages and colors as needed
  };
  return colors[props.repo.language] || "bg-gray-400";
});
</script>

<template>
  <div
    class="repo-tile bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
  >
    <h3 class="text-lg font-semibold mb-2">
      <a
        :href="repo.html_url"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 hover:underline"
      >
        {{ repo.name }}
      </a>
    </h3>
    <p class="text-gray-600 mb-2 text-sm">{{ repo.description }}</p>
    <div class="flex items-center justify-between text-sm text-gray-500">
      <span>Created: {{ formattedDate }}</span>
      <div class="flex items-center space-x-2">
        <span class="flex items-center">
          <svg
            class="w-4 h-4 text-yellow-400 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          {{ repo.stargazers_count }}
        </span>
        <span
          :class="`px-2 py-1 rounded-full text-xs font-medium ${languageColor} text-white`"
        >
          {{ repo.language }}
        </span>
      </div>
    </div>
  </div>
</template>
