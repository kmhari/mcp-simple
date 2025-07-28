// Search Index Module
// High-performance indexed search with tokenization and prefix matching

class SearchIndex {
    constructor() {
        this.tokenIndex = new Map(); // token -> Set of server IDs
        this.serverData = new Map(); // server ID -> server object
        this.tokenToServers = new Map(); // token -> Set of server IDs
        this.prefixIndex = new Map(); // prefix -> Set of tokens
        this.isBuilt = false;
        
        // Configuration
        this.config = {
            minTokenLength: 2,
            maxTokenLength: 50,
            stopWords: new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must']),
            searchableFields: ['name', 'description', 'category', 'package']
        };
    }
    
    /**
     * Build the search index from server data
     * @param {Object} servers - Server data object
     */
    buildIndex(servers) {
        console.time('SearchIndex.buildIndex');
        
        // Clear existing index
        this.tokenIndex.clear();
        this.serverData.clear();
        this.tokenToServers.clear();
        this.prefixIndex.clear();
        
        // Process each server
        Object.entries(servers).forEach(([serverId, server]) => {
            this.serverData.set(serverId, server);
            this.indexServer(serverId, server);
        });
        
        // Build prefix index for fast partial matching
        this.buildPrefixIndex();
        
        this.isBuilt = true;
        console.timeEnd('SearchIndex.buildIndex');
        console.log(`Search index built: ${this.tokenIndex.size} tokens, ${this.serverData.size} servers`);
    }
    
    /**
     * Index a single server
     * @param {string} serverId - Server ID
     * @param {Object} server - Server object
     */
    indexServer(serverId, server) {
        const tokens = new Set();
        
        // Extract tokens from searchable fields
        this.config.searchableFields.forEach(field => {
            const value = server[field];
            if (value) {
                const fieldTokens = this.tokenize(value);
                fieldTokens.forEach(token => tokens.add(token));
            }
        });
        
        // Add tokens to index
        tokens.forEach(token => {
            if (!this.tokenIndex.has(token)) {
                this.tokenIndex.set(token, new Set());
            }
            this.tokenIndex.get(token).add(serverId);
        });
    }
    
    /**
     * Tokenize text into searchable tokens
     * @param {string} text - Text to tokenize
     * @returns {Array} Array of tokens
     */
    tokenize(text) {
        if (!text || typeof text !== 'string') return [];
        
        const tokens = [];
        const normalizedText = text.toLowerCase();
        
        // Split by non-word characters and filter
        const words = normalizedText.match(/\b\w+\b/g) || [];
        
        words.forEach(word => {
            // Skip if too short/long or is stop word
            if (word.length < this.config.minTokenLength || 
                word.length > this.config.maxTokenLength || 
                this.config.stopWords.has(word)) {
                return;
            }
            
            tokens.push(word);
            
            // Add partial tokens for better partial matching
            if (word.length > 3) {
                for (let i = this.config.minTokenLength; i < word.length; i++) {
                    tokens.push(word.substring(0, i));
                }
            }
        });
        
        return tokens;
    }
    
    /**
     * Build prefix index for fast prefix matching
     */
    buildPrefixIndex() {
        this.tokenIndex.forEach((serverIds, token) => {
            // Add prefixes for tokens longer than min length
            for (let i = this.config.minTokenLength; i <= token.length; i++) {
                const prefix = token.substring(0, i);
                if (!this.prefixIndex.has(prefix)) {
                    this.prefixIndex.set(prefix, new Set());
                }
                this.prefixIndex.get(prefix).add(token);
            }
        });
    }
    
    /**
     * Search for servers matching the query
     * @param {string} query - Search query
     * @returns {Set} Set of matching server IDs
     */
    search(query) {
        if (!this.isBuilt) {
            console.warn('Search index not built');
            return new Set();
        }
        
        if (!query || typeof query !== 'string') {
            return new Set(this.serverData.keys());
        }
        
        const queryTokens = this.tokenize(query);
        if (queryTokens.length === 0) {
            return new Set(this.serverData.keys());
        }
        
        // Find matching servers for each token
        const tokenResults = queryTokens.map(token => this.searchToken(token));
        
        // For multiple tokens, find intersection (AND logic)
        if (tokenResults.length === 1) {
            return tokenResults[0];
        }
        
        // Find servers that match ALL tokens
        const result = new Set();
        const firstResult = tokenResults[0];
        
        firstResult.forEach(serverId => {
            const matchesAll = tokenResults.every(tokenResult => 
                tokenResult.has(serverId)
            );
            if (matchesAll) {
                result.add(serverId);
            }
        });
        
        return result;
    }
    
    /**
     * Search for a single token
     * @param {string} token - Token to search for
     * @returns {Set} Set of matching server IDs
     */
    searchToken(token) {
        const results = new Set();
        
        // Exact match
        if (this.tokenIndex.has(token)) {
            this.tokenIndex.get(token).forEach(serverId => results.add(serverId));
        }
        
        // Prefix match if no exact match or for very short tokens
        if (results.size === 0 || token.length <= 3) {
            const matchingTokens = this.prefixIndex.get(token) || new Set();
            matchingTokens.forEach(matchingToken => {
                if (this.tokenIndex.has(matchingToken)) {
                    this.tokenIndex.get(matchingToken).forEach(serverId => 
                        results.add(serverId)
                    );
                }
            });
        }
        
        return results;
    }
    
    /**
     * Get server objects from IDs
     * @param {Set} serverIds - Set of server IDs
     * @returns {Object} Object with server data
     */
    getServersByIds(serverIds) {
        const result = {};
        serverIds.forEach(serverId => {
            if (this.serverData.has(serverId)) {
                result[serverId] = this.serverData.get(serverId);
            }
        });
        return result;
    }
    
    /**
     * Update index when server data changes
     * @param {string} serverId - Server ID
     * @param {Object} server - Updated server object
     */
    updateServer(serverId, server) {
        if (!this.isBuilt) return;
        
        // Remove old entries
        this.removeServer(serverId);
        
        // Add new entries
        this.serverData.set(serverId, server);
        this.indexServer(serverId, server);
    }
    
    /**
     * Remove server from index
     * @param {string} serverId - Server ID to remove
     */
    removeServer(serverId) {
        if (!this.isBuilt) return;
        
        // Remove from token index
        this.tokenIndex.forEach((serverIds, token) => {
            serverIds.delete(serverId);
            if (serverIds.size === 0) {
                this.tokenIndex.delete(token);
            }
        });
        
        // Remove from server data
        this.serverData.delete(serverId);
    }
    
    /**
     * Get search statistics
     * @returns {Object} Statistics object
     */
    getStats() {
        return {
            totalServers: this.serverData.size,
            totalTokens: this.tokenIndex.size,
            totalPrefixes: this.prefixIndex.size,
            averageTokensPerServer: this.tokenIndex.size / Math.max(1, this.serverData.size),
            indexBuilt: this.isBuilt
        };
    }
    
    /**
     * Clear the entire index
     */
    clear() {
        this.tokenIndex.clear();
        this.serverData.clear();
        this.tokenToServers.clear();
        this.prefixIndex.clear();
        this.isBuilt = false;
    }
}

// Create global search index instance
const searchIndex = new SearchIndex();
window.searchIndex = searchIndex;

export { SearchIndex, searchIndex };