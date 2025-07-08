# Salesforce MCP Server

An MCP (Model Context Protocol) server implementation that integrates Claude with Salesforce, enabling natural language interactions with your Salesforce data and metadata. This server allows Claude to query, modify, and manage your Salesforce objects and records using everyday language.

<a href="https://glama.ai/mcp/servers/n1rsv1aiee">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/n1rsv1aiee/badge" alt="Salesforce Server MCP server" />
</a>

## Features

* **Object and Field Management**: Create and modify custom objects and fields using natural language
* **Smart Object Search**: Find Salesforce objects using partial name matches
* **Detailed Schema Information**: Get comprehensive field and relationship details for any object
* **Flexible Data Queries**: Query records with relationship support and complex filters
* **Data Manipulation**: Insert, update, delete, and upsert records with ease
* **Cross-Object Search**: Search across multiple objects using SOSL
* **Intuitive Error Handling**: Clear feedback with Salesforce-specific error details

## Installation

```bash
npm install -g @surajadsul02/mcp-server-salesforce
```

## Setup

### Salesforce Authentication
You can authenticate with Salesforce using one of two methods:

#### 1. Username/Password Authentication
1. Set up your Salesforce credentials
2. Get your security token (Reset from Salesforce Settings)
3. Configure the environment variables as shown in the configuration section

#### 2. OAuth2 Authentication with Consumer Key/Secret
1. Set up a Connected App in Salesforce
2. Get the Consumer Key and Consumer Secret
3. Configure the environment variables as shown in the configuration section

### IDE Integration

#### Cursor IDE Setup

1. Install the package globally:
```bash
npm install -g @surajadsul02/mcp-server-salesforce
```

2. Configure the MCP server in Cursor IDE `.cursor/mcp.json`:

##### Using env Command
```json
{
  "mcpServers": {
    "salesforce": {
      "command": "env",
      "args": [
        "SALESFORCE_USERNAME=your.actual.email@example.com",
        "SALESFORCE_PASSWORD=YourActualPassword123",
        "SALESFORCE_TOKEN=YourActualSecurityToken123",
        "SALESFORCE_INSTANCE_URL=https://login.salesforce.com",
        "npx",
        "-y",
        "@surajadsul02/mcp-server-salesforce"
      ]
    }
  }
}
```

##### For OAuth2 Authentication in Cursor
```json
{
  "mcpServers": {
    "salesforce": {
      "command": "env",
      "args": [
        "SALESFORCE_USERNAME=your.actual.email@example.com",
        "SALESFORCE_PASSWORD=YourActualPassword123",
        "SALESFORCE_TOKEN=YourActualSecurityToken123",
        "SALESFORCE_INSTANCE_URL=https://login.salesforce.com",
        "SALESFORCE_CONSUMER_KEY=YourConsumerKey",
        "SALESFORCE_CONSUMER_SECRET=YourConsumerSecret",
        "npx",
        "-y",
        "@surajadsul02/mcp-server-salesforce"
      ]
    }
  }
}
```

#### Claude Desktop Setup

1. Install the package globally (if not already installed):
```bash
npm install -g @surajadsul02/mcp-server-salesforce
```

2. Add to your `claude_desktop_config.json`:

##### For Username/Password Authentication
```json
{
  "mcpServers": {
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@surajadsul02/mcp-server-salesforce"],
      "env": {
        "SALESFORCE_USERNAME": "your_username",
        "SALESFORCE_PASSWORD": "your_password",
        "SALESFORCE_TOKEN": "your_security_token",
        "SALESFORCE_INSTANCE_URL": "https://login.salesforce.com"
      }
    }
  }
}
```

##### For OAuth2 Authentication
```json
{
  "mcpServers": {
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@surajadsul02/mcp-server-salesforce"],
      "env": {
        "SALESFORCE_USERNAME": "your_username",
        "SALESFORCE_PASSWORD": "your_password",
        "SALESFORCE_CONSUMER_KEY": "your_consumer_key",
        "SALESFORCE_CONSUMER_SECRET": "your_consumer_secret",
        "SALESFORCE_INSTANCE_URL": "https://login.salesforce.com"
      }
    }
  }
}
```

3. Configuration File Location:
   - macOS: `~/Library/Application Support/Claude Desktop/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude Desktop\claude_desktop_config.json`
   - Linux: `~/.config/Claude Desktop/claude_desktop_config.json`

### Required Environment Variables

For Username/Password Authentication:
- `SALESFORCE_USERNAME`: Your Salesforce username/email
- `SALESFORCE_PASSWORD`: Your Salesforce password
- `SALESFORCE_TOKEN`: Your Salesforce security token
- `SALESFORCE_INSTANCE_URL`: Your Salesforce instance URL (Optional, default: https://login.salesforce.com)

For OAuth2 Authentication:
- `SALESFORCE_USERNAME`: Your Salesforce username/email
- `SALESFORCE_PASSWORD`: Your Salesforce password
- `SALESFORCE_CONSUMER_KEY`: Your Connected App's consumer key
- `SALESFORCE_CONSUMER_SECRET`: Your Connected App's consumer secret
- `SALESFORCE_INSTANCE_URL`: Your Salesforce instance URL (Optional, default: https://login.salesforce.com)

## Example Usage

### Searching Objects
```
"Find all objects related to Accounts"
"Show me objects that handle customer service"
"What objects are available for order management?"
```

### Getting Schema Information
```
"What fields are available in the Account object?"
"Show me the picklist values for Case Status"
"Describe the relationship fields in Opportunity"
```

### Querying Records
```
"Get all Accounts created this month"
"Show me high-priority Cases with their related Contacts"
"Find all Opportunities over $100k"
```

### Managing Custom Objects
```
"Create a Customer Feedback object"
"Add a Rating field to the Feedback object"
"Update sharing settings for the Service Request object"
```

### Searching Across Objects
```
"Search for 'cloud' in Accounts and Opportunities"
"Find mentions of 'network issue' in Cases and Knowledge Articles"
"Search for customer name across all relevant objects"
```

## Development

### Building from source
```bash
# Clone the repository
git clone https://github.com/surajadsul02/mcp-server-salesforce.git

# Navigate to directory
cd mcp-server-salesforce

# Install dependencies
npm install

# Build the project
npm run build
```

## Troubleshooting

1. **Authentication Errors**
   - Verify your credentials are correct
   - For username/password auth: ensure security token is correct
   - For OAuth2: verify consumer key and secret

2. **Connection Issues**
   - Check your Salesforce instance URL
   - Verify network connectivity
   - Ensure proper API access permissions

3. **Cursor IDE Integration**
   - Restart Cursor IDE after configuration changes
   - Check Developer Tools (Help > Toggle Developer Tools) for error messages
   - Verify the package is installed globally

4. **Claude Desktop Integration**
   - Verify configuration file location
   - Check file permissions
   - Restart Claude Desktop after configuration changes
   - Ensure environment variables are properly set

## Contributing
Contributions are welcome! Feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Issues and Support
If you encounter any issues or need support, please file an issue on the GitHub repository.