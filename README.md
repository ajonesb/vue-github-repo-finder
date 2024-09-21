# GitHub Repository Finder

## Overview

GitHub Repository Finder is a Vue 3 app that allows users to search for GitHub repos based on programming language, date range, and minimum star count. It utilizes the GitHub Search API : 
https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-%20repositories
to fetch repository data and presents it in an organized, user friendly UI.

## Features

- Search for repositories by programming language
- Filter repositories by creation date range
- Set minimum star count for repositories
- Display repositories grouped by language
- Infinite scrolling for each language group
- Responsive design for various screen sizes

## Technology Stack

- Vue 3 (Composition API)
- Pinia for state management
- Vue Router for routing
- Tailwind CSS for styling
- Axios for API requests

## Project Structure

src/
├── components/
│ ├── LanguageFilter.vue
│ ├── DateRangeFilter.vue
│ ├── StarFilter.vue
│ └── RepoTile.vue
├── views/
│ └── HomeView.vue
├── stores/
│ └── repos.js
├── router/
│ └── index.js
├── App.vue
└── main.js

## Components

### LanguageFilter.vue

Allows users to search and select programming languages. Selected languages are displayed as chips above the search input.

### DateRangeFilter.vue

Provides inputs for start and end dates to filter repositories by creation date.

### StarFilter.vue

Allows users to set a minimum star count for repositories.

### RepoTile.vue

Displays individual repository information, including name, description, creation date, and star count.

### HomeView.vue

The main view component that integrates all other components and manages the overall layout and search functionality.

## State Management (Pinia)

The `repos.js` store manages the application's state, including:

- Repository data
- Loading state
- Error state

Key actions in the store:

- `fetchRepos`: Fetches repositories based on search criteria
- `clearRepos`: Clears the current repository data

## Routing

The application uses Vue Router for navigation. Currently, there is only one route:

- `/`: Home view (HomeView.vue)

## Main Functionality

1. **Language Selection**:

   - Users can search for and select multiple programming languages.
   - Selected languages are displayed as removable chips.

2. **Date Range Filtering**:

   - Users can select start and end dates to filter repositories by creation date.
   - The application validates date inputs to prevent future dates and ensure the start date is before the end date.

3. **Minimum Stars**:

   - Users can set a minimum star count to filter repositories.

4. **Search Process**:

   - When the user clicks "Search Repositories", the application fetches data for each selected language.
   - Results are grouped by language and displayed in separate sections.

5. **Results Display**:

   - Repositories are shown in tiles, sorted by star count (highest first).
   - Each language section has its own infinite scroll functionality.

6. **Error Handling**:

   - The application displays error messages for invalid inputs (e.g., invalid date ranges).
   - API errors are caught and displayed to the user.

7. **Responsive Design**:
   - The layout adjusts for different screen sizes, ensuring a good user experience on both desktop and mobile devices.

## How Components Work Together

1. **HomeView.vue**:

   - Acts as the main container and orchestrator.
   - Manages the overall state and coordinates between child components and the Pinia store.

2. **Filter Components** (LanguageFilter, DateRangeFilter, StarFilter):

   - Emit their values to HomeView.vue, which then uses these values for API requests.

3. **RepoTile.vue**:

   - Receives repository data as props from HomeView.vue and renders individual repository information.

4. **Pinia Store**:
   - Manages the global state of the application, including repository data, loading state, and errors.
   - HomeView.vue interacts with the store to fetch and clear repository data.

## Project Setup and Running the Project

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run serve
```

### Building for Production

To build the project for production:

```
npm run build
```

This will create a `dist` folder with the compiled assets ready for deployment.

### Lints and Fixes Files

```
npm run lint
```

## Future Improvements

- Add unit and integration tests (Jest / Vite Test, Cypress.io)
- Integrate Typescript
- Implement caching to reduce API calls
- Add more detailed repository information and filtering options
- Implement user authentication to increase API rate limits
- Add visualizations for repository statistics

### Customize Configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Demo
https://vue-github-repo-finder.netlify.app/

![image](https://github.com/user-attachments/assets/1b048734-e4c1-4d07-9499-ccd16daf1bf3)

