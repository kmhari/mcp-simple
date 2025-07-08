# mcp-gpt-image

[![npm version](https://badge.fury.io/js/mcp-gpt-image.svg)](https://www.npmjs.com/package/mcp-gpt-image)
[![Docker Image](https://img.shields.io/docker/v/4kk11/mcp-gpt-image?logo=docker)](https://hub.docker.com/r/4kk11/mcp-gpt-image)

An MCP server for generating and editing images using the OpenAI API.  
Generated images are saved in the specified directory and returned along with scaled-down preview images.

## Key Features

### 1. Image Generation (generate_image)
Generates new images from text prompts.

**Input Parameters:**
- `prompt`: Description of the image you want to generate (required)
- `size`: Output image size (optional, default: "auto")
  - "1024x1024"
  - "1536x1024"
  - "1024x1536"
  - "auto"

### 2. Image Editing (edit_image)
Edits existing images based on text prompts.

**Input Parameters:**
- `image`: File path of the image to edit (required)
- `prompt`: Text prompt describing the desired edits (required)

## Usage Examples
### Generating Variations

https://github.com/user-attachments/assets/c0f69b09-237f-4cc4-96cc-f528d36b1fa9

### Role-playing as a Designer

https://github.com/user-attachments/assets/91ded8fb-b372-4020-a326-788c38670edc

## Installation

### Using Docker

1. Pull the Docker image
```bash
docker pull 4kk11/mcp-gpt-image
```

2. Configuration example (claude_desktop_config.json)
```json
{
  "mcpServers": {
    "gpt-image": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-v",
        "YOUR_IMAGES_DIR:/app/temp",
        "-e",
        "OPENAI_API_KEY=YOUR_API_KEY",
        "4kk11/mcp-gpt-image"
      ]
    }
  }
}
```

### Using npx

Configuration example (claude_desktop_config.json):
```json
{
  "mcpServers": {
    "gpt-image": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-gpt-image"
      ],
      "env": {
        "OPENAI_API_KEY": "YOUR_API_KEY",
        "IMAGES_DIR": "YOUR_IMAGES_DIR"
      }
    }
  }
}
```

## Environment Variables

| Variable Name | Description | Default Value |
|--------------|-------------|---------------|
| OPENAI_API_KEY | OpenAI API key (required) | - |
| IMAGES_DIR | Path to directory for saving generated/edited images | ./temp |

## For Developers

### Building and Managing Docker Images

```bash
# Build Docker image
make docker-build

# Remove Docker image
make docker-clean
```

```json
{
  "mcpServers": {
    "gpt-image": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-v",
        "YOUR_IMAGES_DIR:/app/temp",
        "-e",
        "OPENAI_API_KEY",
        "mcp-gpt-image"
      ],
      "env": {
        "OPENAI_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

## License

This project is released under the MIT License. See [LICENSE](LICENSE) file for details.