# SVGL MCP Server

An MCP server implementation that processes SVG content using SVGL (Scalable Vector Graphics Language), providing validation and repository access capabilities.

[SVGL API](https://svgl.app/api)

## Features

- **SVG Validation**: Validate SVG content against SVGL specifications
- **SVG Repository Access**: Browse and retrieve SVGs from the SVGL repository
- **Detailed Error Reporting**: Get line-by-line validation feedback
- **Base64 Encoding**: Get SVGs encoded in base64 format for easy embedding

## Tools

- **svgl_validate**

  - Validate SVG content against SVGL specifications
  - Inputs:
    - `svgContent` (string): SVG content to validate
  - Returns detailed validation results including line numbers and error messages

- **svgl_list**

  - List all SVGs in the repository with their metadata
  - Returns an array of SVG items with:
    - `id`: Unique identifier
    - `title`: SVG title
    - `category`: SVG category
    - `route`: SVG route (string or object with light/dark variants)
    - `url`: SVG URL

- **svgl_get**
  - Retrieve a specific SVG by name
  - Inputs:
    - `name` (string): The name of the SVG to retrieve
  - Returns the SVG content in base64 format if valid

## Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

### Docker

```json
{
  "mcpServers": {
    "svgl": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "mcp/svgl"]
    }
  }
}
```

### NPX

```json
{
  "mcpServers": {
    "svgl": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-svgl"]
    }
  }
}
```

## Usage with VS Code

For quick installation, use the one-click installation buttons below...

[![Install with NPX in VS Code](https://img.shields.io/badge/VS_Code-NPM-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=svgl&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40modelcontextprotocol%2Fserver-svgl%22%5D%7D) [![Install with NPX in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-NPM-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=svgl&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40modelcontextprotocol%2Fserver-svgl%22%5D%7D&quality=insiders)

[![Install with Docker in VS Code](https://img.shields.io/badge/VS_Code-Docker-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=svgl&config=%7B%22command%22%3A%22docker%22%2C%22args%22%3A%5B%22run%22%2C%22-i%22%2C%22--rm%22%2C%22mcp%2Fsvgl%22%5D%7D) [![Install with Docker in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-Docker-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=svgl&config=%7B%22command%22%3A%22docker%22%2C%22args%22%3A%5B%22run%22%2C%22-i%22%2C%22--rm%22%2C%22mcp%2Fsvgl%22%5D%7D&quality=insiders)

For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open User Settings (JSON)`.

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others.

> Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

#### Docker

```json
{
  "mcp": {
    "servers": {
      "svgl": {
        "command": "docker",
        "args": ["run", "-i", "--rm", "mcp/svgl"]
      }
    }
  }
}
```

#### NPX

```json
{
  "mcp": {
    "servers": {
      "svgl": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-svgl"]
      }
    }
  }
}
```

## Build

Docker build:

```bash
docker build -t mcp/svgl:latest -f src/svgl/Dockerfile .
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
