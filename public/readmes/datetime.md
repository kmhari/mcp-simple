# MCP DateTime

A TypeScript implementation of a Model Context Protocol (MCP) server that provides datetime and timezone information to agentic systems and chat REPLs.

## Overview

MCP DateTime is a simple server that implements the [Model Context Protocol](https://github.com/model-context-protocol/mcp) to provide datetime and timezone information to AI agents and chat interfaces. It allows AI systems to:

- Get the current time in the local system timezone
- Get the current time in any valid timezone
- List all available timezones
- Access timezone information through URI resources

## Installation

### From npm

```bash
npm install -g mcp-datetime
```

### From source

```bash
git clone https://github.com/odgrmi/mcp-datetime.git
cd mcp-datetime
npm install
npm run build
```

## Usage

### Command Line

MCP DateTime can be run in two modes:

#### 1. Standard I/O Mode (Default)

This mode is ideal for integrating with AI systems that support the MCP protocol through standard input/output:

```bash
mcp-datetime
```

#### 2. Server-Sent Events (SSE) Mode

This mode starts an HTTP server that provides SSE transport for the MCP protocol:

```bash
mcp-datetime --sse
```

You can also specify a custom port and URI prefix:

```bash
mcp-datetime --sse --port=8080 --prefix=/api/datetime
```

### Environment Variables

- `PORT`: Sets the port for SSE mode (default: 3000)
- `URI_PREFIX`: Sets the URI prefix for SSE mode (default: none)

## Available Tools

MCP DateTime provides the following tools:

### `get-current-time`

Returns the current time in the system's local timezone.

### `get-current-timezone`

Returns the current system timezone.

### `get-time-in-timezone`

Returns the current time in a specified timezone.

Parameters:
- `timezone`: The timezone to get the current time for (e.g., "America/New_York")

### `list-timezones`

Returns a list of all available timezones.

## Resource URIs

MCP DateTime also provides access to timezone information through resource URIs:

### `datetime://{timezone}`

Returns the current time in the specified timezone.

Example: `datetime://America/New_York`

### `datetime://list`

Returns a list of all available timezones.

## Common Timezones

The following common timezones are always available:

- UTC
- Europe/London
- Europe/Paris
- Europe/Berlin
- America/New_York
- America/Chicago
- America/Denver
- America/Los_Angeles
- Asia/Tokyo
- Asia/Shanghai
- Asia/Kolkata
- Australia/Sydney
- Pacific/Auckland

## SSE Endpoints

When running in SSE mode, the following endpoints are available:

- `/sse`: SSE connection endpoint
- `/message`: Message endpoint for client-to-server communication
- `/info`: Basic server information

If a URI prefix is specified, it will be prepended to all endpoints.

## Integration with AI Systems

MCP DateTime can be integrated with AI systems that support the Model Context Protocol. This allows AI agents to access accurate timezone and datetime information.

## Development

### Prerequisites

- Node.js 14.16 or higher
- npm

### Setup

```bash
git clone https://github.com/odgrim/mcp-datetime.git
cd mcp-datetime
npm install
```

### Build

```bash
npm run build
```

### Run in Development Mode

```bash
npm run dev        # Standard I/O mode
npm run dev:sse    # SSE mode
```

## License

This project is licensed under the Mozilla Public License 2.0 - see the [LICENSE](LICENSE) file for details. 
