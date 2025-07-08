# ddg-mcp MCP server

DuckDuckGo search API MCP - A server that provides DuckDuckGo search capabilities through the Model Context Protocol.

## Components

### Prompts

The server provides the following prompts:
- **search-results-summary**: Creates a summary of DuckDuckGo search results
  - Required "query" argument for the search term
  - Optional "style" argument to control detail level (brief/detailed)

### Tools

The server implements the following DuckDuckGo search tools:

- **ddg-text-search**: Search the web for text results using DuckDuckGo
  - Required: "keywords" - Search query keywords
  - Optional: "region", "safesearch", "timelimit", "max_results"
  
- **ddg-image-search**: Search the web for images using DuckDuckGo
  - Required: "keywords" - Search query keywords
  - Optional: "region", "safesearch", "timelimit", "size", "color", "type_image", "layout", "license_image", "max_results"
  
- **ddg-news-search**: Search for news articles using DuckDuckGo
  - Required: "keywords" - Search query keywords
  - Optional: "region", "safesearch", "timelimit", "max_results"
  
- **ddg-video-search**: Search for videos using DuckDuckGo
  - Required: "keywords" - Search query keywords
  - Optional: "region", "safesearch", "timelimit", "resolution", "duration", "license_videos", "max_results"
  
- **ddg-ai-chat**: Chat with DuckDuckGo AI
  - Required: "keywords" - Message or question to send to the AI
  - Optional: "model" - AI model to use (options: "gpt-4o-mini", "llama-3.3-70b", "claude-3-haiku", "o3-mini", "mistral-small-3")

## Installation

### Prerequisites

- Python 3.9 or higher
- [uv](https://github.com/astral-sh/uv) (recommended) or pip

### Install from PyPI

```bash
# Using uv
uv install ddg-mcp

# Using pip
pip install ddg-mcp
```

### Install from Source

1. Clone the repository:
```bash
git clone https://github.com/misanthropic-ai/ddg-mcp.git
cd ddg-mcp
```

2. Install the package:
```bash
# Using uv
uv install -e .

# Using pip
pip install -e .
```

## Configuration

### Required Dependencies

The server requires the `duckduckgo-search` package, which will be installed automatically when you install `ddg-mcp`.

If you need to install it manually:
```bash
uv install duckduckgo-search
# or
pip install duckduckgo-search
```

## DuckDuckGo Search Parameters

### Common Parameters

These parameters are available for most search types:

- **region**: Region code for localized results (default: "wt-wt")
  - Examples: "us-en" (US English), "uk-en" (UK English), "ru-ru" (Russian)
  - See [DuckDuckGo regions](https://duckduckgo.com/params) for more options

- **safesearch**: Content filtering level (default: "moderate")
  - "on": Strict filtering
  - "moderate": Moderate filtering
  - "off": No filtering

- **timelimit**: Time range for results
  - "d": Last day
  - "w": Last week
  - "m": Last month
  - "y": Last year (not available for news/videos)

- **max_results**: Maximum number of results to return (default: 10)

### Search Operators

You can use these operators in your search keywords:

- `cats dogs`: Results about cats or dogs
- `"cats and dogs"`: Results for exact term "cats and dogs"
- `cats -dogs`: Fewer dogs in results
- `cats +dogs`: More dogs in results
- `cats filetype:pdf`: PDFs about cats (supported: pdf, doc(x), xls(x), ppt(x), html)
- `dogs site:example.com`: Pages about dogs from example.com
- `cats -site:example.com`: Pages about cats, excluding example.com
- `intitle:dogs`: Page title includes the word "dogs"
- `inurl:cats`: Page URL includes the word "cats"

### Image Search Specific Parameters

- **size**: "Small", "Medium", "Large", "Wallpaper"
- **color**: "color", "Monochrome", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Brown", "Black", "Gray", "Teal", "White"
- **type_image**: "photo", "clipart", "gif", "transparent", "line"
- **layout**: "Square", "Tall", "Wide"
- **license_image**: "any", "Public", "Share", "ShareCommercially", "Modify", "ModifyCommercially"

### Video Search Specific Parameters

- **resolution**: "high", "standard"
- **duration**: "short", "medium", "long"
- **license_videos**: "creativeCommon", "youtube"

### AI Chat Models

- **gpt-4o-mini**: OpenAI's GPT-4o mini model
- **llama-3.3-70b**: Meta's Llama 3.3 70B model
- **claude-3-haiku**: Anthropic's Claude 3 Haiku model
- **o3-mini**: OpenAI's O3 mini model
- **mistral-small-3**: Mistral AI's small model

## Quickstart

### Install

#### Claude Desktop

On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

<details>
  <summary>Development/Unpublished Servers Configuration</summary>
  ```
  "mcpServers": {
    "ddg-mcp": {
      "command": "uv",
      "args": [
        "--directory",
        "/Users/shannon/Workspace/artivus/ddg-mcp",
        "run",
        "ddg-mcp"
      ]
    }
  }
  ```
</details>

<details>
  <summary>Published Servers Configuration</summary>
  ```
  "mcpServers": {
    "ddg-mcp": {
      "command": "uvx",
      "args": [
        "ddg-mcp"
      ]
    }
  }
  ```
</details>

## Usage Examples

### Text Search

```
Use the ddg-text-search tool to search for "climate change solutions"
```

Advanced example:
```
Use the ddg-text-search tool to search for "renewable energy filetype:pdf site:edu" with region "us-en", safesearch "off", timelimit "y", and max_results 20
```

### Image Search

```
Use the ddg-image-search tool to find images of "renewable energy" with color set to "Green"
```

Advanced example:
```
Use the ddg-image-search tool to find images of "mountain landscape" with size "Large", color "Blue", type_image "photo", layout "Wide", and license_image "Public"
```

### News Search

```
Use the ddg-news-search tool to find recent news about "artificial intelligence" from the last day
```

Advanced example:
```
Use the ddg-news-search tool to search for "space exploration" with region "uk-en", timelimit "w", and max_results 15
```

### Video Search

```
Use the ddg-video-search tool to find videos about "machine learning tutorials" with duration set to "medium"
```

Advanced example:
```
Use the ddg-video-search tool to search for "cooking recipes" with resolution "high", duration "short", license_videos "creativeCommon", and max_results 10
```

### AI Chat

```
Use the ddg-ai-chat tool to ask "What are the latest developments in quantum computing?" using the claude-3-haiku model
```

### Search Results Summary

```
Use the search-results-summary prompt with query "space exploration" and style "detailed"
```

## Claude config
"ddg-mcp": {
      "command": "uv",
      "args": [
        "--directory",
        "/PATH/TO/YOUR/INSTALLATION/ddg-mcp",
        "run",
        "ddg-mcp"
      ]
  },

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

### Automated Publishing with GitHub Actions

This repository includes a GitHub Actions workflow for automated publishing to PyPI. The workflow is triggered when:

1. A new GitHub Release is created
2. The workflow is manually triggered via the GitHub Actions interface

To set up automated publishing:

1. Generate a PyPI API token:
   - Go to https://pypi.org/manage/account/token/
   - Create a new token with scope limited to the `ddg-mcp` project
   - Copy the token value (you'll only see it once)

2. Add the token to your GitHub repository secrets:
   - Go to your repository on GitHub
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `PYPI_API_TOKEN`
   - Value: Paste your PyPI token
   - Click "Add secret"

3. To publish a new version:
   - Update the version number in `pyproject.toml`
   - Create a new release on GitHub or manually trigger the workflow

### Debugging

Since MCP servers run over stdio, debugging can be challenging. For the best debugging
experience, we strongly recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).


You can launch the MCP Inspector via [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) with this command:

```bash
npx @modelcontextprotocol/inspector uv --directory /path/to/your/ddg-mcp run ddg-mcp
```


Upon launching, the Inspector will display a URL that you can access in your browser to begin debugging.
