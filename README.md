# Polygon Utils

A high-performance polygon data handling library for React and Next.js applications.

## Features

- 🚀 **Performance Optimized**: Simplify and flatten complex polygon data for better rendering performance
- 🧠 **Smart Caching**: Includes built-in memoization to prevent redundant processing
- 📦 **Small Footprint**: Minimal bundle size with tree-shakable exports
- 🔄 **Real-time Ready**: Designed for applications that handle frequent polygon data updates
- 🗺️ **Map Integration**: Works with any map library (Leaflet, Mapbox, Google Maps, etc.)
- ⚛️ **React Hooks**: Purpose-built hooks for React applications

## Installation

```bash
npm install polygon-utils
# or
yarn add polygon-utils
# or
pnpm add polygon-utils
```

## Quick Start

```jsx
import { usePolygonData, PolygonMap } from "polygon-utils";
import { MapContainer, TileLayer } from "react-leaflet";

function MyMap() {
  // Fetch and automatically optimize polygon data
  const { data, loading, error } = usePolygonData("/api/polygons", {
    simplify: true,
    flatten: true,
    pollingInterval: 30000, // Poll every 30 seconds
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No polygon data available</div>;

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render optimized polygons */}
      <PolygonMap
        polygons={data}
        renderPolygon={(polygon, index) => (
          <Polygon positions={polygon.coordinates} key={index} color="blue" />
        )}
      />
    </MapContainer>
  );
}
```

## Core Utilities

### Polygon Processing

```jsx
import {
  flattenMultiPolygon,
  simplifyPolygon,
  mergePolygons,
  calculateArea,
  isPointInPolygon,
  optimizeForRendering,
} from "polygon-utils";

// Simplify a complex polygon
const simplifiedPolygon = simplifyPolygon(polygon, 0.001);

// Convert a MultiPolygon to a simple Polygon
const flattenedPolygon = flattenMultiPolygon(multiPolygon);

// Merge multiple polygons into one
const merged = mergePolygons([polygon1, polygon2, polygon3]);

// Check if a point is inside a polygon
const isInside = isPointInPolygon([longitude, latitude], polygon);

// Get polygon area in square meters
const area = calculateArea(polygon);

// All-in-one optimization
const optimized = optimizeForRendering(polygon, {
  simplify: true,
  simplifyTolerance: 0.001,
  flatten: true,
});
```

### React Hooks

#### usePolygonData

Fetches and optimizes polygon data from an API endpoint.

```jsx
const { data, loading, error, refresh } = usePolygonData(url, {
  flatten: true, // Flatten MultiPolygons
  simplify: true, // Simplify polygons
  simplifyTolerance: 0.001, // Tolerance level (0-1)
  pollingInterval: 0, // Auto-refresh interval (ms, 0 to disable)
  autoOptimize: true, // Apply optimizations automatically
});
```

#### usePolygonOperations

Provides optimized, memoized polygon operation functions.

```jsx
const { simplify, flatten, merge, area, contains } = usePolygonOperations({
  defaultSimplifyTolerance: 0.001, // Default simplification level
  useMemoization: true, // Use caching for better performance
  cacheSize: 50, // Size of the operation cache
});

// These operations are now optimized with memoization
const simplified = simplify(polygon);
const isInside = contains([longitude, latitude], polygon);
```

### React Components

#### OptimizedPolygon

Component that automatically optimizes a polygon for rendering.

```jsx
<OptimizedPolygon
  data={polygon}
  autoOptimize={true}
  simplify={true}
  simplifyTolerance={0.001}
  flatten={true}
>
  {(optimizedPolygon) => <YourMapPolygonComponent data={optimizedPolygon} />}
</OptimizedPolygon>
```

#### PolygonMap

Efficiently renders multiple polygons with optimizations.

```jsx
<PolygonMap
  polygons={polygonArray}
  renderPolygon={(polygon, index) => (
    <YourMapPolygonComponent data={polygon} key={index} />
  )}
  autoOptimize={true}
  simplify={true}
  simplifyTolerance={0.001}
  flatten={true}
/>
```

## Performance Tips

1. **Use Memoization**: The built-in caching system prevents redundant calculations
2. **Adjust Tolerance**: Higher `simplifyTolerance` values (e.g., 0.01) create simpler polygons but with less precision
3. **Flatten MultiPolygons**: Converting complex nested MultiPolygons to simpler Polygons improves rendering speed
4. **Batch Processing**: Use `mergePolygons` to combine many small polygons before rendering
5. **ID-based Caching**: Provide stable IDs to improve cache hit rates

## License

MIT
# polygon-utils
