# MCP Servers

A collection of Model Context Protocol (MCP) servers that extend AI model capabilities with various tools and resources.

## Overview

This project implements several MCP servers that provide additional functionality to AI models through the Model Context Protocol. The servers are built using Deno and TypeScript, with a focus on type safety and functional programming principles.

## Tool Sets

The project includes the following tool sets:

### 1. Text Processing Tools

Tools for manipulating and transforming text:

- `convertCase`: Convert text case (upper, lower, title, camel, snake, kebab)
- `trimText`: Trim whitespace or specific characters from text
- `searchReplace`: Search and replace text with support for regex
- `splitText`: Split text into parts based on a delimiter
- `joinText`: Join text parts with a delimiter
- `encodeDecode`: Encode/decode text (base64, URL, HTML)

### 2. Data Conversion Tools

Tools for converting between different data formats:

- `convertJsonYaml`: Convert between JSON and YAML
- `convertCsvJson`: Convert between CSV and JSON
- `convertXmlJson`: Convert between XML and JSON
- `convertUnit`: Convert between different units (temperature, length, weight)
- `convertDateFormat`: Convert between different date formats
- `convertBase64`: Encode/decode Base64

### 3. API Integration Tools

Tools for interacting with external APIs and services:

- `executeHttpRequest`: Execute HTTP requests (GET, POST, PUT, DELETE)
- `getWeatherInfo`: Get weather information for a location
- `translateText`: Translate text between languages
- `getGeocoding`: Get geographic information for a location
- `getNews`: Get news articles

### 4. Development Tools

Utility tools for development:

- `getStringLength`: Get the length of a string
- `formatJson`: Format JSON data
- `generateUuid`: Generate a UUID
- `findFiles`: Find files matching a pattern

## Getting Started

### Prerequisites

- Deno 1.40.0 or higher
- VSCode with Deno extension (recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mcp-servers
   ```

2. Install dependencies:
   ```bash
   deno cache server.ts
   ```

### Running the Server

Run the server with the following command:

```bash
deno run -A server.ts
```

This will start the MCP server with all tool sets integrated.

## Project Structure

```
mcp-servers/
├── server.ts                  # Main entry point
├── tools/                     # Tool sets
│   ├── dev-tools/             # Development tools
│   │   ├── deps.ts            # Dependencies
│   │   ├── lib.ts             # Implementation
│   │   ├── mod.ts             # Module entry point
│   │   ├── mod.test.ts        # Tests
│   │   └── types.ts           # Type definitions
│   ├── text-tools/            # Text processing tools
│   │   ├── deps.ts
│   │   ├── lib.ts
│   │   ├── mod.ts
│   │   └── types.ts
│   ├── data-conversion-tools/ # Data conversion tools
│   │   ├── deps.ts
│   │   ├── lib.ts
│   │   ├── mod.ts
│   │   └── types.ts
│   └── api-integration-tools/ # API integration tools
│       ├── deps.ts
│       ├── lib.ts
│       ├── mod.ts
│       └── types.ts
└── memory-bank/               # Project documentation
```

## Development

### Module Structure

Each tool set follows a modular structure:

- `mod.ts`: Module entry point (re-exports)
- `deps.ts`: Dependencies
- `lib.ts`: Implementation
- `types.ts`: Type definitions
- `mod.test.ts`: Tests

### Adding New Tools

To add a new tool:

1. Define the tool's input and output types in the appropriate `types.ts` file
2. Implement the tool in the corresponding `lib.ts` file
3. Export the tool in the `mod.ts` file
4. Register the tool in the main `server.ts` file

## License

[MIT License](LICENSE)

## Acknowledgements

- [Deno](https://deno.land/)
- [Effect](https://effect.website/)
- [Zod](https://zod.dev/)
- [Model Context Protocol](https://github.com/model-context-protocol/mcp)