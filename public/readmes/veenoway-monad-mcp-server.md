# Monad MCP Server

A MCP (Model Context Protocol) server for interacting with the Monad blockchain, offering a comprehensive suite of DeFi tools and blockchain functionalities.

## Features

- 🚰 Monad Faucet - Get MON tokens for the testnet
- 📝 Solidity Contract Deployment
- 🎨 Image Generation & NFT Minting
- 💱 Token Swap
- 🤖 Autonomous AI Trading Agent
- 🔍 Smart Contract Analysis
- 👥 NFT Holders Analysis
- 📊 Portfolio Analysis
- 🏆 Competitive DeFi Challenges
- 🔒 Staking & Unstaking
- 💸 Token Transfer

## Prerequisites

- Node.js v18 or higher
- npm or yarn
- A private key for Monad testnet

## Installation

1. Clone the repository:

```bash
git clone https://github.com/veenoway/monad-mcp-server.git
cd monad-mcp-server
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:

```bash
cp .env.example .env
# Edit the .env file with your configurations
```

# Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PINATA_JWT=PINATA_JWT
OPENAI_API_KEY=OPENIA_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
NFT_FACTORY_ADDRESS=NFT_FACTORY_ADDRESS=
```

## Important Notes About MCP Servers

1. **Path Configuration Issues**

   - Ensure all paths in `claude_desktop_config.json` are absolute paths
   - The paths should point to the compiled JavaScript files in the `build` directory
   - Example: `/Users/your-username/monad-mcp-server/build/tool-name.js`

2. **Common Problems**

   - MCP servers might fail to start if paths contain spaces
   - Node.js version compatibility issues (use Node.js v18 or higher)
   - Permission issues with the configuration file
   - Environment variables not being loaded correctly

3. **Troubleshooting Steps**

   - Verify the paths in `claude_desktop_config.json`
   - Check file permissions: `chmod 644 claude_desktop_config.json`
   - Ensure Node.js is in your PATH
   - Verify all environment variables are set correctly
   - Check the build directory exists and contains compiled files

4. **Alternative Configuration**
   If MCP servers are not working properly, you can run the tools directly:

   ```bash
   # Example for faucet
   node build/faucet.js '{"parameters":{"walletAddress":"0xYourAddress"}}'

   # Example for staking
   node build/staking.js '{"parameters":{"privateKey":"0xYourKey","amount":"0.2"}}'
   ```

5. **Development Mode**
   For development, you can use:

   ```bash
   # Start the development server
   npm run dev

   # Or run tools directly with ts-node
   ts-node src/tools/faucet.ts '{"parameters":{"walletAddress":"0xYourAddress"}}'
   ```

# MCP Servers Configuration

To configure the MCP servers, you need to create or modify the following configuration file:

```json
{
  "mcpServers": {
    "generate-image-mint-nft": {
      "command": "node",
      "args": ["/path/to/build/generate-image.js"]
    },
    "deploy-solidity": {
      "command": "node",
      "args": ["/path/to/build/deploy-solidity.js"]
    },
    "swap": {
      "command": "node",
      "args": ["/path/to/build/swap.js"]
    },
    "monad-faucet": {
      "command": "node",
      "args": ["/path/to/build/faucet.js"]
    },
    "analyse-smart-contract": {
      "command": "node",
      "args": ["/path/to/build/analyse-smart-contract.js"]
    },
    "user-portfolio": {
      "command": "node",
      "args": ["/path/to/build/portfolio.js"]
    },
    "nft-top-holders": {
      "command": "node",
      "args": ["/path/to/build/nft-holder.js"]
    },
    "monad-ai-trader": {
      "command": "node",
      "args": ["/path/to/build/ai-agent.js"]
    },
    "defi-challenges": {
      "command": "node",
      "args": ["/path/to/build/defi-challenge.js"]
    },
    "monad-staking": {
      "command": "node",
      "args": ["/path/to/build/staking.js"]
    },
    "send-token": {
      "command": "node",
      "args": ["/path/to/build/send-token.js"]
    }
  }
}
```

## Configuration File Location

The configuration file should be placed at the following location:

- macOS : `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows : `%APPDATA%\Claude\claude_desktop_config.json`
- Linux : `~/.config/Claude/claude_desktop_config.json`

## Important Notes

- Ensure all paths to JavaScript files are correct
- Each tool must have its own build script
- Paths can be absolute or relative
- The `node` command must be accessible in your PATH
- Scripts must be compiled before use

## Starting the Server

1. Start the server in development mode:

```bash
npm run dev
# or
yarn dev
```

2. For production:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

# Prompt Guide - Monad Faucet

## Input Format

### JSON Request

```json
{
  "tool": "monad-faucet",
  "parameters": {
    "walletAddress": "0xYourWalletAddress"
  }
}
```

### Natural Prompt Examples

```
I want MON tokens sent to my address: 0x1234567890123456789012345678901234567890
```

```
Send me 0.2 MON to: 0x1234567890123456789012345678901234567890
```

```
I need tokens for testing on Monad Testnet. My address: 0x1234567890123456789012345678901234567890
```

## Output Format

```json
{
  "content": [
    {
      "type": "text",
      "text": "✅ 0.2 MON successfully sent to 0xYourWalletAddress\nTransaction: 0xTransactionHash\nSent from: 0xFaucetAddress"
    }
  ]
}
```

# Prompt Guide - Deploy Solidity Contract

## Input Format

### JSON Request

```json
{
  "tool": "deploy-solidity",
  "parameters": {
    "privateKey": "0xYourPrivateKey",
    "sourceCode": "// Your Solidity contract code here",
    "constructorArgs": ["arg1", "arg2"]
  }
}
```

### Natural Prompt Examples

```
Deploy a NFT smart contract
Smart contract should include:
WL phase which lasts 24 hours and switches to public, 1000 total supply, WL price: 0.3 MON, public price 10 MON.
to Monad testnet with my private key: <your_private_key>
```

```
Deploy this ERC20 token contract with initial supply of 1000000 tokens. My private key: 0x1234567890123456789012345678901234567890

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
```

## Output Format

```json
{
  "content": [
    {
      "type": "text",
      "text": "Contract deployed and verified successfully!

Contract address: 0xContractAddress
Transaction hash: 0xTransactionHash
Block: 123456
Gas used: 123456

Your contract is deployed and verified on Monad testnet.
You can view your verified contract here: https://testnet.monadexplorer.com/address/0xContractAddress

Deployment arguments used:
- Argument 1: 1000000"
    }
  ]
}
```

## Important Notes

- Private key must be valid and have sufficient MON balance (at least 0.01 MON)
- Source code must be valid Solidity code
- Constructor arguments are optional but must match the contract's constructor parameters
- Contract will be automatically verified if possible
- Supported contract types: ERC20, Storage, SimpleStorage, and basic contracts

# Prompt Guide - Generate Image & Mint NFT

## DEPLOY A SIMPLE NFT SMART CONTRACT

Add the contract address & deployer private key into .env file.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VeenoXNFTFactory is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("VeenoX NFT", "VXNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mint(string memory tokenURI, address to) external onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        tokenCounter += 1;
        return newTokenId;
    }
}
```

## Input Format

### JSON Request

```json
{
  "tool": "image-nft-generation",
  "parameters": {
    "prompt": "Description of the image to generate",
    "userAddress": "0xYourWalletAddress"
  }
}
```

### Natural Prompt Examples

```
Generate an image of a futuristic city with flying cars and mint it as an NFT to my address: 0x1234567890123456789012345678901234567890
```

```
Create a digital art piece of a cyberpunk cat and send it to my wallet: 0x1234567890123456789012345678901234567890
```

```
I want an NFT of a magical forest with glowing mushrooms. My address is: 0x1234567890123456789012345678901234567890
```

## Output Format

### Success

```json
{
  "content": [
    {
      "type": "text",
      "text": "✅ Image generated and minted as NFT for **0xYourWalletAddress**!

- **Prompt**: \"Your image description\"
- **IPFS Image**: [View image](https://gateway.pinata.cloud/ipfs/YourImageHash)
- **Token URI**: ipfs://YourMetadataHash
- **Transaction**: [View on Monad Explorer](https://testnet.monadexplorer.com/tx/YourTransactionHash)"
    }
  ]
}
```

## Important Notes

- Prompt length is limited to 1000 characters
- Images are generated at 1024x1024 resolution
- Generated images are automatically uploaded to IPFS
- NFTs are minted on Monad Testnet
- Each image is unique and generated using DALL-E 2
- The NFT includes metadata with generation date and prompt information

# Prompt Guide - Token Swap

## Input Format

### JSON Request

```json
{
  "tool": "swap",
  "parameters": {
    "privateKey": "0xYourPrivateKey",
    "routerType": "uniswap", // or "sushiswap"
    "tokenInAddress": "0xTokenInAddress", // Optional for native MON swaps
    "tokenOutAddress": "0xTokenOutAddress",
    "amountIn": "1.0", // Amount in full units
    "slippagePercentage": 0.5, // Optional, default 0.5%
    "deadline": 1234567890, // Optional, Unix timestamp
    "useNativeMON": false, // Optional, default false
    "checkLiquidityOnly": false // Optional, default false
  }
}
```

### Natural Prompt Examples

```
Swap 0.1 WMON (0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701) to TCHOG (0xCaF9244A9D4A79c3229cb354a1919961fa0122B4) My private key: 0x1234567890123456789012345678901234567890
```

```
Exchange 10 TCHOG tokens for WMON on Uniswap with 1% slippage. My private key: 0x1234567890123456789012345678901234567890
```

```
Check liquidity for swapping 0.5 WMON to TCHOG on Uniswap. My private key: 0x1234567890123456789012345678901234567890
```

## Output Format

### Success

```json
{
  "content": [
    {
      "type": "text",
      "text": "Token swap successful!

From: 1.0 MON
To: 100.0 TCHOG (estimated)

Transaction: 0xTransactionHash
Block: 123456
DEX used: uniswap
Swap path: MON -> Token(0x1234...5678)

You can view your transaction here:
https://testnet.monadexplorer.com/tx/0xTransactionHash"
    }
  ]
}
```

### Liquidity Check

```json
{
  "content": [
    {
      "type": "text",
      "text": "Liquidity check for pools on uniswap:

Direct pool MON -> TCHOG: Exists
Liquidity: 1000 MON <-> 100000 TCHOG
Pool address: 0xPoolAddress

Recommended path: Direct

Popular tokens available on uniswap:
1. TCHOG (0xTokenAddress)
2. WMON (0xTokenAddress)

If you want to create liquidity, you'll need to add tokens to the pools via the DEX interface."
    }
  ]
}
```

## Important Notes

- Supports both Uniswap and SushiSwap
- Can swap between any ERC20 tokens or native MON
- Automatic path finding (direct or via MON)
- Slippage protection with configurable percentage
- Optional liquidity check before swapping
- Supports both token-to-token and token-to-MON swaps

# Prompt Guide - AI Trading Agent

## Input Format

### JSON Request

```json
{
  "tool": "monad-ai-trader",
  "parameters": {
    "privateKey": "0xYourPrivateKey",
    "initialInvestment": 0.1, // Optional, default 0.1 MON
    "riskLevel": "moderate", // Optional, "conservative" | "moderate" | "aggressive"
    "learningRate": 0.1, // Optional, default 0.1
    "maxSlippage": 1.5, // Optional, default 1.5%
    "action": "create" // "create" | "start" | "stop" | "status" | "improve"
  }
}
```

### Natural Prompt Examples

```
Create an AI trading agent with 0.5 MON initial investment and moderate risk. My private key: 0x1234567890123456789012345678901234567890
```

```
Start my AI trading agent with aggressive risk profile. My private key: 0x1234567890123456789012345678901234567890
```

```
Check the status of my AI trading agent. My private key: 0x1234567890123456789012345678901234567890
```

```
Improve my AI trading agent's strategy. My private key: 0x1234567890123456789012345678901234567890
```

## Output Format

### Agent Creation

```json
{
  "content": [
    {
      "type": "text",
      "text": "🤖 AUTONOMOUS AI TRADING AGENT CREATED

ID: ai-trader-123456
Address: 0xAgentAddress
Balance: 0.5 MON
Status: active
Risk Level: MODERATE

✅ AI Agent created successfully
Initial capital: 0.5 MON
✅ Initial purchase: 0.25 WMON → TCHOG
Hash: 0xTransactionHash

To start the agent: monad-ai-trader-autonomous --action=start --privateKey=0x123..."
    }
  ]
}
```

### Trading Action

```json
{
  "content": [
    {
      "type": "text",
      "text": "🤖 AUTONOMOUS AI TRADING AGENT STARTED

ID: ai-trader-123456
Address: 0xAgentAddress
Balance: 0.45 MON
Status: active
Risk Level: MODERATE

✅ Transaction executed: BUY 10 TCHOG
Confidence: 75.50%
Hash: 0xTransactionHash"
    }
  ]
}
```

### Status Check

```json
{
  "content": [
    {
      "type": "text",
      "text": "🤖 AUTONOMOUS AI TRADING AGENT STATUS

ID: ai-trader-123456
Address: 0xAgentAddress
Balance: 0.45 MON
Status: active
Risk Level: MODERATE

📊 AI AGENT STATUS
Total transactions: 5
Learning rate: 0.1
Exploration rate: 0.200
Last improvement: 2024-03-20T12:00:00Z

STRATEGY PARAMETERS:
- Position size: 25.00%
- Entry threshold: 0.60
- Stop loss: 10.00%
- Take profit: 15.00%"
    }
  ]
}
```

### Error

```json
{
  "content": [
    {
      "type": "text",
      "text": "❌ Error executing autonomous AI agent: [Detailed error message]

Suggestions:
1. Verify that your private key is correct
2. Ensure you have sufficient MON for the initial investment
3. Verify that the agent exists if you're using an action other than 'create'
4. If the agent is already active, use 'status' to check its state"
    }
  ]
}
```

## Important Notes

- The AI agent automatically trades between WMON and TCHOG on Monad Testnet
- Uses technical analysis and machine learning for decision making
- Supports three risk levels: conservative, moderate, aggressive
- Automatically improves based on past performance
- Executes real transactions on the network
- Checks liquidity before each transaction
- Includes loss protection mechanisms (stop loss)
- Transactions are verifiable on Monad Explorer

# Prompt Guide - Smart Contract Analysis

## Input Format

### JSON Request

```json
{
  "tool": "analyze-smart-contract",
  "parameters": {
    "contractAddress": "0xContractAddress",
    "startBlock": 1000000, // Optional
    "privateKey": "0xYourPrivateKey", // Optional, required for simulation
    "simulateLoad": false, // Optional, default false
    "traceFunctions": true, // Optional, default true
    "visualizeActivity": true, // Optional, default true
    "gasAnalysis": true, // Optional, default true
    "securityScan": true, // Optional, default true
    "monitorDuration": 10 // Optional, monitoring duration in blocks
  }
}
```

### Natural Prompt Examples

```
Analyze the contract at address 0x1234567890123456789012345678901234567890
```

```
Simulate high load on contract 0x1234567890123456789012345678901234567890 with my private key 0xabcdef1234567890
```

```
Check the security of contract 0x1234567890123456789012345678901234567890
```

```
Analyze gas usage of contract 0x1234567890123456789012345678901234567890
```

## Output Format

### Complete Analysis

```json
{
  "content": [
    {
      "type": "text",
      "text": "## Smart Contract Analysis Report

**Contract Address**: 0xContractAddress
**Code Size**: 12345 bytes
**Balance**: 1.5 MON
**Transaction Count**: 1000
**Detected Standards**: ERC20, OpenZeppelin

### Contract Functions
1. `transfer(address,uint256)`
2. `approve(address,uint256)`
3. `balanceOf(address)`

### Activity Analysis
**Total Transactions**: 1000
**Unique Callers**: 50
**Average Gas Used**: 45000

**Temporal Distribution**:
- Last 24h: 100 transactions
- Last Week: 500 transactions
- Last Month: 1000 transactions

### Gas Analysis
**Total Gas Used**: 45000000
**Average Gas per Call**: 45000
**Estimated Cost**: 0.045 MON
**Gas Efficiency**: Good

### Security Analysis
**Security Score**: 85/100
**Risk Level**: Low

**Security Recommendations**:
1. Implement reentrancy protection
2. Use SafeMath for arithmetic operations
3. Add appropriate access controls"
    }
  ]
}
```

### Load Simulation

```json
{
  "content": [
    {
      "type": "text",
      "text": "## Load Simulation Results

**Sent Transactions**: 100
**Success Rate**: 95%
**Average Gas Used**: 45000

**Performance Metrics**:
- Transactions per Second: 10.5
- Average Confirmation Time: 2.5 seconds
- Average Gas Price: 1.2 gwei"
    }
  ]
}
```

### Error

```json
{
  "content": [
    {
      "type": "text",
      "text": "❌ Error analyzing contract: [Detailed error message]

Suggestions:
1. Verify that the contract address is correct
2. Ensure the contract exists on Monad Testnet
3. Verify your private key is correct if performing simulation
4. If the contract is a proxy, ensure you're using the implementation address"
    }
  ]
}
```

## Important Notes

- Analysis includes verification of ERC20, ERC721, and ERC1155 standards
- Load simulation requires a valid private key
- Security analysis detects common vulnerabilities
- Real-time monitoring is limited to 100 blocks maximum
- Activity visualizations are generated for the last 24 hours
- Gas analysis includes optimization recommendations
- Results are based on Monad Testnet data

# Prompt Guide - NFT Holders

## Input Format

### JSON Request

```json
{
  "tool": "nft-top-holders",
  "parameters": {
    "contractAddress": "0xContractAddress",
    "tokenId": "123", // Optional
    "standard": "ERC721", // "ERC721" | "ERC1155"
    "limit": 100 // Optional, default 100
  }
}
```

### Natural Prompt Examples

```
Find holders of the NFT at address 0x1234567890123456789012345678901234567890
```

```
List holders of token ID 123 from ERC721 contract 0x1234567890123456789012345678901234567890
```

```
Who owns token ID 456 from ERC1155 contract 0x1234567890123456789012345678901234567890
```

```
Show me the top 50 holders of NFT 0x1234567890123456789012345678901234567890
```

## Output Format

### Holders List

```json
{
  "content": [
    {
      "type": "text",
      "text": "NFT Holders for Monad Collection (MON) at address 0xContractAddress:

1. 0xHolder1: 5 token(s) - IDs: [1, 2, 3, 4, 5]
2. 0xHolder2: 3 token(s) - IDs: [6, 7, 8]
3. 0xHolder3: 1 token(s) - IDs: [9]"
    }
  ],
  "contractAddress": "0xContractAddress",
  "standard": "ERC721",
  "name": "Monad Collection",
  "symbol": "MON",
  "tokenId": "all",
  "holderCount": 3,
  "holders": [
    {
      "address": "0xHolder1",
      "tokens": [1, 2, 3, 4, 5],
      "tokenCount": 5
    },
    {
      "address": "0xHolder2",
      "tokens": [6, 7, 8],
      "tokenCount": 3
    },
    {
      "address": "0xHolder3",
      "tokens": [9],
      "tokenCount": 1
    }
  ]
}
```

### Error

```json
{
  "content": [
    {
      "type": "text",
      "text": "❌ Error retrieving NFT holders: [Detailed error message]

Suggestions:
1. Verify that the contract address is correct
2. Ensure the contract implements the specified NFT standard
3. For ERC1155 contracts, you must specify a tokenId
4. Verify that the contract exists on Monad Testnet"
    }
  ]
}
```

## Important Notes

- Supports ERC721 and ERC1155 standards
- For ERC1155, a specific tokenId is required
- Results are sorted by token count (descending)
- Default limit is 100 holders
- Tokens are listed by ID in ascending order
- Collection name and symbol are displayed if available
- Results include total holder count
- Data is based on contract transfer events
- Balances are verified in real-time for accuracy

# Prompt Guide - Portfolio Analysis

## Input Format

### JSON Request

```json
{
  "tool": "portfolio",
  "parameters": {
    "address": "0xWalletAddress",
    "includeErc20": true, // Optional, default true
    "includeNfts": true, // Optional, default true
    "includeLiquidityPositions": true, // Optional, default true
    "includeTransactionHistory": true, // Optional, default true
    "transactionLimit": 10, // Optional, default 10
    "erc20TokensLimit": 50, // Optional, default 50
    "nftsLimit": 20 // Optional, default 20
  }
}
```

### Natural Prompt Examples

```
Analyze the portfolio of address 0x1234567890123456789012345678901234567890
```

```
Show me the last 20 transactions of 0x1234567890123456789012345678901234567890
```

```
What are the NFTs and ERC20 tokens of 0x1234567890123456789012345678901234567890
```

```
Show liquidity positions of 0x1234567890123456789012345678901234567890
```

## Output Format

### Complete Analysis

```json
{
  "content": [
    {
      "type": "text",
      "text": "Portfolio analysis for address 0xWalletAddress"
    },
    {
      "type": "text",
      "text": {
        "nativeBalance": "1.5 MON",
        "erc20Tokens": [
          {
            "address": "0xToken1",
            "name": "Token One",
            "symbol": "TKN1",
            "balance": "100.0"
          },
          {
            "address": "0xToken2",
            "name": "Token Two",
            "symbol": "TKN2",
            "balance": "50.0"
          }
        ],
        "nfts": {
          "erc721": [
            {
              "contractAddress": "0xNFT1",
              "collectionName": "Monad Collection",
              "symbol": "MON",
              "tokenId": "1",
              "tokenURI": "ipfs://..."
            }
          ],
          "erc1155": [
            {
              "contractAddress": "0xNFT2",
              "tokenId": "2",
              "balance": "5",
              "uri": "ipfs://..."
            }
          ]
        },
        "liquidityPositions": [
          {
            "pairAddress": "0xPair1",
            "token0": {
              "address": "0xToken1",
              "symbol": "TKN1",
              "amount": "10.0"
            },
            "token1": {
              "address": "0xToken2",
              "symbol": "TKN2",
              "amount": "20.0"
            },
            "lpBalance": "15.0",
            "shareOfPool": "0.5%"
          }
        ],
        "transactions": [
          {
            "hash": "0xTx1",
            "from": "0xWalletAddress",
            "to": "0xRecipient",
            "value": "0.1 MON",
            "timestamp": "2024-03-20T12:00:00Z",
            "status": "Success",
            "gasUsed": "21000"
          }
        ]
      }
    }
  ]
}
```

### Error

```json
{
  "content": [
    {
      "type": "text",
      "text": "❌ Error analyzing portfolio: [Detailed error message]

Suggestions:
1. Verify that the wallet address is correct
2. Ensure the address exists on Monad Testnet
3. Verify that the limit parameters are valid
4. If the error persists, try analyzing specific portfolio sections"
    }
  ]
}
```

## Important Notes

- Analysis includes native MON balance
- Supports ERC20 tokens, ERC721 and ERC1155 NFTs
- Detects liquidity positions on DEXs
- Includes recent transaction history
- Limits are configurable for each asset type
- Results include token metadata (name, symbol, URI)
- Liquidity positions include pool share
- Transactions include status and gas usage
- Data is based on on-chain events
- Balances are verified in real-time

# Prompt Guide - Monad DeFi Challenge

## Overview

The Monad DeFi Challenge is a competitive platform that allows users to participate in various DeFi activities on the Monad testnet, compare their performance with other users, and earn rewards.

## Challenge Types

### 1. Yield Farming

- Focus on maximizing yield through various farming strategies
- Support for different risk levels (low, medium, high)
- Automatic portfolio rebalancing available

### 2. Trading

- Competitive trading challenges
- Support for different trading strategies
- Performance tracking and leaderboard

### 3. Liquidity Mining

- Provide liquidity to different pools
- Earn rewards based on performance
- Risk management tools

### 4. Staking

- Network staking challenges
- Governance participation
- Protocol staking options

## Features

### Risk Management

- Three risk levels: Low, Medium, High
- Automatic risk assessment
- Portfolio diversification recommendations

### Performance Tracking

- Real-time performance monitoring
- Historical performance analysis
- Comparative analytics with other participants

### Rewards System

- Daily, weekly, and monthly challenges
- Reward pool distribution
- Entry fee structure based on duration

### Technical Features

- Gas optimization
- Transaction speed monitoring
- Smart contract security analysis

## API Integration

### JSON Request Format

```json
{
  "tool": "defi-challenges",
  "parameters": {
    "privateKey": "0xYourPrivateKey",
    "challengeType": "yield-farming",
    "duration": "weekly",
    "publicUsername": "optional_username",
    "initialInvestment": "1.0",
    "riskLevel": "medium",
    "joinPool": true,
    "teamName": "optional_team_name",
    "specificStrategies": ["strategy1", "strategy2"],
    "autoRebalance": true,
    "notificationsEnabled": true
  }
}
```

### Response Format

```json
{
  "content": [
    {
      "type": "text",
      "text": "Challenge details and results"
    }
  ],
  "challengeSummary": {
    "challengeId": "unique_id",
    "participant": {
      "username": "user_name",
      "wallet": "wallet_address",
      "team": "team_name"
    },
    "challenge": {
      "type": "challenge_type",
      "duration": "challenge_duration",
      "riskLevel": "risk_level",
      "startedAt": "timestamp",
      "endsAt": "timestamp",
      "initialInvestment": "amount",
      "joinedRewardsPool": true,
      "entryFee": "fee_amount",
      "autoRebalancing": true
    },
    "strategy": {
      "selectedStrategies": ["strategy1", "strategy2"],
      "initialAllocation": [
        {
          "asset": "asset_name",
          "percentage": 50,
          "amount": "amount"
        }
      ],
      "projectedAPY": "percentage",
      "projectedROI": "percentage"
    },
    "ranking": {
      "currentParticipants": 100,
      "yourEstimatedRank": 25,
      "topPerformers": [
        {
          "rank": 1,
          "username": "top_user",
          "performance": 15.5,
          "strategy": "winning_strategy"
        }
      ]
    },
    "rewards": {
      "totalPoolSize": "pool_size",
      "estimatedRewards": "reward_amount",
      "rewardsBreakdown": [
        {
          "position": "1st Place",
          "amount": "reward_amount",
          "chance": "percentage"
        }
      ]
    }
  }
}
```

# Prompt Guide - Monad Staking

## Input Format

### JSON Request

```json
{
  "tool": "monad-staking",
  "parameters": {
    "privateKey": "0xYourPrivateKey",
    "amount": "0.2"
  }
}
```

### Natural Prompt Examples

```
I want to stake 0.2 MON on Monad Testnet with my private key: 0x1234567890123456789012345678901234567890
```

```
Stake 0.5 MON on Monad Testnet. My private key: 0x1234567890123456789012345678901234567890
```

## Output Format

```json
{
  "content": [
    {
      "type": "text",
      "text": "✅ 0.2 MON successfully staked from 0xYourWalletAddress\nTransaction: 0xTransactionHash\nBalance after: 0.2 aprMON"
    }
  ]
}
```

## Important Notes

- Private key must be valid and have sufficient MON balance
- Amount must be specified in MON (not in wei)
- Staking converts your MON to aprMON (liquid staking tokens)
- Conversion rate is currently 1:1 on testnet
- Staked tokens generate rewards over time

# Prompt Guide - Monad Unstaking

## Input Format

### JSON Request

```json
{
  "tool": "monad-unstaking",
  "parameters": {
    "privateKey": "0xYourPrivateKey",
    "amount": "0.2"
  }
}
```

### Natural Prompt Examples

```
I want to unstake 0.2 aprMON on Monad Testnet with my private key: 0x1234567890123456789012345678901234567890
```

```
Unstake 0.5 aprMON on Monad Testnet. My private key: 0x1234567890123456789012345678901234567890
```

## Output Format

```json
{
  "content": [
    {
      "type": "text",
      "text": "✅ 0.2 aprMON successfully unstaked from 0xYourWalletAddress\nTransaction: 0xTransactionHash\nBalance after: 0.2 MON"
    }
  ]
}
```

## Important Notes

- Private key must be valid and have sufficient aprMON balance
- Amount must be specified in aprMON (not in wei)
- Unstaking converts your aprMON to MON
- Conversion rate is currently 1:1 on testnet
- There is a 7-day cooldown period before unstaking
- Accumulated rewards are automatically claimed during unstaking

# Prompt Guide - Token Transfer

## Input Format

### JSON Request

```json
{
  "tool": "send-token",
  "parameters": {
    "privateKey": "0xYourPrivateKey",
    "toAddress": "0xRecipientAddress",
    "amount": "0.2",
    "tokenAddress": "0xTokenAddress" // Optional, defaults to native MON
  }
}
```

### Natural Prompt Examples

```
Send 0.2 MON to address 0x1234567890123456789012345678901234567890. My private key: 0xabcdef1234567890
```

```
Transfer 0.5 TCHOG tokens to 0x1234567890123456789012345678901234567890. My private key: 0xabcdef1234567890
```

```
I want to send 1.0 MON to 0x1234567890123456789012345678901234567890. My private key: 0xabcdef1234567890
```

## Output Format

```json
{
  "content": [
    {
      "type": "text",
      "text": "✅ 0.2 MON successfully sent to 0xRecipientAddress\nTransaction: 0xTransactionHash\nGas used: 21000"
    }
  ]
}
```

## Important Notes

- Private key must be valid and have sufficient balance
- Amount must be specified in full units (not in wei)
- For native MON transfers, tokenAddress can be omitted
- For ERC20 tokens, tokenAddress must be specified
- Gas limit is automatically calculated
- Transaction will fail if recipient address is invalid
- Supports both native MON and ERC20 token transfers
- Transaction can be viewed on Monad Explorer
