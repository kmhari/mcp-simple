const fs = require('fs');
const path = require('path');

// Function to normalize names for matching (same as in merge-logos.js)
function normalizeServerName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric characters
    .trim();
}

// Function to extract potential GitHub repo from various URL patterns
function extractGitHubRepo(url) {
  if (!url) return null;
  
  const githubMatch = url.match(/github\.com\/([^\/]+\/[^\/]+)/);
  if (githubMatch) {
    return githubMatch[1].replace(/\.git$/, '').toLowerCase();
  }
  return null;
}

// Function to normalize GitHub links for comparison
function normalizeGitHubLink(link) {
  if (!link) return null;
  
  const repo = extractGitHubRepo(link);
  if (!repo) return null;
  
  return repo.toLowerCase();
}

// Function to check if names are similar (fuzzy matching)
function areNamesSimilar(name1, name2) {
  const n1 = normalizeServerName(name1);
  const n2 = normalizeServerName(name2);
  
  // Exact match
  if (n1 === n2) return true;
  
  // Check if one contains the other
  if (n1.length > 3 && n2.length > 3) {
    if (n1.includes(n2) || n2.includes(n1)) return true;
  }
  
  // Check for partial matches (at least 4 characters and 70% similarity)
  if (n1.length >= 4 && n2.length >= 4) {
    const shorter = n1.length < n2.length ? n1 : n2;
    const longer = n1.length >= n2.length ? n1 : n2;
    
    if (longer.includes(shorter)) return true;
  }
  
  return false;
}

// Load all offset servers with logos
const offsetDir = 'data/mcps_data';
const files = fs.readdirSync(offsetDir).filter(f => f.endsWith('.json'));

let allOffsetServers = [];
files.forEach(file => {
  const data = JSON.parse(fs.readFileSync(path.join(offsetDir, file), 'utf8'));
  allOffsetServers = allOffsetServers.concat(data);
});

// Filter to only servers with logos
const serversWithLogos = allOffsetServers.filter(server => 
  server.logo && server.logo.trim() !== ''
);

console.log(`Found ${serversWithLogos.length} servers with logos in offset files`);

// Load database
const database = JSON.parse(fs.readFileSync('mcp-servers-database.json', 'utf8'));

// Find servers with logos that were NOT matched
const unmatchedServers = [];

serversWithLogos.forEach(offsetServer => {
  let matched = false;
  
  // Try to find a match in the database using the same logic as merge script
  for (const [dbKey, dbServer] of Object.entries(database)) {
    // GitHub link matching
    if (dbServer.githubLink) {
      const dbRepo = normalizeGitHubLink(dbServer.githubLink);
      const offsetRepo = normalizeGitHubLink(offsetServer.link);
      if (dbRepo && offsetRepo && dbRepo === offsetRepo) {
        matched = true;
        break;
      }
    }
    
    // Name matching
    if (areNamesSimilar(dbServer.name, offsetServer.name)) {
      matched = true;
      break;
    }
    
    // Key matching
    if (areNamesSimilar(dbKey, offsetServer.name)) {
      matched = true;
      break;
    }
  }
  
  if (!matched) {
    unmatchedServers.push(offsetServer);
  }
});

console.log(`\nFound ${unmatchedServers.length} servers with logos that were NOT matched:`);
console.log('='.repeat(80));

unmatchedServers.slice(0, 20).forEach((server, i) => {
  console.log(`${i + 1}. ${server.name}`);
  console.log(`   Link: ${server.link}`);
  console.log(`   Logo: ${server.logo}`);
  console.log('');
});

if (unmatchedServers.length > 20) {
  console.log(`... and ${unmatchedServers.length - 20} more`);
}

// Let's also check for potential new matches by being more lenient
console.log('\n=== POTENTIAL MATCHES (more lenient matching) ===');
let potentialMatches = 0;

unmatchedServers.slice(0, 10).forEach(offsetServer => {
  console.log(`\nLooking for matches for: "${offsetServer.name}"`);
  
  Object.entries(database).forEach(([dbKey, dbServer]) => {
    const offsetName = normalizeServerName(offsetServer.name);
    const dbName = normalizeServerName(dbServer.name);
    const dbKeyNorm = normalizeServerName(dbKey);
    
    // Very lenient matching - any substring match
    if (offsetName.length > 4 && dbName.length > 4) {
      if (offsetName.includes(dbName.substring(0, Math.min(6, dbName.length))) ||
          dbName.includes(offsetName.substring(0, Math.min(6, offsetName.length))) ||
          offsetName.includes(dbKeyNorm.substring(0, Math.min(6, dbKeyNorm.length))) ||
          dbKeyNorm.includes(offsetName.substring(0, Math.min(6, offsetName.length)))) {
        console.log(`  Potential match: "${dbServer.name}" (${dbKey})`);
        potentialMatches++;
      }
    }
  });
});

console.log(`\nTotal potential matches found: ${potentialMatches}`);