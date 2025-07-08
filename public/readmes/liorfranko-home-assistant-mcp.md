# 🏡 Home Assistant MCP (Model Context Protocol) 🚀

**The AI-powered bridge between you and your smart home.**  
Control, monitor, and automate your Home Assistant and Node-RED setup using natural language and powerful tools—right from your favorite AI assistant!

---

## ✨ Features at a Glance

- 🤖 **AI-Driven Automations**: List, create, update, and delete automations with ease.
- 💡 **Entity Control**: Manage lights, switches, sensors, and more—individually or in bulk.
- 🎵 **Media Player Magic**: Play, pause, adjust volume, and control your home's soundscape.
- 🔄 **Real-Time Updates**: Get instant feedback and event-driven automations via WebSocket.
- 🛠️ **Node-RED Integration**: Full flow management and deployment.
- 🖥️ **Dashboard Management**: API and YAML-based Lovelace dashboard tools.
- 🧩 **Modular & Extensible**: Add new tools, domains, and integrations with minimal effort.
- 🔒 **Secure by Design**: Token-based authentication and environment-based configuration.
- 🧪 **Battle-Tested**: All tests pass after every refactor!

---

## 🚀 Quick Start

### 1️⃣ With Cursor MCP

```bash
git clone https://github.com/yourusername/home-assistant-mcp.git
cd home-assistant-mcp
npm install
npm run build
```

Create `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "home-assistant": {
      "command": "node",
      "args": ["<path/to/your/dist/folder>"],
      "env": {
        "HA_URL": "http://homeassistant.local:8123",
        "HA_TOKEN": "your_long_lived_access_token",
        "HA_WEBSOCKET_URL": "ws://homeassistant.local:8123/api/websocket",
        "NODE_RED_URL": "http://homeassistant.local:1880",
        "NODE_RED_USERNAME": "your_node_red_username",
        "NODE_RED_PASSWORD": "your_node_red_password"
      }
    }
  }
}
```

> 💡 **Tip:** Open Cursor's chat and try:  
> _"List all my Home Assistant automations"_

---

### 2️⃣ Standalone Mode

```bash
git clone https://github.com/yourusername/home-assistant-mcp.git
cd home-assistant-mcp
npm install
```

Create a `.env` file:

```
HA_URL=http://homeassistant.local:8123
HA_TOKEN=your_long_lived_access_token
HA_WEBSOCKET_URL=ws://homeassistant.local:8123/api/websocket
NODE_RED_URL=http://homeassistant.local:1880
NODE_RED_USERNAME=your_node_red_username
NODE_RED_PASSWORD=your_node_red_password
```

Build and start:

```bash
npm run build
npm start
```

---

## 🧑‍💻 Development

- **Hot reload:** `npm run dev`
- **Run tests:** `npm test`
- **Lint:** `npm run lint`
- **Format:** `npm run format`

> ✅ All tests pass after every refactor!

---

## 🛠️ Tool Reference & Examples

### Automations

- **List automations:**  
  _"Show me all automations"_
- **Create automation:**  
  _"Create an automation to turn on the living room light at sunset"_

### Entities

- **List entities:**  
  _"List all lights"_
- **Update entity:**  
  _"Turn off the kitchen light"_

### Media Players

- **Control playback:**  
  _"Pause the living room TV"_
- **Set volume:**  
  _"Set the bedroom speaker to 50%"_

### Node-RED

- **List flows:**  
  _"Show all Node-RED flows"_
- **Deploy flows:**  
  _"Deploy Node-RED flows"_

### Dashboards

- **List dashboards:**  
  _"List all Lovelace dashboards"_
- **Update dashboard:**  
  _"Update the main dashboard to add a new card"_

---

## 🤖 More LLM Prompt Examples

- 🏠 **Home Control:**
  - _"Dim the living room lights to 30% at 8pm every night."_
  - _"What sensors are currently open?"_
  - _"Turn off all lights in the house."_
  - _"Is the garage door open?"_

- 🔔 **Automations & Scheduling:**
  - _"Create an automation to notify me if the front door is left open for more than 5 minutes."_
  - _"Disable the 'Good Night' automation until tomorrow."_
  - _"List automations that control the kitchen lights."_

- 🎶 **Media & Entertainment:**
  - _"Play jazz on the living room speakers."_
  - _"Mute all media players."_
  - _"What is currently playing in the bedroom?"_

- 🧑‍🔧 **Node-RED & Advanced Flows:**
  - _"Show me all Node-RED flows that use the 'motion detected' event."_
  - _"Update the 'morning routine' flow to include weather forecast."_

- 🖥️ **Dashboards & UI:**
  - _"Add a weather card to the main dashboard."_
  - _"Remove the 'energy usage' card from the overview dashboard."_

- 🎭 **Scenes & Themes:**
  - _"Activate the 'Movie Night' scene."_
  - _"Switch to dark theme at sunset automatically."_

- 🔄 **Updates & Maintenance:**
  - _"Check for Home Assistant updates."_
  - _"Update all add-ons to the latest version."_

- 🛠️ **Troubleshooting & Info:**
  - _"Why did the 'morning lights' automation fail?"_
  - _"Show me the last 10 log entries for the thermostat."_
  - _"Validate my Home Assistant configuration."_

- 📦 **MQTT & Integrations:**
  - _"Publish 'ON' to topic 'home/garden/lights'."_
  - _"Subscribe to MQTT topic 'home/alerts'."_

- 🕹️ **Custom Services:**
  - _"Call the 'vacuum.start' service for the living room vacuum."_
  - _"Restart Home Assistant core."_

---

## 🏗️ Architectural Patterns

- 🧩 **Modular, domain-driven tool architecture**
- 🔌 **REST & WebSocket separation**
- 🗃️ **Explicit tool registration in `src/index.ts`**
- 🛡️ **Strong typing & validation**
- 🕹️ **Observer/EventEmitter for real-time events**
- 🏭 **Factory & strategy for tool creation**
- 🦾 **Singleton WebSocket client**
- 🧪 **Comprehensive error handling & automated testing**

---

## 🗂️ Project Structure

```
src/
  config/         # Configuration logic
  tools/          # All tool implementations (REST & WebSocket)
  types/          # TypeScript type definitions
  utils/          # API & WebSocket utilities
  index.ts        # Explicit tool registration
dist/             # Compiled output
```

---

## 🔐 Security

- Keep your Home Assistant token safe!
- Use a restricted user for the access token.
- All WebSocket connections are authenticated.

---

## 🆘 Troubleshooting

- **Node.js error?**  
  Use Node.js v20.10.0+ (`nvm install 20.10.0`)
- **Connection issues?**  
  Check your Home Assistant and Node-RED URLs and tokens.
- **Test failures?**  
  Run `npm test` and review the output.

---

## 📝 License

MIT

---

## ⭐️ Contributing

1. Fork the repo
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass (`npm test`)
5. Submit a pull request!

---

## 💬 Example Usage

```bash
# List all automations
curl -X GET http://localhost:3000/api/automations -H 'Authorization: ApiKey <your_token>'

# Turn on a light
curl -X POST http://localhost:3000/api/action \
  -H 'Authorization: ApiKey <your_token>' \
  -H 'Content-Type: application/json' \
  -d '{"action": "turn_on_lights", "parameters": {"room": "living_room"}}'
```

---

## 📎 Resources

- [Home Assistant Docs](https://www.home-assistant.io/docs/)
- [Node-RED Docs](https://nodered.org/docs/)
- [Project GitHub](https://github.com/yourusername/home-assistant-mcp)
