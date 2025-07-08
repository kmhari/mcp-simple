
# Monad Bridge MCP Server

A lightweight Model Context Protocol (MCP) server that enables bridging functionality between Ethereum Sepolia and Monad Testnet networks using the Wormhole bridge. This MCP interacts with Monadbridge and Wormholes APIs.

## 🚀 Supported Tools

This MCP server provides the following tools:

| Tools Name                          | Description                                                   | Command |
|----------------------------------|-------------------------------------------------------------|------|
| `get-wallet-address`             | Get wallet address from private key.                       | `show my wallet address` |
| `get-eth-balance`                | Check ETH balance on Sepolia testnet.                      | `check our ETH balance` |
| `get-mon-balance`                | Check MON balance on Monad testnet.                        | `check our MONAD balance` |
| `bridge-sepolia-wmon-to-monad`  | Bridge wrapped MON (wMON) on Sepolia to MON on Monad.      | `bridge 1 mon sepolia to monad` |
| `bridge-monad-to-sepolia-wmon`  | Bridge MON from Monad to wMON on Sepolia.                  | `bridge 1 monad to sepolia` |
| `get-wmon-sepolia-balance` | Check Wrapped MON (wMON) balance on Sepolia. | `check our wmon balance on sepolia` |
|`get-10-last-bridge-transaction`|Get and view the last 10 bridge transactions from Sepolia to Monad or Monad to Sepolia| `get 10 last bridge transaction` `get last bridge`|

## Quick Start

- Clone the repository
```bash
git clone https://github.com/rawakinode/monad-bridge-mcp-server.git
cd monad-bridge-mcp-server
npm install
```

- Build and run
```
npm run build
```

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Claude Desktop (for MCP Client integration)

## How to Use

1. You need to Download and install Claude Dekstop
2. Open Claude Dekstop
3. Go to `Settings > Developer`
4. Open config . Edit `claude_desktop_config.json`
5. Add the following configuration.
```json
{
  "mcpServers": {
    "monad-mcp": {
      "command": "node",
      "args": ["<your-local-path>monad-bridge-mcp-server\\build\\index.js"],
      "env": {
        "PRIVATE_KEY": "<your-private-key>" 
      }
    }
  }
}

```
6. Replace `<your-local-path>monad-bridge-mcp-server\\build\\index.js` with the actual path to your project directory (e.g., `E:\data\monad-bridge-mcp-server\build\index.js` on Windows or `/home/user/monad-bridge-mcp-server\build\index.js` on Linux).
7. Restart Claude Desktop.
8. When prompted, allow MCP access for the chat session `(Allow for This Chat)`.

## Command Usage

### Check Wallet Address

- Write command `show my wallet address` on Claude.
- Allow MCP access for the chat session `(Allow for This Chat)`.
- Claude will respon with your wallet address from your PRIVATE_KEY.
 ![image](./image/a_wallet.png)

### Check Wallet Balance (ETH, MONAD, and wMON)

- Write command `check our ETH balance, check our MONAD balance, and check our wmon balance on sepolia` on Claude.
- Allow MCP access for the chat session `(Allow for This Chat)`.
- Claude will respon with balance ETH sepolia, MON, and wMON Sepolia.

 ![image](./image/b_get_balance.png)

### Bridge wMON Sepolia > MONAD

- Write command `bridge 0.01 wmon sepolia to monad` on Claude.
- Allow MCP access for the chat session `(Allow for This Chat)`.
- If success, Claude will respon with success transaction details.
 ![image](./image/c_bridge.png)

### Bridge MONAD > wMON Sepolia

- Write command `bridge 0.01 monad to wmon sepolia` on Claude.
- Allow MCP access for the chat session `(Allow for This Chat)`.
- If success, Claude will respon with success transaction details.
 ![image](./image/d_bridge.png)

## Important Links

- [View on Etherscan Sepolia](https://sepolia.etherscan.io/)
- [View on Monad Testnet Explorer](https://testnet.monadexplorer.com/)
- [Wormhole Scan (Testnet)](https://wormholescan.io/?network=Testnet)

## Contact

- [Twitter X](https://x.com/rawakinode)
- [Github](https://github.com/rawakinode)

