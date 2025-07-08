# 🧠 IssueBadge MCP Server (Node.js)

This Node.js server acts as a "Model Context Protocol" (MCP) layer between your app (plugin, IDE, game, etc.), Claude AI, and the IssueBadge API.

## 🚀 Features

- Accepts a POST request to `/sendBadge`
- Optionally includes Claude-generated message (or uses default)
- Sends certificate via IssueBadge API
- Returns result to client

## 🛠 Setup

```bash
npm install
npm start
```

## 🧪 Example Request

POST `/sendBadge`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "badge_id": "W238GD8PK",
  "api_key": "your_issuebadge_api_key",
  "claude_message": "Claude's custom message here"
}
```

## 📦 Response

```json
{
  "success": true,
  "message": "Badge sent successfully",
  "claude_output": "...",
  "response": { ... }
}
```

## 🔒 Note

- You are responsible for securely managing API keys.
- To integrate Claude, call its API separately and include the output in `claude_message`.

MIT License