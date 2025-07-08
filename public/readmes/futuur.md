# Futuur API MCP Integration

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

[![smithery badge](https://smithery.ai/badge/@futuur/futuur-mcp)](https://smithery.ai/server/@futuur/futuur-mcp)

</div>

## Overview

Futuur API MCP Integration is a powerful TypeScript-based server that implements the Model Context Protocol (MCP) for seamless integration with the Futuur API. This project provides a robust interface for handling market data, categories, user information, and betting operations.

## Features

- 🔄 Real-time market data integration
- 📊 Category management
- 👤 User profile handling
- 🎲 Betting operations
- 📚 Comprehensive documentation resources
- 🛠️ Modular tool architecture

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Installation

### Prerequisites

1. Install Node.js (LTS version) from [nodejs.org](https://nodejs.org/)
2. Install one of the following:
   - [Cursor Editor](https://cursor.sh/)
   - [Claude Desktop](https://claude.ai/desktop)

### Installation Steps

1. Open your terminal and run one of the following commands based on your editor:

For Claude Desktop:
```bash
npx -y @smithery/cli install @futuur/futuur-mcp --client claude
```

For Cursor:
```bash
npx -y @smithery/cli install @futuur/futuur-mcp --client cursor
```

### Manual Installation

If you prefer to install manually:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/futuur-api-mcp.git
cd futuur-api-mcp
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
futuur-api-mcp/
├── src/
│   ├── tools/          # Tool implementations
│   ├── utils/          # Utility functions
│   └── index.ts        # Main server entry point
├── build/              # Compiled JavaScript output
├── package.json        # Project dependencies
├── package-lock.json   # Dependency lock file
├── tsconfig.json       # TypeScript configuration
└── .env               # Environment variables
```

## Core Components

- **Market Tools**: Handle market-related operations
- **Category Tools**: Manage category data and operations
- **User Tools**: Handle user-related functionality
- **Bet Tools**: Process betting operations 

## Development

The project uses TypeScript for type safety and better development experience. The server implements the Model Context Protocol (MCP) using the official SDK.

### Debug Mode

The server includes a debug mode that can be toggled by setting the `DEBUG` constant in `index.ts`. When enabled, it provides detailed logging information.

## Dependencies

- `@modelcontextprotocol/sdk`: Core MCP implementation
- `zod`: Runtime type checking and validation

## Integration

To integrate the MCP server with Cursor, follow these steps:

1. Build the project:
```bash
npm run build
```

2. Run the MCP server using Cursor:

**Windows**:
```bash
cmd /c npx mcprunner FUTUUR_PUBLIC_KEY=*YOUR_FUTUUR_PUBLIC_KEY* FUTUUR_PRIVATE_KEY=*YOUR_FUTUUR_PRIVATE_KEY* -- node C:/webapps/futuur-api-mcp/build/index.js
```

**macOS/Linux**:
```bash
npx mcprunner FUTUUR_PUBLIC_KEY=*YOUR_FUTUUR_PUBLIC_KEY* FUTUUR_PRIVATE_KEY=*YOUR_FUTUUR_PRIVATE_KEY* -- node C:/webapps/futuur-api-mcp/build/index.js
```

Make sure to replace `*YOUR_FUTUUR_PUBLIC_KEY*` and `*YOUR_FUTUUR_PRIVATE_KEY*` with your actual Futuur API credentials.

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

<div align="center">
Made with ❤️ by the Futuur Team
</div> 