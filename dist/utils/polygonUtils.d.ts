/**
 * Types for GeoJSON polygon features
 */
export interface Polygon {
    type: 'Polygon';
    coordinates: number[][][];
}
export interface MultiPolygon {
    type: 'MultiPolygon';
    coordinates: number[][][][];
}
export interface GeoJSONFeature {
    type: 'Feature';
    properties?: Record<string, any>;
    geometry: Polygon | MultiPolygon;
}
export interface GeoJSONFeatureCollection {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
}
/**
 * Flattens a MultiPolygon into a single Polygon
 * @param geojson - The input GeoJSON object
 * @returns A simplified Polygon or the original GeoJSON if not a MultiPolygon
 */
export declare const flattenMultiPolygon: (geojson: any) => any;
/**
 * Simplifies a polygon to reduce the number of points while maintaining shape
 * @param polygon - The polygon to simplify
 * @param tolerance - The tolerance value (between 0 and 1, higher means more simplification)
 * @returns A simplified polygon
 */
export declare const simplifyPolygon: (polygon: any, tolerance?: number) => any;
/**
 * Merges multiple polygons into a single polygon
 * @param polygons - Array of polygons to merge
 * @returns A merged polygon
 */
export declare const mergePolygons: (polygons: any[]) => any;
/**
 * Calculates area of a polygon in square meters
 * @param polygon - The polygon to calculate area for
 * @returns Area in square meters
 */
export declare const calculateArea: (polygon: any) => number;
/**
 * Checks if a point is inside a polygon
 * @param point - [longitude, latitude] coordinates
 * @param polygon - The polygon to check against
 * @returns Boolean indicating if point is inside polygon
 */
export declare const isPointInPolygon: (point: [number, number], polygon: any) => boolean;
/**
 * Optimizes a GeoJSON object for frontend rendering
 * @param geojson - The GeoJSON object to optimize
 * @param options - Optimization options
 * @returns Optimized GeoJSON
 */
export declare const optimizeForRendering: (geojson: any, options?: {
    simplify?: boolean;
    simplifyTolerance?: number;
    flatten?: boolean;
}) => any;
