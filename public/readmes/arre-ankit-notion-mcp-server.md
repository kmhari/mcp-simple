### Notion MCP Server

This is a simple MCP server that allows you to query Notion Pages.

### Installation

```bash
git clone https://github.com/arre-ankit/notion-mcp-server.git
cd notion-mcp-server
```

```bash
npm install
```

### Running the server

```bash
npm run build
```

### Add Notion Integration
- Go to https://www.notion.so/my-integrations
- Click on "New integration"
- Name it "Claude MCP Server"
- Select "Read" and "Write" permissions for "Pages"
- Copy the "Integration Token"

### Add Claude Integration
claude_desktop_config.json
```bash
{
  "mcpServers": 
    "notion-mcp-server": {
      "command": "node",
      "args": [
        "Copy Path"
      ],
      "env": {
        "NOTION_API_TOKEN": "Your Notion Token"
      }
    }
  }
}
```

## How to use
- Write a prompt to query Notion Pages.
- Add link to the Notion Page from the link in the prompt.
- Eg: https://www.notion.so/154916e48026802f97d4df6086787817


![alt text](image-2.png)

Prompt: Make a new Databse entry in notion with this 
of list of movies to watch in 2024
Page link https://www.notion.so/154916e48026802f97d4df6086787817 
Add the movie datase in this page

![alt text](image-1.png)


![alt text](https://github.com/user-attachments/assets/64414f72-2965-4cf1-8e56-c231b88771a2)

🤯 Woah it will be updated in your Notion Page!