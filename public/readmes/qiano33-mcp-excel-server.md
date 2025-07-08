# mcp-excel-server

Node.js server implementing Model Context Protocol (MCP) for excel file operations.

## Features

- Read files
- list directories
- Search files
- Read Excel

**Note**: The server will only allow operations within directories specified via `args`.

## 🔧 Install

### NPM Installation

```shell
npm install @qian33/mcp-excel-server
```

## 📚 API Reference

### Resources
- The primary mcp-excel-server operations interface `file://system`

### Tool Functions

#### 📖 Reading Operations

- **read_file_content**
  - Reads the complete contents of a file
  - Input: `path` (string)
  - Uses UTF-8 encoding for text files

#### 🎒Writing Operations

- **write_file_content**
  - Creates a new file or overwrites an existing one with the specified content
  - Inputs:
    - `path` (string): File location to write to
    - `content` (string): Content to write to the file
  - Uses UTF-8 encoding for text files
  - Returns confirmation message upon successful write

#### 📁 Directory Operations

- **list_directory**
  - Lists directory contents with type indicators
  - Input: `path` (string)
  - Returns entries with [FILE] or [DIR] prefixes

#### 🔍 Reading Excel and Information

- **get_excel_content**
  - Reads the Excel contents of a file
  - Input: `path` (string)
  - Uses UTF-8 encoding for excel file

- **get_online_excel_content**
  - Fetches and reads Excel content from a URL
  - Input: `path` (string): ONLINE URL to the Excel file
  - Returns the Excel data as a JSON array
  - Useful for reading Excel files hosted on remote servers

#### 📒 Writing Excel

- **write_excel_content**
  - Creates a new Excel file or overwrites an existing one with the specified data
  - Inputs:
    - `path` (string): File location for the Excel file
    - `content` (string or array): JSON data to write to the Excel file
      - Accepts either a JSON string or a direct array of objects
      - Each object represents a row in the Excel sheet
  - Automatically creates a workbook with a 'Sheet1' worksheet
  - Returns confirmation message upon successful write

## 🔧 Usage Guide

### Integration with Claude Desktop
Add the following configuration to your : `claude_desktop_config.json`

> Note: You can sandbox directories by mounting them to . Adding the `ro` flag makes directories read-only. `/projects`

#### NPX Method

```json
{
  "mcpServers": {
    "mcp-excel-server": {
      "command": "npx",
      "args": [
        "-y",
        "@qian33/mcp-excel-server",
        "/Users/username/Desktop",
        "/path/to/other/allowed/dir"
      ]
    }
  }
}
```

#### Bunx Method

```json
{
  "mcpServers": {
    "mcp-excel-server": {
      "command": "bunx",
      "args": [
        "@qian33/mcp-excel-server",
        "/Users/username/Desktop",
        "/path/to/other/allowed/dir"
      ]
    }
  }
}
```

## Usage with VS Code

For quick installation, click the installation buttons below...

[![Install with NPX in VS Code](https://img.shields.io/badge/VS_Code-NPM-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=mcp-excel-server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40qian33%2Fmcp-excel-server%22%2C%22%24%7BworkspaceFolder%7D%22%5D%7D) [![Install with NPX in VS Code Insiders](https://img.shields.io/badge/VS_Code_Insiders-NPM-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white)](https://insiders.vscode.dev/redirect/mcp/install?name=mcp-excel-server&config=%7B%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22%40qian33%2Fmcp-excel-server%22%2C%22%24%7BworkspaceFolder%7D%22%5D%7D&quality=insiders)

[//]: # ([![Install with Docker in VS Code]&#40;https://img.shields.io/badge/VS_Code-Docker-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white&#41;]&#40;https://insiders.vscode.dev/redirect/mcp/install?name=mcp-excel-server&config=%7B%22command%22%3A%22docker%22%2C%22args%22%3A%5B%22run%22%2C%22-i%22%2C%22--rm%22%2C%22--mount%22%2C%22type%3Dbind%2Csrc%3D%24%7BworkspaceFolder%7D%2Cdst%3D%2Fprojects%2Fworkspace%22%2C%22mcp%2Ffilesystem%22%2C%22%2Fprojects%22%5D%7D&#41; [![Install with Docker in VS Code Insiders]&#40;https://img.shields.io/badge/VS_Code_Insiders-Docker-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white&#41;]&#40;https://insiders.vscode.dev/redirect/mcp/install?name=filesystem&config=%7B%22command%22%3A%22docker%22%2C%22args%22%3A%5B%22run%22%2C%22-i%22%2C%22--rm%22%2C%22--mount%22%2C%22type%3Dbind%2Csrc%3D%24%7BworkspaceFolder%7D%2Cdst%3D%2Fprojects%2Fworkspace%22%2C%22mcp%2Ffilesystem%22%2C%22%2Fprojects%22%5D%7D&quality=insiders&#41;)

For manual installation, add the following JSON block to your User Settings (JSON) file in VS Code. You can do this by pressing `Ctrl + Shift + P` and typing `Preferences: Open Settings (JSON)`.

Optionally, you can add it to a file called `.vscode/mcp.json` in your workspace. This will allow you to share the configuration with others.

> Note that the `mcp` key is not needed in the `.vscode/mcp.json` file.

You can provide sandboxed directories to the server by mounting them to `/projects`. Adding the `ro` flag will make the directory readonly by the server.

### NPX

```json
{
  "mcp": {
    "servers": {
      "mcp-excel-server": {
        "command": "npx",
        "args": [
          "-y",
          "@qian33/mcp-excel-server",
          "${workspaceFolder}"
        ]
      }
    }
  }
}
```

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch
3. Implement your changes with tests
4. Submit a pull request

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## 📜 License
This MCP server is licensed under the MIT License. You are free to use, modify, and distribute the software, subject to the MIT License terms and conditions. See the LICENSE file in the repository for details.






