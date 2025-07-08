# PlainSignal MCP Server

This is a Model Context Protocol (MCP) server implementation for PlainSignal analytics data. It provides tools for retrieving analytics reports and metrics through the MCP protocol.

## Setup

### Installation

#### From npm (recommended)

```bash
# Install globally
npm install -g @plainsignal/plainsignal-mcp

# Or install locally in your project
npm install @plainsignal/plainsignal-mcp
```

#### From source

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

This project uses ES modules instead of CommonJS. Make sure you're using a Node.js version that supports ES modules (Node.js 14+).

## Usage

### When installed from npm

```bash
# If installed globally
plainsignal-mcp --token <your_access_token>

# If installed locally
npx plainsignal-mcp --token <your_access_token>

# Or using an environment variable
export PLAINSIGNAL_TOKEN=<your_access_token>
plainsignal-mcp
```

### When using from source

Run the server with your access token:

```bash
node src/index.js --token <your_access_token>

# Or using an environment variable
export PLAINSIGNAL_TOKEN=<your_access_token>
node src/index.js
```

You can also specify a custom API base URL:

```bash
node src/index.js --token <your_access_token> --api-base-url <api_base_url>
```

Or use the short format:

```bash
node src/index.js -t <your_access_token> -u <api_base_url>
```

Alternatively, set the access token and API base URL as environment variables and use the test script:

```bash
export PLAINSIGNAL_TOKEN=your_access_token
export API_BASE_URL=https://app.plainsignal.com/api/v1
./test.sh
```

By default, the server connects to `https://app.plainsignal.com/api/v1`.

## MCP Server configs

### Claude Desktop

Add this snippet to your `claude_desktop_config.json`:

```
{
  "mcpServers": {
    "plainsignal": {
      "command": "npx -y @plainsignal/plainsignal-mcp",
      "env": {
        "PLAINSIGNAL_TOKEN": "<YOUR_PLAINSIGNAL_TOKEN>"
      }
    }
  }
}
```

## Available Tools

The server provides the following tools:

### getReport

Retrieves an analytics report for a specified domain and time period.

Parameters:
- `organizationID`: Organization ID
- `domainID`: Domain ID
- `periodFrom`: Report start datetime in RFC3339 format
- `periodTo`: Report end datetime in RFC3339 format
- `periodSelection`: Period type (m: month, y: year, d: day)
- `aggregationWindow`: Data aggregation window (h: hour, d: day)
- `filters`: (Optional) List of filters as key-value pairs

### getSubReport

Retrieves detailed metrics for a specific aspect of analytics data.

Parameters:
- `organizationID`: Organization ID
- `domainID`: Domain ID
- `periodFrom`: Report start datetime in RFC3339 format
- `periodTo`: Report end datetime in RFC3339 format
- `periodSelection`: Period type (m: month, y: year, d: day)
- `aggregationWindow`: Data aggregation window (h: hour, d: day)
- `subReportType`: Type of report (1: page, 2: entry page, etc.)
- `filters`: (Optional) List of filters as key-values pairs
- `pagination`: (Optional) Pagination controls with limit and offset

## API Reference

This server communicates with the PlainSignal API. By default, it connects to `https://app.plainsignal.com/api/v1`, but you can configure the API endpoint in several ways:

1. Use the `--api-base-url` command line option:
   ```bash
   node src/index.js --token <your_token> --api-base-url https://app.plainsignal.com/api/v1
   ```

2. Set the `API_BASE_URL` environment variable:
   ```bash
   export API_BASE_URL=https://app.plainsignal.com/api/v1
   ```

3. Pass a custom API base URL to the constructor when instantiating the server programmatically:
   ```javascript
   const server = new PlainSignalStdioServer(token, 'https://app.plainsignal.com/api/v1');
   ```

## For Developers

The server is implemented using the MCP SDK and communicates over STDIO.

## Examples

An example client is provided to demonstrate how to use the MCP server:

```bash
# Set your access token
export PLAINSIGNAL_TOKEN=your_access_token

# Run the example client
npm run example
```

Or run the resources example client:

```bash
# Set your access token
export PLAINSIGNAL_TOKEN=your_access_token

# Run the resources example client
npm run resources-example
```

The example client demonstrates:
1. Connecting to the MCP server
2. Listing available tools
3. Calling the `getReport` tool with sample parameters
4. Processing and displaying the results

The resources example client demonstrates:
1. Connecting to the MCP server
2. Listing available resources
3. Reading the `listDomains` resource
4. Processing and displaying the results

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.