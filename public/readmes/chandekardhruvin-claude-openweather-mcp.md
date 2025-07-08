## 🌦️ Claude Weather Agent (MCP-Enabled)

This project enables Claude to interact with **live weather data** (current + forecast) using the OpenWeather API via an **MCP (Multi-Command Protocol) server**.

It includes:
- FastMCP server using Python
- Weather tools (`get_weather` and `get_forecast`)
- Environment variable-based API security
- Easy integration with `claude_desktop_config.py`

---

### 🚀 How to Run the MCP Server

1. **Clone this repo** and navigate into it:

```bash
git clone https://github.com/ChandekarDhruvin/claude-openweather-mcp.git
cd claude-weather-agent/weather
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Create a `.env` file** in the same directory as `weather.py`:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
```

4. **Start the MCP server manually (for testing):**

```bash
python weather.py
```

---

### 🧠 Tools Exposed to Claude

| Tool           | Parameters                | Description                                |
|----------------|---------------------------|--------------------------------------------|
| `get_weather`  | `city: str`, `country: str = "IN"` | Returns current weather conditions.         |
| `get_forecast` | `city: str`, `country: str = "IN"` | Provides a 5-day forecast (around noon).    |

---

### 🛠️ Claude Integration: `claude_desktop_config.py`

Add the following to your Claude config to auto-start the MCP server:

```json
{
  "mcpServers": {
    "weather": {
      "command": "C:\\path\\to\\uv.exe",
      "args": [
        "--directory",
        "C:\\path\\to\\weather\\folder",
        "run",
        "C:\\path\\to\\weather\\weather.py"
      ]
    }
  }
}
```

> 📝 **Note:** You must adjust the path to match your local Python virtual environment and directory structure.

---

### 📂 Project Structure

```
weather/
├── weather.py            # Main FastMCP server with weather tools
├── .env                  # Contains the OpenWeather API key
├── requirements.txt      # Dependencies
└── README.md             # You're reading it!
```

---

### 🔒 Environment Variables

Using `python-dotenv`, we securely load the OpenWeather API key from a `.env` file.

```python
from dotenv import load_dotenv
import os

load_dotenv()
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
```

---

### ✅ Requirements

Add this in your `requirements.txt`:

```txt
httpx
python-dotenv
fastmcp
```

---

### 
![Screenshot 2025-04-14 145544](https://github.com/user-attachments/assets/500ade03-bcb6-493a-8a28-74ffdcf8f085)


```
User: What's the weather like in Mumbai today?
Claude: 
Current weather in Mumbai, IN:
Condition: Clear (clear sky)
Temperature: 32°C (Feels like 35°C)
Humidity: 58%
Wind Speed: 3.5 m/s
```

---
# Reference
https://modelcontextprotocol.io/
