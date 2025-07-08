# Zoomeye MCP Server

An MCP (Model Context Protocol) server providing access to the ZoomEye v2 API, enabling AI assistants to query internet‑wide host and web data, view account quotas, and (for paid plans) fetch IP history.

## Features

- **Host Search**: Query devices by IP, port, service, etc.  
- **Web Search**: Index web‑facing applications and components.  
- **Account Info**: View your ZoomEye plan and remaining query quota.  
- **Result Sampling**: Limit response sizes and select only desired fields.  
- **Summarization**: Auto‑generate top countries, ports, and organizations summaries.  
- **(Paid) IP History**: Retrieve historical scan data for a given IP.

### Requirements

- Node.js ≥ 16  
- ZoomEye API Key (found at https://www.zoomeye.org/profile)   
- Internet access to https://api.zoomeye.org  
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/help116114/zoomeye-mcp-server.git
   cd zoomeye-mcp-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the server:

   ```bash
   npm run build
   ```

4. Set up your Zoomeye API key:

   ```bash
   export Zoomeye_API_KEY="your-api-key-here"
   ```

5. Start the server:
   ```bash
   npm start
   ```

## MCP Integration

This server can be integrated with MCP-compatible AI LLMs. To add it to Cline, Curser or Claude:

1. Add the server to your MCP settings:

   ```json
   {
     "mcpServers": {
       "zoomeye": {
         "command": "node",
         "args": ["./build/index.js"],
         "env": {
           "ZOOMEYE_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   ```

2. Reload the new MCP server.

## Available Tools

### `get_account_info`

Get detailed information about a specific IP address.

**Parameters:**

- `ip` (required): IP address to look up
- `max_items` (optional): Maximum number of items to include in arrays (default: 5)
- `fields` (optional): List of fields to include in the results (e.g., ['ip_str', 'ports', 'location.country_name'])

### `search_host`

Host‐side search for devices and services.

**Parameters:**

- `query` (required): Shodan search query (e.g., 'apache country:US')
- `page` (optional): Page number for results pagination (default: 1)
- `facets` (optional): List of facets to include in the search results (e.g., ['country', 'org'])
- `max_items` (optional): Maximum number of items to include in arrays (default: 5)
- `fields` (optional): List of fields to include in the results (e.g., ['ip_str', 'ports', 'location.country_name'])
- `summarize` (optional): Whether to return a summary of the results instead of the full data (default: false)

### `search_web`

Search web resources in ZoomEye database

**Parameters:**

- `query` (required): Shodan search query (e.g., 'apache country:US')
- `page` (optional): Page number for results pagination (default: 1)
- `facets` (optional): List of facets to include in the search results (e.g., ['country', 'org'])

### `get_history_ip`

(Paid) Fetch historical scan data for an IP.

**Parameters:**

- `ip` (required): IP address to fetch historical scan data (e.g., ip="8.8.8.8")

### summarize

Generate top countries, ports, and orgs summary.

**Parameters:**

- `device_type` (required): Type of IoT device to search for (e.g., 'webcam', 'router', 'smart tv')
- `country` (optional): Optional country code to limit search (e.g., 'US', 'DE')
- `max_items` (optional): Maximum number of items to include in results (default: 5)

## Available Resources

- `zoomeye://host/{ip}`: Information about a specific IP address

## API Limitations

Some Zoomeye API endpoints require a paid membership. The following features are only available with a paid Zoomeye API key:

- more for paid
- 
- Search functionality
- Network scanning
- SSL certificate lookup
- IoT device search

By following the above structure, your **zoomeye‑mcp‑server** will seamlessly plug into any MCP‑compatible client, offering AI assistants real‑time access to ZoomEye’s powerful cyberspace search capabilities.

## License

ZGCLAB

## Developed by

[NASP](https://github.com/help116114/)
