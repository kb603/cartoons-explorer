# Cartoon Explorer

A modern, responsive web application for discovering and exploring 2D cartoons. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring real-time search, genre filtering, and a beautiful card-based interface.

## Features

- 🔍 **Real-time Search** - Search cartoons with debounced input for optimal performance
- 🎭 **Genre Filtering** - Filter cartoons by multiple genres
- 📱 **Responsive Design** - Optimized for all screen types
- 🖼️ **Interactive Cards** - Hover effects and detailed modal views
- 📄 **Pagination** - Efficient navigation through large datasets
- 🌐 **URL State Management** - Shareable URLs with search and filter state

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <https://github.com/kb603/cartoons-explorer.git>
cd cartoons-explorer
```

2. Install dependencies:

```bash
npm install

3. Run the development server:
npm run dev

4. Open [http://localhost:3000] in your browser



```

```
## Project Structure
cartoons-explorer/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CartoonCard.tsx
│   ├── CartoonExplorer.tsx
│   ├── SearchBar.tsx
│   ├── GenreFilter.tsx
│   ├── Grid.tsx
│   └── ...
├── hooks/
│   ├── useCartoon.ts
│   ├── useDebounce.ts
│   └── useUrlState.ts
├── lib/
│   └── api.ts
└── types/
    └── cartoon.ts

```

## Key Technical Decisions

### Architecture & State Management

- **Next.js 15 with App Router**: Leverages the latest Next.js features for optimal performance
- **URL-based State**: Search terms and filters are reflected in the URL for shareability and browser history support
- **Custom Hooks Pattern**: Business logic separated into reusable hooks (`useCartoon`, `useUrlState`, `useDebounce`)
- **Client-side Filtering**: All data fetched once, then filtered client-side for fast interactions

### Performance Optimizations

- **Debounced Search**: 500ms debounce prevents excessive API calls during typing
- **Turbopack**: Next.js 15's faster bundler for development and production builds
- **Optimistic UI Updates**: Immediate local state updates with URL synchronization
- **Pagination**: Handles large datasets efficiently (50 items per page)

### UI/UX Design

- **Radix UI**: Accessible, unstyled components as foundation
- **Tailwind CSS**: Utility-first styling with custom design system
- **Responsive Grid**: CSS Grid with responsive breakpoints
- **Loading States**: Skeleton loaders and error boundaries for better UX

## Trade-offs & Considerations

### Client-side vs Server-side Filtering

**Decision**: Client-side filtering  
**Pros**: Fast interactions, no network requests for filters, works offline  
**Cons**: Initial load includes all data, not suitable for very large datasets  
**Rationale**: The cartoon dataset is reasonably sized (~5000 items), making client-side filtering more responsive

### URL State Synchronization

**Decision**: Sync all filter state to URL parameters  
**Pros**: Shareable links, browser history support, bookmark-friendly  
**Cons**: More complex state management, potential URL pollution  
**Rationale**: Enhances user experience and allows sharing of filtered views

### Debounce Implementation

**Decision**: 500ms debounce for search input  
**Pros**: Reduces unnecessary processing and API calls  
**Cons**: Slight delay in search results  
**Rationale**: Balances responsiveness with performance

### Component Organization

**Decision**: Feature-based component structure  
**Pros**: Easy to locate and maintain related code  
**Cons**: Some code duplication across similar components  
**Rationale**: Improves developer experience and scalability

### External Dependencies

**Decision**: Minimal external dependencies (Radix UI, Lucide React)  
**Pros**: Smaller bundle size, fewer security vulnerabilities  
**Cons**: More custom implementation required  
**Rationale**: Keeps the project lightweight while providing essential functionality

## API Integration

The app uses the [Sample APIs Cartoons 2D](https://api.sampleapis.com/cartoons/cartoons2D) endpoint:

- **Base URL**: `https://api.sampleapis.com/cartoons/cartoons2D`
- **Method**: GET
- **Response**: Array of cartoon objects with title, creator, year, genre, etc.
- **Error Handling**: Graceful fallbacks and user-friendly error messages
