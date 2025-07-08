# Findymail MCP Server

This is a Model Context Protocol (MCP) server that integrates with the Findymail API to provide email validation and finding capabilities.

## Features

- Validate email addresses to check if they are valid and deliverable
- Find work emails for individuals using name and company information
- Find work emails for individuals using their profile URLs (LinkedIn, etc.)

## Setup

### Local Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your Findymail API key:
   ```
   FINDYMAIL_API_KEY=your_api_key_here
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
2. Create a `.env` file with your Findymail API key
3. Build and run using Docker Compose:
   ```
   docker-compose up -d
   ```

## MCP Configuration

To use this server with an MCP client, add the following configuration to your MCP settings file:

```json
{
  "mcpServers": {
    "findymail": {
      "command": "node",
      "args": ["path/to/findymail/dist/index.js"],
      "env": {
        "FINDYMAIL_API_KEY": "your_api_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Available Tools

- `findymail_validate_email`: Validate an email address to check if it's valid and deliverable
- `findymail_find_work_email`: Find a work email for an individual using name and company information
- `findymail_find_work_email_from_profile`: Find a work email for an individual using their profile URL

## License

ISC
