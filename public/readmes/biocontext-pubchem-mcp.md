# PubChem-MCP

An MCP (Model Context Protocol) server for accessing PubChem data. This server provides tools for querying the PubChem database for compounds, substances, bioassays, and related information.

## Features

* Search for compounds by name, structure, or identifier
* Retrieve detailed information about compounds and substances
* Access bioassay data and molecular properties
* Query chemical classifications and cross-references
* Compatible with any MCP client, including Claude for Desktop

## Installation

### Option 1: From GitHub

```bash
# Clone the repository
git clone https://github.com/BioContext/PubChem-MCP.git
cd PubChem-MCP

# Create a virtual environment
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Option 2: Using pip (Once published)

```bash
pip install pubchem-mcp
```

## Usage

### Running as a standalone server

```bash
# From source
python -m mcp_server

# If installed via pip
pubchem-mcp
```

### Using with Claude for Desktop

1. Install Claude for Desktop
2. Configure Claude for Desktop to use this server by editing `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS/Linux) or `%AppData%\Claude\claude_desktop_config.json` (Windows):

```json
{
    "mcpServers": {
        "pubchem": {
            "command": "python",
            "args": [
                "-m",
                "mcp_server"
            ]
        }
    }
}
```

3. Restart Claude for Desktop
4. You can now use the PubChem tools in Claude

### Example queries for Claude

* "Find information about aspirin in PubChem"
* "What are the properties of compound CID 2244?"
* "Show me the structure of paracetamol"

## Available Tools

* `search_compound`: Search for compounds by name or identifier
* `get_compound_details`: Get detailed information about a compound
* `get_compound_properties`: Get physical and chemical properties of a compound
* `search_bioassay`: Search for bioassays
* `get_substance_details`: Get detailed information about a substance
* And more...

## Development

```bash
# Clone the repository
git clone https://github.com/BioContext/PubChem-MCP.git
cd PubChem-MCP

# Create a virtual environment
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install development dependencies
pip install -e ".[dev]"

# Run tests
pytest
```

## License

MIT License
