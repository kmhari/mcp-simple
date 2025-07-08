# Image Generation MCP Server

Generate images using Google's Gemini model through an MCP server.

## Setup

1. Clone this repository
```bash
git clone https://github.com/MalluBeast69/gemini-img-gen-MCP
cd gemini-img-gen-MCP
```

2. Initialize a new MCP server project
```bash
uv init mcp-server-demo
cd mcp-server-demo
```

3. Install dependencies using uv
```bash
uv add "mcp[cli]"
uv add "google-generativeai"
uv add "Pillow"
```

4. Create an `.mcp-config.json` file in your workspace with the following content:
```json
{
    "mcpServers": {
        "content_gen": {
            "command": "mcp",
            "args": ["run", "<PATH_TO_SERVER_PY>"],
            "env": {
                "GEMINI_API_KEY": "<YOUR_GEMINI_API_KEY>",
                "OUTPUT_IMAGE_PATH": "<YOUR_OUTPUT_PATH>"
            },
            "transportType": "stdio",
            "autoApprove": []
        }
    }
}
```

Replace:
- `<PATH_TO_SERVER_PY>` with the full path to your server.py file (e.g., "C:/Projects/image_gen/server.py")
- `<YOUR_GEMINI_API_KEY>` with your Gemini API key from https://makersuite.google.com/app/apikey
- `<YOUR_OUTPUT_PATH>` with where you want the generated images to be saved (e.g., "C:/Users/YourName/Pictures/GeneratedImages")

## Usage

1. Start the MCP server:
```bash
mcp start content_gen
```

2. The server will now be ready to generate images based on your prompts!

## Requirements
- Python 3.8+
- uv package manager
- Gemini API key 