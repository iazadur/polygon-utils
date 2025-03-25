export interface UsePolygonDataOptions {
    /**
     * Whether to flatten MultiPolygons into Polygons
     */
    flatten?: boolean;
    /**
     * Whether to simplify polygons
     */
    simplify?: boolean;
    /**
     * Tolerance level for simplification (0-1)
     */
    simplifyTolerance?: number;
    /**
     * Polling interval in milliseconds (0 to disable polling)
     */
    pollingInterval?: number;
    /**
     * Whether to auto-optimize polygons for rendering
     */
    autoOptimize?: boolean;
}
export interface UsePolygonDataResult<T> {
    /**
     * The processed polygon data
     */
    data: T | null;
    /**
     * Whether data is currently being loaded
     */
    loading: boolean;
    /**
     * Any error that occurred during loading
     */
    error: Error | null;
    /**
     * Manually refresh the data
     */
    refresh: () => Promise<void>;
}
/**
 * Hook for fetching and processing polygon data
 *
 * @param url - URL to fetch polygon data from
 * @param options - Configuration options
 * @returns Object containing data, loading state, error state, and a refresh function
 */
export declare function usePolygonData<T = any>(url: string, options?: UsePolygonDataOptions): UsePolygonDataResult<T>;
