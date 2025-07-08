# Prometheus Alertmanager MCP Server

This project implements a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that integrates with [Prometheus Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/). It serves as a bridge between [Claude AI](https://claude.ai/) and Alertmanager, allowing Claude to interact with and manage alerts through a standardized interface.

## Core Features

1. **Alert Retrieval**: Fetches and formats current alerts from Alertmanager with optional filtering capabilities.

2. **Alert Details**: Provides detailed information about specific alerts when referenced by their fingerprint.

3. **Silence Management**: Offers tools to create, list, and delete silences that suppress notifications for specific alerts.

4. **Alert Grouping**: Retrieves alert groups as organized by Alertmanager.

## Technical Implementation

- Built using [TypeScript](https://www.typescriptlang.org/) and the [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- Communicates with [Alertmanager's HTTP API (v2)](https://prometheus.io/docs/alerting/latest/api/)
- Runs as a stdio-based process compatible with [Claude for Desktop](https://claude.ai/download)
- Implements proper error handling and timeout management
- Provides strongly-typed interfaces for alert and silence data

## Installation

### Prerequisites

- Access to a running [Prometheus Alertmanager](https://prometheus.io/docs/alerting/latest/configuration/) instance
- For Claude for Desktop: [Node.js](https://nodejs.org/) (v18 or newer) installed on your system

### Setup

The package is available on npm and can be used directly with npx:

```bash
npx alertmanager-mcp
```

For global installation:

```bash
npm install -g alertmanager-mcp
alertmanager-mcp
```

## Usage with Claude for Desktop

1. Configure Claude for Desktop to use the MCP server by editing the configuration file:
  ```json
  {
    "mcpServers": {
      "alertmanager": {
        "command": "docker",
        "args": [
          "run",
          "--rm",
          "-i",
          "--network=host",
          "-e", "ALERTMANAGER_URL=http://your-alertmanager-url:9093",
          "ghcr.io/kaznak/alertmanager-mcp:latest"
        ],
        "env": {}
      }
    }
  }
  ```

2. Restart Claude for Desktop to load the new configuration.

3. You can now ask Claude to interact with Alertmanager using natural language:
   - "Show me current alerts"
   - "Filter alerts related to CPU issues"
   - "Get details for this alert"
   - "Create a silence for this alert for the next 2 hours"

## Available Tools

### get-alerts

Retrieves a list of alerts with optional filtering.

Parameters:
- `filter`: (optional) Filtering query (e.g., `alertname=~'.*CPU.*'`)
- `silenced`: (optional) Include silenced alerts
- `inhibited`: (optional) Include inhibited alerts
- `active`: (optional) Include active alerts (default: true)

### get-alert-details

Gets detailed information about a specific alert.

Parameters:
- `fingerprint`: Alert fingerprint

### create-silence

Creates a silence for alerts matching specified criteria.

Parameters:
- `matchers`: List of matchers for alerts
- `startsAt`: (optional) Silence start time (ISO8601 format, default is current time)
- `endsAt`: Silence end time (ISO8601 format)
- `createdBy`: Username who created the silence
- `comment`: Reason or explanation for the silence

### get-silences

Retrieves a list of silences with optional filtering.

Parameters:
- `filter`: (optional) Filtering query (e.g., `createdBy=~'.*admin.*'`)

### delete-silence

Deletes a silence by ID.

Parameters:
- `silenceId`: ID of the silence to delete

### get-alert-groups

Gets alert groups with optional filtering.

Parameters:
- `active`: (optional) Include active alerts (default: true)
- `silenced`: (optional) Include silenced alerts
- `inhibited`: (optional) Include inhibited alerts

## Extending the Server

This MCP server can be extended with additional features such as:

- Alert trend analysis
- Automatic response suggestions
- Integration with incident management systems
- Custom dashboards for specific alert types

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/docs/concepts/architecture)
- [Prometheus Alertmanager Documentation](https://prometheus.io/docs/alerting/latest/alertmanager/)
- [Alertmanager API Reference](https://prometheus.io/docs/alerting/latest/api/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Claude AI Documentation](https://docs.anthropic.com/claude/)
