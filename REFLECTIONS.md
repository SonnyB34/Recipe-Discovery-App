# Reflection

## The Most Challenging Part

The most challenging part of this project was understanding and handling the data that comes back from the API, and then debugging the errors that came from it.

TheMealDB returns ingredients as 20 separate numbered fields (`strIngredient1` through `strIngredient20`, with matching `strMeasure1` through `strMeasure20`), and most of them are empty for any given recipe. I had to build a loop that collects only the filled-in ones into a clean list before I could display them.

I also ran into several errors along the way that taught me to read the console carefully:

- **`useFavorites must be used inside a FavoritesProvider`**: this taught me that a context only works for components wrapped inside its Provider.
- **`endcodeURIComponent is not defined`**: a one-letter typo that showed me JavaScript needs names to match exactly.
- **`Cannot read properties of undefined (reading 'split')`**: I tried to split the recipe instructions before confirming the data existed, which taught me to check where data comes from and to guard against missing values.
- **`Received false for a non-boolean attribute className`**: this came from using `&&` instead of a ternary when adding a conditional class.

Working through each of these helped me get better at reading error messages and tracing them back to the exact line.

## A Design Decision

I decided that `FavoritesContext` would store **only the recipe IDs**, not the full recipe objects.

**Why I did it this way:**

- Storing IDs keeps the data saved in `localStorage` small and simple.
- The ID is the one thing that never changes, so there is a single source of truth: the API always provides the recipe details.
- It matches the project requirements, which ask for a list of favorite recipe IDs.
- It makes the context's functions simple: `addFavorite` and `removeFavorite` only add or remove a string from an array, and `isFavorite` is just `favorites.includes(id)`.

**The tradeoff:** the Favorites page has to look up each recipe by its ID to show names and pictures. I handled this by fetching all of them at the same time with `Promise.all` and ignoring late responses if the user leaves the page. I did not use my `useFetch` hook there, because it handles a single URL and the Favorites page needs many requests at once. Learning when a tool fits and when it doesn't was a useful lesson.

I also designed `useFetch` so that passing `null` as the URL skips the request. That let the search page reuse the same hook even when the user hasn't typed anything yet, instead of writing separate fetching logic.
