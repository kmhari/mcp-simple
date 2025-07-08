# Flux Image MCP Server

This MCP server provides image generation capabilities using the Flux Schnell model on Replicate.

## Installation

0. Install the MCP SDK globally:
```bash
npm install -g @modelcontextprotocol/sdk@latest
```

1. Clone this repository to your MCP servers directory:
```bash
cd ~/Documents/Cline/MCP
git clone https://github.com/yourusername/flux-img-mcp.git
cd flux-img-mcp
npm install
```



2. Build the server:
```bash
npm run build
```

3. Add the server configuration to your MCP settings file (either global or workspace):

```json
{
  "mcpServers": {
    "flux-img": {
      "command": "node",
      "args": ["/path/to/flux-img-mcp/build/index.js"],
      "env": {
        "REPLICATE_API_TOKEN": "your-replicate-api-token"
      },
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

## Configuration

The server requires the following environment variable:

- `REPLICATE_API_TOKEN`: Your Replicate API token. You can get this from your [Replicate account settings](https://replicate.com/account).

## Usage

Once installed and configured, the server provides the following tool:

### generate_image

Generates an image using the Flux Schnell model based on a text prompt.

Parameters:
- `prompt` (string, required): Text description of the desired image

Example usage:
```typescript
<use_mcp_tool>
<server_name>flux-img</server_name>
<tool_name>generate_image</tool_name>
<arguments>
{
  "prompt": "A beautiful sunset over mountains"
}
</arguments>
</use_mcp_tool>
```

The tool will return a JSON response containing:
- `status`: The status of the generation request
- `output`: The URL of the generated image (if successful)
- `error`: Any error message (if failed)

## Development

To make changes to the server:

1. Modify the source code in `src/index.ts`
2. Rebuild the server: `npm run build`
3. Restart the MCP server for changes to take effect

## Error Handling

The server includes comprehensive error handling for:
- Missing API token
- Invalid parameters
- API request failures
- Network issues

## Security

- Never commit your Replicate API token to version control
- Always provide the token through environment variables
- The server validates all input parameters before making API requests
