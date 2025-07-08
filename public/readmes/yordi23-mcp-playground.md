# MCP Server Guide for Cursor

## Introduction

The MCP server is designed to facilitate communication and operations within the Cursor environment. It allows for seamless integration and execution of tasks.

## Installation Requirements

Before you can use the MCP server, ensure you have the following installed:

- Python (version 3.7 or higher)
- MCP CLI

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory:
   ```bash
   cd /path/to/mcp-servers-playground
   ```
3. Install the necessary Python packages:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

To start the MCP server, use the following command:

```bash
mcp run C:\Users\user\project
```

## Usage

Once the server is running, you can interact with it through the MCP CLI or any compatible client. Ensure that your client is configured to communicate with the server.

### Cursor

Place this to you cursor `mcp.json` config:

```
{
  "mcpServers": {
    "greetings": {
      "command": "mcp run",
      "args": [
        "C:\Users\user\project"
      ]
    }
  }
}
```
