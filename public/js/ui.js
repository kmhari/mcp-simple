// UI rendering and display functions
import { 
    currentConfig, 
    preConfiguredServers, 
    starsData, 
    currentGroupBy,
    setCurrentGroupBy,
    currentStarsFilter,
    setCurrentStarsFilter
} from './state.js';
import { isServerInstalled } from './utils.js';

export function handleGroupByChange(value) {
    setCurrentGroupBy(value);
    const searchValue = document.querySelector('.search-box').value;
    searchServers(searchValue);
}

export function handleStarsFilterChange(value) {
    setCurrentStarsFilter(parseInt(value));
    const searchValue = document.querySelector('.search-box').value;
    searchServers(searchValue);
}

export function displayServers(servers = preConfiguredServers) {
    const grid = document.getElementById('serverGrid');
    grid.innerHTML = '';
    
    if (currentGroupBy === 'category') {
        displayServersByCategory(servers, grid);
    } else if (currentGroupBy === 'stars') {
        displayServersByStars(servers, grid);
    } else {
        displayServersFlat(servers, grid);
    }
}

export function displayServersFlat(servers, grid) {
    const container = document.createElement('div');
    container.className = 'category-grid';
    container.style.marginTop = '0';
    
    const serversArray = Object.entries(servers).map(([key, server]) => ({ key, server }));
    serversArray.sort((a, b) => a.server.name.localeCompare(b.server.name));

    serversArray.forEach(({ key, server }) => {
        const card = createServerCard(key, server);
        container.appendChild(card);
    });
    
    grid.appendChild(container);
    cleanupAnimations();
}

export function displayServersByCategory(servers, grid) {
    const categories = {};
    Object.entries(servers).forEach(([key, server]) => {
        const category = server.category || 'Other';
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push({ key, server });
    });
    
    const sortedCategories = Object.keys(categories).sort();
    
    sortedCategories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        categorySection.setAttribute('data-category', category);
        categorySection.innerHTML = `
            <h2 class="category-title">${category} <span class="category-count">(${categories[category].length})</span></h2>
            <div class="category-grid">
        `;
        
        categories[category].forEach(({ key, server }) => {
            const card = createServerCard(key, server);
            categorySection.querySelector('.category-grid').appendChild(card);
        });
        
        categorySection.innerHTML += '</div>';
        grid.appendChild(categorySection);
    });
    
    cleanupAnimations();
}

export function displayServersByStars(servers, grid) {
    const serversArray = Object.entries(servers).map(([key, server]) => ({
        key,
        server,
        stars: server.stars || 0
    }));
    
    serversArray.sort((a, b) => b.stars - a.stars);
    
    // Create star ranges for grouping
    const starRanges = [
        { min: 10000, max: Infinity, label: '10,000+ stars', color: '#FFD700' },
        { min: 5000, max: 9999, label: '5,000-9,999 stars', color: '#FFA500' },
        { min: 1000, max: 4999, label: '1,000-4,999 stars', color: '#FF6347' },
        { min: 100, max: 999, label: '100-999 stars', color: '#32CD32' },
        { min: 10, max: 99, label: '10-99 stars', color: '#87CEEB' },
        { min: 1, max: 9, label: '1-9 stars', color: '#DDA0DD' },
        { min: 0, max: 0, label: 'No stars data', color: '#D3D3D3' }
    ];
    
    starRanges.forEach(range => {
        const rangeServers = serversArray.filter(({ stars }) => 
            stars >= range.min && stars <= range.max
        );
        
        if (rangeServers.length > 0) {
            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';
            categorySection.innerHTML = `
                <h2 class="category-title" style="color: ${range.color};">
                    ⭐ ${range.label} 
                    <span class="category-count">(${rangeServers.length})</span>
                </h2>
                <div class="category-grid">
            `;
            
            rangeServers.forEach(({ key, server }) => {
                const card = createServerCard(key, server);
                categorySection.querySelector('.category-grid').appendChild(card);
            });
            
            categorySection.innerHTML += '</div>';
            grid.appendChild(categorySection);
        }
    });
    
    cleanupAnimations();
}

function createServerCard(key, server) {
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
            <p class="description">${server.description}</p>
            <div class="view-more-container">
                <span class="view-more-link" onclick="showReadme('${key}')" title="View README">View more</span>
            </div>
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

export function searchServers(query) {
    window.clearSelection();
    
    const filtered = {};
    const searchTerm = query ? query.toLowerCase() : '';
    
    Object.entries(preConfiguredServers).forEach(([key, server]) => {
        // Apply search filter
        const matchesSearch = !query || 
            (server.name && server.name.toLowerCase().includes(searchTerm)) ||
            (server.description && server.description.toLowerCase().includes(searchTerm)) ||
            (server.category && server.category.toLowerCase().includes(searchTerm)) ||
            (server.package && server.package.toLowerCase().includes(searchTerm));
        
        // Apply stars filter
        const serverStars = server.stars || 0;
        const matchesStarsFilter = serverStars >= currentStarsFilter;
        
        if (matchesSearch && matchesStarsFilter) {
            filtered[key] = server;
        }
    });
    
    displayServers(filtered);
    
    if (Object.keys(filtered).length === 0) {
        const grid = document.getElementById('serverGrid');
        const searchText = query ? ` matching "${query}"` : '';
        const starsText = currentStarsFilter > 0 ? ` with ${currentStarsFilter}+ stars` : '';
        grid.innerHTML = `<div style="text-align: center; padding: 40px; color: #666;">No servers found${searchText}${starsText}.</div>`;
    }
}