#!/usr/bin/env node

import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Enhanced GitHub Stars Updater for MCP Servers Database
 * 
 * Features:
 * - Updates stars directly in mcp-servers-database.json
 * - Uses GitHub authentication token for higher rate limits
 * - Adds updated_at timestamp to each server entry
 * - Smart rate limiting and error handling
 * - Supports stale-only updates to minimize API usage
 * 
 * Usage:
 *   node update-database-stars.js              # Update all servers
 *   node update-database-stars.js --stale      # Update only stale data (7+ days old)
 *   node update-database-stars.js --stale --days 14   # Update data older than 14 days
 *   node update-database-stars.js --dry-run    # Preview changes without saving
 * 
 * Environment Variables:
 *   GITHUB_TOKEN                Set for authenticated API access (recommended)
 */

// Parse command line arguments
const args = process.argv.slice(2);

// Configuration
const DEFAULT_STALE_DAYS = 7;
const REQUEST_DELAY_MS = 1000; // Delay between API requests
const REQUEST_TIMEOUT_MS = 10000;
const DATABASE_FILE = path.join(__dirname, 'mcp-servers-database.json');

const isStaleUpdate = args.includes('--stale');
const isDryRun = args.includes('--dry-run');
const daysIndex = args.indexOf('--days');
const staleDays = daysIndex !== -1 && daysIndex + 1 < args.length ? 
  parseInt(args[daysIndex + 1]) || DEFAULT_STALE_DAYS : DEFAULT_STALE_DAYS;

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Enhanced GitHub Stars Updater for MCP Servers Database

Usage:
  node update-database-stars.js [options]

Options:
  --stale              Update only stale data (default: 7+ days old)
  --days <number>      Set custom staleness threshold in days (use with --stale)
  --dry-run            Preview changes without saving to database
  --help, -h           Show this help message

Examples:
  node update-database-stars.js                    # Update all servers
  node update-database-stars.js --stale            # Update servers with data older than 7 days
  node update-database-stars.js --stale --days 14  # Update servers with data older than 14 days
  node update-database-stars.js --dry-run          # Preview all updates without saving

Environment Variables:
  GITHUB_TOKEN         GitHub personal access token (recommended for higher rate limits)
                       Without token: 60 requests/hour
                       With token: 5000+ requests/hour

Notes:
  - Updates mcp-servers-database.json directly
  - Adds 'updated_at' timestamp to each server entry
  - Preserves all existing server data and only updates star counts
  - Uses intelligent rate limiting to respect GitHub API limits
`);
  process.exit(0);
}

// Check for GitHub token
const githubToken = process.env.GITHUB_TOKEN;
if (githubToken) {
  console.log('🔑 Using GitHub token for authenticated API access (5000+ requests/hour)');
} else {
  console.log('⚠️  No GitHub token provided. Using anonymous API access (60 requests/hour limit)');
  console.log('   Set GITHUB_TOKEN environment variable for higher rate limits');
}

/**
 * Extract owner and repo from GitHub URL
 */
function parseGitHubUrl(url) {
  if (!url) return null;
  
  const patterns = [
    /github\.com\/([^\/]+)\/([^\/]+)/,
    /github\.com\/([^\/]+)\/([^\/]+)\/tree\/main\/src\/([^\/]+)/,
    /github\.com\/([^\/]+)\/([^\/]+)\.git/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        owner: match[1],
        repo: match[2].replace(/\.git$/, '') // Remove .git suffix if present
      };
    }
  }
  return null;
}

/**
 * Fetch GitHub repository star count using GitHub API
 */
function fetchGitHubStars(owner, repo) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}`,
      method: 'GET',
      headers: {
        'User-Agent': 'MCP-Database-Stars-Updater',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    // Add authorization header if token is available
    if (githubToken) {
      options.headers['Authorization'] = `token ${githubToken}`;
    }

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          
          if (res.statusCode === 200) {
            resolve({
              stars: parsed.stargazers_count,
              forks: parsed.forks_count,
              language: parsed.language,
              repo_updated_at: parsed.updated_at,
              repo_created_at: parsed.created_at
            });
          } else if (res.statusCode === 404) {
            reject(new Error(`Repository not found: ${owner}/${repo}`));
          } else if (res.statusCode === 403) {
            reject(new Error(`Rate limit exceeded or access forbidden: ${parsed.message || 'Unknown error'}`));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.message || 'Unknown error'}`));
          }
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Add delay between requests to respect rate limits
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if star data is older than specified days
 */
function isDataStale(lastStarUpdate, maxAgeDays) {
  if (!lastStarUpdate) return true; // No timestamp means stale
  
  const lastUpdate = new Date(lastStarUpdate);
  const now = new Date();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  
  return (now - lastUpdate) > maxAgeMs;
}

/**
 * Main function to update database stars
 */
async function updateDatabaseStars() {
  console.log(`🚀 Starting database stars update...`);
  console.log(`📁 Database file: ${DATABASE_FILE}`);
  console.log(`⚙️  Mode: ${isStaleUpdate ? `Stale only (${staleDays}+ days)` : 'All servers'}`);
  console.log(`🔍 Dry run: ${isDryRun ? 'Yes (no changes will be saved)' : 'No'}`);
  console.log('');

  // Load the database
  if (!fs.existsSync(DATABASE_FILE)) {
    throw new Error(`Database file not found: ${DATABASE_FILE}`);
  }

  const database = JSON.parse(fs.readFileSync(DATABASE_FILE, 'utf8'));
  const totalServers = Object.keys(database).length;
  console.log(`📊 Loaded database with ${totalServers} servers`);

  // Filter servers that need updates
  const serversToUpdate = [];
  const skippedServers = [];

  for (const [serverId, serverData] of Object.entries(database)) {
    const githubInfo = parseGitHubUrl(serverData.githubLink);
    
    if (!githubInfo) {
      skippedServers.push({ serverId, reason: 'No valid GitHub URL' });
      continue;
    }

    if (isStaleUpdate && !isDataStale(serverData.lastStarUpdate, staleDays)) {
      const lastUpdate = serverData.lastStarUpdate ? 
        Math.ceil((new Date() - new Date(serverData.lastStarUpdate)) / (24 * 60 * 60 * 1000)) : 
        'never';
      skippedServers.push({ 
        serverId, 
        reason: `Fresh data (last updated ${lastUpdate === 'never' ? 'never' : lastUpdate + ' days ago'})` 
      });
      continue;
    }

    serversToUpdate.push({
      serverId,
      serverData,
      githubInfo
    });
  }

  console.log(`🎯 Servers to update: ${serversToUpdate.length}`);
  console.log(`⏭️  Servers to skip: ${skippedServers.length}`);
  
  if (skippedServers.length > 0 && skippedServers.length <= 10) {
    console.log('\n📋 Skipped servers:');
    skippedServers.forEach(({ serverId, reason }) => {
      console.log(`   • ${serverId}: ${reason}`);
    });
  }

  if (serversToUpdate.length === 0) {
    console.log('\n🎉 All servers are up to date! No updates needed.');
    return;
  }

  console.log(`\n🔄 ${isDryRun ? 'Simulating' : 'Starting'} updates...\n`);

  // Track results
  const results = {
    updated: 0,
    errors: 0,
    unchanged: 0,
    totalStars: 0
  };
  const errors = [];

  // Update each server
  for (let i = 0; i < serversToUpdate.length; i++) {
    const { serverId, serverData, githubInfo } = serversToUpdate[i];
    const progress = `[${i + 1}/${serversToUpdate.length}]`;
    
    try {
      console.log(`${progress} 🔍 Fetching ${serverId} (${githubInfo.owner}/${githubInfo.repo})...`);
      
      const repoInfo = await fetchGitHubStars(githubInfo.owner, githubInfo.repo);
      const currentStars = serverData.stars || 0;
      const newStars = repoInfo.stars;
      
      // Update the server data
      const oldData = { ...serverData };
      serverData.stars = newStars;
      serverData.lastStarUpdate = new Date().toISOString();
      serverData.updated_at = new Date().toISOString();
      
      // Track changes
      if (newStars !== currentStars) {
        const change = newStars - currentStars;
        const changeText = change > 0 ? `+${change}` : change.toString();
        console.log(`${progress} ✅ ${serverId}: ${currentStars} → ${newStars} stars (${changeText})`);
        results.updated++;
      } else {
        console.log(`${progress} ✅ ${serverId}: ${newStars} stars (no change)`);
        results.unchanged++;
      }
      
      results.totalStars += newStars;
      
    } catch (error) {
      console.log(`${progress} ❌ ${serverId}: ${error.message}`);
      errors.push(`${serverId}: ${error.message}`);
      results.errors++;
      
      // Still add updated_at timestamp even if star fetch failed
      if (!isDryRun) {
        serverData.updated_at = new Date().toISOString();
      }
    }
    
    // Add delay between requests (except for the last one)
    if (i < serversToUpdate.length - 1) {
      await delay(REQUEST_DELAY_MS);
    }
  }

  // Save the updated database
  if (!isDryRun) {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(database, null, 2));
    console.log(`\n💾 Database updated and saved to: ${DATABASE_FILE}`);
  } else {
    console.log(`\n🔍 Dry run completed - no changes saved to database`);
  }

  // Display summary
  console.log('\n📈 Update Summary:');
  console.log(`   Total servers processed: ${serversToUpdate.length}`);
  console.log(`   ✅ Successfully updated: ${results.updated}`);
  console.log(`   ⚪ Unchanged: ${results.unchanged}`);
  console.log(`   ❌ Errors: ${results.errors}`);
  console.log(`   ⏭️  Skipped: ${skippedServers.length}`);
  console.log(`   ⭐ Total stars: ${results.totalStars.toLocaleString()}`);
  
  if (results.updated > 0) {
    const avgStars = Math.round(results.totalStars / (results.updated + results.unchanged));
    console.log(`   📊 Average stars: ${avgStars.toLocaleString()}`);
  }

  if (errors.length > 0) {
    console.log('\n⚠️  Errors encountered:');
    errors.slice(0, 10).forEach(error => console.log(`   • ${error}`));
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more errors`);
    }
  }

  // Show rate limit status if using token
  if (githubToken) {
    console.log(`\n💡 Tip: Check your GitHub API rate limit at https://api.github.com/rate_limit`);
  }

  console.log('\n🎉 Stars update completed!');
}

// Run the updater
updateDatabaseStars().catch(error => {
  console.error('\n💥 Fatal error:', error.message);
  process.exit(1);
});