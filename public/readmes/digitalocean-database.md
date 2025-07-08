<h1 align="center">DigitalOcean Database MCP Server</h1>

<p align="center">
<strong>🌊 DigitalOcean</strong> • <strong>⚡ TypeScript</strong> • <strong>🐘 PostgreSQL</strong> • <strong>🐬 MySQL</strong>
</p>

<p align="center">
<strong>Connect AI-powered IDEs to your DigitalOcean databases with just an API token!</strong>
</p>

<p align="center">
<em>Compatible with: 🎯 Cursor AI • 🤖 Claude Desktop • 🌊 Windsurf • 💻 VS Code • ⚡ Zed • 🔧 Any MCP Client</em>
</p>

<p align="center">
<em>GitHub badges (will display properly on GitHub):</em>
</p>

<p align="center">
<img src="https://img.shields.io/badge/DigitalOcean-0080FF?style=for-the-badge&logo=digitalocean&logoColor=white" alt="DigitalOcean">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
</p>

## 🚀 Overview

This Model Context Protocol (MCP) server enables seamless integration between **AI-powered development environments** and your **DigitalOcean managed databases**. Works with **Cursor AI**, **Claude Desktop**, **Windsurf**, **VS Code with AI extensions**, and any other IDE that supports MCP. Instead of manually managing database credentials, simply use your DigitalOcean API token to automatically discover and connect to any of your database clusters.

### ✨ Key Features

- 🔑 **Token-Based Authentication** - Use your DigitalOcean API token instead of managing database credentials
- 🔍 **Auto-Discovery** - Automatically list all your database clusters
- 🎯 **Connect by Name** - Simply specify cluster names, no complex connection strings
- 🗄️ **Multi-Database Support** - Works with PostgreSQL and MySQL clusters
- 🔒 **Secure Connections** - SSL support enabled by default
- 🛠️ **Full SQL Support** - Execute queries, manage schemas, analyze data
- 🔄 **Connection Pooling** - Optimized performance with automatic connection management

### 🎯 What You Can Do

Once connected, you can interact with your databases through natural language:

- "Show me all my database clusters"
- "Connect to my production database"
- "List all tables and describe the users table"
- "Run this analytics query and explain the results"
- "Create a new table for storing blog posts"
- "Show me the top 10 customers by revenue"

### 🔧 Compatible IDEs & AI Tools

- **[Cursor AI](https://cursor.sh)** - AI-first code editor
- **[Claude Desktop](https://claude.ai/desktop)** - Anthropic's desktop app with MCP support
- **[Windsurf](https://codeium.com/windsurf)** - AI-powered IDE by Codeium
- **[VS Code](https://code.visualstudio.com)** - With Continue.dev, Codeium, or other MCP-compatible extensions
- **[Zed](https://zed.dev)** - High-performance editor with AI assistant support
- **[Neovim](https://neovim.io)** - With AI plugins that support MCP
- **Any IDE** with MCP client support

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/oladejibidmus/DigitalOcean-Database-MCP-Server.git
cd digitalocean-database-mcp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm run build
```

### 4. Get Your DigitalOcean API Token

1. Go to [DigitalOcean API Tokens](https://cloud.digitalocean.com/account/api/tokens)
2. Click **"Generate New Token"**
3. Name it something like "Cursor Database MCP"
4. Select **"Read"** permissions (or "Read & Write" for full access)
5. Copy the token (you'll only see it once!)

### 5. Configure Your IDE

Choose your development environment and follow the corresponding setup:

#### 🎯 Cursor AI

1. **Open Cursor Settings**: Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and search for "Cursor Settings"
2. **Find MCP Servers**: Look for the MCP option in the sidebar and enable it
3. **Add New MCP Server**: Click "Add New MCP Server" 
4. **Configure the server**:
   - **Name**: `digitalocean-database`
   - **Command**: `node`
   - **Args**: `/absolute/path/to/digitalocean-database-mcp/dist/index.js`
5. **Enable**: Toggle the server to active (green dot should appear)

Alternatively, create a `.cursor/mcp.json` file in your project directory:
```json
{
  "mcpServers": {
    "digitalocean-database": {
      "command": "node",
      "args": ["/absolute/path/to/digitalocean-database-mcp/dist/index.js"]
    }
  }
}
```

#### 🤖 Claude Desktop

1. **Open Claude Desktop Settings**: Go to Settings → Developer
2. **Click "Edit Config"**: This opens `claude_desktop_config.json`
3. **Add the server configuration**:
```json
{
  "mcpServers": {
    "digitalocean-database": {
      "command": "node",
      "args": ["/absolute/path/to/digitalocean-database-mcp/dist/index.js"]
    }
  }
}
```
4. **Save and restart** Claude Desktop

#### 🌊 Windsurf

1. **Open Windsurf Settings**: Click the "Windsurf - Settings" button (bottom right) or press `Ctrl+Shift+P` and search "Open Windsurf Settings"
2. **Navigate to Cascade**: Find the "Cascade" section in Advanced Settings
3. **Enable MCP**: Look for the "Model Context Protocol" option and enable it
4. **Click the hammer icon** in the Cascade toolbar
5. **Configure MCP**: Click "Configure" to open the MCP configuration file
6. **Add your server**:
```json
{
  "mcpServers": {
    "digitalocean-database": {
      "command": "node",
      "args": ["/absolute/path/to/digitalocean-database-mcp/dist/index.js"]
    }
  }
}
```
7. **Refresh**: Click the refresh button to start the server

#### 💻 VS Code

**For GitHub Copilot Agent Mode (Built-in)**:
1. **Enable MCP support**: Go to Settings and enable `chat.mcp.enabled`
2. **Create MCP configuration**: Add a `.vscode/mcp.json` file to your workspace:
```json
{
  "servers": {
    "digitalocean-database": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/digitalocean-database-mcp/dist/index.js"]
    }
  }
}
```
3. **Use Agent Mode**: Select "Agent" from the chat mode dropdown

**For Continue.dev Extension**:
1. **Install Continue.dev** extension from the marketplace
2. **Configure MCP**: Create `.continue/mcpServers/digitalocean-db.yaml`:
```yaml
name: DigitalOcean Database
mcpServer:
  version: 0.0.1
  schema: v1
mcpServers:
  - name: DigitalOcean DB
    command: node
    args:
      - "/absolute/path/to/digitalocean-database-mcp/dist/index.js"
```

#### ⚡ Zed

1. **Open Zed**: Launch the Zed editor
2. **Access Agent Panel Settings**: Go to the Agent Panel and click the settings gear
3. **Add Context Server**: Click "Add Context Server" or edit settings manually
4. **Configure in settings.json**:
```json
{
  "context_servers": {
    "digitalocean-database": {
      "source": "custom",
      "command": {
        "path": "node",
        "args": ["/absolute/path/to/digitalocean-database-mcp/dist/index.js"],
        "env": {}
      }
    }
  }
}
```

#### 🔧 Generic MCP Client Setup

For any other MCP-compatible client, use these standard parameters:
- **Transport Type**: `stdio`
- **Command**: `node`
- **Arguments**: `["/absolute/path/to/digitalocean-database-mcp/dist/index.js"]`
- **Working Directory**: Your project directory
- **Environment Variables**: Optional `DO_API_TOKEN` for pre-set authentication

### 6. Verify Installation

After configuration:
1. **Restart your IDE/editor**
2. **Look for MCP indicators**: Most IDEs show a tools/server icon when MCP servers are active
3. **Test the connection**: Try saying "Set my DigitalOcean API token" to verify the server is responding

**Note**: Replace `/absolute/path/to/digitalocean-database-mcp` with the actual full path to your cloned repository.

## 🎮 Usage

### Step 1: Set Your API Token

In your AI assistant (Cursor, Claude Desktop, Windsurf, etc.), simply say:

```
Set my DigitalOcean API token: dop_v1_your_actual_token_here
```

### Step 2: Discover Your Databases

```
Show me all my database clusters
```

### Step 3: Connect to a Database

```
Connect to my database cluster named "production-api"
```

### Step 4: Start Querying!

```
Show me all tables in this database
```

```
Execute this query: SELECT COUNT(*) FROM users WHERE created_at > '2024-01-01'
```

```
Describe the structure of the orders table
```

## 📋 Available Commands

### 🔐 Authentication & Discovery
- `set_api_token` - Set your DigitalOcean API token
- `list_database_clusters` - List all your database clusters
- `connect_by_name` - Connect to a cluster by name

### 🗄️ Database Operations
- `execute_query` - Run SQL queries with optional parameters
- `list_tables` - Show all tables in the database
- `describe_table` - Get detailed table schema
- `get_database_info` - Database version and cluster information
- `disconnect_database` - Close current connection

### 🔧 Manual Connection (Optional)
- `connect_database` - Connect with manual credentials if needed

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AI Assistant  │◄──►│   MCP Server    │◄──►│ DigitalOcean DB │
│                 │    │                 │    │    Clusters     │
│ • Cursor AI     │    │ • API Client    │    │ • PostgreSQL    │
│ • Claude Desktop│    │ • DB Connectors │    │ • MySQL         │
│ • Windsurf      │    │ • Query Engine  │    │ • SSL Enabled   │
│ • VS Code       │    │ • Pool Manager  │    │ • Auto-scaling  │
│ • Any MCP Client│    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔒 Security Best Practices

- ✅ **API Token Permissions** - Use read-only tokens when possible
- ✅ **SSL Connections** - Enabled by default for all connections
- ✅ **No Credential Storage** - Tokens are only stored in memory during session
- ✅ **Connection Pooling** - Automatic cleanup and resource management
- ✅ **Parameter Binding** - Prepared statements prevent SQL injection

## 🛠️ Development

### Project Structure

```
digitalocean-database-mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript output
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Development Scripts

```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Adding New Features

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes in `src/index.ts`
4. Test thoroughly with your DigitalOcean databases
5. Submit a pull request

## 🚨 Troubleshooting

### Connection Issues

**"Invalid API token"**
- Verify your token is correct and not expired
- Check that the token has sufficient permissions
- Ensure you're using the full token including the `dop_v1_` prefix

**"Database cluster not found"**
- Run `list_database_clusters` to see available clusters
- Check that the cluster name is spelled correctly
- Verify the cluster is in a running state

**"SSL connection failed"**
- DigitalOcean requires SSL for managed databases
- The server handles SSL automatically, but check firewall settings
- Verify your cluster allows connections from your IP

### MCP Integration Issues

**"MCP server not found"**
- Check that the path in your IDE configuration is absolute and correct
- Verify Node.js is installed and accessible in your system PATH
- Try running the server manually: `node dist/index.js`
- Restart your IDE after configuration changes

**"Server not responding"**
- Ensure the MCP server process is running
- Check IDE-specific MCP logs:
  - **Cursor:** Check the output panel for MCP server logs
  - **Claude Desktop:** Look in the application logs
  - **Windsurf:** Check the developer tools console
  - **VS Code:** Check the extension output panel

**"Connection timeout"**
- Increase the connection timeout in your database settings
- Check that your cluster is not overloaded
- Verify network connectivity to DigitalOcean

## 📚 Examples

### Basic Data Analysis

```typescript
// Connect to your analytics database
"Connect to my cluster named 'analytics-prod'"

// Explore the data
"Show me all tables and describe the events table"

// Run analysis
"SELECT DATE(created_at) as date, COUNT(*) as events 
 FROM events 
 WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
 GROUP BY DATE(created_at)
 ORDER BY date"
```

### Schema Management

```typescript
// Check current schema
"List all tables and their row counts"

// Create new table
"CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  author_id INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)"

// Verify creation
"Describe the blog_posts table"
```

### IDE-Specific Usage Tips

#### Cursor AI
- Use natural language for complex queries
- Ask for code generation with database context
- Request data visualization suggestions

#### Claude Desktop
- Great for data analysis and reporting
- Ask for explanations of query results
- Request database optimization suggestions

#### Windsurf
- Excellent for collaborative database work
- Use for real-time query debugging
- Leverage AI pair programming for schema design

#### VS Code
- Integrate with existing database workflows
- Use alongside database extension tools
- Great for migration script generation

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### Development Environment

- Node.js 18+ 
- TypeScript 5+
- Access to DigitalOcean databases for testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DigitalOcean](https://digitalocean.com) for their excellent managed database service
- [Model Context Protocol](https://modelcontextprotocol.io) for the MCP specification
- [Anthropic](https://anthropic.com) for Claude and MCP development
- [Cursor](https://cursor.sh) for pioneering AI-first development
- [Codeium](https://codeium.com) for Windsurf and advancing AI-powered coding
- The open-source community for MCP adoption and tooling

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://https://github.com/oladejibidmus/DigitalOcean-Database-MCP-Server/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/oladejibidmus/DigitalOcean-Database-MCP-Server/discussions)
- 📚 **Documentation**: Check the [wiki](https://github.com/oladejibidmus/DigitalOcean-Database-MCP-Server/wiki)

---

<p align="center">
<strong>Made with ❤️ for the AI-powered development community</strong>
</p>

<p align="center">
<em>GitHub star badge: https://github.com/oladejibidmus/DigitalOcean-Database-MCP-Server</em>
</p>

<p align="center">
<img src="https://github.com/oladejibidmus/DigitalOcean-Database-MCP-Server" alt="GitHub Stars">
</p>

<p align="center">
🌟 <strong><a href="https://github.com/oladejibidmus/DigitalOcean-Database-MCP-Server">Star this repo on GitHub</a></strong>
</p>

<p align="center">
<strong>Works with:</strong> 🎯 Cursor AI • 🤖 Claude Desktop • 🌊 Windsurf • 💻 VS Code • ⚡ Zed • 🔧 Any MCP Client
</p>
