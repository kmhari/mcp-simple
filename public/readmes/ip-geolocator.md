# MCP IP Geolocation Server

A Model Context Protocol (MCP) server that provides IP geolocation services via IP-API.com. Free to use, no API key required.

## Features

- Get detailed location information for any IP address
- Network information including ISP and AS number
- Timezone data
- No API key or registration required
- Clean, formatted output for Claude

## Quick Start

1. Install globally:
```bash
npm install -g mcp-ip-geolocator
```

2. Run the server:
```bash
mcp-ip-geolocator
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/tedlikeskix/mcp-ip-geolocator.git
cd mcp-ip-geolocator
```

2. Install dependencies:
```bash
yarn install
```

3. Build and run:
```bash
yarn build
yarn start
```

## Usage with Claude

Once running, connect to the server in Claude Desktop. Example usage:

```
Claude, can you check the location of IP address 8.8.8.8?
```

Claude will use the tool to fetch and display location information.

## API Response Format

The tool returns structured data including:
- City, region, and country
- Latitude and longitude
- Timezone
- ISP and organization
- AS number

## Rate Limiting

IP-API.com's free tier includes:
- 45 requests per minute
- IPv4 and IPv6 support
- No API key needed

## License

MIT License - feel free to use and modify!