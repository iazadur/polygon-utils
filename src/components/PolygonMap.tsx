import React, { useCallback, memo } from 'react';
import { OptimizedPolygon } from './OptimizedPolygon';
import { usePolygonOperations } from '../hooks/usePolygonOperations';

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
export const PolygonMap: React.FC<PolygonMapProps> = memo(({
    polygons = [],
    renderPolygon,
    autoOptimize = true,
    simplify = true,
    simplifyTolerance = 0.001,
    flatten = true,
    getPolygonId = (p: any, i: number) => p.id || p.properties?.id || `polygon-${i}`,
    className,
    style
}) => {
    // Get polygon operations
    const operations = usePolygonOperations({
        defaultSimplifyTolerance: simplifyTolerance
    });

    // Function to optimize a single polygon
    const optimizePolygon = useCallback((polygon: any) => {
        if (!autoOptimize) return polygon;

        let result = polygon;

        if (flatten) {
            result = operations.flatten(result);
        }

        if (simplify) {
            result = operations.simplify(result, simplifyTolerance);
        }

        return result;
    }, [autoOptimize, flatten, simplify, simplifyTolerance, operations]);

    // If no polygons, render an empty div
    if (!polygons || polygons.length === 0) {
        return <div className={className} style={style}></div>;
    }

    return (
        <div className={className} style={style}>
            {polygons.map((polygon, index) => {
                // Get unique ID for this polygon
                const id = getPolygonId(polygon, index);

                return (
                    <OptimizedPolygon
                        key={id}
                        id={id}
                        data={polygon}
                        autoOptimize={autoOptimize}
                        simplify={simplify}
                        simplifyTolerance={simplifyTolerance}
                        flatten={flatten}
                    >
                        {(optimizedPolygon) => renderPolygon(optimizedPolygon, index)}
                    </OptimizedPolygon>
                );
            })}
        </div>
    );
}); 