#!/usr/bin/env node

// Redirect to the main mcp-manager.js file
const path = require('path');
const MCPManager = require(path.join(__dirname, '..', 'mcp-manager.js'));

// The main execution logic is already in mcp-manager.js
// This file just serves as the bin entry point for npm