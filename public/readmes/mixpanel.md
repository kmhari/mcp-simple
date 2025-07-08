# Mixpanel MCP
[![smithery badge](https://smithery.ai/badge/@dragonkhoi/mixpanel-mcp)](https://smithery.ai/server/@dragonkhoi/mixpanel-mcp)

Simple MCP server that interfaces with the Mixpanel API, allowing you to talk to your Mixpanel events data from any MCP client like Cursor or Claude Desktop. Query events data, retention, and funnels. Great for on-demand look ups like: "What's the weekly retention for users in the Feb 1 cohort?"

<a href="https://glama.ai/mcp/servers/3ymkqswmp4">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/3ymkqswmp4/badge" alt="mixpanel MCP server" />
</a>

I am adding more coverage of the Mixpanel API over time, let me know which tools you need or just open a PR.

## Installation
Make sure to go to your Mixpanel Organization Settings to set up a [Mixpanel Service Account](https://developer.mixpanel.com/reference/service-accounts), get the username, password, and your project ID (in Mixpanel Project Settings).

### Installing via Smithery

To install mixpanel-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@dragonkhoi/mixpanel-mcp):

```bash
npx -y @smithery/cli install @dragonkhoi/mixpanel-mcp --client claude
```

To install mixpanel-mcp for Cursor, go to Settings -> Cursor Settings -> Features -> MCP Servers -> + Add

Select Type: command and paste the below, using the arguments `<USERNAME> <PW> <PROJECT_ID>` from Mixpanel
```
npx -y @smithery/cli@latest run @dragonkhoi/mixpanel-mcp --config "{\"username\":\"YOUR_SERVICE_ACCT_USERNAME\",\"password\":\"YOUR_SERVICE_ACCT_PASSWORD\",\"projectId\":\"YOUR_MIXPANEL_PROJECT_ID\"}"
```

### Clone and run locally
Clone this repo
Run `npm run build`
Paste this command into Cursor (or whatever MCP Client)
`node /ABSOLUTE/PATH/TO/mixpanel-mcp/build/index.js YOUR_SERVICE_ACCOUNT_USERNAME YOUR_SERVICE_ACCOUNT_PASSWORD YOUR_PROJECT_ID`

## Examples
- Ask about retention numbers

<img width="500" alt="IMG_3675" src="https://github.com/user-attachments/assets/5999958e-d4f6-4824-b226-50ad416ab064" />


- Ask for an overview of events

<img width="500" alt="IMG_9968" src="https://github.com/user-attachments/assets/c05cd932-5ca8-4a5b-a31c-7da2c4f2fa77" />