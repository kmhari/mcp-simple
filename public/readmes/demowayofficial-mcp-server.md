[English](./README.md) | [日本語](./README.ja-JP.md) | [中文](./README.zh-CN.md)

# @demoway/mcp-server

[![npm package][npm-img]][npm-url] [![Downloads][downloads-img]][downloads-url] [![Issues][issues-img]][issues-url] [![Commitizen Friendly][commitizen-img]][commitizen-url]

DemoWay MCP Server allows you to provide an existing single page or all pages in a functional flow to the AI for further modification, generating new page designs or frontend code.

You need to install the [DemoWay browser extension](https://chromewebstore.google.com/detail/demoway/nagpcohhbjekmliolabhhnmgcjndbbdi) to use it with the DemoWay MCP Server.

## Available Tools

- `download_demo_step_pretty_html`: Download the captured pages in an AI-friendly HTML format to your local computer for further modification by AI
- `search_demo_step`: Search for a specific page by keyword in the specified demo

## Usage

### Configuration

**For Mac/Linux User**

```json
{
  "mcpServers": {
    "demoway": {
      "command": "npx",
      "args": ["-y", "@demoway/mcp-server@latest"],
      "env": {
        "DEMOWAY_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

**For Windows User**

```json
{
  "mcpServers": {
    "demoway": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@demoway/mcp-server"],
      "env": {
        "DEMOWAY_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

You can get the `DEMOWAY_API_KEY` from the [dashboard in DemoWay](https://app.demoway.com/dashboard/settings/feature).

### Detailed Guide

https://demoway.com/docs/mcp

## License

MIT ©[DemoWay](https://demoway.com)

[downloads-img]: https://img.shields.io/npm/dt/@demoway/mcp-server
[downloads-url]: https://www.npmtrends.com/@demoway/mcp-server
[npm-img]: https://img.shields.io/npm/v/@demoway/mcp-server
[npm-url]: https://www.npmjs.com/package/@demoway/mcp-server
[issues-img]: https://img.shields.io/github/issues/DemoWayOfficial/mcp-server
[issues-url]: https://github.com/DemoWayOfficial/mcp-server/issues
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
