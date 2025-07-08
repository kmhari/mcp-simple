# MCP-WhatsApp Client

This project lets you start an MCP server from WhatsApp and interact via chat messages. It builds on [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) — follow its installation guide first.

## Prerequisites

- Node.js v18 or higher (`node -v`)
- Follow whatsapp-web.js to get a whatsapp web client ready to use 
- npm (with Node.js; verify with `npm -v`)
- OpenAI or Anthropic API key exported as environment variable:
  ```bash
  export ANTHROPIC_API_KEY=sk-...
  ```
- Git (for cloning the repo)


## Installation

1. **Clone the repository**  
   ```bash
   git clone [https://github.com/<you>/mcp-whatsapp.git](https://github.com/operation-hp/WA-MCP.git) 
   cd WA-MCP
   ```
   
2. **Edit the whatsapp-client.ts and add your phone number**
    
   ```
   const pairingCode = await this.whatsapp.requestPairingCode('+1234567890'); // enter the target phone number
   ```

3. **Install dependencies**  
   ```bash
   nvm use 20 
   npm install
   ```

3. **Build the project**  
   ```bash
   npm run build
   ```

Everything, including the compatible Chromium bundle for Puppeteer, will be downloaded automatically.

## Configure MCP servers

Edit `mcp-server.conf` in the project /build directory. This config file is same as Claude Desktop:

```json
{
  "mcpServers": {
    "python-bot": {
      "command": "python",
      "args": ["my_mcp_script.py"],
      "env": { "TOKEN": "123" },
      "cwd": "./bots"
    },
    "node-demo": {
      "command": "node",
      "args": ["--max-old-space-size=256", "demo.js"]
    }
  }
}
```
one example can be found at https://github.com/operation-hp/spotify-mcp-wa ( which supports Oauth and let you login to Spotify) 

## Running the bridge

Start the client:

```bash
npm start
```


## Troubleshooting

- **TimeoutError**:  
  If Puppeteer fails to launch Chromium, ensure you haven’t modified `src/lib/whatsapp-client.ts` launch options.

- **ENOENT mcp-server.conf**:  
  Keep the file next to `build/index.js` or update the `configPath` constant.

- **QR not shown**:  
  Delete the session cache directory and restart:  
  ```bash
  rm -rf .wwebjs_auth
  ```

## Updating

```bash
git pull
npm install
npm run build
```


Enjoy chatting with your MCP servers directly from WhatsApp!

