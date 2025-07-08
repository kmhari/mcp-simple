# A Model Context Protocol Server for the UK Science Museum Group API

This project is a Python MCP (https://modelcontextprotocol.io/introduction) server that allows your LLM to fetch data
from the UK Science Museum Group. Info is available at https://github.com/TheScienceMuseum/collectionsonline/wiki/Collections-Online-API#get-search.

It is currently supported by Claude Desktop for MacOS and Windows.

# Integrate with Claude Desktop

All you need is to install UV, a Python package/ project manager, then change your Claude Desktop settings to add this MCP.

For MacOS:

```shell
brew install uv
```

For Windows:

```shell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```
OR with winget:

```shell
winget install --id=astral-sh.uv  -e
```

Other installation options are available at https://docs.astral.sh/uv/getting-started/installation.

To configure Claude Desktop, go to Claude Desktop's settings -> Developer, edit config.

This will create a configuration file at:

    macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
    Windows: %APPDATA%\Claude\claude_desktop_config.json

Open this file and change it to:

```json
{
  "mcpServers": {
    "scienceMuseum": {
      "command": "uvx",
      "args": [
        "science-museum-mcp"
      ]
    }
  }
}
```
Opening Claude Desktop should now start the MCP server, and Claude can be queried. As an example:

<img width="748" alt="Screenshot 2025-04-15 at 19 43 05" src="https://github.com/user-attachments/assets/6690b802-24c3-40f0-85b2-d4a2b6cc5460" />


Anthropic's own instructions for this step are here - https://modelcontextprotocol.info/docs/quickstart/user/.

# Developing

This section is for anyone who wants to contribute to the codebase.

## Setup and Install Dependencies

Clone the repository.

The project is configured to use uv (Install link: https://docs.astral.sh/uv/#installation) for dependency management 
and building.
It uses npx (Install link: https://www.npmjs.com/package/npx) to run the MCP inspector.  

Create a virtual env with

```shell
uv venv
```

And install dependencies with

```shell
uv pip install -r pyproject.toml
```

Run the inspector with
```shell
./inspector.sh
```
The inspector should output the localhost URL for accessing its UI.
## Running Unit Tests

```shell
source .venv/bin/activate
pytest
```

## Publishing

This is currently a manual process I can do. This will be changed to a Github action if the project gets any development from now on.
