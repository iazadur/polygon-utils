import { useMemo, useCallback } from 'react';
import {
    simplifyPolygon,
    flattenMultiPolygon,
    mergePolygons,
    calculateArea,
    isPointInPolygon
} from '../utils/polygonUtils';
import { memoize } from '../utils/cacheUtils';

export interface PolygonOperationsOptions {
    /**
     * Default tolerance level for simplification (0-1)
     */
    defaultSimplifyTolerance?: number;

    /**
     * Whether to use memoization for expensive operations
     */
    useMemoization?: boolean;

    /**
     * Cache size for memoized functions
     */
    cacheSize?: number;
}

/**
 * Hook that provides optimized polygon manipulation functions
 * 
 * @param options - Configuration options
 * @returns Object containing various polygon utility functions
 */
export function usePolygonOperations(
    options: PolygonOperationsOptions = {}
) {
    const {
        defaultSimplifyTolerance = 0.001,
        useMemoization = true,
        cacheSize = 50
    } = options;

    // Create memoized versions of functions if memoization is enabled
    const memoizedSimplify = useMemo(() => {
        return useMemoization
            ? memoize(simplifyPolygon, (polygon, tolerance) =>
                `${JSON.stringify(polygon)}-${tolerance}`, { capacity: cacheSize })
            : simplifyPolygon;
    }, [useMemoization, cacheSize]);

    const memoizedFlatten = useMemo(() => {
        return useMemoization
            ? memoize(flattenMultiPolygon, geojson =>
                JSON.stringify(geojson), { capacity: cacheSize })
            : flattenMultiPolygon;
    }, [useMemoization, cacheSize]);

    const memoizedMerge = useMemo(() => {
        return useMemoization
            ? memoize(mergePolygons, polygons =>
                JSON.stringify(polygons.map(p => p.id || JSON.stringify(p))), { capacity: cacheSize })
            : mergePolygons;
    }, [useMemoization, cacheSize]);

    const memoizedCalculateArea = useMemo(() => {
        return useMemoization
            ? memoize(calculateArea, polygon =>
                JSON.stringify(polygon), { capacity: cacheSize })
            : calculateArea;
    }, [useMemoization, cacheSize]);

    const memoizedIsPointInPolygon = useMemo(() => {
        return useMemoization
            ? memoize(isPointInPolygon, (point, polygon) =>
                `${point.join(',')}-${JSON.stringify(polygon)}`, { capacity: cacheSize })
            : isPointInPolygon;
    }, [useMemoization, cacheSize]);

    // Function to simplify a polygon with the default tolerance
    const simplify = useCallback((polygon: any, tolerance?: number) => {
        return memoizedSimplify(polygon, tolerance || defaultSimplifyTolerance);
    }, [memoizedSimplify, defaultSimplifyTolerance]);

    // Function to flatten a multi-polygon
    const flatten = useCallback((polygon: any) => {
        return memoizedFlatten(polygon);
    }, [memoizedFlatten]);

    // Function to merge multiple polygons
    const merge = useCallback((polygons: any[]) => {
        return memoizedMerge(polygons);
    }, [memoizedMerge]);

    // Function to calculate area
    const area = useCallback((polygon: any) => {
        return memoizedCalculateArea(polygon);
    }, [memoizedCalculateArea]);

    // Function to check if a point is inside a polygon
    const contains = useCallback((point: [number, number], polygon: any) => {
        return memoizedIsPointInPolygon(point, polygon);
    }, [memoizedIsPointInPolygon]);

    return {
        simplify,
        flatten,
        merge,
        area,
        contains
    };
} 