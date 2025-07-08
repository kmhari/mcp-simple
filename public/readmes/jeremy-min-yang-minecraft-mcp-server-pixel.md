# MinecraftBuildMCP

![Minecraft MCP Server](https://img.shields.io/badge/Minecraft-MCP%20Server-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v16+-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

MinecraftBuildMCP is a Model Context Protocol (MCP) server that enables Claude (or other compatible LLMs) to control a Minecraft bot using the Mineflayer API. This project bridges the gap between AI language models and Minecraft, allowing you to automate building, exploration, and interaction with the Minecraft world through natural language.

## 🌟 Features

- **AI-Powered Bot Control**: Interface directly with Claude Desktop to control Minecraft
- **Pixel Art Creation**: Build complex pixel art designs automatically
- **Navigation**: Move around the Minecraft world with ease
- **Block Placement**: Place blocks precisely at specified coordinates
- **Entity Detection**: Find entities and interact with the environment
- **In-Game Chat**: Send and receive chat messages
- **Creative Mode Support**: Special features for creative mode including teleportation and inventory manipulation

## 📋 Prerequisites

- Node.js v16 or higher
- Minecraft Java Edition (tested on version 1.21.4)
- Claude Desktop (or any compatible MCP client)

## 🔧 Installation

1. **Clone the repository and install dependencies:**
   ```sh
   git clone https://github.com/Jeremy-Min-Yang/minecraft-mcp-server-pixel.git
   cd minecraft-mcp-server-pixel
   npm install
   ```

2. **Build the project:**
   ```sh
   npm run build
   ```

## 🚀 Running the Bot

1. **Start Minecraft and open a world to LAN:**
   - Launch Minecraft 1.21.4
   - Create a new world or open an existing one
   - For best results, use Creative Mode
   - Press Esc, click "Open to LAN"
   - Enable cheats and set the game mode
   - Click "Start LAN World" and note the port number

2. **Run the bot locally:**
   ```sh
   node dist/bot.js --host localhost --port 25565 --username Bob_the_Builder
   ```

   Or, run directly from GitHub using npx:
   ```sh
   npx -y github:Jeremy-Min-Yang/minecraft-mcp-server-pixel --host localhost --port 25565 --username Bob_the_Builder
   ```

3. **Command Line Options:**
   - `--host`: Minecraft server hostname (default: localhost)
   - `--port`: Minecraft server port (default: 25565)
   - `--username`: Bot's username (default: Bob_the_Builder)

## 🔌 Claude Desktop Integration

Add this to your `claude_desktop_config.json` to enable the Minecraft MCP server:

```json
{
  "mcpServers": {
    "minecraft": {
      "command": "npx",
      "args": [
        "-y",
        "github:Jeremy-Min-Yang/minecraft-mcp-server-pixel",
        "--host",
        "localhost",
        "--port",
        "25565",
        "--username",
        "Bob_the_Builder"
      ]
    }
  }
}
```

## 🛠️ Available Commands

Once connected, Claude can use these commands to control the Minecraft bot:

### Movement
- `get-position` — Get the bot's current position
- `move-to-position` — Move to specific coordinates (teleports in creative mode)

### Inventory
- `equip-item` — Equip an item to the bot's hand
- `get-bot-status` — Show the current game mode and OP status
- `list-block-names` — List all valid block names for this Minecraft version

### Block Interaction
- `place-block` — Place a block at specific coordinates

### Entity Interaction
- `find-entity` — Find the nearest entity of a specific type

### Chat
- `send-chat` — Send a chat message in-game

### Pixel Art
- `build-pixel-art` — Build a pixel art image from a 2D array of block types

## 🎨 Pixel Art Example

To create pixel art, provide a 2D array of block types, an origin point, and a direction:

```javascript
// Example pixel art command
{
  "pixels": [
    ["wool_red", "wool_red", "wool_red"],
    ["wool_blue", "wool_white", "wool_blue"],
    ["wool_blue", "wool_blue", "wool_blue"]
  ],
  "origin": { "x": 100, "y": 64, "z": 100 },
  "direction": "north"
}
```

## 📚 Documentation

- See [schema.md](./schema.md) for detailed API documentation
- Refer to the Mineflayer documentation for more information about the underlying bot API: [Mineflayer Documentation](https://github.com/PrismarineJS/mineflayer/blob/master/docs/api.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- [Mineflayer](https://github.com/PrismarineJS/mineflayer) - The Minecraft bot library
- [Model Context Protocol](https://modelcontextprotocol.ai) - The protocol for connecting LLMs to tools
- [Anthropic](https://www.anthropic.com) - Creator of Claude AI

---

Happy building with AI! 🤖🏗️
