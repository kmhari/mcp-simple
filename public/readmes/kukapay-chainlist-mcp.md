# Chainlist MCP Server

An MCP server that gives AI agents fast access to verified EVM chain information, including RPC URLs, chain IDs, explorers, and native tokens — sourced from Chainlist.org.

![GitHub License](https://img.shields.io/github/license/kukapay/chainlist-mcp)
![Python Version](https://img.shields.io/badge/python-3.10+-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

## Features

- **Efficient Data Fetching**: Caches Chainlist API data to minimize requests.
- **Flexible Search**: Case-insensitive keyword matching using regex for `getChainsByKeyword`.
- **Structured Output**: Markdown responses with tabulated `rpc` and `explorers` for readability.

## Installation

### Prerequisites

- **Python**: Version 3.10 or higher.
- **uv**: Recommended for managing Python projects and dependencies (install via `pip install uv` or follow [uv documentation](https://docs.astral.sh/uv/)).

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kukapay/chainlist-mcp.git
   cd chainlist-mcp
   ```

2. **Install Dependencies**:
   ```bash
   uv sync
   ```

3. **Installing to Claude Desktop**:

    Install the server as a Claude Desktop application:
    ```bash
    uv run mcp install cli.py --name "Chainlist MCP"
    ```

    Configuration file as a reference:

    ```json
    {
       "mcpServers": {
           "Chainlist MCP": {
               "command": "uv",
               "args": [ "--directory", "/path/to/chainlist-mcp", "run", "main.py" ] 
           }
       }
    }
    ```
    Replace `/path/to/chainlist-mcp` with your actual installation path.

## Usage

The server exposes two tools via the MCP protocol, accessible through MCP-compatible clients or the MCP Inspector.

### Tools

#### `getChainById`

- **Description**: Retrieves details of a blockchain by its chain ID.
- **Parameters**:
  - `chain_id` (integer): The unique identifier of the blockchain (e.g., 1 for Ethereum Mainnet).
- **Returns**: A Markdown string with chain details or an error message.

**Example Prompt** (in an MCP client):
```
Get the details for the blockchain with chain ID 1.
```

**Example Response**:
```markdown
**Chain Details**
- **Name**: Ethereum Mainnet
- **Chain ID**: 1
- **Native Currency**: Ether (ETH, 18 decimals)
- **TVL**: 134376951329.85631
**RPC Endpoints**:
| URL                                          | Tracking |
|----------------------------------------------|----------|
| https://eth.llamarpc.com                     | none     |
| https://go.getblock.io/...                   | none     |
...
**Explorers**:
| Name       | URL                        | Standard |
|------------|----------------------------|----------|
| etherscan  | https://etherscan.io       | EIP3091  |
...
```

#### `getChainsByKeyword`

- **Description**: Searches for blockchains by keyword (case-insensitive partial match).
- **Parameters**:
  - `keyword` (string): The keyword or partial name to search (e.g., 'eth').
  - `limit` (integer, optional): Maximum number of results (default: 5).
- **Returns**: A Markdown string listing up to `limit` matching chains or an error message.

**Example Prompt** (in an MCP client):
```
Find blockchains with 'eth' in their name, limit to 2 results.
```

**Example Response**:
```markdown
**Matching Chains**

### Chain 1
**Chain Details**
- **Name**: Ethereum Mainnet
- **Chain ID**: 1
- **Native Currency**: Ether (ETH, 18 decimals)
- **TVL**: 134376951329.85631
**RPC Endpoints**:
| URL                                          | Tracking |
|----------------------------------------------|----------|
| https://eth.llamarpc.com                     | none     |
...
**Explorers**:
| Name       | URL                        | Standard |
|------------|----------------------------|----------|
| etherscan  | https://etherscan.io       | EIP3091  |
...

### Chain 2
**Chain Details**
- **Name**: Ethereum Goerli
- **Chain ID**: 5
- **Native Currency**: Ether (ETH, 18 decimals)
- **TVL**: N/A
**RPC Endpoints**:
| URL                                          | Tracking |
|----------------------------------------------|----------|
| https://goerli.infura.io/...                 | yes      |
...
**Explorers**:
| Name       | URL                        | Standard |
|------------|----------------------------|----------|
| etherscan  | https://goerli.etherscan.io | EIP3091  |
...
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

