#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🚀 Starting deployment build...');

// Step 1: Build frontend assets
console.log('📦 Building frontend assets...');
execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });

// Step 2: Copy essential files to dist
console.log('📋 Copying essential files...');
const filesToCopy = [
  'mcp-manager.cjs',
  'mcp-manager.js', 
  'mcp-server.js',
  'mcp-servers-database.json',
  'mcp-tools.json',
  'package.json'
];

const distDir = path.join(rootDir, 'dist');
filesToCopy.forEach(file => {
  const src = path.join(rootDir, file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied ${file}`);
  } else {
    console.log(`⚠️  ${file} not found, skipping`);
  }
});

// Step 2.1: Create public directory structure for the server
console.log('📁 Setting up public directory structure...');
const publicDir = path.join(distDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Move built assets to public directory to match server expectations
const builtFiles = ['index.html', 'assets'];
builtFiles.forEach(item => {
  const src = path.join(distDir, item);
  const dest = path.join(publicDir, item);
  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      // Copy directory recursively
      fs.cpSync(src, dest, { recursive: true });
      fs.rmSync(src, { recursive: true });
    } else {
      // Copy file
      fs.copyFileSync(src, dest);
      fs.unlinkSync(src);
    }
    console.log(`✅ Moved ${item} to public/`);
  }
});

// Step 3: Create deployment package.json
console.log('📄 Creating deployment package.json...');
const originalPackage = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const deployPackage = {
  name: originalPackage.name,
  version: originalPackage.version,
  description: originalPackage.description,
  main: originalPackage.main,
  type: originalPackage.type,
  bin: originalPackage.bin,
  scripts: {
    start: 'node mcp-manager.cjs --web',
    server: 'node mcp-server.js'
  },
  dependencies: originalPackage.dependencies,
  engines: originalPackage.engines,
  author: originalPackage.author,
  license: originalPackage.license
};

fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(deployPackage, null, 2));

// Step 4: Create deployment README
console.log('📖 Creating deployment README...');
const deployReadme = `# MCP Manager - Production Build

## Quick Start
1. Install dependencies: \`npm install\`
2. Start web server: \`npm start\`
3. Access at: http://localhost:3333

## Files Structure
- \`mcp-manager.cjs\` - Main CLI and web server
- \`mcp-server.js\` - MCP server implementation  
- \`mcp-servers-database.json\` - Database of available servers
- \`assets/\` - Minified frontend assets
- \`index.html\` - Web interface

## Environment Variables
- \`PORT\` - Web server port (default: 3333)
- \`NODE_ENV\` - Environment mode

Built with Vite ${new Date().toISOString()}
`;

fs.writeFileSync(path.join(distDir, 'README.md'), deployReadme);

console.log('✨ Deployment build complete!');
console.log('📁 Files ready in: ./dist/');
console.log('🌐 To test: cd dist && npm install && npm start');