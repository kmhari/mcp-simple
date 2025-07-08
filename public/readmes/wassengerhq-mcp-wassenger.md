# MCP Wassenger WhatsApp API Connector [![NPM Version](https://img.shields.io/npm/v/mcp-wassenger.svg)](https://www.npmjs.com/package/mcp-wassenger)

🚀 **Supercharge your WhatsApp automation driven by AI!** Send messages, summarize conversations, and manage chats using natural language from your favorite AI assistant like ChatGPT, Claude, or custom AI agents.

✨ **Easily integrate** [Wassenger WhatsApp API](https://wassenger.com) with any [MCP-powered](https://modelcontextprotocol.io/) AI client including ChatGPT, VS Code Copilot, Claude Desktop, Cursor, Windsurf and [many more](https://github.com/punkpeye/awesome-mcp-clients?tab=readme-ov-file#clients)!

💬 **Transform how you communicate** - automate responses, analyze chat patterns, and manage customer conversations at scale, manage WhatsApp chats and groups, everything through simple conversational text or voice commands with your AI assistant.

👉 **[Read the blog post introducing Wassenger MCP server](https://medium.com/@wassenger/introducing-whatsapp-mcp-ai-connector-3d393b52d1b0)**

> ⚠️ **Note**: You only need to use this package if your MCP client does not [support HTTP streaming](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) (previously known as SSE connection). To use a remote HTTP connection [read these instructions](#http-streaming-usage).

## Contents

- [About](#about)
- [Example prompts](#example-prompts)
  - [📱 Basic Messaging & Communication](#-basic-messaging--communication)
  - [📊 Conversation Analysis & Insights](#-conversation-analysis--insights)
  - [👥 Group & Team Management](#-group--team-management)
  - [⏰ Message Scheduling & Automation](#-message-scheduling--automation)
  - [🔍 Contact & Device Management](#-contact--device-management)
  - [📈 Analytics & Reporting](#-analytics--reporting)
  - [🔔 Status & Monitoring](#-status--monitoring)
  - [🔄 Bulk Operations & Campaigns](#-bulk-operations--campaigns)
  - [🎯 Smart Business Automation](#-smart-business-automation)
  - [🔐 Account & File Management](#-account--file-management)
- [HTTP streaming usage](#http-streaming-usage)
  - [Supported Clients](#supported-clients)
  - [Claude Desktop Configuration](#claude-desktop-configuration)
  - [VS Code Copilot Configuration](#vs-code-copilot-configuration)
  - [Benefits of HTTP Streaming](#benefits-of-http-streaming)
  - [Getting Your API Key](#getting-your-api-key)
- [MCP Tools Supported](#mcp-tools-supported)
  - [📱 Core Messaging & Communication](#-core-messaging--communication)
  - [💬 Chat & Conversation Management](#-chat--conversation-management)
  - [👥 Group & Team Management](#-group--team-management-1)
  - [📺 Channel & Broadcasting](#-channel--broadcasting)
  - [🔄 Campaign & Bulk Operations](#-campaign--bulk-operations)
  - [📱 Device & Account Management](#-device--account-management)
  - [👤 Contact & Label Management](#-contact--label-management)
  - [📁 File & Media Management](#-file--media-management)
  - [🔧 System & Utilities](#-system--utilities)
  - [📊 Analytics & Insights](#-analytics--insights)
- [Usage](#usage)
  - [Custom Headers](#custom-headers)
  - [Usage as a tool in OpenAI](#usage-as-a-tool-in-openai)
  - [Flags](#flags)
  - [Claude Desktop](#claude-desktop)
  - [VS Code Extension / Copilot](#vs-code-extension--copilot)
  - [Cursor](#cursor)
  - [Windsurf](#windsurf)
  - [Cline](#cline)
  - [Continue.dev](#continuedev)
  - [Zed Editor](#zed-editor)
  - [Jan AI](#jan-ai)
  - [Open WebUI](#open-webui)
  - [Sourcegraph Cody](#sourcegraph-cody)
  - [OpenAI Responses API](#openai-responses-api)
- [Troubleshooting](#troubleshooting)
  - [Clear your `~/.mcp-auth` directory](#clear-your-mcp-auth-directory)
  - [Check your Node version](#check-your-node-version)
  - [Restart Claude](#restart-claude)
  - [VPN Certs](#vpn-certs)
  - [Check the logs](#check-the-logs)
- [Debugging](#debugging)
  - [Debug Logs](#debug-logs)
  - [Authentication Errors](#authentication-errors)
  - ["Client" mode](#client-mode)
- [License](#license)

## About

[Wassenger](https://wassenger.com) is a versatile WhatsApp Team Chat and API solution for business messaging to automate anything on WhatsApp.

[Check out the API documentation and examples here](https://app.wassenger.com/docs)

> **Product update**: 🚀 Automate anything on WhatsApp with our new No-Code solution [Wassenger Flows](https://wassenger.com/flows) ⚡✨

## Example prompts

Chat with your WhatsApp conversations from any AI clients or agentic tool integration.

Here are various prompts you can use with any AI assistant to interact with WhatsApp through the Wassenger MCP connector:

### 📱 Basic Messaging & Communication
- "Send a WhatsApp message to +1234567890 saying 'Hello! How are you today?'"
- "Send a message to the contact named 'John Smith' with the text 'Meeting confirmed for 3 PM'"
- "Send an urgent message to +44123456789: 'Please call me back ASAP'"
- "Send a WhatsApp message with an image from [URL] to [phone-number]"
- "Reply to message [message-id] in chat [chat-id] with 'Thanks for your feedback!'"

### 📊 Conversation Analysis & Insights
- "Summarize my last 10 WhatsApp messages with +1555123456"
- "Analyze the conversation tone in my chat with the Marketing Team group"
- "Show me the key topics discussed in my conversation with Sarah over the past week"
- "Count how many messages I've received today from all contacts"
- "Search for messages containing 'invoice' in chat [chat-id]"
- "Generate chat activity report grouped by day for this month"

### 👥 Group & Team Management
- "Create a WhatsApp group called 'Team Updates' with participants +1234567890, +0987654321"
- "How many participants are in the 'Project Team Alpha' WhatsApp group?"
- "List all members of my 'Family Chat' group"
- "Add +1234567890 to WhatsApp group [group-id]"
- "Make +1234567890 an admin in group [group-id]"
- "Get the invite link for group [group-id]"

### ⏰ Message Scheduling & Automation
- "Schedule a message to +1234567890 saying 'Happy Birthday!' to be sent tomorrow at 9 AM"
- "Set up a reminder message for the team group about the meeting next Friday at 2 PM"
- "Set up auto-replies for messages received outside business hours (9 AM - 5 PM)"
- "Create a workflow: when someone messages 'INFO', automatically send our company brochure"

### 🔍 Contact & Device Management
- "Check if the phone number +1555987654 is a valid WhatsApp number"
- "What WhatsApp numbers do I have connected to Wassenger?"
- "Show me the status of all my WhatsApp devices"
- "Get the profile information for contact +1234567890"
- "Show me all my recent contacts from the past month"

### 📈 Analytics & Reporting
- "Generate a report of my most frequent WhatsApp contacts this month"
- "Show me my busiest WhatsApp conversation days this week"
- "Which agent responds fastest to customer inquiries?"
- "Show me chat volume trends over the last 30 days"
- "Count unread messages across all my chats"
- "Find customers who haven't interacted in the last 60 days"

### 🔔 Status & Monitoring
- "Check the delivery status of my last message to +1234567890"
- "Show me all failed message deliveries from today"
- "Monitor if my contact +1555123456 has read my recent messages"
- "Post 'Working on exciting new features!' as my WhatsApp status"

### 🔄 Bulk Operations & Campaigns
- "Send the same announcement to all members of my 'Team Updates' group individually"
- "Broadcast a holiday greeting to my top 10 most contacted numbers"
- "Create a campaign called 'Welcome Series' to send 'Welcome to our service!' to multiple contacts"
- "Start campaign [campaign-id] and check its delivery status"

### 🎯 Smart Business Automation
- "Create a label called 'VIP Customer' with red color and apply it to important chats"
- "Assign chat [chat-id] to agent [agent-id]"
- "Show me all chats with the 'support' label"
- "Analyze sentiment in customer support conversations and flag negative ones"
- "Generate a CSV report of all chats with their last activity"
- "Find all unread messages in my WhatsApp chats"

### 🔐 Account & File Management
- "Show me my current Wassenger account usage and limits"
- "Upload an image from [image-url] to use in WhatsApp messages"
- "List all uploaded files tagged as 'marketing'"
- "Export all contacts from device [device-id] to JSON"

These prompts cover real-world scenarios for businesses using WhatsApp for customer service, marketing, team collaboration, and automation through the Wassenger platform.

## HTTP streaming usage

If your MCP client supports [**HTTP streaming**](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) (previously known as Server-Sent Events or SSE transport), you can connect directly to the Wassenger MCP server without installing this package. This is the preferred method as it's faster and requires no local setup.

### Supported Clients

Most modern MCP clients support HTTP streaming, including:

- **Claude Desktop** (latest versions)
- **VS Code Copilot** with MCP extension
- **Cursor** (v0.48.0+)
- **Windsurf**
- **OpenAI Responses API**
- **ChatGPT** (Pro users have access, soon more users)

### Claude Desktop Configuration

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "wassenger": {
      "type": "http",
      "url": "https://api.wassenger.com/mcp?key=YOUR_WASSENGER_API_KEY"
    }
  }
}
```

Or using environment variables:

```json
{
  "mcpServers": {
    "wassenger": {
      "type": "http",
      "url": "https://api.wassenger.com/mcp?key=${WASSENGER_API_KEY}",
      "env": {
        "WASSENGER_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### VS Code Copilot Configuration

In VS Code settings (JSON format):

```json
{
  "mcp.servers": {
    "wassenger": {
      "url": "https://api.wassenger.com/mcp?key=YOUR_WASSENGER_API_KEY",
      "transport": "http-streaming"
    }
  }
}
```

### Benefits of HTTP Streaming

- ✅ **No local installation** required
- ✅ **Faster connection** times
- ✅ **Automatic updates** - always uses the latest server version
- ✅ **Better reliability** - no Node.js dependency issues
- ✅ **Simpler configuration** - just a URL

### Getting Your API Key

1. Sign up at [Wassenger.com](https://wassenger.com)
2. Go to your [API settings](https://app.wassenger.com/api)
3. Copy your API key
4. Replace `YOUR_WASSENGER_API_KEY` in the configuration above

## MCP Tools Supported

The Wassenger MCP server provides comprehensive WhatsApp automation tools organized into functional categories. All tools use action-based parameters for LLM-friendly interactions:

### 📱 Core Messaging & Communication
- **`manage_whatsapp_messages`** - Universal message sending with 11 action types: text, media, location, contact, poll, event, scheduled, live, expiring, agent, and template messaging
- **`manage_whatsapp_message_interactions`** - Message interactions: reply, forward, reaction, and poll voting
- **`get_whatsapp_chat_messages`** - Comprehensive message retrieval: recent, search, date range, by sender, by type, by ID, advanced search, thread context, and media filtering
- **`analyze_whatsapp_chat_messages`** - Message analytics: statistics, delivery status tracking, and data export in multiple formats

### 💬 Chat & Conversation Management
- **`get_whatsapp_chats`** - Universal chat retrieval with 9 actions: recent, unread, by status, assigned, by contact type, by ID, search, archived, and date range filtering
- **`analyze_whatsapp_chats`** - Chat analytics and export with comprehensive statistics and data export capabilities
- **`search_whatsapp_chats_by_name`** - Quick chat search by contact name, group name, or channel name

### 👥 Group & Team Management
- **`manage_whatsapp_groups`** - Complete group operations: search, create, update, join, leave, invite management with 8 action types
- **`manage_whatsapp_group_participants`** - Participant management: add, remove, promote, demote, approval workflow with 7 action types
- **`manage_whatsapp_team`** - Team member management: search, create, update, delete, device access control with 7 action types
- **`manage_whatsapp_departments`** - Department organization: list, create, update, delete with agent assignments and visual customization

### 📺 Channel & Broadcasting
- **`manage_whatsapp_channels`** - Channel lifecycle management: list, create, update, search, join, leave, image updates with 9 action types
- **`manage_whatsapp_channel_messages`** - Channel message retrieval with filtering and pagination
- **`manage_whatsapp_status`** - WhatsApp Status (Stories) management: get, publish, schedule with media support and advanced timing

### 🔄 Campaign & Bulk Operations
- **`manage_whatsapp_campaigns`** - Bulk messaging campaigns: search, create, update, start, stop, delete with 7 action types
- **`manage_whatsapp_campaign_contacts`** - Campaign recipient management: search, add, remove contacts with filtering options
- **`manage_whatsapp_queue`** - Message queue control: status monitoring, queue management, bulk deletion with 3 action types

### 📱 Device & Account Management
- **`get_whatsapp_devices`** - Device listing with advanced filtering: status, session, search, active/online filtering
- **`get_whatsapp_device_details`** - Detailed device information: configuration, session status, metrics, and insights
- **`health_check`** - Comprehensive system health check for MCP server and connected WhatsApp devices

### 👤 Contact & Label Management
- **`manage_whatsapp_contacts`** - Contact CRUD operations: list, get, create, update, delete, bulk operations, metadata management with 8 action types
- **`manage_whatsapp_contact_actions`** - Contact blocking: block and unblock operations
- **`manage_whatsapp_labels`** - Label management: list, create, update, delete with color-coded organization

### 📁 File & Media Management
- **`search_whatsapp_outbound_files`** - Uploaded file search with advanced filtering by type, size, date, tags, and metadata
- **`search_whatsapp_chat_files`** - Received file search from WhatsApp chats with comprehensive filtering options

### 🔧 System & Utilities
- **`ping`** - Basic connectivity test with server status and response time measurement

### 📊 Analytics & Insights
All tools include comprehensive analytics capabilities:
- Message delivery tracking and statistics
- Chat activity analysis and reporting
- Device performance metrics and monitoring
- Campaign analytics and success tracking
- Team productivity insights and reporting

Each tool supports extensive filtering, pagination, sorting, and export capabilities, making them perfect for both manual operations and automated workflows through AI assistants.

## Usage

All the most popular MCP clients (Claude Desktop, VS Code Copilot, Cursor, Windsurf...) use the following config format:

```json
{
  "mcpServers": {
    "remote-example": {
      "command": "npx",
      "args": [
        "mcp-wassenger",
        "api-key-goes-here"
      ]
    }
  }
}
```

### Custom Headers

To bypass authentication, or to emit custom headers on all requests to your remote server, pass `--header` CLI arguments:

```json
{
  "mcpServers": {
    "remote-example": {
      "command": "npx",
      "args": [
        "mcp-wassenger",
        "${WASSENGER_API}"
      ],
      "env": {
        "WASSENGER_API": "..."
      }
    },
  }
}
```

**Note:** Cursor and Claude Desktop (Windows) have a bug where spaces inside `args` aren't escaped when it invokes `npx`, which ends up mangling these values. You can work around it using:

```jsonc
{
  // rest of config...
  "args": [
    "mcp-wassenger",
    "${WASSENGER_API}"
  ],
  "env": {
    "WASSENGER_API": "<wassenger-api-get-here>"
  }
},
```

### Usage as a tool in OpenAI

Here's how you can use the Wassenger MCP server as a tool with the OpenAI JavaScript client:

```javascript
import OpenAI from 'openai';

const wassengerKey = process.env.WASSENGER_API_KEY || 'wassenger-api-key-here'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example: Send a WhatsApp message using OpenAI's new Responses API with MCP
const response = await openai.responses.create({
  model: 'o4-mini',
  tools: [
    {
      type: 'mcp',
      server_label: 'wassenger',
      server_url: `https://api.wassenger.com/mcp?key=${wassengerKey}`,
      require_approval: 'never'
    }
  ],
  input: 'Send a WhatsApp message to +1234567890 saying "Hello from AI!"'
});

console.log('Response:', response);
```

Make sure to install the required dependencies:

```bash
npm install openai
```

And set your environment variables:

```bash
export OPENAI_API_KEY="your-openai-api-key"
export WASSENGER_API_KEY="your-wassenger-api-key"
```

This approach uses OpenAI's new Responses API with MCP integration, which automatically handles tool discovery, execution, and communication with the Wassenger MCP server without requiring manual MCP client setup.

### Flags

* If `npx` is producing errors, consider adding `-y` as the first argument to auto-accept the installation of the `mcp-wassenger` package.

```json
      "command": "npx",
      "args": [
        "-y"
        "mcp-wassenger",
        "API_KEY_GOES_HERE"
      ]
```

* To force `npx` to always check for an updated version of `mcp-wassenger`, add the `@latest` flag:

```json
      "args": [
        "mcp-wassenger@latest"
      ]
```

* To change which port `mcp-wassenger` listens for an OAuth redirect (by default `3334`), add an additional argument after the server URL. Note that whatever port you specify, if it is unavailable an open port will be chosen at random.

```json
      "args": [
        "mcp-wassenger",
        "API_KEY_GOES_HERE"
      ]
```

* To enable detailed debugging logs, add the `--debug` flag. This will write verbose logs to `~/.mcp-auth/{server_hash}_debug.log` with timestamps and detailed information about the auth process, connections, and token refreshing.

```json
      "args": [
        "mcp-wassenger",
        "API_KEY_GOES_HERE",
        "--debug"
      ]
```

<!-- ### Transport Strategies

MCP Remote supports different transport strategies when connecting to an MCP server. This allows you to control whether it uses Server-Sent Events (SSE) or HTTP transport, and in what order it tries them.

Specify the transport strategy with the `--transport` flag:

```bash
npx mcp-wassenger $API_KEY --transport sse-only
```

**Available Strategies:**

- `http-first` (default): Tries HTTP transport first, falls back to SSE if HTTP fails with a 404 error
- `sse-first`: Tries SSE transport first, falls back to HTTP if SSE fails with a 405 error
- `http-only`: Only uses HTTP transport, fails if the server doesn't support it
- `sse-only`: Only uses SSE transport, fails if the server doesn't support it -->
<!--
### Static OAuth Client Metadata

MCP Remote supports providing static OAuth client metadata instead of using the mcp-wassenger defaults.
This is useful when connecting to OAuth servers that expect specific client/software IDs or scopes.

Provide the client metadata as a JSON string or as a `@` prefixed filepath with the `--static-oauth-client-metadata` flag:

```bash
npx mcp-wassenger $API_KEY --static-oauth-client-metadata '{ "scope": "space separated scopes" }'
# uses node readfile, so you probably want to use absolute paths if you're not sure what the cwd is
npx mcp-wassenger $API_KEY --static-oauth-client-metadata '@/Users/username/Library/Application Support/Claude/oauth_client_metadata.json'
```

### Static OAuth Client Information

Per the [spec](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization#2-4-dynamic-client-registration),
servers are encouraged but not required to support [OAuth dynamic client registration](https://datatracker.ietf.org/doc/html/rfc7591).

For these servers, MCP Remote supports providing static OAuth client information instead.
This is useful when connecting to OAuth servers that require pre-registered clients.

Provide the client metadata as a JSON string or as a `@` prefixed filepath with the `--static-oauth-client-info` flag:

```bash
export MCP_REMOTE_CLIENT_ID=xxx
export MCP_REMOTE_CLIENT_SECRET=yyy
npx mcp-wassenger $API_KEY --static-oauth-client-info "{ \"client_id\": \"$MCP_REMOTE_CLIENT_ID\", \"client_secret\": \"$MCP_REMOTE_CLIENT_SECRET\" }"
# uses node readfile, so you probably want to use absolute paths if you're not sure what the cwd is
npx mcp-wassenger $API_KEY --static-oauth-client-info '@/Users/username/Library/Application Support/Claude/oauth_client_info.json'
``` -->

### Claude Desktop

[Official Docs](https://modelcontextprotocol.io/quickstart/user)

In order to add an MCP server to Claude Desktop you need to edit the configuration file located at:

* macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
* Windows: `%APPDATA%\Claude\claude_desktop_config.json`

If it does not exist yet, [you may need to enable it under Settings > Developer](https://modelcontextprotocol.io/quickstart/user#2-add-the-filesystem-mcp-server).

Restart Claude Desktop to pick up the changes in the configuration file.
Upon restarting, you should see a hammer icon in the bottom right corner
of the input box.

### VS Code Extension / Copilot

[Official Docs](https://code.visualstudio.com/docs/copilot/copilot-extensibility-overview#_model-context-protocol-mcp). Add MCP servers through VS Code settings or via the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) by searching for "MCP". Configuration is managed through VS Code's settings interface.

### Cursor

[Official Docs](https://docs.cursor.com/context/model-context-protocol). The configuration file is located at `~/.cursor/mcp.json`.

As of version `0.48.0`, Cursor supports unauthed SSE servers directly. If your MCP server is using the official MCP OAuth authorization protocol, you still need to add a **"command"** server and call `mcp-wassenger`.

### Windsurf

[Official Docs](https://docs.codeium.com/windsurf/mcp). The configuration file is located at `~/.codeium/windsurf/mcp_config.json`.

### Cline

[Official Docs](https://cline.bot/docs/mcp). The configuration file is located at `~/.cline/mcp_servers.json`.

### Continue.dev

[Official Docs](https://docs.continue.dev/customize/model-context-protocol). The configuration file is located at `~/.continue/config.json`. Continue.dev supports MCP servers for enhanced code context and AI-powered development workflows.

### Zed Editor

[Official Docs](https://zed.dev/docs/assistant/model-context-protocol). Configure MCP servers in Zed's settings to extend the AI assistant capabilities. Zed provides native MCP integration for seamless development experience.

### Jan AI

[Official Docs](https://jan.ai/docs/extensions/mcp). Jan AI supports MCP servers through its extension system, allowing you to integrate external tools and data sources with local AI models.

### Open WebUI

[Official MCP Integration](https://docs.openwebui.com/features/mcp). Open WebUI provides MCP support for connecting external tools and services to your self-hosted AI interface, enabling powerful workflow automation.

### Sourcegraph Cody

[Official Docs](https://sourcegraph.com/docs/cody/core-concepts/context). Cody supports MCP integration for enhanced code understanding and AI-assisted development across your entire codebase.

### OpenAI Responses API

You can use the Wassenger MCP server as a tool with OpenAI's new Responses API, which provides native MCP integration without requiring manual client setup.

#### JavaScript Example

```javascript
import OpenAI from 'openai';

const wassengerKey = process.env.WASSENGER_API_KEY || 'your-wassenger-api-key';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Send a WhatsApp message using OpenAI's Responses API with MCP
const response = await openai.responses.create({
  model: 'o1-mini',
  tools: [
    {
      type: 'mcp',
      server_label: 'wassenger',
      server_url: `https://api.wassenger.com/mcp?key=${wassengerKey}`,
      require_approval: 'never'
    }
  ],
  input: 'Send a WhatsApp message to +1234567890 saying "Hello from AI!"'
});

console.log('Response:', response);
```

#### Python Example

```python
import os
from openai import OpenAI

wassenger_key = os.getenv('WASSENGER_API_KEY', 'your-wassenger-api-key')

client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY')
)

# Send a WhatsApp message using OpenAI's Responses API with MCP
response = client.responses.create(
    model='o1-mini',
    tools=[
        {
            'type': 'mcp',
            'server_label': 'wassenger',
            'server_url': f'https://api.wassenger.com/mcp?key={wassenger_key}',
            'require_approval': 'never'
        }
    ],
    input='Send a WhatsApp message to +1234567890 saying "Hello from AI!"'
)

print('Response:', response)
```

#### Installation

Make sure to install the required dependencies:

**JavaScript:**
```bash
npm install openai
```

**Python:**
```bash
pip install openai
```

#### Environment Variables

Set your API keys as environment variables:

```bash
export OPENAI_API_KEY="your-openai-api-key"
export WASSENGER_API_KEY="your-wassenger-api-key"
```

This approach uses OpenAI's native MCP integration, which automatically handles tool discovery, execution, and communication with the Wassenger MCP server without requiring manual MCP client configuration.

<!--
## Building Remote MCP Servers

For instructions on building & deploying remote MCP servers, including acting as a valid OAuth client, see the following resources:

* https://developers.cloudflare.com/agents/guides/remote-mcp-server/

In particular, see:

* https://github.com/cloudflare/workers-oauth-provider for defining an MCP-comlpiant OAuth server in Cloudflare Workers
* https://github.com/cloudflare/agents/tree/main/examples/mcp for defining an `McpAgent` using the [`agents`](https://npmjs.com/package/agents) framework.

For more information about testing these servers, see also:

* https://developers.cloudflare.com/agents/guides/test-remote-mcp-server/

Know of more resources you'd like to share? Please add them to this Readme and send a PR! -->

## Troubleshooting

### Clear your `~/.mcp-auth` directory

`mcp-wassenger` stores all the credential information inside `~/.mcp-auth` (or wherever your `MCP_REMOTE_CONFIG_DIR` points to). If you're having persistent issues, try running:

```sh
rm -rf ~/.mcp-auth
```

Then restarting your MCP client.

### Check your Node version

Make sure that the version of Node you have installed is [18 or
higher](https://modelcontextprotocol.io/quickstart/server). Claude
Desktop will use your system version of Node, even if you have a newer
version installed elsewhere.

### Restart Claude

When modifying `claude_desktop_config.json` it can helpful to completely restart Claude

### VPN Certs

You may run into issues if you are behind a VPN, you can try setting the `NODE_EXTRA_CA_CERTS`
environment variable to point to the CA certificate file. If using `claude_desktop_config.json`,
this might look like:

```json
{
 "mcpServers": {
    "remote-example": {
      "command": "npx",
      "args": [
        "mcp-wassenger",
        "API_KEY_GOES_HERE"
      ],
      "env": {
        "NODE_EXTRA_CA_CERTS": "{your CA certificate file path}.pem"
      }
    }
  }
}
```

### Check the logs

* [Follow Claude Desktop logs in real-time](https://modelcontextprotocol.io/docs/tools/debugging#debugging-in-claude-desktop)
* MacOS / Linux:<br/>`tail -n 20 -F ~/Library/Logs/Claude/mcp*.log`
* For bash on WSL:<br/>`tail -n 20 -f "C:\Users\YourUsername\AppData\Local\Claude\Logs\mcp.log"`
* Powershell: <br/>`Get-Content "C:\Users\YourUsername\AppData\Local\Claude\Logs\mcp.log" -Wait -Tail 20`

## Debugging

### Debug Logs

For troubleshooting complex issues, especially with token refreshing or authentication problems, use the `--debug` flag:

```json
"args": [
  "mcp-wassenger",
  "API_KEY_GOES_HERE",
  "--debug"
]
```

This creates detailed logs in `~/.mcp-auth/{server_hash}_debug.log` with timestamps and complete information about every step of the connection and authentication process. When you find issues with token refreshing, laptop sleep/resume issues, or auth problems, provide these logs when seeking support.

### Authentication Errors

If you encounter the following error, returned by the `/callback` URL:

```
Authentication Error
Token exchange failed: HTTP 400
```

You can run `rm -rf ~/.mcp-auth` to clear any locally stored state and tokens.

### "Client" mode

Run the following on the command line (not from an MCP server):

```shell
npx -p mcp-wassenger@latest mcp-wassenger-client API_KEY_GOES_HERE
```

This will run through the entire authorization flow and attempt to list the tools & resources at the remote URL. Try this after running `rm -rf ~/.mcp-auth` to see if stale credentials are your problem, otherwise hopefully the issue will be more obvious in these logs than those in your MCP client.

## License

MIT
