# API Tester MCP Server

This is a Model Context Protocol (MCP) server that allows Claude to make API requests on your behalf. It provides tools for testing various APIs, including a dedicated integration with OpenAI's APIs.

## Features

- Make HTTP requests (GET, POST, PUT, DELETE) to any API
- Test OpenAI's GPT models without sharing your API key in the chat
- Generate images with DALL-E
- Properly formatted responses for easy reading

## Setup

### Prerequisites

- Python 3.10 or higher
- MCP SDK 1.2.0 or higher

### Installation

1. Install the required dependencies:

```bash
pip install "mcp[cli]" httpx python-dotenv
```

2. Set your OpenAI API key using one of these methods:

#### Option 1: Environment Variables

```bash
# On Windows (PowerShell)
$env:OPENAI_API_KEY = "your-api-key"

# On Windows (Command Prompt)
set OPENAI_API_KEY=your-api-key

# On macOS/Linux
export OPENAI_API_KEY="your-api-key"
```

#### Option 2: Using a .env File (Recommended)

Create a `.env` file in the project directory (copy from `.env.example`):

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Running the Server

```bash
python main.py
```

## Using with Claude

Once your server is running, you can connect it to Claude for Desktop by configuring it in the Claude Desktop config file.

### Example Prompts

#### General API Testing

```
Use the get_request tool to fetch data from https://jsonplaceholder.typicode.com/posts/1
```

```
Use the post_request tool to send data to https://jsonplaceholder.typicode.com/posts with this JSON body: {"title": "Test Post", "body": "This is a test", "userId": 1}
```

#### Using OpenAI Tools

```
Use the openai_chat_completion tool with:
prompt: "Write a short poem about artificial intelligence"
system_message: "You are a helpful assistant that writes creative poetry"
model: "gpt-4"
```

```
Use the openai_image_generation tool with:
prompt: "A futuristic city with flying cars and tall glass buildings at sunset"
size: "1024x1024"
```

## Available Tools

### General API Tools

- `get_request`: Make GET requests to any URL
- `post_request`: Make POST requests with JSON bodies
- `put_request`: Make PUT requests with JSON bodies
- `delete_request`: Make DELETE requests

### OpenAI-Specific Tools

- `openai_chat_completion`: Generate text using OpenAI's chat models
- `openai_image_generation`: Generate images using DALL-E

## Security Notes

- Your OpenAI API key is stored in the server and not exposed in the chat
- API usage will count against your OpenAI quota and may incur charges
- For production use, always set the API key as an environment variable or use a `.env` file
- The `.env` file is included in `.gitignore` to prevent accidentally committing your API key
