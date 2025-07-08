
<img src="https://u301.com/app.svg" style="width: 40px; height: 40px;" />

# U301 URL Shortener MCP Server

[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/de61379b-1f01-4f6f-8690-8456ec0e0d9b)

Use MCP Server to create short URLs.

<img width="380" height="200" src="https://glama.ai/mcp/servers/@tealight-uk/u301-mcp/badge" alt="U301 URL Shortener MCP Server" />

## Supported Params
* `url` - The URL to shorten
* `slug` - (optional) The slug of the URL
* `expires` - (optional) The time in seconds until the URL expires
* `password` - (optional) The password to access the URL
* `comment` - (optional) The comment to display in Dashboard

## Environment Variables
* `API_KEY` - The U301 API key, required for creating short URLs
* `domain` - (optional) The short URL domain, leave blank for default
* `workspaceId` - (optional) Which workspace to use, leave blank for default

## How to use
- Step 1: Create an API in [U301 Dashboard](https://u301.com)
- Step 2: (Optional) Add your own domain by connectting to cloudflare
- Step 3: Add this MCP Server config

```json
{
  "mcpServers": {
    "u301-url-shortener": {
      "command": "npx",
      "args": [
        "-y",
        "@u301/mcp"
      ],
      "env": {
        "U301_API_KEY": <Your-U301-API-Key>
        // "domain": <if you have one, or you don't need to config>
      }
    }
  }
}
```
Now you can tell AI (cursor, windsurf)

> Replace the long URLs in the comments of this file with meaningful and memorable short URLs.

## License
The MIT License

<img src="https://u301.com/u301-logo-v3.svg" style="width: 120px; height: 120px;" />

Official Website: [https://u301.com](https://u301.com)