# Zipic MCP Server

> A Model Context Protocol server that provides image compression capabilities. This server enables LLMs to compress and optimize images through simple and advanced compression tools. This is a Swift implementation of a zipic MCP server using the MCP Swift SDK.

![Swift Platform](https://img.shields.io/badge/platform-macOS-lightgrey)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

* **Quick Image Compression**: Rapidly compress images with default settings
* **Advanced Compression**: Fine-tune compression settings including quality level, format, and dimensions
* **Multiple Format Support**: Output images in JPEG, WebP, HEIC, AVIF, or PNG formats
* **Batch Processing**: Compress multiple images or entire directories at once
* **Size Preservation Option**: Choose to replace original files or save alongside them

## Available Tools

* `quickCompress` - Quickly compress images with default settings
  * `urls` (array, required): Array of file paths pointing to images or directories containing images

* `advancedCompress` - Compress images with fine-tuned settings
  * `urls` (array, required): Array of file paths pointing to images or directories containing images
  * `level` (integer, optional): Compression level from 1-6 (1=highest quality, 6=maximum compression)
  * `format` (string, optional): Output format ("original", "jpeg", "webp", "heic", "avif", "png")
  * `width` (integer, optional): Target width for resizing (0 for auto-adjustment)
  * `height` (integer, optional): Target height for resizing (0 for auto-adjustment)
  * `suffix` (string, optional): Custom suffix for compressed file names
  * `directory` (string, optional): Output directory path for compressed images

## Installation

### Option 1: One-Line Installation (curl)

The easiest way to install is with the one-line installer, which automatically downloads the latest version and installs it to `~/.local/bin` in your home directory:

```bash
curl -fsSL https://raw.githubusercontent.com/okooo5km/zipic-mcp-server/main/install.sh | bash
```

The installer will:

* Create `~/.local/bin` if it doesn't exist
* Add this directory to your PATH (in .zshrc or .bashrc)
* Download and install the latest version
* Make the binary executable

### Option 2: Build from Source

1. Clone the repository:

   ```bash
   git clone https://github.com/okooo5km/zipic-mcp-server.git
   cd zipic-mcp-server
   ```

2. Build the project:

   ```bash
   swift build -c release
   ```

3. Install the binary:

   ```bash
   # Install to user directory (recommended, no sudo required)
   mkdir -p ~/.local/bin
   cp $(swift build -c release --show-bin-path)/zipic-mcp-server ~/.local/bin/
   ```

   Make sure `~/.local/bin` is in your PATH by adding to your shell configuration file:

   ```bash
   echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc  # or ~/.bashrc
   source ~/.zshrc  # or source ~/.bashrc
   ```

## Command Line Arguments

The server supports the following command line arguments:

* `-h, --help`: Display help information about the server, its usage, and available options
* `-v, --version`: Display the version number of the zipic-mcp-server

Example usage:

```bash
# Display help information
zipic-mcp-server --help

# Display version information
zipic-mcp-server --version
```

### Configure for Claude.app

Add to your Claude settings:

```json
"mcpServers": {
  "zipic": {
    "command": "zipic-mcp-server"
  }
}
```

### Configure for Cursor

Add the following configuration to your Cursor editor's Settings - mcp.json:

```json
{
  "mcpServers": {
    "zipic": {
      "command": "zipic-mcp-server"
    }
  }
}
```

### Example System Prompt

You can use the following system prompt to help Claude utilize the zipic-mcp-server effectively:

```
You have access to an image compression tool through MCP. Use this to help users:

- Compress single images or batches of images
- Reduce file size while maintaining quality
- Convert between image formats
- Resize images to specific dimensions

Use the following tools appropriately:
- `quickCompress` for simple compression tasks with default settings
- `advancedCompress` when the user needs fine-grained control over quality, format, and dimensions

Ask for absolute file paths to images when the user wants to compress files.
```

## Development Requirements

* Swift 6.0 or later
* macOS 14.0 or later
* MCP Swift SDK 0.2.0 or later

## Usage Examples

### Quick Compression

```json
{
  "urls": [
    "/Users/username/Desktop/photo.jpg",
    "/Users/username/Pictures/vacation"
  ]
}
```

### Advanced Compression

```json
{
  "urls": ["/Users/username/Desktop/photo.jpg"],
  "level": 2,
  "format": "webp",
  "width": 1200,
  "height": 0
}
```

## Use Cases

* **Website Optimization**: Reduce image sizes for faster web performance
* **Storage Management**: Compress large photo libraries to save disk space
* **Format Conversion**: Convert between image formats for compatibility
* **Batch Processing**: Process multiple images with consistent settings
* **Social Media Preparation**: Optimize images for specific platforms

## Version History

See GitHub Releases for version history and changelog.

## ☕️ Support the Project

If you find Zipic MCP Server helpful, please consider supporting its development:

* ⭐️ Star the project on GitHub
* 🐛 Report bugs or suggest features
* 💝 Support via:

<p align="center">
  <a href="https://buymeacoffee.com/okooo5km">
    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=okooo5km&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" style="border-radius: 8px;" />
  </a>
</p>

## License

zipic-mcp-server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License.

## About

A Swift implementation of an image compression server for Model Context Protocol (MCP), enabling AI assistants to compress and optimize images directly. This project is built using the MCP Swift SDK.
