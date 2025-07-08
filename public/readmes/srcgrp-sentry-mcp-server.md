# Sentry MCP Server

**Integrate Sentry error tracking directly into your development workflow with this Model Context Protocol (MCP) server.**

Gain insights into your application's stability by accessing Sentry release health data and issue details without leaving your MCP-enabled environment (like VS Code with the Cline extension).

## Key Features
- **Release Monitoring:** List recent releases and view their associated new issue counts.
- **Release Health:** Get detailed statistics for specific releases, including crash-free rates and session counts.
- **Issue Investigation:** Fetch detailed information about specific Sentry issues by their ID.
- **Targeted Issue Listing:** Retrieve all issues associated with a particular release version.
- **Flexible Connection:** Works with both Sentry.io (cloud) and self-hosted Sentry instances.
- **Server Inspection:** Includes a tool to verify configuration and server status.

## Setup

1.  **Clone the Repository:**
    Clone this repository to your local machine:
    ```bash
    git clone https://github.com/srcgrp/sentry-mcp-server.git
    cd sentry-mcp-server
    ```

2.  **Install Dependencies & Build:**
    Install the necessary dependencies and build the server:
    ```bash
    npm install
    npm run build 
    ```
    This will create the executable server script in the `build/` directory.

3.  **Configure MCP Client:**
    Add the server to your MCP client's configuration file (e.g., `cline_mcp_settings.json` for Cline). **Make sure to use the absolute path** to the built `index.js` file:

    ```json
    {
      "mcpServers": {
        "sentry-local": { // You can choose any name here
          "command": "node", 
          "args": [
            "/path/to/your/cloned/sentry-mcp-server/build/index.js" // <-- IMPORTANT: Use absolute path here
          ],
          "env": {
            // Environment variables can be set here OR loaded from a .env file (see next step)
          },
          "disabled": false, // Ensure it's enabled
          "autoApprove": [] 
        }
        // ... other servers
      }
    }
    ```
    *Restart your MCP client (e.g., reload VS Code) after modifying the settings.*

4.  **Create `.env` File:**
    In the **root directory of the cloned `sentry-mcp-server` project**, create a `.env` file with the following required variables:

    ```dotenv
    # Required Sentry Credentials & Configuration
    SENTRY_AUTH_TOKEN="YOUR_SENTRY_AUTH_TOKEN"  # Generate from Sentry > User Settings > API Keys
    SENTRY_BASE_URL="YOUR_SENTRY_API_ENDPOINT" # e.g., https://sentry.io/api/0/ or https://your-sentry-instance.com/api/0/
    SENTRY_ORG_SLUG="your-organization-slug"   # Your Sentry organization slug
    ```
    *Replace the placeholder values with your actual Sentry details.*

## Configuration Details
The server relies on these environment variables (typically set in the `.env` file):

-   **`SENTRY_AUTH_TOKEN` (Required):** Your Sentry API authentication token. Grants the server permission to access your Sentry data.
-   **`SENTRY_BASE_URL` (Required):** The base URL for the Sentry API. For Sentry.io cloud users, this is usually `https://sentry.io/api/0/`. For self-hosted instances, use your instance's API endpoint.
-   **`SENTRY_ORG_SLUG` (Required):** The unique identifier (slug) for your organization within Sentry. This is used as the default organization for API calls unless overridden in specific tool arguments.

## Available Tools

Here's a breakdown of the tools provided by this server, along with usage examples:

### 1. `inspect_sentry`

*   **Description:** Inspects the server's current configuration, verifies the connection to Sentry (using the provided token and URL), lists available capabilities, and shows basic environment details. Useful for debugging setup issues.
*   **Input Schema:** None (no arguments required).
*   **Example Usage (MCP Client):**
    ```json
    {
      "tool_name": "inspect_sentry",
      "arguments": {}
    }
    ```
*   **Example Output:**
    ```json
    {
      "configuration": {
        "baseUrl": "https://sentry.io/api/0/",
        "authTokenConfigured": true,
        "defaultOrg": "your-organization-slug"
      },
      "capabilities": [
        "list_recent_releases",
        "get_releases",
        "get_release_health",
        "get_issue",
        "get_release_issues"
        // inspect_sentry is excluded from this list
      ],
      "environment": {
        "nodeVersion": "v18.12.0",
        "platform": "linux",
        "memoryUsage": { /* ... */ }
      }
    }
    ```

### 2. `list_recent_releases`

*   **Description:** Retrieves a list of the most recent releases for a specified project, sorted by date (newest first). Includes the number of new issues introduced in each release.
*   **Input Schema:**
    *   `project_slug` (string, required): The slug of the Sentry project.
    *   `org_slug` (string, optional): The organization slug. Defaults to `SENTRY_ORG_SLUG` from your `.env`.
    *   `count` (number, optional): The maximum number of releases to return. Defaults to 5.
*   **Example Usage (MCP Client):**
    ```json
    {
      "tool_name": "list_recent_releases",
      "arguments": {
        "project_slug": "your-frontend-project",
        "count": 3 
      }
    }
    ```
*   **Example Output:**
    ```json
    [
      {
        "version": "frontend@2.5.1",
        "date": "2023-10-27T10:30:00Z",
        "new_issues": 2,
        "type": "desktop" 
      },
      {
        "version": "frontend@2.5.0",
        "date": "2023-10-26T15:00:00Z",
        "new_issues": 0,
        "type": "desktop"
      },
      {
        "version": "mobile-app@1.2.0-beta",
        "date": "2023-10-25T09:00:00Z",
        "new_issues": 5,
        "type": "mobile" 
      }
    ]
    ```

### 3. `get_releases`

*   **Description:** Fetches all releases for a project, sorted by date (newest first).
*   **Input Schema:**
    *   `project_slug` (string, required): The slug of the Sentry project.
    *   `org_slug` (string, optional): The organization slug. Defaults to `SENTRY_ORG_SLUG`.
*   **Example Usage (MCP Client):**
    ```json
    {
      "tool_name": "get_releases",
      "arguments": {
        "project_slug": "your-backend-service"
      }
    }
    ```
*   **Example Output:** (Similar structure to `list_recent_releases`, but potentially many more entries)

### 4. `get_release_health`

*   **Description:** Provides health statistics for a specific release version (or the latest release if no version is specified). Includes crash-free rates, session counts, and new issue counts.
*   **Input Schema:**
    *   `project_slug` (string, required): The slug of the Sentry project.
    *   `org_slug` (string, optional): The organization slug. Defaults to `SENTRY_ORG_SLUG`.
    *   `release_version` (string, optional): The specific release version string. If omitted, fetches data for the latest release.
*   **Example Usage (MCP Client):**
    ```json
    {
      "tool_name": "get_release_health",
      "arguments": {
        "project_slug": "your-frontend-project",
        "release_version": "frontend@2.5.1"
      }
    }
    ```
*   **Example Output:**
    ```json
    {
      "version": "frontend@2.5.1",
      "new_issues": 2,
      "crash_free_rate": 99.5, // Example value
      "sessions": 15000,      // Example value
      "stats": { /* Detailed Sentry stats object */ } 
    }
    ```

### 5. `get_issue`

*   **Description:** Retrieves basic details (ID, title, permalink) for a specific Sentry issue using its ID.
*   **Input Schema:**
    *   `issue_id` (string, required): The numerical ID of the Sentry issue.
    *   `org_slug` (string, required): The organization slug where the issue resides.
    *   `project_slug` (string, required): The project slug where the issue resides.
*   **Example Usage (MCP Client):**
    ```json
    {
      "tool_name": "get_issue",
      "arguments": {
        "issue_id": "123456789",
        "org_slug": "your-organization-slug",
        "project_slug": "your-frontend-project"
      }
    }
    ```
*   **Example Output:**
    ```json
    {
      "id": "123456789",
      "title": "TypeError: Cannot read properties of undefined (reading 'map')",
      "permalink": "https://your-organization-slug.sentry.io/issues/123456789/"
    }
    ```

### 6. `get_release_issues`

*   **Description:** Fetches a list of all issues associated with a specific release version (or the latest release if no version is specified).
*   **Input Schema:**
    *   `project_slug` (string, required): The slug of the Sentry project.
    *   `org_slug` (string, optional): The organization slug. Defaults to `SENTRY_ORG_SLUG`.
    *   `release_version` (string, optional): The specific release version string. If omitted, fetches issues for the latest release.
*   **Example Usage (MCP Client):**
    ```json
    {
      "tool_name": "get_release_issues",
      "arguments": {
        "project_slug": "your-backend-service",
        "release_version": "backend@v1.1.0"
      }
    }
    ```
*   **Example Output:** (List of issue objects, similar structure to the output of `get_issue`)
    ```json
    [
      { "id": "987654321", "title": "Database connection timeout", "permalink": "..." },
      { "id": "987654322", "title": "NullPointerException in UserServic", "permalink": "..." }
      // ... more issues
    ]
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (assuming you will add an MIT license file).

## Support & Contributing

For issues, questions, or feature requests, please open an issue on the [GitHub repository](https://github.com/srcgrp/sentry-mcp-server).

Contributions are welcome! Please follow standard fork-and-pull-request workflows.
