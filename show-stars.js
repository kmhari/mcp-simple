#!/usr/bin/env node

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Display GitHub Stars Data from MCP Servers Database
 * 
 * This script reads the stars data directly from mcp-servers-database.json
 * and displays it in various formats and statistics.
 * 
 * Usage:
 *   node show-stars.js                    # Show top 20 servers by stars
 *   node show-stars.js --all              # Show all servers with stars
 *   node show-stars.js --top 50           # Show top 50 servers
 *   node show-stars.js --summary          # Show statistics summary only
 *   node show-stars.js --csv              # Export to CSV format
 *   node show-stars.js --json             # Export to JSON format
 *   node show-stars.js --category web     # Filter by category
 *   node show-stars.js --min-stars 1000  # Show servers with 1000+ stars
 */

const DATABASE_FILE = path.join(__dirname, 'mcp-servers-database.json');

// Parse command line arguments
const args = process.argv.slice(2);

const showAll = args.includes('--all');
const showSummaryOnly = args.includes('--summary');
const exportCsv = args.includes('--csv');
const exportJson = args.includes('--json');

const topIndex = args.indexOf('--top');
const topCount = topIndex !== -1 && topIndex + 1 < args.length ? 
  parseInt(args[topIndex + 1]) || 20 : 20;

const categoryIndex = args.indexOf('--category');
const categoryFilter = categoryIndex !== -1 && categoryIndex + 1 < args.length ? 
  args[categoryIndex + 1] : null;

const minStarsIndex = args.indexOf('--min-stars');
const minStars = minStarsIndex !== -1 && minStarsIndex + 1 < args.length ? 
  parseInt(args[minStarsIndex + 1]) || 0 : 0;

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
GitHub Stars Data Display for MCP Servers

Usage:
  node show-stars.js [options]

Options:
  --all                Show all servers with stars (instead of top 20)
  --top <number>       Show top N servers by stars (default: 20)
  --summary            Show statistics summary only
  --csv                Export data to CSV format
  --json               Export data to JSON format
  --category <name>    Filter by category (e.g., 'Web Scraping', 'Development')
  --min-stars <number> Show only servers with minimum star count
  --help, -h           Show this help message

Examples:
  node show-stars.js                      # Top 20 most starred servers
  node show-stars.js --top 50             # Top 50 most starred servers  
  node show-stars.js --all                # All servers with GitHub stars
  node show-stars.js --category Development # Development category servers
  node show-stars.js --min-stars 1000     # Servers with 1000+ stars
  node show-stars.js --csv > stars.csv    # Export to CSV file
  node show-stars.js --summary            # Just show statistics

Data Sources:
  - Stars count from GitHub API
  - Server data from mcp-servers-database.json
  - Last updated timestamps included
`);
  process.exit(0);
}

/**
 * Load and process server data from database
 */
function loadServerData() {
  if (!fs.existsSync(DATABASE_FILE)) {
    throw new Error(`Database file not found: ${DATABASE_FILE}`);
  }

  const database = JSON.parse(fs.readFileSync(DATABASE_FILE, 'utf8'));
  
  // Convert to array and filter/process servers
  const servers = [];
  
  for (const [serverId, serverData] of Object.entries(database)) {
    // Skip servers without GitHub links or with 0 stars
    if (!serverData.githubLink || serverData.stars === undefined) {
      continue;
    }

    // Apply category filter
    if (categoryFilter && serverData.category !== categoryFilter) {
      continue;
    }

    // Apply minimum stars filter
    if (serverData.stars < minStars) {
      continue;
    }

    servers.push({
      id: serverId,
      name: serverData.name,
      stars: serverData.stars || 0,
      category: serverData.category || 'Uncategorized',
      githubLink: serverData.githubLink,
      package: serverData.package || '',
      description: serverData.description || '',
      lastStarUpdate: serverData.lastStarUpdate,
      updated_at: serverData.updated_at
    });
  }

  // Sort by stars descending
  servers.sort((a, b) => b.stars - a.stars);
  
  return servers;
}

/**
 * Display statistics summary
 */
function displaySummary(servers, allServers) {
  const totalServers = Object.keys(allServers).length;
  const serversWithGithub = servers.length;
  const totalStars = servers.reduce((sum, server) => sum + server.stars, 0);
  const avgStars = serversWithGithub > 0 ? Math.round(totalStars / serversWithGithub) : 0;
  
  const categories = {};
  servers.forEach(server => {
    categories[server.category] = (categories[server.category] || 0) + 1;
  });

  const recentlyUpdated = servers.filter(server => {
    if (!server.lastStarUpdate) return false;
    const lastUpdate = new Date(server.lastStarUpdate);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return lastUpdate > weekAgo;
  }).length;

  console.log('📊 MCP Servers GitHub Stars Summary');
  console.log(''.padEnd(50, '='));
  console.log(`📦 Total servers in database: ${totalServers.toLocaleString()}`);
  console.log(`🔗 Servers with GitHub links: ${serversWithGithub.toLocaleString()}`);
  console.log(`⭐ Total GitHub stars: ${totalStars.toLocaleString()}`);
  console.log(`📈 Average stars per server: ${avgStars.toLocaleString()}`);
  console.log(`🔄 Recently updated (7 days): ${recentlyUpdated.toLocaleString()}`);
  
  if (Object.keys(categories).length > 0) {
    console.log('\n📂 Servers by Category:');
    Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([category, count]) => {
        console.log(`   ${category}: ${count.toLocaleString()}`);
      });
  }

  const topStarred = servers.slice(0, 5);
  if (topStarred.length > 0) {
    console.log('\n🌟 Top 5 Most Starred:');
    topStarred.forEach((server, index) => {
      console.log(`   ${index + 1}. ${server.name}: ${server.stars.toLocaleString()} stars`);
    });
  }
}

/**
 * Display servers in table format
 */
function displayTable(servers, count) {
  const displayCount = showAll ? servers.length : Math.min(count, servers.length);
  const serversToShow = servers.slice(0, displayCount);

  console.log(`\n🚀 ${showAll ? 'All' : `Top ${displayCount}`} MCP Servers by GitHub Stars`);
  console.log(''.padEnd(100, '='));
  
  // Table header
  console.log(
    'Rank'.padEnd(6) +
    'Stars'.padEnd(8) + 
    'Name'.padEnd(35) + 
    'Category'.padEnd(20) + 
    'Last Updated'
  );
  console.log(''.padEnd(100, '-'));

  serversToShow.forEach((server, index) => {
    const rank = (index + 1).toString().padEnd(6);
    const stars = server.stars.toLocaleString().padEnd(8);
    const name = server.name.length > 33 ? 
      server.name.substring(0, 30) + '...' : 
      server.name.padEnd(35);
    const category = server.category.length > 18 ? 
      server.category.substring(0, 15) + '...' : 
      server.category.padEnd(20);
    
    let lastUpdate = 'Never';
    if (server.lastStarUpdate) {
      const updateDate = new Date(server.lastStarUpdate);
      const daysAgo = Math.ceil((new Date() - updateDate) / (24 * 60 * 60 * 1000));
      lastUpdate = daysAgo === 0 ? 'Today' : 
                   daysAgo === 1 ? '1 day ago' : 
                   daysAgo < 30 ? `${daysAgo} days ago` :
                   `${Math.ceil(daysAgo/30)} months ago`;
    }

    console.log(`${rank}${stars}${name}${category}${lastUpdate}`);
  });

  console.log(''.padEnd(100, '='));
  console.log(`Showing ${displayCount} of ${servers.length} servers with GitHub stars`);
}

/**
 * Export to CSV format
 */
function exportToCsv(servers) {
  const headers = [
    'Rank',
    'Server ID', 
    'Name',
    'Stars',
    'Category',
    'GitHub Link',
    'Package',
    'Description',
    'Last Star Update',
    'Updated At'
  ];

  console.log(headers.join(','));
  
  servers.forEach((server, index) => {
    const row = [
      index + 1,
      server.id,
      `"${server.name.replace(/"/g, '""')}"`,
      server.stars,
      `"${server.category.replace(/"/g, '""')}"`,
      server.githubLink,
      `"${server.package.replace(/"/g, '""')}"`,
      `"${server.description.replace(/"/g, '""')}"`,
      server.lastStarUpdate || '',
      server.updated_at || ''
    ];
    
    console.log(row.join(','));
  });
}

/**
 * Export to JSON format
 */
function exportToJson(servers) {
  const jsonData = {
    generated_at: new Date().toISOString(),
    total_servers: servers.length,
    total_stars: servers.reduce((sum, server) => sum + server.stars, 0),
    filters: {
      category: categoryFilter,
      min_stars: minStars
    },
    servers: servers.map((server, index) => ({
      rank: index + 1,
      ...server
    }))
  };

  console.log(JSON.stringify(jsonData, null, 2));
}

/**
 * Main function
 */
function main() {
  try {
    console.log('📖 Loading MCP servers database...');
    
    const database = JSON.parse(fs.readFileSync(DATABASE_FILE, 'utf8'));
    const servers = loadServerData();
    
    if (servers.length === 0) {
      console.log('❌ No servers found matching the specified criteria.');
      return;
    }

    if (exportCsv) {
      exportToCsv(servers);
    } else if (exportJson) {
      exportToJson(servers);
    } else {
      displaySummary(servers, database);
      
      if (!showSummaryOnly) {
        displayTable(servers, topCount);
        
        console.log('\n💡 Tips:');
        console.log('   • Use --csv to export data');
        console.log('   • Use --category <name> to filter by category');
        console.log('   • Use --min-stars <number> to filter by star count');
        console.log('   • Use --help for more options');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();