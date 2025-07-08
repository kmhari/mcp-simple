# ClimateTriage MCP Server

An MCP server implementation that integrates with the ClimateTriage API, providing tools to search for open source issues related to climate change and sustainability.

## Features

- **Issue Search**: Find open source issues in climate-related projects
- **Multiple Filters**: Filter by category, programming language, keywords, and more
- **Sorting Options**: Sort issues by creation date, update date, or stars

## Tools

### search_climate_issues

Searches for open source issues related to climate change and sustainability.

**Inputs:**
- `category` (string, optional): Filter issues by project category (e.g., 'Climate Change', 'Energy Systems')
- `language` (string, optional): Filter issues by programming language (e.g., 'JavaScript', 'Python')
- `keyword` (string, optional): Filter issues by project keyword (e.g., 'good first issue', 'help wanted')
- `page` (number, optional): Pagination page number (starts at 1)
- `per_page` (number, optional): Number of records per page (default: 10)
- `sort` (string, optional): Field to sort by ('created_at', 'updated_at', 'stars', default: 'created_at')
- `order` (string, optional): Sort order ('asc' or 'desc', default: 'desc' for most recent first)

## Configuration

By default, the server connects to the ClimateTriage API at `https://ost.ecosyste.ms/api/v1`.

## Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "climate-triage": {
      "command": "npx",
      "args": ["-y", "git+https://github.com/Codeshark-NET/climate-triage-mcp.git"]
    }
  }
}
```

## License
This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License.