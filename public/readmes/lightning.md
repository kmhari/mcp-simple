# 🌐 Lightning Network MCP Server

A Model Context Protocol (MCP) server that enables AI models to interact with Lightning Network, allowing them to pay invoices.

[![smithery badge](https://smithery.ai/badge/@AbdelStark/lightning-mcp)](https://smithery.ai/server/@AbdelStark/lightning-mcp)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Protocol-blue?style=flat-square)](https://github.com/modelcontextprotocol/typescript-sdk)
[![Lightning Network](https://img.shields.io/badge/Lightning-Network-orange?style=flat-square)](https://lightning.network/)

## 🚀 Features

- 📝 Pay invoices on Lightning Network
- 🤖 MCP-compliant API for AI integration

## 👷‍♂️ TODOs

- [ ] Add support for multiple Lightning Network backends
- [ ] Implement stdin transport mode (configurable via environment variable)

## 📋 Prerequisites

- Node.js 18+

## 🛠️ Installation

### Installing via Smithery

To install Lightning Network MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@AbdelStark/lightning-mcp):

```bash
npx -y @smithery/cli install @AbdelStark/lightning-mcp --client claude
```

### Manual Installation

1. Clone the repository:

```bash
git clone https://github.com/AbdelStark/lightning-mcp
cd lightning-mcp
```

1. Install dependencies:

```bash
npm install
```

1. Create a `.env` file:

> 💡 You can copy the `.env.example` file and modify it as needed.

```env
# Bitcoin Lightning Network
## lnbits information
BITCOIN_LNBITS_NODE_URL="https://demo.lnbits.com"
BITCOIN_LNBITS_ADMIN_KEY="..."
BITCOIN_LNBITS_READ_KEY="..."
```

## 🚦 Usage

### Starting the Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

### Available Tools

#### `pay_invoice`

Pays an invoice on the Lightning Network.

Example input:

```json
{
  "content": "lnbc20n1pneh8papp5x0syxmdqffcltfk8mqp00qc6j4kf5elkmr5pws9gm242mw9n0ejsdqqcqzzsxqyz5vqrzjqvueefmrckfdwyyu39m0lf24sqzcr9vcrmxrvgfn6empxz7phrjxvrttncqq0lcqqyqqqqlgqqqqqqgq2qsp563lg29qthfwgynluv7fvaq5d6y2hfdl383elgc6q68lccfzvpvfs9qxpqysgq2n6yhvs8aeugvrkcx8yjzdrqqmvp237500gxkrk0fe6d6crwpvlp96uvq9z2dfeetv5n23xpjlavgf0fgy4ch980mpv2rcsjasg2hqqpalykyc"
}
```

## 🔧 Development

### Project Structure

```text
lightning-mcp/
├── src/
│   ├── index.ts        # Main server entry point
│   ├── lnbits-client.ts # Lightning Network client implementation
│   └── types.ts        # TypeScript type definitions
├── .env               # Environment configuration
└── tsconfig.json     # TypeScript configuration
```

### Running Tests

```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Lnbits repository](https://github.com/lnbits/lnbits)
- [Lnbits demo](https://demo.lnbits.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [Visual testing tool for MCP servers](https://github.com/modelcontextprotocol/inspector)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)
- [Awesome MCP Clients](https://github.com/punkpeye/awesome-mcp-clients)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## 📬 Contact

Feel free to follow me if you’d like, using my public key:

```text
npub1hr6v96g0phtxwys4x0tm3khawuuykz6s28uzwtj5j0zc7lunu99snw2e29
```

Or just **scan this QR code** to find me:

![Nostr Public Key QR Code](https://hackmd.io/_uploads/SkAvwlYYC.png)

---

<p align="center">
  Made with ❤️ for the Bitcoin community
</p>
