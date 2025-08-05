// Optimized UI functions using backend APIs
import { apiClient } from './api-client.js';
import { 
    currentConfig, 
    currentGroupBy,
    setCurrentGroupBy,
    currentSortBy,
    setCurrentSortBy,
    currentStarsFilter,
    setCurrentStarsFilter
} from './state.js';
import { isServerInstalled } from './utils.js';

// Pagination state
let currentPage = 1;
let currentLimit = 50;
let totalPages = 1;
let isLoading = false;

// Current search and filter state
let currentSearchQuery = '';
let currentCategory = '';

export function handleGroupByChange(value) {
    setCurrentGroupBy(value);
    currentPage = 1; // Reset to first page
    loadAndDisplayServers();
}

export function handleSortByChange(value) {
    setCurrentSortBy(value);
    currentPage = 1; // Reset to first page
    loadAndDisplayServers();
}

export function handleStarsFilterChange(value) {
    setCurrentStarsFilter(parseInt(value));
    currentPage = 1; // Reset to first page
    loadAndDisplayServers();
    updateFilterIndicator(parseInt(value));
}

export function handleCategoryFilterChange(value) {
    currentCategory = value;
    currentPage = 1; // Reset to first page
    loadAndDisplayServers();
}

export async function searchServers(query) {
    window.clearSelection?.();
    
    currentSearchQuery = query;
    currentPage = 1; // Reset to first page
    await loadAndDisplayServers();
}

export async function loadAndDisplayServers() {
    if (isLoading) return;
    
    isLoading = true;
    showLoadingState();

    try {
        const params = {
            page: currentPage,
            limit: currentLimit,
            search: currentSearchQuery,
            sortBy: currentSortBy,
            sortOrder: 'asc', // Could be made configurable
            category: currentCategory,
            minStars: currentStarsFilter,
            maxStars: 999999
        };

        const result = await apiClient.getPaginatedServers(params);
        
        totalPages = result.pagination.totalPages;
        displayServers(result.servers);
        updatePaginationControls(result.pagination);
        
        if (Object.keys(result.servers).length === 0) {
            showNoResultsState();
        }
        
    } catch (error) {
        console.error('Error loading servers:', error);
        showErrorState(error.message);
    } finally {
        isLoading = false;
        hideLoadingState();
    }
}

export function displayServers(servers) {
    const grid = document.getElementById('serverGrid');
    grid.innerHTML = '';
    
    if (currentGroupBy === 'category') {
        displayServersByCategory(servers, grid);
    } else {
        displayServersFlat(servers, grid);
    }
    
    // Restore expanded states after rendering
    setTimeout(() => {
        if (typeof restoreExpandedStates === 'function') {
            restoreExpandedStates();
        }
        if (typeof cleanupAnimations === 'function') {
            cleanupAnimations();
        }
    }, 100);
}

export function displayServersFlat(servers, grid) {
    const container = document.createElement('div');
    container.className = 'category-grid';
    container.style.marginTop = '0';
    
    const serversArray = Object.entries(servers).map(([key, server]) => ({ key, server }));

    serversArray.forEach(({ key, server }) => {
        const card = createServerCard(key, server);
        container.appendChild(card);
    });
    
    grid.appendChild(container);
}

export function displayServersByCategory(servers, grid) {
    const categories = {};
    
    const serversArray = Object.entries(servers).map(([key, server]) => ({ key, server }));
    
    serversArray.forEach(({ key, server }) => {
        const category = server.category || 'Other';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push({ key, server });
    });
    
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

    // Extract owner name from GitHub link
    const getOwnerName = (githubLink) => {
        if (!githubLink) return '';
        const match = githubLink.match(/github\.com\/([^\/]+)/);
        return match ? match[1] : '';
    };
    
    const ownerName = getOwnerName(server.githubLink);
    const ownerDisplay = ownerName ? `<div class="owner-name">by <span class="owner-username">${ownerName}</span></div>` : '';

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
                    <div class="server-info">
                        <h3>${server.githubLink ? `<a href="${server.githubLink}" target="_blank" rel="noopener noreferrer">${server.name}</a>` : server.name}</h3>
                        ${ownerDisplay}
                    </div>
                    <div class="stars-container">
                        ${starsDisplay}
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

export function updatePaginationControls(pagination) {
    const paginationContainer = document.getElementById('paginationControls');
    if (!paginationContainer) {
        createPaginationControls();
        return updatePaginationControls(pagination);
    }
    
    const { page, totalPages, hasNext, hasPrev, total } = pagination;
    
    // Update pagination info
    document.getElementById('pageInfo').textContent = 
        `Page ${page} of ${totalPages} (${total} servers)`;
    
    // Update buttons
    document.getElementById('prevPageBtn').disabled = !hasPrev;
    document.getElementById('nextPageBtn').disabled = !hasNext;
    document.getElementById('firstPageBtn').disabled = !hasPrev;
    document.getElementById('lastPageBtn').disabled = !hasNext;
    
    // Update page input
    document.getElementById('pageInput').value = page;
    document.getElementById('pageInput').max = totalPages;
}

export function createPaginationControls() {
    const grid = document.getElementById('serverGrid');
    const container = document.createElement('div');
    container.id = 'paginationControls';
    container.className = 'pagination-controls';
    container.innerHTML = `
        <div class="pagination-info">
            <span id="pageInfo">Loading...</span>
            <select id="limitSelect" onchange="handleLimitChange(this.value)">
                <option value="25">25 per page</option>
                <option value="50" selected>50 per page</option>
                <option value="100">100 per page</option>
            </select>
        </div>
        <div class="pagination-buttons">
            <button id="firstPageBtn" onclick="goToPage(1)" title="First page">⏮</button>
            <button id="prevPageBtn" onclick="goToPage(currentPage - 1)" title="Previous page">◀</button>
            <input type="number" id="pageInput" min="1" value="1" onchange="goToPage(parseInt(this.value))" title="Go to page">
            <button id="nextPageBtn" onclick="goToPage(currentPage + 1)" title="Next page">▶</button>
            <button id="lastPageBtn" onclick="goToPage(totalPages)" title="Last page">⏭</button>
        </div>
    `;
    
    grid.parentNode.insertBefore(container, grid.nextSibling);
}

export function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    currentPage = page;
    loadAndDisplayServers();
}

export function handleLimitChange(newLimit) {
    currentLimit = parseInt(newLimit);
    currentPage = 1; // Reset to first page
    loadAndDisplayServers();
}

export function showLoadingState() {
    const grid = document.getElementById('serverGrid');
    const loadingElement = document.createElement('div');
    loadingElement.id = 'loadingState';
    loadingElement.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading-spinner"></div>
            <p>Loading servers...</p>
        </div>
    `;
    grid.innerHTML = '';
    grid.appendChild(loadingElement);
}

export function hideLoadingState() {
    const loadingElement = document.getElementById('loadingState');
    if (loadingElement) {
        loadingElement.remove();
    }
}

export function showNoResultsState() {
    const grid = document.getElementById('serverGrid');
    const searchText = currentSearchQuery ? ` matching "${currentSearchQuery}"` : '';
    const starsText = currentStarsFilter > 0 ? ` with ${currentStarsFilter}+ stars` : '';
    const categoryText = currentCategory ? ` in category "${currentCategory}"` : '';
    
    grid.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #666;">
            No servers found${searchText}${starsText}${categoryText}.
        </div>
    `;
}

export function showErrorState(errorMessage) {
    const grid = document.getElementById('serverGrid');
    grid.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #d73a49;">
            <p>Error loading servers: ${errorMessage}</p>
            <button onclick="loadAndDisplayServers()" class="btn-primary">Retry</button>
        </div>
    `;
}

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

export function resetStarsFilter() {
    setCurrentStarsFilter(0);
    const starsSelect = document.getElementById('starsFilter');
    if (starsSelect) {
        starsSelect.value = '0';
    }
    updateFilterIndicator(0);
    currentPage = 1;
    loadAndDisplayServers();
}

export function toggleCategory(categoryId) {
    // Update local storage
    const expandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '[]');
    const index = expandedCategories.indexOf(categoryId);
    
    if (index === -1) {
        expandedCategories.push(categoryId);
    } else {
        expandedCategories.splice(index, 1);
    }
    
    localStorage.setItem('expandedCategories', JSON.stringify(expandedCategories));
    
    // Toggle UI
    const categorySection = document.querySelector(`.category-section[data-category="${categoryId}"]`);
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

export function restoreExpandedStates() {
    const expandedCategories = JSON.parse(localStorage.getItem('expandedCategories') || '[]');
    
    expandedCategories.forEach(categoryId => {
        const categorySection = document.querySelector(`.category-section[data-category="${categoryId}"]`);
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
}

// Initialize optimized UI
export function initOptimizedUI() {
    // Replace the search function in window
    window.searchServers = searchServers;
    window.handleGroupByChange = handleGroupByChange;
    window.handleSortByChange = handleSortByChange;
    window.handleStarsFilterChange = handleStarsFilterChange;
    window.resetStarsFilter = resetStarsFilter;
    window.toggleCategory = toggleCategory;
    window.currentPage = currentPage;
    window.totalPages = totalPages;
    window.goToPage = goToPage;
    window.handleLimitChange = handleLimitChange;
    
    // Override restoreExpandedStates
    window.restoreExpandedStates = restoreExpandedStates;
    
    // Set up search input handler for optimized UI
    initSearchHandler();
    
    // Load initial data
    loadAndDisplayServers();
}

// Initialize search input handler
function initSearchHandler() {
    const searchInput = document.getElementById('searchInput') || document.querySelector('.search-box');
    if (!searchInput) return;
    
    let debounceTimer = null;
    
    // Remove any existing listeners by cloning the element
    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);
    
    newSearchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            searchServers(e.target.value);
        }, 300); // 300ms debounce
    });
    
    newSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            clearTimeout(debounceTimer);
            searchServers(e.target.value);
        }
    });
}