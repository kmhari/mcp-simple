# JobNimbus MCP Server

This project provides a [Model Context Protocol (MCP)](https://docs.cursor.com/context/model-context-protocol) server for interacting with the JobNimbus API via compatible AI assistants like Cursor and Claude.

It allows AI agents to access and manipulate JobNimbus data (Contacts, Jobs, Tasks, Products, Workflows, Invoices) through standardized tools, using your JobNimbus API key for secure access.

This server is published on npm and can be easily run using `npx`.

## Setup Instructions

Follow the instructions below for your specific AI assistant.

### Setup for Cursor Editor

1.  **Prerequisites:**
    *   Cursor Editor installed.
    *   Node.js and npm installed (required for `npx`).
    *   Your JobNimbus API Key.

2.  **Configure Cursor:**
    *   Create the directory `~/.cursor` in your home directory if it doesn't exist.
    *   Create a file named `mcp.json` inside this directory (`~/.cursor/mcp.json`).
    *   Copy the following configuration into `~/.cursor/mcp.json`:

        ```json
        {
          "mcpServers": {
            "jobnimbus-local-server": {
              "description": "JobNimbus MCP Server (requires API key)",
              "command": "npx",
              "args": ["jobnimbus-mcp-server"],
              "env": {
                "JOBNIMBUS_API_KEY": "your_api_key_here"
              }
            }
          }
        }
        ```

    *   **IMPORTANT:** Replace `"your_api_key_here"` inside the file with your **actual JobNimbus API Key**.

3.  **Restart Cursor:**
    *   Completely quit and restart the Cursor editor.

4.  **Verify:**
    *   Cursor will automatically run the server using `npx` when needed.
    *   You should see `jobnimbus-local-server` listed under available tools in Cursor's MCP settings or when the agent suggests tools.
    *   You can now ask Cursor to perform actions using the JobNimbus tools (e.g., "List my JobNimbus contacts using jobnimbus_list_contacts").

### Setup for Claude Desktop App

1.  **Prerequisites:**
    *   Claude Desktop App installed.
    *   Node.js and npm installed (required for `npx`).
    *   Your JobNimbus API Key.

2.  **Configure Claude:**
    *   Locate the Claude configuration file:
        *   On Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
        *   On Windows: `%APPDATA%\Claude\claude_desktop_config.json`
    *   Create the file if it doesn't exist. If it exists, carefully merge the `mcpServers` section.
    *   Add the following configuration:

        ```json
        {
          "mcpServers": {
            "jobnimbus-local-server": {
              "description": "JobNimbus MCP Server (requires API key)",
              "command": "npx",
              "args": ["jobnimbus-mcp-server"],
              "env": {
                "JOBNIMBUS_API_KEY": "your_api_key_here"
              }
            }
          }
        }
        ```

    *   **IMPORTANT:** Replace `"your_api_key_here"` inside the file with your **actual JobNimbus API Key**.

3.  **Restart Claude App:**
    *   Completely quit and restart the Claude desktop application.

4.  **Verify:**
    *   Claude should now be able to discover and use the JobNimbus tools provided by the server.

**How it works (for both assistants):**

*   The configuration tells the assistant to use `npx` to run `jobnimbus-mcp-server`.
*   `npx` automatically downloads the latest version of the server package from npm if it's not already cached.
*   The assistant injects your API key from the `env` section into the server process.

## Running Manually (Advanced / Other Clients)

If you need to run the server manually for debugging or for use with other potential MCP clients supporting stdio:

1.  Set the API key environment variable:
    ```bash
    export JOBNIMBUS_API_KEY=your_actual_api_key_here
    ```
2.  Run the server:
    ```bash
    npx jobnimbus-mcp-server
    ```
    The server will listen for MCP communication over stdin/stdout.

## Implemented Tools

This server implements MCP tools corresponding to the JobNimbus API endpoints:

### Contacts
* `jobnimbus_list_contacts`: Get a list of contacts with optional filtering
* `jobnimbus_get_contact`: Get a specific contact by ID
* `jobnimbus_create_contact`: Create a new contact
* `jobnimbus_update_contact`: Update an existing contact

### Jobs
* `jobnimbus_list_jobs`: Get a list of jobs with optional filtering
* `jobnimbus_get_job`: Get a specific job by ID
* `jobnimbus_create_job`: Create a new job
* `jobnimbus_update_job`: Update an existing job

### Tasks
* `jobnimbus_list_tasks`: Get a list of tasks with optional filtering
* `jobnimbus_get_task`: Get a specific task by ID
* `jobnimbus_create_task`: Create a new task
* `jobnimbus_update_task`: Update an existing task

### Products
* `jobnimbus_list_products`: Get a list of products with optional filtering
* `jobnimbus_get_product`: Get a specific product by ID
* `jobnimbus_create_product`: Create a new product
* `jobnimbus_update_product`: Update an existing product

### Workflows
* `jobnimbus_get_all_workflows`: Get all workflows and their statuses
* `jobnimbus_create_workflow`: Create a new workflow
* `jobnimbus_create_workflow_status`: Create a new workflow status

### Invoices
* `jobnimbus_list_invoices`: Get a list of invoices with optional filtering
* `jobnimbus_get_invoice`: Get a specific invoice by ID
* `jobnimbus_create_invoice`: Create a new invoice
* `jobnimbus_update_invoice`: Update an existing invoice
* `jobnimbus_send_invoice`: Send an invoice via email
* `jobnimbus_record_invoice_payment`: Record a payment against an invoice

## Development

If you want to contribute or modify the server:

1.  Clone the repository: `git clone <repository_url>`
2.  Install dependencies: `cd jobnimbus-mcp-server && npm install`
3.  Make changes in the `src/` directory.
4.  Build: `npm run build`
5.  Test locally (requires `.env` file or exported API key):
    *   Run directly: `npm start`
    *   Run with auto-reload: `npm run dev`
    *   Link for global testing: `npm link` (remember to `npm unlink -g jobnimbus-mcp-server` when done)

## License

MIT 