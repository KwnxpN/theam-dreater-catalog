# Theam Dreater

Frontend web application built with React, TypeScript, Vite, Tailwind CSS, and TanStack Query.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- TanStack Query
- React Router
- Axios
- shadcn/ui components

## Prerequisites

- Node.js 18+ (recommended: latest LTS)
- pnpm

If you do not have pnpm installed:

```bash
npm install -g pnpm
```

## Setup

1. Clone the repository.
2. Open terminal in the project root.
3. Install dependencies:

```bash
pnpm i
```

4. Create your environment file:

```bash
# Windows PowerShell
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

5. Start development server:

```bash
pnpm dev
```

Then open the URL shown in terminal (usually http://localhost:5173).

## Environment Variables

Copy from .env.example and set real values:

- VITE_API_URL
- VITE_RESEND_API_KEY
- VITE_FEEDBACK_TO_EMAIL
- VITE_FEEDBACK_FROM_EMAIL

## Available Scripts

- pnpm dev: Run Vite development server
- pnpm build: Type-check and build production bundle
- pnpm preview: Preview production build locally
- pnpm lint: Run ESLint
- pnpm email:dev: Run React Email preview server on port 3000

## App Routes

- /
- /catalog
- /our-story
- /product/:id
- * (not found)

## Folder Structure

```text
theam-dreater/
|-- .env.example
|-- components.json
|-- eslint.config.js
|-- index.html
|-- instruction.md
|-- LICENSE
|-- package.json
|-- pnpm-lock.yaml
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
|-- public/
|-- src/
|   |-- App.tsx
|   |-- main.tsx
|   |-- vite-env.d.ts
|   |-- api/
|   |   |-- category.api.ts
|   |   |-- email.api.ts
|   |   |-- http.ts
|   |   |-- product.api.ts
|   |-- assets/
|   |   |-- css/
|   |   |   |-- fonts.css
|   |   |   |-- index.css
|   |   |-- fonts/
|   |   |-- images/
|   |   |-- mp3/
|   |-- components/
|   |   |-- Balloon.tsx
|   |   |-- Crosshair.tsx
|   |   |-- OurStoryContent.tsx
|   |   |-- Placeholder.tsx
|   |   |-- catalog/
|   |   |   |-- CategoryChip.tsx
|   |   |   |-- ProductCard.tsx
|   |   |-- home/
|   |   |   |-- FAQ.tsx
|   |   |   |-- Hero.tsx
|   |   |   |-- ProductCarousel.tsx
|   |   |-- layout/
|   |   |   |-- DefaultLayout.tsx
|   |   |   |-- FeedbackForm.tsx
|   |   |   |-- Footer.tsx
|   |   |   |-- Header.tsx
|   |   |   |-- ToggleDark.tsx
|   |   |-- product/
|   |   |   |-- ProductDetail.tsx
|   |   |   |-- ProductImages.tsx
|   |   |   |-- ProductInfo.tsx
|   |   |   |-- RatingBars.tsx
|   |   |   |-- ReviewSection.tsx
|   |   |   |-- StarRating.tsx
|   |   |-- skeletons/
|   |   |   |-- catalog/
|   |   |   |   |-- CategoryChipSkeleton.tsx
|   |   |   |   |-- ProductCardSkeleton.tsx
|   |   |   |-- home/
|   |   |   |   |-- HeroSkeleton.tsx
|   |   |   |   |-- HomeSkeleton.tsx
|   |   |   |   |-- ProductCarouselSkeleton.tsx
|   |   |   |-- product/
|   |   |   |   |-- ProductDetailSkeleton.tsx
|   |   |-- ui/
|   |       |-- avatar.tsx
|   |       |-- button.tsx
|   |       |-- carousel.tsx
|   |       |-- dialog.tsx
|   |       |-- input-group.tsx
|   |       |-- input.tsx
|   |       |-- pagination.tsx
|   |       |-- skeleton.tsx
|   |       |-- sonner.tsx
|   |       |-- switch.tsx
|   |       |-- textarea.tsx
|   |-- emails/
|   |   |-- Email.tsx
|   |   |-- theme.ts
|   |-- hooks/
|   |   |-- useReviewStats.ts
|   |   |-- queries/
|   |       |-- useCategories.ts
|   |       |-- useEmail.ts
|   |       |-- useProducts.ts
|   |-- lib/
|   |   |-- utils.ts
|   |-- pages/
|   |   |-- Catalog.tsx
|   |   |-- Home.tsx
|   |   |-- NotFound.tsx
|   |   |-- OurStory.tsx
|   |   |-- ProductDetailPage.tsx
|   |-- types/
|       |-- category.type.ts
|       |-- product.type.ts
```
