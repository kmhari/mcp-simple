# RocketReach MCP Server

This is a Model Context Protocol (MCP) server that integrates with the RocketReach API to provide email finding, phone number finding, and company enrichment capabilities.

## Features

- Find professional emails for individuals
- Find personal emails for individuals
- Enrich company data
- Find phone numbers for individuals

## Setup

### Local Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your RocketReach API key:
   ```
   ROCKETREACH_API_KEY=your_api_key_here
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
2. Create a `.env` file with your RocketReach API key
3. Build and run using Docker Compose:
   ```
   docker-compose up -d
   ```

## MCP Configuration

To use this server with an MCP client, add the following configuration to your MCP settings file:

```json
{
  "mcpServers": {
    "rocketreach": {
      "command": "node",
      "args": ["path/to/rocketreach/dist/index.js"],
      "env": {
        "ROCKETREACH_API_KEY": "your_api_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Available Tools

- `rocketreach_find_professional_email`: Find a professional email for an individual
- `rocketreach_find_personal_email`: Find a personal email for an individual
- `rocketreach_enrich_company`: Enrich company data
- `rocketreach_find_phone`: Find a phone number for an individual

## License

ISC
