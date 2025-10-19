#!/usr/bin/env node

/**
 * Build catalog JSON files for Commands, Hooks, Settings, and Templates
 * from the claude-code-templates repository
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_BASE = 'https://raw.githubusercontent.com/davila7/claude-code-templates/main';
const OUTPUT_DIR = path.join(__dirname, '..', 'public');

async function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function fetchText(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function extractMetadataFromMarkdown(content) {
    const lines = content.split('\n');
    const metadata = {};

    // Extract frontmatter if exists
    if (lines[0] === '---') {
        const endIndex = lines.indexOf('---', 1);
        if (endIndex > 0) {
            for (let i = 1; i < endIndex; i++) {
                const [key, ...valueParts] = lines[i].split(':');
                if (key && valueParts.length) {
                    metadata[key.trim()] = valueParts.join(':').trim();
                }
            }
        }
    }

    // Extract first heading as name if no frontmatter name
    if (!metadata.name) {
        const heading = lines.find(line => line.startsWith('# '));
        if (heading) {
            metadata.name = heading.replace('# ', '').trim();
        }
    }

    // Extract description from first paragraph
    if (!metadata.description) {
        const paragraphStart = lines.findIndex(line => line.trim() && !line.startsWith('#') && !line.startsWith('---'));
        if (paragraphStart > 0) {
            metadata.description = lines[paragraphStart].trim();
        }
    }

    return metadata;
}

async function buildCommandsCatalog(marketplace) {
    console.log('📋 Building Commands catalog...');
    const commands = [];

    for (const plugin of marketplace.plugins) {
        if (!plugin.commands) continue;

        for (const cmdPath of plugin.commands) {
            const url = `${REPO_BASE}/${cmdPath}`;
            const fileName = path.basename(cmdPath);
            const category = cmdPath.split('/').slice(-2, -1)[0]; // Get parent directory name

            try {
                const content = await fetchText(url);
                const metadata = extractMetadataFromMarkdown(content);

                commands.push({
                    name: metadata.name || fileName.replace('.md', '').replace(/-/g, ' '),
                    fileName,
                    filePath: url,
                    plugin: plugin.name,
                    category: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    description: metadata.description || plugin.description,
                    keywords: plugin.keywords || []
                });

                process.stdout.write('.');
            } catch (error) {
                console.error(`\n❌ Failed to fetch ${cmdPath}:`, error.message);
            }
        }
    }

    console.log(`\n✅ Found ${commands.length} commands`);

    const catalog = {
        metadata: {
            title: "Claude Code Commands Catalog",
            description: "Slash commands from claude-code-templates",
            totalCommands: commands.length,
            generatedAt: new Date().toISOString()
        },
        commands
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'commands-catalog.json'),
        JSON.stringify(catalog, null, 2)
    );

    console.log('💾 Saved to public/commands-catalog.json');
    return catalog;
}

async function buildHooksCatalog() {
    console.log('\n🪝 Building Hooks catalog...');

    const url = 'https://api.github.com/repos/davila7/claude-code-templates/git/trees/main?recursive=1';
    const response = await fetchJSON(url);
    const hookPaths = response.tree
        .filter(item => item.path.includes('cli-tool/components/hooks/') && item.path.endsWith('.json'))
        .map(item => item.path);

    const hooks = [];

    for (const hookPath of hookPaths) {
        const url = `${REPO_BASE}/${hookPath}`;
        const fileName = path.basename(hookPath);
        const category = hookPath.split('/').slice(-2, -1)[0];

        try {
            const hookConfig = await fetchJSON(url);

            hooks.push({
                name: hookConfig.name || fileName.replace('.json', '').replace(/-/g, ' '),
                fileName,
                filePath: url,
                category: category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                description: hookConfig.description || 'Claude Code hook configuration',
                hookType: hookConfig.type || 'custom',
                events: hookConfig.events || []
            });

            process.stdout.write('.');
        } catch (error) {
            console.error(`\n❌ Failed to fetch ${hookPath}:`, error.message);
        }
    }

    console.log(`\n✅ Found ${hooks.length} hooks`);

    const catalog = {
        metadata: {
            title: "Claude Code Hooks Catalog",
            description: "Hook configurations from claude-code-templates",
            totalHooks: hooks.length,
            generatedAt: new Date().toISOString()
        },
        hooks
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'hooks-catalog.json'),
        JSON.stringify(catalog, null, 2)
    );

    console.log('💾 Saved to public/hooks-catalog.json');
    return catalog;
}

async function buildTemplatesCatalog(marketplace) {
    console.log('\n📦 Building Templates catalog...');

    const templates = marketplace.plugins.map(plugin => ({
        name: plugin.name,
        description: plugin.description,
        version: plugin.version,
        author: plugin.author.name,
        keywords: plugin.keywords || [],
        commands: plugin.commands?.length || 0,
        agents: plugin.agents?.length || 0,
        hooks: plugin.hooks?.length || 0,
        mcpServers: plugin.mcpServers?.length || 0,
        source: plugin.source
    }));

    const catalog = {
        metadata: {
            title: "Claude Code Templates Catalog",
            description: "Ready-to-use workflow templates from claude-code-templates",
            totalTemplates: templates.length,
            generatedAt: new Date().toISOString()
        },
        templates
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'templates-catalog.json'),
        JSON.stringify(catalog, null, 2)
    );

    console.log(`✅ Found ${templates.length} templates`);
    console.log('💾 Saved to public/templates-catalog.json');
    return catalog;
}

async function buildSettingsCatalog() {
    console.log('\n⚙️  Building Settings catalog...');

    const url = 'https://api.github.com/repos/davila7/claude-code-templates/git/trees/main?recursive=1';
    const response = await fetchJSON(url);
    const settingsPaths = response.tree
        .filter(item => item.path.includes('cli-tool/components/settings/') && item.path.endsWith('.json'))
        .map(item => item.path);

    const settings = [];

    for (const settingsPath of settingsPaths) {
        const url = `${REPO_BASE}/${settingsPath}`;
        const fileName = path.basename(settingsPath);

        try {
            const settingsConfig = await fetchJSON(url);

            settings.push({
                name: settingsConfig.name || fileName.replace('.json', '').replace(/-/g, ' '),
                fileName,
                filePath: url,
                description: settingsConfig.description || 'Claude Code settings configuration',
                config: settingsConfig
            });

            process.stdout.write('.');
        } catch (error) {
            console.error(`\n❌ Failed to fetch ${settingsPath}:`, error.message);
        }
    }

    console.log(`\n✅ Found ${settings.length} settings`);

    const catalog = {
        metadata: {
            title: "Claude Code Settings Catalog",
            description: "Settings configurations from claude-code-templates",
            totalSettings: settings.length,
            generatedAt: new Date().toISOString()
        },
        settings
    };

    fs.writeFileSync(
        path.join(OUTPUT_DIR, 'settings-catalog.json'),
        JSON.stringify(catalog, null, 2)
    );

    console.log('💾 Saved to public/settings-catalog.json');
    return catalog;
}

async function main() {
    console.log('🚀 Building Claude Code catalogs...\n');

    try {
        // Fetch marketplace.json
        const marketplaceUrl = `${REPO_BASE}/.claude-plugin/marketplace.json`;
        const marketplace = await fetchJSON(marketplaceUrl);

        // Build all catalogs
        await buildCommandsCatalog(marketplace);
        await buildHooksCatalog();
        await buildTemplatesCatalog(marketplace);
        await buildSettingsCatalog();

        console.log('\n✨ All catalogs built successfully!');
    } catch (error) {
        console.error('\n❌ Error building catalogs:', error);
        process.exit(1);
    }
}

main();
