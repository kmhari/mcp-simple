# NebulaBlock API MCP

This repository hosts the official NebulaBlock API Model Context Protocol (MCP) server. This server integrates with the `fastmcp` library to expose the full range of NebulaBlock API functionalities as accessible tools, enabling seamless and efficient interaction within any MCP-compatible environment.

## Project Structure

```
.
├── src/
│   ├── __init__.py
│   ├── config.py
│   ├── main.py
│   ├── tools.py
│   └── mcp_project.egg-info/
├── tests/
│   ├── __init__.py
│   └── test_main.py
├── scripts/
├── docs/
├── .env.example
├── .gitignore
├── pyproject.toml
├── README.md
└── uv.lock
```

*   `src/`: Contains the main application source code, including configuration and tool definitions.
*   `tests/`: Contains unit and integration tests.
*   `scripts/`: Reserved for utility scripts (e.g., setup, data generation).
*   `docs/`: Reserved for supplementary documentation.
*   `.env.example`: Example file for environment variables.
*   `.gitignore`: Specifies intentionally untracked files to ignore.
*   `pyproject.toml`: Project metadata and build system configuration, including dependencies and project information.
*   `README.md`: This documentation file.
*   `uv.lock`: Lock file for `uv` dependency management.

## Installation and Setup

To set up and run this project, follow these steps:

1.  **Clone the repository (if applicable):**
    ```bash
    git clone https://github.com/Nebula-Block-Data/api-mcp
    cd mcp-project
    ```

2.  **Create a virtual environment:**
    It's highly recommended to use a virtual environment to manage project dependencies.
    ```bash
    python3 -m venv .venv
    ```

3.  **Activate the virtual environment:**
    *   **macOS/Linux:**
```bash
source .venv/bin/activate
```

4.  **Install dependencies:**
    This project uses `pyproject.toml` for dependency management. Install `setuptools` and then the project in editable mode.
    ```bash
    uv pip install -e .
    ```
    This will install `fastmcp` and any other dependencies specified in `pyproject.toml`.

## Running the NebulaBlock API MCP Server

To start the NebulaBlock API MCP server:

```bash
uv run -m src.main
```

You should see output similar to: `[05/29/25 17:32:58] INFO     Starting MCP server 'FastMCP' with transport 'stdio'`

### Configuring API Key

The NebulaBlock API key can be configured in two ways:

1.  **Using the `--api-key` command-line argument:**
    You can provide the API key directly when running the application:
    ```bash
    python -m src.main --api-key your_nebula_block_api_key
    ```
    This method will override any API key set in the `.env` file.

2.  **Using a `.env` file:**
    Create a file named `.env` in the root directory of the project and add your API key to it:
    ```
    NEBULA_BLOCK_API_KEY=your_nebula_block_api_key
    ```
    The application will automatically load the API key from this file if the `--api-key` argument is not provided.

## Running Tests

To run the unit tests, ensure your virtual environment is activated and `pytest` is installed (it will be installed with `pip install -e .`):

```bash
pytest
```

You should see output indicating that the tests passed.

## Integrating with an MCP Client

To utilize the NebulaBlock API MCP server, you need to configure your MCP client (e.g., VS Code with an MCP extension) to connect to this server. Below is an example configuration for a `settings.json` file:

```json
{
  "mcpServers": {
    "nebula": {
      "command": "~/path/to/uv",
      "args": [
        "--directory",
        "~/path/to/nebulablock_mcp",
        "run",
        "-m",
        "src.main",
        "--api-key=YOUR_API_KEY"
      ]
    }
  }
}
```

*   Replace `~/path/to/uv` with the actual path to your `uv` executable.
*   Replace `~/path/to/nebulablock_mcp` with the actual path to your project directory.
*   Replace `YOUR_API_KEY` with your actual NebulaBlock API key.

## License

This project is licensed under the MIT License. See the `LICENSE` file (if created) for details.