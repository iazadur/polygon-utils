// Export utility functions
export {
    flattenMultiPolygon,
    simplifyPolygon,
    mergePolygons,
    calculateArea,
    isPointInPolygon,
    optimizeForRendering
} from './utils/polygonUtils';

export type {
    Polygon,
    MultiPolygon,
    GeoJSONFeature,
    GeoJSONFeatureCollection
} from './utils/polygonUtils';

// Export caching utilities
export {
    LRUCache,
    memoize
} from './utils/cacheUtils';

// Export hooks
export {
    usePolygonData
} from './hooks/usePolygonData';

export type {
    UsePolygonDataOptions,
    UsePolygonDataResult
} from './hooks/usePolygonData';

export {
    usePolygonOperations
} from './hooks/usePolygonOperations';

export type {
    PolygonOperationsOptions
} from './hooks/usePolygonOperations';

// Export components
export {
    OptimizedPolygon
} from './components/OptimizedPolygon';

export type {
    OptimizedPolygonProps
} from './components/OptimizedPolygon';

export {
    PolygonMap
} from './components/PolygonMap';

export type {
    PolygonMapProps
} from './components/PolygonMap';