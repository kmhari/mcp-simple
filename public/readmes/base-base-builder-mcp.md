# Base Builder MCP - Alpha Release

This repository is an MCP server destined for Base Builders.

In this alpha release, the server contains an implementation of [Base Docs](https://docs.base.org) adapted for Model Context Protocol (MCP).

Follow the instructions below to use it 👇

## Steps to Build and Add your MCP server

- Clone the repo and navigate to the directory:

```bash
git clone https://github.com/base/base-builder-mcp
cd base-builder-mcp
```

- Install the dependencies:

```bash
npm install
```

- You can now add the server to Claude or Cursor (Project Only or Global):


```bash
npm run setup:cursor
```

```bash
npm run setup:claude
```

*Note: ✅ OPENAI Key is optional but recommended. It allows the guide to be reviewed and digested by another LLM to create a json file of the guide instead of feeding raw guide text to your agent.*

*Note 2: If you are facing issues with the last step (adding the server), you can check out [MCP documentation](https://modelcontextprotocol.io/quickstart/user) for Claude Desktop or [Cursor Docs](https://docs.cursor.com/context/model-context-protocol) for your Cursor IDE agent*


## Cursor Rules (Recommended)

Add the following to your Cursor rules by going to the command palette (Cmd/Ctrl + Shift + P) and selecting > Cursor Settings > Rules:

```js
<MCP_USE_GUIDELINE>
  <INSTRUCTION>
    If the user says "I want to build on Base", make frequent use of the BuildOnBase MCP tool from Base-Docs MCP.
  </INSTRUCTION>
  <TOOLS>
    What is the BuildOnBase tool from Base Builder MCP?
    It's a tool which allows you to browse the sidebar of Base Docs and find the relevant guides to Build on Base. If you run this tool and you get an error because the guide is not found, try other guides from the sidebar.
  </TOOLS>
</MCP_USE_GUIDELINE>
```

## Expected Result

After adding Base Builder MCP to your agent, you can use it by saying "I want to build with base". Using that should trigger a call to the Base Builder MCP server:

 ![Cursor Agent](https://i.imgur.com/uSp0vOG.png)
 *Cursor agent calling Base Builder MCP*

![Claude Agent](https://i.imgur.com/WNdcToq.png)
 *Claude agent calling Base Builder MCP*
