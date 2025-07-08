# Magic: The Gathering MCP Tool Server

A Model Context Protocol server for accessing Magic: The Gathering card data, rules, and set information. This server provides quick access to card details, rulings, comprehensive rules sections, and more.

## Features

- Search for Magic cards by name, color, type, and other criteria
- View detailed card information including rulings and foreign language versions
- Access the Magic: The Gathering Comprehensive Rules
- Browse set information and card listings
- View card images (where available)

## Installation Requirements

1. **PHP 8.1 or higher** 
   - Check your version by running: `php --version`
   - If needed, download from [php.net](https://www.php.net/downloads.php)

2. **Composer** (PHP's dependency manager)
   - Download from [getcomposer.org](https://getcomposer.org/)

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/james2037/mcp-gatherer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd mcp-gatherer
   ```

3. Install dependencies:
   ```bash
   composer install
   ```

## Running the Server

Your MCP client, such as Claude Desktop, can start the server by invoking:
```bash
php path/to/mcp_server.php
```

The server will start and you can begin using the Magic: The Gathering tools through the MCP client. Be sure to specify the STDIO transport if necessary.

An example `claude_desktop_config.json` for a Windows user might look like:

```json
{
  "mcpServers": {
    "mcp-gatherer": {
      "command": "php",
      "args": ["C:\\mcp-gatherer\\mcp_server.php"],
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

If you'd like to contribute to the development of this tool, feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.
