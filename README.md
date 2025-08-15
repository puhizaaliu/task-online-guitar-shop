# VibeStrings — React + GraphQL + Apollo Client

A small guitar catalog built with **React**, **Apollo Client**, and **GraphQL**, featuring a **multi-language UI (English & Albanian)**. The app has three main pages:

- **Brands** (`/`) – list of guitar brands (from GraphQL)
- **Models** (`/brands/:brandId/models`) – models for a selected brand, with search, filter, and pagination
- **Details** (`/brands/:brandId/models/:modelId`) – model details with specifications and musicians

---

## Features

- React 18 + React Router v6
- GraphQL data fetching via Apollo Client
- **i18n** (English + Albanian) with a **language switcher in the footer**
- Translated static text across pages & components
- Brand descriptions backed by i18n, with a **safe local fallback file**
- Model list **search**, **type filter**, and **pagination**
- Clean MUI (Material UI v5) interface
- Safe image URL handling + placeholder fallback

---

## Tech Stack

- **React 18**
- **Apollo Client 3** (GraphQL)
- **React Router v6**
- **Material UI v5**
- **i18next + react-i18next**

---

## Prerequisites

- **Node.js** v18+ (LTS recommended)
- **npm**
- A running **GraphQL API** compatible with the queries used in `src/graphql/queries.js`

---

## Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Configure the GraphQL endpoint
echo "REACT_APP_GRAPHQL_URI=http://localhost:4000/graphql" > .env

# 3) Start the dev server
npm start

```
- CRA dev server: http://localhost:3000  

> Check your `src/apollo/client.js` to see which env name it reads. A robust pattern is:
> ```js
> const uri =
>   (import.meta?.env && import.meta.env.VITE_GRAPHQL_URI) ||
>   process.env.REACT_APP_GRAPHQL_URI ||
>   "http://localhost:4000/graphql";
> ```

---

## Project Structure (key parts)

```
src/
  apollo/
    client.js                # Apollo Client setup (reads GraphQL URI from .env)
  assets/                    # Images (logo, hero, badges, placeholders, etc.)
  components/
    Footer.jsx               # Footer with language switcher
    Hero.jsx                 # Reusable hero with i18n fallbacks
    MusicianCard.jsx
    brandDescriptions.js     # JS fallback for brand blurbs (if translation missing)
  graphql/
    queries.js               # GET_BRANDS, GET_BRAND_DETAILS, GET_BRAND_MODELS, FIND_UNIQUE_MODEL
  i18n/
    en.json                  # English translations
    sq.json                  # Albanian translations
    i18n.js                  # i18next initialization
  pages/
    GuitarBrands.jsx         # Page 1
    GuitarModels.jsx         # Page 2
    GuitarDetails.jsx        # Page 3
  App.jsx / index.jsx        # App entry (ensure it imports "./i18n/i18n")
```

---

## Routes

- `/` – **Brands** page (hero, brand grid, “why try” section, app promo section)
- `/brands/:brandId/models` – **Models** for selected brand (search, type filter, pagination)
- `/brands/:brandId/models/:modelId` – **Model Details** (tabs: specs, musicians)

---

## GraphQL Queries

Defined in `src/graphql/queries.js`:

- `GET_BRANDS`
- `GET_BRAND_DETAILS`
- `GET_BRAND_MODELS`
- `SEARCH_MODELS`
- `FIND_UNIQUE_MODEL`

> Ensure your backend implements these queries and fields used by pages/components (e.g., `findAllBrands`, `findUniqueBrand`, `findBrandModels`, `findUniqueModel`).

---

