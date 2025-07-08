# Coreflux MQTT MCP Server

This is a Model Context Protocol (MCP) server that connects to a Coreflux MQTT broker and makes Coreflux and MQTT actions available as tools for Claude and other MCP-compatible AI assistants.

## Features

- Connects to Coreflux MQTT broker 
- Provides tools for all Coreflux commands (models, actions, rules, routes)
- Discovers and lists available actions
- Includes LOT language documentation as resources
- Built with the official MCP SDK for seamless Claude integration
- Standalone setup assistant for configuration

## Setup Assistant

The server includes a standalone setup assistant that can be run separately from the main server. Run the setup assistant when:

- You need to create an initial configuration (.env file)
- You want to update your existing configuration
- You're experiencing connection issues and need to reconfigure

To run the setup assistant:

```bash
python setup_assistant.py
```

The setup assistant helps you:

- Create or update the `.env` file with your configuration
- Configure MQTT broker settings (host, port, credentials)
- Set up TLS configuration if needed
- Configure logging options

After configuration is complete, you can run the server normally.

## Connecting Claude to the MCP Server

### Using Claude Desktop Config

1. Create or edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS/Linux) or `%USERPROFILE%\AppData\Roaming\Claude\claude_desktop_config.json` (Windows)
2. Add the following configuration (adjust the paths accordingly):
   ```json
   {
     "mcpServers": {
       "coreflux": {
         "command": "python",
         "args": [
           "/PATH/TO/server.py",
           "--mqtt-host", "localhost", 
           "--mqtt-port", "1883",
           "--mqtt-user", "root",
           "--mqtt-password", "coreflux",
           "--mqtt-client-id", "claude-coreflux-client"
         ],
         "description": "Coreflux MQTT Broker Control",
         "icon": "🔄",
         "env": {}
       }
     }
   }
   ```
3. Restart Claude Desktop

### Command-Line Arguments

The server accepts the following command-line arguments. These settings can also be configured via the `.env` file using the setup assistant:

| Argument | Description | Default |
|----------|-------------|---------|
| `--mqtt-host` | MQTT broker address | localhost |
| `--mqtt-port` | MQTT broker port | 1883 |
| `--mqtt-user` | MQTT username | - |
| `--mqtt-password` | MQTT password | - |
| `--mqtt-client-id` | MQTT client ID | claude-mcp-client |
| `--mqtt-use-tls` | Enable TLS for MQTT connection | false |
| `--mqtt-ca-cert` | Path to CA certificate file | - |
| `--mqtt-client-cert` | Path to client certificate file | - |
| `--mqtt-client-key` | Path to client key file | - |
| `--log-level` | Logging level (DEBUG/INFO/WARNING/ERROR/CRITICAL) | INFO |

## Available Tools

The server provides tools for common Coreflux commands:

- `add_rule`: Add a new permission rule
- `remove_rule`: Remove a permission rule
- `add_route`: Add a new route connection
- `remove_route`: Remove a route connection
- `add_model`: Add a new model structure
- `remove_model`: Remove a model structure
- `add_action`: Add a new action event/function
- `remove_action`: Remove an action event/function
- `run_action`: Run an action event/function
- `remove_all_models`: Remove all models
- `remove_all_actions`: Remove all actions
- `remove_all_routes`: Remove all routes
- `list_discovered_actions`: List all discovered Coreflux actions
- `request_lot_code`: Generate LOT code based on natural language prompts

## Debugging and Troubleshooting

If you encounter issues:

1. Verify your MQTT broker credentials in your Claude configuration
2. Ensure the broker is accessible 
3. Run the setup assistant to verify or update your configuration:
   ```bash
   python setup_assistant.py
   ```
4. Check Claude Desktop logs:
   ```bash
   # Check Claude's logs for errors (macOS/Linux)
   tail -n 20 -f ~/Library/Logs/Claude/mcp*.log
   # Windows PowerShell
   Get-Content -Path "$env:USERPROFILE\AppData\Roaming\Claude\Logs\mcp*.log" -Tail 20 -Wait
   ```
5. Run the server with debug logging:
   ```bash
   # Direct execution with debug logging
   python server.py --mqtt-host localhost --mqtt-port 1883 --log-level DEBUG
   ```

## References

- [MCP Quickstart for Server Developers](https://modelcontextprotocol.io/quickstart/server)
- [MCP Official Documentation](https://modelcontextprotocol.io/)
