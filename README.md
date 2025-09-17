# Cartoon Explorer

A modern, responsive web application for discovering and exploring 2D cartoons. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring real-time search, genre filtering, and a beautiful card-based interface.

## Features

- 🔍 **Real-time Search** - Search cartoons with debounced input for optimal performance
- 🎭 **Genre Filtering** - Filter cartoons by multiple genres simultaneously
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🖼️ **Interactive Cards** - Hover effects and detailed modal views
- 📄 **Pagination** - Efficient navigation through large datasets
- 🌐 **URL State Management** - Shareable URLs with search and filter state
- ⚡ **Performance Optimized** - Turbopack for fast builds and hot reload
- 🎨 **Modern UI** - Clean design with Radix UI components and Tailwind CSS

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cartoons-explorer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
cartoons-explorer/
├── app/                    # Next.js 15 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── CartoonCard.tsx   # Individual cartoon card
│   ├── CartoonExplorer.tsx # Main explorer component
│   ├── SearchBar.tsx     # Search input with clear functionality
│   ├── GenreFilter.tsx   # Multi-select genre filter
│   ├── Grid.tsx         # Responsive card grid
│   └── ...              # Other UI components
├── hooks/                # Custom React hooks
│   ├── useCartoon.ts    # Cartoon data fetching logic
│   ├── useDebounce.ts   # Debounced input handling
│   └── useUrlState.ts   # URL state synchronization
├── lib/                  # Utilities and API
│   └── api.ts           # Cartoon API client
└── types/               # TypeScript definitions
    └── cartoon.ts       # Cartoon data types
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
**Rationale**: The cartoon dataset is reasonably sized (~200 items), making client-side filtering more responsive

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

## Browser Support

- Chrome/Edge 91+
- Firefox 90+
- Safari 14+
- Mobile browsers with ES2020 support

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
