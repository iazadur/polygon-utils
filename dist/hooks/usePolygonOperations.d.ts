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
export declare function usePolygonOperations(options?: PolygonOperationsOptions): {
    simplify: (polygon: any, tolerance?: number) => any;
    flatten: (polygon: any) => any;
    merge: (polygons: any[]) => any;
    area: (polygon: any) => number;
    contains: (point: [number, number], polygon: any) => boolean;
};
