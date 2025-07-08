# Cloud browser MCP Server

## Test

1. Run `npm install` to install the necessary dependencies, then run `npm run build` to get `dist/index.js`.
2. Run `npm run inspector` to start the server.

## Get Started

1. Run `npm install` to install the necessary dependencies, then run `npm run build` to get `dist/index.js`.

2. Set up your Claude Desktop configuration to use the server.  

```json
{
  "mcpServers": {
    "cloudbrowser": {
      "command": "node",
      "args": ["path/to/mcp-server-cloudbrowser/cloudbrowser/dist/index.js"],
      "env": {
        "API_KEY": "<YOUR_BROWSERBASE_API_KEY>"
      },
      "transportType": "stdio"
    }
  }
}
```

3. Restart your Claude Desktop app and you should see the tools available clicking the 🔨 icon.

4. Start using the tools! Below is an image of Claude closing a browser session.

### Using npm

```json
{
  "mcpServers": {
    "cloudbrowser": {
      "command": "cmd",
      "args": [
        "/c", 
        "npx", 
        "-y", 
        "@browsercloud/mcp-server-cloudbrowser"
      ],
      "env": {
        "API_KEY": "<YOUR_BROWSERBASE_API_KEY>"
      },
      "transportType": "stdio"
    }
  }
}
```

## Tools

### Browserbase API

- **cloudbrowser_navigate**

  - Navigate to any URL in the browser
  - Input: `url` (string)

- **cloudbrowser_evaluate**

  - Execute JavaScript in the browser console
  - Input: `script` (string): JavaScript code to execute

- **cloudbrowser_get_current_url**

  - Retrieve the current URL of the browser page

- **cloudbrowser_screenshot**

  - Capture screenshots of the entire page or specific elements
  - Inputs:
    - `name` (string, required): Name for the screenshot
    - `selector` (string, optional): CSS selector for element to screenshot
    - `width` (number, optional, default: 800): Screenshot width
    - `height` (number, optional, default: 600): Screenshot height

- **cloudbrowser_click**

  - Click elements on the page
  - Input: `selector` (string): CSS selector for element to click

- **cloudbrowser_fill**

  - Fill out input fields
  - Inputs:
    - `selector` (string): CSS selector for input field
    - `value` (string): Value to fill

- **cloudbrowser_get_text**

  - Extract all content from the current page
  - Input: `selector` (string, optional): CSS selector to get content from specific elements

### Resources

The server provides access to two types of resources:

2. **Screenshots** (`screenshot://<name>`)
   - PNG images of captured screenshots
   - Accessible via the screenshot name specified during capture
