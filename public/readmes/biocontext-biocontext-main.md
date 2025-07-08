# BioContext: Unified Biological Data Access

BioContext is a collection of Model Context Protocol (MCP) servers that provide unified access to major biological databases and APIs. This repository serves as the main project that manages various BioContext components, making it easy to set up and use multiple biological data sources with AI assistants like Claude or other MCP-compatible clients.

## 🌟 Features

- **Unified Access**: Single setup for multiple biological databases
- **AI-Ready**: Compatible with Claude, Cursor, and other MCP clients
- **Modular Design**: Use only the databases you need
- **Easy Setup**: Simple scripts for installation and configuration
- **Docker Support**: Run services in containers

## 🧬 Available MCP Servers

| Server | Description | Data Source | Documentation |
|--------|-------------|-------------|---------------|
| OpenTargets-MCP | Drug target discovery | [Open Targets Platform](https://platform.opentargets.org/) | [Docs](modules/OpenTargets-MCP/README.md) |
| ChemBL-MCP | Bioactive molecules | [ChEMBL](https://www.ebi.ac.uk/chembl/) | [Docs](modules/ChemBL-MCP/README.md) |
| PubChem-MCP | Chemical compounds | [PubChem](https://pubchem.ncbi.nlm.nih.gov/) | [Docs](modules/PubChem-MCP/README.md) |
| UniProt-MCP | Protein information | [UniProt](https://www.uniprot.org/) | [Docs](modules/UniProt-MCP/README.md) |

## 🚀 Quick Start

### 1. Clone the Repository

```bash
# Clone with all submodules
git clone --recursive https://github.com/BioContext/BioContext-main.git
cd BioContext-main

# Or if already cloned:
git submodule update --init --recursive
```

### 2. Choose Your Setup Method

#### A. Using Docker (Recommended for Most Users)

```bash
# Start all services
docker-compose up -d

# Or start specific services
docker-compose up -d chembl-mcp uniprot-mcp
```

#### B. Local Python Installation

```bash
# Run the setup script
./setup.sh
```

### 3. Configure Your MCP Client

#### For Claude Desktop

1. Create or edit `claude_desktop_config.json`:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\\Claude\\claude_desktop_config.json`

2. Add the configuration:
```json
{
    "mcpServers": {
        "opentargets": {
            "command": "python",
            "args": [
                "-m",
                "modules.OpenTargets-MCP.opentargets"
            ],
            "cwd": "/path/to/BioContext-main"
        },
        "chembl": {
            "command": "python",
            "args": [
                "-m",
                "modules.ChemBL-MCP.mcp_server"
            ],
            "cwd": "/path/to/BioContext-main"
        },
        "pubchem": {
            "command": "python",
            "args": [
                "-m",
                "modules.PubChem-MCP.pubchem"
            ],
            "cwd": "/path/to/BioContext-main"
        },
        "uniprot": {
            "command": "python",
            "args": [
                "-m",
                "modules.UniProt-MCP.uniprot"
            ],
            "cwd": "/path/to/BioContext-main"
        }
    }
}
```

### Examples 

```
/opentargets search BRAF
/chembl find aspirin details
/pubchem search caffeine
/uniprot lookup P12345
```

### Docker Configuration

See [docker-compose.yml](docker-compose.yml) for container configurations.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [Claude for Desktop](https://github.com/anthropic-labs/claude-desktop)
- [Model Context Protocol Specification](https://github.com/anthropic-labs/mcp-spec)
- [Cursor](https://cursor.sh/)

## 📮 Contact & Support

- GitHub Issues: [Create an issue](https://github.com/BioContext/BioContext-main/issues)
- Documentation: [Wiki](https://github.com/BioContext/BioContext-main/wiki)
- Community: [Discussions](https://github.com/BioContext/BioContext-main/discussions) 