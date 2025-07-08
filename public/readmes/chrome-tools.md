# Chrome Tools MCP Server

An MCP server that provides tools for interacting with Chrome through its DevTools Protocol. This server enables remote control of Chrome tabs, including executing JavaScript, capturing screenshots, monitoring network traffic, and more.

## Why use an MCP server like this?
This type of MCP Server is useful When you need to manually configure your browser to be in a certain state before you let an AI tool like Cline poke at it. You can also use this tool to listen to and pull network events into its context. 

## Features

- List Chrome tabs
- Execute JavaScript in tabs
- Capture screenshots
- Monitor network traffic
- Navigate tabs to URLs
- Query DOM elements
- Click elements with console output capture

## Installation

```bash
npm install @nicholmikey/chrome-tools
```

## Configuration

The server can be configured through environment variables in your MCP settings:

```json
{
  "chrome-tools": {
    "command": "node",
    "args": ["path/to/chrome-tools/dist/index.js"],
    "env": {
      "CHROME_DEBUG_URL": "http://localhost:9222",
      "CHROME_CONNECTION_TYPE": "direct",
      "CHROME_ERROR_HELP": "custom error message"
    }
  }
}
```

### Environment Variables

- `CHROME_DEBUG_URL`: The URL where Chrome's remote debugging interface is available (default: http://localhost:9222)
- `CHROME_CONNECTION_TYPE`: Connection type identifier for logging (e.g., "direct", "ssh-tunnel", "docker")
- `CHROME_ERROR_HELP`: Custom error message shown when connection fails

## Setup Guide

### Native Setup (Windows/Mac/Linux)

1. Launch Chrome with remote debugging enabled:
   ```bash
   # Windows
   "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222

   # Mac
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222

   # Linux
   google-chrome --remote-debugging-port=9222
   ```

2. Configure MCP settings:
   ```json
   {
     "env": {
       "CHROME_DEBUG_URL": "http://localhost:9222",
       "CHROME_CONNECTION_TYPE": "direct"
     }
   }
   ```

### WSL Setup

When running in WSL, you'll need to set up an SSH tunnel to connect to Chrome running on Windows:

1. Launch Chrome on Windows with remote debugging enabled
2. Create an SSH tunnel:
   ```bash
   ssh -N -L 9222:localhost:9222 windowsuser@host
   ```
3. Configure MCP settings:
   ```json
   {
     "env": {
       "CHROME_DEBUG_URL": "http://localhost:9222",
       "CHROME_CONNECTION_TYPE": "ssh-tunnel",
       "CHROME_ERROR_HELP": "Make sure the SSH tunnel is running: ssh -N -L 9222:localhost:9222 windowsuser@host"
     }
   }
   ```

### Docker Setup

When running Chrome in Docker:

1. Launch Chrome container:
   ```bash
   docker run -d --name chrome -p 9222:9222 chromedp/headless-shell
   ```

2. Configure MCP settings:
   ```json
   {
     "env": {
       "CHROME_DEBUG_URL": "http://localhost:9222",
       "CHROME_CONNECTION_TYPE": "docker"
     }
   }
   ```

## Tools

### list_tabs
Lists all available Chrome tabs.

### execute_script
Executes JavaScript code in a specified tab.
Parameters:
- `tabId`: ID of the Chrome tab
- `script`: JavaScript code to execute

### capture_screenshot
Captures a screenshot of a specified tab, automatically optimizing it for AI model consumption.
Parameters:
- `tabId`: ID of the Chrome tab
- `format`: Image format (jpeg/png) - Note: This is only for initial capture. Final output uses WebP with PNG fallback
- `quality`: JPEG quality (1-100) - Note: For initial capture only
- `fullPage`: Capture full scrollable page

Image Processing:
1. WebP Optimization (Primary Format):
   - First attempt: WebP with quality 80 and high compression effort
   - Second attempt: WebP with quality 60 and near-lossless compression if first attempt exceeds 1MB
2. PNG Fallback:
   - Only used if WebP processing fails
   - Includes maximum compression and color palette optimization
3. Size Constraints:
   - Maximum dimensions: 900x600 (maintains aspect ratio)
   - Maximum file size: 1MB
   - Progressive size reduction if needed

### capture_network_events
Monitors and captures network events from a specified tab.
Parameters:
- `tabId`: ID of the Chrome tab
- `duration`: Duration in seconds to capture
- `filters`: Optional type and URL pattern filters

### load_url
Navigates a tab to a specified URL.
Parameters:
- `tabId`: ID of the Chrome tab
- `url`: URL to load

### query_dom_elements
Queries and retrieves detailed information about DOM elements matching a CSS selector.
Parameters:
- `tabId`: ID of the Chrome tab
- `selector`: CSS selector to find elements
Returns:
- Array of DOM elements with properties including:
  - `nodeId`: Unique identifier for the node
  - `tagName`: HTML tag name
  - `textContent`: Text content of the element
  - `attributes`: Object containing all element attributes
  - `boundingBox`: Position and dimensions of the element
  - `isVisible`: Whether the element is visible
  - `ariaAttributes`: ARIA attributes for accessibility

### click_element
Clicks on a DOM element and captures any console output triggered by the click.
Parameters:
- `tabId`: ID of the Chrome tab
- `selector`: CSS selector to find the element to click
Returns:
- Object containing:
  - `message`: Success/failure message
  - `consoleOutput`: Array of console messages triggered by the click

## License

MIT
