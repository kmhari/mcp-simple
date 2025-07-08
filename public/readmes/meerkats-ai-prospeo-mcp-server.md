# Prospeo MCP Server

This is a Model Context Protocol (MCP) server that integrates with the Prospeo API to provide email finding and LinkedIn profile enrichment capabilities.

## Features

- Find work emails using name and company information
- Find email addresses associated with a domain
- Find work email and enrich person data from LinkedIn URL

## Setup

### Local Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Prospeo API key:
   ```
   PROSPEO_API_KEY=your_api_key_here
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
2. Create a `.env` file with your Prospeo API key
3. Build and run using Docker Compose:
   ```
   docker-compose up -d
   ```

## MCP Configuration

To use this server with an MCP client, add the following configuration to your MCP settings file:

```json
{
  "mcpServers": {
    "prospeo": {
      "command": "node",
      "args": ["path/to/prospeo/dist/index.js"],
      "env": {
        "PROSPEO_API_KEY": "your_api_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Available Tools

- `prospeo_find_work_email`: Find a work email using name and company information
- `prospeo_find_domain_emails`: Find email addresses associated with a domain
- `prospeo_enrich_from_linkedin`: Find work email and enrich person data from LinkedIn URL

## License

ISC
