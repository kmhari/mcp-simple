# Productboard MCP Server

Integrate the Productboard API into agentic workflows via MCP


## Tools

1. `get_companies`
2. `get_company_detail`
3. `get_components`
4. `get_component_detail`
5. `get_features`
6. `get_feature_detail`
7. `get_feature_statuses`
8. `get_notes`
9. `get_products`
10. `get_product_detail`


## Setup

### Access Token
Obtain your access token referring to [this guidance](https://developer.productboard.com/reference/authentication#public-api-access-token)

### Usage with Claude Desktop
To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

### NPX

```json
{
  "mcpServers": {
    "productboard": {
      "command": "npx",
      "args": [
        "-y",
        "productboard-mcp"
      ],
      "env": {
        "PRODUCTBOARD_ACCESS_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.