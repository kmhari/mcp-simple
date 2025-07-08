<div align="center">
  <img src="assets/img/Discord_MCP_full_logo.svg" width="60%" alt="DeepSeek-V3" />
</div>
<hr>
<div align="center" style="line-height: 1;">
    <a href="https://github.com/modelcontextprotocol/servers" target="_blank" style="margin: 2px;">
        <img alt="MCP Server" src="https://badge.mcpx.dev?type=server" style="display: inline-block; vertical-align: middle;"/>
    </a>
    <a href="https://smithery.ai/server/@SaseQ/discord-mcp" target="_blank" style="margin: 2px;">
        <img alt="Smithery Badge" src="https://camo.githubusercontent.com/ee5c6c6dc502821f4d57313b2885f7878af52be14142dd98526ea12aedf9b260/68747470733a2f2f736d6974686572792e61692f62616467652f40646d6f6e74676f6d65727934302f646565707365656b2d6d63702d736572766572" data-canonical-src="https://smithery.ai/server/@SaseQ/discord-mcp" style="display: inline-block; vertical-align: middle;"/>
    </a>
    <a href="https://discord.gg/5Uvxe5jteM" target="_blank" style="margin: 2px;">
        <img alt="Discord" src="https://img.shields.io/discord/936242526120194108?color=7389D8&label&logo=discord&logoColor=ffffff" style="display: inline-block; vertical-align: middle;"/>
    </a>
    <a href="https://github.com/SaseQ/discord-mcp/blob/main/LICENSE" target="_blank" style="margin: 2px;">
        <img alt="MIT License" src="https://img.shields.io/github/license/SaseQ/discord-mcp" style="display: inline-block; vertical-align: middle;"/>
    </a>
</div>


## 📖 Description

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server for the Discord API [(JDA)](https://jda.wiki/), 
allowing seamless integration of Discord Bot with MCP-compatible applications like Claude Desktop.

Enable your AI assistants to seamlessly interact with Discord. Manage channels, send messages, and retrieve server information effortlessly. Enhance your Discord experience with powerful automation capabilities.


## 🔬 Installation

#### Clone the repository
```bash
git clone https://github.com/SaseQ/discord-mcp
```

#### Build the project
> NOTE: Maven installation is required to use the mvn command. Full instructions can be found [here](https://www.baeldung.com/install-maven-on-windows-linux-mac).
```bash
cd discord-mcp
mvn clean package # The jar file will be available in the /target directory
```

#### Configure AI client
Many code editors and other AI clients use a configuration file to manage MCP servers.

The Discord MPC server can be configured by adding the following to your configuration file.

> NOTE: You will need to create a Discord Bot token to use this server. Instructions on how to create a Discord Bot token can be found [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
```json
{
  "mcpServers": {
    "discord-mcp": {
      "command": "java",
      "args": [
        "-jar",
        "/absolute/path/to/discord-mcp-0.0.1-SNAPSHOT.jar"
      ],
      "env": {
        "DISCORD_TOKEN": "YOUR_DISCORD_BOT_TOKEN"
      }
    }
  }
}
```


## 🔧 GitMCP

Use Discord MCP remotely via [GitMCP](https://gitmcp.io/):
```json
{
  "mcpServers": {
    "discord-mcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://gitmcp.io/SaseQ/discord-mcp"
      ],
      "env": {
        "DISCORD_TOKEN": "YOUR_DISCORD_BOT_TOKEN"
      }
    }
  }
}
```
More info and different configs [here](https://gitmcp.io/SaseQ/discord-mcp)


## ⚓ Smithery

Install Discord MCP Server automatically via [Smithery](https://smithery.ai/):
```bash
npx -y @smithery/cli@latest install @SaseQ/discord-mcp --client claude
```


## 🛠️ Available Tools

#### Server Information
 - [`get_server_info`](): Get detailed discord server information

#### Message Management
 - [`send_message`](): Send a message to a specific channel
 - [`edit_message`](): Edit a message from a specific channel
 - [`delete_message`](): Delete a message from a specific channel
 - [`read_messages`](): Read recent message history from a specific channel
 - [`send_private_message`](): Send a private message to a specific user
 - [`edit_private_message`](): Edit a private message from a specific user
 - [`delete_private_message`](): Delete a private message from a specific user
 - [`read_private_messages`](): Read recent message history from a specific user
 - [`add_reaction`](): Add a reaction (emoji) to a specific message
 - [`remove_reaction`](): Remove a specified reaction (emoji) from a message

#### Channel Management
 - [`create_text_channel`](): Create text a channel
 - [`delete_channel`](): Delete a channel
 - [`find_channel`](): Find a channel type and ID using name and server ID
 - [`list_channels`](): List of all channels

#### Category Management
 - [`create_category`](): Create a new category for channels
 - [`delete_category`](): Delete a category
 - [`find_category`](): Find a category ID using name and server ID
 - [`list_channels_in_category`](): List of channels in a specific category

#### Webhook Management
 - [`create_webhook`](): Create a new webhook on a specific channel
 - [`delete_webhook`](): Delete a webhook
 - [`list_webhooks`](): List of webhooks on a specific channel
 - [`send_webhook_message`](): Send a message via webhook


<hr>

A more detailed examples can be found in the [Wiki](https://github.com/SaseQ/discord-mcp/wiki).
