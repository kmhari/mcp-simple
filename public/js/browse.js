// Universal resource browser for Commands, Hooks, Settings, Templates

const RESOURCE_CONFIG = {
    commands: {
        catalogFile: 'commands-catalog.json',
        title: '📝 Commands',
        itemsKey: 'commands',
        installPath: '.claude/commands',
        fileExt: '.md'
    },
    hooks: {
        catalogFile: 'hooks-catalog.json',
        title: '🪝 Hooks',
        itemsKey: 'hooks',
        installPath: '.claude/hooks',
        fileExt: '.json'
    },
    settings: {
        catalogFile: 'settings-catalog.json',
        title: '⚙️  Settings',
        itemsKey: 'settings',
        installPath: '.claude',
        fileExt: '.json'
    },
    templates: {
        catalogFile: 'templates-catalog.json',
        title: '📦 Templates',
        itemsKey: 'templates',
        installPath: '.claude',
        fileExt: ''
    }
};

class ResourceBrowser {
    constructor(type) {
        this.type = type;
        this.config = RESOURCE_CONFIG[type];
        this.allItems = [];
        this.filteredItems = [];
        this.selectedCategories = new Set();
        this.container = null;
    }

    async init(container) {
        this.container = container;
        await this.loadCatalog();
        this.render();
    }

    async loadCatalog() {
        try {
            const response = await fetch(`/${this.config.catalogFile}`);
            const data = await response.json();
            this.allItems = data[this.config.itemsKey] || [];
        } catch (error) {
            console.error(`Failed to load ${this.type}:`, error);
            this.allItems = [];
        }
    }

    render() {
        this.container.innerHTML = `
            <div class="browse-layout">
                <div class="category-sidebar">
                    <div class="sidebar-header">
                        <h3>Categories</h3>
                        <button class="clear-categories-btn" onclick="window.browsers['${this.type}'].clearFilters()">Clear all</button>
                    </div>
                    <div class="category-filters" id="${this.type}-categories"></div>
                </div>
                <div class="main-content">
                    <div class="search-container">
                        <input type="text" class="search-box" placeholder="Search ${this.type}..." id="${this.type}-search">
                    </div>
                    <div id="${this.type}-grid" class="server-grid"></div>
                </div>
            </div>
        `;

        this.renderCategories();
        this.renderItems();
        this.attachEventListeners();
    }

    renderCategories() {
        const categories = {};
        this.allItems.forEach(item => {
            const cat = item.category || 'General';
            categories[cat] = (categories[cat] || 0) + 1;
        });

        const html = Object.entries(categories)
            .sort((a, b) => b[1] - a[1])
            .map(([cat, count]) => `
                <div class="category-filter-item">
                    <input type="checkbox" id="${this.type}-cat-${cat.replace(/\s+/g, '-')}" value="${cat}">
                    <label for="${this.type}-cat-${cat.replace(/\s+/g, '-')}">
                        <span>${cat}</span>
                        <span class="sidebar-category-count">${count}</span>
                    </label>
                </div>
            `).join('');

        document.getElementById(`${this.type}-categories`).innerHTML = html;
    }

    renderItems() {
        const search = document.getElementById(`${this.type}-search`)?.value.toLowerCase() || '';

        this.filteredItems = this.allItems.filter(item => {
            if (this.selectedCategories.size > 0) {
                const cat = item.category || 'General';
                if (!this.selectedCategories.has(cat)) return false;
            }
            if (search) {
                const name = (item.name || item.displayName || '').toLowerCase();
                const desc = (item.description || '').toLowerCase();
                return name.includes(search) || desc.includes(search);
            }
            return true;
        });

        const html = this.filteredItems.map(item => this.renderCard(item)).join('');
        document.getElementById(`${this.type}-grid`).innerHTML =
            `<div class="category-grid">${html}</div>` || '<p>No items found</p>';
    }

    renderCard(item) {
        const name = item.name || item.displayName || 'Unnamed';
        const desc = item.description || 'No description';
        const cat = item.category || 'General';

        return `
            <div class="server-card">
                <div class="card-header">
                    <div class="server-logo-placeholder"></div>
                    <div class="card-header-content">
                        <div class="server-info">
                            <h3>${name}</h3>
                            <div class="owner-name">
                                <span class="owner-username">${cat}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="description">${desc}</div>
                <div class="card-footer">
                    <div class="button-container">
                        <button onclick="window.browsers['${this.type}'].view('${name}')">View</button>
                        <button onclick="window.browsers['${this.type}'].install('${name}')">Install</button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        document.getElementById(`${this.type}-search`)?.addEventListener('input', () => this.renderItems());
        document.querySelectorAll(`#${this.type}-categories input`).forEach(cb => {
            cb.addEventListener('change', () => {
                this.selectedCategories.clear();
                document.querySelectorAll(`#${this.type}-categories input:checked`).forEach(c => {
                    this.selectedCategories.add(c.value);
                });
                this.renderItems();
            });
        });
    }

    clearFilters() {
        this.selectedCategories.clear();
        document.querySelectorAll(`#${this.type}-categories input`).forEach(cb => cb.checked = false);
        this.renderItems();
    }

    view(name) {
        const item = this.allItems.find(i => (i.name || i.displayName) === name);
        if (!item) return;

        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = name;
        modalBody.innerHTML = `
            <div class="agent-detail-view">
                <p><strong>Category:</strong> ${item.category || 'General'}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                ${item.keywords ? `<p><strong>Keywords:</strong> ${item.keywords.join(', ')}</p>` : ''}
                ${item.filePath ? `<p><strong>Source:</strong> <a href="${item.filePath}" target="_blank">View on GitHub</a></p>` : ''}
            </div>
        `;

        document.getElementById('serverModal').style.display = 'block';
    }

    async install(name) {
        const item = this.allItems.find(i => (i.name || i.displayName) === name);
        if (!item) return;

        const isGlobal = document.getElementById('globalConfigToggle')?.checked || false;
        const confirmed = confirm(`Install "${name}" to ${isGlobal ? 'global' : 'local'} configuration?`);

        if (!confirmed) return;

        try {
            const response = await fetch(`/api/install-resource?global=${isGlobal}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: this.type,
                    name,
                    filePath: item.filePath,
                    fileName: item.fileName
                })
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Installation failed');

            alert(`✅ ${result.message}\n\nInstalled to: ${result.path}`);
        } catch (error) {
            console.error('Installation error:', error);
            alert(`❌ Failed to install: ${error.message}`);
        }
    }
}

// Initialize browsers
window.browsers = {};

function switchPage(page) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    document.getElementById(`${page}-page`).classList.add('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    const pageTitle = document.getElementById('pageTitle');
    const config = RESOURCE_CONFIG[page];

    if (config) {
        pageTitle.textContent = config.title;

        if (!window.browsers[page]) {
            const container = document.querySelector(`#${page}-page [id="resourceBrowse"]`);
            if (container) {
                window.browsers[page] = new ResourceBrowser(page);
                window.browsers[page].init(container);
            }
        }
    } else if (page === 'mcp-servers') {
        pageTitle.textContent = '🔧 MCP Server Manager';
    } else if (page === 'sub-agents') {
        pageTitle.textContent = '🤖 Claude Sub Agents';
        if (typeof loadAgents === 'function') loadAgents();
    }
}
