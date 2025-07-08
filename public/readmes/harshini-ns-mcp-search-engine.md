# Calculator and Search Engine MCP Server

A comprehensive calculator and search engine implemented as a Model Context Protocol (MCP) server using TypeScript.

This server exposes a wide range of mathematical functions as MCP tools and aslo a search engine tool, allowing language models connected via MCP clients (like Claude for Desktop, Cursor, etc.) to perform calculations.

## Features

Provides MCP tools for:

*   **Basic Arithmetic:** Addition, Subtraction, Multiplication, Division
*   **Exponents & Roots:** Power (`^`), Square Root
*   **Trigonometry:** Sine, Cosine, Tangent (input in radians)
*   **Inverse Trigonometry:** Arcsine, Arccosine, Arctangent, Arctan2 (output in radians)
*   **Degree/Radian Conversion:** Convert between degrees and radians
*   **Logarithms:** Natural Log (ln), Base-10 Log (log10), Log with arbitrary base
*   **Constants:** Pi (π), Euler's number (e)
*   **Factorial:** `n!`
*   **Percentage:** Calculate percentage of a number
*   **Modulo:** Remainder operation
*   **Absolute Value:** `abs()`
*   **Rounding:** Floor, Ceiling, Round to nearest integer
*   **search_engine:** searches query using searXNG (an external API) 

## Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or higher recommended)
*   [npm](https://www.npmjs.com/) (usually included with Node.js)

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/harshini-ns/mcp-search-engine
    ```

2.  Navigate into the project directory:
    ```bash
    cd calculator-mcp-server
    ```

3.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Server

1.  Run the server:
    ```bash
    npm run start
    # OR directly using node:
    # node index.js
    ```

The server will start and listen for MCP connections via standard input/output (stdio). You should see a message like `Calculator MCP Server connected via stdio and ready.` printed to your terminal's *standard error*. Keep this terminal window open while using the server with Claude Desktop.

## Connecting to Clients (Claude Desktop Example)

This server communicates using the MCP stdio transport. To connect it to Claude for Desktop:

1.  **Find Claude Desktop's MCP Configuration File:**
    *   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
    *   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json` (You can paste this path into the File Explorer address bar).
    *   **Linux:** `~/.config/Claude/claude_desktop_config.json`
    *   If the file or the `Claude` directory doesn't exist, you might need to create it, or open Claude Desktop's Settings (`Claude Menu > Settings... > Developer > Edit Config`) which should create the file for you.

2.  **Edit the Configuration File:** Open the `claude_desktop_config.json` file in a text editor.

3.  **Add the Server Configuration:** Modify the file to include the `mcpServers` object with your calculator server entry. If the file was empty or didn't exist, its entire content should look like this:

    ```json
    {
      "mcpServers": {
        "calculator": {
          "command": "node",
          "args": [
            "/home/marco/code/calculator-mcp-server/index.js"
            // IMPORTANT: Replace this path with the ACTUAL ABSOLUTE PATH
          ]
        }
        // You can add other servers here under different keys, like:
        // "another_server": { ... }
      }
    }
    ```

    **Notes:**
    *   On Windows, use double backslashes (`\\`) for the path separators, e.g., `"C:\\Users\\YourUser\\path\\to\\calculator-mcp-server\\index.js"`.
    *   The key `"calculator"` is just a name you give this server connection within Claude's config; it can be anything descriptive.
    *   If the `mcpServers` object already exists, just add the `"calculator": { ... }` entry inside it, separated by a comma if other servers are present.

4.  **Restart Claude for Desktop:** Ensure Claude for Desktop is fully closed and reopened for the new configuration to take effect.

Claude for Desktop should now show the MCP tools icon (a hammer icon then, now its a settings slider/tune icon) and be able to use the calculator tools when you ask it to perform calculations or to use search engine.

## Read the Blog for this Repo:
https://medium.com/@harshininaveen9801/building-on-an-mcp-server-adding-a-custom-search-tool-to-a-github-project-52acb0ee0aff

## Watch the Recorded Demo Video:
https://youtu.be/h0jKkmJLHlE


