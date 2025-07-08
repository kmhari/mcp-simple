# playwright-server MCP server

\A MCP server with playwright tools\

<a href="https://glama.ai/mcp/servers/c50bsocgzb"><img width="380" height="200" src="https://glama.ai/mcp/servers/c50bsocgzb/badge" alt="Playwright Server MCP server" /></a>

## Components

### Resources

The server implements a simple note storage system with:
- Custom note:// URI scheme for accessing individual notes
- Each note resource has a name, description and text/plain mimetype

### Prompts

The server provides a single prompt:
- summarize-notes: Creates summaries of all stored notes
  - Optional "style" argument to control detail level (brief/detailed)
  - Generates prompt combining all current notes with style preference

### Tools

The server implements the following tools:
- `playwright_navigate`: Navigates to a specified URL. This operation will automatically create a new session if there is no active session.
  - Requires a `url` argument (string).
- `playwright_screenshot`: Takes a screenshot of the current page or a specific element.
  - Requires a `name` argument (string) for the screenshot file name.
  - Optional `selector` argument (string) to specify a CSS selector for the element to screenshot. If no selector is provided, a full-page screenshot is taken.
- `playwright_click`: Clicks an element on the page using a CSS selector.
  - Requires a `selector` argument (string) to specify the CSS selector for the element to click.
- `playwright_fill`: Fills out an input field.
  - Requires a `selector` argument (string) to specify the CSS selector for the input field.
  - Requires a `value` argument (string) to specify the value to fill.
- `playwright_evaluate`: Executes JavaScript code in the browser console.
  - Requires a `script` argument (string) to specify the JavaScript code to execute.
- `playwright_click_text`: Clicks an element on the page by its text content.
  - Requires a `text` argument (string) to specify the text content of the element to click.
- `playwright_get_text_content`: Get the text content of all visiable elements.
- `playwright_get_html_content`: Get the HTML content of the page.
  - Requires a `selector` argument (string) to specify the CSS selector for the element.

## Configuration

[TODO: Add configuration details specific to your implementation]

## Quickstart

### Install

#### Claude Desktop

On MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

<details>
  <summary>Development/Unpublished Servers Configuration</summary>
  ```
  "mcpServers": {
    "playwright-server": {
      "command": "uv",
      "args": [
        "--directory",
        "C:\Users\xxxxx\Documents\project\python\mcp\playwright-server",
        "run",
        "playwright-server"
      ]
    }
  }
  ```
</details>

<details>
  <summary>Published Servers Configuration</summary>
  ```
  "mcpServers": {
    "playwright-server": {
      "command": "uvx",
      "args": [
        "playwright-server"
      ]
    }
  }
  ```
</details>

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

### Debugging

Since MCP servers run over stdio, debugging can be challenging. For the best debugging
experience, we strongly recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).


You can launch the MCP Inspector via [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) with this command:

```bash
npx @modelcontextprotocol/inspector uv --directory C:\Users\YUNYING\Documents\project\python\mcp\playwright-server run playwright-server
```


Upon launching, the Inspector will display a URL that you can access in your browser to begin debugging.
