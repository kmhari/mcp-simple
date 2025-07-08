# Marketaux MCP Server
A MCP Server Implementation that integrates the [Marketaux api](https://www.marketaux.com/documentation) providing search based on entity, countries, industries, symbols etc.

### Tools

- market_aux_news_search
    - Execute the search using market aux search all api
    - inputs:
      - symbols
      - entity_types
      - industries
      - countries
      - language
      - published_before
      - published_after
      - published_on


### Configuration
#### Getting an API key

1. Sign up for a [Free account on Marketaux](https://www.marketaux.com/register)
2. Verify your email account and go to dashboard
3. Get your api token from there

#### Setting up MCP server

Add this in your `claude_desktop_config.json` file

```json
{
    "mcpServers": {
        "newsmcp": {
            "command": "node",
            "args": [
                "C:\\Path\\To\\Your\\project\\NewsMCP\\build\\index.js"
            ],
            "env": {
                "MARKETAUX_API_KEY": "Your-API-TOKEN"
            }
        }
    }
}
```

### Contributing

Contributions are welcomed! Please free to submit a PR.

> Only the Free Tier endpoint is implemented.

> Added to [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers/pull/925)
### Disclaimer

This is not officially associated with Marketaux api. It is a third party implementation of the api with a MCP Server.
