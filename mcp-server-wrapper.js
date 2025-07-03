#!/usr/bin/env node

// Wrapper script to handle ES module imports for MCP server
const path = require('path');

async function startMcpServer() {
  try {
    // Dynamic import of the ES module
    const { TechStackAdvisorServer } = await import('./mcp-server.mjs');
    const server = new TechStackAdvisorServer();
    await server.run();
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startMcpServer();
}

module.exports = { startMcpServer };