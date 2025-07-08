# Ares DevOps MCP Server 🚀

> 🔌 **Compatible with Cline, Cursor, Claude Desktop, and any other MCP Clients!**
> 
> Ares DevOps MCP is also compatible with any MCP client

The Model Context Protocol (MCP) is an open standard that enables AI systems to interact seamlessly with various data sources and tools, facilitating secure, two-way connections.

The Ares DevOps MCP server provides:

* Seamless interaction with Azure DevOps Git repositories
* Secure repository and branch management
* Efficient pull request creation and management
* Type-safe operations with TypeScript
* Pipeline automation and monitoring

## Prerequisites 🔧

Before you begin, ensure you have:

* Azure DevOps account with appropriate permissions
* Personal Access Token (PAT) with required scopes
* Claude Desktop or Cursor
* Node.js (v14 or higher)
* Git installed (only needed if using Git installation method)

## Ares DevOps MCP server installation ⚡

### Running with NPX

```bash
npx -y ares-devops-mcp@latest
```

### Installing via Smithery

To install Ares DevOps MCP Server for Claude Desktop automatically via Smithery:

```bash
npx -y @smithery/cli install @ares-devops/mcp --client claude
```

## Configuring MCP Clients ⚙️

### Configuring Cline 🤖

The easiest way to set up the Ares DevOps MCP server in Cline is through the marketplace with a single click:

1. Open Cline in VS Code
2. Click on the Cline icon in the sidebar
3. Navigate to the "MCP Servers" tab (4 squares)
4. Search "Ares DevOps" and click "install"
5. When prompted, enter your Azure DevOps credentials

Alternatively, you can manually set up the Ares DevOps MCP server in Cline:

1. Open the Cline MCP settings file:
```bash
# For macOS:
code ~/Library/Application\ Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json

# For Windows:
code %APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json
```

2. Add the Ares DevOps server configuration to the file:
```json
{
  "mcpServers": {
    "ares-devops-mcp": {
      "command": "npx",
      "args": ["-y", "ares-devops-mcp@latest"],
      "env": {
        "AZURE_DEVOPS_ORG": "your-organization",
        "AZURE_DEVOPS_PROJECT": "your-project",
        "AZURE_DEVOPS_PAT": "your-pat-token"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

3. Save the file and restart Cline if it's already running.

### Configuring Cursor 🖥️

> **Note**: Requires Cursor version 0.45.6 or higher

To set up the Ares DevOps MCP server in Cursor:

1. Open Cursor Settings
2. Navigate to Features > MCP Servers
3. Click on the "+ Add New MCP Server" button
4. Fill out the following information:
   * **Name**: Enter a nickname for the server (e.g., "ares-devops-mcp")
   * **Type**: Select "command" as the type
   * **Command**: Enter the command to run the server:
   ```bash
   env AZURE_DEVOPS_ORG=your-org AZURE_DEVOPS_PROJECT=your-project AZURE_DEVOPS_PAT=your-pat npx -y ares-devops-mcp@latest
   ```
   > **Important**: Replace the environment variables with your Azure DevOps credentials

### Configuring the Claude Desktop app 🖥️

#### For macOS:
```bash
# Create the config file if it doesn't exist
touch "$HOME/Library/Application Support/Claude/claude_desktop_config.json"

# Opens the config file in TextEdit
open -e "$HOME/Library/Application Support/Claude/claude_desktop_config.json"
```

#### For Windows:
```bash
code %APPDATA%\Claude\claude_desktop_config.json
```

#### Add the Ares DevOps server configuration:
```json
{
  "mcpServers": {
    "ares-devops-mcp": {
      "command": "npx",
      "args": ["-y", "ares-devops-mcp@latest"],
      "env": {
        "AZURE_DEVOPS_ORG": "your-organization",
        "AZURE_DEVOPS_PROJECT": "your-project",
        "AZURE_DEVOPS_PAT": "your-pat-token"
      }
    }
  }
}
```

## Usage in Claude Desktop App 🎯

Once the installation is complete, and the Claude desktop app is configured, you must completely close and re-open the Claude desktop app to see the ares-devops-mcp server. You should see a hammer icon in the bottom left of the app, indicating available MCP tools.

### Ares DevOps Examples

1. **Create Repository**:
```
Create a new repository named "my-project" in Azure DevOps.
```

2. **Create Pull Request**:
```
Create a pull request from "feature-branch" to "main" in repository "my-project" with title "New Feature" and description "Adding new functionality".
```

3. **List Pipelines**:
```
List all available pipelines in the project.
```

4. **Get Commit History**:
```
Get the commit history for the "main" branch in repository "my-project".
```

## Troubleshooting 🛠️

### Common Issues

1. **Server Not Found**
   * Verify the npm installation by running `npm --version`
   * Check Claude Desktop configuration syntax
   * Ensure Node.js is properly installed by running `node --version`

2. **Authentication Issues**
   * Confirm your Azure DevOps PAT is valid and has required scopes
   * Check the PAT is correctly set in the config
   * Verify no spaces or quotes around the PAT

3. **Repository Access Issues**
   * Verify the repository exists in your Azure DevOps project
   * Check repository permissions
   * Ensure the PAT has appropriate access rights

## Acknowledgments ✨

* Model Context Protocol for the MCP specification
* Anthropic for Claude Desktop
* Microsoft Azure DevOps for the API 