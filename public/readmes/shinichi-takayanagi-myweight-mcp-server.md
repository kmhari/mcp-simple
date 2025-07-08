# MyWeight MCP Server

[![CI/CD Status](https://github.com/shinichi-takayanagi/myweight-mcp-server/actions/workflows/main.yml/badge.svg)](https://github.com/shinichi-takayanagi/myweight-mcp-server/actions/workflows/main.yml)

This server connects to the Health Planet API to access Takayanagi-san's weight data. Any MCP-compatible client can use this server to retrieve and analyze weight measurements.

👉 Check out the [original website](https://shinichi-takayanagi.github.io/myweight/) to view the data directly.

## What It Does

- **Retrieves Data**: Fetches weight records from Health Planet API
- **Works with Any Client**: Compatible with all MCP clients

## Quick Start Guide

### 1. Setup & Run Locally

```bash
# Clone this repository
git clone https://github.com/shinichi-takayanagi/myweight-mcp-server.git

# Install required packages
npm install

# Launch the development server
npm run dev
```

Your server will be running at `http://localhost:8787`.

### 2. Connect Your MCP Client

Add this configuration to your MCP client:

```json
{
  "mcpServers": {
    "myweight": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"
      ]
    }
  }
}
```

## Using the API

### Get Weight Data

With the `fetchInnerScanData` tool, you can retrieve weight measurements for any time period:

**Parameters:**
- `from`: Starting date/time in YYYYMMDDHHmmss format (e.g., `20240530000000` for May 30, 2024)
- `to`: Ending date/time in YYYYMMDDHHmmss format (e.g., `20240531235959` for May 31, 2024)

**Example Response:**
```json
[
  {
    "date": "2024/05/30",
    "weight": 65.2
  },
  {
    "date": "2024/05/31",
    "weight": 65.1
  }
]
```

## Deploy to Production

### Preparing for Cloudflare Workers Deployment

1. Create a Cloudflare account and login to the [Cloudflare Dashboard](https://dash.cloudflare.com/).

2. Set up Cloudflare Workers:
   - Enable Workers on your account
   - Choose a worker name for your deployment
   - Install the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

3. Configure your project:
   - Edit the `wrangler.toml` file to include your Cloudflare information:

```toml
name = "your-worker-name"
account_id = "your-account-id"
workers_dev = true
```

4. Deploy your project:

```bash
npm run deploy
```

5. After deployment, update your MCP client configuration with your Cloudflare URL:

```json
{
  "mcpServers": {
    "myweight": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://[your-worker-name].[your-account].workers.dev/sse"
      ]
    }
  }
}
```

## Troubleshooting

### Connection Problems
- Make sure the server is running: `npm run dev`
- Reset Wrangler cache: `rm -rf ~/.wrangler`

### General Issues
- Verify your `wrangler.toml` configuration
- If deployment fails, check the Cloudflare dashboard for detailed error messages
