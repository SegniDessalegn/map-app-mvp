# Map App MVP 🗺️

This is a two-screen React Native app built with Expo Router. It shows a map with city markers and a detail screen for each city.

The focus was clean navigation, proper data fetching, and scalable architecture.

**Live Web App:** [https://map-app-mvp.segnides.workers.dev/](https://map-app-mvp.segnides.workers.dev/)

---

## Features

- **Cross-Platform Map:** Map implementation using `react-native-maps` on native devices and a custom Google Maps integration on the web.
- **Dynamic City Data:** Fetches coordinates, population, timezone, elevation, and details of major cities dynamically from the external GeoNames API.
- **Navigation:** Clean, declarative navigation using file-based routing via **Expo Router v6**.
- **State Management & Caching:** Uses **Redux Toolkit Query (RTK Query)** for network requests, caching, loading states, and error handling.

---

## Directory & Route Structure

```text
├── app/
│   ├── _layout.tsx       # Root layout configuring the Redux Provider and Stack Router
│   ├── index.tsx         # Map Screen (main landing page with markers)
│   └── location/
│       └── [id].tsx      # City Detail Screen showing population, timezone, and coordinates
├── components/
│   ├── Map.tsx           # Native Map wrapper using react-native-maps
│   └── Map.web.tsx       # Web Map wrapper using the Google Maps JavaScript API
├── lib/
│   └── store.ts          # Redux Store configuration
├── services/
│   └── city.ts           # RTK Query service for GeoNames API communication
└── types/
    └── index.ts          # TypeScript type declarations for maps and cities
```

### Route Mappings
- `/` → Interactive Map screen showing markers for all loaded cities.
- `/location/[id]` → Detailed view screen displaying elevation, population, coordinates, and timezone.

---

## Tech Stack

- **Framework:** [Expo v54](https://expo.dev/) (React Native 0.81)
- **Routing:** Expo Router
- **State Management:** Redux Toolkit & RTK Query
- **Maps:** `react-native-maps` (Mobile) / Google Maps JavaScript API (Web)
- **HTTP Client:** fetchBaseQuery (RTK Query)
- **Language:** TypeScript

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SegniDessalegn/map-app-mvp.git
   cd map-app-mvp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your Google Maps API key (required for Web support):
   ```env
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

### Running the App

- **Start Expo Go (Metro Bundler):**
  ```bash
  npm run start
  ```

- **Run on Web:**
  ```bash
  npm run web
  ```

- **Run on iOS Simulator:**
  ```bash
  npm run ios
  ```

- **Run on Android Emulator:**
  ```bash
  npm run android
  ```