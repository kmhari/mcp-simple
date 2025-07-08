# ZapCap MCP Server

[![PyPI version](https://badge.fury.io/py/zapcap-mcp-server.svg)](https://pypi.org/project/zapcap-mcp-server/)
[![MCP Server](https://img.shields.io/badge/MCP-Server-blue?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)](https://modelcontextprotocol.io/)
[![Author](https://img.shields.io/badge/by-Bogdan%20Minko-purple?style=flat)](https://bogdan01m.github.io/)

**NOTE**: This is an unofficial implementation of MCP Server for ZapCap.

An MCP (Model Context Protocol) server that provides tools for uploading videos, creating processing tasks, and monitoring their progress through the [ZapCap API](https://zapcap.ai/).

## Requirements

- uv 
- ZapCap API key


You can install uv from here: https://docs.astral.sh/uv/

You can get api key from ZapCap API after registation at https://zapcap.ai/ in their platform here: https://platform.zapcap.ai/dashboard/api-key

## Installation in MCP-client

Add to your MCP client `mcp.json` configuration (e.g., Claude Desktop, Cursor and etc.):

```json
{
  "mcpServers": {
    "zapcap": {
      "command": "uvx",
      "args": ["zapcap-mcp-server"],
      "env": {
        "ZAPCAP_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Alternative Installation

```bash
uv tool install zapcap-mcp-server
```

## Configuration

Set your ZapCap API key as an environment variable:

```bash
export ZAPCAP_API_KEY="your_api_key_here"
```

## Usage

### Demo Videos

**How to use:**

[<img src="https://img.youtube.com/vi/GcoyTgTVd6Q/maxresdefault.jpg" width="100%">](https://youtu.be/GcoyTgTVd6Q)

**Results:**

[<img src="https://img.youtube.com/vi/rxqAQZRiyxA/maxresdefault.jpg" width="100%">](https://youtu.be/rxqAQZRiyxA)

### Available Tools

The server provides the following tools:

### zapcap_mcp_upload_video
Upload a video file to ZapCap.

**Parameters:**
- `file_path`: Path to the video file

### zapcap_mcp_upload_video_by_url
Upload a video by URL to ZapCap.

**Parameters:**
- `url`: URL to the video file

### zapcap_mcp_get_templates
Get available processing templates from ZapCap.

### zapcap_mcp_create_task
Create a video processing task with full customization options.

**Parameters:**
- `video_id`: Video ID from upload
- `template_id`: Template ID
- `auto_approve`: Auto approve the task (default: true)
- `language`: Language code (default: "en")
- `enable_broll`: Enable B-roll (default: false)
- `broll_percent`: B-roll percentage 0-100 (default: 30)

**Subtitle options:**
- `emoji`: Enable emoji in subtitles (default: true)
- `emoji_animation`: Enable emoji animation (default: true)
- `emphasize_keywords`: Emphasize keywords (default: true)
- `animation`: Enable subtitle animation (default: true)
- `punctuation`: Include punctuation (default: true)
- `display_words`: Number of words to display (default: 1)

**Style options:**
- `position_top`: Subtitle position from top (default: 60)
- `font_uppercase`: Use uppercase font (default: true)
- `font_size`: Font size (default: 30)
- `font_weight`: Font weight (default: 900)
- `font_color`: Font color (default: "#ffffff")
- `font_shadow`: Font shadow s/m/l (default: "l")
- `stroke`: Stroke style (default: "s")
- `stroke_color`: Stroke color (default: "#000000")
- `highlight_color_1`: First highlight color (default: "#2bf82a")
- `highlight_color_2`: Second highlight color (default: "#fdfa14")
- `highlight_color_3`: Third highlight color (default: "#f01916")

### zapcap_mcp_monitor_task
Monitor task progress.

**Parameters:**
- `video_id`: Video ID
- `task_id`: Task ID

## Benefits Over Direct API Usage

### Token Management
Unlike using curl or direct API calls where you need to manually include your API key in every request:

```bash
# Traditional curl approach - token needed every time
curl -X POST "https://api.zapcap.ai/upload" \
  -H "Authorization: Bearer your_token_here" \
  -F "file=@video.mp4"
```

With this MCP server, your API key is configured once in the environment and automatically used for all operations:

```json
{
  "env": {
    "ZAPCAP_API_KEY": "your_api_key_here"
  }
}
```

### Natural Language Interface
Instead of constructing complex API requests with parameters, you can describe what you want:

**Traditional API:** 
```bash
curl -X POST "https://api.zapcap.ai/tasks" \
  -H "Authorization: Bearer token" \
  -d '{
    "video_id": "abc123",
    "template_id": "viral",
    "font_size": 30,
    "highlight_color_1": "#00ff00",
    "enable_broll": true,
    "broll_percent": 40
  }'
```

**MCP Server:**
```
"Add green highlighted subtitles with 40% B-roll using viral template"
```

### Type Safety & Validation
- **Pydantic Integration**: All parameters are validated automatically with type checking

## Future Plans

### Testing Integration
We're planning to add basic testing capabilities:

- **API Integration Tests**: Verify that ZapCap API calls work correctly
- **MCP Tool Tests**: Ensure all MCP tools respond properly to requests

### Planned Features
- **Named configurations**: Save frequently used parameter combinations ("my_brand", "youtube_style")
- **Template enhancement**: Override template defaults with consistent brand colors/fonts

## License

MIT licence
