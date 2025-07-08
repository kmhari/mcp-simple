[![MseeP Badge](https://mseep.net/pr/kukapay-whoami-mcp-badge.jpg)](https://mseep.ai/app/kukapay-whoami-mcp)

# WhoAmI MCP Server

[![smithery badge](https://smithery.ai/badge/@kukapay/whoami-mcp)](https://smithery.ai/server/@kukapay/whoami-mcp)
A lightweight MCP server that tells you exactly who you are.

<a href="https://glama.ai/mcp/servers/@kukapay/whoami-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@kukapay/whoami-mcp/badge" alt="whoami-mcp MCP server" />
</a>

![GitHub License](https://img.shields.io/github/license/kukapay/whoami-mcp) 
![GitHub Last Commit](https://img.shields.io/github/last-commit/kukapay/whoami-mcp) 
![Python Version](https://img.shields.io/badge/python-3.10%2B-blue)


## Features
- Returns the system username as your name, your identity.
- Fast and synchronous execution, ideal for local LLM integration.

## Installation

### Installing via Smithery

To install WhoAmI for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@kukapay/whoami-mcp):

```bash
npx -y @smithery/cli install @kukapay/whoami-mcp --client claude
```

1. **Clone the Repository**
    ```bash
    git clone https://github.com/kukapay/whoami-mcp.git
    ```

2. **Client Configuration**

    ```json
    {
      "mcpServers": {
        "whoami": {
          "command": "uv",
          "args": ["--directory", "path/to/whoami_mcp", "run", "main.py"]
        }
      }
    }
    ````

## Usage

### MCP Tool
- **Name**: `whoami`
- **Description**: Retrieves the username of the current system user as your name.
- **Output**: your name.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
