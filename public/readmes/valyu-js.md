# Valyu MCP Server

A Model Context Protocol server that provides access to Valyu's knowledge retrieval and feedback APIs. This server enables LLMs to search proprietary and web sources for information and submit feedback on transactions.

### Available Tools

- `knowledge` - Search proprietary and/or web sources for information
  - Required arguments:
    - `query` (string): The question or topic to search for
    - `search_type` (string): Type of sources to search ("proprietary", "web", or "all")
    - `max_price` (number): Maximum allowed price per thousand queries (CPM)
  - Optional arguments:
    - `data_sources` (string[]): List of index names to search over
    - `max_num_results` (integer): Number of results returned after reranking
    - `similarity_threshold` (number): Minimum similarity score for included results
    - `query_rewrite` (boolean): Whether to rewrite the query for better performance

- `feedback` - Submit user feedback for a transaction
  - Required arguments:
    - `tx_id` (string): Transaction ID to provide feedback for
    - `feedback` (string): User feedback text
    - `sentiment` (string): Sentiment rating ("very good", "good", "bad", "very bad")

## Installation

### Using Docker

```bash
docker pull ghcr.io/tiovikram/valyu-mcp-server
docker run -i --rm -e VALYU_API_KEY=your-api-key ghcr.io/tiovikram/valyu-mcp-server
```

## Configuration

### Environment Variables

- `VALYU_API_KEY` (required): Your Valyu API key

### Configure for Claude.app

Add to your Claude settings:

<summary>Using Docker</summary>

```json
"mcpServers": {
  "valyu": {
    "command": "docker",
    "args": ["run", "--pull", "--rm", "-i", "-e", "VALYU_API_KEY", "ghcr.io/tiovikram/valyu-mcp-server"],
    "env": {
      "VALYU_API_KEY": "<your-valyu-api-key>"
    }
  }
}
```
## Example Interactions

1. Knowledge search:
```json
{
  "name": "knowledge",
  "arguments": {
    "query": "What is quantum computing?",
    "search_type": "all",
    "max_price": 0.5,
    "data_sources": ["valyu/valyu-arxiv", "valyu/valyu-wikipedia"],
    "max_num_results": 5
  }
}
```

2. Submit feedback:
```json
{
  "name": "feedback",
  "arguments": {
    "tx_id": "12345abcdef",
    "feedback": "The information was very helpful and accurate.",
    "sentiment": "very good"
  }
}
```

## Debugging

You can use the MCP inspector to debug the server:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

## Examples of Questions for Claude

1. "Can you search for information about artificial intelligence in medicine?"
2. "I'd like to learn about sustainable energy solutions. Can you search for that?"
3. "Please help me submit feedback for my transaction with ID TX123456."
4. "Find me the latest research on climate change adaptation strategies."
