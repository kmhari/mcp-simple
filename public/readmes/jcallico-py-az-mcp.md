# Azure MCP Server

A Model Context Protocol (MCP) server implementation that provides programmatic access to Azure Cloud resources through Azure CLI commands. This server enables seamless integration with Azure services and supports a wide range of Azure operations.

## Features

### Authentication
- Service Principal authentication support
- Automatic token management
- Environment variable configuration

### Supported Azure Operations

#### Compute
- Virtual Machines (list, show, start, stop, delete, restart)
- Virtual Machine Scale Sets (list, scale, update)
- Azure Kubernetes Service (list clusters)

#### Storage
- Storage Accounts (list, show, create, delete)
- Storage Containers (list, create, delete)

#### App Services
- Web Apps (list, show, create, delete, start, stop, restart)
- Function Apps (list, show, delete, start, stop, restart)
- Deployment management

#### Networking
- Virtual Networks (list)
- Network Security Groups (list)
- Public IP Addresses (list)

#### Database
- SQL Servers (list)
- Cosmos DB Accounts (list)

#### Security
- Key Vaults (list, create, delete)
- Secrets Management (list, set, delete)
- Managed Identities (list)

#### Container Registry
- Registry Management (list, create, delete, update)
- Repository Management (list)

#### Resource Management
- Resource Groups (list, show, create, delete)
- Role Assignments (list, create, delete)
- Role Definitions (list)
- Subscription Management (list, show)

## Prerequisites

- Python 3.13 or higher
- Azure CLI installed and configured
- Azure subscription and appropriate permissions
- Service Principal with required access

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd py-az-mcp
```

2. Install dependencies using `uv`:
```bash
uv pip sync
```

Or install directly from pyproject.toml:
```bash
uv pip install -e .
```

## Configuration

1. Create a Service Principal and configure environment variables by running the utility script:
```bash
python create_service_principal.py
```

This script will:
- Authenticate you with Azure interactively
- Create a new Service Principal with Contributor role
- Automatically generate a `.env` file with the required credentials:
  - AZURE_CLIENT_ID
  - AZURE_CLIENT_SECRET
  - AZURE_TENANT_ID
  - AZURE_SUBSCRIPTION_ID

Note: The `.env` file is automatically excluded from git tracking for security purposes.

## Claude Desktop Configuration

To use this MCP server with Claude Desktop, configure the following:

1. Create or update the Claude Desktop configuration file:
```json
{
  "mcpServers": {
    "Azure": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "mcp[cli]",
        "mcp",
        "run",
        "/your-path-to/py-az-mcp/server-azure.py"
      ]
    }
  }
}
```

The configuration file is located at:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

2. Replace `YOUR_USERNAME` with your actual system username in both paths.

3. Ensure your virtual environment is properly set up:
```bash
cd /Users/YOUR_USERNAME/Source/Code/py-az-mcp
python -m venv .venv
source .venv/bin/activate
pip install mcp[cli]
```

4. Verify the configuration:
   - Open Claude Desktop
   - Click on the settings icon (⚙️)
   - Navigate to the "MCP Servers" section
   - The Azure server should be listed and enabled

Note: The server will start automatically when needed by Claude Desktop. Ensure all environment variables from the `.env` file are properly configured before using Azure commands through Claude.

## Usage

1. Start the MCP server:
```bash
uv run --with mcp[cli] mcp run server-azure.py
```

2. The server will be available at `http://127.0.0.1:6274`

### Example API Calls

List all subscriptions:
```bash
curl -X POST http://127.0.0.1:6274/tool/azure-cli -H "Content-Type: application/json" -d '{"command": "account list --output json"}'
```

List all resource groups:
```bash
curl -X POST http://127.0.0.1:6274/tool/azure-cli -H "Content-Type: application/json" -d '{"command": "group list --output json"}'
```

## Dependencies

- Python >= 3.13
- mcp[cli] >= 1.6.0
- python-dotenv >= 1.0.0
- asyncio >= 3.4.3
- Azure CLI >= 2.57.0 (system requirement)

## Project Structure

- `server-azure.py`: Main MCP server implementation with Azure CLI integration
- `create_service_principal.py`: Utility script for creating Azure Service Principal
- `main.py`: Package entry point (placeholder)
- `pyproject.toml`: Project dependencies and configuration
- `.env`: Environment variables configuration (not tracked in git)
- `.python-version`: Python version requirement

## Error Handling

The server includes comprehensive error handling:
- JSON validation for all responses
- Azure CLI error capture and formatting
- Authentication error handling
- Parameter validation

## Security Considerations

- Uses Service Principal authentication
- Supports environment variable configuration for sensitive data
- Implements proper error handling to prevent information disclosure
- Validates all input parameters

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.