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
import { URL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  databasePath: path.join(__dirname, 'mcp-servers-database.json'),
  readmesDir: path.join(__dirname, 'public', 'readmes'),
  redirectCachePath: path.join(__dirname, 'data', 'redirect.json'),
  missing404CachePath: path.join(__dirname, 'data', '404.txt'),
  noReadme404CachePath: path.join(__dirname, 'data', '404_readme.txt'),
  notMcp404CachePath: path.join(__dirname, 'data', '404_not_mcp.txt'),
  requestDelay: 1000, // ms between requests to respect rate limits
  timeout: 10000, // ms
  userAgent: 'MCP-Server-Discovery-Tool/1.0',
  maxRetries: 3,
  maxRedirects: 5, // maximum number of redirects to follow
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

// Load redirect cache
function loadRedirectCache() {
  try {
    if (!fs.existsSync(CONFIG.redirectCachePath)) {
      // Create directory and initial file if it doesn't exist
      const redirectDir = path.dirname(CONFIG.redirectCachePath);
      if (!fs.existsSync(redirectDir)) {
        fs.mkdirSync(redirectDir, { recursive: true });
      }
      
      const initialCache = {
        _metadata: {
          description: "GitHub URL redirect cache for add-mcp-servers.js",
          format: "{ 'originalUrl': 'finalUrl' }",
          created: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        },
        redirects: {}
      };
      
      fs.writeFileSync(CONFIG.redirectCachePath, JSON.stringify(initialCache, null, 2));
      return initialCache;
    }
    
    const data = fs.readFileSync(CONFIG.redirectCachePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.warn(`⚠️  Failed to load redirect cache: ${error.message}`);
    return {
      _metadata: {
        description: "GitHub URL redirect cache for add-mcp-servers.js",
        format: "{ 'originalUrl': 'finalUrl' }",
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      },
      redirects: {}
    };
  }
}

// Save redirect cache
function saveRedirectCache(cache) {
  try {
    cache._metadata.lastUpdated = new Date().toISOString();
    fs.writeFileSync(CONFIG.redirectCachePath, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn(`⚠️  Failed to save redirect cache: ${error.message}`);
  }
}

// Check if URL has a known redirect
function checkRedirectCache(cache, originalUrl) {
  const normalizedUrl = normalizeGitHubUrl(originalUrl);
  
  // Check direct match
  if (cache.redirects[normalizedUrl]) {
    return cache.redirects[normalizedUrl];
  }
  
  // Check if originalUrl is stored as a value (reverse lookup)
  for (const [cachedOriginal, cachedFinal] of Object.entries(cache.redirects)) {
    if (normalizeGitHubUrl(cachedFinal) === normalizedUrl) {
      return cachedFinal; // Already the final URL
    }
  }
  
  return null;
}

// Add redirect to cache
function addRedirectToCache(cache, originalUrl, finalUrl) {
  const normalizedOriginal = normalizeGitHubUrl(originalUrl);
  const normalizedFinal = normalizeGitHubUrl(finalUrl);
  
  // Only cache if there's actually a redirect
  if (normalizedOriginal !== normalizedFinal) {
    cache.redirects[normalizedOriginal] = finalUrl;
    console.log(`📝 Cached redirect: ${originalUrl} → ${finalUrl}`);
    return true;
  }
  
  return false;
}

// Load 404 missing repos cache
function load404Cache() {
  try {
    if (!fs.existsSync(CONFIG.missing404CachePath)) {
      // Create directory and initial file if it doesn't exist
      const cacheDir = path.dirname(CONFIG.missing404CachePath);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      
      const initialContent = `# GitHub URLs that return 404 (Repository not found)
# Format: One URL per line
# This file is automatically managed by add-mcp-servers.js
# Last updated: ${new Date().toISOString()}
`;
      
      fs.writeFileSync(CONFIG.missing404CachePath, initialContent);
      return [];
    }
    
    const content = fs.readFileSync(CONFIG.missing404CachePath, 'utf8');
    const urls = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(url => normalizeGitHubUrl(url));
    
    return urls;
  } catch (error) {
    console.warn(`⚠️  Failed to load 404 cache: ${error.message}`);
    return [];
  }
}

// Save 404 missing repos cache
function save404Cache(missingUrls) {
  try {
    const content = `# GitHub URLs that return 404 (Repository not found)
# Format: One URL per line
# This file is automatically managed by add-mcp-servers.js
# Last updated: ${new Date().toISOString()}

${missingUrls.join('\n')}
`;
    
    fs.writeFileSync(CONFIG.missing404CachePath, content);
  } catch (error) {
    console.warn(`⚠️  Failed to save 404 cache: ${error.message}`);
  }
}

// Check if URL is in 404 cache
function check404Cache(cache404, url) {
  const normalizedUrl = normalizeGitHubUrl(url);
  return cache404.includes(normalizedUrl);
}

// Add URL to 404 cache
function addTo404Cache(cache404, url) {
  const normalizedUrl = normalizeGitHubUrl(url);
  
  if (!cache404.includes(normalizedUrl)) {
    cache404.push(normalizedUrl);
    console.log(`📝 Added to 404 cache: ${url}`);
    return true;
  }
  
  return false;
}

// Load README 404 cache (repos without README files)
function loadReadme404Cache() {
  try {
    if (!fs.existsSync(CONFIG.noReadme404CachePath)) {
      // Create directory and initial file if it doesn't exist
      const cacheDir = path.dirname(CONFIG.noReadme404CachePath);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      
      const initialContent = `# GitHub URLs that have no README files
# Format: One URL per line
# This file is automatically managed by add-mcp-servers.js
# Last updated: ${new Date().toISOString()}
`;
      
      fs.writeFileSync(CONFIG.noReadme404CachePath, initialContent);
      return [];
    }
    
    const content = fs.readFileSync(CONFIG.noReadme404CachePath, 'utf8');
    const urls = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(url => normalizeGitHubUrl(url));
    
    return urls;
  } catch (error) {
    console.warn(`⚠️  Failed to load README 404 cache: ${error.message}`);
    return [];
  }
}

// Save README 404 cache (repos without README files)
function saveReadme404Cache(noReadmeUrls) {
  try {
    const content = `# GitHub URLs that have no README files
# Format: One URL per line
# This file is automatically managed by add-mcp-servers.js
# Last updated: ${new Date().toISOString()}

${noReadmeUrls.join('\n')}
`;
    
    fs.writeFileSync(CONFIG.noReadme404CachePath, content);
  } catch (error) {
    console.warn(`⚠️  Failed to save README 404 cache: ${error.message}`);
  }
}

// Check if URL is in README 404 cache
function checkReadme404Cache(cacheReadme404, url) {
  const normalizedUrl = normalizeGitHubUrl(url);
  return cacheReadme404.includes(normalizedUrl);
}

// Add URL to README 404 cache
function addToReadme404Cache(cacheReadme404, url) {
  const normalizedUrl = normalizeGitHubUrl(url);
  
  if (!cacheReadme404.includes(normalizedUrl)) {
    cacheReadme404.push(normalizedUrl);
    console.log(`📝 Added to README 404 cache: ${url}`);
    return true;
  }
  
  return false;
}

// Load not-MCP 404 cache (repos that are not MCP servers)
function loadNotMcp404Cache() {
  try {
    if (!fs.existsSync(CONFIG.notMcp404CachePath)) {
      // Create directory and initial file if it doesn't exist
      const cacheDir = path.dirname(CONFIG.notMcp404CachePath);
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      
      const initialContent = `# GitHub URLs that are not MCP servers
# Format: One URL per line
# This file is automatically managed by add-mcp-servers.js
# Last updated: ${new Date().toISOString()}
`;
      
      fs.writeFileSync(CONFIG.notMcp404CachePath, initialContent);
      return [];
    }
    
    const content = fs.readFileSync(CONFIG.notMcp404CachePath, 'utf8');
    const urls = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(url => normalizeGitHubUrl(url));
    
    return urls;
  } catch (error) {
    console.warn(`⚠️  Failed to load not-MCP 404 cache: ${error.message}`);
    return [];
  }
}

// Save not-MCP 404 cache (repos that are not MCP servers)
function saveNotMcp404Cache(notMcpUrls) {
  try {
    const content = `# GitHub URLs that are not MCP servers
# Format: One URL per line
# This file is automatically managed by add-mcp-servers.js
# Last updated: ${new Date().toISOString()}

${notMcpUrls.join('\n')}
`;
    
    fs.writeFileSync(CONFIG.notMcp404CachePath, content);
  } catch (error) {
    console.warn(`⚠️  Failed to save not-MCP 404 cache: ${error.message}`);
  }
}

// Check if URL is in not-MCP 404 cache
function checkNotMcp404Cache(cacheNotMcp404, url) {
  const normalizedUrl = normalizeGitHubUrl(url);
  return cacheNotMcp404.includes(normalizedUrl);
}

// Add URL to not-MCP 404 cache
function addToNotMcp404Cache(cacheNotMcp404, url) {
  const normalizedUrl = normalizeGitHubUrl(url);
  
  if (!cacheNotMcp404.includes(normalizedUrl)) {
    cacheNotMcp404.push(normalizedUrl);
    console.log(`📝 Added to not-MCP 404 cache: ${url}`);
    return true;
  }
  
  return false;
}

// Normalize GitHub URL by removing trailing slash and converting to lowercase for comparison
function normalizeGitHubUrl(url) {
  if (!url) return '';
  return url.replace(/\/$/, '').toLowerCase();
}

// Check if URL already exists in database (checks both original and final URLs)
function checkDuplicateUrl(database, githubUrl, finalUrl = null) {
  const existingServers = Object.entries(database);
  const normalizedGithubUrl = normalizeGitHubUrl(githubUrl);
  const normalizedFinalUrl = finalUrl ? normalizeGitHubUrl(finalUrl) : null;
  
  for (const [key, server] of existingServers) {
    const normalizedExistingUrl = normalizeGitHubUrl(server.githubLink);
    
    // Check against original URL (normalized comparison)
    if (normalizedExistingUrl === normalizedGithubUrl) {
      return { exists: true, key, server, matchedUrl: githubUrl };
    }
    
    // Check against final URL after redirects (if different and normalized)
    if (normalizedFinalUrl && normalizedFinalUrl !== normalizedGithubUrl && normalizedExistingUrl === normalizedFinalUrl) {
      return { exists: true, key, server, matchedUrl: finalUrl };
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

// Make HTTP request with redirect handling (adapted from update-server-data.js)
function makeRequest(options, maxRedirects = CONFIG.maxRedirects) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      // Handle redirects (301, 302, 303, 307, 308)
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        if (maxRedirects <= 0) {
          reject(new Error(`Too many redirects. Max ${CONFIG.maxRedirects} redirects exceeded.`));
          return;
        }
        
        const redirectUrl = new URL(res.headers.location, `https://${options.hostname}`);
        const redirectOptions = {
          hostname: redirectUrl.hostname,
          port: redirectUrl.port || 443,
          path: redirectUrl.pathname + redirectUrl.search,
          method: options.method,
          headers: options.headers
        };
        
        console.log(`🔄 Following redirect (${res.statusCode}): ${redirectUrl.href}`);
        
        // Follow redirect
        makeRequest(redirectOptions, maxRedirects - 1)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          finalUrl: `https://${options.hostname}${options.path}`
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
async function fetchRepoInfo(owner, repo, originalUrl = null) {
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
      
      // Detect redirect by comparing original URL with API response
      let redirectDetected = false;
      let finalUrl = originalUrl;
      
      if (originalUrl && repoData.html_url) {
        const normalizedOriginal = normalizeGitHubUrl(originalUrl);
        const normalizedApiResponse = normalizeGitHubUrl(repoData.html_url);
        
        if (normalizedOriginal !== normalizedApiResponse) {
          finalUrl = repoData.html_url;
          redirectDetected = true;
        }
      }
      
      return {
        name: repoData.name,
        full_name: repoData.full_name,
        description: repoData.description || '',
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        language: repoData.language || '',
        updated_at: repoData.updated_at,
        created_at: repoData.created_at,
        default_branch: repoData.default_branch || 'main',
        finalUrl: finalUrl,
        redirectDetected: redirectDetected,
        originalUrl: originalUrl
      };
    } else if (response.statusCode === 404) {
      // Return special 404 response that can be handled by caller
      const error = new Error('Repository not found');
      error.isNotFound = true;
      error.originalUrl = originalUrl;
      throw error;
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
async function fetchReadme(owner, repo, branch = 'main', originalUrl = null) {
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
          filename: filename,
          finalUrl: response.finalUrl
        };
      }
    } catch (error) {
      // Continue to next filename
      continue;
    }
  }
  
  // Return special README not found error that can be handled by caller
  const error = new Error('No README file found');
  error.isReadmeNotFound = true;
  error.originalUrl = originalUrl;
  throw error;
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

// Simplified MCP server detection (ultra-efficient)
function detectMCPServer(readmeContent, repoInfo) {
  const repoName = repoInfo.name.toLowerCase();
  const repoDesc = (repoInfo.description || '').toLowerCase();
  
  // Quick repository metadata check (fastest)
  if (repoName.includes('mcp') || repoDesc.includes('mcp')) {
    return { isMCPServer: true };
  }
  
  // Single regex check for all MCP patterns
  const mcpPattern = /mcp|model.?context.?protocol|@modelcontextprotocol|\.mcp\.json|mcp\.json/i;
  const isMCPServer = mcpPattern.test(readmeContent);
  
  return { isMCPServer };
}

// Simplified categorization (language + key patterns)
function categorizeMCPServer(readmeContent, repoInfo) {
  const content = readmeContent.toLowerCase();
  const language = (repoInfo.language || '').toLowerCase();
  
  // Priority-based categorization (check most specific first)
  if (/database|sql|postgres|mysql|sqlite|mongodb|redis/i.test(content)) return 'Database';
  if (/browser|playwright|puppeteer|selenium|chrome|firefox/i.test(content)) return 'Browser Automation';
  if (/git|github|gitlab|version.?control|repository/i.test(content)) return 'Version Control';
  if (/file|filesystem|directory|storage|upload|download/i.test(content)) return 'File Management';
  if (/scraping|scrape|crawl|fetch|extract|spider/i.test(content)) return 'Web Scraping';
  if (/api|rest|graphql|webhook|http|integration/i.test(content)) return 'API Integration';
  if (/security|auth|encryption|crypto|ssl|certificate/i.test(content)) return 'Security';
  if (/memory|cache|persist|storage|state/i.test(content)) return 'Data Storage';
  
  // Language-based fallback
  if (['javascript', 'typescript', 'python', 'rust', 'go'].includes(language)) return 'Development';
  
  return 'Other';
}

// Generate MCP server entry for database
function generateMCPServerEntry(parsed, repoInfo, readme, serverKey) {
  const category = categorizeMCPServer(readme.content, repoInfo);
  
  // Simplified package extraction (single regex)
  const installMatch = readme.content.match(/((?:npx -y |uvx |npm install |pip install )([^\s\n]+))/i);
  const packageName = installMatch ? installMatch[2] : `@${parsed.owner}/${parsed.repo}`;
  const installCommand = installMatch ? installMatch[1] : `npx -y ${packageName}`;
  
  // Simplified environment variable extraction
  const envMatches = readme.content.match(/[A-Z_]{3,}(?:_[A-Z]+)*(?=\s*[:=])/g) || [];
  const envVars = [...new Set(envMatches.filter(v => 
    v.endsWith('_URL') || v.endsWith('_KEY') || v.endsWith('_TOKEN') || v.endsWith('_PASSWORD')
  ))].slice(0, 5);
  
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
    githubLink: parsed.fullUrl.replace(/\/$/, ''), // Remove trailing slash
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
    
    console.log(`🔍 Found ${urls.length} GitHub URL(s) in input`);
    
    // Load existing database and all caches
    const database = loadDatabase();
    console.log(`📊 Loaded database with ${Object.keys(database).length} existing servers`);
    
    const redirectCache = loadRedirectCache();
    const redirectCount = Object.keys(redirectCache.redirects).length;
    console.log(`🔄 Loaded redirect cache with ${redirectCount} cached redirect(s)`);
    
    const cache404 = load404Cache();
    console.log(`❌ Loaded 404 cache with ${cache404.length} missing repo(s)`);
    
    const cacheReadme404 = loadReadme404Cache();
    console.log(`📄❌ Loaded README 404 cache with ${cacheReadme404.length} repos without README`);
    
    const cacheNotMcp404 = loadNotMcp404Cache();
    console.log(`🚫 Loaded not-MCP 404 cache with ${cacheNotMcp404.length} non-MCP repos`);
    
    // Filter out existing URLs before processing (only if not using --force)
    let filteredUrls = urls;
    let preFilteredCount = 0;
    
    if (!options.force) {
      console.log(`🔍 Pre-filtering existing URLs, 404s, README 404s, not-MCP 404s, and redirect targets...`);
      const existingUrls = [];
      const missing404Urls = [];
      const noReadmeUrls = [];
      const notMcpUrls = [];
      const redirectTargetUrls = [];
      const newUrls = [];
      
      for (const url of urls) {
        // Check if URL already exists in database
        const duplicate = checkDuplicateUrl(database, url);
        if (duplicate.exists) {
          existingUrls.push({ url, key: duplicate.key });
          preFilteredCount++;
          continue;
        }
        
        // Check redirect target - if this URL redirects to something, check if the target is already cached
        const cachedRedirect = checkRedirectCache(redirectCache, url);
        if (cachedRedirect) {
          // Check all caches against the redirect target
          if (checkDuplicateUrl(database, cachedRedirect).exists ||
              check404Cache(cache404, cachedRedirect) ||
              checkReadme404Cache(cacheReadme404, cachedRedirect) ||
              checkNotMcp404Cache(cacheNotMcp404, cachedRedirect)) {
            redirectTargetUrls.push({ url, target: cachedRedirect });
            preFilteredCount++;
            continue;
          }
        }
        
        // Check if URL is in 404 cache (missing repository)
        if (check404Cache(cache404, url)) {
          missing404Urls.push(url);
          preFilteredCount++;
          continue;
        }
        
        // Check if URL is in README 404 cache (no README file)
        if (checkReadme404Cache(cacheReadme404, url)) {
          noReadmeUrls.push(url);
          preFilteredCount++;
          continue;
        }
        
        // Check if URL is in not-MCP 404 cache (not an MCP server)
        if (checkNotMcp404Cache(cacheNotMcp404, url)) {
          notMcpUrls.push(url);
          preFilteredCount++;
          continue;
        }
        
        // URL passed all filters, add to processing list
        newUrls.push(url);
      }
      
      filteredUrls = newUrls;
      
      if (preFilteredCount > 0) {
        console.log(`⚠️  Pre-filtered ${preFilteredCount} URL(s):`);
        
        if (existingUrls.length > 0) {
          console.log(`   📊 ${existingUrls.length} existing in database:`);
          existingUrls.forEach(({ url, key }) => {
            console.log(`      - ${url} (exists as '${key}')`);
          });
        }
        
        if (missing404Urls.length > 0) {
          console.log(`   ❌ ${missing404Urls.length} missing repositories (404):`);
          missing404Urls.forEach(url => {
            console.log(`      - ${url}`);
          });
        }
        
        if (noReadmeUrls.length > 0) {
          console.log(`   📄❌ ${noReadmeUrls.length} repositories without README:`);
          noReadmeUrls.forEach(url => {
            console.log(`      - ${url}`);
          });
        }
      }
      
      console.log(`✅ ${filteredUrls.length} new URL(s) to process`);
      
      if (filteredUrls.length === 0) {
        console.log(`\n🎉 All URLs already exist in the database!`);
        return;
      }
    } else {
      console.log(`🔧 Using --force flag: processing all URLs regardless of existing entries`);
    }
    
    console.log(`\n🚀 Starting processing of ${filteredUrls.length} URL(s) in batches of 5...`);
    
    // Process URLs in batches of 5
    let processed = 0;
    let added = 0;
    let skipped = 0;
    const errors = [];
    const batchSize = 5;
    
    for (let i = 0; i < filteredUrls.length; i += batchSize) {
      const batch = filteredUrls.slice(i, i + batchSize);
      console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1} (${batch.length} URLs)...`);
      
      // Process batch in parallel
      const batchPromises = batch.map(async (url) => {
        try {
          console.log(`🔍 Processing: ${url}`);
          
          // Parse GitHub URL
          const parsed = parseGitHubUrl(url);
          if (!parsed) {
            throw new Error('Invalid GitHub URL format');
          }
          
          // Check redirect cache
          const cachedRedirect = checkRedirectCache(redirectCache, url);
          let effectiveUrl = url;
          
          if (cachedRedirect) {
            console.log(`🔄 Using cached redirect: ${url} → ${cachedRedirect}`);
            effectiveUrl = cachedRedirect;
            
            // Check for duplicates with cached redirect URL
            const cachedDuplicate = checkDuplicateUrl(database, effectiveUrl);
            if (cachedDuplicate.exists && !options.force) {
              console.log(`⚠️  Skipped: Redirect target already exists as '${cachedDuplicate.key}'`);
              return { status: 'skipped', url, reason: 'cached redirect duplicate' };
            }
          }
          
          // Check for duplicates BEFORE making any API calls
          const initialDuplicate = checkDuplicateUrl(database, url);
          if (initialDuplicate.exists && !options.force) {
            console.log(`⚠️  Skipped: Already exists as '${initialDuplicate.key}'`);
            return { status: 'skipped', url, reason: 'duplicate URL' };
          }
          
          // Fetch repository information
          console.log(`📊 Fetching repo info for ${parsed.owner}/${parsed.repo}...`);
          const repoInfo = await fetchRepoInfo(parsed.owner, parsed.repo, url);
          console.log(`⭐ Stars: ${repoInfo.stars} | Language: ${repoInfo.language || 'Unknown'}`);
          
          // Cache redirect if detected
          if (repoInfo.redirectDetected && repoInfo.finalUrl) {
            const redirectAdded = addRedirectToCache(redirectCache, url, repoInfo.finalUrl);
            if (redirectAdded) {
              saveRedirectCache(redirectCache);
            }
          }
          
          // Check for duplicates with final URL after any redirects
          if (repoInfo.finalUrl && repoInfo.finalUrl !== url && !options.force) {
            console.log(`🔄 API endpoint resolved to: ${repoInfo.finalUrl}`);
            const duplicateAfterRedirect = checkDuplicateUrl(database, url, repoInfo.finalUrl);
            if (duplicateAfterRedirect.exists) {
              console.log(`⚠️  Skipped: Already exists as '${duplicateAfterRedirect.key}' (redirect matched: ${duplicateAfterRedirect.matchedUrl})`);
              return { status: 'skipped', url, reason: 'duplicate after redirect' };
            }
          }
          
          // Fetch README content
          console.log(`📄 Fetching README...`);
          const readme = await fetchReadme(parsed.owner, parsed.repo, repoInfo.default_branch, url);
          console.log(`📄 Found README: ${readme.filename} (${readme.content.length} chars)`);
          
          // Generate server key
          const serverKey = generateServerKey(parsed.owner, parsed.repo);
          
          // Save README file
          saveReadme(serverKey, readme.content, options.dryRun);
          
          // Detect if this is an MCP server
          console.log(`🤖 Analyzing if this is an MCP server...`);
          const detection = detectMCPServer(readme.content, repoInfo);
          
          if (!detection.isMCPServer && !options.noAI) {
            console.log(`❌ Not detected as MCP server`);
            return { status: 'not_mcp', url, reason: 'not MCP server' };
          }
          
          if (detection.isMCPServer) {
            console.log(`✅ Detected as MCP server!`);
          } else {
            console.log(`⚠️  Manual mode: Processing regardless of detection`);
          }
          
          // Generate MCP server entry
          console.log(`📝 Generating database entry...`);
          const serverEntry = generateMCPServerEntry(parsed, repoInfo, readme, serverKey);
          console.log(`📦 Package: ${serverEntry.package}`);
          console.log(`🏷️  Category: ${serverEntry.category}`);
          console.log(`📄 Description: ${serverEntry.description.substring(0, 100)}...`);
          
          console.log(`✅ Processed: ${parsed.owner}/${parsed.repo} (key: ${serverKey})`);
          
          return {
            status: 'success',
            url,
            serverKey,
            serverEntry,
            parsed
          };
          
        } catch (error) {
          // Handle 404 errors specially - cache them
          if (error.isNotFound) {
            console.log(`❌ Repository not found: ${url}`);
            const added = addTo404Cache(cache404, url);
            if (added) {
              save404Cache(cache404);
            }
            return { status: 'skipped', url, reason: '404 not found' };
          }
          
          // Handle README 404 errors specially - cache them
          if (error.isReadmeNotFound) {
            console.log(`📄❌ No README file found: ${url}`);
            const added = addToReadme404Cache(cacheReadme404, url);
            if (added) {
              saveReadme404Cache(cacheReadme404);
            }
            return { status: 'skipped', url, reason: 'no README file' };
          }
          
          console.error(`❌ Error processing ${url}: ${error.message}`);
          return { status: 'error', url, error: error.message };
        }
      });
      
      // Wait for batch to complete
      const batchResults = await Promise.all(batchPromises);
      
      // Process batch results sequentially for database operations
      for (const result of batchResults) {
        processed++;
        
        if (result.status === 'success') {
          // Add to database and save immediately
          if (!options.dryRun) {
            database[result.serverKey] = result.serverEntry;
            console.log(`💾 Added to database with key: ${result.serverKey}`);
            
            // Save database immediately after each addition
            try {
              console.log(`💾 Saving database...`);
              saveDatabase(database, false);
              console.log(`✅ Database saved successfully`);
            } catch (saveError) {
              console.error(`❌ Failed to save database: ${saveError.message}`);
              // Remove the entry if save failed to keep memory and disk in sync
              delete database[result.serverKey];
              errors.push({ url: result.url, error: saveError.message });
              continue;
            }
            
            added++;
          } else {
            console.log(`🔍 [DRY RUN] Would add to database with key: ${result.serverKey}`);
          }
        } else if (result.status === 'skipped') {
          skipped++;
        } else if (result.status === 'not_mcp') {
          // Add to not-MCP cache
          const added = addToNotMcp404Cache(cacheNotMcp404, result.url);
          if (added) {
            saveNotMcp404Cache(cacheNotMcp404);
          }
          skipped++;
        } else if (result.status === 'error') {
          errors.push({ url: result.url, error: result.error });
        }
      }
      
      // Add delay between batches (not between individual URLs in batch)
      if (i + batchSize < filteredUrls.length) {
        console.log(`⏱️  Waiting ${CONFIG.requestDelay}ms before next batch...`);
        await delay(CONFIG.requestDelay);
      }
    }
    
    // Database is saved after each addition, so no final save needed
    
    // Summary
    console.log('\n📊 Processing Summary:');
    console.log(`   Input URLs: ${urls.length}`);
    if (preFilteredCount > 0) {
      console.log(`   Pre-filtered: ${preFilteredCount}`);
      console.log(`   New URLs processed: ${filteredUrls.length}`);
    }
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
      console.log(`📄 Each addition was saved immediately to prevent data loss.`);
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