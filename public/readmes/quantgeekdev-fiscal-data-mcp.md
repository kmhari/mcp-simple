## Overview

The [Fiscal Data MCP Server](https://github.com/QuantGeekDev/fiscal-data-mcp) demonstrates a practical implementation of an MCP server that connects to the US Treasury's Fiscal Data API. It showcases:

- Tools for fetching specific treasury statements
- Resources for historical data access
- Prompts for generating formatted reports

## Quick Start

### 1. Install and Use with Claude Desktop

Add this configuration to your Claude Desktop config file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fiscal-data": {
      "command": "npx",
      "args": ["fiscal-data-mcp"]
    }
  }
}
```

### 2. Example Interactions

Once configured, you can interact with the server through Claude:

```
Human: Can you get the treasury statement for the 20th of September 2023?
```

## Features

### 1. Daily Treasury Statements

Fetch treasury data for specific dates using the `get_daily_treasury_statement` tool:

```typescript
// Example usage through Claude
Human: Get the treasury statement for 2024-03-01
Assistant: I'll fetch that information for you using the treasury statement tool.
```

### 2. Historical Data Resource

Access 30 days of historical treasury data through the resource system:

- Automatically cached for 1 hour
- Updates on demand
- Provides formatted JSON data

### 3. Report Generation

Generate formatted treasury reports using the `daily_treasury_report` prompt:

```typescript
// Example usage through Claude
Human: Generate a treasury report for 2024-03-01
Assistant: I'll use the daily treasury report prompt to create a formatted report...
```
