import React from 'react';
export interface PolygonMapProps {
    /**
     * Array of polygon data to render
     */
    polygons: any[];
    /**
     * Render prop for rendering each individual polygon
     */
    renderPolygon: (polygon: any, index: number) => React.ReactNode;
    /**
     * Whether to automatically optimize polygons
     */
    autoOptimize?: boolean;
    /**
     * Whether to simplify polygons
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
     * Function to get a unique ID for each polygon
     */
    getPolygonId?: (polygon: any, index: number) => string;
    /**
     * Optional className for the container
     */
    className?: string;
    /**
     * Optional style for the container
     */
    style?: React.CSSProperties;
}
/**
 * A component for efficiently rendering multiple polygons on a map
 */
export declare const PolygonMap: React.FC<PolygonMapProps>;
