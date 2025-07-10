#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function runCommand(command, description) {
    console.log(`📋 ${description}...`);
    try {
        execSync(command, { cwd: rootDir, stdio: 'inherit' });
        console.log(`✅ ${description} completed`);
    } catch (error) {
        console.error(`❌ ${description} failed:`, error.message);
        process.exit(1);
    }
}

function updateVersion(type) {
    console.log(`🚀 Starting ${type} release...`);
    
    // Step 1: Update version in root package.json
    runCommand(`npm version ${type} --no-git-tag-version`, `Update version to ${type}`);
    
    // Step 2: Get the new version
    const packageData = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
    const newVersion = packageData.version;
    console.log(`📦 New version: ${newVersion}`);
    
    // Step 3: Build deployment package
    runCommand('npm run build:deploy', 'Build deployment package');
    
    // Step 4: Commit version bump and dist changes
    runCommand('git add package.json dist/', 'Stage version and dist changes');
    runCommand(`git commit -m "chore: release v${newVersion}"`, 'Commit release changes');
    runCommand(`git tag v${newVersion}`, 'Create version tag');
    runCommand('git push --follow-tags', 'Push changes and tags');
    
    // Step 5: Publish from dist
    console.log('📤 Publishing to npm...');
    try {
        execSync('npm publish', { cwd: path.join(rootDir, 'dist'), stdio: 'inherit' });
        console.log(`🎉 Successfully published @oglabs/mcp@${newVersion}!`);
    } catch (error) {
        console.error('❌ Publish failed:', error.message);
        process.exit(1);
    }
}

// Get release type from command line arguments
const releaseType = process.argv[2] || 'patch';

if (!['patch', 'minor', 'major'].includes(releaseType)) {
    console.error('❌ Invalid release type. Use: patch, minor, or major');
    process.exit(1);
}

updateVersion(releaseType);