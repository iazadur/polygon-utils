import { useState, useEffect, useCallback, useRef } from 'react';
import { optimizeForRendering } from '../utils/polygonUtils';
import { memoize } from '../utils/cacheUtils';

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
export function usePolygonData<T = any>(
    url: string,
    options: UsePolygonDataOptions = {}
): UsePolygonDataResult<T> {
    const {
        flatten = true,
        simplify = true,
        simplifyTolerance = 0.001,
        pollingInterval = 0,
        autoOptimize = true,
    } = options;

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Create a memoized version of optimizeForRendering to avoid reprocessing the same data
    const memoizedOptimize = useRef(
        memoize(
            (data: any) => optimizeForRendering(data, {
                simplify,
                simplifyTolerance,
                flatten
            }),
            (data) => JSON.stringify({
                id: data.id || Math.random().toString(36).substring(2, 9),
                lastModified: data.lastModified || Date.now()
            }),
            { capacity: 20 }
        )
    ).current;

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonData = await response.json();

            // Process the data if auto-optimize is enabled
            const processedData = autoOptimize ? memoizedOptimize(jsonData) : jsonData;

            setData(processedData as T);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setLoading(false);
        }
    }, [url, autoOptimize, memoizedOptimize]);

    // Set up polling if enabled
    useEffect(() => {
        // Initial fetch
        fetchData();

        // Set up polling if interval > 0
        let intervalId: ReturnType<typeof setInterval> | undefined;

        if (pollingInterval > 0) {
            intervalId = setInterval(fetchData, pollingInterval);
        }

        // Cleanup
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [fetchData, pollingInterval]);

    const refresh = useCallback(async () => {
        await fetchData();
    }, [fetchData]);

    return { data, loading, error, refresh };
} 