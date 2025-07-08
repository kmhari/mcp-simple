# 🚀 Zerodha Trading Agent (MCP x Bun.js)

This is an intelligent **Stock Trading Agent** built using:
- **Bun.js** (fast JavaScript runtime)
- **Zerodha Kite Connect API**
- **Claude MCP Server Integration**

The agent allows you to **place trades**, **auto-buy/sell stocks** based on triggers, and (future roadmap) **predict stock trends** using historical data and live news.

---

## 📋 Features

- 🔥 Place **Buy** and **Sell** orders automatically via MCP Agent
- 🛡️ **Authenticate** securely using Kite Connect
- 🔄 **Auto-refresh access tokens** periodically
- 🎯 *(Coming Soon)* Smart GTT-like Watchlist based buying/selling
- 🧠 *(Coming Soon)* Stock Future Prediction using charts and news analysis
- ⚡ Built with **Bun.js** for superfast runtime
- 🎯 Fully compatible with **Claude Toolchain / MCP Agents**

---

## 📂 Project Structure

```
zerodha-trade/
├── index.ts          # MCP Server setup, defines trading tools
├── trade.ts          # Trading logic: place order, generate session
├── refreshToken.ts   # Refreshes access token using request_token
├── login.ts          # (One time) Generate new access token
├── tokenStore.json   # Stores API key, secret, access token
├── watchlist.json    # (Coming soon) GTT trigger rules
├── README.md         # Project documentation
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
bun install
```

_(Make sure you have Bun.js installed:)_

```bash
curl -fsSL https://bun.sh/install | bash
```

---

### 2. Configure API Credentials

Update `tokenStore.json` with:

```json
{
  "apiKey": "YOUR_KITE_API_KEY",
  "apiSecret": "YOUR_KITE_API_SECRET",
  "accessToken": "YOUR_ACCESS_TOKEN"
}
```

If you don't have `accessToken` yet, run:

```bash
bun login.ts
```

to generate one manually.

---

### 3. Running the Agent Server

```bash
bun index.ts
```

✅ This will:
- Auto-refresh your access token every 24 hours
- Expose trading functions to Claude Agent via MCP Server
- Run a server on `http://localhost:3000`

---

### 4. Using HTTPS Locally (via ngrok)

Since Kite Connect requires an HTTPS URL, you can use [ngrok](https://ngrok.com/) to tunnel your local server securely.

```bash
brew install ngrok   # Install ngrok (if not already installed)
ngrok http 3000      # Expose port 3000 via HTTPS
```

After running, you will get a public HTTPS URL like `https://abc1234.ngrok.io`. Use this URL as your **Redirect URL** when creating your Kite Connect App.

---

### 5. Creating Kite Connect App (to get API Key/Secret)

1. Go to [Kite Developer Console](https://developers.kite.trade/apps)
2. Click **Create New App**
3. Fill in:
   - **App Name:** (Any meaningful name)
   - **Redirect URL:** (Paste your `https://xyz.ngrok.io` URL)
   - **Postback URL:** (Same or another ngrok HTTPS URL)
   - **Products:** Kite Connect
   - **Exchange:** NSE, BSE, etc.
4. After creation, you will get **API Key** and **API Secret**
5. Update `tokenStore.json` accordingly

---

## 🚀 MCP Server Configuration Example

```json
{
  "mcpServers": {
    "zerodha-trade": {
      "command": "/Users/vamsi/.bun/bin/bun",
      "args": [
        "--directory",
        "/Users/vamsi/Projects/zerodha-trade",
        "index.ts"
      ]
    }
  }
}
```

---

## 🛠️ Future Enhancements (Roadmap)

- 🔔 Smart GTT Trigger system: Buy/sell when price crosses target
- 📈 Stock Future Prediction Agent (using historical price + live news)
- 📊 Auto SIP Bot for ETFs like Nifty50
- 📬 Telegram/Slack Alerts on successful order execution
- 📉 Stop Loss Automation on Portfolio Holdings

---

## 🤖 How It Works (High Level)

1. MCP Agent requests `buyStock(symbol, quantity)` or `sellStock(symbol, quantity)`
2. Agent server uses Kite Connect API to place orders
3. Access token refreshed every day automatically
4. *(Upcoming)* Background service watches prices to auto-trigger GTT-like orders
5. *(Upcoming)* News + Chart analysis predict stock trend

---

## ✨ Credits

- [Zerodha Kite Connect API](https://kite.trade/)
- [Bun.js](https://bun.sh/)
- [Claude Model Context Protocol](https://modelcontextprotocol.io/)
- [Zerodha Developer Community](https://kite.trade/forum/)

---

