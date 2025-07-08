# Lattice HQ MCP Server

A Model Context Protocol (MCP) server for Lattice HQ that enables AI models to interact with your Lattice performance management platform.

## Features

This MCP server provides access to the following Lattice HQ capabilities:

### User Management
- Get all users in the organization
- Get specific user details
- Get direct reports for any user
- Get current user information

### Goal Management
- Get all goals in the organization
- Get specific goal details
- Get goals for a specific user

### Review Cycles
- Get all review cycles
- Get specific review cycle details
- Get reviewees for a review cycle

### Feedback
- Get all feedback
- Get specific feedback details

### Departments
- Get all departments
- Get specific department details

### Updates
- Get all updates
- Get specific update details

## Prerequisites

- Node.js 18 or higher
- Lattice HQ account with API access
- Lattice API token

## Installation

### Method 1: Using NPX (Recommended)
No installation required! Just use npx to run the latest version:

```bash
LATTICE_API_URL=https://your-company.latticehq.com npx lattice-hq-mcp-server --api-key=YOUR-TOKEN --stdio
```

### Method 2: Global Installation
```bash
# Install globally
npm install -g lattice-hq-mcp-server

# Run the server
LATTICE_API_URL=https://your-company.latticehq.com lattice-hq-mcp-server --api-key=YOUR-TOKEN --stdio
```

### Method 3: Local Development
```bash
# Clone the repository
git clone https://github.com/cyrilnoah1/lattice-hq-mcp.git
cd lattice-hq-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run the server
npm run dev
```

## Getting Your Lattice API Token

### Method 1: Through Lattice Settings
1. Log in to your Lattice HQ account
2. Go to Settings → Integrations → API (if available)
3. Generate a new API token
4. Copy the token and add it to your configuration

### Method 2: Contact Lattice Support
If you don't see "Integrations" under Settings, this usually means:
- Your plan doesn't include API access (typically Enterprise only)  
- You don't have admin permissions
- API access needs to be enabled for your account

**Contact Lattice Support:**
- Email: support@lattice.com
- Request API access for your account/plan

## Usage

### Running the Server

**With API Token:**
```bash
export LATTICE_API_TOKEN=your_token_here
export LATTICE_API_URL=https://your-company.latticehq.com
lattice-hq-mcp-server --stdio
```

Or inline:
```bash
LATTICE_API_URL=https://your-company.latticehq.com lattice-hq-mcp-server --api-key=your_token_here --stdio
```

### Using with Claude Desktop

Add the following to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "lattice-hq": {
      "command": "npx",
      "args": ["-y", "lattice-hq-mcp-server", "--api-key=YOUR-TOKEN", "--stdio"],
      "env": {
        "LATTICE_API_URL": "https://your-company.latticehq.com"
      }
    }
  }
}
```

**Configuration:**
```json
{
  "mcpServers": {
    "lattice-hq": {
      "command": "node",
      "args": ["/path/to/lattice-hq-mcp/dist/index.js"],
      "env": {
        "LATTICE_API_URL": "https://your-company.latticehq.com",
        "LATTICE_API_TOKEN": "your_api_token_here"
      }
    }
  }
}
```

### Using with Other MCP Clients

This server follows the standard MCP protocol and can be used with any MCP-compatible client.

## Available Tools

### User Tools
- `lattice_get_users` - Get all users
- `lattice_get_user` - Get user by ID
- `lattice_get_user_direct_reports` - Get user's direct reports
- `lattice_get_me` - Get current user

### Goal Tools
- `lattice_get_goals` - Get all goals
- `lattice_get_goal` - Get goal by ID
- `lattice_get_user_goals` - Get goals for a user

### Review Cycle Tools
- `lattice_get_review_cycles` - Get all review cycles
- `lattice_get_review_cycle` - Get review cycle by ID
- `lattice_get_review_cycle_reviewees` - Get reviewees for a cycle

### Feedback Tools
- `lattice_get_feedbacks` - Get all feedback
- `lattice_get_feedback` - Get feedback by ID

### Department Tools
- `lattice_get_departments` - Get all departments
- `lattice_get_department` - Get department by ID

### Update Tools
- `lattice_get_updates` - Get all updates
- `lattice_get_update` - Get update by ID

## Configuration

You can configure the server using environment variables:

- `LATTICE_API_TOKEN`: Your Lattice API token (required)
- `LATTICE_API_URL`: Lattice API base URL (required)

## Development

```bash
# Install dependencies
npm install

# Build in watch mode
npm run watch

# Run development server
npm run dev

# Build for production
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues:

1. Check the [GitHub Issues](https://github.com/cyrilnoah1/lattice-hq-mcp/issues)
2. Create a new issue with details about your problem
3. Include your Node.js version, operating system, and any error messages 