# LinkedIn Jobs MCP Server

A Model Context Protocol (MCP) server for searching and retrieving LinkedIn job postings via the RapidAPI LinkedIn Data API.

## What is MCP?

Model Context Protocol (MCP) is a framework developed by Anthropic that allows AI models like Claude to interact with external tools and APIs. MCP enables Claude to execute code, access databases, retrieve information from the web, and more, significantly extending its capabilities beyond its training data.

MCP works by defining a set of tools that Claude can invoke through a standardized protocol. When Claude needs information that requires external access, it can call these tools, which execute the necessary operations and return results back to Claude. This allows Claude to provide more accurate, up-to-date, and contextually relevant responses.

Learn more about MCP from [Anthropic's announcement](https://www.anthropic.com/news/model-context-protocol).

## Features

- Search for LinkedIn job postings using keywords
- Filter jobs by location
- Get detailed information about specific job postings
- Location search functionality for finding LinkedIn location IDs

## Requirements

- Python 3.8+
- RapidAPI key with access to the LinkedIn Data API
- Required Python packages (see `requirements.txt`)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/rom7699/linkedin-jobs-mcp.git
cd linkedin-jobs-mcp
```

2. Install the required packages:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the project root and add your RapidAPI key:
```
RAPIDAPI_KEY=your_rapidapi_key_here
```

## Usage

### Running the MCP Server

```bash
python main.py
```

This will start the MCP server using stdio transport, which is suitable for integrating with Claude via the Claude Desktop application.

### Configuring Claude Desktop

To use this MCP server with Claude Desktop, add the following configuration to your `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "mcp-linkedin": {
            "command": "/path/to/python",
            "args": [
                "--directory",
                "/path/to/linkedin-jobs-mcp",
                "run",
                "main.py"
            ]
        }
    }
}
```

Example configuration:
```json
{
    "mcpServers": {
        "documentation": {
            "command": "/Users/Rom/.local/bin/uv",
            "args": [
            "--directory",
            "/Users/Rom/Documents/personal_projects/documentation",
            "run",
            "main.py"
            ]
        }
    }
}
```

### Available Tools

The MCP server provides the following tools:

1. `search_jobs(keywords, limit=10, location='Israel', format_output=True)` - Search for jobs matching keywords in the specified location
2. `get_job_details(job_id)` - Get detailed information about a specific job posting
3. `search_locations(keyword)` - Search for LinkedIn location IDs by keyword

## Example Interactions with Claude

Once your MCP server is configured with Claude Desktop, you can interact with it as follows:

```
Human: Find me software engineering jobs in Berlin.

Claude: I'll search for software engineering jobs in Berlin for you using the LinkedIn API.

[Claude uses the MCP server to fetch results]

Here are the top software engineering jobs in Berlin:

## Senior Software Engineer
- **Company**: Company XYZ
- **Location**: Berlin, Germany
- **Posted**: 2023-04-10
- **URL**: https://linkedin.com/jobs/view/12345

## Frontend Developer
- **Company**: Tech Startup Inc.
- **Location**: Berlin, Germany
- **Posted**: 2023-04-08
- **URL**: https://linkedin.com/jobs/view/67890

...
```

## Credits

This project uses the [LinkedIn Data API](https://rapidapi.com/rockapis-rockapis-default/api/linkedin-data-api/playground/apiendpoint_3edd0762-b6a9-4ee4-9231-c574bedc7019) available through RapidAPI.

The MCP integration is built using Anthropic's [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol).

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
