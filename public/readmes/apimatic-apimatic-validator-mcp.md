# APIMatic Validator MCP Server

This repository provides a Model Context Protocol (MCP) Server for validating OpenAPI specifications using [APIMatic](https://www.apimatic.io/). The server processes OpenAPI files and returns validation summaries by leveraging APIMatic’s API.

## Features

- Validates OpenAPI 2.0 and 3.0 files
- Uses APIMatic’s API for comprehensive validation
- Supports both JSON and YAML formats
- Implements Model Context Protocol (MCP) for seamless integration

## Installation

Ensure that **Node.js v18+** is installed.

### Clone the Repository
```sh
git clone https://github.com/apimatic/apimatic-validator-mcp.git
cd apimatic-validator-mcp
```

### Install Dependencies
```sh
npm install
```

### Build the Project
```sh
npm run build
```

## Configuration

To use the server, an APIMatic API key is required. Sign up at [APIMatic](https://www.apimatic.io/) and obtain the API key.


![image](https://github.com/user-attachments/assets/1e2388dd-1330-4dab-a6e0-c6738a494ab9)


### Integration with Claude Desktop

Modify the `claude_desktop_config.json` file to integrate the MCP server. If the file does not exist, create one in the following location:

#### Windows
```sh
code $env:AppData\Claude\claude_desktop_config.json
```

#### macOS/Linux
```sh
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Add the MCP Server to the Configuration
```json
{
    "mcpServers": {
        "APIMatic": {
            "command": "node",
            "args": [
                "C:\\PATH\\TO\\PARENT\\FOLDER\\build\\index.js"
            ],
            "env": {
                "APIMATIC_API_KEY": "<Add your APIMatic token here>"
            }
        }
    }
}
```

Once configured, a hammer icon should appear in Claude Desktop. Open it to verify that the `validate-openapi-using-apimatic` tool is successfully integrated.

## Usage

1. Add an OpenAPI file.
2. Provide a prompt to validate it.
3. The validation results will be returned.

[APIMatic MCP Server For OpenAPI Validation.webm](https://github.com/user-attachments/assets/b7d14e20-1c82-4a70-b237-7e5b6bd80993)


