# Monad MCP Magic Eden

This project allows you to create an MCP server that interacts with various APIs to retrieve NFT-related data on the Monad testnet. The MCP server provides several tools:

- Retrieve the list of holder addresses for an NFT contract
-Calculate the total NFT value held by an address using floor prices
- List all NFT collections that an address holds
- Get the top-selling collections by number of sales (5 min, 10 min, 30 min, 1 h, 6 h, 24 h, 1 d, 7 d, 30 d)
- Get the top-selling collections by volume (5 min, 10 min, 30 min, 1 h, 6 h, 24 h, 1 d, 7 d, 30 d)

## Prerequisites

- Node.js (v16 or later)
- npm
- Claude Desktop

## Getting Started

1. Clone this repository

```shell
git clone https://github.com/Sifu213/monad-mcp-magiceden.git
```

2. Install dependencies:

```
npm install
```

3. Add a Thirdweb client key :
   
Get an Thirdweb client key to be able to use the list of holders for a NFT collection by creating a project and make the origin allowance to *.
Add you api client key in the nft-owners.ts file on line  :

```
const THIRDWEB_CLIENT_ID = "yourclientkey";
```

4. Build the project

```shell
npm run build
```

The server is now ready to use!

### Adding the MCP server to Claude Desktop

1. Open "Claude Desktop"

2. Open Settings

Claude > Settings > Developer

3. Open `claude_desktop_config.json` 

4. Add details about the MCP server and save the file.
Use your machine absolute path to the js files resulting from the build

```json
{
    "mcpServers": {
		"top-selling-collections": {
            "command": "node",
            "args": ["*absolutepath*\\dist\\top-selling-collections.js"]
        },
		"top-volume-collections": {
            "command": "node",
            "args": ["*absolutepath*\\dist\\top-volume-collections.js"]
        },
        "collections": {
            "command": "node",
            "args": ["*absolutepath*\\dist\\user-collection.js"]
        },
        "totalValue": {
            "command": "node",
            "args": ["*absolutepath*\\dist\\user-nft-value.js"]
        },
		"nft-owners": {
            "command": "node",
            "args": ["*absolutepath*\\dist\\nft-owners.js"]
        }
    }
}
```

5. Restart "Claude Desktop" and make sure it's a hard restart

All the MCP tools may be availables

![final result](/static/resultmcp.gif)

### Here's the final result

Using the MCP server for holders adress for an Nft collection

![final result](/static/nftholders.gif)

Using the MCP server for User Nft value

![final result](/static/nftvalue.gif)

Using the MCP server for User Nft collection

![final result](/static/nftcollectionhold.gif)

Using the MCP server for getting the trendng NFT collection by volume

![final result](/static/volumecollection.gif)

Using the MCP server for getting the trendng NFT collection by number of sales

![final result](/static/trendingbysales.gif)
