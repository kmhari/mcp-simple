# OpenDental MCP Server

This repository contains an MCP (Model Context Protocol) server for querying OpenDental documentation using Qdrant vector database.

## What is This?

This tool helps you search through OpenDental documentation using natural language questions. Instead of searching for exact keywords, you can ask questions like "How do I create an appointment?" and get relevant answers from the documentation.

## Platform-Specific Guides

For non-technical users, we've created detailed step-by-step guides:

- [Windows Installation and Usage Guide](WINDOWS-GUIDE.md)
- [macOS Installation and Usage Guide](MACOS-GUIDE.md)

## System Requirements

- **Windows, macOS, or Linux**
- Node.js 18 or higher ([Download here](https://nodejs.org/))
- Python 3.6 or higher ([Download here](https://www.python.org/downloads/))
- Qdrant vector database (automatically runs with Docker or standalone)
- OpenAI API key for generating embeddings ([Get one here](https://platform.openai.com/account/api-keys))

## Important Note on API Keys

This project requires API keys to function. For security reasons:

- Never commit real API keys to the repository
- Use the provided `.env.example` files as templates
- Create your own `.env` files with your actual keys
- The `.gitignore` file is configured to exclude `.env` files from Git

If you need to share configuration, always use placeholder values like `your_openai_api_key` instead of real keys.

## Installation Instructions

### Step 1: Clone the Repository

#### Windows
```
git clone https://github.com/yourusername/open-dental-mcp.git
cd open-dental-mcp
```

#### macOS/Linux
```bash
git clone https://github.com/yourusername/open-dental-mcp.git
cd open-dental-mcp
```

### Step 2: Install Qdrant

You need to have Qdrant running locally. There are several ways to install it:

#### Using Docker (Recommended)
```bash
docker pull qdrant/qdrant
docker run -p 6333:6333 -p 6334:6334 -v $(pwd)/qdrant_storage:/qdrant/storage qdrant/qdrant
```

#### On Windows without Docker
You can download the latest release from [Qdrant GitHub releases](https://github.com/qdrant/qdrant/releases) and run it locally.

#### On macOS without Docker
You can install Qdrant with Homebrew:
```bash
brew install qdrant/qdrant/qdrant
qdrant
```

### Step 3: Configure Environment Variables

You need to set up your environment variables for Qdrant and OpenAI (for embeddings).

#### Windows
1. Create a file named `.env` in the `mcp-openai-filesearch` folder based on `.env.example`
2. Add the following content (replace OpenAI API key with your own):
```
OPENAI_API_KEY=your_openai_api_key
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_COLLECTION=open_dental_docs
```

#### macOS/Linux
1. Create a file named `.env` in the `mcp-openai-filesearch` folder based on `.env.example`
2. Add the following content (replace OpenAI API key with your own):
```
OPENAI_API_KEY=your_openai_api_key
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_COLLECTION=open_dental_docs
```

### Step 4: Install Dependencies

From the root directory:

```bash
npm run install:deps
```

Or manually:

#### Windows
```
cd mcp-openai-filesearch
npm install
```

#### macOS/Linux
```bash
cd mcp-openai-filesearch
npm install
```

### Step 5: Build the Server

From the root directory:

```bash
npm run build
```

Or manually:

#### Windows
```
cd mcp-openai-filesearch
npm run build
```

#### macOS/Linux
```bash
cd mcp-openai-filesearch
npm run build
```

### Step 6: Setup Qdrant Collection

Before starting the server, you need to set up the Qdrant collection:

```bash
cd mcp-openai-filesearch
npm run setup:qdrant
```

## Client Configuration

To connect your MCP client (like Cursor) to the OpenDental MCP server, you need to create a configuration file. This tells your client how to launch and communicate with the server.

### Setting Up mcp.json

1. Create a file named `mcp.json` in the `.cursor` directory of your project (or where your MCP client looks for configurations)
2. Add the following configuration, adjusting paths to match your local installation:

#### Windows Configuration
```json
{
  "mcpServers": {
    "OpenDental-MCP": {
      "command": "node",
      "args": [
        "C:\\path\\to\\open-dental-mcp\\mcp-openai-filesearch\\dist\\server-qdrant.js"
      ],
      "transport": "stdio",
      "description": "Qdrant-based MCP server for OpenDental docs."
    }
  }
}
```

#### macOS/Linux Configuration
```json
{
  "mcpServers": {
    "OpenDental-MCP": {
      "command": "/usr/local/bin/node",
      "args": [
        "/path/to/open-dental-mcp/mcp-openai-filesearch/dist/server-qdrant.js"
      ],
      "transport": "stdio",
      "description": "Qdrant-based MCP server for OpenDental docs."
    }
  }
}
```

### Notes for Client Configuration:

1. **Command Path**: 
   - For Windows, you can usually just use `"command": "node"` if Node.js is in your PATH
   - For macOS/Linux, use the full path to your Node.js binary (find it with `which node`)

2. **Server Path**: 
   - Make sure to point to `server-qdrant.js` in the `dist` directory
   - Use the correct path separator for your OS (`\\` for Windows, `/` for macOS/Linux)
   - Use absolute paths to avoid any confusion

3. **Verify Configuration**:
   - After creating the mcp.json file, ensure your MCP client can detect and connect to the server
   - If you're using Cursor, go to Settings > MCP and check if "OpenDental-MCP" appears in the list of available servers

## Running the MCP Server

From the root directory:

```bash
npm run start:qdrant    # Qdrant-based server
```

Or manually:

### Windows
```
cd mcp-openai-filesearch
npm run start:qdrant
```

### macOS/Linux
```bash
cd mcp-openai-filesearch
npm run start:qdrant
```

The server will start running on `http://localhost:3000`.

## Testing the Server

From the root directory:

```bash
npm run query:qdrant -- --query "How do I create an appointment in Open Dental?"
```

Or manually:

### Windows
```
cd mcp-openai-filesearch
npm run test:qdrant
```

### macOS/Linux
```bash
cd mcp-openai-filesearch
npm run test:qdrant
```

## Uploading Documentation

If you need to upload your own documentation to the Qdrant vector database:

1. Place your documentation files in a folder
2. Edit the upload script to point to your documentation folder
3. Run the setup script to create embeddings and upload them to Qdrant

## Troubleshooting

### Common Issues on Windows

1. **Path Errors**: Make sure to use the correct path format (e.g., `C:\path\to\file` or `C:/path/to/file`) in your configuration
2. **Permission Denied**: Run your command prompt or PowerShell as Administrator if you encounter permission issues
3. **NPM Errors**: Make sure your Node.js installation is up to date
4. **Port Already in Use**: If port 3000 or 6333 is already in use, check which process is using it and terminate that process

### Common Issues on macOS/Linux

1. **Permission Denied**: You may need to use `sudo` for some commands or fix file permissions with `chmod +x filename.py`
2. **Python Version**: Use `python3` explicitly rather than `python` if you have multiple versions installed
3. **Port Already in Use**: Check if port 3000 is already in use with `lsof -i :3000` and kill the process if needed
4. **Docker Issues**: If using Docker for Qdrant, make sure Docker is running and the Qdrant container is active

### API Key Issues

- Ensure your OpenAI API key is valid (it's still needed for generating embeddings)
- Make sure there are no extra spaces or characters in the `.env` file

## Getting Help

If you encounter issues not covered here, please:

1. Check the [Qdrant documentation](https://qdrant.tech/documentation/)
2. Check the OpenAI documentation for [embeddings](https://platform.openai.com/docs/guides/embeddings)
3. Create an issue in this repository
4. Contact the development team through your organization's support channels

## License

This project is proprietary and confidential.
