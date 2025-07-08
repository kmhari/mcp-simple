# MCP Server of MCP Bone

## What's MCP Bone?

MCP Bone is a online service that provides a set of tools for MCP. [Home Page](https://store.tangshuang.net?scope=mcp-bone)
On MCP Bone, you can register other MCP Servers, get function calling tools JSON or XML-style prompt text and later call tools easily. [Read Usage](https://store.tangshuang.net/wiki/mcp-bone?scope=mcp-bone)

This package is a Node.js module that provides a MCP Server connect to MCP Bone. You can use it to connect to MCP Bone and get the tools JSON.

Also, you can use this package as a parser SDK to parse completion text to tool_calls.

## Setup

### Access Token

Get an Access Token:
1. go to https://store.tangshuang.net?scope=mcp-bone
2. register an account and log in
3. go to https://store.tangshuang.net/product/58/entry?scope=mcp-bone to create a new App
4. go to the App's `Certificate` menu page to create a new certificate
5. copy the `Access Token`

### NPX

```
{
    "mcpServers": {
        "mcp-bone": {
            "command": "npx",
            "args": [
                "-y",
                "mcp-bone"
            ],
            "env": {
                "MCP_BONE_ACCESS_TOKEN": ""
            }
        }
    }
}
```

### Parser

```js
import {
    extractAndParseToolsToJson,
    extractAndParseToolsXmlToJson,
    extractAndParseToolsTextToJson,
} from 'mcp-bone';

const tools = extractAndParseToolsTextToJson(text);
const tools = extractAndParseToolsXmlToJson(text);
const tools = extractAndParseToolsToJson(text);
```

These tools are used after LLM completions whic does not support function calling to parse the text into tools JSON. If the result is an empty array, it means that the LLM did not generate any tools.
