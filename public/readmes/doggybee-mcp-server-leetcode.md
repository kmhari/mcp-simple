# MCP Server LeetCode

[![npm version](https://img.shields.io/npm/v/@mcpfun/mcp-server-leetcode.svg)](https://www.npmjs.com/package/@mcpfun/mcp-server-leetcode)
[![GitHub license](https://img.shields.io/github/license/doggybee/mcp-server-leetcode.svg)](https://github.com/doggybee/mcp-server-leetcode/blob/main/LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://github.com/doggybee/mcp-server-leetcode/releases)
[![smithery badge](https://smithery.ai/badge/@doggybee/mcp-server-leetcode)](https://smithery.ai/server/@doggybee/mcp-server-leetcode)

A Model Context Protocol (MCP) server for LeetCode that enables AI assistants to access LeetCode problems, user information, and contest data.

## Features

- 🚀 Fast access to LeetCode API
- 🔍 Search problems, retrieve daily challenges, and check user profiles
- 🏆 Query contest data and rankings
- 🧩 Full support for MCP tools and resources
- 📦 Provides both CLI and programmable API

## Installation

### Installing via Smithery

To install mcp-server-leetcode for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@doggybee/mcp-server-leetcode):

```bash
npx -y @smithery/cli install @doggybee/mcp-server-leetcode --client claude
```

### Global Installation

```bash
npm install -g @mcpfun/mcp-server-leetcode
```

Once installed, you can run it directly from the command line:

```bash
mcp-server-leetcode
```

### Local Installation

```bash
npm install @mcpfun/mcp-server-leetcode
```

## Usage

### Integration with Claude for Desktop

Add the following to your Claude for Desktop `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "leetcode": {
      "command": "mcp-server-leetcode"
    }
  }
}
```

For local development:

```json
{
  "mcpServers": {
    "leetcode": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}
```

### Use as a Library

```javascript
import { LeetCodeService } from '@mcpfun/mcp-server-leetcode';

// Initialize the service
const leetcodeService = new LeetCodeService();

// Get daily challenge
const dailyChallenge = await leetcodeService.getDailyChallenge();

// Search problems
const problems = await leetcodeService.searchProblems({
  difficulty: 'MEDIUM',
  tags: 'array+dynamic-programming'
});
```

## Available Tools

### Problem-related Tools

| Tool Name | Description | Parameters |
|--------|------|------|
| `get-daily-challenge` | Get the daily challenge | None |
| `get-problem` | Get details for a specific problem | `titleSlug` (string) |
| `search-problems` | Search for problems based on criteria | `tags` (optional), `difficulty` (optional), `limit` (default 20), `skip` (default 0) |

### User-related Tools

| Tool Name | Description | Parameters |
|--------|------|------|
| `get-user-profile` | Get user information | `username` (string) |
| `get-user-submissions` | Get user submission history | `username` (string), `limit` (optional, default 20) |
| `get-user-contest-ranking` | Get user contest rankings | `username` (string) |

### Contest-related Tools

| Tool Name | Description | Parameters |
|--------|------|------|
| `get-contest-details` | Get contest details | `contestSlug` (string) |

## Available Resources

### Problem Resources

- `leetcode://daily-challenge`: Daily challenge
- `leetcode://problem/{titleSlug}`: Problem details
- `leetcode://problems{?tags,difficulty,limit,skip}`: Problem list

### User Resources

- `leetcode://user/{username}/profile`: User profile
- `leetcode://user/{username}/submissions{?limit}`: User submissions
- `leetcode://user/{username}/contest-ranking`: User contest ranking

## Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/doggybee/mcp-server-leetcode.git
cd mcp-server-leetcode
npm install
```

Run in development mode:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

## License

MIT

## Related Projects

- [Model Context Protocol](https://modelcontextprotocol.io) - MCP specifications and documentation
- [Claude for Desktop](https://claude.ai/download) - AI assistant with MCP support

## Acknowledgements

- This project was inspired by [alfa-leetcode-api](https://github.com/alfaarghya/alfa-leetcode-api)
