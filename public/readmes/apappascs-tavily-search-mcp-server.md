# Tavily Search MCP Server

[![smithery badge](https://smithery.ai/badge/@apappascs/tavily-search-mcp-server)](https://smithery.ai/server/@apappascs/tavily-search-mcp-server)
An MCP server implementation that integrates the Tavily Search API, providing optimized search capabilities for LLMs.

<a href="https://glama.ai/mcp/servers/0kmdibf9t1"><img width="380" height="200" src="https://glama.ai/mcp/servers/0kmdibf9t1/badge" alt="tavily-search-mcp-server MCP server" /></a>

## Features

-   **Web Search:** Perform web searches optimized for LLMs, with control over search depth, topic, and time range.
-   **Content Extraction:** Extracts the most relevant content from search results, optimizing for quality and size.
-   **Optional Features:** Include images, image descriptions, short LLM-generated answers, and raw HTML content.
-   **Domain Filtering:** Include or exclude specific domains in search results.

## Tools

-   **tavily_search**
    -   Execute web searches using the Tavily Search API.
    -   Inputs:
        -   `query` (string, required): The search query.
        -   `search_depth` (string, optional): "basic" or "advanced" (default: "basic").
        -   `topic` (string, optional): "general" or "news" (default: "general").
        -   `days` (number, optional): Number of days back for news search (default: 3).
        -   `time_range` (string, optional): Time range filter ("day", "week", "month", "year" or "d", "w", "m", "y").
        -   `max_results` (number, optional): Maximum number of results (default: 5).
        -   `include_images` (boolean, optional): Include related images (default: false).
        -   `include_image_descriptions` (boolean, optional): Include descriptions for images (default: false).
        -   `include_answer` (boolean, optional): Include a short LLM-generated answer (default: false).
        -   `include_raw_content` (boolean, optional): Include raw HTML content (default: false).
        -   `include_domains` (string[], optional): Domains to include.
        -   `exclude_domains` (string[], optional): Domains to exclude.

## Setup Guide 🚀

### 1. Prerequisites

-   [Claude Desktop](https://claude.ai/desktop) installed on your computer.
-   A Tavily API key:
    a. Sign up for a [Tavily API account](https://tavily.com/).
    b. Choose a plan (Free tier available).
    c. Generate your API key from the Tavily dashboard.

### 2. Installation

1. Clone this repository somewhere on your computer:

    ```bash
    git clone https://github.com/apappascs/tavily-search-mcp-server.git 
    ```

2. Install dependencies & build the project:

    ```bash
    cd tavily-search-mcp-server
    ```
    ```bash
    npm install
    ```
    ```bash
    npm run build
    ```

### 3. Integration with Claude Desktop

1. Open your Claude Desktop configuration file:

    ```
    # On Mac:
    ~/Library/Application\ Support/Claude/claude_desktop_config.json

    # On Windows:
    %APPDATA%\Claude\claude_desktop_config.json
    ```

2. Add **one** of the following to the `mcpServers` object in your config, depending on whether you want to run the server using `npm` or `docker`:

   **Option A: Using NPM (stdio transport)**

    ```json
    {
        "mcpServers": {
            "tavily-search-server": {
                "command": "node",
                "args": [
                    "/Users/<username>/<FULL_PATH...>/tavily-search-mcp-server/dist/index.js"
                ],
                "env": {
                    "TAVILY_API_KEY": "your_api_key_here"
                }
            }
        }
    }
    ```

   **Option B: Using NPM (SSE transport)**

    ```json
    {
        "mcpServers": {
            "tavily-search-server": {
                "command": "node",
                "args": [
                    "/Users/<username>/<FULL_PATH...>/tavily-search-mcp-server/dist/sse.js"
                ],
                "env": {
                    "TAVILY_API_KEY": "your_api_key_here"
                },
                "port": 3001
            }
        }
    }
    ```

   **Option C: Using Docker**

    ```json
    {
        "mcpServers": {
            "tavily-search-server": {
                "command": "docker",
                "args": [
                    "run",
                    "-i",
                    "--rm",
                    "-e",
                    "TAVILY_API_KEY",
                    "-v",
                    "/Users/<username>/<FULL_PATH...>/tavily-search-mcp-server:/app",
                    "tavily-search-mcp-server"
                ],
                "env": {
                    "TAVILY_API_KEY": "your_api_key_here"
                }
            }
        }
    }
    ```

3. Important Steps:

    -   Replace `/Users/<username>/<FULL_PATH...>/tavily-search-mcp-server` with the actual full path to where you cloned the repository.
    -   Add your Tavily API key in the `env` section. **It's always better to have secrets like API keys as environment variables.**
    -   Make sure to use forward slashes (`/`) in the path, even on Windows.
    -   If you are using docker make sure you build the image first using `docker build -t tavily-search-mcp-server:latest .`

4. Restart Claude Desktop for the changes to take effect.

### Installing via Smithery

To install Tavily Search for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@apappascs/tavily-search-mcp-server):

```bash
npx -y @smithery/cli install @apappascs/tavily-search-mcp-server --client claude
```

## Environment Setup (for npm)

1. Copy `.env.example` to `.env`:

    ```bash
    cp .env.example .env
    ```

2. Update the `.env` file with your actual Tavily API key:

    ```env
    TAVILY_API_KEY=your_api_key_here
    ```

   Note: Never commit your actual API key to version control. The `.env` file is ignored by git for security reasons.

## Running with NPM
Start the server using Node.js:
```bash
node dist/index.js
```

For sse transport:
```bash
node dist/sse.js
```

## Running with Docker

1. Build the Docker image (if you haven't already):

    ```bash
    docker build -t tavily-search-mcp-server:latest .
    ```

2. Run the Docker container with:

   **For stdio transport:**

    ```bash
    docker run -it --rm -e TAVILY_API_KEY="your_api_key_here" tavily-search-mcp-server:latest
    ```

   **For sse transport:**

    ```bash
    docker run -it --rm -p 3001:3001 -e TAVILY_API_KEY="your_api_key_here" -e TRANSPORT="sse" tavily-search-mcp-server:latest
    ```
   **You can also leverage your shell's environment variables directly, which is a more secure practice:**
   ```bash
    docker run -it --rm -p 3001:3001 -e TAVILY_API_KEY=$TAVILY_API_KEY -e TRANSPORT="sse" tavily-search-mcp-server:latest
    ```
   **Note:** The second command demonstrates the recommended approach of using `-e TAVILY_API_KEY=$TAVILY_API_KEY` to pass the value of your `TAVILY_API_KEY` environment variable into the Docker container. This keeps your API key out of your command history, and it is generally preferred over hardcoding secrets in commands.


3. **Using docker compose**

   Run:

     ```bash
     docker compose up -d
     ```

   To stop the server:

    ```bash
    docker compose down
    ```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
