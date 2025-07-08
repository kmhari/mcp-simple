#!/usr/bin/env node

/**
 * MCP Server Data Updater
 * 
 * Downloads/updates README files and server details for all servers in the database
 * when they are stale (older than specified threshold).
 * 
 * Usage:
 *   node update-server-data.js [options]
 * 
 * Options:
 *   --all              Update all servers regardless of staleness
 *   --days <number>    Staleness threshold in days (default: 7)
 *   --dry-run          Show what would be updated without making changes
 *   --server <id>      Update specific server only
 *   --help             Show this help message
 * 
 * Environment Variables:
 *   GITHUB_TOKEN       GitHub token for higher API rate limits (recommended)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  databasePath: path.join(__dirname, 'mcp-servers-database.json'),
  readmesDir: path.join(__dirname, 'data', 'readmes'),
  defaultStaleDays: 7,
  requestDelay: 1000, // ms between requests to respect rate limits
  timeout: 10000, // ms
  userAgent: 'MCP-Server-Data-Updater/1.0',
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    updateAll: false,
    staleDays: CONFIG.defaultStaleDays,
    dryRun: false,
    specificServer: null,
    showHelp: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--all':
        options.updateAll = true;
        break;
      case '--days':
        options.staleDays = parseInt(args[++i]) || CONFIG.defaultStaleDays;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--server':
        options.specificServer = args[++i];
        break;
      case '--help':
      case '-h':
        options.showHelp = true;
        break;
    }
  }

  return options;
}

// Show help message
function showHelp() {
  console.log(`
MCP Server Data Updater

Downloads/updates README files and server details for MCP servers when stale.

Usage:
  node update-server-data.js [options]

Options:
  --all              Update all servers regardless of staleness
  --days <number>    Staleness threshold in days (default: 7)
  --dry-run          Show what would be updated without making changes
  --server <id>      Update specific server only
  --help, -h         Show this help message

Examples:
  node update-server-data.js                    # Update stale servers (7+ days old)
  node update-server-data.js --all              # Update all servers
  node update-server-data.js --days 3           # Update servers older than 3 days
  node update-server-data.js --server fetch     # Update only the 'fetch' server
  node update-server-data.js --dry-run          # Preview what would be updated

Environment Variables:
  GITHUB_TOKEN       Set for higher GitHub API rate limits (5000+ vs 60 requests/hour)

Features:
  ✓ Downloads README files from GitHub repositories
  ✓ Updates GitHub stars count
  ✓ Fetches latest repository metadata
  ✓ Respects GitHub API rate limits
  ✓ Skips updates for fresh data
  ✓ Creates backup before updates
  ✓ Detailed progress reporting
`);
}

// Load MCP servers database
function loadDatabase() {
  try {
    const data = fs.readFileSync(CONFIG.databasePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`❌ Failed to load database: ${error.message}`);
    process.exit(1);
  }
}

// Save database with backup
function saveDatabase(data, dryRun = false) {
  if (dryRun) {
    console.log('🔍 [DRY RUN] Would save updated database');
    return;
  }

  try {
    // Create backup
    const backupPath = CONFIG.databasePath + '.backup';
    fs.copyFileSync(CONFIG.databasePath, backupPath);
    console.log(`💾 Created backup: ${path.basename(backupPath)}`);

    // Save updated data
    fs.writeFileSync(CONFIG.databasePath, JSON.stringify(data, null, 2));
    console.log(`✅ Updated database: ${path.basename(CONFIG.databasePath)}`);
  } catch (error) {
    console.error(`❌ Failed to save database: ${error.message}`);
    throw error;
  }
}

// Check if data is stale
function isStale(lastUpdate, maxAgeDays) {
  if (!lastUpdate) return true;
  
  const lastUpdateTime = new Date(lastUpdate);
  const now = new Date();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  
  return (now - lastUpdateTime) > maxAgeMs;
}

// Parse GitHub URL to extract owner and repo
function parseGitHubUrl(url) {
  if (!url) return null;
  
  const patterns = [
    // Standard repo: https://github.com/owner/repo
    /github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?(?:\/.*)?$/,
    // Monorepo path: https://github.com/owner/repo/tree/main/src/package
    /github\.com\/([^\/]+)\/([^\/]+)\/tree\/[^\/]+\/.*$/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace('.git', ''),
        fullUrl: url
      };
    }
  }
  
  return null;
}

// Make HTTPS request with proper headers
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const headers = {
      'User-Agent': CONFIG.userAgent,
      'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const req = https.request({
      ...options,
      headers,
      timeout: CONFIG.timeout,
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Fetch GitHub repository information
async function fetchRepoInfo(owner, repo) {
  try {
    const response = await makeRequest({
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}`,
      method: 'GET',
    });

    if (response.statusCode === 200) {
      const repoData = JSON.parse(response.data);
      return {
        name: repoData.name,
        full_name: repoData.full_name,
        description: repoData.description,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        language: repoData.language,
        updated_at: repoData.updated_at,
        created_at: repoData.created_at,
        default_branch: repoData.default_branch || 'main',
      };
    } else if (response.statusCode === 404) {
      throw new Error('Repository not found');
    } else if (response.statusCode === 403) {
      throw new Error('Rate limit exceeded or access forbidden');
    } else {
      const errorData = JSON.parse(response.data);
      throw new Error(`GitHub API error: ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch repo info: ${error.message}`);
  }
}

// Fetch README content
async function fetchReadme(owner, repo, branch = 'main') {
  const readmePaths = [
    'README.md',
    'readme.md', 
    'Readme.md',
    'README.rst',
    'README.txt',
    'README'
  ];

  for (const readmePath of readmePaths) {
    try {
      const response = await makeRequest({
        hostname: 'raw.githubusercontent.com',
        path: `/${owner}/${repo}/${branch}/${readmePath}`,
        method: 'GET',
      });

      if (response.statusCode === 200) {
        return {
          content: response.data,
          filename: readmePath,
        };
      }
    } catch (error) {
      // Continue to next README path
      continue;
    }
  }

  throw new Error('No README file found');
}

// Save README file to data/readmes directory
function saveReadme(serverId, readmeContent, dryRun = false) {
  const filename = `${serverId}.md`;
  const filepath = path.join(CONFIG.readmesDir, filename);

  if (dryRun) {
    console.log(`🔍 [DRY RUN] Would save README: ${filename}`);
    return;
  }

  try {
    // Ensure readmes directory exists
    fs.mkdirSync(CONFIG.readmesDir, { recursive: true });
    
    // Save README content
    fs.writeFileSync(filepath, readmeContent);
    console.log(`📄 Saved README: ${filename}`);
  } catch (error) {
    console.warn(`⚠️  Failed to save README for ${serverId}: ${error.message}`);
  }
}

// Add delay between requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Update a single server
async function updateServer(serverId, serverData, options) {
  const { dryRun } = options;
  
  console.log(`\n🔄 Processing ${serverId}...`);
  
  const githubInfo = parseGitHubUrl(serverData.githubLink);
  if (!githubInfo) {
    console.log(`❌ ${serverId}: Invalid or missing GitHub URL`);
    return { success: false, error: 'Invalid GitHub URL' };
  }

  const { owner, repo } = githubInfo;
  console.log(`📍 Repository: ${owner}/${repo}`);

  try {
    // Fetch repository information
    console.log(`🔍 Fetching repository metadata...`);
    const repoInfo = await delay(CONFIG.requestDelay).then(() => fetchRepoInfo(owner, repo));
    
    // Fetch README content
    console.log(`📖 Fetching README...`);
    await delay(CONFIG.requestDelay);
    const readme = await fetchReadme(owner, repo, repoInfo.default_branch);
    
    // Save README file
    saveReadme(serverId, readme.content, dryRun);
    
    // Update server data
    const updatedData = {
      ...serverData,
      stars: repoInfo.stars,
      lastStarUpdate: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      repoLanguage: repoInfo.language,
      repoLastUpdate: repoInfo.updated_at,
    };

    if (dryRun) {
      console.log(`🔍 [DRY RUN] Would update stars: ${serverData.stars} → ${repoInfo.stars}`);
    } else {
      console.log(`⭐ Updated stars: ${serverData.stars} → ${repoInfo.stars}`);
    }

    return { 
      success: true, 
      updatedData,
      changes: {
        stars: repoInfo.stars !== serverData.stars,
        readme: true,
      }
    };

  } catch (error) {
    console.log(`❌ ${serverId}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Main function
async function main() {
  const options = parseArgs();

  if (options.showHelp) {
    showHelp();
    return;
  }

  console.log('🚀 MCP Server Data Updater\n');
  
  // Show configuration
  console.log(`📋 Configuration:`);
  console.log(`   Database: ${path.basename(CONFIG.databasePath)}`);
  console.log(`   READMEs: ${CONFIG.readmesDir}`);
  console.log(`   Staleness: ${options.staleDays} days`);
  console.log(`   Mode: ${options.dryRun ? 'DRY RUN' : 'UPDATE'}`);
  console.log(`   GitHub Token: ${process.env.GITHUB_TOKEN ? '✅ Available' : '❌ Not set'}`);
  
  if (!process.env.GITHUB_TOKEN) {
    console.log(`   ⚠️  Without GITHUB_TOKEN: 60 requests/hour limit`);
    console.log(`   💡 With GITHUB_TOKEN: 5000+ requests/hour limit`);
  }

  // Load database
  console.log(`\n📖 Loading database...`);
  const database = loadDatabase();
  const serverIds = Object.keys(database);
  console.log(`📊 Found ${serverIds.length} servers in database`);

  // Filter servers to update
  let serversToUpdate = [];
  
  if (options.specificServer) {
    if (database[options.specificServer]) {
      serversToUpdate = [options.specificServer];
      console.log(`🎯 Updating specific server: ${options.specificServer}`);
    } else {
      console.error(`❌ Server '${options.specificServer}' not found in database`);
      process.exit(1);
    }
  } else {
    serversToUpdate = serverIds.filter(serverId => {
      const serverData = database[serverId];
      if (options.updateAll) {
        return true;
      }
      return isStale(serverData.updated_at, options.staleDays);
    });

    console.log(`\n🔍 Checking staleness (${options.staleDays} days)...`);
    if (options.updateAll) {
      console.log(`📋 Updating all ${serversToUpdate.length} servers`);
    } else {
      console.log(`📋 Found ${serversToUpdate.length} stale servers to update`);
      
      if (serversToUpdate.length === 0) {
        console.log(`🎉 All servers are fresh! No updates needed.`);
        return;
      }
    }
  }

  // Update servers
  console.log(`\n🔄 Starting updates...`);
  const results = {
    successful: 0,
    failed: 0,
    errors: [],
  };

  for (let i = 0; i < serversToUpdate.length; i++) {
    const serverId = serversToUpdate[i];
    const serverData = database[serverId];
    
    console.log(`\n[${i + 1}/${serversToUpdate.length}] ${serverId}`);
    
    const result = await updateServer(serverId, serverData, options);
    
    if (result.success) {
      results.successful++;
      if (result.updatedData) {
        database[serverId] = result.updatedData;
      }
    } else {
      results.failed++;
      results.errors.push(`${serverId}: ${result.error}`);
    }

    // Add delay between servers to respect rate limits
    if (i < serversToUpdate.length - 1) {
      await delay(CONFIG.requestDelay);
    }
  }

  // Save updated database
  if (results.successful > 0) {
    console.log(`\n💾 Saving updates...`);
    saveDatabase(database, options.dryRun);
  }

  // Show summary
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successful: ${results.successful}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   📄 Total servers: ${serversToUpdate.length}`);

  if (results.errors.length > 0) {
    console.log(`\n⚠️  Errors:`);
    results.errors.forEach(error => console.log(`   - ${error}`));
  }

  if (options.dryRun) {
    console.log(`\n🔍 This was a dry run. No changes were made.`);
    console.log(`💡 Run without --dry-run to apply updates.`);
  }

  console.log(`\n🎉 Update process completed!`);
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error(`💥 Fatal error: ${error.message}`);
    process.exit(1);
  });
}