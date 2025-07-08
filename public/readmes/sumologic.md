# MCP Sumo Logic

A Model Context Protocol (MCP) server that integrates with Sumo Logic's API to perform log searches.

## Features

- Search Sumo Logic logs using custom queries
- Configurable time ranges for searches
- Error handling and detailed logging
- Docker support for easy deployment

## Environment Variables

```env
ENDPOINT=https://api.au.sumologic.com/api/v1  # Sumo Logic API endpoint
SUMO_API_ID=your_api_id                       # Sumo Logic API ID
SUMO_API_KEY=your_api_key                     # Sumo Logic API Key
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the required environment variables
4. Build the project:
   ```bash
   npm run build
   ```
5. Start the server:
   ```bash
   npm start
   ```

## Docker Setup

1. Build the Docker image:
   ```bash
   docker build -t mcp/sumologic .
   ```

2. Run the container (choose one method):

   a. Using environment variables directly:
   ```bash
   docker run -e ENDPOINT=your_endpoint -e SUMO_API_ID=your_api_id -e SUMO_API_KEY=your_api_key mcp/sumologic
   ```

   b. Using a .env file:
   ```bash
   docker run --env-file .env mcp/sumologic
   ```

   Note: Make sure your .env file contains the required environment variables:
   ```env
   ENDPOINT=your_endpoint
   SUMO_API_ID=your_api_id
   SUMO_API_KEY=your_api_key
   ```

## Usage

The server exposes a `search-sumologic` tool that accepts the following parameters:

- `query` (required): The Sumo Logic search query
- `from` (optional): Start time in ISO 8601 format
- `to` (optional): End time in ISO 8601 format

Example query:
```typescript
const query = '_index=app_pro_fiat_cont | json auto | fields log_identifier';
const results = await search(sumoClient, query, {
  from: '2024-02-23T00:00:00Z',
  to: '2024-02-24T00:00:00Z',
});
```

## Error Handling

The server includes comprehensive error handling and logging:
- API errors are caught and logged with details
- Search job status is monitored and logged
- Network and authentication issues are properly handled

## Development

To run in development mode:
```bash
npm run dev
```

For testing:
```bash
npm test
``` 