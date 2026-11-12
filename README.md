# Recipe Discovery

A recipe browsing app built with **React** and **React Router**, powered by the free [TheMealDB API](https://www.themealdb.com/api.php) (no API key required). Browse recipes by category, search by name, view full recipe details, and save your favorites. Your favorites are remembered even after you close the browser.

## Features

- **Browse categories**: the home page shows every recipe category from the API
- **Category pages**: see all recipes in a category (for example, `/category/Seafood`)
- **Recipe details**: photo, ingredients with measurements, and step-by-step instructions
- **Favorites**: add or remove a recipe from favorites with one click, and view them all on the Favorites page
- **Persistent favorites**: favorites are saved to `localStorage`, so they survive page refreshes
- **Search**: search for recipes by name from the Navbar (`/search?query=...`)
- **Loading and error states**: a spinner while data loads and a friendly message if something goes wrong
- **Empty states**: helpful messages when there are no favorites or no search results
- **404 page** for unknown addresses
- **Responsive design** that works on phones and desktops

## Tech Stack

- [React](https://react.dev/) (hooks and the Context API)
- [React Router](https://reactrouter.com/) for routing
- [Vite](https://vite.dev/) for the dev server and build tool
- JavaScript (JSX) and plain CSS
- [TheMealDB API](https://www.themealdb.com/api.php)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd recipe-discovery

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
