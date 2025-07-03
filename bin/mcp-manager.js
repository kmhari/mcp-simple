#!/usr/bin/env node

// Redirect to the main mcp-manager.js file
const path = require('path');
const fs = require('fs');

// Multiple strategies to find the main module
let mcpManagerPath;
let foundPath = false;

// Strategy 1: Local development (same directory)
if (!foundPath) {
  try {
    mcpManagerPath = path.join(__dirname, '..', 'mcp-manager.js');
    if (fs.existsSync(mcpManagerPath)) {
      foundPath = true;
    }
  } catch (e) {
    // Ignore
  }
}

// Strategy 2: Global npm installation structure
if (!foundPath) {
  try {
    // The bin is usually in /usr/local/bin or ~/.nvm/.../bin
    // The module is in ../../lib/node_modules/@oglabs/mcp/
    mcpManagerPath = path.join(__dirname, '..', '..', 'lib', 'node_modules', '@oglabs', 'mcp', 'mcp-manager.js');
    if (fs.existsSync(mcpManagerPath)) {
      foundPath = true;
    }
  } catch (e) {
    // Ignore
  }
}

// Strategy 3: Use Node.js module resolution
if (!foundPath) {
  try {
    // Try to resolve as if it were a module
    const Module = require('module');
    const originalRequire = Module.prototype.require;
    
    // Add the parent directory to module paths for resolution
    const parentDir = path.join(__dirname, '..');
    if (Module._nodeModulePaths) {
      Module._nodeModulePaths(parentDir).forEach(p => {
        if (module.paths.indexOf(p) === -1) {
          module.paths.push(p);
        }
      });
    }
    
    // Try to find via package name
    const packagePath = require.resolve('@oglabs/mcp/package.json');
    const moduleDir = path.dirname(packagePath);
    mcpManagerPath = path.join(moduleDir, 'mcp-manager.js');
    
    if (fs.existsSync(mcpManagerPath)) {
      foundPath = true;
    }
  } catch (e) {
    // Ignore
  }
}

// Strategy 4: Absolute path based on where this file is typically installed
if (!foundPath) {
  try {
    // If we're in a global install, try common global paths
    const possiblePaths = [
      path.join(__dirname, '..', '..', '..', 'lib', 'node_modules', '@oglabs', 'mcp', 'mcp-manager.js'),
      path.join(__dirname, '..', 'node_modules', '@oglabs', 'mcp', 'mcp-manager.js'),
      path.join(__dirname, '..', '..', 'node_modules', '@oglabs', 'mcp', 'mcp-manager.js')
    ];
    
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        mcpManagerPath = testPath;
        foundPath = true;
        break;
      }
    }
  } catch (e) {
    // Ignore
  }
}

if (!foundPath) {
  console.error('Error: Could not locate mcp-manager.js');
  console.error('Searched in:');
  console.error('- Local development path');
  console.error('- Global npm installation paths');
  console.error('- Node.js module resolution');
  console.error('- Common installation locations');
  console.error('\nYou can run directly with: node mcp-manager.js');
  process.exit(1);
}

// Load and execute the main module
try {
  const MCPManager = require(mcpManagerPath);
  if (MCPManager.startMCPApplication) {
    MCPManager.startMCPApplication();
  } else {
    // Fallback - just require the module (it will auto-start)
    // This should trigger the module's auto-start logic
  }
} catch (error) {
  console.error('Error loading mcp-manager.js:', error.message);
  process.exit(1);
}