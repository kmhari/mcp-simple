![](https://badge.mcpx.dev?type=server 'MCP Server')
[![smithery badge](https://smithery.ai/badge/@lumile/lumbretravel-mcp)](https://smithery.ai/server/@lumile/lumbretravel-mcp)

# LumbreTravel MCP Server

An MCP server that provides access to LumbreTravel API.

[LumbreTravel](https://lumbretravel.com.ar/) is a platform for managing travel programs and activities and this is the MCP server for it.  That allows you to use it on [Claude Desktop](https://claude.ai/download) or other MCP clients.

## Features

This MCP Server allows access to all the tools that LumbreTravel API provides.

### Tools

#### Programs

- `create_program` - Create a new program
- `update_program` - Update an existing program
- `delete_program` - Delete a program
- `reactivate_program` - Reactivate a program

#### Activities

- `add_activities` - Add activities to a program
- `update_activities` - Update activities of a program
- `delete_activities` - Delete activities of a program

#### Passengers

- `get_passengers_by_fullname` - Get passengers by fullname
- `get_passengers_by_email` - Get passengers by email
- `create_bulk_passengers` - Create bulk passengers
- `create_passengers` - Create passengers
- `update_passengers` - Update passengers
- `delete_passengers` - Delete passengers
- `reactivate_passenger` - Reactivate a passenger
- `add_passengers_to_program` - Add passengers to a program

#### Agencies

- `get_agencies` - Get agencies
- `get_agency_by_name` - Get an agency by name
- `create_agency` - Create an agency
- `update_agency` - Update an agency
- `delete_agency` - Delete an agency
- `reactivate_agency` - Reactivate an agency

#### Hotels

- `create_hotel` - Create a hotel
- `update_hotel` - Update a hotel
- `delete_hotel` - Delete a hotel
- `reactivate_hotel` - Reactivate a hotel
- `get_hotel_by_name` - Get a hotel by name
- `get_hotels` - Get hotels

#### Services

- `create_service` - Create a service
- `update_service` - Update a service
- `delete_service` - Delete a service
- `reactivate_service` - Reactivate a service
- `get_services_by_name` - Get a service by name

#### Service Languages

- `create_service_language` - Create a service language
- `update_service_language` - Update a service language
- `delete_service_language` - Delete a service language
- `reactivate_service_language` - Reactivate a service language
- `get_service_language_by_name` - Get a service language by name
- `get_service_languages` - Get service languages

#### Providers

- `create_provider` - Create a provider
- `update_provider` - Update a provider
- `delete_provider` - Delete a provider
- `reactivate_provider` - Reactivate a provider
- `get_provider_by_name` - Get a provider by name
- `get_providers` - Get providers

#### Leaders

- `create_leader` - Create a leader
- `update_leader` - Update a leader
- `delete_leader` - Delete a leader
- `reactivate_leader` - Reactivate a leader
- `get_leaders` - Get leaders

#### Vehicles

- `create_vehicle` - Create a vehicle
- `update_vehicle` - Update a vehicle
- `delete_vehicle` - Delete a vehicle
- `reactivate_vehicle` - Reactivate a vehicle
- `get_vehicles` - Get vehicles

#### Includes

- `create_include` - Create an include
- `update_include` - Update an include
- `delete_include` - Delete an include
- `reactivate_include` - Reactivate an include
- `get_includes` - Get includes

#### Seasons

- `get_season_summary` - Get a season summary

## Setup

### Prerequisites

You'll need a LumbreTravel Client ID and Client Secret to use this server.  You can get one for free at https://developers.mercadolibre.com/, create an application and get the credentials.

Once you have the credentials, you can set the `CLIENT_ID` and `CLIENT_SECRET` environment variables.

### Installation

There are two ways to use this server:

#### Installing via Smithery

To install LumbreTravel MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@lumile/lumbretravel-mcp):

```bash
npx -y @smithery/cli install @lumile/lumbretravel-mcp --client claude
```

#### Option 1: NPX (Recommended)
Add this configuration to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "lumbretravel-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "lumbretravel-mcp"
      ],
      "env": {
        "CLIENT_ID": "<YOUR_CLIENT_ID>",
        "CLIENT_SECRET": "<YOUR_CLIENT_SECRET>",
        "EMAIL": "<YOUR_EMAIL>",
        "PASSWORD": "<YOUR_PASSWORD>"
      }
    }
  }
}
```
#### Option 2: Local Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Build the server:
```bash
npm run build
```

4. Add this configuration to your Claude Desktop config:
```json
{
  "mcpServers": {
    "lumbretravel-mcp": {
      "command": "node",
      "args": [
        "/path/to/lumbretravel-mcp/dist/index.js"
      ],
      "env": {
        "CLIENT_ID": "<YOUR_CLIENT_ID>",
        "CLIENT_SECRET": "<YOUR_CLIENT_SECRET>",
        "EMAIL": "<YOUR_EMAIL>",
        "PASSWORD": "<YOUR_PASSWORD>"
      }
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Contributing

Contributions are extremely welcome! Please open a PR with new MCP servers or any other improvements to the codebase.

## Disclaimer

This project is to be used only with the LumbreTravel API.


## License

See the [LICENSE.md](LICENSE.md) file for details.

------

<p align="center">
Made with ❤️ by Lumile
</p>

<p align="center">
<a href="https://www.lumile.com.ar">Contact us</a> for custom AI development and automation solutions.
</p>
