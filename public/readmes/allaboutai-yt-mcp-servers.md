# MCP Servers - OpenAI and Flux Integration

This repository contains MCP (Model Context Protocol) servers for integrating with OpenAI's o1 model and Flux capabilities.

## Server Configurations

### OpenAI o1 MCP Server

The o1 server enables interaction with OpenAI's o1 preview model through the MCP protocol.

```json
{
  "mcpServers": {
    "openai": {
      "command": "openai-server",
      "env": {
        "OPENAI_API_KEY": "apikey"
      }
    }
  }
}

```

Key features:
- Direct access to o1-preview model
- Streaming support
- Temperature and top_p parameter control
- System message configuration

### Flux MCP Server

The Flux server provides integration with Flux capabilities through MCP.

```json
{
  "mcpServers": {
    "flux": {
      "command": "flux-server",
      "env": {
        "REPLICATE_API_TOKEN": "your-replicate-token"
      }
    }
  }
}
```

Key features:
- SOTA Image Model

## Usage

1. Clone or Fork Server
```bash
git clone https://github.com/AllAboutAI-YT/mcp-servers.git
```

2. Set up environment variables in your .env file:
```env
FLUX_API_KEY=your_flux_key_here
```

3. Start the servers using the configurations above.

## Security

- Store API keys securely
- Use environment variables for sensitive data
- Follow security best practices in SECURITY.md

## License

MIT License - See LICENSE file for details.
