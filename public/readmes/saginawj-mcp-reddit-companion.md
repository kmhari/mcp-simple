[![smithery badge](https://smithery.ai/badge/@saginawj/mcp-reddit-companion)](https://smithery.ai/server/@saginawj/mcp-reddit-companion)

# MCP Reddit Companion

An MCP tool that enables natural language interaction with your personal Reddit experience. Create custom curated feeds on Reddit and use your favorite LLM client to analyze, summarize, and engage with content that matters to you.

## Example LLM Commands

Here are some example commands you can use with your LLM client:

```python
# Basic Feed Interaction
"Show me the latest posts from my 'tech-news' feed"
"Summarize the top posts from my 'science' feed"
"What are the trending topics in my 'programming' feed?"

# Content Analysis
"What are the common themes in my 'ai' feed?"
"Which of my recent posts got the most engagement?"
"Summarize the discussions in my 'philosophy' feed"

# Personal Activity
"Show me my recent Reddit activity"
"What comments have I received on my posts?"
"Are there any unread messages in my inbox?"

# Engagement Tracking
"How are my recent posts performing?"
"Show me the most active discussions in my feeds"
"What posts got the most comments in my 'news' feed?"
```

## Prerequisites

- Python 3.11+
- Reddit account credentials (username, password)
- Docker (optional, for containerized deployment)
- An MCP-compatible LLM client (like Cursor)

## Installation

### Local Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mcp-reddit.git
cd mcp-reddit
```

2. Install dependencies using uv:
```bash
uv pip install .
```

3. Create a `.env` file with your Reddit API credentials:
```env
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USERNAME=your_username
REDDIT_PASSWORD=your_password
```

### Docker Installation

1. Build the Docker image:
```bash
docker build -t mcp-reddit .
```

2. Run the container (for passwords with special characters):
```bash
docker run \
  -e REDDIT_CLIENT_ID='your_client_id' \
  -e REDDIT_CLIENT_SECRET='your_client_secret' \
  -e REDDIT_USERNAME='your_username' \
  -e REDDIT_PASSWORD='your_password' \
  mcp-reddit
```

Note: If your password contains special characters (like !, $, etc.), make sure to:
1. Use single quotes around the password
2. Escape any special characters with a backslash
3. Or use double quotes and escape the special characters

Example with special characters:
```bash
docker run \
  -e REDDIT_CLIENT_ID='your_client_id' \
  -e REDDIT_CLIENT_SECRET='your_client_secret' \
  -e REDDIT_USERNAME='your_username' \
  -e REDDIT_PASSWORD='your\!password' \
  mcp-reddit
```

## Usage

### Local Usage

1. Start the MCP server:
```bash
uv run mcp dev src/mcp_reddit_companion/server.py
```

or 

2. Install in Claude Desktop
```bash
uv run mcp install src/mcp_reddit_companion/server.py 
```

### Docker Usage

The MCP server will start automatically when the container runs. Connect your LLM client to interact with your Reddit feeds.

## Configuration

### Cursor Integration

To use with Cursor, add the following to your `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "reddit-companion": {
      "command": "uv",
      "args": [
        "--directory",
        "C:\\code\\personal\\mcp-reddit",
        "run",
        "mcp",
        "dev",
        "src/mcp_reddit_companion/server.py"
      ]
    }
  }
}
```

## License

MIT
