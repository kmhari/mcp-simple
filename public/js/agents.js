let allAgents = [];
let filteredAgents = [];
let selectedCategories = new Set();

function switchPage(page) {
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    document.getElementById(`${page}-page`).classList.add('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    const pageTitle = document.getElementById('pageTitle');
    if (page === 'mcp-servers') {
        pageTitle.textContent = '🔧 MCP Server Manager';
    } else if (page === 'sub-agents') {
        pageTitle.textContent = '🤖 Claude Sub Agents';
        loadAgents();
    }
}

function switchAgentTab(tab) {
    document.querySelectorAll('#sub-agents-page .tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#sub-agents-page .tab-content').forEach(c => c.classList.remove('active'));

    event.target.classList.add('active');
    document.getElementById(`agents-${tab}`).classList.add('active');

    if (tab === 'browse') {
        loadAgents();
    } else if (tab === 'installed') {
        loadInstalledAgents();
    }
}

async function loadAgents() {
    try {
        const response = await fetch('/agents-catalog.json');
        const data = await response.json();
        allAgents = data.agents;

        renderCategoryFilters();
        filterAndRenderAgents();
    } catch (error) {
        console.error('Failed to load agents:', error);
        document.getElementById('agentGrid').innerHTML = '<p>Failed to load agents</p>';
    }
}

function renderCategoryFilters() {
    const categories = {};
    allAgents.forEach(agent => {
        const agentCategories = agent.categories || ['General'];
        agentCategories.forEach(category => {
            if (!categories[category]) {
                categories[category] = 0;
            }
            categories[category]++;
        });
    });

    const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);

    const filtersHtml = sortedCategories.map(([category, count]) => `
        <div class="category-filter-item">
            <input type="checkbox" id="cat-${category.replace(/[^a-zA-Z0-9]/g, '-')}" value="${category}" onchange="handleCategoryFilter()">
            <label for="cat-${category.replace(/[^a-zA-Z0-9]/g, '-')}">
                <span>${category}</span>
                <span class="sidebar-category-count">${count}</span>
            </label>
        </div>
    `).join('');

    document.getElementById('repoFilters').innerHTML = filtersHtml;
}

function handleCategoryFilter() {
    selectedCategories.clear();
    document.querySelectorAll('#repoFilters input[type="checkbox"]:checked').forEach(cb => {
        selectedCategories.add(cb.value);
    });
    filterAndRenderAgents();
}

function clearRepoFilters() {
    selectedCategories.clear();
    document.querySelectorAll('#repoFilters input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    filterAndRenderAgents();
}

function filterAndRenderAgents() {
    filteredAgents = allAgents.filter(agent => {
        // Filter by categories
        if (selectedCategories.size > 0) {
            const agentCategories = agent.categories || ['General'];
            const hasSelectedCategory = agentCategories.some(cat => selectedCategories.has(cat));
            if (!hasSelectedCategory) {
                return false;
            }
        }

        // Filter by search term
        const searchTerm = document.getElementById('agentSearchInput')?.value.toLowerCase() || '';
        if (searchTerm) {
            return agent.name.toLowerCase().includes(searchTerm) ||
                   agent.fileName.toLowerCase().includes(searchTerm) ||
                   (agent.description && agent.description.toLowerCase().includes(searchTerm));
        }

        return true;
    });

    renderAgents();
}

function renderAgents() {
    const sortBy = document.getElementById('agentSortSelect')?.value || 'a-z';

    let sorted = [...filteredAgents];
    if (sortBy === 'a-z') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'z-a') {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'category') {
        sorted.sort((a, b) => {
            const aCat = (a.categories && a.categories[0]) || 'Uncategorized';
            const bCat = (b.categories && b.categories[0]) || 'Uncategorized';
            return aCat.localeCompare(bCat);
        });
    }

    // Group agents by category for display when sorted by category
    if (sortBy === 'category') {
        const agentsByCategory = {};
        sorted.forEach(agent => {
            const category = (agent.categories && agent.categories[0]) || 'Uncategorized';

            if (!agentsByCategory[category]) {
                agentsByCategory[category] = [];
            }
            agentsByCategory[category].push(agent);
        });

        let html = '';
        for (const [category, agents] of Object.entries(agentsByCategory)) {
            html += `<div class="category-section">
                <h2 class="category-title">${category} <span class="category-count">(${agents.length})</span></h2>
                <div class="category-grid">`;
            html += agents.map(agent => {
                const description = agent.description || agent.fileName || 'No description available';
                const categories = (agent.categories || ['General']).join(', ');
                return `
                <div class="server-card">
                    <div class="card-header">
                        <div class="server-logo-placeholder"></div>
                        <div class="card-header-content">
                            <div class="server-info">
                                <h3>${agent.name}</h3>
                                <div class="owner-name">
                                    <span class="owner-username">${categories}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="description">${description}</div>
                    <div class="card-footer">
                        <div class="button-container">
                            <button onclick="viewAgent('${agent.filePath}', '${agent.name}')">View</button>
                            <button onclick="installAgent('${agent.filePath}', '${agent.name}')">Install</button>
                        </div>
                    </div>
                </div>`;
            }).join('');
            html += '</div></div>';
        }
        document.getElementById('agentGrid').innerHTML = html || '<p>No agents found</p>';
    } else {
        // Regular grid display for other sort options
        let html = '<div class="category-grid">';
        html += sorted.map(agent => {
            const categories = (agent.categories || ['General']).join(', ');
            const description = agent.description || agent.fileName || 'No description available';

            return `
            <div class="server-card">
                <div class="card-header">
                    <div class="server-logo-placeholder"></div>
                    <div class="card-header-content">
                        <div class="server-info">
                            <h3>${agent.name}</h3>
                            <div class="owner-name">
                                <span class="owner-username">${categories}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="description">${description}</div>
                <div class="card-footer">
                    <div class="button-container">
                        <button onclick="viewAgent('${agent.filePath}', '${agent.name}')">View</button>
                        <button onclick="installAgent('${agent.filePath}', '${agent.name}')">Install</button>
                    </div>
                </div>
            </div>`;
        }).join('');
        html += '</div>';

        document.getElementById('agentGrid').innerHTML = html || '<p>No agents found</p>';
    }
}

function handleAgentSort(value) {
    renderAgents();
}

async function viewAgent(filePath, name) {
    try {
        const agent = allAgents.find(a => a.name === name);

        if (!agent) {
            throw new Error('Agent not found');
        }

        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = agent.name;

        const categoriesHtml = (agent.categories || ['General'])
            .map(cat => `<span class="category-badge">${cat}</span>`)
            .join('');

        const description = agent.description || agent.fileName || 'No description available';
        const formattedDescription = description
            .split('\n')
            .map(line => `<p>${line}</p>`)
            .join('');

        modalBody.innerHTML = `
            <div class="agent-detail-view">
                <div class="agent-detail-categories">${categoriesHtml}</div>
                <div class="agent-detail-description">${formattedDescription}</div>
                <div class="agent-detail-repo">
                    <strong>Repository:</strong> ${agent.repository}
                </div>
                <div class="agent-detail-actions">
                    <button onclick="viewAgentSource('${filePath}', '${agent.name}')" class="view-source-btn">View Source</button>
                </div>
            </div>
        `;

        document.getElementById('serverModal').style.display = 'block';
    } catch (error) {
        console.error('Failed to load agent:', error);
        alert('Failed to load agent content');
    }
}

async function viewAgentSource(filePath, name) {
    try {
        const response = await fetch(filePath);
        const content = await response.text();

        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = `${name} - Source`;
        modalBody.innerHTML = `<pre style="white-space: pre-wrap; word-wrap: break-word; font-size: 13px; line-height: 1.5;">${content}</pre>`;
    } catch (error) {
        console.error('Failed to load agent source:', error);
        alert('Failed to load agent source content');
    }
}

async function installAgent(filePath, name) {
    try {
        // Check if global config mode is enabled
        const isGlobal = document.getElementById('globalConfigToggle')?.checked || false;
        const mode = isGlobal ? 'global' : 'local';

        // Show loading state
        const confirmed = confirm(`Install agent "${name}" to ${mode} configuration?\n\n${isGlobal ? 'Global: ~/.claude/agents/' : 'Local: ./.claude/agents/'}`);

        if (!confirmed) {
            return;
        }

        const response = await fetch(`/api/install-agent?global=${isGlobal}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filePath, name })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Installation failed');
        }

        alert(`✅ ${result.message}\n\nInstalled to: ${result.path}`);
    } catch (error) {
        console.error('Failed to install agent:', error);
        alert(`❌ Failed to install agent: ${error.message}`);
    }
}

function loadInstalledAgents() {
    const list = document.getElementById('installedAgentsList');
    list.innerHTML = '<li>No installed agents found. Install agents from the Browse tab.</li>';
}

if (document.getElementById('agentSearchInput')) {
    document.getElementById('agentSearchInput').addEventListener('input', filterAndRenderAgents);
}
