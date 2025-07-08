# SchemaFlow MCP Server

> Real-time PostgreSQL & Supabase schema access for AI-IDEs via Model Context Protocol (MCP)

SchemaFlow MCP Server provides your AI-IDE with live access to PostgreSQL and Supabase database schemas through the Model Context Protocol. Get real-time schema context for smarter code generation in tools like Cursor, Windsurf, and VS Code + Cline.

## 🚀 Quick Start

**[Visit SchemaFlow →](https://schemaflow.dev)**

### 1. Get Your MCP Token
Visit [SchemaFlow Dashboard](https://schemaflow.dev/dashboard) to:
- Connect your PostgreSQL or Supabase database
- Load and cache your schema
- Generate an MCP token

### 2. Configure Your AI-IDE

#### For Cursor IDE:
1. Open Cursor Settings
2. Go to Features → MCP
3. Click "Add New MCP Server"
4. Use this configuration:

```json
{
  "name": "schemaflow",
  "type": "sse",
  "url": "https://api.schemaflow.dev/mcp/?token=your-token-here"
}
```

#### For Windsurf IDE:
Add to your MCP configuration:

```json
{
  "mcpServers": {
    "schemaflow": {
      "type": "sse",
      "url": "https://api.schemaflow.dev/mcp/?token=your-token-here"
    }
  }
}
```

#### For VS Code + Cline:
Configure in Cline's MCP settings:

```json
{
  "mcpServers": {
    "schemaflow": {
      "type": "sse", 
      "url": "https://api.schemaflow.dev/mcp/?token=your-token-here"
    }
  }
}
```

## 🛠️ Available MCP Tools

### `get_schema`
Retrieves complete database schema information including tables, columns, relationships, functions, triggers, enums, and indexes from PostgreSQL or Supabase databases.

**Parameters:**
- `query_type` (optional): Filter specific information (`tables`, `columns`, `relationships`, `functions`, `triggers`, `enums`, `indexes`, `all`)

**Example AI queries:**
- "Show me my database schema"
- "What tables do I have?"
- "Show me all relationships"
- "List database functions"

### `analyze_database`
Performs comprehensive database analysis including performance insights, security assessment, and structural recommendations for PostgreSQL and Supabase databases.

**Example AI queries:**
- "Analyze my database performance"
- "Check database security"
- "Review database structure"
- "Give me a database overview"

### `check_schema_alignment`
Validates your PostgreSQL or Supabase schema against best practices and identifies potential issues with actionable recommendations.

**Example AI queries:**
- "Check schema alignment"
- "Validate my database"
- "Any schema issues?"
- "Check naming conventions"

## 🔧 How It Works

1. **Schema Caching**: When you load your schema in SchemaFlow dashboard, it's automatically cached for MCP access
2. **Secure Connection**: Your AI-IDE connects using MCP with secure token authentication
3. **Real-time Access**: Your AI assistant can query schema data in real-time for better code generation

## 🔒 Security

- **Schema metadata only** - No actual data is accessed or stored
- **Token-based authentication** - Each user has a unique, revokable token
- **Encrypted connections** - All MCP communication is encrypted
- **User-specific access** - Tokens only access your own cached schema data

## 📚 Complete Documentation

For detailed setup instructions, troubleshooting, and advanced configuration, visit:

**[Complete MCP Integration Guide](https://schemaflow.dev/mcp-guide)**

## 🌐 SchemaFlow Platform

This MCP server is part of the larger SchemaFlow platform which also provides:

- **Interactive Schema Visualization** - Explore your PostgreSQL/Supabase database structure through intuitive diagrams
- **Multi-Format Export** - Export schemas in JSON, Markdown, SQL, and Mermaid formats
- **Schema Browser** - Navigate through tables, relationships, and database components
- **Performance Analysis** - Get insights into your database structure and optimization opportunities
- **Supabase Integration** - Native support for Supabase projects with direct connection

**[Visit SchemaFlow →](https://schemaflow.dev)**

## 🆘 Support

- **Documentation**: [schemaflow.dev/mcp-guide](https://schemaflow.dev/mcp-guide)
- **Dashboard**: [schemaflow.dev/dashboard](https://schemaflow.dev/dashboard)
- **Issues**: Create an issue in this repository

## 📄 License

MIT License - see LICENSE file for details.
