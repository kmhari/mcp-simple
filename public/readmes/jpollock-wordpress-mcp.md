# WordPress MCP Server v1.0.0

A Model Context Protocol (MCP) server for interacting with WordPress sites via the REST API. This server provides a comprehensive set of tools for managing WordPress sites, content, users, taxonomies, custom post types, plugins, and themes.

## Table of Contents
- [WordPress MCP Server v1.0.0](#wordpress-mcp-server-v100)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Site Management](#site-management)
    - [Content Management](#content-management)
      - [Posts](#posts)
      - [Pages](#pages)
      - [Media](#media)
    - [User Management](#user-management)
    - [Taxonomy Management](#taxonomy-management)
    - [Custom Post Types](#custom-post-types)
    - [Plugin Management](#plugin-management)
    - [Theme Management](#theme-management)
  - [Requirements](#requirements)
    - [System Requirements](#system-requirements)
    - [WordPress Requirements](#wordpress-requirements)
  - [Installation](#installation)
  - [Configuration](#configuration)
    - [Configuration File](#configuration-file)
    - [Configuration Options](#configuration-options)
    - [Environment Variables](#environment-variables)
  - [Usage](#usage)
    - [Starting the Server](#starting-the-server)
      - [Using stdio (default)](#using-stdio-default)
      - [Using Server-Sent Events (SSE)](#using-server-sent-events-sse)
      - [With a Custom Configuration File](#with-a-custom-configuration-file)
    - [Adding a WordPress Site](#adding-a-wordpress-site)
    - [Tool Categories](#tool-categories)
  - [Cline Integration](#cline-integration)
    - [Configuration for Cline](#configuration-for-cline)
    - [Using with Cline](#using-with-cline)
    - [Troubleshooting Cline Integration](#troubleshooting-cline-integration)
  - [API Reference](#api-reference)
    - [Site Management Tools](#site-management-tools)
    - [Content Management Tools](#content-management-tools)
    - [User Management Tools](#user-management-tools)
    - [Taxonomy Management Tools](#taxonomy-management-tools)
    - [Custom Post Types Tools](#custom-post-types-tools)
    - [Plugin Management Tools](#plugin-management-tools)
    - [Theme Management Tools](#theme-management-tools)
  - [Security Considerations](#security-considerations)
    - [Authentication](#authentication)
    - [HTTPS](#https)
    - [Permissions](#permissions)
    - [Credential Storage](#credential-storage)
  - [Troubleshooting](#troubleshooting)
    - [Connection Issues](#connection-issues)
    - [Authentication Problems](#authentication-problems)
    - [Permission Errors](#permission-errors)
    - [API Limitations](#api-limitations)
  - [Architecture](#architecture)
    - [Server Components](#server-components)
    - [WordPress API Client](#wordpress-api-client)
    - [Tool Registration](#tool-registration)
    - [Transport Options](#transport-options)
  - [Development](#development)
    - [Project Structure](#project-structure)
    - [Adding New Tools](#adding-new-tools)
    - [Testing](#testing)
      - [Comprehensive Testing](#comprehensive-testing)
      - [Feature-Specific Testing](#feature-specific-testing)
      - [SSE Transport Testing](#sse-transport-testing)
    - [Contributing](#contributing)
  - [License](#license)

## Features

The WordPress MCP Server provides a comprehensive set of tools for interacting with WordPress sites:

### Site Management
- Add, list, update, and remove WordPress sites
- Test site connectivity
- Get site information
- Select and manage active site

### Content Management

#### Posts
- List posts with filtering and pagination
- Get post details
- Create new posts
- Update existing posts
- Delete posts

#### Pages
- List pages with filtering and pagination
- Get page details
- Create new pages
- Update existing pages
- Delete pages

#### Media
- List media items with filtering and pagination
- Get media details
- Upload media files
- Update media metadata
- Delete media items

### User Management
- List users with filtering and pagination
- Get user details
- Get current user information
- Create new users
- Update existing users
- Delete users
- Manage user roles and capabilities

### Taxonomy Management
- List categories, tags, and custom taxonomies
- Get taxonomy details
- Create new taxonomy terms
- Update existing taxonomy terms
- Delete taxonomy terms
- Assign taxonomies to posts and custom post types

### Custom Post Types
- List custom post types
- Get custom post type details
- Create, update, and delete custom post type items
- Manage custom post type fields and metadata

### Plugin Management
- List installed plugins
- Get plugin details
- Install plugins from the WordPress repository or custom URLs
- Activate and deactivate plugins
- Update plugins
- Delete plugins
- Search for plugins in the WordPress repository

### Theme Management
- List installed themes
- Get theme details
- Install themes from the WordPress repository or custom URLs
- Activate themes
- Update themes
- Delete themes
- Search for themes in the WordPress repository

## Requirements

### System Requirements
- Node.js 16.x or higher
- npm 7.x or higher

### WordPress Requirements
- WordPress 5.9 or higher
- REST API enabled
- Application Passwords feature enabled (included in WordPress 5.6+)
- Proper permissions for the user account

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/wordpress-mcp.git
cd wordpress-mcp
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Install globally:

```bash
npm install -g
```

## Configuration

### Configuration File

The server uses a configuration file to store site information. By default, it looks for a `config.json` file in the project root. The configuration file has the following structure:

```json
{
  "server": {
    "transport": "stdio",
    "http": {
      "port": 3000,
      "authToken": "your-auth-token"
    }
  },
  "sites": [
    {
      "id": "site-1",
      "name": "My WordPress Site",
      "url": "https://example.com",
      "username": "admin",
      "applicationPassword": "XXXX XXXX XXXX XXXX XXXX XXXX"
    }
  ],
  "activeSite": "site-1"
}
```

### Configuration Options

- `server.transport`: The transport to use (`stdio` or `sse`)
- `server.http`: Configuration for HTTP transport (only used with `sse` transport)
- `server.http.port`: The port to listen on
- `server.http.authToken`: Authentication token for HTTP transport
- `sites`: Array of WordPress site configurations
- `activeSite`: ID of the currently active site

### Environment Variables

You can also configure the server using environment variables:

- `WP_MCP_CONFIG_PATH`: Path to the configuration file
- `WP_MCP_TRANSPORT`: Transport to use (`stdio` or `sse`)
- `WP_MCP_HTTP_PORT`: Port for HTTP transport
- `WP_MCP_HTTP_AUTH_TOKEN`: Authentication token for HTTP transport

## Usage

### Starting the Server

#### Using stdio (default)

```bash
npm start
```

#### Using Server-Sent Events (SSE)

```bash
npm run start:sse
```

#### With a Custom Configuration File

```bash
npm start -- --config=/path/to/config.json
```

### Adding a WordPress Site

Before you can interact with a WordPress site, you need to add it to the server:

1. Create an application password in your WordPress admin:
   - Go to Users > Profile
   - Scroll down to "Application Passwords"
   - Enter a name for the application (e.g., "MCP Server")
   - Click "Add New Application Password"
   - Copy the generated password

2. Use the `add_site` tool to add the site:

```json
{
  "name": "My WordPress Site",
  "url": "https://example.com",
  "username": "admin",
  "applicationPassword": "XXXX XXXX XXXX XXXX XXXX XXXX"
}
```

### Tool Categories

The WordPress MCP Server provides tools in the following categories:

- **Site Management**: Tools for managing WordPress sites
- **Content Management**: Tools for managing posts, pages, and media
- **User Management**: Tools for managing users and roles
- **Taxonomy Management**: Tools for managing categories, tags, and custom taxonomies
- **Custom Post Types**: Tools for managing custom post types
- **Plugin Management**: Tools for managing plugins
- **Theme Management**: Tools for managing themes

## Cline Integration

The WordPress MCP Server can be integrated with Cline, an AI assistant that can use MCP servers to interact with external systems. This allows Cline to manage WordPress sites on your behalf.

### Configuration for Cline

To configure Cline to use the WordPress MCP Server:

1. For stdio transport (local use only):
   ```json
   {
     "mcpServers": {
       "wordpress": {
         "command": "node",
         "args": ["/path/to/wordpress-mcp/index.js"],
         "env": {},
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

2. For SSE transport (remote access):
   ```json
   {
     "mcpServers": {
       "wordpress": {
         "autoApprove": [],
         "disabled": false,
         "timeout": 60,
         "url": "http://localhost:3000/sse",
         "transportType": "sse"
       }
     }
   }
   ```

Add this configuration to:
- VS Code: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
- Claude Desktop: `~/Library/Application Support/Claude/claude_desktop_config.json`

### Using with Cline

Once configured, you can ask Cline to interact with your WordPress sites:

- "List all my WordPress sites"
- "Create a new post on my WordPress site"
- "Install and activate the Yoast SEO plugin on my site"
- "Update the Twenty Twenty-Three theme on my WordPress site"

Cline will use the WordPress MCP Server to perform these operations on your behalf.

### Troubleshooting Cline Integration

If you encounter issues with Cline integration:

1. **Session ID Issues**: Ensure your SSE implementation uses the session ID from SSEServerTransport:
   ```javascript
   const transport = new SSEServerTransport('/message', res);
   const sessionId = transport.sessionId;
   ```

2. **Body Parsing Problems**: Make sure the `/message` endpoint doesn't use body-parser middleware:
   ```javascript
   app.use((req, res, next) => {
     if (req.path !== '/message') {
       bodyParser.json()(req, res, next);
     } else {
       next();
     }
   });
   ```

3. **Connection Timeout**: If Cline reports connection timeouts, increase the timeout value in your server configuration and in the Cline MCP settings.

4. **Tool Not Found**: Verify that the tool is properly registered in your server code.

For more detailed troubleshooting, see the [TRANSPORTS.md](TRANSPORTS.md) file.

## API Reference

For detailed API documentation, please refer to the [API Reference](API_REFERENCE.md) file.

### Site Management Tools

Tools for managing WordPress sites, including adding, listing, updating, and removing sites, as well as testing connectivity and getting site information.

### Content Management Tools

Tools for managing WordPress content, including posts, pages, and media. These tools allow you to create, read, update, and delete content, as well as manage metadata and taxonomies.

### User Management Tools

Tools for managing WordPress users, including creating, reading, updating, and deleting users, as well as managing user roles and capabilities.

### Taxonomy Management Tools

Tools for managing WordPress taxonomies, including categories, tags, and custom taxonomies. These tools allow you to create, read, update, and delete taxonomy terms, as well as assign them to posts and custom post types.

### Custom Post Types Tools

Tools for managing WordPress custom post types. These tools allow you to list custom post types, get custom post type details, and create, read, update, and delete custom post type items.

### Plugin Management Tools

Tools for managing WordPress plugins, including listing, installing, activating, deactivating, updating, and deleting plugins, as well as searching for plugins in the WordPress repository.

### Theme Management Tools

Tools for managing WordPress themes, including listing, installing, activating, updating, and deleting themes, as well as searching for themes in the WordPress repository.

## Security Considerations

### Authentication

The WordPress MCP Server uses WordPress Application Passwords for authentication. Application Passwords provide a secure way to authenticate with the WordPress REST API without exposing your main WordPress password.

When adding a site to the server, you need to provide the following credentials:
- WordPress username
- Application password

These credentials are stored in the server's configuration file and are used to authenticate with the WordPress REST API.

### HTTPS

For production use, it is strongly recommended to use HTTPS for all WordPress sites. This ensures that the communication between the MCP server and the WordPress site is encrypted and secure.

When adding a site to the server, make sure to use the HTTPS URL:

```json
{
  "name": "My WordPress Site",
  "url": "https://example.com",
  "username": "admin",
  "applicationPassword": "XXXX XXXX XXXX XXXX XXXX XXXX"
}
```

### Permissions

The WordPress user account used for authentication should have the appropriate permissions for the operations you want to perform. For example, if you want to manage plugins, the user should have the `install_plugins` capability.

It is recommended to use an administrator account for full access to the WordPress site. However, if you only need to perform specific operations, you can use a user account with more limited permissions.

### Credential Storage

The server's configuration file contains sensitive information, including WordPress usernames and application passwords. It is important to secure this file and restrict access to it.

For production use, consider the following security measures:
- Store the configuration file in a secure location
- Set appropriate file permissions (e.g., `600`)
- Use environment variables for sensitive information
- Encrypt the configuration file

## Troubleshooting

### Connection Issues

If you are having trouble connecting to a WordPress site, check the following:

1. **URL**: Make sure the URL is correct and includes the protocol (http:// or https://).
2. **Connectivity**: Check if the WordPress site is reachable from the server.
3. **Firewall**: Make sure the server's firewall allows outgoing connections to the WordPress site.
4. **SSL/TLS**: If using HTTPS, make sure the SSL/TLS certificate is valid.

You can use the `test_site_connectivity` tool to check if the site is reachable:

```json
{
  "id": "site-1"
}
```

### Authentication Problems

If you are having authentication issues, check the following:

1. **Username**: Make sure the WordPress username is correct.
2. **Application Password**: Make sure the application password is correct and has not expired.
3. **User Permissions**: Make sure the user has the appropriate permissions for the operations you want to perform.

You can use the `get_current_user` tool to check the current user's information:

```json
{}
```

### Permission Errors

If you are getting permission errors, check the following:

1. **User Role**: Make sure the user has the appropriate role for the operations you want to perform.
2. **Capabilities**: Make sure the user has the specific capabilities required for the operations.
3. **Plugin Restrictions**: Some plugins may restrict certain operations even for administrators.

You can use the `list_roles` tool to check the available roles and their capabilities:

```json
{}
```

### API Limitations

The WordPress REST API has certain limitations that may affect the MCP server's functionality:

1. **Rate Limiting**: Some WordPress sites may have rate limiting in place, which can restrict the number of API requests.
2. **Timeout**: API requests may time out if they take too long to complete.
3. **Response Size**: Large responses may be truncated or cause memory issues.
4. **Plugin Compatibility**: Some plugins may modify or disable parts of the REST API.

If you encounter API limitations, consider the following solutions:
- Reduce the number of concurrent requests
- Implement caching to reduce the number of API requests
- Increase timeout values
- Use pagination to handle large responses

## Architecture

### Server Components

The WordPress MCP Server consists of the following main components:

1. **Core Server**: Implements the Model Context Protocol and handles communication with clients.
2. **Transport Layer**: Provides communication channels (stdio or SSE) between the server and clients.
3. **WordPress API Client**: Handles communication with WordPress sites via the REST API.
4. **Tool Implementations**: Implements the various tools for interacting with WordPress sites.
5. **Configuration Management**: Handles loading and saving server configuration.

### WordPress API Client

The WordPress API client is responsible for communicating with WordPress sites via the REST API. It handles authentication, request formatting, and response parsing.

The client is designed to be reusable and extensible, with support for various WordPress API endpoints and operations.

### Tool Registration

Tools are registered with the server during initialization. Each tool has a name, description, and input schema, as well as an implementation function that handles the actual operation.

The tool registration system is designed to be modular, allowing for easy addition of new tools and modification of existing ones.

### Transport Options

The server supports two transport options:

1. **stdio**: Uses standard input/output for communication. This is the default transport and is suitable for local use.
2. **SSE (Server-Sent Events)**: Uses HTTP for communication, with server-sent events for sending messages from the server to the client. This transport is suitable for remote use.

## Development

### Project Structure

The project has the following structure:

- `server.js`: Main server implementation
- `tools/`: Tool implementations
  - `test-tools.js`: Basic test tools
  - `site-tools.js`: Site management tools
  - `post-tools.js`: Post management tools
  - `page-tools.js`: Page management tools
  - `media-tools.js`: Media management tools
  - `user-tools.js`: User management tools
  - `taxonomy-tools.js`: Taxonomy management tools
  - `custom-post-types-tools.js`: Custom post types tools
  - `plugin-tools.js`: Plugin management tools
  - `theme-tools.js`: Theme management tools
- `wordpress/`: WordPress API client
  - `auth.js`: Authentication utilities
  - `client.js`: REST API client
  - `index.js`: Main WordPress client
- `sites/`: Site management
  - `index.js`: Site manager
  - `storage.js`: Site storage

### Adding New Tools

To add new tools, create a new file in the `tools/` directory and register it in `server.js`.

Here's an example of a tool implementation:

```javascript
/**
 * Register example tools
 * 
 * @param {Server} server - The MCP server
 * @param {Object} options - Tool options
 * @returns {Object} Tool implementations
 */
export function registerExampleTools(server, options = {}) {
  console.error('[Tools] Registering example tools');
  
  // Get the site manager from options
  const { siteManager } = options;
  
  // Register the example tool
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === 'example_tool') {
      // Validate arguments
      if (!request.params.arguments || typeof request.params.arguments !== 'object') {
        throw new McpError(ErrorCode.InvalidParams, 'Invalid arguments');
      }
      
      // Get the site ID from arguments or use the active site
      const siteId = request.params.arguments.site_id || siteManager.getActiveSiteId();
      if (!siteId) {
        throw new McpError(ErrorCode.InvalidParams, 'No active site');
      }
      
      // Get the site
      const site = siteManager.getSite(siteId);
      if (!site) {
        throw new McpError(ErrorCode.InvalidParams, `Site not found: ${siteId}`);
      }
      
      // Implement the tool logic
      try {
        // ... tool implementation ...
        
        // Return the result
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'success',
                message: 'Example tool executed successfully',
                result: {
                  // ... result data ...
                }
              }, null, 2)
            }
          ]
        };
      } catch (error) {
        // Handle errors
        console.error('[Example Tool] Error:', error);
        throw new McpError(ErrorCode.InternalError, `Example tool error: ${error.message}`);
      }
    }
    
    // Pass to the next handler if this tool doesn't handle the request
    return null;
  });
  
  // Register the tool schema
  server.setRequestHandler(ListToolsRequestSchema, async (request) => {
    const tools = await request.next();
    
    tools.tools.push({
      name: 'example_tool',
      description: 'Example tool',
      inputSchema: {
        type: 'object',
        properties: {
          site_id: {
            type: 'string',
            description: 'Site ID (defaults to active site)'
          },
          // ... other parameters ...
        }
      }
    });
    
    return tools;
  });
  
  return {
    // Return any exported functions or objects
  };
}
```

### Testing

The project includes comprehensive testing tools for various components. For detailed testing information, please refer to the [Testing Guide](TESTING.md).

#### Comprehensive Testing

The `test-all-tools.js` script provides a comprehensive test of all MCP server tools:

```bash
# Test all tool categories
node test-all-tools.js

# Test specific categories
node test-all-tools.js --category=site,post,user

# Test with verbose logging
node test-all-tools.js --verbose

# Show help
node test-all-tools.js --help
```

This script systematically tests all tool categories, verifies both success and error handling, and provides detailed reporting of test results.

#### Feature-Specific Testing

```bash
# Run basic tests
npm run test:simple

# Run plugin management tests
node test-plugin-tools.js

# Run theme management tests
node test-theme-tools.js

# Run site management tests
node test-site-tools.js
```

#### SSE Transport Testing

```bash
# Test SSE transport
./test-sse.sh

# Debug SSE issues
node debug-sse.js
```

The SSE transport can be tested using the provided `test-sse.sh` script, which automates the process of starting the server in SSE mode and running test clients against it. This is particularly useful for verifying that the server can be accessed remotely via HTTP.

### Contributing

Contributions are welcome! Here are some ways you can contribute:

- Report bugs and request features by creating issues
- Fix bugs and implement features by submitting pull requests
- Improve documentation
- Write tests
- Share your experience and provide feedback

## License

ISC
