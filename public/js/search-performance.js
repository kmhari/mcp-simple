// Search Performance Module
// Handles debounced search, cancellation, and loading states

class SearchPerformanceManager {
    constructor() {
        this.debounceTimer = null;
        this.isSearching = false;
        this.searchAbortController = null;
        this.searchInput = null;
        this.loadingIndicator = null;
        this.searchHistory = new Map(); // LRU cache for recent searches
        this.maxHistorySize = 50;
        
        // Performance metrics
        this.searchMetrics = {
            totalSearches: 0,
            averageSearchTime: 0,
            cacheHits: 0,
            cacheMisses: 0
        };
        
        // Configuration
        this.config = {
            debounceDelay: 300,
            loadingThreshold: 100,
            cancelPreviousSearch: true
        };
        
        this.init();
    }
    
    init() {
        // Initialize DOM elements
        this.searchInput = document.getElementById('searchInput');
        this.loadingIndicator = document.getElementById('searchLoadingIndicator');
        
        if (!this.searchInput) {
            console.warn('Search input element not found');
            return;
        }
        
        // Add event listeners
        this.searchInput.addEventListener('input', this.handleSearchInput.bind(this));
        this.searchInput.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Clear search on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.searchInput === document.activeElement) {
                this.clearSearch();
            }
        });
        
        console.log('Search performance manager initialized');
    }
    
    handleSearchInput(event) {
        const searchTerm = event.target.value.trim();
        
        // Cancel any pending search
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
        }
        
        // Cancel ongoing search if configured
        if (this.config.cancelPreviousSearch && this.searchAbortController) {
            this.searchAbortController.abort();
        }
        
        // Debounce the search
        this.debounceTimer = setTimeout(() => {
            this.performSearch(searchTerm);
        }, this.config.debounceDelay);
    }
    
    handleKeydown(event) {
        // Handle Enter key for immediate search
        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }
            this.performSearch(this.searchInput.value.trim());
        }
    }
    
    async performSearch(searchTerm) {
        const startTime = performance.now();
        
        // Check cache first
        const cacheKey = this.buildCacheKey(searchTerm);
        if (this.searchHistory.has(cacheKey)) {
            const cachedResult = this.searchHistory.get(cacheKey);
            this.searchMetrics.cacheHits++;
            this.applySearchResults(cachedResult);
            this.updatePerformanceMetrics(startTime);
            return;
        }
        
        this.searchMetrics.cacheMisses++;
        
        // Create abort controller for cancellation
        this.searchAbortController = new AbortController();
        
        try {
            // Show loading indicator if search takes longer than threshold
            const loadingTimer = setTimeout(() => {
                this.showLoading();
            }, this.config.loadingThreshold);
            
            this.isSearching = true;
            
            // Perform the actual search
            const results = await this.executeSearch(searchTerm, this.searchAbortController.signal);
            
            // Clear loading timer
            clearTimeout(loadingTimer);
            
            // Cache the results
            this.cacheSearchResults(cacheKey, results);
            
            // Apply results
            this.applySearchResults(results);
            
            this.updatePerformanceMetrics(startTime);
            
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Search cancelled');
            } else {
                console.error('Search error:', error);
            }
        } finally {
            this.isSearching = false;
            this.hideLoading();
            this.searchAbortController = null;
        }
    }
    
    async executeSearch(searchTerm, signal) {
        // This will call the search function (optimized or legacy)
        return new Promise(async (resolve, reject) => {
            // Check if request was cancelled
            if (signal.aborted) {
                reject(new DOMException('Search cancelled', 'AbortError'));
                return;
            }
            
            try {
                // Call the search function (optimized UI has async searchServers)
                if (typeof window.searchServers === 'function') {
                    const result = window.searchServers(searchTerm);
                    // Handle both async and sync versions
                    if (result && typeof result.then === 'function') {
                        await result;
                    }
                    resolve({ searchTerm, timestamp: Date.now() });
                } else {
                    reject(new Error('Search function not available'));
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    
    buildCacheKey(searchTerm) {
        // Include current filter state in cache key
        const sortBy = document.getElementById('sortBySelect')?.value || 'a-z';
        const groupBy = document.getElementById('groupBySelect')?.value || 'none';
        const starsFilter = document.getElementById('starsFilterSelect')?.value || '0';
        
        return `${searchTerm.toLowerCase()}|${sortBy}|${groupBy}|${starsFilter}`;
    }
    
    cacheSearchResults(cacheKey, results) {
        // Implement LRU cache behavior
        if (this.searchHistory.size >= this.maxHistorySize) {
            const firstKey = this.searchHistory.keys().next().value;
            this.searchHistory.delete(firstKey);
        }
        
        this.searchHistory.set(cacheKey, results);
    }
    
    applySearchResults(results) {
        // Results are already applied by the searchServers function
        // This method can be extended for future result processing
        console.log('Search results applied:', results);
    }
    
    showLoading() {
        if (this.loadingIndicator) {
            this.loadingIndicator.style.display = 'block';
        }
    }
    
    hideLoading() {
        if (this.loadingIndicator) {
            this.loadingIndicator.style.display = 'none';
        }
    }
    
    clearSearch() {
        if (this.searchInput) {
            this.searchInput.value = '';
            this.performSearch('');
        }
    }
    
    updatePerformanceMetrics(startTime) {
        const searchTime = performance.now() - startTime;
        this.searchMetrics.totalSearches++;
        
        // Calculate rolling average
        const currentAvg = this.searchMetrics.averageSearchTime;
        const totalSearches = this.searchMetrics.totalSearches;
        this.searchMetrics.averageSearchTime = 
            (currentAvg * (totalSearches - 1) + searchTime) / totalSearches;
    }
    
    getPerformanceMetrics() {
        return {
            ...this.searchMetrics,
            cacheHitRate: this.searchMetrics.cacheHits / 
                (this.searchMetrics.cacheHits + this.searchMetrics.cacheMisses),
            cacheSize: this.searchHistory.size
        };
    }
    
    clearCache() {
        this.searchHistory.clear();
        this.searchMetrics.cacheHits = 0;
        this.searchMetrics.cacheMisses = 0;
    }
    
    // Method to be called when filters change to invalidate cache
    invalidateCache() {
        this.searchHistory.clear();
        console.log('Search cache invalidated');
    }
}

// Initialize the search performance manager when DOM is loaded
let searchPerformanceManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        searchPerformanceManager = new SearchPerformanceManager();
        window.searchPerformanceManager = searchPerformanceManager;
    });
} else {
    searchPerformanceManager = new SearchPerformanceManager();
    window.searchPerformanceManager = searchPerformanceManager;
}

export { SearchPerformanceManager };