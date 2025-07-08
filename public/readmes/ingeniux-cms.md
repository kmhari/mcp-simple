# Cline Setup Guide for Ingeniux CMS MCP Server

This guide walks you through setting up the [`ingeniux-cms-mcp-server`](../README.md) in Cline IDE with MCP marketplace integration.

## Prerequisites

- Node.js 18+ installed
- Cline extension for VsCode installed
- Access to an Ingeniux CMS instance
- OAuth client credentials for your CMS

## Installation Steps

### 1. Install the MCP Server Globally

```bash
npm install -g ingeniux-cms-mcp-server@latest
```

### 2. Locate the Installation Path

Run the following command to find where the package was installed:

```bash
npm root -g
```

Note the output path that is the **Global NPM Modules Root**- you'll need it for the configuration.

### 3. Add MCP Server to Cline

Configure the MCP server in Cline's settings by adding it to your MCP configuration file.

### 4. Configure the MCP Server

Add the following configuration to your Cline MCP settings, either in mcp.json for specific project, or add it in global mcp configuration file.

```json
{
	"mcpServers": {
		"ingeniux-cms": {
			"command": "node",
			"args": [
				"[global npm modules root]/ingeniux-cms-mcp-server/dist/index.js"
			],
			"env": {
				"CMS_BASE_URL": "[your CMS base url]/api",
				"OAUTH_CLIENT_ID": "[OAuth identity client id]",
				"OAUTH_CLIENT_SECRET": "[OAuth identity client secret]",
				"OAUTH_REDIRECT_URI": "urn:ietf:wg:oauth:2.0:oob",
				"API_TIMEOUT": "10000",
				"MAX_RETRIES": "3",
				"LOG_LEVEL": "info",
				"CACHE_TTL": "300",
				"ENABLE_FILE_LOGGING": "true"
			}
		}
	}
}
```

#### Configuration Parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| `CMS_BASE_URL` | Your CMS base URL with `/api` suffix | Yes |
| `OAUTH_CLIENT_ID` | OAuth identity client identifier | Yes |
| `OAUTH_CLIENT_SECRET` | OAuth identity client secret | Yes |
| `OAUTH_REDIRECT_URI` | OAuth redirect URI (use provided value) | Yes |
| `API_TIMEOUT` | Request timeout in milliseconds | No |
| `MAX_RETRIES` | Maximum retry attempts | No |
| `LOG_LEVEL` | Logging level (debug, info, warn, error) | No |
| `CACHE_TTL` | Cache time-to-live in seconds | No |
| `ENABLE_FILE_LOGGING` | Enable file-based logging | No |

### 5. Update Configuration Values

Replace the placeholders with your actual values:

1. **CMS_BASE_URL**: Your Ingeniux CMS instance URL followed by `/api`
   - Example: `https://your-cms.com/api`

2. **OAUTH_CLIENT_ID**: Your OAuth client identifier
   - Obtain from your CMS administrator

3. **OAUTH_CLIENT_SECRET**: Your OAuth client secret
   - Obtain from your CMS administrator

### 6. Restart the MCP Server

After updating the configuration:

1. **Disable** the MCP server in Cline settings
2. **Enable** the MCP server again to apply changes
3. Restart Cline IDE if needed

## Usage

### Invoking CMS Tools

To use the Ingeniux CMS tools in Cline:

1. Open the Cline agent chat
2. Mention "Ingeniux CMS" in your message to invoke the tools
3. Use natural language to describe your CMS operations

### Example Queries

**List Pages:**
```
Show me all pages under page x123 in the Ingeniux CMS
```

**Get Page Content:**
```
Get the content for page ID 'x1234' from Ingeniux CMS
```

**Update Page:**
```
Update the title of page 'x1234' to 'New Title' in Ingeniux CMS
```

### Available Tools

The MCP server provides comprehensive CMS tools:

- **`cms_list_pages`**: List all pages with metadata
- **`cms_get_page`**: Retrieve specific page content
- **`cms_create_page`**: Create new pages in the CMS
- **`cms_update_page`**: Update page content and metadata
- **`cms_delete_page`**: Delete pages from the CMS
- **`cms_publish_page`**: Publish pages to make them live
- **`cms_search_content`**: Search for content in the CMS

### Authentication Tools

- **`health_check`**: Check server health and authentication status
- **`auth_status`**: Get current authentication status
- **`initiate_oauth`**: Start OAuth authentication flow

## Troubleshooting

### Common Issues

**Server Not Starting:**
- Verify your OAuth credentials are correct
- Check that the CMS base URL is accessible
- Review the logs for detailed error messages

**Authentication Errors:**
- Ensure OAuth client has proper permissions
- Verify the redirect URI matches exactly
- Check if OAuth client is active in CMS

**Connection Timeouts:**
- Increase `API_TIMEOUT` value
- Check network connectivity to CMS
- Verify CMS API endpoints are available

### Log Files

When `ENABLE_FILE_LOGGING` is true, logs are written to:
- **Windows**: `%APPDATA%/ingeniux-cms-mcp-server/logs/`
- **macOS/Linux**: `~/.config/ingeniux-cms-mcp-server/logs/`

### Getting Help

For additional support:
- Review the [troubleshooting guide](docs/troubleshooting-guide.md)
- Check the [configuration guide](docs/configuration-guide.md)
- Visit the project repository for issues and documentation

## Next Steps

After successful setup:
1. Test the connection by using simple command like "get page x123 from ingeniux cms"
2. Explore the available CMS operations
3. Review the [usage examples](docs/usage-examples.md) for advanced scenarios
4. Configure additional [security settings](docs/security-guide.md) if needed

The MCP server is now ready to use with Cline for seamless Ingeniux CMS integration.