# TMF620 MCP Server

This is a Model Context Protocol (MCP) server that allows AI agents to interact with a remote TMF620 Product Catalog Management API.

## Features

- Connect AI agents to a remote TMF620 Product Catalog Management API
- List, retrieve, and create catalogs, product offerings, and product specifications
- Configurable connection to any TMF620-compliant API

## Setup

1. Install the required dependencies:

```bash
pip install -r requirements.txt
```

2. Configure the connection to your remote TMF620 server:

Edit the `config.py` file and update the following settings:

- `TMF620_API_URL`: The base URL of your remote TMF620 server
- `AUTH_CONFIG`: Authentication details for your remote server (if required)
- Other settings as needed

## Running the Server

Start the MCP server:

```bash
python mcp_server.py
```

The server will be available at http://localhost:7001 by default.

## Using with Claude Desktop

To use this MCP server with Claude Desktop, add the following to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "tmf620": {
      "command": "python",
      "args": ["path/to/mcp_server.py"]
    }
  }
}
```

## Available Tools

The MCP server exposes the following tools to AI agents:

### Catalog Management
- `list_catalogs`: List all available product catalogs
- `get_catalog`: Get a specific product catalog by ID

### Product Offering Management
- `list_product_offerings`: List all product offerings with optional filtering by catalog ID
- `get_product_offering`: Get a specific product offering by ID
- `create_product_offering`: Create a new product offering

### Product Specification Management
- `list_product_specifications`: List all product specifications
- `get_product_specification`: Get a specific product specification by ID
- `create_product_specification`: Create a new product specification

### System Tools
- `health`: Check the health of the server and API connection

## Example Usage

Here's an example of how an AI agent might use these tools:

```
To list all catalogs:
/tool tmf620.list_catalogs

To get a specific catalog:
/tool tmf620.get_catalog catalog_id=123456

To create a new catalog:
/tool tmf620.create_catalog name="New Catalog" description="A new product catalog"

To list product offerings:
/tool tmf620.list_product_offerings name="Premium" is_bundle=true

To get a specific product offering:
/tool tmf620.get_product_offering offering_id=789012

To create a new product offering:
/tool tmf620.create_product_offering name="Premium Service" description="High-quality service" is_bundle=false is_sellable=true
```

## Extending

To add more tools for other TMF620 endpoints, edit the `mcp_server.py` file and add new tool definitions following the existing pattern.

## License

This project is licensed under the MIT License. 