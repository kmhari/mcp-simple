# Molecule Visualizer MCP Server

<div align="center">

![Molecule Visualizer](https://img.shields.io/badge/MCP-Molecule%20Visualizer-blue)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![RDKit](https://img.shields.io/badge/RDKit-2023.3.1%2B-green)
![License](https://img.shields.io/badge/License-Apache%202.0-blue)

</div>

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that provides tools for visualizing molecules and retrieving molecular properties using SMILES codes. This server integrates with LLM applications like Claude Desktop to provide chemistry-focused capabilities.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [With Claude Desktop](#with-claude-desktop)
  - [Test Client](#test-client)
- [API Reference](#api-reference)
  - [Tools](#tools)
  - [Resources](#resources)
  - [Common Molecules](#common-molecules)
- [Examples](#examples)
- [Requirements](#requirements)
- [License](#license)
- [Contributing](#contributing)

## Overview

The Molecule Visualizer MCP server provides LLM applications with the ability to:

1. Generate 2D visualizations of molecules from SMILES strings
2. Calculate and display molecular properties
3. Access a database of common molecules by name

This enables chemistry-related use cases such as exploring molecular structures, analyzing chemical properties, and generating molecule visualizations for educational content or research assistance.

## Screenshots

### Using the MCP Server with Claude

![MCP in Claude](images/MCP-in-Claude.png)

*Claude using the Molecule Visualizer MCP server to display molecular structures.*

### Visualizing Molecules using SMILES

![Visualizing with SMILES](images/Give-it-Smiles.png)

*Providing direct SMILES codes to generate molecular visualizations.*

### Comparison with Web Access

![Claude with Web Access](images/Claude-with-Webaccess-failing.png)

*Attempting similar visualization with web access did not work as Claude fails at getting the right smiles code from the internet.  - MCP provides more reliable chemistry capabilities if pubchempy and chembl client are added to this.*

## Features

### Molecule Visualization

- Generate 2D visualizations of molecules from SMILES strings or common names
- Returns proper MCP Image objects for direct integration with LLM applications
- Option for markdown-compatible version with base64-encoded images
- Customizable image dimensions and display options
- Option to show atom indices for educational purposes

### Molecular Properties

- Basic properties:
  - Molecular formula
  - Molecular weight
  - Atom and bond counts
  - Ring count
- Lipinski's Rule of Five properties:
  - Hydrogen bond donors
  - Hydrogen bond acceptors
  - Rotatable bonds
  - LogP (lipophilicity)


## Installation

### Prerequisites

- Python 3.10 or higher
- RDKit (cheminformatics library)
- MCP Python SDK
- PIL (Python Imaging Library)

### Step-by-step Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/molecule-visualizer.git
   cd molecule-visualizer
   ```

2. Run the setup script which creates a virtual environment and installs dependencies:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```

### Alternative Installation using uv

You can also use the fast [uv](https://docs.astral.sh/uv/) package manager (recommended in the MCP documentation):

1. Install uv if you don't already have it:
   ```bash
   pip install uv
   ```

2. Create a virtual environment:
   ```bash
   uv venv
   ```

3. Install dependencies:
   ```bash
   uv pip install -r requirements.txt
   ```
   
   Or install dependencies directly:
   ```bash
   uv add "mcp[cli]"
   uv add "rdkit>=2023.3.1"
   uv add "pillow>=10.0.0"
   ```

4. Activate the virtual environment:
   ```bash
   source .venv/bin/activate
   ```

## Usage

### Running the Server

To run the server directly:

```bash
python molecule_server.py
```

The server will start and listen for MCP connections.

### With Claude Desktop

1. Install [Claude Desktop](https://claude.ai/download)

2. Edit your Claude Desktop configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

3. Add the Molecule Visualizer server configuration:

```json
{
  "mcpServers": {
    "Molecule Visualizer": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "mcp[cli]",
        "--with",
        "pillow",
        "--with",
        "rdkit",
        "mcp",
        "run",
        "/ABSOLUTE-PATH-TO-MOLECULE-SERVER/molecule_server.py"
      ]
    }
  }
}
```

4. Restart Claude Desktop

5. In Claude, you can now use molecule visualization:
   ```
   Please show me a visualization of aspirin
   ```

### Test Client

A test client is included to demonstrate how to use the server:

```bash
python test_client.py
```

This will connect to the server and run through several examples of using the tools and resources.

## API Reference

### Tools

#### `visualize_molecule`

Generate a 2D visualization of a molecule as an Image object.

**Parameters:**
- `query` (string): Molecule name or SMILES string
- `width` (integer, optional): Width in pixels (default: 400)
- `height` (integer, optional): Height in pixels (default: 300)
- `show_atom_indices` (boolean, optional): Whether to show atom indices (default: false)

**Returns:**
- Image object containing the molecule visualization (PNG format)

#### `visualize_molecule_markdown`

Generate a 2D visualization of a molecule as a markdown string with embedded base64-encoded image.

**Parameters:**
- Same as `visualize_molecule`

**Returns:**
- Markdown string with embedded base64-encoded PNG image

#### `get_molecule_properties`

Get properties of a molecule.

**Parameters:**
- `query` (string): Molecule name or SMILES string

**Returns:**
- Markdown formatted text with molecular properties

#### `get_common_molecules`

Get a list of common molecules that can be visualized.

**Parameters:**
- None

**Returns:**
- Markdown formatted list of common molecule names

### Resources

#### `molecule://{name}/smiles`

Get the SMILES string for a common molecule.

**Parameters:**
- `name` (string): Name of the common molecule

**Returns:**
- SMILES string for the molecule

#### `molecules://common`

List all common molecules available in the database.

**Returns:**
- JSON formatted list of molecule names and their SMILES strings


## Examples

### Visualizing a Molecule

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def visualize():
    server_params = StdioServerParameters(
        command="python",
        args=["path/to/molecule_server.py"],
        env=None
    )
    
    async with stdio_client(server_params) as (stdin, stdout):
        client = ClientSession(stdin, stdout)
        await client.initialize()
        
        # Visualize aspirin
        result = await client.call_tool("visualize_molecule", {"query": "aspirin"})
        
        # The image data is in result.content[0].image.data
        # The image format is in result.content[0].image.format
        
        # Save the image to a file
        with open("aspirin.png", "wb") as f:
            f.write(result.content[0].image.data)
```

### Getting Molecule Properties

```python
# Using the client from above
result = await client.call_tool("get_molecule_properties", {"query": "caffeine"})
print(result.content[0].text)
```

## Requirements

Dependencies are listed in `requirements.txt`:

```
mcp[cli]>=0.1.0
rdkit>=2023.3.1
pillow>=10.0.0
```

## License

This project is licensed under the Apache License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Here are ways you can contribute:

1. Add new molecular visualization options
2. Expand the common molecules database
3. Add additional molecular properties calculations
4. Improve error handling and documentation
5. Create additional examples

To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your code follows the existing style and includes appropriate tests and documentation.
