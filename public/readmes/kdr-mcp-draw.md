# MCP Draw

An MCP (Model Context Protocol) server for generating images from text prompts. This server allows AI assistants to create images / draw through a standardized interface.

<img width="1463" alt="image" src="https://github.com/user-attachments/assets/afbef817-91ab-4b31-a2bf-73cb0d0b6758" />


## 📖 Resources

- [Model Context Protocol](https://modelcontextprotocol.io/introduction)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)

## Prerequisites

- Node.js (v18 or higher)
- An OpenAI API key

## Setup

### 1. API Key

First, get an OpenAI API key from [OpenAI's platform](https://platform.openai.com/api-keys). This will be used to authenticate the MCP server with OpenAI's services.

### 2. Configure MCP Client for Local Development

```json
{
  "mcpServers": {
    "mcp-draw": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-draw@latest"
        "--api-key",
        "<REPLACE-WITH-YOUR-OPENAI-API-KEY>",
        "--output-dir",
        "/ABSOLUTE/PATH/TO/SAVE/OUTPUT_FOLDER"
      ]
    }
  }
}
```

## Local Development Setup

### 1. API Key

First, get an OpenAI API key from [OpenAI's platform](https://platform.openai.com/api-keys). This will be used to authenticate the MCP server with OpenAI's services.

### 2. Clone the Repository

```bash
git clone https://github.com/kdr/mcp-draw.git
cd mcp-draw
```

### 3. Install Dependencies & Build the Server

```bash
npm install
npm run build
```

### 4. Configure MCP Client for Local Development

```json
{
  "mcpServers": {
    "mcp-draw": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/mcp-draw/build/index.js",
        "--api-key",
        "<REPLACE-WITH-YOUR-OPENAI-API-KEY>",
        "--output-dir",
        "/ABSOLUTE/PATH/TO/SAVE/OUTPUT_FOLDER"
      ]
    }
  }
}
```

## Tools

The following tools are available to the LLM:

- `generate_image_from_description`: Creates an image from a text prompt using OpenAI's gpt-image-1 model
