# Climate Data Store (CDS) MCP Server

## Overview

A Model Context Protocol (MCP) server implementation that provides the LLM an
interface to retrieve [CDS](https://cds.climate.copernicus.eu/) catalogue data and job statuses.
The underlying API is `datapi` - docs found [here](https://ecmwf-projects.github.io/datapi/).

## Features

- Tools:
  - `get_jobs`: find the jobs available, optionally add a filter based on status.
    Returns a list of job ids.
  - `download_job_result`: downloads the job result using job id.
  - `get_all_collections`: gets all available collection ids in the catalogue.
  - `get_collection_by_id`: fetches information for a specified collection.
  - `submit_job`: submits a download request.

- Environment variable support using `.env`.

## Prerequisites

- Python 3.13 or higher.
- CDS API Key: [here](https://cds.climate.copernicus.eu/)
- MCP Host/Client: tested on Claude Desktop and the MCP Inspector.

## Installation

- Clone the repository:

```bash
git clone git@github.com:albertdow/mcp-datapi.git
cd mcp-datapi
```

- Install dependencies (using `uv`):

```bash
uv add "mcp[cli]" datapi python-dotenv
```

- Setup CDS API key by creating a `.env` file and adding the following:

```bash
DATAPI_URL=<DATAPI_URL>
DATAPI_KEY=<DATAPI_KEY>
```

Details on CDS API key setup can be found [here](https://cds.climate.copernicus.eu/how-to-api).

## Usage

### Dev Mode with MCP Inspector

Test the server locally:

```bash
mcp dev datapi_server.py
```

### Integrate with Claude Desktop

```bash
mcp install datapi_server.py --name "DatapiServer" -f .env
```

Or directly put add to your `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "DatapiServer": {
            "command": "uv",
            "args": [
                "--directory",
                "mcp-datapi",
                "run",
                "mcp_datapi/datapi_server.py"
            ],
            "env": {
                "DATAPI_URL": "<DATAPI_URL>",
                "DATAPI_KEY": "<DATAPI_KEY>"
            }
        }
    }
}
```

Note:

- I had to specify the path to `uv`, e.g. `/Users/username/.local/bin/uv`.
