# GibWork MCP Server

A Model Context Protocol (MCP) server implementation for interacting with the GibWork platform. This server provides tools for managing tasks on the GibWork platform through an MCP.

## Features

- **Task Management**: Create, retrieve, and search tasks on the GibWork platform
- **MCP Protocol**: Implements the Model Context Protocol for standardized tool interactions

## Prerequisites

- Node.js (latest LTS version recommended)
- pnpm package manager (version 10.5.2 or higher)
- Solana private key (for task creation)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gibwork-mcp
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory and add your Solana private key:
```
SOLANA_PRIVATE_KEY=your_private_key_here
```

4. Configure Claude Desktop:
   - Open Claude Desktop settings
   - Navigate to Developer settings
   - Edit the configuration file at:
     - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
     - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Add the following configuration:
   ```json
   {
     "mcpServers": {
       "gibwork": {
         "command": "C:\\Program Files\\nodejs\\node",
         "args": ["C:\\path\\to\\gibwork-mcp\\dist\\index.js"]
       }
     }
   }
   ```
   Note: Adjust the paths according to your system configuration.

For more detailed information about MCP configuration, visit [Model Context Protocol Quickstart Guide](https://modelcontextprotocol.io/quickstart/user).

## Project Structure

```
gibwork-mcp/
├── src/
│   ├── index.ts      # Main server implementation
│   └── utils.ts      # Utility functions for API interactions
├── dist/             # Compiled JavaScript output
├── package.json      # Project dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

## Available Tools

The server implements the following MCP tools:

1. **get-tasks-by-id**
   - Fetches a specific task by its ID
   - Parameters: `id` (string)

2. **get-tasks**
   - Retrieves tasks with pagination and filtering
   - Parameters:
     - `page` (number, default: 1)
     - `limit` (number, default: 15)
     - `pageAll` (boolean, default: false)
     - `search` (string, default: '')
     - `orderBy` (string, default: '')
     - `tags` (string[], default: [])

3. **create-task**
   - Creates a new task on the GibWork platform
   - Parameters:
     - `title` (string)
     - `content` (string)
     - `requirements` (string)
     - `tags` (string[])
     - `payer` (string)
     - `token` (object)

## Development

1. Build the project:
```bash
pnpm build
```

2. Run the development server:
```bash
pnpm dev
```

## Configuration

The server is configured to run with the following settings:
- API Base URL: `https://api2.gib.work`
- Module System: ES Modules
- Target: ES2022
- Strict Type Checking: Enabled

## Security

- The `.env` file containing sensitive information is excluded from version control
- Solana private key should be kept secure and never committed to the repository

## License

ISC License
