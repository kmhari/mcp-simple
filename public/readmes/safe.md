# Safe MCP Server

An MCP (Model Context Protocol) server implementation for interacting with Safe (formerly Gnosis Safe) smart contract wallets.

## Features

- Query Safe transactions for any Safe address
- Get multisig transaction details
- Decode transaction data
- Safe API integration

## Installation

```bash
npm install
```

## Usage

```bash
npm run build
npm start
```

No configuration is required - the server uses the Safe Transaction API mainnet endpoint by default.

## Available Tools

### getSafeTransactions

Get all transactions for any Safe address. The Safe address is determined by the LLM at runtime based on the context of the conversation.

```typescript
// Example tool call
getSafeTransactions({
  address: "0x123...", // Safe address determined by LLM
  limit: 100, // optional
  offset: 0, // optional
});
```

### getMultisigTransaction

Get details of a specific multisig transaction.

```typescript
getMultisigTransaction({
  safeTxHash: "0x456...", // Transaction hash to query
});
```

### decodeTransactionData

Decode transaction data using Safe API.

```typescript
decodeTransactionData({
  data: "0x789...", // Transaction data to decode
  to: "0xabc...", // Optional contract address
});
```

## Configuration (Optional)

By default, the server uses the Safe Transaction API mainnet endpoint:

```
https://safe-transaction-mainnet.safe.global/api/v1
```

If you need to use a different endpoint (e.g., for testnet), you can set it via environment variable:

```bash
SAFE_API_URL=https://safe-transaction-goerli.safe.global/api/v1 npm start
```

## Development

```bash
npm run dev
```

## License

MIT
