# Mermaid CLI MCP Server

A Model Context Protocol (MCP) server that generates PNG images from Mermaid markdown code using the official `@mermaid-js/mermaid-cli`.

## Features

This server provides one tool:

### Tools

-   **`generate_image`**: Generates a PNG image from Mermaid markdown.
    -   **Input Parameters:**
        -   `code` (string, required): The Mermaid markdown code to render.
        -   `name` (string, required): The base name for the output PNG file (without the `.png` extension).
        -   `folder` (string, optional): The absolute path to the directory where the image should be saved. If not provided, the image will be saved in the same directory where the server script (`index.js`) is located.
    -   **Output:** A text message indicating the path where the image was successfully generated, or an error message if generation failed.

## Demo

Here's an example of generating a simple flowchart:

**Mermaid Code:**

```
graph TD
    A[Start] --> B{Is it Friday?};
    B -- Yes --> C[Good!];
    B -- No --> D[Wait...];
    C --> E[End];
    D --> E;
```

**Generated Image (`docs/demo.png`):**

![Demo Flowchart](docs/demo.png)

## Prerequisites

-   **Node.js and npm:** Required to install dependencies and run the server.
-   **Puppeteer-compatible Browser:** `@mermaid-js/mermaid-cli` uses Puppeteer internally, which requires a compatible browser installation (like Chrome, Chromium, or Chrome for Testing). The server needs the path to the browser executable.

## Installation

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/Ryuhei-So/mermaid-cli-server.git
    cd mermaid-cli-server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Build the server:**
    ```bash
    npm run build
    ```
    This compiles the TypeScript code into JavaScript in the `build` directory.

## Configuration

This server requires the path to a Puppeteer-compatible browser executable. You need to set the `PUPPETEER_EXECUTABLE_PATH` environment variable when configuring this server in your MCP client (e.g., Cursor, Claude Desktop).

**Example MCP Client Configuration (`coolcline_mcp_settings.json` or similar):**

```json
{
  "mcpServers": {
    "mermaid-cli": { // Choose a name for the server instance
      "command": "node", // Or the direct path to node if needed
      "args": ["/path/to/mermaid-cli-server/build/index.js"], // Absolute path to the built server script
      "env": {
        "PUPPETEER_EXECUTABLE_PATH": "/path/to/your/chrome/executable" // IMPORTANT: Set the correct absolute path to your Chrome/Chromium executable
      },
      "disabled": false,
      "alwaysAllow": []
    }
    // ... other server configurations
  }
}
```

**Finding the Browser Path:**

-   **macOS (Chrome for Testing example):** `/Users/your_user/.cache/puppeteer/chrome/mac-XXX.X.XXXX.XX/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing` (Replace `your_user` and version number)
-   **macOS (Standard Chrome):** `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
-   **Windows:** Might be something like `C:\Program Files\Google\Chrome\Application\chrome.exe`
-   **Linux:** Might be `/usr/bin/google-chrome` or similar.

You might need to install Chrome for Testing specifically if Puppeteer requires it: `npx @puppeteer/browsers install chrome@stable`

## Development

-   **Build:** `npm run build` (Compiles TypeScript)
-   **Watch Mode:** `npm run watch` (Automatically recompiles on changes)
-   **MCP Inspector:** `npm run inspector` (Runs the server with a debugging interface)
