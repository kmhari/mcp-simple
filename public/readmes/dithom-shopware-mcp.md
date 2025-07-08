# Shopware MCP

A local Model Context Protocol (MCP) server for Shopware plugin development. This project aims to automate bugfixing for Shopware plugins as much as possible by considering support tickets, affected Shopware versions, and affected plugin versions using LLMs in your IDE. 

## Tools

- ✅ "start-plugin-fix": Detailed instructions on how to approach fixing a bug in a Shopware plugin
- ✅ "get-support-ticket": Support ticket information retrieval (Sensitive data and customer information are stored in dedicated properties, which are **not passed to the LLM**. However, if a customer includes sensitive data directly in the ticket content, it will be.)
- ✅ "check-environment" and "setup-environment": Environment setup based on support ticket information (cloning of Shopware and plugin repo in affected versions)
- 👷‍♂️ Planned: Check code, run existing tests and interact with the browser via MCP to fix bugs

Note: I'm new to MCP development. I'm open to any suggestions and tips!

## Connect to server

Currently you will have to work with a project specific MCP configuration. Right now this is the only way to be able to provide path information about the project to the MCP server on a per project basis.

Create `.cursor/mcp.json` (in case you are using Cursor) in your desired project location with the following content:

```
{
  "mcpServers": {
    "shopware-mcp": {
      "command": "npx",
      "args": ["-y", "@studiosolid/shopware-mcp"],
      "env": {
        "SHOPWARE_ACCOUNT_EMAIL": "YOUR_SHOPWARE_ACCOUNT_EMAIL",
        "SHOPWARE_ACCOUNT_PASSWORD": "YOUR_SHOPWARE_ACCOUNT_PASSWORD"
        "PROJECT_DIRECTORY": "/absolute/path/to/project"
      }
    }
  }
}
```

Check it's connecting successfully. Then you can prompt something like:

```
Use "start-plugin-fix" to stat fixing the plugin affected by support ticket ABCDE-123456.
```

or also simply

```
Can you show me info about ABCDE-123456?
```