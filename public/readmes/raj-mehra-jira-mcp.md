# Jira MCP Server

A Jira integration server that provides tools for fetching ticket details and searching tickets using the MCP (Model Control Protocol) framework.

## Setup

1. Install the required dependencies:
For local env use: 

```bash
    ./setup.sh
```

Alternatively

```bash
pip install -r requirements.txt
```

2. Create a `.env` file in the project root with your Jira credentials:
```
JIRA_URL=https://your-domain.atlassian.net
JIRA_USERNAME=your-email@example.com
JIRA_API_TOKEN=your-api-token
```

## Running the Application

The server can be run in two modes:

1. **Standard I/O Mode** (default):
```bash
python main.py
```

2. **SSE Mode for Cursor**:

```bash
./run.sh --transport sse --port 8000  

```
OR 

```bash
python main.py --transport sse --port 8000
```

Once the server has started Go to Cursor Settings > MCP > Add new Global MCP Server

Paste the following in the JSON
```
{
  "mcpServers": {
    "jira": {
      "url": "http://localhost:8000/sse",
      "env": {
        "JIRA_URL": "YOUR_JIRA_URL",
        "JIRA_USERNAME": "YOUR_JIRA_USERNAME",
        "JIRA_API_TOKEN": "YOUR_JIRA_API_TOKEN"
      }
    }
  }
}
```

## Available Tools

### 1. Fetch Ticket Details

Fetches detailed information about a Jira ticket.

**Input Schema:**
```json
{
    "ticketKey": "string",  // Required: Jira ticket key (e.g., PROJ-123)
    "includeComments": "boolean",  // Optional: Whether to include comments, default true
    "includeAttachments": "boolean"  // Optional: Whether to include attachments, default true
}
```

**Response:**
Returns a JSON object containing:
- Basic ticket information (key, summary, description, status, etc.)
- Custom fields
- Comments (if requested)
- Attachments (if requested)

### 2. Search Tickets

Searches for Jira tickets using JQL (Jira Query Language).

**Input Schema:**
```json
{
    "jql": "string",  // Required: JQL query string
    "maxResults": "integer"  // Optional: Maximum number of results (default: 50)
}
```

**Response:**
Returns an array of ticket summaries containing:
- Ticket key
- Summary
- Status
- Assignee
- Priority

## Features

- Comprehensive Jira ticket data retrieval
- Support for custom fields
- JQL-based ticket searching
- Optional inclusion of comments and attachments
- Error handling and validation
- Multiple transport options (stdio/SSE) 