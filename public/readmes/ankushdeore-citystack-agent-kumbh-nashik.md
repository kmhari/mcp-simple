# 🏙️ CityStack Agent – Kumbh Nashik 2027
<img src="http://nanda-registry.com/api/v1/verification/badge/6c8bef94-6de4-44d4-855a-237ed103c513/" alt="Verified MCP Server" />

**CityStack Agent** is a small Python-based tool that helps people find civic services like hospitals during large events — starting with the **Kumbh Mela 2027 in Nashik**.

It uses real-time data and can run on local devices, with Internet.

---

This project uses the **Model Context Protocol (MCP)** — a simple way to define and run local AI tools, like "find hospitals in Nashik", from chat interfaces or other apps. MCP makes it easy to connect real data and actions to AI agents.

---

## ✨ What It Can Do

- 🔍 Find nearby hospitals in Nashik using real data
- 🛠️ Works with Claude Desktop (or CLI) as a tool
- ⚙️ Built using Python and the MCP tool server
- 🔗 Connects to live civic data (ArcGIS)

---

## ℹ️ About MCP

MCP (Model Context Protocol) is a lightweight way to define tools that AI models (like Claude or GPT) can call to fetch live data or take actions. This project includes a working MCP tool that looks up hospitals using real-time data.

---

## 🚀 How to Run It

### 1. Clone the Project

```bash
git clone https://github.com/ankushdeore/citystack-agent-kumbh-nashik.git
cd citystack-agent-kumbh-nashik
```

### 2. Set Up the Environment (with [uv](https://astral.sh/uv))

```bash
uv venv
source .venv/bin/activate
uv pip install
```

### 3. Start the Server

```bash
uv run server.py
```

### 4. (Optional) Run Tool Simulator

```bash
uv run simulate_citystack.py
```

---

## 🧪 Example Tool: `find_civic_resource`

Looks up hospitals in Nashik.

**Input:**

```json
{ "resource_type": "hospital" }
```

**Example Output:**

```
Hospital A – Address 1 📍 (20.000000, 73.750000)
Hospital B – Address 2 📍 (20.005000, 73.760000)
```

---

## 📁 Folder Structure

```
citystack-agent-kumbh-nashik/
├── server.py              # Starts the tool server
├── tools/
│   └── find_civic_resource.py
├── simulate_citystack.py  # For testing locally
├── pyproject.toml
├── .gitignore
└── README.md
```

---

## 💻 Claude Desktop Setup

To use this with Claude Desktop, create a `claude_config.json` file:

```json
{
  "mcpServers": {
    "citystack-kumbh": {
      "command": "uv",
      "args": [
        "--directory",
        "/Users/yourname/path/to/citystack-agent-kumbh-nashik",
        "run",
        "server.py"
      ]
    }
  }
}
```

Replace the path with your actual project location.

---

## 🌐 Deployment Notes

For cloud platforms like Render or Replit:

- Make sure `server.py` listens on `0.0.0.0` and gets the port from environment:

```python
import os
port = int(os.environ.get("PORT", 8000))
```

- Start command:

```bash
uv run server.py
```

### 🔧 MCP Modifications

- ✅ Caching: repeated queries return from memory
- ✅ Privacy: added small random noise to hospital coordinates

---

## 🛣️ What's Next

Future Scope:

- 🚽 Toilet finder
- 🚰 Drinking Water finder
- 👮 Nearby police stations
- 📢 Emergency alert system
- 🛐 Cultural site guide

---

## 🙏 Credits

- **Data**: ArcGIS Open Data (https://www.arcgis.com)
- **Inspiration**: MIT Kumbhathon, CityStack idea, and Decentralized AI research
