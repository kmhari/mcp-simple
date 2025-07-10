// UI rendering and display functions
import { 
    currentConfig, 
    preConfiguredServers, 
    starsData, 
    currentGroupBy,
    setCurrentGroupBy,
    currentSortBy,
    setCurrentSortBy,
    currentStarsFilter,
    setCurrentStarsFilter
} from './state.js';
import { isServerInstalled } from './utils.js';
import { 
    initVirtualScrolling, 
    updateVirtualList, 
    refreshVirtualList, 
    isVirtualScrollingActive 
} from './virtual-scroll.js';

export function handleGroupByChange(value) {
    setCurrentGroupBy(value);
    const searchValue = document.querySelector('.search-box').value;
    searchServers(searchValue);
}

export function handleSortByChange(value) {
    setCurrentSortBy(value);
    const searchValue = document.querySelector('.search-box').value;
    searchServers(searchValue);
}

export function handleStarsFilterChange(value) {
    setCurrentStarsFilter(parseInt(value));
    const searchValue = document.querySelector('.search-box').value;
    searchServers(searchValue);
    updateFilterIndicator(parseInt(value));
}

export function displayServers(servers = preConfiguredServers) {
    const grid = document.getElementById('serverGrid');
    
    // Try virtual scrolling for better performance
    try {
        // Check if we should use virtual scrolling (when there are many servers)
        const serverCount = Object.keys(servers).length;
        const useVirtualScrolling = serverCount > 50; // Use virtual scrolling for 50+ servers
        
        if (useVirtualScrolling && typeof window.HyperList !== 'undefined') {
            // Get current expanded categories from localStorage
            const expandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '[]');
            
            // Initialize virtual scrolling if not already done
            if (!isVirtualScrollingActive()) {
                initVirtualScrolling(grid);
            }
            
            // Update virtual list with current data
            updateVirtualList(servers, currentGroupBy, expandedCategories);
            return; // Exit early - virtual scrolling handles everything
        }
    } catch (error) {
        console.warn('Virtual scrolling failed, falling back to regular rendering:', error);
    }
    
    // Fallback to original rendering method
    grid.innerHTML = '';
    
    if (currentGroupBy === 'category') {
        displayServersByCategory(servers, grid);
    } else {
        displayServersFlat(servers, grid);
    }
    
    // Restore expanded states after rendering
    setTimeout(() => {
        restoreExpandedStates();
        cleanupAnimations();
    }, 100);
}

export function displayServersFlat(servers, grid) {
    const container = document.createElement('div');
    container.className = 'category-grid';
    container.style.marginTop = '0';
    
    // Servers are already sorted in getFilteredServers, so maintain that order
    const serversArray = Object.entries(servers).map(([key, server]) => ({ key, server }));

    serversArray.forEach(({ key, server }) => {
        const card = createServerCard(key, server);
        container.appendChild(card);
    });
    
    grid.appendChild(container);
}

export function displayServersByCategory(servers, grid) {
    const categories = {};
    
    // Group servers into categories while preserving the sorted order
    const serversArray = Object.entries(servers).map(([key, server]) => ({ key, server }));
    
    serversArray.forEach(({ key, server }) => {
        const category = server.category || 'Other';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push({ key, server });
    });
    
    // Sort category names, but keep servers within each category in their sorted order
    const sortedCategories = Object.keys(categories).sort();
    
    sortedCategories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section collapsed';
        categorySection.setAttribute('data-category', category);
        categorySection.innerHTML = `
            <h2 class="category-title accordion-header" onclick="toggleCategory('${category}')">
                <span class="accordion-icon">▶</span>
                ${category} 
                <span class="category-count">(${categories[category].length})</span>
            </h2>
            <div class="category-grid accordion-content" data-category="${category}" style="display: none;">
        `;
        
        // Servers within each category maintain the sort order from getFilteredServers
        categories[category].forEach(({ key, server }) => {
            const card = createServerCard(key, server);
            categorySection.querySelector('.category-grid').appendChild(card);
        });
        
        categorySection.innerHTML += '</div>';
        grid.appendChild(categorySection);
    });
}


export function createServerCard(key, server) {
    const card = document.createElement('div');
    card.className = 'server-card';
    
    const isInstalled = isServerInstalled(key, server);
    const requiresConfig = server.requiredEnvVars && server.requiredEnvVars.length > 0;
    
    if (isInstalled) {
        card.setAttribute('data-selected', '');
    }
    
    const formatStars = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return count.toString();
    };
    
    const starSvg = '<svg class="star-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
    
    // Get stars count from server object (now stored directly in database)
    const starsCount = server.stars || 0;
    const starsDisplay = starsCount > 0
        ? `<div class="stars-info" title="GitHub Stars: ${starsCount.toLocaleString()}">${starSvg} ${formatStars(starsCount)}</div>`
        : '';
    
    // Add last update info if available
    const lastUpdate = server.lastStarUpdate || server.updated_at;
    const lastUpdateDisplay = lastUpdate && starsCount > 0
        ? `<div class="stars-update" title="Last updated: ${new Date(lastUpdate).toLocaleDateString()}">Updated ${getTimeAgo(lastUpdate)}</div>`
        : '';
    
    function getTimeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'today';
        if (diffDays === 1) return 'yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }

    const logoDisplay = server.logo && server.logo.trim() !== '' 
        ? `<div class="server-logo">
               <img src="${server.logo}" alt="${server.name} logo" loading="lazy" onerror="this.style.display='none';">
           </div>` 
        : '<div class="server-logo-placeholder"></div>';

    card.innerHTML = `
        <div>
            <div class="card-header">
                ${logoDisplay}
                <div class="card-header-content">
                    <h3>${server.githubLink ? `<a href="${server.githubLink}" target="_blank" rel="noopener noreferrer">${server.name}</a>` : server.name}</h3>
                    <div class="stars-container">
                        ${starsDisplay}
                        ${lastUpdateDisplay}
                    </div>
                </div>
            </div>
            <p class="description">${server.description} <span class="view-more-link" onclick="showReadme('${key}')" title="View README">View more</span></p>
        </div>
        <div class="card-footer">
            <div class="button-container">
                ${isInstalled ? 
                    `<button class="btn-configure" onclick="configureServer('${key}')">Reconfigure</button>
                     <button class="btn-uninstall" onclick="uninstallServer('${key}')">Remove</button>` :
                    `<button class="btn-configure" onclick="configureServer('${key}')">Configure</button>
                     ${!requiresConfig ? 
                        `<button onclick="quickInstallServer('${key}')">Install</button>` : ''
                     }`
                }
            </div>
            <div class="status-indicator ${isInstalled ? 'installed' : ''}"></div>
        </div>
    `;
    
    if (!requiresConfig) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                if (isInstalled) {
                    window.uninstallServer(key, true);
                } else {
                    window.quickInstallServer(key);
                }
            }
        });
    }
    
    
    return card;
}

function cleanupAnimations() {
    setTimeout(() => {
        const cards = document.querySelectorAll('.server-card');
        cards.forEach(card => {
            card.classList.remove('installing', 'uninstalling');
            const indicator = card.querySelector('.status-indicator');
            if (indicator) {
                indicator.classList.remove('installing', 'uninstalling');
            }
        });
    }, 100);
}

export function updateCurrentServers() {
    const list = document.getElementById('currentServerList');
    list.innerHTML = '';
    
    if (Object.keys(currentConfig.mcpServers).length === 0) {
        list.innerHTML = '<li class="server-item">No servers configured</li>';
        return;
    }
    
    Object.entries(currentConfig.mcpServers).forEach(([name, config]) => {
        const item = document.createElement('li');
        item.className = 'server-item';
        item.innerHTML = `
            <div class="server-info">
                <h4>${name}</h4>
                <div class="details">
                    Command: ${config.command} ${config.args.join(' ')}
                    ${config.env ? '<br>Env: ' + JSON.stringify(config.env) : ''}
                </div>
            </div>
            <div class="server-actions">
                <button class="btn-edit" onclick="editServer('${name}')">Edit</button>
                <button class="btn-remove" onclick="removeServer('${name}')">Remove</button>
            </div>
        `;
        list.appendChild(item);
    });
}

export function toggleCategory(categoryId) {
    // Update localStorage state first
    const expanded = JSON.parse(localStorage.getItem('expandedCategories') || '[]');
    const isCurrentlyExpanded = expanded.includes(categoryId);
    
    if (isCurrentlyExpanded) {
        removeExpandedCategory(categoryId);
    } else {
        saveExpandedCategory(categoryId);
    }
    
    // If virtual scrolling is active, refresh the virtual list
    if (isVirtualScrollingActive()) {
        // Get current servers (might be filtered)
        const searchValue = document.querySelector('.search-box').value;
        const filtered = getFilteredServers(searchValue);
        const newExpandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '[]');
        
        // Update virtual list with new expanded state
        updateVirtualList(filtered, currentGroupBy, newExpandedCategories);
        return;
    }
    
    // Fallback to original DOM manipulation for non-virtual scrolling
    const categorySection = document.querySelector(`.category-section[data-category="${categoryId}"]`) || 
                           document.querySelector(`.accordion-content[data-category="${categoryId}"]`)?.parentElement;
    
    if (!categorySection) return;
    
    const content = categorySection.querySelector('.accordion-content');
    const icon = categorySection.querySelector('.accordion-icon');
    
    if (!content || !icon) return;
    
    const isCollapsed = content.style.display === 'none';
    
    if (isCollapsed) {
        content.style.display = 'grid';
        icon.textContent = '▼';
        categorySection.classList.remove('collapsed');
    } else {
        content.style.display = 'none';
        icon.textContent = '▶';
        categorySection.classList.add('collapsed');
    }
}

function saveExpandedCategory(categoryId) {
    try {
        const expanded = JSON.parse(localStorage.getItem('expandedCategories') || '[]');
        if (!expanded.includes(categoryId)) {
            expanded.push(categoryId);
            localStorage.setItem('expandedCategories', JSON.stringify(expanded));
        }
    } catch (error) {
        console.warn('Failed to save expanded state:', error);
    }
}

function removeExpandedCategory(categoryId) {
    try {
        const expanded = JSON.parse(localStorage.getItem('expandedCategories') || '[]');
        const updated = expanded.filter(id => id !== categoryId);
        localStorage.setItem('expandedCategories', JSON.stringify(updated));
    } catch (error) {
        console.warn('Failed to remove expanded state:', error);
    }
}

export function restoreExpandedStates() {
    try {
        const expanded = JSON.parse(localStorage.getItem('expandedCategories') || '[]');
        expanded.forEach(categoryId => {
            const categorySection = document.querySelector(`.category-section[data-category="${categoryId}"]`) || 
                                   document.querySelector(`.accordion-content[data-category="${categoryId}"]`)?.parentElement;
            
            if (categorySection) {
                const content = categorySection.querySelector('.accordion-content');
                const icon = categorySection.querySelector('.accordion-icon');
                
                if (content && icon) {
                    content.style.display = 'grid';
                    icon.textContent = '▼';
                    categorySection.classList.remove('collapsed');
                }
            }
        });
    } catch (error) {
        console.warn('Failed to restore expanded states:', error);
    }
}

/**
 * Helper function to filter servers based on search query and stars filter
 * @param {string} query - Search query string
 * @returns {Object} Filtered servers object
 */
function getFilteredServers(query) {
    const searchTerm = query ? query.toLowerCase() : '';
    
    // First, filter servers based on search and stars criteria
    const filteredEntries = Object.entries(preConfiguredServers).filter(([key, server]) => {
        // Apply search filter
        const matchesSearch = !query || 
            (server.name && server.name.toLowerCase().includes(searchTerm)) ||
            (server.description && server.description.toLowerCase().includes(searchTerm)) ||
            (server.category && server.category.toLowerCase().includes(searchTerm)) ||
            (server.package && server.package.toLowerCase().includes(searchTerm));
        
        // Apply stars filter
        const serverStars = server.stars || 0;
        const matchesStarsFilter = serverStars >= currentStarsFilter;
        
        return matchesSearch && matchesStarsFilter;
    });
    
    // Sort the filtered entries based on currentSortBy
    filteredEntries.sort(([keyA, serverA], [keyB, serverB]) => {
        switch (currentSortBy) {
            case 'a-z':
                return (serverA.name || '').localeCompare(serverB.name || '');
            case 'z-a':
                return (serverB.name || '').localeCompare(serverA.name || '');
            case 'stars':
                const starsA = serverA.stars || 0;
                const starsB = serverB.stars || 0;
                return starsB - starsA; // Descending order (most stars first)
            default:
                return (serverA.name || '').localeCompare(serverB.name || ''); // Default to a-z
        }
    });
    
    // Convert back to object format
    const filtered = {};
    filteredEntries.forEach(([key, server]) => {
        filtered[key] = server;
    });
    
    return filtered;
}

export function searchServers(query) {
    window.clearSelection();
    
    const filtered = getFilteredServers(query);
    displayServers(filtered);
    
    if (Object.keys(filtered).length === 0) {
        const grid = document.getElementById('serverGrid');
        const searchText = query ? ` matching "${query}"` : '';
        const starsText = currentStarsFilter > 0 ? ` with ${currentStarsFilter}+ stars` : '';
        
        // Handle empty state for both virtual and regular rendering
        if (isVirtualScrollingActive()) {
            const hyperListContainer = grid.querySelector('#hyperlist-container');
            if (hyperListContainer) {
                hyperListContainer.innerHTML = `<div style="text-align: center; padding: 40px; color: #666;">No servers found${searchText}${starsText}.</div>`;
            }
        } else {
            grid.innerHTML = `<div style="text-align: center; padding: 40px; color: #666;">No servers found${searchText}${starsText}.</div>`;
        }
    }
}

// Update the visual indicator for active star filter
export function updateFilterIndicator(starsValue) {
    const indicator = document.getElementById('activeFilterIndicator');
    const filterText = document.getElementById('activeFilterText');
    
    if (starsValue > 0) {
        const text = starsValue >= 1000 ? `${starsValue/1000}k+ stars` : `${starsValue}+ stars`;
        filterText.textContent = text;
        indicator.style.display = 'flex';
    } else {
        indicator.style.display = 'none';
    }
}

// Reset the stars filter to show all servers
export function resetStarsFilter() {
    setCurrentStarsFilter(0);
    document.getElementById('starsFilterSelect').value = '0';
    updateFilterIndicator(0);
    const searchValue = document.querySelector('.search-box').value;
    searchServers(searchValue);
}