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

// Enhanced name similarity with more fuzzy logic
function areNamesSimilarEnhanced(name1, name2) {
  if (areNamesSimilar(name1, name2)) return true;
  
  const n1 = normalizeServerName(name1);
  const n2 = normalizeServerName(name2);
  
  // Check for common abbreviations and variations
  const commonMappings = {
    'mcp': '',
    'server': '',
    'mcpserver': '',
    'servercontext': '',
    'contextprotocol': '',
    'protocol': '',
    'modelcontext': '',
    'model': ''
  };
  
  let cleaned1 = n1;
  let cleaned2 = n2;
  
  Object.entries(commonMappings).forEach(([pattern, replacement]) => {
    cleaned1 = cleaned1.replace(new RegExp(pattern, 'g'), replacement);
    cleaned2 = cleaned2.replace(new RegExp(pattern, 'g'), replacement);
  });
  
  // Try matching cleaned names
  if (cleaned1 === cleaned2 && cleaned1.length > 3) return true;
  if (cleaned1.length > 4 && cleaned2.length > 4) {
    if (cleaned1.includes(cleaned2) || cleaned2.includes(cleaned1)) return true;
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
  
  // Then try enhanced name matching
  for (const offsetServer of offsetServers) {
    if (areNamesSimilarEnhanced(dbServer.name, offsetServer.name)) {
      return offsetServer;
    }
  }
  
  // Finally try key matching with offset names
  for (const offsetServer of offsetServers) {
    if (areNamesSimilarEnhanced(dbKey, offsetServer.name)) {
      return offsetServer;
    }
  }
  
  return null;
}

// Function to create a safe key from server name
function createSafeKey(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

async function enhancedMergeLogos(options = {}) {
  console.log('🔄 Starting enhanced logo merge process...');
  
  const {
    addNewServers = false,
    dryRun = false,
    verbose = true
  } = options;
  
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
  
  // Filter to only servers with logos
  const offsetServersWithLogos = allOffsetServers.filter(server => 
    server.logo && server.logo.trim() !== ''
  );
  
  console.log(`🖼️  Found ${offsetServersWithLogos.length} servers with logos in offset files`);
  
  // Track matching statistics
  let matched = 0;
  let logoAdded = 0;
  let logoUpdated = 0;
  let noLogo = 0;
  let newServersAdded = 0;
  const unmatchedServers = [];
  
  // Process each server in the database
  for (const [dbKey, dbServer] of Object.entries(database)) {
    const matchingServer = findMatchingServer(dbServer, dbKey, offsetServersWithLogos);
    
    if (matchingServer) {
      matched++;
      
      if (matchingServer.logo && matchingServer.logo.trim() !== '') {
        const hadLogo = dbServer.logo !== undefined && dbServer.logo !== '';
        dbServer.logo = matchingServer.logo;
        
        if (hadLogo) {
          logoUpdated++;
        } else {
          logoAdded++;
        }
        
        if (verbose) {
          console.log(`✅ ${hadLogo ? 'Updated' : 'Added'} logo for "${dbServer.name}" (${dbKey})`);
        }
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
      if (verbose) {
        console.log(`⚠️  No match found for "${dbServer.name}" (${dbKey})`);
      }
    }
  }
  
  // Find unmatched servers from offset files
  for (const offsetServer of offsetServersWithLogos) {
    let foundMatch = false;
    
    for (const [dbKey, dbServer] of Object.entries(database)) {
      if (findMatchingServer(dbServer, dbKey, [offsetServer])) {
        foundMatch = true;
        break;
      }
    }
    
    if (!foundMatch) {
      unmatchedServers.push(offsetServer);
    }
  }
  
  console.log(`\n📊 Found ${unmatchedServers.length} unmatched servers with logos from offset files`);
  
  // Optionally add new servers
  if (addNewServers) {
    console.log('\n🆕 Adding new servers from offset files...');
    
    for (const offsetServer of unmatchedServers) {
      const newKey = createSafeKey(offsetServer.name);
      
      // Check if key already exists
      if (database[newKey]) {
        let counter = 1;
        let uniqueKey = `${newKey}-${counter}`;
        while (database[uniqueKey]) {
          counter++;
          uniqueKey = `${newKey}-${counter}`;
        }
        newKey = uniqueKey;
      }
      
      database[newKey] = {
        name: offsetServer.name,
        githubLink: offsetServer.link.startsWith('https://github.com') ? offsetServer.link : '',
        package: '',
        description: offsetServer.description || '',
        installCommand: '',
        requiredEnvVars: [],
        optionalParams: [],
        usageInstructions: offsetServer.description || '',
        category: 'External',
        stars: 0,
        lastStarUpdate: new Date().toISOString(),
        logo: offsetServer.logo
      };
      
      newServersAdded++;
      
      if (verbose) {
        console.log(`➕ Added new server "${offsetServer.name}" (${newKey})`);
      }
    }
  }
  
  // Save the updated database
  if (!dryRun) {
    fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
    console.log(`💾 Database saved to: ${databasePath}`);
  } else {
    console.log('🔍 DRY RUN - No changes saved');
  }
  
  console.log('\n📈 Enhanced logo merge completed!');
  console.log(`🔗 Total servers in database: ${Object.keys(database).length}`);
  console.log(`✅ Servers matched: ${matched}`);
  console.log(`🖼️  Logos added: ${logoAdded}`);
  console.log(`🔄 Logos updated: ${logoUpdated}`);
  console.log(`❌ Matched but no logo: ${noLogo}`);
  console.log(`🆕 New servers added: ${newServersAdded}`);
  console.log(`🔍 Unmatched servers with logos: ${unmatchedServers.length}`);
  
  if (unmatchedServers.length > 0 && !addNewServers) {
    console.log('\n💡 Tip: Run with addNewServers=true to add unmatched servers to database');
  }
  
  return {
    matched,
    logoAdded,
    logoUpdated,
    newServersAdded,
    unmatchedCount: unmatchedServers.length
  };
}

// Run the enhanced merge process
if (process.argv.includes('--add-new')) {
  enhancedMergeLogos({ addNewServers: true }).catch(console.error);
} else if (process.argv.includes('--dry-run')) {
  enhancedMergeLogos({ dryRun: true }).catch(console.error);
} else {
  enhancedMergeLogos().catch(console.error);
}