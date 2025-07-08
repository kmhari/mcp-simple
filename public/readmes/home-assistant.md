# <img src="./img/ha.png" height="30" style="border-radius: 250%; margin: 0 5px;"> 🤝 <img src="./img/mcp.png" height="30" style="border-radius: 20%; margin: 0 5px;"> Home Assistant MCP Server

A Model Context Protocol (MCP) server project that integrates with Home Assistant to provide smart home control capabilities.

### Prompts

The server provides prompts for each domain's set of tools. 

### Tools

The server implements control for various Home Assistant domains. Currently supports:
- 💡 Lights: Turn on/off, brightness control
- 🌡️ Climate: Temperature control, HVAC modes
- 🔒 Locks: Lock/unlock functionality  
- 🚨 Alarm Control Panel: Arm/disarm security systems
- 💧 Humidifier: Humidity control


Example  tools include:

```
light-turn_on()
climate-turn_off()
alarm_control_panel-disarm()
lock-lock()
humidifier-turn_off()
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with:

```
HOMEASSISTANT_TOKEN=your_long_lived_access_token_here # get it from your Home Assistant instance after onboarding
HOMEASSISTANT_BASE_URL=your_home_assistant_url_here # e.g. http://homeassistant.local:8123
```

## Quickstart

### Install

Follow the instructions on how to install Home Assistant and get a long lived access token.
- [Home Assistant Getting Started](https://www.home-assistant.io/getting-started/)

#### Claude Desktop

On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

<details>
  <summary>Development/Unpublished Servers Configuration</summary>
  ```
  "mcpServers": {
    "home-assistant-server": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/home-assistant-server",
        "run",
        "home-assistant-server"
      ]
    }
  }
  ```
</details>

<details>
  <summary>Published Servers Configuration</summary>
  ```
  "mcpServers": {
    "home-assistant-server": {
      "command": "uvx",
      "args": [
        "home-assistant-server"
      ]
    }
  }
  ```
</details>

## Development

### Building and Publishing

To prepare the package for distribution:

1. Sync dependencies and update lockfile:
```bash
uv sync
```

2. Build package distributions:
```bash
uv build
```

This will create source and wheel distributions in the `dist/` directory.

3. Publish to PyPI:
```bash
uv publish
```

Note: You'll need to set PyPI credentials via environment variables or command flags:
- Token: `--token` or `UV_PUBLISH_TOKEN`
- Or username/password: `--username`/`UV_PUBLISH_USERNAME` and `--password`/`UV_PUBLISH_PASSWORD`

### Debugging

Since MCP servers run over stdio, debugging can be challenging. For the best debugging
experience, we strongly recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).


You can launch the MCP Inspector via [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) with this command:

```bash
npx @modelcontextprotocol/inspector uv --directory /Users/miguel/Documents/home-assistant-server/home-assistant-server run home-assistant-server
```


Upon launching, the Inspector will display a URL that you can access in your browser to begin debugging.


## Contributing

Thanks for your interest in contributing to this project! 

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. 

## License

MIT License - see [LICENSE](LICENSE) for details.
