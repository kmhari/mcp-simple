# Figma MCP Server

A Model Context Protocol (MCP) server that provides tools for interacting with Figma design files. It allows Cursor IDE to connect and fetch design tokens and components from Figma files.

## Features

- Parse Figma URLs to extract file keys and node IDs
- Fetch design tokens from Figma files, including:
  - Colors (fill and stroke styles)
  - Typography (text styles)
  - Spacing (grid styles)
  - Effects (effect styles)
- Integration with Cursor IDE

## Prerequisites

- Python 3.9 or higher
- Figma Access Token (get it from your Figma account settings)

## Installation

### Quick Setup (Unix/Linux/macOS)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/figma-mcp.git
cd figma-mcp
```

2. Make the setup script executable and run it:
```bash
chmod +x setup.sh
```
```bash
./setup.sh
```

The setup script will:
- Check for Python 3.9+ and pip
- Create a virtual environment
- Install all dependencies
- Create a .env file for your Figma access token

### Manual Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/figma-mcp.git
cd figma-mcp
```

2. Create a virtual environment and activate it:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows, use: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory with your Figma access token:
```
FIGMA_ACCESS_TOKEN=your_figma_access_token
```

## Usage

1. Start the server:
```bash
python src/main.py --transport sse --port YOUR_PORT 
```

The server will start on port 8000 by default.

Once the server has started Go to Cursor Settings > MCP > Add new Global MCP Server

Paste the following in the JSON
```
{
  "mcpServers": { 
    "figma": {
      "url": "http://localhost:4000/sse",
      "env": {
        "FIGMA_ACCESS_TOKEN": "YOUR_FIGMA_TOKEN"
      }
    }
  }
}
```

## Available Tools

1. `figma_fetch`
   - Fetches design tokens and components from a Figma file
   - Parameters:
     - `fileKey` (required): Figma file key
     - `nodeId` (optional): Specific node ID to fetch
     - `queryType` (optional): Type of data to fetch (design-tokens, components)

2. `figma_url_parse`
   - Parses a Figma URL to extract file key and node ID
   - Parameters:
     - `figmaUrl` (required): Figma URL to parse

3. `mood`
   - A simple tool to check the server's mood
   - Parameters:
     - `question` (required): Any question about the server's mood

## Example Usage

The design tokens will be returned in a structured JSON format:
```json
{
  "colors": {
    "token-name": {
      "name": "token-name",
      "styleType": "fill",
      ...
    }
  },
  "typography": {
    ...
  },
  "spacing": {
    ...
  },
  "effects": {
    ...
  }
}
```

## Development

The project uses:
- Python 3.9+
- httpx for async HTTP requests
- click for CLI interface
- anyio for async I/O
- mcp for the Model Context Protocol implementation

## License

This project is licensed under the MIT License - see the LICENSE file for details. 