# Georgia 511 MCP Server

This is a Model Context Protocol (MCP) server that provides access to the Georgia 511 traffic data API. It allows MCP clients like Claude Desktop to access real-time traffic information from Georgia's 511 service.

## Features

- Access to all Georgia 511 API endpoints:
  - Traffic cameras
  - Message signs
  - Variable speed signs
  - Traffic events
  - Alerts
  - Rest areas
  - Ports of entry
  - Express lanes

## Prerequisites

- Python 3.8 or higher
- A Georgia 511 API key (sign up at https://511ga.org/developers/doc)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/ga511-mcp-server.git
   cd ga511-mcp-server
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

1. Set your Georgia 511 API key as an environment variable:
   ```
   export GA511_API_KEY="your-api-key-here"
   ```

2. Run the server:
   ```
   python ga511_mcp_server.py
   ```

   By default, the server will run on `localhost:8080`. You can customize the host and port:
   ```
   python ga511_mcp_server.py --host 0.0.0.0 --port 9000
   ```

3. Connect to the server from an MCP client like Claude Desktop.

## Available Tools

The server provides the following tools:

- `get_cameras`: Get traffic camera information
- `get_message_signs`: Get variable message sign information
- `get_variable_speed_signs`: Get variable speed sign information
- `get_traffic_events`: Get traffic events information
- `get_alerts`: Get alert notifications
- `get_rest_areas`: Get rest area information
- `get_ports_of_entry`: Get ports of entry information
- `get_express_lanes`: Get express lanes information

Each tool accepts an optional `region` parameter to filter results by region (e.g., 'Atlanta', 'Savannah').

## License

MIT 