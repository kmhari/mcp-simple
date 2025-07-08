# Coin MCP Server 🚀💰

Welcome to the **Coin MCP Server** – your one-stop shop for snagging the latest cryptocurrency prices faster than you can say "To the moon!" 🌙 Built with `FastMCP` and spiced up with `zod` for validation, this little server is here to fetch token prices from Bitget’s API like a trusty crypto butler. 🧑‍💼

[中文文档](README-cn.md) | English

---

## What Does It Do? 🤔

This project spins up a server that lets you query the current price of any cryptocurrency (paired with USDT) using Bitget’s slick API. Want to know how much your favorite token is worth right now? Just ask, and boom – the price is yours! 💸

- **Tool**: `getTokenPrice`
- **Mission**: Fetch the latest price of a token (e.g., `BGB`, `BTC`, `ETH`).
- **Superpower**: It’s fast, it’s simple, and it’s powered by `FastMCP`! ⚡

- **Tool**: `getAnnoucements`
- **Mission**: get annoucements

- **Tool**: `getCoinInfo`
- **Mission**: Get detailed information about a specified token.
- **Superpower**: Provides detailed information such as token transferability, supported chain list, chain network status, etc.

---

## Features 🌟

- 🎯 **Dead-Simple API**: Pass a token symbol, get a price. No fuss, no muss.
- 🛡️ **Zod Validation**: Parameters are checked tighter than a vault door.
- 📡 **Bitget Integration**: Pulls live data straight from Bitget’s market ticker API.
- 🧠 **Error Handling**: Catches hiccups like a pro and logs them for you to giggle at later.

---

## Getting Started 🏁

Ready to dive into the crypto price pool? Here’s how to get this baby running:

### Prerequisites
- **Deno**: You’ll need Deno installed because we’re fancy and modern. Grab it [here](https://deno.land/).
- **Bitget API Access**: No API key needed – we’re hitting the public endpoint like champs! But if you’ve got a custom `BGURL`, set it as an environment variable.

### Installation
1. Clone this repo like it’s hot:
   ```bash
   git clone https://github.com/pwh-pwh/coin-mcp-server.git
   cd coin-mcp-server
   ```
2. Install dependencies (Deno handles this automagically via imports!).

### Running the Server
Fire it up with:
```bash
deno run --allow-net --allow-env --allow-read main.ts
```

or
```bash
deno run --allow-net --allow-env --allow-read https://deno.land/x/coin_mcp_server/main.ts
```

- `--allow-net`: Lets us talk to Bitget’s API.
- `--allow-env`: Grabs your `BGURL` env variable if you’ve set one.

The server will start in `stdio` mode, ready to serve up prices like a crypto vending machine! 🍔

3. Support installation-free, directly deploy to deno, fork this project, log in dash.deno.com, set the environment variable StartType=sse to use the domain name provided by deno to connect in sse mode

---

### Configuration

config.json
```json
{
  "mcpServers": {
    "coin-mcp": {
      "command": "deno",
      "args": [
        "run",
        "--allow-net",
        "--allow-read",
        "--allow-env",
        "https://deno.land/x/coin_mcp_server/main.ts"
      ]
    }
  }
}
```

## Usage Example 🎮

Here’s how you’d call `getTokenPrice`:
```json
{
  "tool": "getTokenPrice",
  "parameters": {
    "token": "BGB"
  }
}
```

**Response**:
```
"42.069"  // The latest BGB/USDT price (not a real price, just vibes!)
```

If the token doesn’t exist or the API hiccups, it’ll throw an error with a cheeky log to remind you it tried its best. 😅

---

## Code Sneak Peek 👀

Here’s the magic behind the curtain:
- **FastMCP**: Spins up the server with a cool name and version.
- **Zod**: Keeps your `token` parameter in check.
- **Bitget API**: Fetches ticker data from `https://api.bitget.com/api/v2/spot/market/tickers`.

The `getBitgetPrice` function is the MVP, grabbing that sweet `lastPr` (last price) from the response. Check the logs for price updates or error comedy gold! 😂

---

## Environment Variables 🌍

- `BGURL`: Custom Bitget API base URL (defaults to `https://api.bitget.com` if not set). Set it like:
  ```bash
  export BGURL="https://your-custom-bitget-url.com"
  ```

---

## Troubleshooting 🛠️

- **“HTTP error! status: 404”**: Double-check your token symbol. `BGBUSDT` isn’t the same as `BGB`!
- **“Network error”**: Make sure you’ve got internet and Deno’s `--allow-net` flag.
- **Still stuck?**: Yell into the void (or open an issue). We’ll figure it out together! 🙌

---

## Why This Exists 🎉

Because who doesn’t want to know the price of their crypto stash in real-time? Whether you’re a trader, a HODLer, or just crypto-curious, this server’s got your back. Plus, it’s a fun way to flex some Deno skills and play with APIs. 😎

---

## Contributing 🤝

Got ideas? Found a bug? Want to add a feature like moon phase price predictions? Fork it, tweak it, PR it! Let’s make this the coolest MCP server in the galaxy. 🌌

---

## License 📜

MIT – Do whatever you want with it, just don’t blame me if your token moons or dumps! 🌑📉

---

Happy crypto hunting, and may your bags always be green! 💚
