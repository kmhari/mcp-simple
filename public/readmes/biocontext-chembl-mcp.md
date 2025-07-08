# ChemBL-MCP

An MCP (Model Context Protocol) server for accessing ChEMBL data. This server provides tools for querying the ChEMBL database for molecules, targets, assays, activities, and documents.

## Features

- Search for molecules by name, structure, or similarity
- Retrieve detailed information about molecules, targets, and assays
- Access bioactivity data and related documents
- Compatible with any MCP client, including Claude for Desktop

## Installation

### Option 1: From GitHub

```bash
# Clone the repository
git clone https://github.com/BioContext/ChemBL-MCP.git
cd ChemBL-MCP

# Create a virtual environment
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Option 2: Using pip (Once published)

```bash
pip install chembl-mcp
```

## Usage

### Running as a standalone server

```bash
# From source
python -m mcp_server

# If installed via pip
chembl-mcp
```

### Using with Claude for Desktop

1. Install Claude for Desktop
2. Configure Claude for Desktop to use this server by editing `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS/Linux) or `%AppData%\Claude\claude_desktop_config.json` (Windows):

```json
{
    "mcpServers": {
        "chembl": {
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
4. You can now use the ChEMBL tools in Claude

### Example queries for Claude

- "Find information about aspirin in ChEMBL"
- "What are the targets of propranolol?"
- "Show me bioactivity data for compound CHEMBL25"

## Available Tools

- `search_molecule`: Search for molecules by name or structure
- `get_molecule_details`: Get detailed information about a molecule
- `get_similar_molecules`: Find molecules similar to a given one
- `search_targets`: Search for biological targets
- `get_target_details`: Get detailed information about a target
- `search_assays`: Search for assays
- `get_bioactivities`: Get bioactivity data for a molecule
- And more...

## Development

```bash
# Clone the repository
git clone https://github.com/BioContext/ChemBL-MCP.git
cd ChemBL-MCP

# Create a virtual environment
uv venv
source .venv/bin/activate

# Install development dependencies
pip install -e ".[dev]"

# Run tests
pytest
```

## License

MIT License 