import * as turf from '@turf/turf';

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
export const flattenMultiPolygon = (geojson: any): any => {
    if (!geojson) return null;

    if (geojson.type === 'MultiPolygon') {
        return {
            type: 'Polygon',
            coordinates: geojson.coordinates.flat(1),
        };
    }

    if (geojson.type === 'Feature' && geojson.geometry?.type === 'MultiPolygon') {
        return {
            ...geojson,
            geometry: {
                type: 'Polygon',
                coordinates: geojson.geometry.coordinates.flat(1)
            }
        };
    }

    return geojson;
};

/**
 * Simplifies a polygon to reduce the number of points while maintaining shape
 * @param polygon - The polygon to simplify
 * @param tolerance - The tolerance value (between 0 and 1, higher means more simplification)
 * @returns A simplified polygon
 */
export const simplifyPolygon = (polygon: any, tolerance = 0.001): any => {
    if (!polygon) return null;
    return turf.simplify(polygon, { tolerance, highQuality: false });
};

/**
 * Merges multiple polygons into a single polygon
 * @param polygons - Array of polygons to merge
 * @returns A merged polygon
 */
export const mergePolygons = (polygons: any[]): any => {
    if (!polygons || polygons.length === 0) return null;
    if (polygons.length === 1) return polygons[0];

    try {
        // Convert to features if they aren't already
        const features = polygons.map(poly => {
            if (poly.type === 'Feature') return poly;
            return turf.feature(poly);
        });

        // Create a feature collection
        const featureCollection = turf.featureCollection(features);

        // Perform union
        // Apply union operations sequentially
        let result = features[0];
        for (let i = 1; i < features.length; i++) {
            result = turf.union(result, features[i]);
        }

        return result;
    } catch (error) {
        console.error('Error merging polygons:', error);
        return polygons[0]; // Return first polygon as fallback
    }
};

/**
 * Calculates area of a polygon in square meters
 * @param polygon - The polygon to calculate area for
 * @returns Area in square meters
 */
export const calculateArea = (polygon: any): number => {
    if (!polygon) return 0;
    return turf.area(polygon);
};

/**
 * Checks if a point is inside a polygon
 * @param point - [longitude, latitude] coordinates
 * @param polygon - The polygon to check against
 * @returns Boolean indicating if point is inside polygon
 */
export const isPointInPolygon = (point: [number, number], polygon: any): boolean => {
    if (!point || !polygon) return false;

    const pt = turf.point(point);
    return turf.booleanPointInPolygon(pt, polygon);
};

/**
 * Optimizes a GeoJSON object for frontend rendering
 * @param geojson - The GeoJSON object to optimize
 * @param options - Optimization options
 * @returns Optimized GeoJSON
 */
export const optimizeForRendering = (
    geojson: any,
    options: {
        simplify?: boolean;
        simplifyTolerance?: number;
        flatten?: boolean;
    } = {}
): any => {
    if (!geojson) return null;

    const {
        simplify = true,
        simplifyTolerance = 0.001,
        flatten = true
    } = options;

    let result = geojson;

    // Flatten multi-polygons if needed
    if (flatten) {
        result = flattenMultiPolygon(result);
    }

    // Simplify if needed
    if (simplify) {
        result = simplifyPolygon(result, simplifyTolerance);
    }

    return result;
}; 