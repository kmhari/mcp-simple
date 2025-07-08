# AKShare MCP Server

A Model Context Protocol (MCP) server that provides financial data analysis capabilities using the AKShare library.

## Features

- Access to Chinese and global financial market data through AKShare
- Integration with Claude Desktop via MCP protocol
- Support for various financial data queries and analysis

## Installation

### Using uv (recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/akshare_mcp_server.git
cd akshare_mcp_server

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies with uv
uv pip install -e .
```

### Using pip

```bash
# Clone the repository
git clone https://github.com/yourusername/akshare_mcp_server.git
cd akshare_mcp_server

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -e .
```

## Usage

### Running the server

```bash
# Activate the virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Run the server
python run_server.py
```

### Integrating with Claude Desktop

1. Add the following configuration to your Claude Desktop configuration:

```json
"mcpServers": {
    "akshare-mcp": {
        "command": "uv",
        "args": [
            "--directory",
            "/path/to/akshare_mcp_server",
            "run",
            "akshare-mcp"
        ],
        "env": {
            "AKSHARE_API_KEY": "<your_api_key_if_needed>"
        }
    }
}
```

2. Restart Claude Desktop
3. Select the AKShare MCP server from the available tools

## Available Tools

The AKShare MCP server provides the following tools:

- Stock data queries
- Fund data queries
- Bond data queries
- Futures data queries
- Forex data queries
- Macroeconomic data queries
- And more...

## Adding a New Tool

To add a new tool to the MCP server, follow these steps:

1. **Add a new API function in `src/mcp_server_akshare/api.py`**:
   ```python
   async def fetch_new_data_function(param1: str, param2: str = "default") -> List[Dict[str, Any]]:
       """
       Fetch new data type.
       
       Args:
           param1: Description of param1
           param2: Description of param2
       """
       try:
           df = ak.akshare_function_name(param1=param1, param2=param2)
           return dataframe_to_dict(df)
       except Exception as e:
           logger.error(f"Error fetching new data: {e}")
           raise
   ```

2. **Add the new tool to the enum in `src/mcp_server_akshare/server.py`**:
   ```python
   class AKShareTools(str, Enum):
       # Existing tools...
       NEW_TOOL_NAME = "new_tool_name"
   ```

3. **Import the new function in `src/mcp_server_akshare/server.py`**:
   ```python
   from .api import (
       # Existing imports...
       fetch_new_data_function,
   )
   ```

4. **Add the tool definition to the `handle_list_tools()` function**:
   ```python
   types.Tool(
       name=AKShareTools.NEW_TOOL_NAME.value,
       description="Description of the new tool",
       inputSchema={
           "type": "object",
           "properties": {
               "param1": {"type": "string", "description": "Description of param1"},
               "param2": {"type": "string", "description": "Description of param2"},
           },
           "required": ["param1"],  # List required parameters
       },
   ),
   ```

5. **Add the tool handler in the `handle_call_tool()` function**:
   ```python
   case AKShareTools.NEW_TOOL_NAME.value:
       param1 = arguments.get("param1")
       if not param1:
           raise ValueError("Missing required argument: param1")
       
       param2 = arguments.get("param2", "default")
       
       result = await fetch_new_data_function(
           param1=param1,
           param2=param2,
       )
   ```

6. **Test the new tool** by running the server and making a request to the new tool.

## Development

```bash
# Install development dependencies
uv pip install -e ".[dev]"

# Run tests
pytest
```

## Docker

You can also run the server using Docker:

```bash
# Build the Docker image
docker build -t akshare-mcp-server .

# Run the Docker container
docker run -p 8000:8000 akshare-mcp-server
```

## License

MIT 