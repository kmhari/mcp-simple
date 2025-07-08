# GXtract MCP Server

<div style="text-align: left;">
  <img src="docs/sphinx/source/_static/images/gxtract-logo.png" alt="GXtract Logo" width="200"/>
</div>

[![Documentation](https://img.shields.io/badge/docs-latest-brightgreen.svg)](https://sascharo.github.io/gxtract/)
[![Python Version](https://img.shields.io/badge/python-3.12+-blue.svg)](https://www.python.org/)
[![UV Version](https://img.shields.io/badge/uv-0.7.6+-green.svg)](https://github.com/astral-sh/uv)
[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json)](https://github.com/astral-sh/ruff)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

GXtract is a Model Context Protocol (MCP) server designed to integrate with VS Code and other compatible editors. It provides a suite of tools for interacting with the GroundX platform, enabling you to leverage its powerful document understanding capabilities directly within your development environment.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installing UV](#installing-uv)
- [Quick Start: VS Code Integration](#quick-start-vs-code-integration)
- [Available Tools](#available-tools)
- [Configuration](#configuration)
  - [API Key Security](#api-key-security)
- [Development](#development)
- [Documentation](#documentation)
  - [Building Documentation Locally](#building-documentation-locally)
  - [Building Documentation (Sphinx)](#building-documentation-sphinx)
- [Cache Management](#cache-management)
  - [When to Manually Refresh the Cache](#when-to-manually-refresh-the-cache)
  - [How to Refresh the Cache](#how-to-refresh-the-cache)
  - [Troubleshooting Common Cache Issues](#troubleshooting-common-cache-issues)
  - [Checking Cache Status](#checking-cache-status)
- [Dependency Management](#dependency-management)
  - [Working with Dependencies](#working-with-dependencies)
  - [The uv.lock File](#the-uvlock-file)
- [Versioning](#versioning)
- [License](#license)

## Features

*   **GroundX Integration:** Access GroundX functionalities like document search, querying, and semantic object explanation.
*   **MCP Compliant:** Built for use with VS Code's MCP client and other MCP-compatible systems.
*   **Efficient and Modern:** Developed with Python 3.12+ and FastMCP v2 for performance.
*   **Easy to Configure:** Simple setup for VS Code.
*   **Caching:** In-memory cache for GroundX metadata to improve performance and reduce API calls.

## Architecture

The high-level system architecture of GXtract illustrates how the components interact:

```mermaid
graph TB
    subgraph "Client"
        VSC[VS Code / Editor]
    end

    subgraph "GXtract MCP Server"
        MCP[MCP Interface<br>stdio/http]
        Server[GXtract Server]
        Cache[Metadata Cache]
        Tools[Tool Implementations]
    end

    subgraph "External Services"
        GXAPI[GroundX API]
    end

    VSC -->|MCP Protocol| MCP
    MCP --> Server
    Server --> Tools
    Tools -->|Query| GXAPI
    Tools -->|Read/Write| Cache
    Cache -.->|Refresh| GXAPI
```

This diagram shows:

1. **Client Integration**: VS Code communicates with GXtract using the MCP protocol
2. **Transport Layer**: Supports both stdio (for direct VS Code integration) and HTTP transport
3. **Core Components**: Server manages tool registration and requests
4. **Caching Layer**: Maintains metadata to reduce API calls
5. **Tool Implementation**: Provides specialized functions for interacting with GroundX
6. **API Communication**: Secure connection to GroundX platform

For more detailed architecture information, see the [full documentation](https://sascharo.github.io/gxtract/architecture.html).

## Prerequisites

*   **Python 3.12 or higher.**
*   **UV (Python package manager):** Version 0.7.6 or higher. You can install it from [astral.sh/uv](https://astral.sh/uv).
*   **GroundX API Key:** You need a valid API key from the [GroundX Dashboard](https://dashboard.groundx.ai/).

## Installing UV

Before you can use GXtract, you need to install UV (version 0.7.6 or higher), a modern Python package manager written in Rust that offers significant performance improvements over traditional tools.

### Quick Installation Methods

**Windows (PowerShell 7):**
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**macOS and Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Alternative Installation Methods

**Using pip:**
```bash
pip install --upgrade uv
```

**Using Homebrew (macOS):**
```bash
brew install uv
```

**Using pipx (isolated environment):**
```bash
pipx install uv
```

After installation, verify that UV is working correctly:
```bash
uv --version
```

This should display version 0.7.6 or higher. For more information about UV, visit the [official documentation](https://docs.astral.sh/uv/).

## Quick Start: VS Code Integration

1.  **Clone the GXtract Repository:**
    ```bash
    git clone <repository_url>  # Replace <repository_url> with the actual URL
    cd gxtract
    ```

2.  **Install Dependencies using UV:**
    Open a terminal in the `gxtract` project directory and run:
    ```powershell
    uv sync
    ```
    This command creates a virtual environment (if one doesn't exist or isn't active) and installs all necessary dependencies specified in `pyproject.toml` and `uv.lock`.

3.  **Set GroundX API Key:**
    The GXtract server requires your GroundX API key. You need to make this key available as an environment variable named `GROUNDX_API_KEY`.
    VS Code will pass this environment variable to the server based on the configuration below. Ensure `GROUNDX_API_KEY` is set in the environment where VS Code is launched, or configure your shell profile (e.g., `.bashrc`, `.zshrc`, PowerShell Profile) to set it.

    **Option 1: Using Environment Variables (as shown above)**
    
    This approach reads the API key from your system environment variables:
    
    ```json
    "env": {
        "GROUNDX_API_KEY": "${env:GROUNDX_API_KEY}"
    }
    ```
    
    **Option 2: Using VS Code's Secure Inputs**
    
    VS Code can prompt for your API key and store it securely. Add this to your `settings.json`:
    
    ```json
    "inputs": [
      {
        "type": "promptString",
        "id": "groundx-api-key",
        "description": "GroundX API Key",
        "password": true
      }
    ]
    ```
    
    Then reference it in your server configuration:
    
    ```json
    "env": {
        "GROUNDX_API_KEY": "${input:groundx-api-key}"
    }
    ```
    
    With this approach, VS Code will prompt you for the API key the first time it launches the server, then store it securely in your system's credential manager (Windows Credential Manager, macOS Keychain, or similar).

4.  **Configure VS Code `settings.json`:**
    Open your VS Code `settings.json` file (Ctrl+Shift+P, then search for "Preferences: Open User Settings (JSON)"). Add or update the `mcp.servers` configuration:
    ```jsonc
    "mcp": {
        "servers": {
           "gxtract": { // You can name this server entry as you like, i.e. GXtract
                "command": "uv",
                "type": "stdio", // 💡 http is also supported but VS Code only supports stdio currently
                "args": [
                    // Adjust the path to your gxtract project directory if it's different
                    "--directory", 
                    "DRIVE:\\path\\to\\your\\gxtract", // Example: C:\\Users\\yourname\\projects\\gxtract
                    "--project",
                    "DRIVE:\\path\\to\\your\\gxtract", // Example: C:\\Users\\yourname\\projects\\gxtract
                    "run",
                    "gxtract", // This matches the script name in pyproject.toml
                    "--transport",
                    "stdio" // 💡 Ensure this matches the "type" above
                ],
                "env": {
                    // Option 1: Using environment variables (system-wide)
                    "GROUNDX_API_KEY": "${env:GROUNDX_API_KEY}"

                    // Option 2: Using secure VS Code input (uncomment to use)
                    // "GROUNDX_API_KEY": "${input:groundx-api-key}"
                }
            }
        }
    }
    ```
    If using Option 2 (secure inputs), add this section (`settings.json`):
    ```jsonc
    // 💡 Only needed for Option 2 (secure inputs)
    "inputs": [
        {
            "type": "promptString",
            "id": "groundx-api-key",
            "description": "GroundX API Key",
            "password": true
        }
    ]
    ```
    **Important:**
    *   Replace `"DRIVE:\\path\\to\\your\\gxtract"` with the **absolute path** to the `gxtract` directory on your system.
    *   The `"command": "uv"` assumes `uv` is in your system's PATH. If not, you might need to provide the full path to the `uv` executable.
    *   The server name `"GXtract"` in `settings.json` is how it will appear in VS Code's MCP interface.

5.  **Reload VS Code:**
    After saving `settings.json`, you might need to reload VS Code (Ctrl+Shift+P, "Developer: Reload Window") for the changes to take effect.

6.  **Using GXtract Tools:**
    Once configured, you can access GXtract's tools through VS Code's MCP features (e.g., via chat `@` mentions if your VS Code version supports it, or other MCP integrations).

## Available Tools

GXtract provides the following tools for interacting with GroundX:

*   `groundx/searchDocuments`: Search for documents within your GroundX projects.
*   `groundx/queryDocument`: Ask specific questions about a document in GroundX.
*   `groundx/explainSemanticObject`: Get explanations for diagrams, tables, or other semantic objects within documents.
*   `cache/refreshMetadataCache`: Manually refresh the GroundX metadata cache.
*   `cache/refreshCachedResources`: Manually refresh the GroundX projects and buckets cache.
*   `cache/getCacheStatistics`: Get statistics about the cached metadata.
*   `cache/listCachedResources`: List all currently cached GroundX resources (projects, buckets).

## Configuration

The server can be configured via command-line arguments when run directly. When used via VS Code, these are typically set in the `args` array in `settings.json`.

*   `--transport {stdio|http}`: Communication transport type (default: `http`, but `stdio` is used for VS Code).
*   `--host TEXT`: Host address for HTTP transport (default: `127.0.0.1`).
*   `--port INTEGER`: Port for HTTP transport (default: `8080`).
*   `--log-level {DEBUG|INFO|WARNING|ERROR|CRITICAL}`: Logging level (default: `INFO`).
*   `--log-format {text|json}`: Log output format (default: `text`).
*   `--disable-cache`: Disable the GroundX metadata cache.
*   `--cache-ttl INTEGER`: Cache Time-To-Live in seconds (default: `3600`).

### API Key Security

The GroundX API key is sensitive information that should be handled securely. GXtract supports several approaches to provide this key:

1. **Environment Variables** (recommended for development):
   - Set `GROUNDX_API_KEY` in your system or shell environment
   - VS Code will pass it to the server using `${env:GROUNDX_API_KEY}` in settings.json

2. **VS Code Secure Storage** (recommended for shared workstations):
   - Configure VS Code to prompt for the key and store it securely
   - Uses your system's credential manager (Windows Credential Manager, macOS Keychain)
   - Setup using the `inputs` section in settings.json as shown in the Quick Start

3. **Direct Environment Variable in VS Code settings** (not recommended):
   - It's possible to set the key directly in settings.json: `"GROUNDX_API_KEY": "your-api-key-here"`
   - This is not recommended as it stores the key in plaintext in your settings.json file

Always ensure your API key is not committed to source control or shared with unauthorized users.

## Development

To set up for development:

1.  Clone the repository.
2.  Navigate to the `gxtract` directory.
3.  Create and activate a virtual environment using `uv`:
    ```powershell
    uv venv # Create virtual environment in .venv
    ```
    * Activate with Windows PowerShell:
      ```powershell
      .\.venv\Scripts\Activate.ps1
      ```
    * Activate with Linux/macOS bash/zsh:
      ```bash
      source .venv/bin/activate 
      ```
4.  Install main project dependencies into the virtual environment:
    ```powershell
    uv sync # Install main dependencies from pyproject.toml
    ```
    Development tools (like Ruff, Pytest, Sphinx, etc.) are managed by Hatch and will be installed automatically
    into a separate environment when you run Hatch scripts (see below).
    Alternatively, to explicitly create or ensure the Hatch 'default' development environment is set up:
    ```powershell
    hatch env create default # Ensure your main .venv is active first
    ```
    If you need to force a complete refresh of this environment, you can remove it first 
    with 'hatch env remove default' before running 'hatch env create default'.

Run linters/formatters (this will also install them via Hatch if not already present):
```powershell
uv run lint
uv run format
```

## Documentation

The full documentation for GXtract is available at [https://sascharo.github.io/gxtract/](https://sascharo.github.io/gxtract/).

### Building Documentation Locally

If you want to build and view the documentation locally:

1. Ensure you have installed all development dependencies:
   ```bash
   uv sync
   ```

2. Build the documentation:
   ```bash
   uv run hatch -e default run docs-build
   ```

3. Serve the documentation locally:
   ```bash
   uv run hatch -e default run docs-serve
   ```

4. Open your browser and navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000)

### Building Documentation (Sphinx)

The project documentation is built using [Sphinx](https://www.sphinx-doc.org/). The following Hatch scripts are available to manage the documentation:

*   **Build Documentation:**
    ```bash
    uv run docs-build
    ```
    This command generates the HTML documentation in the `docs/sphinx/build/html` directory.

*   **Serve Documentation Locally:**
    ```bash
    uv run docs-serve
    ```
    This starts a local HTTP server (usually at `http://127.0.0.1:8000`) to preview the documentation. You can specify a different port if needed, e.g., `uv run docs-serve 8081`.

*   **Clean Documentation Build:**
    ```bash
    uv run docs-clean
    ```
    This command removes the `docs/sphinx/build` directory, cleaning out old build artifacts.

Ensure your virtual environment is active before running these commands.

## Cache Management

GXtract maintains an in-memory cache of GroundX metadata (projects and buckets) to improve performance and reduce API calls. While this cache is automatically populated during server startup and periodically refreshed, there are situations when you may need to manually refresh the cache.

### When to Manually Refresh the Cache

You should manually refresh the cache when:

1. You've recently created new projects or buckets in your GroundX account and want them to be immediately available in GXtract.
2. You see warnings in the server logs about cache population failures.
3. You're experiencing issues with project or bucket lookup when using GXtract tools.

### How to Refresh the Cache

#### Using VS Code's MCP Interface

If your VS Code version supports MCP chat interfaces:

1. Open VS Code's chat interface.
2. Use the `@GXtract` mention (or whatever name you assigned to the server in your settings).
3. Type a command to refresh the cache:
   ```
   @GXtract Please refresh the GroundX metadata cache
   ```
4. The VS Code interface will use the appropriate cache refresh tool.

#### Using Direct JSON-RPC Requests

If you have access to the server through HTTP (when not using stdio transport), you can make direct requests:

```bash
curl -X POST http://127.0.0.1:8080/jsonrpc -H "Content-Type: application/json" -d '{
  "jsonrpc": "2.0",
  "method": "cache/refreshMetadataCache",
  "params": {},
  "id": "refresh-req-001"
}'
```

### Troubleshooting Common Cache Issues

#### Warning: "No projects (groups) found or 'groups' attribute missing in API response"

This warning indicates that:
- Your API key might not have access to any projects, or
- No projects have been created in your GroundX account yet, or
- There might be an issue with the GroundX API or connectivity.

**Solution**: 
1. Verify you have correctly set up your GroundX account with at least one project.
2. Check that your API key has proper permissions.
3. Try refreshing the cache manually after confirming your account setup.

#### Warning: "GroundX metadata cache population failed. Check logs for details"

This warning appears during server startup if the initial cache population failed.

**Solution**:
1. Check the full server logs for more details about the error.
2. Verify your API key is correctly set in the environment.
3. Check your internet connection and GroundX API availability.
4. Try using the `cache/refreshMetadataCache` tool to manually populate the cache.

### Checking Cache Status

You can check the current status of the cache with:

```json
{
  "jsonrpc": "2.0",
  "method": "cache/getCacheStatistics",
  "params": {},
  "id": "stats-req-001"
}
```

Or list the currently cached resources:

```json
{
  "jsonrpc": "2.0",
  "method": "cache/listCachedResources",
  "params": {},
  "id": "list-req-001"
}
```

## Dependency Management

GXtract uses [uv](https://github.com/astral-sh/uv) for dependency management. Dependencies are specified in `pyproject.toml` and locked in `uv.lock` to ensure reproducible installations.

### Working with Dependencies

- **Installing dependencies**: Run `uv sync` to install all dependencies according to the lockfile.
- **Adding a new dependency**: Add the dependency to `pyproject.toml` and run `uv pip compile pyproject.toml -o uv.lock` to update the lockfile.
- **Updating dependencies**: After manually changing versions in `pyproject.toml`, run `uv pip compile pyproject.toml -o uv.lock --upgrade` to update the lockfile with newest compatible versions.

### The uv.lock File

The `uv.lock` file is committed to the repository to ensure that everyone working on the project uses exactly the same dependency versions. This prevents "works on my machine" problems and ensures consistent behavior across development environments and CI/CD pipelines.

When making changes to dependencies, always commit both the updated `pyproject.toml` and the `uv.lock` file.

## Versioning

This project adheres to [Semantic Versioning (SemVer 2.0.0)](https://semver.org/spec/v2.0.0.html).

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.
