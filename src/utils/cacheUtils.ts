/**
 * A simple LRU (Least Recently Used) cache implementation
 */
export class LRUCache<K, V> {
    private capacity: number;
    private cache: Map<K, V>;

    /**
     * Creates a new LRU cache with the specified capacity
     * @param capacity - Maximum number of items to store
     */
    constructor(capacity: number = 100) {
        this.capacity = capacity;
        this.cache = new Map<K, V>();
    }

    /**
     * Gets a value from the cache
     * @param key - The key to look up
     * @returns The cached value or undefined if not found
     */
    get(key: K): V | undefined {
        if (!this.cache.has(key)) {
            return undefined;
        }

        // Get the value
        const value = this.cache.get(key)!;

        // Remove and re-add to put it at the end (most recently used)
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    /**
     * Sets a value in the cache
     * @param key - The key to store
     * @param value - The value to cache
     */
    set(key: K, value: V): void {
        // If already exists, remove it to update order
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        // If at capacity, remove the oldest item (first item in Map)
        else if (this.cache.size >= this.capacity) {
            const oldestKey = this.cache.keys().next().value;
            // Check if we have a valid key
            if (oldestKey !== undefined) {
                this.cache.delete(oldestKey);
            }
        }

        // Add new item
        this.cache.set(key, value);
    }

    /**
     * Removes a value from the cache
     * @param key - The key to remove
     * @returns Whether the key was present in the cache
     */
    delete(key: K): boolean {
        return this.cache.delete(key);
    }

    /**
     * Clears the entire cache
     */
    clear(): void {
        this.cache.clear();
    }

    /**
     * Gets the current size of the cache
     * @returns Number of items in the cache
     */
    size(): number {
        return this.cache.size;
    }

    /**
     * Gets all keys in the cache
     * @returns Array of all keys
     */
    keys(): K[] {
        return Array.from(this.cache.keys());
    }
}

/**
 * Creates a memoized version of a function that caches results
 * 
 * @param fn - The function to memoize
 * @param getKey - Optional function to generate a custom cache key
 * @param options - Cache options including capacity
 * @returns A memoized version of the function
 */
export function memoize<T extends (...args: any[]) => any>(
    fn: T,
    getKey: (...args: Parameters<T>) => string = (...args) => JSON.stringify(args),
    options: { capacity?: number } = {}
): T {
    const cache = new LRUCache<string, ReturnType<T>>(options.capacity || 100);

    return ((...args: Parameters<T>): ReturnType<T> => {
        const key = getKey(...args);
        const cachedResult = cache.get(key);

        // If we have a cached result, return it
        if (cachedResult !== undefined) {
            return cachedResult;
        }

        // Calculate the result
        const result = fn(...args);

        // Cache the result
        cache.set(key, result);

        return result;
    }) as T;
} 