import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to normalize names for matching
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

// Function to find matching server in offset data
function findMatchingServer(dbServer, dbKey, offsetServers) {
  // First try GitHub link matching (most reliable)
  if (dbServer.githubLink) {
    const dbRepo = normalizeGitHubLink(dbServer.githubLink);
    if (dbRepo) {
      for (const offsetServer of offsetServers) {
        const offsetRepo = normalizeGitHubLink(offsetServer.link);
        if (offsetRepo && dbRepo === offsetRepo) {
          return offsetServer;
        }
      }
    }
  }
  
  // Then try name matching
  for (const offsetServer of offsetServers) {
    if (areNamesSimilar(dbServer.name, offsetServer.name)) {
      return offsetServer;
    }
  }
  
  // Finally try key matching with offset names
  for (const offsetServer of offsetServers) {
    if (areNamesSimilar(dbKey, offsetServer.name)) {
      return offsetServer;
    }
  }
  
  return null;
}

async function mergeLogos() {
  console.log('🔄 Starting logo merge process...');
  
  // Load the main database
  const databasePath = path.join(__dirname, 'mcp-servers-database.json');
  if (!fs.existsSync(databasePath)) {
    throw new Error('Database file not found: ' + databasePath);
  }
  
  const database = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
  console.log(`📊 Loaded database with ${Object.keys(database).length} servers`);
  
  // Load all offset files
  const offsetDir = path.join(__dirname, 'data', 'mcps_data');
  const offsetFiles = fs.readdirSync(offsetDir).filter(file => file.startsWith('mcps_offset_') && file.endsWith('.json'));
  
  console.log(`📁 Found ${offsetFiles.length} offset files`);
  
  let allOffsetServers = [];
  for (const file of offsetFiles) {
    const filePath = path.join(offsetDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allOffsetServers = allOffsetServers.concat(data);
  }
  
  console.log(`🔍 Loaded ${allOffsetServers.length} servers from offset files`);
  
  // Track matching statistics
  let matched = 0;
  let logoAdded = 0;
  let logoUpdated = 0;
  let noLogo = 0;
  
  // Process each server in the database
  for (const [dbKey, dbServer] of Object.entries(database)) {
    const matchingServer = findMatchingServer(dbServer, dbKey, allOffsetServers);
    
    if (matchingServer) {
      matched++;
      
      if (matchingServer.logo && matchingServer.logo.trim() !== '') {
        const hadLogo = dbServer.logo !== undefined;
        dbServer.logo = matchingServer.logo;
        
        if (hadLogo) {
          logoUpdated++;
        } else {
          logoAdded++;
        }
        
        console.log(`✅ ${hadLogo ? 'Updated' : 'Added'} logo for "${dbServer.name}" (${dbKey})`);
      } else {
        noLogo++;
        // Set empty logo if not present to indicate we've checked
        if (dbServer.logo === undefined) {
          dbServer.logo = '';
        }
      }
    } else {
      // Set empty logo if no match found to indicate we've checked
      if (dbServer.logo === undefined) {
        dbServer.logo = '';
      }
      console.log(`⚠️  No match found for "${dbServer.name}" (${dbKey})`);
    }
  }
  
  // Save the updated database
  fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
  
  console.log('\n📈 Logo merge completed!');
  console.log(`🔗 Total servers in database: ${Object.keys(database).length}`);
  console.log(`✅ Servers matched: ${matched}`);
  console.log(`🖼️  Logos added: ${logoAdded}`);
  console.log(`🔄 Logos updated: ${logoUpdated}`);
  console.log(`❌ Matched but no logo: ${noLogo}`);
  console.log(`📝 Database saved to: ${databasePath}`);
}

// Run the merge process
mergeLogos().catch(console.error);