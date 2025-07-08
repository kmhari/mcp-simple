# Archethic UCO Price MCP Server

An MCP server built with TypeScript providing real-time UCO price (USD & EUR) from the Archethic network's OracleChain via its GraphQL API.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

This server allows AI agents and other applications using the Model Context Protocol (MCP) to easily query the latest UCO token price.

## Features

- **Get Latest UCO Price**: Fetches the latest price of the UCO token in both USD and EUR directly from the Archethic oracle (`https://mainnet.archethic.net/api`).

## Prerequisites

- **Node.js**: Version 18.x or higher.
- **npm**: For dependency installation.

## Installation

1.  **Clone the Repository**:
    ```bash
    # Clone into a directory named 'archethic-uco-mcp'
    git clone https://github.com/redDwarf03/archethic-uco-mcp.git archethic-uco-mcp
    cd archethic-uco-mcp
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```
    This installs runtime dependencies (`@modelcontextprotocol/sdk`, `zod`) and development dependencies (`typescript`, `jest`, `ts-jest`, `@types/*`).

3.  **Build the Project**:
    Compile the TypeScript code into JavaScript:
    ```bash
    npm run build
    ```
    This command runs `tsc` (the TypeScript compiler) which outputs JavaScript files to the `./build` directory based on `tsconfig.json`.

## Usage

### Testing

Run the Jest test suite (defined in `index.test.ts`):
```bash
npm test
```
This command uses `ts-jest` to run TypeScript tests directly.

### Running the Server

After building the project (`npm run build`), you can start the MCP server:

```bash
node build/index.js
```

Alternatively, you can use the `start` script defined in `package.json` (ensure it points to the build output):

```bash
# Recommended: Update "start" script in package.json first:
# "start": "node --trace-warnings build/index.js"
npm start
```

The server will start and listen for MCP requests via stdio.

### Configuring an MCP Client (e.g., Claude Desktop)

To use this server with an MCP client, add the following to your config file. Adjust the path to `build/index.js` accordingly.

```json
{
  "mcpServers": {
    "archethic-uco-mcp": {
      "command": "node",
      "args": ["path/to/archethic-uco-mcp/build/index.js"]
    }
  }
}
```

## MCP Tool: `getUcoPrice`

The server exposes one tool via the MCP protocol:

- **Name**: `getUcoPrice`
- **Description**: Fetches the latest UCO price (USD and EUR) from the Archethic network oracle.
- **Parameters**: None.
- **Output Format**: Returns a JSON string containing the price information:
  ```json
  {
    "source": "Archethic Oracle",
    "asset": "UCO",
    "price_usd": 0.12345, // Example value
    "price_eur": 0.11567  // Example value
  }
  ```
  *(Note: The timestamp is fetched but currently only included in the internal state, not the final output string)*

- **Natural Language Example (Claude Desktop)**:

  > **Input**: "What is the current price of UCO from the Archethic oracle?"

  > **Output**: (Claude would call the `getUcoPrice` tool and process the JSON output)
  > "According to the Archethic Oracle, the current price of UCO is $0.12345 USD and €0.11567 EUR."

## Error Handling

- **API Endpoint**: The server queries the public Archethic GraphQL endpoint: `https://mainnet.archethic.net/api`.
- **Error Handling**: If the server encounters an error while fetching data (e.g., network issue, API error, unexpected response format), it will return an MCP error message to the client, indicating the problem.
  ```json
  {
    "content": [
      {
        "type": "text",
        "text": "Error fetching UCO price: [Specific error message here]"
      }
    ],
    "isError": true
  }
  ```

## License

This project is licensed under the [MIT License](LICENSE).

