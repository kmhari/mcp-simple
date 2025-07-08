# Monad MCP Server

This MCP (Model Context Protocol) server is designed to interact with the Monad testnet. It provides a suite of tools and capabilities for developers to engage with the Monad blockchain, including checking MON token balances, sending transactions, deploying smart contracts, and monitoring blockchain events.

<a href="https://glama.ai/mcp/servers/@lispking/monad-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@lispking/monad-mcp-server/badge" alt="Monad Server MCP server" />
</a>

## What is MCP?

The Model Context Protocol (MCP) is a standardized interface that enables AI models to securely and effectively interact with external tools, services, and data sources. This server implements MCP to expose Monad blockchain functionalities to compatible AI agents or applications.

## Project Structure

The project is organized as follows:

```
monad-mcp-server/
├── .env.example        # Example environment variables file
├── .gitignore          # Specifies intentionally untracked files that Git should ignore
├── LICENSE             # Project's software license
├── README.md           # This file, providing an overview and instructions
├── package-lock.json   # Records the exact versions of dependencies
├── package.json        # Lists project dependencies and scripts
├── pnpm-lock.yaml      # PNPM lockfile for dependency resolution
├── src/                # Source code directory
│   ├── config/         # Configuration files
│   │   └── server.ts   # Server setup and Viem client initialization
│   ├── index.ts        # Main entry point of the application
│   └── tools/          # MCP tools for interacting with Monad
│       ├── block/      # Tools related to blockchain blocks (e.g., get-latest-block)
│       ├── contract/   # Tools for smart contract interactions (e.g., deploy, watch events)
│       ├── nft/        # Tools for Non-Fungible Tokens (e.g., query-mon-nft)
│       └── wallet/     # Tools for wallet operations (e.g., get balance, send transactions)
└── tsconfig.json       # TypeScript compiler configuration
```

### Key Components

*   **`src/index.ts`**: This is the main entry point for the server. It initializes the MCP server instance and registers all available tools (wallet, contract, NFT, block).
*   **`src/config/server.ts`**: This file handles the core server configuration. It sets up the `McpServer` instance with its name, version, and a list of capabilities. It also initializes the `Viem` public client for interacting with the Monad testnet and provides a function to create a `Viem` wallet client using a private key from environment variables. The server uses `StdioServerTransport` for communication.
*   **`src/tools/`**: This directory contains the implementations for various MCP tools. Each subdirectory typically focuses on a specific aspect of Monad interaction:
    *   `walletProvider`: Manages MON token balances and transactions.
    *   `contractProvider`: Handles smart contract deployment and event watching.
    *   `nftProvider`: Provides functionality for querying NFTs on the Monad network.
    *   `blockProvider`: Offers tools to retrieve block information.

## Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (version 16 or later)
*   A Node.js package manager: `npm`, `yarn`, or `pnpm` (this project uses `pnpm` in its examples)
*   Claude Desktop (or any MCP-compatible client) to interact with the server.

### Environment Variables (.env)

This project uses environment variables to manage sensitive information, primarily your Monad account's private key.

1.  **Copy the example file**: Create a copy of `.env.example` and rename it to `.env`.
    ```shell
    cp .env.example .env
    ```
2.  **Edit `.env`**: Open the newly created `.env` file in a text editor.
3.  **Set `PRIVATE_KEY`**: Fill in the `PRIVATE_KEY` variable with your Monad account's private key. This key is necessary for operations like sending transactions or deploying contracts.
    ```env
    PRIVATE_KEY="0xyourprivatekeyhere"
    ```
    **Important**: Ensure your private key starts with `0x`.
4.  **Security**: **Never commit your `.env` file to a Git repository.** The `.gitignore` file is already configured to prevent this, but always be mindful of protecting your private keys.

## Getting Started

Follow these steps to set up and run the Monad MCP server:

1.  **Clone the Repository**:

    If you haven't already, clone the project from GitHub:
    ```shell
    git clone https://github.com/lispking/monad-mcp-server.git
    cd monad-mcp-server
    ```

2.  **Install Dependencies**:

    Use `pnpm` (or your preferred package manager) to install the project dependencies listed in `package.json`:
    ```shell
    pnpm install
    ```

3.  **Build the Project**:

    The server is written in TypeScript and needs to be compiled into JavaScript. Run the build script:
    ```shell
    pnpm build
    ```
    This command will use `tsc` (the TypeScript compiler) as defined in `package.json` to compile the source files from the `src` directory into the `build` directory.

The server is now built and ready to be used by an MCP client.

## Server Capabilities

As defined in `src/config/server.ts`, the server exposes the following capabilities:

*   `get-mon-balance`: Retrieve the MON token balance for an account.
*   `send-mon-transaction`: Send MON tokens from one account to another.
*   `deploy-mon-contract`: Deploy a smart contract to the Monad testnet.
*   `watch-contract-events`: Monitor and report events emitted by a specific smart contract.
*   `query-mon-nft`: Query information about Non-Fungible Tokens on the Monad network.
*   `get-latest-block`: Fetch details of the most recent block on the Monad testnet.
*   `get-block-by-number`: Retrieve a specific block by its block number.

## Adding the MCP Server Configuration to Your Client

To use this server with an MCP-compatible client (like Claude Desktop), you'll need to add its configuration to the client's settings. The exact method may vary depending on the client, but typically involves specifying how to run the server.

Here's an example configuration snippet:

```json
{
  "mcpServers": {
    // ... other server configurations ...
    "monad-mcp": {
      "command": "node",
      "args": [
        "/absolute/path/to/your/project/monad-mcp-server/build/index.js"
      ],
      "env": {
        "PRIVATE_KEY": "<your_monad_private_key_if_not_using_dotenv_or_to_override>"
      }
    }
    // ... other server configurations ...
  }
}
```

**Explanation of Configuration Fields**:

*   `"monad-mcp"`: A unique name you assign to this server configuration within your client.
*   `"command": "node"`: Specifies that the server is a Node.js application.
*   `"args"`: An array of arguments to pass to the `node` command.
    *   The first argument is the path to the compiled entry point of the server: `/absolute/path/to/your/project/monad-mcp-server/build/index.js`. **Replace `/absolute/path/to/your/project/` with the actual absolute path to where you cloned the `monad-mcp-server` repository.**
*   `"env"`: An object to set environment variables for the server process.
    *   `"PRIVATE_KEY"`: You can set your private key here. However, it's generally recommended to use the `.env` file for better security. If set here, it might override the value in `.env` depending on the client's behavior and the server's environment variable loading order.

**Note**: Ensure the path in `"args"` is correct and points to the `build/index.js` file within your project directory.

## Further Resources

For more detailed information on the technologies used and concepts involved, refer to the following official documentation:

*   [Model Context Protocol (MCP) Documentation](https://modelcontextprotocol.io/introduction)
*   [Monad Documentation](https://docs.monad.xyz/)
*   [Viem Documentation](https://viem.sh/) (Viem is the Ethereum/Monad client library used in this project)

This comprehensive README should provide a solid understanding of the Monad MCP Server, its setup, and usage.