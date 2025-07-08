# DALL-E MCP Server

<img src="assets/dall-e-logo.png" alt="DALL-E MCP Logo" width="256" height="256">

An MCP (Model Context Protocol) server for generating images using OpenAI's DALL-E API.

## Features

- Generate images using DALL-E 2 or DALL-E 3
- Edit existing images (DALL-E 2 only)
- Create variations of existing images (DALL-E 2 only)
- Validate OpenAI API key

## Installation

```bash
# Clone the repository
git clone https://github.com/joshmouch/mcp-image-generator.git
cd mcp-image-generator

# Install dependencies
npm install

# Build the project
npm run build
```

## Important Note for Cline Users

When using this DALL-E MCP server with Cline, it's recommended to save generated images in your current workspace directory by setting the `saveDir` parameter to match your current working directory. This ensures Cline can properly locate and display the generated images in your conversation.

Example usage with Cline:
```json
{
  "prompt": "A tropical beach at sunset",
  "saveDir": "/path/to/current/workspace"
}
```


## Usage

### Running the Server

```bash
# Run the server
node build/index.js
```

### Configuration for Cline

Add the dall-e server to your Cline MCP settings file inside VSCode's settings (ex. ~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json):

```json
{
  "mcpServers": {
    "mcp-image-generator": {
      "command": "node",
      "args": ["/path/to/mcp-image-generator-server/build/index.js"],
      "env": {
        "OPENAI_API_KEY": "your-api-key-here",
        "SAVE_DIR": "/path/to/save/directory"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Make sure to:
1. Replace `/path/to/mcp-image-generator-server/build/index.js` with the actual path to the built index.js file
2. Replace `your-api-key-here` with your OpenAI API key

### Available Tools

#### generate_image

Generate an image using DALL-E based on a text prompt.

```json
{
  "prompt": "A futuristic city with flying cars and neon lights",
  "model": "dall-e-3",
  "size": "1024x1024",
  "quality": "standard",
  "style": "vivid",
  "n": 1,
  "saveDir": "/path/to/save/directory",
  "fileName": "futuristic-city"
}
```

Parameters:
- `prompt` (required): Text description of the desired image
- `model` (optional): DALL-E model to use ("dall-e-2" or "dall-e-3", default: "dall-e-3")
- `size` (optional): Size of the generated image (default: "1024x1024")
  - DALL-E 3: "1024x1024", "1792x1024", or "1024x1792"
  - DALL-E 2: "256x256", "512x512", or "1024x1024"
- `quality` (optional): Quality of the generated image, DALL-E 3 only ("standard" or "hd", default: "standard")
- `style` (optional): Style of the generated image, DALL-E 3 only ("vivid" or "natural", default: "vivid")
- `n` (optional): Number of images to generate (1-10, default: 1)
- `saveDir` (optional): Directory to save the generated images (default: current directory or SAVE_DIR from .env). **For Cline users:** Setting this to your current workspace directory is recommended for proper image display.
- `fileName` (optional): Base filename for the generated images without extension (default: "dalle-{timestamp}")

#### edit_image

Edit an existing image using DALL-E based on a text prompt.

> **⚠️ Known Issue (March 18, 2025):** The DALL-E 2 image edit API currently has a bug where it sometimes ignores the prompt and returns the original image without any edits, even when using proper RGBA format images and masks. This issue has been reported in the [OpenAI community forum](https://community.openai.com/t/dall-e-2-image-edit-issue/668376/7). If you experience this issue, try using the `create_variation` tool instead, which seems to work more reliably.

```json
{
  "prompt": "Add a red hat",
  "imagePath": "/path/to/image.png",
  "mask": "/path/to/mask.png",
  "model": "dall-e-2",
  "size": "1024x1024",
  "n": 1,
  "saveDir": "/path/to/save/directory",
  "fileName": "edited-image"
}
```

Parameters:
- `prompt` (required): Text description of the desired edits
- `imagePath` (required): Path to the image to edit
- `mask` (optional): Path to the mask image (white areas will be edited, black areas preserved)
- `model` (optional): DALL-E model to use (currently only "dall-e-2" supports editing, default: "dall-e-2")
- `size` (optional): Size of the generated image (default: "1024x1024")
- `n` (optional): Number of images to generate (1-10, default: 1)
- `saveDir` (optional): Directory to save the edited images (default: current directory or SAVE_DIR from .env). **For Cline users:** Setting this to your current workspace directory is recommended for proper image display.
- `fileName` (optional): Base filename for the edited images without extension (default: "dalle-edit-{timestamp}")

#### create_variation

Create variations of an existing image using DALL-E.

```json
{
  "imagePath": "/path/to/image.png",
  "model": "dall-e-2",
  "size": "1024x1024",
  "n": 4,
  "saveDir": "/path/to/save/directory",
  "fileName": "image-variation"
}
```

Parameters:
- `imagePath` (required): Path to the image to create variations of
- `model` (optional): DALL-E model to use (currently only "dall-e-2" supports variations, default: "dall-e-2")
- `size` (optional): Size of the generated image (default: "1024x1024")
- `n` (optional): Number of variations to generate (1-10, default: 1)
- `saveDir` (optional): Directory to save the variation images (default: current directory or SAVE_DIR from .env). **For Cline users:** Setting this to your current workspace directory is recommended for proper image display.
- `fileName` (optional): Base filename for the variation images without extension (default: "dalle-variation-{timestamp}")

#### validate_key

Validate the OpenAI API key.

```json
{}
```

No parameters required.

## Development

## Testing Configuration

**Note: The following .env configuration is ONLY needed for running tests, not for normal operation.**

If you're developing or running tests for this project, create a `.env` file in the root directory with your OpenAI API key:

```
# Required for TESTS ONLY: OpenAI API Key
OPENAI_API_KEY=your-api-key-here

# Optional: Default save directory for test images
# If not specified, images will be saved to the current directory
# SAVE_DIR=/path/to/save/directory
```

For normal operation with Cline, configure your API key in the MCP settings JSON as described in the "Adding to MCP Settings" section above.

You can get your API key from [OpenAI's API Keys page](https://platform.openai.com/api-keys).

### Running Tests

```bash
# Run basic tests
npm test

# Run all tests including edit and variation tests
npm run test:all

# Run tests in watch mode
npm run test:watch

# Run specific test by name
npm run test:name "should validate API key"
```

Note: Tests use real API calls and may incur charges on your OpenAI account.

### Generating Test Images

The project includes a script to generate test images for development and testing:

```bash
# Generate a test image in the assets directory
npm run generate-test-image
  ```

This will create a simple test image in the `assets` directory that can be used for testing the edit and variation features.

## License

MIT
