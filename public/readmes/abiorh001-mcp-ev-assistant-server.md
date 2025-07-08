# MCP EV Assistant Server

A powerful server implementation for managing Electric Vehicle (EV) charging stations, trip planning, and resource management. This server provides a comprehensive set of tools and APIs for EV-related services.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Resource Management](#resource-management)
- [Error Handling](#error-handling)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

### 1. EV Charging Station Services
- **Charging Station Locator**: Find nearby EV charging stations based on location and preferences
- **Socket Type Filtering**: Search for specific charging socket types (CCS, CHAdeMO, Type 2, etc.)
- **Distance-based Search**: Specify search radius for finding charging stations

### 2. Trip Planning
- **Route Planning**: Plan EV-friendly routes between locations
- **Charging Stop Integration**: Automatically includes necessary charging stops
- **Range Consideration**: Takes into account vehicle range and current charge level

### 3. Resource Management
- **PDF Document Management**: Handles EV-related PDF documents (user guides, manuals, etc.)
- **Resource Subscription**: Supports resource subscription for real-time updates
- **Automatic Text Extraction**: PDF text extraction with fallback mechanisms

### 4. Interactive Prompts
- **Charging Station Search**: Interactive prompts for finding charging stations
- **Charging Time Estimation**: Calculate charging duration based on various parameters
- **Route Planning Assistance**: Interactive route planning with charging considerations

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Abiorh001/mcp_ev_assistant_server.git
cd mcp_ev_assistant_server
```

### 2. Set Up Virtual Environment (Recommended)
```bash
python -m venv .venv
source .venv/bin/activate  # On Linux/Mac
# or
.venv\\Scripts\\activate  # On Windows
```

### 3. Install Dependencies
```bash
uv sync
```

## Configuration

### 1. Environment Variables
Create a `.env` file in your project root with the following variables:
```bash
OPENCHARGE_MAP_API_KEY=your_opencharge_map_api_key
GOOGLE_MAP_API_KEY=your_google_map_api_key
```

### 2. Server Configuration
Create or update `servers_config.json`:
```json
{
  "mcpServers": {
    "ev_assistant": {
      "command": "/home/$USER/path/mcp_learning/.venv/bin/python",
      "args": ["/home/$USER/path/mcp_ev_assistant_server/ev_assistant_server.py"],
      "env": {
        "OPENCHARGE_MAP_API_KEY": "your_opencharge_map_api_key",
        "GOOGLE_MAP_API_KEY": "your_google_map_api_key"
      }
    }
  }
}
```

### 3. Directory Structure
```
mcp_ev_assistant_server/
├── ev_assistant_server.py
├── .env
├── servers_config.json
├── Data/                  # PDF resources directory
├── agentTools/           # Tool implementations
│   ├── charge_station_locator.py
│   └── ev_trip_planner.py
└── core/                 # Core functionality
    ├── schemas.py
    └── logger.py
```

## Usage

### Starting the Server
```bash
# Method 1: Direct Python execution
python ev_assistant_server.py


```

### API Examples

1. Finding Charging Stations:
```python
result = await client.call_tool("charge_points_locator", {
    "address": "London, UK",
    "max_distance": 10,
    "socket_type": "CCS"
})
```

2. Planning a Trip:
```python
result = await client.call_tool("ev_trip_planner", {
    "user_address": "Manchester, UK",
    "user_destination_address": "Liverpool, UK",
    "socket_type": "Type 2"
})
```

## API Reference

### Tools

1. **charge_points_locator**
   - Purpose: Find EV charging stations near a location
   - Parameters:
     - `address`: Location to search around (string, required)
     - `max_distance`: Search radius in kilometers (integer, required)
     - `socket_type`: Type of charging socket (string, required)

2. **ev_trip_planner**
   - Purpose: Plan an EV-friendly route
   - Parameters:
     - `user_address`: Starting location (string, required)
     - `user_destination_address`: Destination location (string, required)
     - `socket_type`: Preferred charging socket type (string, required)

### Prompts

1. **find-charging-stations**
   - Required:
     - `location`: Search location
   - Optional:
     - `radius`: Search radius in km
     - `socket_type`: Charging socket type

2. **charging-time-estimate**
   - Required:
     - `vehicle_model`: EV make and model
     - `current_charge`: Current battery percentage
     - `target_charge`: Desired battery percentage
     - `charger_power`: Charging station power in kW

3. **route-planner**
   - Required:
     - `start_location`: Starting point
     - `end_location`: Destination
     - `vehicle_range`: Vehicle's full charge range
   - Optional:
     - `current_charge`: Current battery percentage

## Resource Management

### PDF Resource Handling
- Automatically discovers PDF files in the `/Data` directory
- Supports text extraction with multiple fallback methods
- Handles resource subscriptions for updates

### Subscription System
```python
# Subscribe to a resource
await client.subscribe_resource("file:///pdf/ev_manual")

# Unsubscribe from a resource
await client.unsubscribe_resource("file:///pdf/ev_manual")
```

## Error Handling
- Comprehensive error logging
- Fallback mechanisms for PDF processing
- Input validation using Pydantic schemas
- Graceful handling of missing resources

## Development

### Adding New Tools
1. Define the tool schema in `core.schemas`
2. Implement the tool function in `agentTools`
3. Add the tool to `handle_list_tools()`
4. Implement the tool handling in `handle_call_tool()`

### Adding New Prompts
1. Define the prompt structure in `PROMPTS`
2. Implement validation in `handle_get_prompt()`
3. Add necessary schema validation

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
