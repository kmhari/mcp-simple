// API Client for server-side operations
// Handles communication with backend paginated APIs

class APIClient {
    constructor() {
        this.baseURL = '';
        this.cache = new Map();
        this.cacheTimeout = 30000; // 30 seconds cache
    }

    /**
     * Get paginated servers with search, sort, and filter
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} API response with servers and pagination info
     */
    async getPaginatedServers(params = {}) {
        const defaultParams = {
            page: 1,
            limit: 50,
            search: '',
            sortBy: 'name',
            sortOrder: 'asc',
            category: '',
            minStars: 0,
            maxStars: 999999
        };

        const queryParams = { ...defaultParams, ...params };
        const cacheKey = JSON.stringify(queryParams);
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
            this.cache.delete(cacheKey);
        }

        const queryString = new URLSearchParams(queryParams).toString();
        const url = `/api/servers/paginated?${queryString}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error('Error fetching paginated servers:', error);
            throw error;
        }
    }

    /**
     * Get all available categories
     * @returns {Promise<Array>} Array of category names
     */
    async getCategories() {
        const cacheKey = 'categories';
        
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
            this.cache.delete(cacheKey);
        }

        try {
            const response = await fetch('/api/servers/categories');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }

    /**
     * Get search suggestions for autocomplete
     * @param {string} query - Search query
     * @param {number} limit - Maximum suggestions to return
     * @returns {Promise<Array>} Array of suggestion strings
     */
    async getSearchSuggestions(query, limit = 10) {
        if (!query || query.length < 2) {
            return [];
        }

        const cacheKey = `suggestions-${query}-${limit}`;
        
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
            this.cache.delete(cacheKey);
        }

        const queryString = new URLSearchParams({ q: query, limit }).toString();
        const url = `/api/servers/search-suggestions?${queryString}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Cache the result
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error('Error fetching search suggestions:', error);
            return [];
        }
    }

    /**
     * Clear the API cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Clear cache entries older than the timeout
     */
    cleanupCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (now - value.timestamp > this.cacheTimeout) {
                this.cache.delete(key);
            }
        }
    }
}

// Export singleton instance
export const apiClient = new APIClient();

// Cleanup cache periodically
setInterval(() => {
    apiClient.cleanupCache();
}, 60000); // Every minute