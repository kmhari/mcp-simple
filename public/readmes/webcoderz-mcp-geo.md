# MCP-Geo
Geocoding MCP server with GeoPY!


<a href="https://glama.ai/mcp/servers/ujss4qy5fs">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/ujss4qy5fs/badge?v=1" />
</a>

## 📋 System Requirements


- Python 3.6+

## 📦 Dependencies

Install all required dependencies:

```bash
# Using uv
uv sync
```

### Required Packages
- **fastmcp**: Framework for building Model Context Protocol servers
- **geoPy**: Python library for accessing and geocoding/reverse geocoding locations.


All dependencies are specified in `requirements.txt` for easy installation.

## 📑 Table of Contents
- [System Requirements](#-system-requirements)
- [Dependencies](#-dependencies)
- [MCP Tools](#%EF%B8%8F-mcp-tools)
- [Getting Started](#-getting-started)
- [Installation Options](#-installation-options)
  - [Claude Desktop](#option-1-install-for-claude-desktop)
  - [Elsewhere](#option-2-install-elsewhere)
- [Safety Features](#-safety-features)
- [Development Documentation](#-development-documentation)
- [Environment Variables](#%EF%B8%8F-environment-variables)

## 🛠️ MCP Tools

This MCP server provides the following geocoding tools to Large Language Models (LLMs):

### geocode_location

- Takes a user-provided address or place name and returns the best match’s latitude, longitude, and formatted address.

- Handles errors gracefully and returns None if the location is not found or if an error occurs.

### reverse_geocode

- Takes a latitude and longitude and returns the nearest address.
- Useful for finding descriptive information about a point on the map.

### geocode_with_details

- Similar to geocode_location but returns additional data such as bounding boxes and more detailed address info, if supported by the geocoder.

### geocode_multiple_locations

- Accepts a list of address strings and returns a list of geocoding results (lat/lon/address) for each address.
- Rate-limited to avoid hitting geocoding service quotas.

### reverse_geocode_multiple_locations

- Accepts a list of [lat, lon] pairs to perform reverse geocoding for each.
- Returns a list of dictionaries containing lat, lon, and address or None for unsuccessful lookups, also rate-limited.

### distance_between_addresses

- Calculate the distance between two addresses or place names.
- accepts 2 addresses and a unit of measurement (miles/kilometer)
- Returns the distance in the specified unit, or None if either address could not be geocoded.

### distance_between_coords

- Calculate the distance between two lat/lon pairs.
- accepts 2 pairs of latitude and longitude and a unit of measurement (kilometer/miles)
- Returns the distance in the specified unit.


## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/webcoderz/MCP-Geo.git
cd MCP-Geo
```


## 📦 Installation Options

You can install this MCP server in either Claude Desktop or elsewhere. Choose the option that best suits your needs.

### Option 1: Install for Claude Desktop

Install using FastMCP:

```bash
fastmcp install geo.py --name "MCP Geo"
```

### Option 2: Install elsewhere

To use this server anywhere else:


1. Add the following configuration to the settings file:

```json
{
    "mcp-geo": {
        "command": "uv",
        "args": [
          "--directory",
          "MCP-Geo",
          "run",
          "geo.py"
        ],
        "env": {
        "NOMINATIM_URL": "${NOMINATIM_URL}",
        "SCHEME": "http",
        "GEOCODER_PROVIDER": "nominatim"
        }
    }
}
```


🔒 Safety Features
	•	Rate Limiting: Each geocoding call is rate-limited (e.g., 1-second delay) to avoid excessive requests that violate usage limits.
	•	Error Handling: Catches geopy exceptions (timeouts, service errors) and returns safe None results instead of crashing.

📚 Development Documentation

If you’d like to extend or modify this server:
	•	Check geo.py for how each tool is implemented and how geopy is integrated.
	•	Adjust environment variables to switch providers (Nominatim, ArcGIS, Bing, etc.).
	•	Look at geopy’s official docs for advanced usage like bounding boxes, language settings, or advanced data extraction.

⚙️ Environment Variables

Configure the server using environment variables:

| Variable             | Description                              | Default            |
 |----------------------|------------------------------------------|--------------------|
| `GEOCODER_PROVIDER` (optional)   | "nominatim", "arcgis", or "bing"     | nominatim          |
| `NOMINATIM_URL` (optional)       | Domain for Nominatim | nominatim.openstreetmap.org       |
| `SCHEME` (optional)              | http/https    | http               |
| `ARC_USERNAME` (optional for ArcGIS)        | ArcGIS username            | None               |
| `ARC_PASSWORD` (optional for ArcGIS)        | ArcGIS password      | None               |
| `BING_API_KEY` (required for Bing)        | Your Bing Maps key.      | None               |

These can be set in your shell or in the MCP settings file for your environment. If more are needed just edit geo.py and add them in to whichever geocoder you are using.
