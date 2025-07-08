# MCP Geocoder Rosetta

A collection of Model Context Protocol (MCP) geocoder implementations in different languages and using different approaches. This repository serves as a "Rosetta Stone" for developers looking to create their own MCP tools.

## What is MCP?

The Model Context Protocol (MCP) is a protocol for tools to interact with AI models, allowing AIs to perform actions in the real world, like making API calls or accessing databases. MCP provides a standardized way for AI models to use tools and for developers to create these tools.

## Implementations

This repository contains three different implementations of a geocoding tool using Google Maps API:

1. **Python + urllib** - Uses Python's standard library without additional dependencies
2. **Python + Google Maps SDK** - Uses the official Google Maps Python client
3. **TypeScript + Google Maps SDK** - Uses TypeScript and the Google Maps JavaScript client

## Comparison of Implementations

| Feature | Python + urllib | Python + Google Maps SDK | TypeScript + Google Maps SDK |
|---------|----------------|------------------------|----------------------------|
| Dependencies | Minimal (standard library) | googlemaps, mcp | @googlemaps/google-maps-services-js, @mcp/sdk |
| Setup Complexity | Simple | Medium | Medium |
| Error Handling | Basic | Enhanced | Enhanced |
| Code Size | Small | Medium | Medium |
| SDK Advantage | None - direct API calls | Type handling, validation | Type safety, Promise API |

## Prerequisites

- Google Maps API key ([Get one here](https://developers.google.com/maps/documentation/javascript/get-api-key))
- Python 3.13+ (for Python implementations)
- Node.js 16+ (for TypeScript implementation)
- MCP CLI tools

## Setup

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/mcp-geocoder-rosetta.git
cd mcp-geocoder-rosetta
```

### 2. Set up your Google Maps API key:
```bash
# Set as environment variable
export GOOGLE_MAPS_API_KEY=your-api-key-here

# Or create .env files in each implementation directory
echo "GOOGLE_MAPS_API_KEY=your-api-key-here" > python-urllib/.env
echo "GOOGLE_MAPS_API_KEY=your-api-key-here" > python-googlemaps/.env
echo "GOOGLE_MAPS_API_KEY=your-api-key-here" > typescript-googlemaps/.env
```

### 3. Install MCP CLI:
```bash
# Using pip
pip install mcp[cli]

# Or using uv
uv pip install mcp[cli]
```

### 4. Run the debugging script to check your environment:
```bash
chmod +x debug_mcp.sh
./debug_mcp.sh
```

## Quick Start

### Testing Python with urllib:
```bash
# Direct test with MCP client
python test_direct.py urllib

# Server CLI test
python test_server.py urllib

# Interactive client
python run_geocoder.py urllib
```

### Testing Python with Google Maps SDK:
```bash
# Direct test with MCP client
python test_direct.py googlemaps

# Server CLI test
python test_server.py googlemaps

# Interactive client
python run_geocoder.py googlemaps
```

### Testing TypeScript:
```bash
# Simply run the client which will handle dependencies and server startup
python run_geocoder.py typescript

# The script will:
# - Check for npm and install dependencies if needed
# - Start the TypeScript server automatically
# - Connect and let you query addresses
```

## Individual Service Setup

### Python with urllib
```bash
cd python-urllib

# Method 1: Direct execution with dependencies
export GOOGLE_MAPS_API_KEY="your-api-key-here"
uv run --with mcp[cli] mcp run geocoder.py

# Method 2: Using virtual environment
uv venv -p 3.13 .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e .
mcp run geocoder.py
```

### Python with Google Maps SDK
```bash
cd python-googlemaps

# Method 1: Direct execution with dependencies
export GOOGLE_MAPS_API_KEY="your-api-key-here"
uv run --with mcp[cli] --with googlemaps mcp run geocoder.py

# Method 2: Using virtual environment
uv venv -p 3.13 .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install googlemaps
uv pip install -e .
mcp run geocoder.py
```

### TypeScript with Google Maps SDK
```bash
# Method 1: Using run_geocoder.py (recommended)
# This automatically handles dependencies and server startup
python run_geocoder.py typescript

# Method 2: Manual setup
cd typescript-googlemaps

# Install dependencies
npm install

# Set up environment with your Google Maps API key
echo "GOOGLE_MAPS_API_KEY=your-api-key-here" > .env

# Run the MCP server directly (only if needed)
npm start
```

## Available Scripts

### Main Scripts
- **run_geocoder.py**: Run client with server for any implementation
- **test_direct.py**: Test direct MCP communication with server
- **test_server.py**: Test server using direct Python approach
- **debug_mcp.sh**: Debug script for troubleshooting

### Running Options
- **Regular Mode**: `python run_geocoder.py <implementation>`
- **Server-Only Mode**: `python run_geocoder.py <implementation> --server-only`
- **Client-Only Mode**: `python run_geocoder.py <implementation> --client-only`

## Debugging Client-Server Connectivity

If you encounter issues with the client connecting to the server, there are a few ways to debug:

### Method 1: Run Server and Client Separately

Run the server in one terminal:
```bash
python run_geocoder.py urllib --server-only
```

Then run the client in another terminal:
```bash
python run_geocoder.py urllib --client-only
```

This helps isolate whether the issue is with the server, the client, or the communication between them.

### Method 2: Direct Server Testing

Use the test scripts to directly test the server without involving the full client:
```bash
# Test with a direct MCP connection:
python test_direct.py urllib

# Or test the server with direct Python:
python test_server.py urllib
```

These scripts will start the server, test basic connectivity, and run a sample geocode request.

### Common Issues

1. **Missing API Key**: Make sure your Google Maps API key is set in the `.env` file in each implementation directory or as an environment variable.

2. **Module Not Found**: If you get "Module not found" errors, install the required dependencies:
   ```bash
   pip install googlemaps mcp[cli]
   ```

3. **Connection Issues**: The client and server communicate over standard input/output. If there are issues, check:
   - Python version compatibility (Python 3.13+ is recommended)
   - MCP SDK version compatibility
   - Permissions for executing the scripts

4. **Debugging Guide**: Run the included debugging guide for more help:
   ```bash
   ./debug_mcp.sh
   ```
   
   The debug script will:
   - Check your Python installation
   - Verify MCP module installation
   - Check your Google Maps API key configuration
   - Test the urllib implementation
   - Provide troubleshooting command references

## Integration with Claude Desktop

### Accessing the Configuration File

1. **Open Claude Desktop** application
2. **Access Settings**: Click on the gear icon in the lower-left corner
3. **Open Developer Tab**: Click on "Developer" in the sidebar
4. **Edit Config**: Click the "Edit Config" button at the bottom of the page to open the configuration file in your default text editor

### Adding MCP Tools to Configuration

The `claude_desktop_config.json` file contains a JSON object with `mcpServers` as the top-level key for MCP tools. Add your geocoder implementations to this section:

```json
{
  "mcpServers": {
    "existing-server-1": {
      // existing configuration
    },
    "existing-server-2": {
      // existing configuration
    },
    
    // Add your geocoder implementations here
  }
}
```

⚠️ **IMPORTANT: Tool Disambiguation Warning** ⚠️

Install only ONE of these geocoder implementations at a time. Having multiple MCP servers with similar functionality can cause tool disambiguation issues, where Claude may not know which geocoding tool to use when processing requests.

Here's how to add each implementation to your configuration:

### TypeScript with Google Maps SDK

```json
"mcpServers": {
  "GeocoderNode": {
    "command": "npx",
    "args": [
      "tsx",
      "/path/to/mcp-geocoder-rosetta/typescript-googlemaps/geocoder.ts"
    ],
    "env": {
      "GOOGLE_MAPS_API_KEY": "your-api-key-here"
    }
  }
}
```

### Python with Google Maps SDK

```json
"mcpServers": {
  "GeocoderGoogle": {
    "command": "uv",
    "args": [
      "run",
      "--with",
      "mcp[cli]",
      "--with",
      "googlemaps",
      "mcp",
      "run",
      "/path/to/mcp-geocoder-rosetta/python-googlemaps/geocoder.py"
    ],
    "env": {
      "GOOGLE_MAPS_API_KEY": "your-api-key-here"
    }
  }
}
```

**Note**: The `--with googlemaps` parameter is critical for this implementation to work correctly.

### Python with urllib

```json
"mcpServers": {
  "GeocoderREST": {
    "command": "uv",
    "args": [
      "run",
      "--with",
      "mcp[cli]",
      "mcp",
      "run",
      "/path/to/mcp-geocoder-rosetta/python-urllib/geocoder.py"
    ],
    "env": {
      "GOOGLE_MAPS_API_KEY": "your-api-key-here"
    }
  }
}
```

### After Configuration

1. **Save the file** after making your changes
2. **Return to Claude Desktop** - the application will automatically reload the configuration
3. **Verify in Settings**: In the Developer tab, you should now see your added geocoder tools in the list of MCP servers
4. **Status Indicator**: A running status indicator will appear when the server starts successfully

### Troubleshooting Configuration

- Make sure your JSON is valid (no trailing commas, proper nesting)
- Use absolute paths to your implementation files
- Check the environment variables are correctly set
- If a server fails to start, check the "Advanced options" dropdown for that server to see error logs

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project Structure Notes

### Temporary Directories

The repository contains several `temp/` directories that are used for dynamically generated test and debug scripts:

- `/temp/`: Root temporary directory for main test scripts
- `python-urllib/temp/`: Contains scripts for testing the urllib implementation
- `python-googlemaps/temp/`: Contains scripts for testing the Google Maps API implementation
- `typescript-googlemaps/temp/`: Contains scripts for TypeScript testing utilities

These directories are created and used by the test scripts to generate utility scripts for connecting to MCP servers, diagnosing connection issues, verifying tool availability, and testing functionality. They are added to `.gitignore` and should not be committed to the repository.

### MCP Client Directory

The `mcp-client/` directory contains an older client implementation that has been largely superseded by direct MCP communication in `run_geocoder.py`. While still referenced and used as a fallback in some cases, the main functionality now uses the MCP library directly for more reliable communication.

## Known Issues

- Interactive input doesn't work well in non-interactive environments (like Claude Code)
- Some environment setup required for implementations to work (API key, dependencies)
- The `mcp tools` commands are not available in current MCP CLI versions, so we use a direct Python approach in test_server.py
- Different implementations have different available tools (only urllib has debug_info)
- Long-running processes in non-interactive environments may time out (especially TypeScript startup)