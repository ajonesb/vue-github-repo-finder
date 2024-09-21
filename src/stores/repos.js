import { defineStore } from "pinia";
import axios from "axios";

export const useRepoStore = defineStore("repos", {
  state: () => ({
    repos: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRepos(language, startDate, endDate, minStars, page = 1) {
      this.loading = true;
      try {
        const response = await axios.get(
          "https://api.github.com/search/repositories",
          {
            params: {
              q: `language:${language} created:${startDate}..${endDate} stars:>=${minStars}`,
              sort: "stars",
              order: "desc",
              per_page: 30,
              page: page,
            },
          }
        );
        this.repos = [...this.repos, ...response.data.items];
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    clearRepos() {
      this.repos = [];
      this.error = null;
    },
  },
});
