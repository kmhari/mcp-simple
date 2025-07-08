# Image Generator MCP Server

An MCP server that uses Replicate to generate images and allows users to save them.

## Components

### Resources

The server implements an image storage system with:
- Custom image:// URI scheme for accessing individual generated images
- Each image resource has a name based on its prompt, description with creation date, and image/png mimetype

### Prompts

The server provides a single prompt:
- generate-image: Creates prompts for generating images using Stable Diffusion
  - Optional "style" argument to control the image style (realistic/artistic/abstract)
  - Generates a prompt template with style-specific guidance

### Tools

The server implements three tools:
- generate-image: Generates an image using Replicate's Stable Diffusion model
  - Takes "prompt" as a required string argument
  - Optional parameters include "negative_prompt", "width", "height", "num_inference_steps", and "guidance_scale"
  - Returns the generated image and its URL
- save-image: Saves a generated image to the local filesystem
  - Takes "image_url" and "prompt" as required string arguments
  - Generates a unique ID for the image and saves it to the "generated_images" directory
- list-saved-images: Lists all saved images
  - Returns a list of all saved images with their metadata and thumbnails

## Configuration

### Replicate API Token

To use this image generator, you need a Replicate API token:

1. Create an account at [Replicate](https://replicate.com/)
2. Get your API token from [https://replicate.com/account](https://replicate.com/account)
3. Create a `.env` file based on the provided `.env.example` template:

```
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

> **Important:** The `.env` file is excluded from version control via `.gitignore` to prevent accidentally exposing your API token. Never commit sensitive information to your repository.

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/image-generator.git
cd image-generator
```

2. Create and activate a virtual environment:
```bash
# Using venv
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On macOS/Linux
source .venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up your `.env` file as described above

## Quickstart

### Install

#### Claude Desktop

On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

<details>
  <summary>Development/Unpublished Servers Configuration</summary>
  ```
  "mcpServers": {
    "image-generator": {
      "command": "uv",
      "args": [
        "--directory",
        "B:\NEWTEST\image-generator",
        "run",
        "image-generator"
      ]
    }
  }
  ```
</details>

<details>
  <summary>Published Servers Configuration</summary>
  ```
  "mcpServers": {
    "image-generator": {
      "command": "uvx",
      "args": [
        "image-generator"
      ]
    }
  }
  ```
</details>

### Usage

Once the server is running, you can:

1. Generate an image by using the "generate-image" tool with a descriptive prompt
2. Save the generated image using the "save-image" tool with the image URL and prompt
3. View all saved images using the "list-saved-images" tool
4. Access saved images through the resource list

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
npx @modelcontextprotocol/inspector uv --directory B:\NEWTEST\image-generator run image-generator
```

Upon launching, the Inspector will display a URL that you can access in your browser to begin debugging.