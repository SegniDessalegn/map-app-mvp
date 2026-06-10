# Map App MVP

## Overview

This is a two-screen React Native app built with Expo Router. It shows a map with city markers and a detail screen for each city.

The focus was clean navigation, proper data fetching, and scalable architecture.

---
## Architecture

### Expo Router
Used file-based routing:
- `/` → Map screen
- `/location/[id]` → City detail screen

### React Query (State Management)
I used React Query to handle server state instead of manual Context or `useEffect`.

Hooks:
- `useCities()` → list screen
- `useCity(id)` → detail screen

### API Layer
All API calls were separated into:
- `fetchCities`
- `fetchCity`

---

## Key Challenge: Context Provider Design

I initially tried using a Context Provider to manage city data globally.

However, it became complex because:
- List and detail data had different lifecycles
- Loading and error states were mixed
- Deep linking broke assumptions about shared state

### Fix

I replaced Context with React Query, which simplified everything by:
- Separating list and detail queries
- Removing manual state management
- Adding automatic caching

## Key Challenge: Web Compatibility

`react-native-maps` is not supported on web, which broke Expo web builds.

### Fix

Used platform-specific rendering:
- Mobile: full map experience
- Web: fallback UI message

---

## Summary

- Clean architecture with Expo Router
- React Query for server state
- Type-safe API layer
- Learned when NOT to use Context for async data
- Handled platform limitations for web builds