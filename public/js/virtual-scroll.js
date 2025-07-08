// Virtual scrolling module using HyperList for performance optimization
import { createServerCard } from './ui.js';

// Global HyperList instance
let hyperListInstance = null;
let virtualContainer = null;
let virtualItems = [];

// Configuration
const VIRTUAL_CONFIG = {
    headerHeight: 60,
    cardBaseHeight: 180,
    cardPadding: 20,
    buffer: 5, // Extra items to render outside viewport
};

/**
 * Initialize HyperList virtual scrolling
 * @param {HTMLElement} container - Container element for the virtual list
 */
export function initVirtualScrolling(container) {
    virtualContainer = container;
    
    // Create HyperList wrapper container
    const hyperListContainer = document.createElement('div');
    hyperListContainer.id = 'hyperlist-container';
    hyperListContainer.style.height = '600px'; // Fixed height for virtual scrolling
    hyperListContainer.style.overflow = 'auto';
    
    container.innerHTML = '';
    container.appendChild(hyperListContainer);
    
    // Initialize HyperList instance (will be configured when data is available)
    return hyperListContainer;
}

/**
 * Build virtual items array from server data based on grouping and expanded states
 * @param {Object} servers - Server data object
 * @param {string} groupBy - Grouping mode ('category', 'stars', or 'none')
 * @param {Array} expandedCategories - List of expanded category IDs
 * @returns {Array} Flattened array of virtual items
 */
export function buildVirtualItems(servers, groupBy, expandedCategories = []) {
    const items = [];
    
    if (groupBy === 'category') {
        const categories = {};
        
        // Group servers by category
        Object.entries(servers).forEach(([key, server]) => {
            const category = server.category || 'Other';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push({ key, server });
        });
        
        const sortedCategories = Object.keys(categories).sort();
        
        sortedCategories.forEach(category => {
            // Add header item
            items.push({
                type: 'HEADER',
                categoryId: category,
                category,
                count: categories[category].length,
                expanded: expandedCategories.includes(category)
            });
            
            // Add server cards if category is expanded
            if (expandedCategories.includes(category)) {
                categories[category].forEach(({ key, server }) => {
                    items.push({
                        type: 'CARD',
                        key,
                        server,
                        categoryId: category
                    });
                });
            }
        });
        
    } else if (groupBy === 'stars') {
        const starRanges = [
            { min: 10000, max: Infinity, label: '10,000+ stars', color: '#FFD700' },
            { min: 5000, max: 9999, label: '5,000-9,999 stars', color: '#FFA500' },
            { min: 1000, max: 4999, label: '1,000-4,999 stars', color: '#FF6347' },
            { min: 100, max: 999, label: '100-999 stars', color: '#32CD32' },
            { min: 10, max: 99, label: '10-99 stars', color: '#87CEEB' },
            { min: 1, max: 9, label: '1-9 stars', color: '#DDA0DD' },
            { min: 0, max: 0, label: 'No stars data', color: '#D3D3D3' }
        ];
        
        const serversArray = Object.entries(servers).map(([key, server]) => ({
            key,
            server,
            stars: server.stars || 0
        }));
        
        serversArray.sort((a, b) => b.stars - a.stars);
        
        starRanges.forEach(range => {
            const rangeServers = serversArray.filter(({ stars }) => 
                stars >= range.min && stars <= range.max
            );
            
            if (rangeServers.length > 0) {
                const categoryId = `stars-${range.min}-${range.max}`;
                
                // Add header item
                items.push({
                    type: 'HEADER',
                    categoryId,
                    category: range.label,
                    count: rangeServers.length,
                    color: range.color,
                    expanded: expandedCategories.includes(categoryId)
                });
                
                // Add server cards if category is expanded
                if (expandedCategories.includes(categoryId)) {
                    rangeServers.forEach(({ key, server }) => {
                        items.push({
                            type: 'CARD',
                            key,
                            server,
                            categoryId
                        });
                    });
                }
            }
        });
        
    } else {
        // Flat display - no grouping
        const serversArray = Object.entries(servers).map(([key, server]) => ({ key, server }));
        serversArray.sort((a, b) => a.server.name.localeCompare(b.server.name));
        
        serversArray.forEach(({ key, server }) => {
            items.push({
                type: 'CARD',
                key,
                server
            });
        });
    }
    
    return items;
}

/**
 * Estimate height for a virtual item
 * @param {Object} item - Virtual item object
 * @returns {number} Estimated height in pixels
 */
export function estimateItemHeight(item) {
    if (item.type === 'HEADER') {
        return VIRTUAL_CONFIG.headerHeight;
    } else if (item.type === 'CARD') {
        // Base height + estimated text content height
        const descriptionLength = item.server.description ? item.server.description.length : 0;
        const estimatedTextHeight = Math.ceil(descriptionLength / 60) * 20; // ~60 chars per line, 20px line height
        return VIRTUAL_CONFIG.cardBaseHeight + estimatedTextHeight + VIRTUAL_CONFIG.cardPadding;
    }
    return 100; // Fallback height
}

/**
 * Render function for HyperList - creates DOM element for each virtual item
 * @param {number} index - Index of the item in virtual items array
 * @returns {HTMLElement} DOM element to render
 */
export function renderVirtualItem(index) {
    const item = virtualItems[index];
    
    if (!item) {
        // Create placeholder for invalid items
        const placeholder = document.createElement('div');
        placeholder.style.height = '50px';
        placeholder.style.background = '#f0f0f0';
        placeholder.textContent = 'Loading...';
        return placeholder;
    }
    
    if (item.type === 'HEADER') {
        return createHeaderElement(item);
    } else if (item.type === 'CARD') {
        return createCardElement(item);
    }
    
    // Fallback
    const fallback = document.createElement('div');
    fallback.textContent = 'Unknown item type';
    return fallback;
}

/**
 * Create header element for category accordion
 * @param {Object} item - Header virtual item
 * @returns {HTMLElement} Header DOM element
 */
function createHeaderElement(item) {
    const header = document.createElement('div');
    header.className = `category-section ${item.expanded ? '' : 'collapsed'}`;
    header.setAttribute('data-category', item.categoryId);
    
    const headerStyle = item.color ? `color: ${item.color};` : '';
    const starIcon = item.color ? '⭐ ' : '';
    
    header.innerHTML = `
        <h2 class="category-title accordion-header" style="${headerStyle}" onclick="window.toggleCategory('${item.categoryId}')">
            <span class="accordion-icon">${item.expanded ? '▼' : '▶'}</span>
            ${starIcon}${item.category} 
            <span class="category-count">(${item.count})</span>
        </h2>
    `;
    
    return header;
}

/**
 * Create card element for server
 * @param {Object} item - Card virtual item
 * @returns {HTMLElement} Card DOM element
 */
function createCardElement(item) {
    // Use existing createServerCard function but wrap it in a container
    const container = document.createElement('div');
    container.className = 'virtual-card-container';
    container.style.padding = '10px';
    
    const card = createServerCard(item.key, item.server);
    container.appendChild(card);
    
    return container;
}

/**
 * Update virtual list with new data
 * @param {Object} servers - Server data
 * @param {string} groupBy - Grouping mode
 * @param {Array} expandedCategories - Expanded category IDs
 */
export function updateVirtualList(servers, groupBy, expandedCategories = []) {
    virtualItems = buildVirtualItems(servers, groupBy, expandedCategories);
    
    if (!virtualContainer) {
        console.warn('Virtual container not initialized');
        return;
    }
    
    const hyperListContainer = virtualContainer.querySelector('#hyperlist-container');
    if (!hyperListContainer) {
        console.warn('HyperList container not found');
        return;
    }
    
    // Destroy existing HyperList instance
    if (hyperListInstance) {
        hyperListInstance.destroy();
    }
    
    // Create new HyperList instance
    if (virtualItems.length > 0) {
        hyperListInstance = new HyperList(hyperListContainer, {
            itemCount: virtualItems.length,
            itemHeight: estimateItemHeight,
            generate: renderVirtualItem,
            afterRender: () => {
                // Callback after rendering - can be used for additional setup
                console.log(`Virtual list rendered ${virtualItems.length} items`);
            }
        });
    } else {
        // Show empty state
        hyperListContainer.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">No servers found.</div>';
    }
}

/**
 * Refresh virtual list (rebuild and re-render)
 */
export function refreshVirtualList() {
    if (hyperListInstance) {
        hyperListInstance.refresh();
    }
}

/**
 * Get current virtual items (for debugging/testing)
 * @returns {Array} Current virtual items array
 */
export function getVirtualItems() {
    return virtualItems;
}

/**
 * Check if virtual scrolling is active
 * @returns {boolean} True if virtual scrolling is initialized
 */
export function isVirtualScrollingActive() {
    return hyperListInstance !== null;
}