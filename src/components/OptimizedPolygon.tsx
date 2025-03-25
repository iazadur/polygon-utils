import React, { useMemo } from 'react';
import { optimizeForRendering } from '../utils/polygonUtils';
import { memoize } from '../utils/cacheUtils';

export interface OptimizedPolygonProps {
    /**
     * The polygon data to render
     */
    data: any;

    /**
     * Whether to automatically optimize the polygon for rendering
     */
    autoOptimize?: boolean;

    /**
     * Whether to simplify the polygon
     */
    simplify?: boolean;

    /**
     * Tolerance level for simplification (0-1)
     */
    simplifyTolerance?: number;

    /**
     * Whether to flatten multi-polygons
     */
    flatten?: boolean;

    /**
     * Render function that receives the optimized polygon data
     */
    children: (optimizedData: any) => React.ReactNode;

    /**
     * Unique ID for the polygon (used for optimization)
     */
    id?: string;
}

// Create a memoized version of optimizeForRendering function
const memoizedOptimize = memoize(
    (data: any, options: any) => optimizeForRendering(data, options),
    (data, options) => JSON.stringify({
        id: data.id || data.properties?.id,
        options
    }),
    { capacity: 50 }
);

/**
 * Component that optimizes polygon data before rendering
 */
export const OptimizedPolygon: React.FC<OptimizedPolygonProps> = ({
    data,
    autoOptimize = true,
    simplify = true,
    simplifyTolerance = 0.001,
    flatten = true,
    children,
    id
}) => {
    // Only optimize if autoOptimize is true
    const optimizedData = useMemo(() => {
        if (!data) return null;

        // If we shouldn't auto-optimize, just return the data as-is
        if (!autoOptimize) return data;

        // Create a configuration object
        const options = {
            simplify,
            simplifyTolerance,
            flatten
        };

        // Add ID to data if provided
        const dataWithId = id && !data.id ? { ...data, id } : data;

        // Use memoized optimization
        return memoizedOptimize(dataWithId, options);
    }, [data, autoOptimize, simplify, simplifyTolerance, flatten, id]);

    // Render nothing if there's no data
    if (!optimizedData) {
        return null;
    }

    // Use render prop pattern to render the optimized data
    return <>{children(optimizedData)}</>;
}; 