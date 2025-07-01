#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const path = require('path');

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
          ...repoInfo
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
          error: error.message
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

// Run the script
fetchAllStars().catch(console.error);