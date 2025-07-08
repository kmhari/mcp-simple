# Draw Things MCP

Draw Things API integration for Cursor using Model Context Protocol (MCP).

## Prerequisites

- Node.js >= 14.0.0
- Draw Things API running on http://127.0.0.1:7888

## Installation

```bash
# Install globally
npm install -g draw-things-mcp-cursor

# Or run directly
npx draw-things-mcp-cursor
```

## Cursor Integration

To set up this tool in Cursor, see the detailed guide in [cursor-setup.md](./cursor-setup.md).

Quick setup:

1. Create or edit `~/.cursor/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "draw-things": {
      "command": "draw-things-mcp-cursor",
      "args": []
    }
  }
}
```

2. Restart Cursor
3. Use in Cursor: `generateImage({"prompt": "a cute cat"})`

## CLI Usage

### Generate Image

```bash
echo '{"prompt": "your prompt here"}' | npx draw-things-mcp-cursor
```

### Parameters

- `prompt`: The text prompt for image generation (required)
- `negative_prompt`: The negative prompt for image generation
- `width`: Image width (default: 360)
- `height`: Image height (default: 360)
- `steps`: Number of steps for generation (default: 8)
- `model`: Model to use for generation (default: "flux_1_schnell_q5p.ckpt")
- `sampler`: Sampling method (default: "DPM++ 2M AYS")

Example:

```bash
echo '{
  "prompt": "a happy smiling dog, professional photography",
  "negative_prompt": "ugly, deformed, blurry",
  "width": 360,
  "height": 360,
  "steps": 4
}' | npx draw-things-mcp-cursor
```

### MCP Tool Integration

When used as an MCP tool in Cursor, the tool will be registered as `generateImage` with the following parameters:

```typescript
{
  prompt: string;       // Required - The prompt to generate the image from
  negative_prompt?: string;  // Optional - The negative prompt
  width?: number;       // Optional - Image width (default: 360)
  height?: number;      // Optional - Image height (default: 360)
  model?: string;       // Optional - Model name
  steps?: number;       // Optional - Number of steps (default: 8)
}
```

The generated images will be saved in the `images` directory with a filename format of:
`<sanitized_prompt>_<timestamp>.png`

## Response Format

Success:
```json
{
  "type": "success",
  "content": [{
    "type": "image",
    "data": "base64 encoded image data",
    "mimeType": "image/png"
  }],
  "metadata": {
    "parameters": { ... }
  }
}
```

Error:
```json
{
  "type": "error",
  "error": "error message",
  "code": 500
}
```

## Troubleshooting

If you encounter issues:

- Ensure Draw Things API is running at http://127.0.0.1:7888
- Check log files in `~/.cursor/logs` if using with Cursor
- Make sure src/index.js has execution permissions: `chmod +x src/index.js`

## License

MIT 