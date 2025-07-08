# zammad-go-mcp

MCP Server for accessing the Zammad API. 

This server enables:

- Reading ticket and user lists.
- Fetching details for specific tickets and users.
- Searching for tickets and users.
- Creating new tickets.
- Adding notes (articles) to existing tickets.
- Retrieving communication history (articles) for tickets.

## Capabilities

The server exposes the following MCP Resources and Tools:

Resources allow the AI to read data from Zammad in a structured way using URIs.

*   **`zammad://tickets`**
    *   **Name:** List Tickets
    *   **Description:** Lists all tickets accessible by the configured API token.
    *   **MIME Type:** `application/json`
*   **`zammad://tickets/{ticket_id}`** (Template)
    *   **Name:** Show Ticket (Resource)
    *   **Description:** Shows details for a specific ticket identified by its `{ticket_id}`.
    *   **MIME Type:** `application/json`
*   **`zammad://users`**
    *   **Name:** List Users
    *   **Description:** Lists all users accessible by the configured API token.
    *   **MIME Type:** `application/json`
*   **`zammad://users/{user_id}`** (Template)
    *   **Name:** Show User (Resource)
    *   **Description:** Shows details for a specific user identified by their `{user_id}`.
    *   **MIME Type:** `application/json`

### Tools

Tools allow the AI to perform actions or specific queries within Zammad.

*   **`create_ticket`**: Creates a new ticket in Zammad.
    *   Requires: `title`, `group`, `customer` (email or user ID), `body`.
    *   Optional: `type` (article type, default: "note"), `internal` (boolean, default: false).
*   **`search_tickets`**: Searches for tickets based on a query string.
    *   Requires: `query`.
    *   Optional: `limit` (default: 50).
*   **`add_note_to_ticket`**: Adds an internal note (article) to an existing ticket.
    *   Requires: `ticket_id`, `body`.
    *   Optional: `internal` (boolean, default: true).
*   **`get_ticket`**: Retrieves details for a specific ticket by its ID.
    *   Requires: `ticket_id`.
*   **`get_user`**: Retrieves details for a specific user by their ID.
    *   Requires: `user_id`.
*   **`search_users`**: Searches for users based on a query string (e.g., email, login, name).
    *   Requires: `query`.
    *   Optional: `limit` (default: 50).
*   **`get_ticket_articles`**: Retrieves all articles (communications) for a specific ticket.
    *   Requires: `ticket_id`.

## Prerequisites

*   **Go:** Version 1.24 or higher installed.
*   **Zammad Instance:** Access to a running Zammad instance (URL).
*   **Zammad API Token:** An API token generated within your Zammad instance with sufficient permissions.

## Getting a Zammad API Token

You need to generate an API token within Zammad to allow this MCP server to authenticate and interact with the API.

1.  **Log in** to your Zammad instance with an administrator account (or an account that has permission to manage API tokens).
2.  Navigate to your **Profile** settings (usually by clicking your avatar/initials in the bottom-left).
3.  Go to the **Token Access** section.
4.  Click **"Create"** or the relevant button to generate a new token.
5.  Give the token a descriptive **Label** (e.g., "Claude MCP Server").
6.  **Crucially, assign the necessary permissions.** Based on the tools provided, you will likely need permissions like:
    *   `ticket.agent` (or `ticket.customer` depending on use case) - To view, create, search tickets and add articles.
    *   `user.reader` - To view and search users.
    *   *(Optional)* `admin.user` might be needed for broader user searches or modifications if you add those tools later. Review Zammad's permission documentation for specifics.
7.  Click **"Create"** or **"Save"**.
8.  **Immediately copy the generated token.** Zammad will only show you the token *once*. Store it securely.

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/arush15june/zammad-mcp-go.git
    cd zammad-mcp-go
    ```

2.  **Build the binary:**
    ```bash
    go build -o zammad-mcp-go main.go
    ```
    
    This will create an executable file named `zammad-mcp-go` (or `zammad-mcp-go.exe` on Windows) in the current directory.


# Claude Desktop Configuration

```json
{
  "mcpServers": {
        "zammad": {
            "command": "<path-to>/zammad-go-mcp.exe",
            "args": [],
            "env": {
                "ZAMMAD_URL": "<zammad_url>",
                "ZAMMAD_TOKEN": "<zammad_token>"
            }
        }
    }
}
```