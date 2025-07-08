# Redmine MCP Server for Cline

This is a custom MCP (Model Context Protocol) server that integrates with Redmine, allowing you to interact with your Redmine projects and issues through the Cline VS Code extension.

## Prerequisites

*   **Node.js:** You need Node.js (version 18 or newer) installed on your system.
*   **Redmine Instance:** You need a running Redmine instance with the REST API enabled.
*   **Redmine API Key:** You need an API key for your Redmine user account. You can find this in your Redmine account settings (usually under "My Account" -> "API access key").
* **Cline:** You need the Cline VS Code extension installed and configured.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ilask/Redmine-MCP.git
    cd Redmine-MCP
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

1.  **Set environment variables:**
    Create a `.env` file in the root of the project directory and add the following, replacing the placeholders with your actual Redmine hostname and API key:

    ```
    REDMINE_HOST=your-redmine-host.com
    REDMINE_API_KEY=your-redmine-api-key
    ```
    **Important:** Do not commit your `.env` file to version control! It contains sensitive information. The `.gitignore` file included in this repository should prevent it from being committed.

## Adding to Cline

1.  **Open Cline Settings:** In VS Code, open the Cline extension and go to the MCP Server tab.
2.  **Edit MCP Settings:** Click "Edit MCP Settings" to open the `cline_mcp_settings.json` file.
3.  **Add the server:** Add the following entry to the `mcpServers` object, replacing the `args` path with the *absolute* path to the `server.js` file on your system:

    ```json
    {
      "mcpServers": {
        "redmine-server": {
          "command": "node",
          "args": ["C:\\Users\\yourusername\\path\\to\\Redmine-MCP\\server.js"],
          "disabled": false,
          "autoApprove": []
        }
      }
    }
    ```
    **Important:** Make sure to use double backslashes (`\\`) in the path on Windows.
4. **Save:** Save the `cline_mcp_settings.json` file. Cline should automatically detect the changes and start the server.

## Available Resources and Tools

### Resources

*   **`redmine://projects/{project_id}`:** This resource represents a Redmine project. Replace `{project_id}` with the actual ID of a project in your Redmine instance.  You can use the `access_mcp_resource` tool in Cline to read the details of a project.  For example:

    ```
    <access_mcp_resource>
    <server_name>redmine-server</server_name>
    <uri>redmine://projects/123</uri>
    </access_mcp_resource>
    ```
   (Replace `123` with a valid project ID). This will return the project details as JSON.

### Tools

*   **`create_issue`:** This tool allows you to create a new issue in Redmine. It takes the following parameters:
    *   `project_id` (string, required): The ID of the project where the issue should be created.
    *   `subject` (string, required): The subject of the issue.
    *   `description` (string, required): The description of the issue.

    You can use the `use_mcp_tool` tool in Cline to call this tool. For example:

    ```
    <use_mcp_tool>
    <server_name>redmine-server</server_name>
    <tool_name>create_issue</tool_name>
    <arguments>
    {
      "project_id": "456",
      "subject": "My New Issue",
      "description": "This is a test issue created via Cline."
    }
    </arguments>
    </use_mcp_tool>
    ```
    (Replace `456` with a valid project ID). This will create a new issue in the specified project and return the issue details as JSON.

## Troubleshooting
* **Connection closed error:** If you see an error like "MCP error -1: Connection closed", make sure that your `REDMINE_HOST` and `REDMINE_API_KEY` environment variables are correctly set. Also, ensure that your Redmine instance is accessible from your computer.
* **Check server logs:** If you encounter issues, check the server's output in the VS Code terminal for any error messages. The server logs errors to the console.
