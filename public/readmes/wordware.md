# wordware-mcp

The Wordware MCP (Model Context Protocol) server allows you to run your Wordware apps locally. This enables you to integrate Wordware's powerful AI flows directly into your local development environment, making it easier to test and develop applications that leverage Wordware's capabilities.

## What's New in Version 1.1.5

- Updated to work with the new local API endpoint (http://localhost:9000/{WORDWARE_API_TOKEN})
- No need to specify APP_IDs anymore - tools are discovered automatically
- Interactive installation process with `npx wordware-mcp`
- Automatic Claude configuration setup
- Enhanced CLI interface with command-line argument support
- Direct specification of API key via parameters
- Improved error handling and logging
- Global installation support with simple command syntax

## Installation

The easiest way to get started is using the interactive installation process with npx:

```bash
npx wordware-mcp
```

This will guide you through:

1. Entering your Wordware API key
2. Setting up Claude configuration (optional)

The npx command will:

- Prompt you for configuration details if not provided
- Create necessary configuration files
- Set up your local environment to run Wordware apps

After running the npx command, you can start the MCP server with:

```bash
npx wordware-mcp
```

### Permanent Installation

If you prefer to install the package permanently:

```bash
# Install globally from npm registry
npm install -g wordware-mcp

# Or install locally in your project
npm install wordware-mcp

# Or clone this repository and install globally
git clone https://github.com/{username}/wordware-mcp.git
cd wordware-mcp
npm run install-global
```

## Prerequisites

Before using this package, you need:

1. A Wordware account (sign up at [wordware.ai](http://wordware.ai))
2. A Wordware API key
3. At least one deployed Wordware app

## Basic Usage

### Using npx directly (no installation required)

You can run wordware-mcp using npx without installing it first:

```bash
# Interactive mode - will prompt for required information
npx wordware-mcp

# Or with command line parameters
npx wordware-mcp --api-key your-api-key --port 3000

# Start MCP server after configuration
npx wordware-mcp start
```

### As a global command

If installed globally, you can run in one of two ways:

```bash
# Option 1: Create an .env file in your current directory first (see Configuration section)
wordware-mcp

# Option 2: Pass parameters directly via command line
wordware-mcp --api-key your-api-key --port 3000
```

### Command Line Options

```
Options:
  --api-key, -k <key>      Wordware API key (required unless in .env file)
  --port, -p <port>        Port to run the server on (default: 3000)
  --help, -h               Show this help message
```

### As a package in your project

```javascript
// In your script
import { startMCP } from "wordware-mcp";

// Start the MCP server
startMCP();
```

## Configuration

You can configure the MCP server in two ways:

### 1. Environment Variables or .env File

Create a `.env` file with the following variables:

```
WORDWARE_API_KEY=your-api-key
PORT=3000
```

### 2. Command Line Arguments

Pass the configuration directly when running the command:

```bash
wordware-mcp -k your-api-key -p 3000
```

## Creating Your Wordware Setup

### Create an account

To start, you'll need a Wordware account. Head to [wordware.ai](http://wordware.ai), sign in and create an account

### Create an API key

For your wordware flows to be accessible via MCP, you'll need to create an API key. For that, click on your profile picture in the top right corner > API keys > Create a new key > Copy your key

### Create an app

Now it's time to get creative. Create a wordware app for whatever you want to achieve, or feel free to fork an app from the explore page (https://app.wordware.ai/explore).

### Deploy your app

For your app to be triggered as MCP, you'll need to deploy it. To do that, head to your app. You should see a "Deploy" button in the top right corner. Then head to the deployment page.

### Get the `app_id`

On the deployment page, you'll see your deployment url: `https://app.wordware.ai/explore/apps/{app_id}`. Get your app_id from there

## Using with Claude Desktop

To use this MCP server with Claude Desktop:

1. Make sure Claude for Desktop is installed
2. Modify the Claude desktop config file located at:
   `~/Library/Application\ Support/Claude/claude_desktop_config.json`

3. Add the following to the file:

```json
{
  "mcpServers": {
    "wordware": {
      "command": "wordware-mcp"
    }
  }
}
```

## Complete Example Workflow

Here's a complete workflow example to get up and running quickly:

### 1. Configure and Start Wordware MCP

```bash
# Run the interactive setup
npx wordware-mcp

# Follow the prompts to:
# - Enter your Wordware API key
# - Configure Claude integration (if desired)

# Once configured, start the server
npx wordware-mcp start
```

### 2. Integrate with Your Application

After starting the MCP server, your Wordware apps will be accessible at:

```
http://localhost:3000/api/run/{app_id}
```

You can trigger your Wordware flows via HTTP requests:

```javascript
// Example: Calling your Wordware app from JavaScript
async function callWordwareApp() {
  const response = await fetch("http://localhost:3000/api/run/your-app-id", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Your input data here
      prompt: "Your prompt to the AI model",
      // Any other parameters your Wordware app expects
    }),
  });

  const result = await response.json();
  console.log(result);
}
```

### 3. Developing with Hot Reloading

During development, any changes you make to your Wordware apps will be immediately available - just refresh your app or make a new API call.

## Development

If you want to contribute to this package:

```bash
# Clone the repository
git clone https://github.com/yuhuangou/wordware-mcp.git
cd wordware-mcp

# Install dependencies
npm install

# Build the package
npm run build

# Run in development mode
npm run dev
```

## License

MIT

## Troubleshooting

### Common Issues with npx

1. **"Command not found" after installation**

   If you see `command not found` after installing with npx:

   ```bash
   # Make sure the package is installed globally
   npm install -g wordware-mcp

   # Check your npm global path is in your PATH
   npm config get prefix
   # Add the resulting path + /bin to your PATH if needed
   ```

2. **Configuration issues**

   If your configuration isn't being detected:

   ```bash
   # Check if .env file exists in current directory
   ls -la .env

   # Manually run with parameters to bypass .env
   npx wordware-mcp --api-key your-api-key
   ```

3. **Connection refused errors**

   If you see connection errors when trying to use your apps:

   ```bash
   # Check if server is running
   lsof -i :3000

   # Restart server with verbose logging
   npx wordware-mcp start --verbose
   ```

4. **Permissions issues**

   If you encounter permissions errors with npx:

   ```bash
   # Run with sudo (not recommended as permanent solution)
   sudo npx wordware-mcp

   # Fix npm permissions
   chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
   ```

For more assistance, please file an issue on our GitHub repository.

## Environment Variables

The following environment variables can be set in the `.env` file:

- `PORT` - The port to run the server on (default: 3000)
- `WORDWARE_API_KEY` - Your Wordware API key
