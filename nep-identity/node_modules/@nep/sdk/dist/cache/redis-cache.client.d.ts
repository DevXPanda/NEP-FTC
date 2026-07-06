export interface CacheClientOptions {
    url: string;
    /** Key prefix applied to every operation, e.g. "nep-identity:". */
    namespace?: string;
    /** Default TTL in seconds when none is supplied to set(). */
    defaultTtlSec?: number;
}
export interface CacheClient {
    /** Returns the deserialized value or null if the key is absent/expired. */
    get<T>(key: string): Promise<T | null>;
    /** Serializes and stores a value with an optional TTL (seconds). */
    set<T>(key: string, value: T, ttlSec?: number): Promise<void>;
    /** Deletes one or more keys; returns the number removed. */
    del(...keys: string[]): Promise<number>;
    /** Returns true if the key exists. */
    has(key: string): Promise<boolean>;
    /**
     * Returns the cached value or computes, stores, and returns it on a miss.
     * Intended to centralize the read-through pattern across services.
     */
    getOrSet<T>(key: string, factory: () => Promise<T>, ttlSec?: number): Promise<T>;
    /** Closes the underlying connection. */
    close(): Promise<void>;
}
/**
 * Creates a Redis-backed cache client.
 * TODO: implement — wrap ioredis, prefix keys with `namespace`, JSON-serialize values,
 * apply TTLs, and implement the read-through getOrSet with basic miss-stampede safety.
 */
export declare function createCacheClient(_options: CacheClientOptions): CacheClient;
//# sourceMappingURL=redis-cache.client.d.ts.map