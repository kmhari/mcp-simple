# Adjust MCP
[![smithery badge](https://smithery.ai/badge/@bitscorp-mcp/mcp-adjust)](https://smithery.ai/badge/@bitscorp-mcp/mcp-adjust)

Simple MCP server that interfaces with the Adjust API, allowing you to talk to your Adjust data from any MCP client like Cursor or Claude Desktop. Query reports, metrics, and performance data. Great for on-demand look ups like: "What's the install numbers for the Feb 1 campaign?"

I am adding more coverage of the Adjust API over time, let me know which tools you need or just open a PR.

## Installation
Make sure to get your Adjust API key from your Adjust account settings.

### Installing via Smithery

To install mcp-adjust for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@bitscorp-mcp/mcp-adjust):

```bash
npx -y @smithery/cli install @bitscorp/mcp-adjust --client claude
```

To install mcp-adjust for Cursor, go to Settings -> Cursor Settings -> Features -> MCP Servers -> + Add

Select Type: command and paste the below, using your API key from Adjust
```
npx -y @smithery/cli@latest run @bitscorp/mcp-adjust --config "{\"apiKey\":\"YOUR_ADJUST_API_KEY\"}"
```

### Clone and run locally
Clone this repo
Run `npm run build`
Paste this command into Cursor (or whatever MCP Client)
`node /ABSOLUTE/PATH/TO/mcp-adjust/build/mcp-adjust.js YOUR_ADJUST_API_KEY`

## Examples
- use adjust report revenue for the last 7 days
