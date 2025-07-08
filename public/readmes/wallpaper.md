# Wallpaper MCP

Allows MCP clients to generate wallpaper images and set them as your desktop wallpaper on MacOS.

## Features

### Tools

- **generate_image**
  - **Description**: Generate an image using Luma Labs AI.
  - **Input**: `prompt` (string) - Text description of the image to generate.
  - **Output**: Returns the generated image.

- **generate_wallpaper**
  - **Description**: Generate a wallpaper image and save it to a temporary directory.
  - **Input**: `prompt` (string) - Text description of the wallpaper to generate.
  - **Output**: Returns the path to the generated wallpaper image.

- **set_image_from_path**
  - **Description**: Set the wallpaper using an image file from a specific path.
  - **Input**: `image_path` (string) - Full path to the image file to use as wallpaper.
  - **Output**: A message indicating whether the wallpaper was set successfully.

- **generate_and_set_wallpaper**
  - **Description**: Generate a wallpaper from a prompt and set it as your desktop wallpaper.
  - **Input**: `prompt` (string) - Text description of the wallpaper to generate.
  - **Output**: A message indicating whether the wallpaper was generated and set successfully.

### Video Demo
https://www.youtube.com/watch?v=S1MA3t_gMq8
[![video image](https://img.youtube.com/vi/S1MA3t_gMq8/0.jpg)](https://www.youtube.com/watch?v=S1MA3t_gMq8)


## Getting Started

### Prerequisites
- macOS
- Luma Labs API key

### Getting a Luma Labs API Key
Visit [Luma Labs Dream Machine API](https://lumalabs.ai/dream-machine/api)

### Installation
```bash
git clone git@github.com:shahanneda/wallpaper-mcp.git
```

### Integration with Claude Desktop
To use this server with Claude Desktop, add the following to your Claude Desktop configuration file:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
```json
{
    "wallpaper": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "mcp[cli]",
        "--with",
        "lumaai",
        "--with",
        "requests",
        "mcp",
        "run",
        "/path/to/server.py"
      ],
      "env": {
        "LUMAAI_API_KEY": "API_KEY_HERE"
      }
    }
}
```
Replace `/path/to/server.py` with the absolute path to your server.py file.

### Testing with MCP Inspector
To run in development:
```bash
 LUMAAI_API_KEY=API_KEY_HERE mcp dev server.py --with lumaai --with requests
```

## License

This MCP server is licensed under the MIT License.
