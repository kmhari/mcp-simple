# Supabase MCP Server

An MCP server that connects to a Supabase PostgreSQL database, exposing table schemas as resources and providing tools for data analysis.

## Features

- Connection to Supabase PostgreSQL database
- Table schemas exposed as resources
- Read-only SQL query tools
- Prompts for common data analysis tasks

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and update with your Supabase credentials:
   ```
   cp .env.example .env
   ```
4. Edit the `.env` file with your actual Supabase connection details

## Running the Server

### Using stdio (command line integration)

```
npm start
```

### Using HTTP with SSE (for web integration)

```
npm run start:http
```

## Using with MCP Clients

This server can be used with any MCP-compatible client, including Claude.app and the MCP Inspector for testing.

### Available Resources

- `schema://tables` - Lists all tables in the database
- `schema://table/{tableName}` - Shows schema for a specific table

### Available Tools

- `query` - Runs a read-only SQL query against the database
- `analyze-table` - Gets basic statistics about a table
- `find-related-tables` - Discovers tables related to a given table

### Available Prompts

- `table-exploration` - Guides exploration of a specific table
- `data-summary` - Creates a summary of data in a table
- `relationship-analysis` - Analyzes relationships between tables
