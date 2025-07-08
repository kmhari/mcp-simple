# Airtop MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with Airtop's browser automation service.

## Usage

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your Airtop API key:
   ```bash
   export AIRTOP_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev -- --server
   ```

### Use in Claude (Native MacOS)

Go into the Claude app, open up Settings -> Developer -> Edit Config

Add the following:
(replace `your_api_key_here` with your Airtop API key)

```json
{
  "mcpServers": {
    "airtop": {
      "command": "npx",
      "args": ["-y", "airtop-mcp@latest"],
      "env": {
        "AIRTOP_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

- `createSession`: Create a new Airtop browser session
- `createWindow`: Create a new browser window in the session
- `pageQuery`: Query the current page content using AI
- `terminateSession`: Terminate an Airtop browser session
- `paginatedExtraction`: Extract data from a paginated list

## Configuration

The server runs on port 3456 by default. You can change this by setting the `PORT` environment variable.

## License

ISC
