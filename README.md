# Recipes App

A web application for discovering meals and drinks, saving favorites, tracking progress, and following recipes step by step.

[GitHub Pages deployment](https://devgabrielav.github.io/recipes-app/)

## Overview

This project was built with React + TypeScript using Vite, and uses Chakra UI for the interface. The experience was designed to be responsive, clear, and functional on both mobile and desktop, with a focus on cooking recipes and drinks.

The application combines search, filtering, user context, local persistence, and resilient handling of public APIs, ensuring the app continues to work even when the external service is down or slow.

## What the site allows you to do

- Sign in with an email and continue without a password.
- Explore as a guest without creating an account.
- Switch between Portuguese and English, with the selected language saved in the browser.
- Browse meal and drink recipes.
- Search by name, ingredient, or first letter.
- Filter recipes by category.
- View detailed recipe information with ingredients, instructions, and images.
- Save recipes to favorites.
- Start a recipe and mark ingredients as you cook.
- Resume recipes in progress after leaving the app.
- Mark recipes as finished.
- View in-progress, favorite, and completed recipes.
- Share a recipe link.
- See clear messages when the API fails and use local fallback data.

## Technologies used

### Front-end
- React 18
- TypeScript
- Vite
- Chakra UI
- React Router DOM
- Context API
- Local Storage
- Validator
- React Icons

### Testing
- Vitest
- Testing Library
- Jest DOM

### Quality and maintainability
- ESLint
- TypeScript checks
- Component-based structure
- Feature and concern-oriented folder organization

## APIs used

The app consumes two public recipe APIs:

- [TheMealDB](https://www.themealdb.com/)
- [TheCocktailDB](https://www.thecocktaildb.com/)

These APIs provide recipes, categories, details, ingredients, and instructions. Because they are external services and can become unavailable, the app includes resilience layers to avoid empty screens or full failures.

## API resilience

The API access logic is organized in helper modules and was designed to keep the app usable even in bad network conditions:

1. 8-second timeout with up to 2 retry attempts.
2. Exponential backoff for temporary failures.
3. Deduplication of identical simultaneous requests.
4. Cache in memory and localStorage for recent responses.
5. Use of stale cache as a fallback when the network fails.
6. Built-in sample data when both the network and cache are unavailable.
7. Informative banner with a retry button.
8. Automatic browser reconnection detection to retry the API.

This logic is mainly located in:
- `src/helper/http.ts`
- `src/helper/helpersAPI.ts`
- `src/helper/offlineData.ts`
- `src/helper/apiStatus.ts`

## Main project structure

```text
src/
├── App.tsx
├── main.tsx
├── theme.ts
├── components/
├── context/
├── helper/
├── hooks/
├── i18n/
├── pages/
├── tests/
└── utils/
```

### Main folders
- `components/`: reusable UI components.
- `pages/`: application screens.
- `helper/`: integrations, cache, localStorage, and utility logic.
- `hooks/`: recipe detail, progress, and sharing hooks.
- `i18n/`: translations and language handling.
- `context/`: layout and route state context.
- `tests/`: automated feature tests.

## Application flow

### Landing page
- Welcome screen with a simplified email form.
- Quick access to browse without signing up.
- Random recipe suggestions.
- Highlighted feature section for the product.

### Explore recipes
- Page for browsing meals or drinks.
- Search by name, ingredient, or first letter.
- Category filters.
- Result count and empty states when no recipes match.

### Recipe details
- Displays image, category, type, ingredients, and instructions.
- Allows favoriting and sharing.
- Provides a button to start or continue the recipe.

### Recipe in progress
- Marks ingredients as completed.
- Displays visible progress indicators.
- Allows the user to finish the recipe.
- Saves the recipe in the “Done” list.

### Saved lists
- Favorite recipes on a dedicated page.
- Completed recipes with date and tags.
- Empty states with friendly messaging.

### Profile
- Displays user information.
- Shows favorite, done, and in-progress stats.
- Includes an option to clear all device data while keeping the selected language.

## Persistence

User and recipe data are stored in `localStorage` to keep the app useful on the same browser and device.

Persisted data:
- logged-in user
- favorite recipes
- completed recipes
- recipes in progress
- selected language

## Tests and quality

To run the test suite:

```bash
npm test
```

The suite uses API mocks, so it does not require internet access to validate the app logic.

## How to run locally

Clone the project and install dependencies:

```bash
cd recipes-app
npm install
```

Start the app in development mode:

```bash
npm run dev
```

The app will be available at:

```bash
http://localhost:3000
```

## Production build

To generate the final build:

```bash
npm run build
```

The `dist/` folder will be created with the deployment-ready version.

## GitHub Pages deployment

The project is prepared for deployment on GitHub Pages with Vite and GitHub Actions. The configuration uses `base: '/recipes-app/'` and ensures the application works correctly under the GitHub Pages path.

### Requirements
- Repository with GitHub Pages enabled.
- Pages source set to “GitHub Actions”.
- Main branch set to `main` for the deploy workflow.

The deploy workflow is in:

```text
.github/workflows/deploy.yml
```

## Important notes

- The project was designed to continue working even when the external API is unavailable by using cache and local sample data.
- The app prioritizes keeping the user experience functional rather than failing when an external service is down.
- The layout and logic were designed to work well on mobile and desktop, with tab navigation and responsive components.

## License

This project was developed as a frontend study and demonstration application.
