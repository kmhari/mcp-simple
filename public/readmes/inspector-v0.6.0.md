# MCP-Inspector-v0.6.0
# GitHub MCP Server

A Model Context Protocol (MCP) server that enables AI assistants like Claude to interact with GitHub repositories, issues, and pull requests.

## Features

- **Repository Search**: Find GitHub repositories based on search queries
- **Issue Management**: Get, create, and comment on issues
- **Pull Request Handling**: View and manage pull requests
- **Repository Analysis**: Get statistics and insights about repositories

## Installation

### Prerequisites

- Python 3.8+
- GitHub API token

### Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/github-mcp-server.git
   cd github-mcp-server
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your GitHub token as an environment variable:
   ```bash
   export GITHUB_TOKEN=your_github_token_here
   ```

4. Run the server:
   ```bash
   python server.py
   ```

The server will start running on `http://localhost:5000`.

## Usage

### Endpoints

The MCP server provides the following endpoints:

- **GET /mcp/discover**: Returns available operations and their parameters
- **POST /mcp/execute**: Executes operations based on provided parameters

### Example Requests

#### Discovery

```bash
curl -X GET http://localhost:5000/mcp/discover
```

#### Execute Repository Search

```bash
curl -X POST http://localhost:5000/mcp/execute \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "search_repositories",
    "parameters": {
      "query": "machine learning"
    }
  }'
```

#### Get Repository Issues

```bash
curl -X POST http://localhost:5000/mcp/execute \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "get_repo_issues",
    "parameters": {
      "owner": "openai",
      "repo": "whisper"
    }
  }'
```

## Architecture

The server follows the Model Context Protocol specification to allow AI assistants to:

1. Discover available operations
2. Execute operations with appropriate parameters
3. Process and return results in a structured format

## Extending the Server

You can extend this server by:

1. Adding new endpoints in the `discover()` function
2. Implementing corresponding handler functions
3. Updating the routing in the `execute()` function

## Security Considerations

- The server uses an API token for authentication with GitHub
- Implement rate limiting to prevent abuse
- Add input validation for all parameters
- Consider implementing OAuth for more secure token management

## Demo

See the [demo video](https://example.com/demo-video) for a walkthrough of the server's capabilities.

## License

MIT License

## Contact

For questions or support, please open an issue on this repository.
