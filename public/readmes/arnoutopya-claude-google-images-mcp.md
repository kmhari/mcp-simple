# Claude Google Images MCP

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A Model Context Protocol (MCP) server for Claude Desktop that enables Google Images search directly within Claude. This MCP allows Claude to search, browse, and download images from Google Images with simple commands.

## Quick Install

### For Unix-based systems (macOS, Linux)

```bash
# One-line installer
curl -fsSL https://raw.githubusercontent.com/Arnoutopya/claude-google-images-mcp/main/install.sh | bash
```

### For all systems

```bash
# Install directly from GitHub
npx github:Arnoutopya/claude-google-images-mcp setup
```

Then restart Claude Desktop.

## Features

- **Google Images Search**: Search for images using natural language queries
- **Image Browsing**: View search results directly within Claude Desktop
- **Direct Download**: Save images to your local machine
- **Configurable Settings**: Customize searches with safe search, image type filters, and result limits
- **No API Key Required**: Works without needing any Google API credentials

## Prerequisites

- Node.js 14.0.0 or higher
- Claude Desktop application installed

## Installation Methods

### Method 1: One-line Installer (Unix-based systems)

```bash
curl -fsSL https://raw.githubusercontent.com/Arnoutopya/claude-google-images-mcp/main/install.sh | bash
```

### Method 2: Install from GitHub

```bash
npx github:Arnoutopya/claude-google-images-mcp setup
```

### Method 3: Clone and Install Locally

```bash
git clone https://github.com/Arnoutopya/claude-google-images-mcp.git
cd claude-google-images-mcp
npm install
node install.js
```

### Method 4: Manual Configuration

If you prefer to manually configure Claude Desktop:

1. Clone this repository:
```bash
git clone https://github.com/Arnoutopya/claude-google-images-mcp.git
cd claude-google-images-mcp
npm install
```

2. Edit your Claude Desktop configuration file:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

3. Add the following to the JSON configuration:
```json
{
  "mcpServers": {
    "google-images-mcp": {
      "command": "node",
      "args": [
        "/path/to/cloned/claude-google-images-mcp/server.js"
      ]
    }
  }
}
```
Note: Replace `/path/to/cloned` with the actual path to your cloned repository.

4. Restart Claude Desktop

## Usage

Once installed, you can use these commands in Claude Desktop:

### Search for Images

```
/google_images_search [your search query]
```

Example:
```
/google_images_search cute puppies
```

This will show a grid of image results that you can browse directly in Claude.

### Configure Settings

```
/google_images_config [options]
```

Available options:
- `safeSearch=[true/false]` - Enable or disable safe search (default: true)
- `imageType=[all/photo/clipart/lineart/animated]` - Filter by image type
- `maxResults=[number]` - Number of results to show per page (default: 20)

Example:
```
/google_images_config safeSearch=false imageType=photo maxResults=30
```

### Download Images

When viewing search results, you can download any image by clicking the download button that appears beneath it.

## Troubleshooting

### MCP Server Not Starting

If the MCP server fails to start:

1. Check that you have Node.js 14+ installed:
```bash
node --version
```

2. Try running the server manually to see any error messages:
```bash
node /path/to/claude-google-images-mcp/server.js
```

3. Verify the Claude Desktop configuration:
```bash
cat "~/Library/Application Support/Claude/claude_desktop_config.json"
```
(Adjust the path for your operating system)

### Connection Issues

If Claude Desktop shows "Connection error" when trying to use the MCP:

1. Ensure Claude Desktop is restarted after installation
2. Check for any firewall issues blocking local connections
3. Verify no other services are using port 8033

## Development

To contribute to this project:

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR-USERNAME/claude-google-images-mcp.git
```

3. Install dependencies:
```bash
cd claude-google-images-mcp
npm install
```

4. Run the server locally:
```bash
node server.js
```

5. Make your changes and submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is for educational and personal use only. Please respect Google's terms of service and copyright laws when using images. The creators of this MCP are not responsible for any misuse or violation of terms.

## Acknowledgements

This project was inspired by other MCP implementations including:
- [Desktop Commander MCP](https://github.com/wonderwhy-er/DesktopCommanderMCP)
- Various Google Images scraping tools in the open-source community

---

Made with ❤️ for the Claude Desktop community
