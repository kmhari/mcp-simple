# Bizfly Cloud MCP Server

A Model Context Protocol (MCP) server implementation that connects to Bizfly Cloud to manage cloud resources. Built using the [mark3labs/mcp-go](https://github.com/mark3labs/mcp-go) SDK.

## Prerequisites

-   Go 1.21 or later
-   Bizfly Cloud account credentials
-   Cursor or Claude Desktop installed

## Setup

1. Clone the repository
2. Set up your environment variables:
    ```bash
    export BIZFLY_USERNAME=your_username
    export BIZFLY_PASSWORD=your_password
    export BIZFLY_REGION=HaNoi  # Optional, defaults to HaNoi
    export BIZFLY_API_URL=https://manage.Bizfly Cloud.vn  # Optional, defaults to https://manage.Bizfly Cloud.vn
    ```
3. Install dependencies:
    ```bash
    go mod download
    ```

## Running the Server

### For Cursor/Claude Desktop Integration

1. Build the server:

    ```bash
    go build -o bizfly-mcp-server
    ```

2. Configure your MCP client (Cursor or Claude Desktop) by adding the following to the configuration:

For Cursor:

```json
{
    "mcpServers": {
        "bizfly": {
            "command": "/absolute/path/to/bizfly-mcp-server",
            "env": {
                "BIZFLY_USERNAME": "your_username",
                "BIZFLY_PASSWORD": "your_password",
                "BIZFLY_REGION": "HaNoi"
            }
        }
    }
}
```

For Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
    "mcpServers": {
        "bizfly": {
            "command": "/absolute/path/to/bizfly-mcp-server",
            "env": {
                "BIZFLY_USERNAME": "your_username",
                "BIZFLY_PASSWORD": "your_password",
                "BIZFLY_REGION": "HaNoi"
            }
        }
    }
}
```

## Available Tools

The server provides the following MCP tools:

### Server Management

-   `list_servers` - List all Bizfly Cloud servers
-   `start_server` - Start a server
-   `reboot_server` - Reboot a server
-   `delete_server` - Delete a server
-   `resize_server` - Resize a server
-   `list_flavors` - List available server flavors

### Volume Management

-   `list_volumes` - List all volumes
-   `create_volume` - Create a new volume
-   `delete_volume` - Delete a volume
-   `resize_volume` - Resize a volume
-   `list_snapshots` - List all volume snapshots
-   `create_snapshot` - Create a volume snapshot
-   `delete_snapshot` - Delete a volume snapshot

### Load Balancer Management

-   `list_loadbalancers` - List all load balancers
-   `create_loadbalancer` - Create a new load balancer
-   `delete_loadbalancer` - Delete a load balancer

### Kubernetes Management

-   `list_kubernetes_clusters` - List all Kubernetes clusters
-   `create_kubernetes_cluster` - Create a new Kubernetes cluster
-   `delete_kubernetes_cluster` - Delete a Kubernetes cluster
-   `list_kubernetes_nodes` - List nodes in a cluster

### Database Management

-   `list_databases` - List all databases
-   `list_datastores` - List available database engines and versions
-   `create_database` - Create a new database
-   `delete_database` - Delete a database

## Example Usage

You can interact with the server through natural language queries in Cursor or Claude Desktop:

-   "Show me all my Bizfly Cloud servers"
-   "List all volumes in my Bizfly Cloud account"
-   "Create a new load balancer"
-   "List available Kubernetes clusters"
-   "Show me all databases"

## MCP Implementation Details

This server uses the [mark3labs/mcp-go](https://github.com/mark3labs/mcp-go) SDK to implement the Model Context Protocol:

1. **Standard I/O Transport**: Uses stdin/stdout for communication with MCP clients
2. **Tool Definitions**: Clear tool descriptions and parameters
3. **Error Handling**: Proper error reporting in MCP format
4. **Text Formatting**: Human-readable output for resource listings

## Authentication

The server uses your Bizfly Cloud username and password for authentication through environment variables:

-   `BIZFLY_USERNAME`: Your Bizfly Cloud username (required)
-   `BIZFLY_PASSWORD`: Your Bizfly Cloud password (required)
-   `BIZFLY_REGION`: Region name (optional, defaults to "HaNoi")
-   `BIZFLY_API_URL`: API URL (optional, defaults to "https://manage.Bizfly Cloud.vn")

Make sure to keep your credentials secure and never commit them to version control.

## MCP Features

1. **Standard I/O Transport**: Uses stdin/stdout for seamless integration with Cursor/Claude Desktop
2. **Standardized Response Format**: All responses follow the MCP format with context, type, data, and root fields
3. **Resource Organization**: Resources are organized under root paths
4. **Type Safety**: Strong typing for all resources
5. **Error Handling**: Standardized error responses in MCP format
