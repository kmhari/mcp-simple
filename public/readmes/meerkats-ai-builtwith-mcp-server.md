# BuiltWith MCP Server

This is a Model Context Protocol (MCP) server that integrates with the BuiltWith API to provide technology stack analysis of websites.

## Features

- Find technology stack information for any domain
- Analyze what technologies are used on websites

## Setup

### Local Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your BuiltWith API key:
   ```
   BUILTWITH_API_KEY=your_api_key_here
   ```
4. Build the server:
   ```
   npm run build
   ```
5. Start the server:
   ```
   npm start
   ```

### Docker Setup

1. Clone this repository
2. Create a `.env` file with your BuiltWith API key
3. Build and run using Docker Compose:
   ```
   docker-compose up -d
   ```

## MCP Configuration

To use this server with an MCP client, add the following configuration to your MCP settings file:

```json
{
  "mcpServers": {
    "builtwith": {
      "command": "node",
      "args": ["path/to/builtwith/dist/index.js"],
      "env": {
        "BUILTWITH_API_KEY": "your_api_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Available Tools

- `builtwith_find_tech_stack`: Find the technology stack used by a website

## License

ISC
