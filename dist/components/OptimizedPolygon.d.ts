import React from 'react';
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
/**
 * Component that optimizes polygon data before rendering
 */
export declare const OptimizedPolygon: React.FC<OptimizedPolygonProps>;
