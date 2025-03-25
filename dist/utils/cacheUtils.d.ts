/**
 * A simple LRU (Least Recently Used) cache implementation
 */
export declare class LRUCache<K, V> {
    private capacity;
    private cache;
    /**
     * Creates a new LRU cache with the specified capacity
     * @param capacity - Maximum number of items to store
     */
    constructor(capacity?: number);
    /**
     * Gets a value from the cache
     * @param key - The key to look up
     * @returns The cached value or undefined if not found
     */
    get(key: K): V | undefined;
    /**
     * Sets a value in the cache
     * @param key - The key to store
     * @param value - The value to cache
     */
    set(key: K, value: V): void;
    /**
     * Removes a value from the cache
     * @param key - The key to remove
     * @returns Whether the key was present in the cache
     */
    delete(key: K): boolean;
    /**
     * Clears the entire cache
     */
    clear(): void;
    /**
     * Gets the current size of the cache
     * @returns Number of items in the cache
     */
    size(): number;
    /**
     * Gets all keys in the cache
     * @returns Array of all keys
     */
    keys(): K[];
}
/**
 * Creates a memoized version of a function that caches results
 *
 * @param fn - The function to memoize
 * @param getKey - Optional function to generate a custom cache key
 * @param options - Cache options including capacity
 * @returns A memoized version of the function
 */
export declare function memoize<T extends (...args: any[]) => any>(fn: T, getKey?: (...args: Parameters<T>) => string, options?: {
    capacity?: number;
}): T;
