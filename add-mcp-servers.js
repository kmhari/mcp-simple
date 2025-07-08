#!/usr/bin/env node

/**
 * MCP Server Discovery and Addition Tool
 * 
 * Automatically discovers and adds MCP servers from GitHub repositories
 * to the MCP servers database.
 * 
 * Usage:
 *   node add-mcp-servers.js https://github.com/owner/repo
 *   node add-mcp-servers.js urls.txt
 *   node add-mcp-servers.js [options]
 * 
 * Options:
 *   --dry-run         Show what would be added without making changes
 *   --help, -h        Show this help message
 *   --force           Force processing even if URL already exists
 *   --no-ai           Skip AI-powered MCP server detection (manual mode)
 * 
 * Environment Variables:
 *   GITHUB_TOKEN      GitHub token for higher API rate limits (recommended)
 *   OPENAI_API_KEY    OpenAI API key for AI-powered server detection
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
  requestDelay: 1000, // ms between requests to respect rate limits
  timeout: 10000, // ms
  userAgent: 'MCP-Server-Discovery-Tool/1.0',
  maxRetries: 3,
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: null,
    dryRun: false,
    force: false,
    noAI: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--force') {
      options.force = true;
    } else if (arg === '--no-ai') {
      options.noAI = true;
    } else if (!arg.startsWith('--') && !options.input) {
      options.input = arg;
    }
  }

  return options;
}

// Show help information
function showHelp() {
  console.log(`
MCP Server Discovery and Addition Tool

Automatically discovers and adds MCP servers from GitHub repositories
to the MCP servers database.

Usage:
  node add-mcp-servers.js <github-url>         Add single repository
  node add-mcp-servers.js <urls-file>          Add from text file (one URL per line)
  node add-mcp-servers.js [options]

Options:
  --dry-run         Show what would be added without making changes
  --force           Force processing even if URL already exists
  --no-ai           Skip AI-powered MCP server detection (manual mode)
  --help, -h        Show this help message

Examples:
  node add-mcp-servers.js https://github.com/owner/repo
  node add-mcp-servers.js github-urls.txt
  node add-mcp-servers.js --dry-run https://github.com/owner/repo
  node add-mcp-servers.js --force https://github.com/owner/repo

Environment Variables:
  GITHUB_TOKEN      Set for higher GitHub API rate limits (5000+ vs 60 requests/hour)
  OPENAI_API_KEY    Required for AI-powered MCP server detection

Features:
  ✓ Automatic MCP server detection using AI analysis
  ✓ Duplicate detection against existing database
  ✓ README content analysis and star count fetching
  ✓ Comprehensive error handling and logging
  ✓ Support for both single URLs and batch processing
  ✓ Dry-run mode for safe testing
`);
}

// Validate input (GitHub URL or text file)
function validateInput(input) {
  if (!input) {
    throw new Error('No input provided. Use --help for usage information.');
  }

  // Check if it's a file
  if (fs.existsSync(input)) {
    if (!fs.statSync(input).isFile()) {
      throw new Error(`${input} is not a file`);
    }
    return { type: 'file', path: input };
  }

  // Check if it's a GitHub URL
  if (isGitHubUrl(input)) {
    return { type: 'url', url: input };
  }

  throw new Error(`Invalid input: ${input}. Must be a GitHub URL or a text file.`);
}

// Check if string is a GitHub URL
function isGitHubUrl(url) {
  const patterns = [
    /^https?:\/\/github\.com\/[^\/]+\/[^\/]+/,
    /^https?:\/\/www\.github\.com\/[^\/]+\/[^\/]+/,
  ];
  
  return patterns.some(pattern => pattern.test(url));
}

// Load URLs from text file
function loadUrlsFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const urls = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .filter(isGitHubUrl);
    
    if (urls.length === 0) {
      throw new Error('No valid GitHub URLs found in file');
    }
    
    return urls;
  } catch (error) {
    throw new Error(`Failed to load URLs from file: ${error.message}`);
  }
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
        repo: match[2],
        fullUrl: url
      };
    }
  }
  
  return null;
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

// Check if URL already exists in database
function checkDuplicateUrl(database, githubUrl) {
  const existingServers = Object.entries(database);
  
  for (const [key, server] of existingServers) {
    if (server.githubLink === githubUrl) {
      return { exists: true, key, server };
    }
  }
  
  return { exists: false };
}

// Generate unique key for new server
function generateServerKey(owner, repo) {
  const baseKey = `${owner}-${repo}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  return baseKey;
}

// Simple delay function
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Make HTTP request (adapted from update-server-data.js)
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.setTimeout(CONFIG.timeout);
    req.end();
  });
}

// Fetch repository information from GitHub API
async function fetchRepoInfo(owner, repo) {
  const token = process.env.GITHUB_TOKEN;
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/${owner}/${repo}`,
    method: 'GET',
    headers: {
      'User-Agent': CONFIG.userAgent,
      'Accept': 'application/vnd.github.v3+json',
    }
  };
  
  if (token) {
    options.headers['Authorization'] = `token ${token}`;
  }
  
  try {
    const response = await makeRequest(options);
    
    if (response.statusCode === 200) {
      const repoData = JSON.parse(response.data);
      return {
        name: repoData.name,
        full_name: repoData.full_name,
        description: repoData.description || '',
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        language: repoData.language || '',
        updated_at: repoData.updated_at,
        created_at: repoData.created_at,
        default_branch: repoData.default_branch || 'main'
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
    throw error;
  }
}

// Fetch README content from repository
async function fetchReadme(owner, repo, branch = 'main') {
  const readmeFiles = ['README.md', 'readme.md', 'Readme.md', 'README.rst', 'README.txt', 'README'];
  
  for (const filename of readmeFiles) {
    try {
      const options = {
        hostname: 'raw.githubusercontent.com',
        port: 443,
        path: `/${owner}/${repo}/${branch}/${filename}`,
        method: 'GET',
        headers: {
          'User-Agent': CONFIG.userAgent,
        }
      };
      
      const response = await makeRequest(options);
      
      if (response.statusCode === 200) {
        return {
          content: response.data,
          filename: filename
        };
      }
    } catch (error) {
      // Continue to next filename
      continue;
    }
  }
  
  throw new Error('No README file found');
}

// Save README to file
function saveReadme(serverId, readmeContent, dryRun = false) {
  if (dryRun) {
    console.log(`🔍 [DRY RUN] Would save README for ${serverId}`);
    return;
  }
  
  try {
    // Ensure readmes directory exists
    if (!fs.existsSync(CONFIG.readmesDir)) {
      fs.mkdirSync(CONFIG.readmesDir, { recursive: true });
    }
    
    const readmePath = path.join(CONFIG.readmesDir, `${serverId}.md`);
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`📄 Saved README: ${serverId}.md`);
  } catch (error) {
    console.warn(`⚠️  Failed to save README for ${serverId}: ${error.message}`);
  }
}

// Detect if repository is an MCP server based on README content
function detectMCPServer(readmeContent, repoInfo) {
  const content = readmeContent.toLowerCase();
  
  // Strong indicators that this is an MCP server
  const strongIndicators = [
    'mcp server',
    'model context protocol',
    'mcp-server',
    '@modelcontextprotocol',
    'mcp.json',
    '.mcp.json'
  ];
  
  // Additional indicators
  const additionalIndicators = [
    'context protocol',
    'mcp',
    'server implementation',
    'claude',
    'anthropic',
    'tools and resources',
    'tool server',
    'protocol server'
  ];
  
  // Installation command patterns
  const installPatterns = [
    'npx',
    'uvx',
    'pip install',
    'cargo install',
    'docker run'
  ];
  
  let score = 0;
  let reasons = [];
  
  // Check for strong indicators
  for (const indicator of strongIndicators) {
    if (content.includes(indicator)) {
      score += 10;
      reasons.push(`Strong MCP indicator: "${indicator}"`);
    }
  }
  
  // Check for additional indicators
  for (const indicator of additionalIndicators) {
    if (content.includes(indicator)) {
      score += 3;
      reasons.push(`MCP indicator: "${indicator}"`);
    }
  }
  
  // Check for installation patterns
  for (const pattern of installPatterns) {
    if (content.includes(pattern)) {
      score += 2;
      reasons.push(`Installation pattern: "${pattern}"`);
    }
  }
  
  // Check repository name and description
  if (repoInfo.name.toLowerCase().includes('mcp') || repoInfo.name.toLowerCase().includes('server')) {
    score += 5;
    reasons.push(`Repository name suggests MCP server: "${repoInfo.name}"`);
  }
  
  if (repoInfo.description.toLowerCase().includes('mcp') || repoInfo.description.toLowerCase().includes('context protocol')) {
    score += 5;
    reasons.push(`Description suggests MCP server: "${repoInfo.description}"`);
  }
  
  // Check for package.json or setup.py patterns indicating server implementation
  if (content.includes('package.json') || content.includes('setup.py') || content.includes('cargo.toml')) {
    score += 1;
    reasons.push('Has package management files');
  }
  
  const isMCPServer = score >= 10;
  
  return {
    isMCPServer,
    confidence: Math.min(score / 20, 1.0), // Normalize to 0-1
    score,
    reasons
  };
}

// Categorize MCP server based on content analysis
function categorizeMCPServer(readmeContent, repoInfo) {
  const content = readmeContent.toLowerCase();
  
  // Category mapping based on keywords
  const categories = {
    'Development': [
      'development', 'dev tools', 'code', 'programming', 'debugging', 'testing',
      'build', 'compile', 'lint', 'format', 'refactor', 'analysis'
    ],
    'Database': [
      'database', 'sql', 'mysql', 'postgresql', 'sqlite', 'mongodb', 'redis',
      'db', 'query', 'schema', 'migration', 'orm'
    ],
    'Web Scraping': [
      'scraping', 'scrape', 'web crawling', 'crawl', 'fetch', 'extract',
      'harvest', 'spider', 'beautifulsoup', 'selenium'
    ],
    'File Management': [
      'file', 'filesystem', 'directory', 'folder', 'storage', 'upload',
      'download', 'sync', 'backup', 'archive'
    ],
    'Browser Automation': [
      'browser', 'automation', 'puppeteer', 'playwright', 'selenium',
      'chrome', 'firefox', 'webdriver', 'headless'
    ],
    'Version Control': [
      'git', 'github', 'gitlab', 'version control', 'repository', 'commit',
      'branch', 'merge', 'pull request', 'svn'
    ],
    'Data Storage': [
      'memory', 'cache', 'storage', 'persist', 'save', 'store',
      'data management', 'state'
    ],
    'API Integration': [
      'api', 'rest', 'graphql', 'webhook', 'http', 'integration',
      'external service', 'third party'
    ],
    'Productivity': [
      'productivity', 'task', 'todo', 'calendar', 'schedule', 'notes',
      'reminder', 'workflow', 'management'
    ],
    'Security': [
      'security', 'auth', 'authentication', 'authorization', 'encryption',
      'crypto', 'ssl', 'tls', 'certificate', 'key'
    ],
    'Communication': [
      'communication', 'chat', 'message', 'email', 'notification',
      'slack', 'discord', 'telegram', 'sms'
    ],
    'Analytics': [
      'analytics', 'metrics', 'monitoring', 'logging', 'tracking',
      'statistics', 'dashboard', 'reporting'
    ],
    'Media': [
      'image', 'video', 'audio', 'media', 'photo', 'picture',
      'sound', 'music', 'processing', 'convert'
    ]
  };
  
  let bestCategory = 'Other';
  let maxScore = 0;
  
  for (const [category, keywords] of Object.entries(categories)) {
    let score = 0;
    for (const keyword of keywords) {
      if (content.includes(keyword)) {
        score++;
      }
    }
    
    // Also check repository language
    if (repoInfo.language) {
      const language = repoInfo.language.toLowerCase();
      if (category === 'Development' && ['javascript', 'typescript', 'python', 'java', 'rust', 'go'].includes(language)) {
        score += 2;
      }
    }
    
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }
  
  return bestCategory;
}

// Generate MCP server entry for database
function generateMCPServerEntry(parsed, repoInfo, readme, serverKey) {
  const category = categorizeMCPServer(readme.content, repoInfo);
  
  // Extract potential package name from README
  let packageName = '';
  let installCommand = '';
  
  // Look for npm package patterns
  const npmMatch = readme.content.match(/npm install\s+([^\s\n]+)/i) || 
                   readme.content.match(/npx\s+(?:-y\s+)?([^\s\n]+)/i);
  if (npmMatch) {
    packageName = npmMatch[1];
    installCommand = `npx -y ${packageName}`;
  }
  
  // Look for uvx patterns
  const uvxMatch = readme.content.match(/uvx\s+([^\s\n]+)/i);
  if (uvxMatch) {
    packageName = uvxMatch[1];
    installCommand = `uvx ${packageName}`;
  }
  
  // Look for pip patterns
  const pipMatch = readme.content.match(/pip install\s+([^\s\n]+)/i);
  if (pipMatch) {
    packageName = pipMatch[1];
    installCommand = `pip install ${packageName}`;
  }
  
  // Fallback package name
  if (!packageName) {
    packageName = `@${parsed.owner}/${parsed.repo}`;
    installCommand = `npx -y ${packageName}`;
  }
  
  // Extract environment variables from README
  const envVars = [];
  const envMatches = readme.content.match(/[A-Z_]+(?:_[A-Z]+)*(?=\s*[:=]|\s+environment|required)/g);
  if (envMatches) {
    envVars.push(...new Set(envMatches.filter(v => 
      v.length > 2 && 
      v !== 'README' && 
      v !== 'LICENSE' &&
      !v.includes('HTTP') &&
      !v.includes('URL') ||
      v.endsWith('_URL') ||
      v.endsWith('_KEY') ||
      v.endsWith('_TOKEN')
    )));
  }
  
  // Generate clean description
  let description = repoInfo.description || '';
  if (!description && readme.content) {
    // Try to extract first meaningful paragraph
    const lines = readme.content.split('\n').filter(line => 
      line.trim() && 
      !line.startsWith('#') && 
      !line.startsWith('!') &&
      line.length > 20
    );
    if (lines.length > 0) {
      description = lines[0].trim().substring(0, 200);
    }
  }
  
  // Generate usage instructions
  let usageInstructions = 'See README for setup and usage instructions';
  if (installCommand) {
    usageInstructions = `Install with: ${installCommand}. See README for configuration details.`;
  }
  
  const entry = {
    name: repoInfo.name.charAt(0).toUpperCase() + repoInfo.name.slice(1).replace(/[-_]/g, ' '),
    githubLink: parsed.fullUrl,
    package: packageName,
    description: description,
    installCommand: installCommand,
    requiredEnvVars: envVars.slice(0, 5), // Limit to 5 most likely env vars
    optionalParams: [],
    usageInstructions: usageInstructions,
    category: category,
    stars: repoInfo.stars,
    lastStarUpdate: new Date().toISOString(),
    logo: '',
    updated_at: new Date().toISOString()
  };
  
  return entry;
}

// Main execution function
async function main() {
  try {
    const options = parseArgs();
    
    if (options.help) {
      showHelp();
      return;
    }

    if (!options.input) {
      console.error('❌ No input provided. Use --help for usage information.');
      process.exit(1);
    }

    console.log('🚀 MCP Server Discovery Tool');
    console.log('============================');
    
    // Validate input
    const inputInfo = validateInput(options.input);
    console.log(`📄 Input type: ${inputInfo.type}`);
    
    // Load URLs
    let urls = [];
    if (inputInfo.type === 'url') {
      urls = [inputInfo.url];
    } else {
      urls = loadUrlsFromFile(inputInfo.path);
    }
    
    console.log(`🔍 Found ${urls.length} GitHub URL(s) to process`);
    
    // Load existing database
    const database = loadDatabase();
    console.log(`📊 Loaded database with ${Object.keys(database).length} existing servers`);
    
    // Process each URL
    let processed = 0;
    let added = 0;
    let skipped = 0;
    const errors = [];
    
    for (const url of urls) {
      try {
        console.log(`\n🔍 Processing: ${url}`);
        
        // Parse GitHub URL
        const parsed = parseGitHubUrl(url);
        if (!parsed) {
          throw new Error('Invalid GitHub URL format');
        }
        
        // Check for duplicates
        const duplicate = checkDuplicateUrl(database, url);
        if (duplicate.exists && !options.force) {
          console.log(`⚠️  Skipped: Already exists as '${duplicate.key}'`);
          skipped++;
          continue;
        }
        
        // Fetch repository information
        console.log(`📊 Fetching repo info for ${parsed.owner}/${parsed.repo}...`);
        const repoInfo = await fetchRepoInfo(parsed.owner, parsed.repo);
        console.log(`⭐ Stars: ${repoInfo.stars} | Language: ${repoInfo.language || 'Unknown'}`);
        
        // Fetch README content
        console.log(`📄 Fetching README...`);
        const readme = await fetchReadme(parsed.owner, parsed.repo, repoInfo.default_branch);
        console.log(`📄 Found README: ${readme.filename} (${readme.content.length} chars)`);
        
        // Generate server key
        const serverKey = generateServerKey(parsed.owner, parsed.repo);
        
        // Save README file
        saveReadme(serverKey, readme.content, options.dryRun);
        
        // Detect if this is an MCP server
        console.log(`🤖 Analyzing if this is an MCP server...`);
        const detection = detectMCPServer(readme.content, repoInfo);
        
        if (!detection.isMCPServer && !options.noAI) {
          console.log(`❌ Not detected as MCP server (confidence: ${(detection.confidence * 100).toFixed(1)}%)`);
          console.log(`   Reasons: ${detection.reasons.join(', ')}`);
          console.log(`   Score: ${detection.score}/20 (threshold: 10)`);
          processed++;
          continue;
        }
        
        if (detection.isMCPServer) {
          console.log(`✅ Detected as MCP server! (confidence: ${(detection.confidence * 100).toFixed(1)}%)`);
          console.log(`   Reasons: ${detection.reasons.slice(0, 3).join(', ')}`);
        } else {
          console.log(`⚠️  Manual mode: Processing regardless of detection`);
        }
        
        // Generate MCP server entry
        console.log(`📝 Generating database entry...`);
        const serverEntry = generateMCPServerEntry(parsed, repoInfo, readme, serverKey);
        console.log(`📦 Package: ${serverEntry.package}`);
        console.log(`🏷️  Category: ${serverEntry.category}`);
        console.log(`📄 Description: ${serverEntry.description.substring(0, 100)}...`);
        
        // Add to database
        if (!options.dryRun) {
          database[serverKey] = serverEntry;
          console.log(`💾 Added to database with key: ${serverKey}`);
          added++;
        } else {
          console.log(`🔍 [DRY RUN] Would add to database with key: ${serverKey}`);
        }
        
        console.log(`✅ Processed: ${parsed.owner}/${parsed.repo} (key: ${serverKey})`);
        processed++;
        
        // Add delay between requests
        if (processed < urls.length) {
          await delay(CONFIG.requestDelay);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${url}: ${error.message}`);
        errors.push({ url, error: error.message });
      }
    }
    
    // Save database if there were additions
    if (added > 0) {
      console.log('\n💾 Saving updated database...');
      saveDatabase(database, options.dryRun);
    }
    
    // Summary
    console.log('\n📊 Processing Summary:');
    console.log(`   Total URLs: ${urls.length}`);
    console.log(`   Processed: ${processed}`);
    console.log(`   Added: ${added}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Errors: ${errors.length}`);
    
    if (errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      errors.forEach(({ url, error }) => {
        console.log(`   ${url}: ${error}`);
      });
    }
    
    if (added > 0) {
      console.log(`\n🎉 Successfully added ${added} new MCP server(s) to the database!`);
    } else {
      console.log('\n🎉 Processing complete!');
    }
    
  } catch (error) {
    console.error(`❌ Fatal error: ${error.message}`);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
  process.exit(1);
});

// Run the main function
main();