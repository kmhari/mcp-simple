# MCP Web Snapshot

A Model Context Protocol (MCP) server that provides comprehensive website snapshot capabilities using [Playwright](https://playwright.dev). This server enables LLMs to capture and analyze web pages through structured accessibility snapshots, network monitoring, and console message collection.

## Key Features

- **🚀 Fast and lightweight**: Uses Playwright's accessibility tree for efficient snapshots
- **🎯 LLM-optimized**: Structured data output designed specifically for AI consumption
- **📊 Comprehensive monitoring**: Captures network requests, responses, and console messages
- **🔍 Element references**: Adds unique identifiers to interactive elements for precise targeting
- **🛡️ Production-ready**: Built-in error handling, resource limits, and timeout management
- **✅ Well-tested**: Comprehensive test suite with code coverage

## Requirements

- Python 3.11 or newer
- VS Code, Cursor, Windsurf, Claude Desktop or any other MCP client

## Getting Started

First, install the MCP Web Snapshot server with your client. A typical configuration looks like this:

```json
{
  "mcpServers": {
    "mcp-web-snapshot": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/mcp-web-snapshot",
        "run",
        "python",
        "src/server.py"
      ]
    }
  }
}
```

### Install in VS Code

You can install the MCP Web Snapshot server using the VS Code CLI:

```bash
# For VS Code
code --add-mcp '{"name":"mcp-web-snapshot","command":"uv","args":["--directory","/path/to/mcp-web-snapshot","run","python","src/server.py"]}'
```

After installation, the MCP Web Snapshot server will be available for use with your GitHub Copilot agent in VS Code.

### Install in Cursor

Go to `Cursor Settings` → `MCP` → `Add new MCP Server`. Name to your liking, use `command` type with the command `uv` and args `["--directory", "/path/to/mcp-web-snapshot", "run", "python", "src/server.py"]`.

```json
{
  "mcpServers": {
    "mcp-web-snapshot": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/mcp-web-snapshot",
        "run",
        "python",
        "src/server.py"
      ]
    }
  }
}
```

## Development Setup

### Local Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/mcp-web-snapshot.git
cd mcp-web-snapshot
```

2. Install dependencies using uv:

```bash
uv sync
```

3. Install Playwright browsers:

```bash
uv run playwright install
```

4. Run the server:

```bash
uv run python src/server.py
```

### Project Structure

```
├── src/
│   ├── server.py               # Main MCP server entry point
│   ├── registry.py             # Tool registration logic
│   └── tools/
│       ├── __init__.py
│       └── snapshot_url.py     # Web snapshot implementation
├── tests/                      # Test suite
│   ├── __init__.py
│   ├── test_snapshot_url.py    # Unit tests for website_snapshot
│   └── README.md               # Test documentation
├── pyproject.toml              # Project configuration
├── pytest.ini                  # Pytest configuration
├── uv.lock                     # Lock file for dependencies
└── README.md                   # This file
```

### Testing

The project includes a comprehensive test suite using pytest:

```bash
# Run all tests
uv run pytest

# Run with verbose output
uv run pytest -v

# Run with coverage report
PYTHONPATH=. uv run pytest --cov=src.tools.snapshot_url --cov-report=term-missing
```

Test coverage currently stands at 92%, covering:

- Successful snapshot capture and formatting
- Network request and console message monitoring
- URL validation
- Error handling and recovery

## Available Tools

### Website Snapshot

**Tool**: `website_snapshot`

**Description**: Take comprehensive snapshots of web pages with monitoring capabilities

**Parameters**:

- `target_url` (string): The URL to capture (must be a valid URL with protocol)

**Features**:

- 🎭 **Accessibility Snapshot**: Captures the complete accessibility tree structure
- 🌐 **Network Monitoring**: Records all network requests and responses during page load
- 🖥️ **Console Messages**: Captures client-side console output (logs, warnings, errors)
- 🎯 **Element References**: Adds unique reference IDs to interactive elements
- 📊 **Performance Metrics**: Provides summary of captured elements and network activity

**Example Usage**:

```python
# Through MCP client
result = await website_snapshot("https://example.com")
```

**Output Structure**:

```
✅ Captured snapshot with 25 elements, 12 requests, 0 console messages
🔍 Example Website - Home Page
📍 https://example.com

🎭 Accessibility Snapshot:
- navigation "Main":
  - link "Home": [ref=1]
  - link "About": [ref=2]
  - button "Contact" [ref=3]
- main:
  - heading "Welcome to Example"
  - link "Get Started": [ref=4]

🌐 Network Requests:
🌐 GET https://example.com
   Status: 200
   Response: <!DOCTYPE html><html>...

🖥️ Console:
No console messages

🎯 Element References:
[ref=1]: link "Home"
[ref=2]: link "About"
[ref=3]: button "Contact"
[ref=4]: link "Get Started"
```

## Configuration

The server can be configured through the `CONFIG` dictionary in `src/tools/snapshot_url.py`:

```python
CONFIG = {
    "viewport": {"width": 1920, "height": 1080},
    "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    "timeout": 15000,  # 15 seconds
}
```

### Customization Options

- **Viewport Size**: Adjust browser window dimensions
- **User Agent**: Customize browser identification
- **Timeout**: Control maximum wait time for page operations
- **Content Filtering**: Modify response body size limits and content type filters

## Use Cases

### LLM-Guided Testing

Capture comprehensive page state for automated test generation:

```
"Please take a snapshot of https://myapp.com/login and help me create Page Object Model classes based on the discovered elements and structure."
```

### Web Content Analysis

Extract structured data for content analysis and monitoring:

```
"Take a snapshot of https://competitor.com/pricing and analyze any pricing changes or new features compared to what we discussed last week."
```

### Accessibility Auditing

Leverage accessibility tree data for compliance checking:

```
"Please capture a snapshot of https://myapp.com and identify any accessibility issues or areas for improvement based on WCAG guidelines."
```

### API Integration Analysis

Monitor network activity to understand application behavior:

```
"Take a snapshot of https://dashboard.example.com after I log in and show me what API calls are being made so I can understand the data flow."
```

### Cross-Browser Testing Setup

Generate test scenarios based on captured interactions:

```
"Snapshot https://myapp.com/checkout and help me create comprehensive test cases that cover all the interactive elements and user workflows."
```

## Error Handling

The server includes comprehensive error handling:

- **Invalid URLs**: Returns helpful error messages for malformed URLs
- **Network Timeouts**: Configurable timeout limits with graceful fallbacks
- **Browser Crashes**: Automatic cleanup and resource management
- **Content Limits**: Smart filtering of large response bodies to prevent memory issues

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `uv run pytest`
5. Check test coverage: `PYTHONPATH=. uv run pytest --cov=src.tools.snapshot_url --cov-report=term-missing`
6. Ensure code style compliance: `uv run ruff check`
7. Submit a pull request

Please ensure all tests pass and maintain or improve the current test coverage.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [MCP Server Website Snapshot](https://www.linkedin.com/pulse/mcp-server-website-snapshot-gustavo-meilus-oiigf/) article
- Built on the foundation of [Microsoft's Playwright MCP](https://github.com/microsoft/playwright-mcp)
- Powered by [Playwright](https://playwright.dev) for reliable browser automation
- Uses [Model Context Protocol](https://modelcontextprotocol.io) for LLM integration

## Related Projects

- [Playwright MCP](https://github.com/microsoft/playwright-mcp) - Interactive browser automation MCP server
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk/) - MCP server python framework
