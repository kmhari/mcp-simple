#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const path = require('path');

// GitHub Stars Fetcher for MCP Servers
// 
// Usage:
//   node fetch-github-stars.js              # Fetch all stars (full update)
//   node fetch-github-stars.js --stale      # Update only stale data (30+ days old)
//   node fetch-github-stars.js --stale --days 7   # Update data older than 7 days
//
// NPM Scripts:
//   npm run fetch-stars         # Full update
//   npm run update-stale-stars  # Update 30+ day old data
//   npm run update-stars-7d     # Update 7+ day old data
//   npm run update-stars-14d    # Update 14+ day old data

// Read the MCP servers database
const serversData = JSON.parse(fs.readFileSync('mcp-servers-database.json', 'utf8'));

// Function to extract owner and repo from GitHub URL
function parseGitHubUrl(url) {
  if (!url) return null;
  
  const patterns = [
    /github\.com\/([^\/]+)\/([^\/]+)/,
    /github\.com\/([^\/]+)\/([^\/]+)\/tree\/main\/src\/([^\/]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        owner: match[1],
        repo: match[2]
      };
    }
  }
  return null;
}

// Function to fetch GitHub repository information
function fetchGitHubInfo(owner, repo) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}`,
      method: 'GET',
      headers: {
        'User-Agent': 'MCP-Stars-Fetcher',
        'Accept': 'application/vnd.github.v3+json'
      }
    };

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
              name: parsed.name,
              full_name: parsed.full_name,
              description: parsed.description,
              stars: parsed.stargazers_count,
              forks: parsed.forks_count,
              language: parsed.language,
              updated_at: parsed.updated_at,
              created_at: parsed.created_at,
              url: parsed.html_url
            });
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.message || 'Unknown error'}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Function to add delay between requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function to fetch all stars
async function fetchAllStars() {
  const results = {};
  const errors = [];
  
  console.log('Fetching GitHub stars information...\n');
  
  for (const [serverId, serverInfo] of Object.entries(serversData)) {
    const githubInfo = parseGitHubUrl(serverInfo.githubLink);
    
    if (!githubInfo) {
      console.log(`❌ ${serverId}: Invalid or missing GitHub URL`);
      errors.push(`${serverId}: Invalid GitHub URL`);
      continue;
    }
    
    try {
      console.log(`🔍 Fetching ${serverId} (${githubInfo.owner}/${githubInfo.repo})...`);
      const repoInfo = await fetchGitHubInfo(githubInfo.owner, githubInfo.repo);
      
      results[serverId] = {
        ...serverInfo,
        github: {
          owner: githubInfo.owner,
          repo: githubInfo.repo,
          ...repoInfo,
          fetched_at: new Date().toISOString()
        }
      };
      
      console.log(`✅ ${serverId}: ${repoInfo.stars} stars`);
      
      // Add delay to respect GitHub API rate limits
      await delay(1000);
      
    } catch (error) {
      console.log(`❌ ${serverId}: ${error.message}`);
      errors.push(`${serverId}: ${error.message}`);
      
      // Still include the server data without GitHub info
      results[serverId] = {
        ...serverInfo,
        github: {
          owner: githubInfo.owner,
          repo: githubInfo.repo,
          error: error.message,
          fetched_at: new Date().toISOString()
        }
      };
    }
  }
  
  // Save results to JSON file
  const outputFile = 'mcp-servers-with-stars.json';
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  
  console.log(`\n📄 Results saved to ${outputFile}`);
  console.log(`✅ Successfully processed ${Object.keys(results).length} servers`);
  
  if (errors.length > 0) {
    console.log(`\n⚠️  Errors encountered:`);
    errors.forEach(error => console.log(`  - ${error}`));
  }
  
  // Generate summary
  const successful = Object.values(results).filter(r => r.github && r.github.stars !== undefined);
  const totalStars = successful.reduce((sum, r) => sum + r.github.stars, 0);
  const avgStars = successful.length > 0 ? Math.round(totalStars / successful.length) : 0;
  
  console.log(`\n📊 Summary:`);
  console.log(`  Total servers: ${Object.keys(results).length}`);
  console.log(`  Successful fetches: ${successful.length}`);
  console.log(`  Total stars: ${totalStars.toLocaleString()}`);
  console.log(`  Average stars: ${avgStars.toLocaleString()}`);
  
  // Sort by stars and show top 5
  const topServers = successful
    .sort((a, b) => b.github.stars - a.github.stars)
    .slice(0, 5);
    
  if (topServers.length > 0) {
    console.log(`\n🌟 Top 5 most starred servers:`);
    topServers.forEach((server, index) => {
      const serverId = Object.keys(results).find(key => results[key] === server);
      console.log(`  ${index + 1}. ${server.name} (${serverId}): ${server.github.stars.toLocaleString()} stars`);
    });
  }
}

// Check if GitHub token is available (optional but recommended)
if (process.env.GITHUB_TOKEN) {
  console.log('🔑 Using GitHub token for higher rate limits');
} else {
  console.log('ℹ️  No GitHub token provided. Using anonymous API access (60 requests/hour limit)');
  console.log('   Set GITHUB_TOKEN environment variable for higher rate limits');
}

// Function to check if star data is older than specified days
function isDataStale(fetchedAt, maxAgeDays = 30) {
  if (!fetchedAt) return true; // No timestamp means stale
  
  const fetchedDate = new Date(fetchedAt);
  const now = new Date();
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  
  return (now - fetchedDate) > maxAgeMs;
}

// Function to update only stale star data
async function updateStaleStars(maxAgeDays = 30) {
  const existingStarsFile = 'mcp-servers-with-stars.json';
  
  // Load existing star data if it exists
  let existingData = {};
  if (fs.existsSync(existingStarsFile)) {
    try {
      existingData = JSON.parse(fs.readFileSync(existingStarsFile, 'utf8'));
      console.log(`📖 Loaded existing star data from ${existingStarsFile}`);
    } catch (error) {
      console.log(`⚠️  Could not load existing star data: ${error.message}`);
    }
  }
  
  const results = { ...existingData };
  const errors = [];
  const staleServers = [];
  
  console.log(`🔍 Checking for star data older than ${maxAgeDays} days...\n`);
  
  // Check which servers need updates
  for (const [serverId, serverInfo] of Object.entries(serversData)) {
    const existingServer = existingData[serverId];
    const fetchedAt = existingServer?.github?.fetched_at;
    
    if (isDataStale(fetchedAt, maxAgeDays)) {
      staleServers.push(serverId);
      const ageText = fetchedAt ? 
        `${Math.ceil((new Date() - new Date(fetchedAt)) / (24 * 60 * 60 * 1000))} days old` : 
        'no data';
      console.log(`📅 ${serverId}: ${ageText} - needs update`);
    } else {
      const daysOld = Math.ceil((new Date() - new Date(fetchedAt)) / (24 * 60 * 60 * 1000));
      console.log(`✅ ${serverId}: ${daysOld} days old - fresh`);
    }
  }
  
  if (staleServers.length === 0) {
    console.log('\n🎉 All star data is fresh! No updates needed.');
    return;
  }
  
  console.log(`\n🔄 Updating ${staleServers.length} servers with stale data...\n`);
  
  // Update only stale servers
  for (const serverId of staleServers) {
    const serverInfo = serversData[serverId];
    const githubInfo = parseGitHubUrl(serverInfo.githubLink);
    
    if (!githubInfo) {
      console.log(`❌ ${serverId}: Invalid or missing GitHub URL`);
      errors.push(`${serverId}: Invalid GitHub URL`);
      continue;
    }
    
    try {
      console.log(`🔍 Updating ${serverId} (${githubInfo.owner}/${githubInfo.repo})...`);
      const repoInfo = await fetchGitHubInfo(githubInfo.owner, githubInfo.repo);
      
      results[serverId] = {
        ...serverInfo,
        github: {
          owner: githubInfo.owner,
          repo: githubInfo.repo,
          ...repoInfo,
          fetched_at: new Date().toISOString()
        }
      };
      
      console.log(`✅ ${serverId}: ${repoInfo.stars} stars (updated)`);
      
      // Add delay to respect GitHub API rate limits
      await delay(1000);
      
    } catch (error) {
      console.log(`❌ ${serverId}: ${error.message}`);
      errors.push(`${serverId}: ${error.message}`);
      
      // Keep existing data if update fails
      if (existingData[serverId]) {
        results[serverId] = existingData[serverId];
      }
    }
  }
  
  // Save updated results
  fs.writeFileSync(existingStarsFile, JSON.stringify(results, null, 2));
  
  console.log(`\n📄 Updated results saved to ${existingStarsFile}`);
  console.log(`✅ Successfully updated ${staleServers.length - errors.length}/${staleServers.length} stale servers`);
  
  if (errors.length > 0) {
    console.log(`\n⚠️  Errors encountered:`);
    errors.forEach(error => console.log(`  - ${error}`));
  }
  
  // Generate summary
  const successful = Object.values(results).filter(r => r.github && r.github.stars !== undefined);
  const totalStars = successful.reduce((sum, r) => sum + r.github.stars, 0);
  
  console.log(`\n📊 Summary:`);
  console.log(`  Total servers: ${Object.keys(results).length}`);
  console.log(`  Fresh data: ${successful.length}`);
  console.log(`  Total stars: ${totalStars.toLocaleString()}`);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
GitHub Stars Fetcher for MCP Servers

Usage:
  node fetch-github-stars.js [options]

Options:
  --stale              Update only stale data (default: 30+ days old)
  --days <number>      Set custom staleness threshold in days (use with --stale)
  --help, -h           Show this help message

Examples:
  node fetch-github-stars.js                    # Full update (all servers)
  node fetch-github-stars.js --stale            # Update servers with data older than 30 days
  node fetch-github-stars.js --stale --days 7   # Update servers with data older than 7 days

NPM Scripts:
  npm run fetch-stars         # Full update
  npm run update-stale-stars  # Update 30+ day old data
  npm run update-stars-7d     # Update 7+ day old data
  npm run update-stars-14d    # Update 14+ day old data

Environment Variables:
  GITHUB_TOKEN                Set to increase API rate limits (recommended)

Notes:
  - Without GITHUB_TOKEN: 60 requests/hour
  - With GITHUB_TOKEN: 5000+ requests/hour
  - Stale mode preserves fresh data and only updates old/missing data
  - All timestamps are in ISO 8601 format (fetched_at field)
`);
  process.exit(0);
}

const isStaleUpdate = args.includes('--stale') || args.includes('--update-stale');
const maxAgeDays = args.includes('--days') ? 
  parseInt(args[args.indexOf('--days') + 1]) || 30 : 30;

// Check if GitHub token is available (optional but recommended)
if (process.env.GITHUB_TOKEN) {
  console.log('🔑 Using GitHub token for higher rate limits');
} else {
  console.log('ℹ️  No GitHub token provided. Using anonymous API access (60 requests/hour limit)');
  console.log('   Set GITHUB_TOKEN environment variable for higher rate limits');
}

// Run the appropriate script based on arguments
if (isStaleUpdate) {
  console.log(`🕐 Running stale update mode (max age: ${maxAgeDays} days)\n`);
  updateStaleStars(maxAgeDays).catch(console.error);
} else {
  console.log('🔄 Running full update mode\n');
  fetchAllStars().catch(console.error);
}