# Senechal MCP Server

A Model Context Protocol (MCP) server that acts as a companion to the Senechal project, providing health data from the Senechal API to LLM applications.

## Overview

This server provides a standardized interface for LLMs to access health data from the Senechal API. It exposes:

- **Resources**: Health data that can be loaded into an LLM's context
- **Tools**: Functions that can be called by LLMs to fetch health data
- **Prompts**: Reusable templates for analyzing health data

## Installation

1. Clone this repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

Copy the `.env.example` file to `.env` and add your Senechal API key and URL:

```
# Required: Senechal API Key
SENECHAL_API_KEY=your_api_key_here

# Required: API base URL
SENECHAL_API_BASE_URL=https://your-api-host/api/senechal
```

Both the API key and API URL are required for the server to function.

### Windows Configuration

When running on Windows, be sure to:

1. Use backslashes or properly escaped paths in the configuration
2. Use the full path to your Python virtual environment in the claude-desktop-config.json:

```json
{
    "mcpServers": {
        "senechal-health": {
            "command": "C:\\path\\to\\venv\\Scripts\\python.exe",
            "args": [
                "C:\\path\\to\\senechal_mcp_server.py"
            ],
            "env": {
                "SENECHAL_API_KEY": "your_api_key_here"
            }
        }
    }
}
```

Note that environment variables in the MCP configuration do not use the `.env` file, so you'll need to set them explicitly in the config.

## Usage

### Testing the Client/Server Setup

The simplest way to test the setup is to run the example client:

```bash
# In one terminal, start the server
python senechal_mcp_server.py

# In another terminal, run the example client
python example_client.py
```

### Start the Server

```bash
python senechal_mcp_server.py
```

### Development Mode with MCP Inspector

```bash
mcp dev senechal_mcp_server.py
```

### Install in Claude Desktop

The server includes a configuration file for Claude Desktop:

```bash
mcp install senechal_mcp_server.py
```

You can then select "Senechal Health" from the tools menu in Claude Desktop.

## Available Resources

- `senechal://health/summary/{period}` - Get health summary for day, week, month, or year
  - Example: `senechal://health/summary/day?span=7&metrics=all`
  - Parameters:
    - `period`: day, week, month, year
    - `span`: Number of periods (default: 1)
    - `metrics`: Comma-separated list or "all" (default)
    - `offset`: Number of periods to offset from now (default: 0)

- `senechal://health/profile` - Get the user's health profile
  - Contains demographics, medications, supplements

- `senechal://health/current` - Get current health measurements
  - Example: `senechal://health/current?types=1,2,3`
  - Parameters:
    - `types`: Optional comma-separated list of measurement type IDs

- `senechal://health/trends` - Get health trends over time
  - Example: `senechal://health/trends?days=30&types=1,2,3&interval=day`
  - Parameters:
    - `days`: Number of days to analyze (default: 30)
    - `types`: Optional comma-separated list of measurement type IDs
    - `interval`: Grouping interval - day, week, month (default: day)

- `senechal://health/stats` - Get statistical analysis of health metrics
  - Example: `senechal://health/stats?days=30&types=1,2,3`
  - Parameters:
    - `days`: Analysis period in days (default: 30)
    - `types`: Optional comma-separated list of measurement type IDs

## Available Tools

- `fetch_health_summary` - Fetch a health summary for a specific period
  - Parameters:
    - `period` (required): day, week, month, year
    - `metrics` (optional): Comma-separated metrics or "all" (default)
    - `span` (optional): Number of periods to return (default: 1)
    - `offset` (optional): Number of periods to offset (default: 0)

- `fetch_health_profile` - Fetch the user's health profile
  - No parameters required

- `fetch_current_health` - Fetch the latest health measurements
  - Parameters:
    - `types` (optional): List of measurement type IDs to filter by

- `fetch_health_trends` - Fetch health trend data
  - Parameters:
    - `days` (optional): Number of days to analyze (default: 30)
    - `types` (optional): List of measurement type IDs to filter by
    - `interval` (optional): Grouping interval - day, week, month (default: day)

- `fetch_health_stats` - Fetch statistical analysis of health metrics
  - Parameters:
    - `days` (optional): Analysis period in days (default: 30)
    - `types` (optional): List of measurement type IDs to filter by

## Available Prompts

- `analyze_health_summary` - Prompt to analyze health summaries
  - Provides a template for identifying abnormal metrics, trends, and suggesting actions
  - Intended to be used with data from `senechal://health/summary/day?span=7`

- `compare_health_trends` - Prompt to compare health trends over different time periods
  - Provides a template for comparing trends across different timeframes (7, 30, 90 days)
  - Intended to be used with data from the health trends endpoint

## Example Interactions

### Loading Health Summary Data

```python
# In an LLM application, load a week of health summaries
content, mime_type = await session.read_resource("senechal://health/summary/day?span=7")
```

### Calling Health Data Tools

```python
# In an LLM conversation
result = await session.call_tool(
    "fetch_health_trends", 
    arguments={
        "days": 30, 
        "interval": "day"
    }
)

# More complex example combining tools and resources
profile = await session.call_tool("fetch_health_profile")
trends = await session.call_tool(
    "fetch_health_trends", 
    arguments={"days": 90, "interval": "week"}
)
```

### Using Health Analysis Prompts

```python
# Get a prompt for analyzing health data
prompt_result = await session.get_prompt("analyze_health_summary")
for message in prompt_result.messages:
    print(f"[{message.role}]: {message.content.text}")
```

See the `example_client.py` file for a complete working example.

## API Endpoints

The Senechal MCP server communicates with the following Senechal API endpoints:

- `/health/summary/{period}` - Get health summaries
- `/health/profile` - Get health profile
- `/health/current` - Get current measurements
- `/health/trends` - Get health trends
- `/health/stats` - Get health stats