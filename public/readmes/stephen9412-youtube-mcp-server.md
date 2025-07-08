# Runnable YouTube MCP Server

A FastMCP server for YouTube: unified video/channel/playlist info, download, and management tools for memo agents and automation.

---

## Why this project?

Most YouTube MCP servers available are either unmaintainable, fail to compile, or are implemented only in Python and provide only basic video download features.  
When building my own memo agent, I found it difficult to automatically retrieve YouTube video information for summarization and automation.  
This project was created to solve that problem and provide a robust, extensible, and developer-friendly YouTube MCP server.

---

## ✨ Features

- Unified access to YouTube video, channel, and playlist information
- Download video/audio streams in various formats and qualities
- Extract and process video thumbnails
- Manage playlist content (add, remove, reorder)
- Manage video privacy status (public/private/unlisted)
- List available subtitle languages
- Designed for integration with memo agents and automation workflows
- Extensible, maintainable, and fully open source

---

## 🛠️ Available Tools

| Tool Name            | Description                                         | Status      |
|----------------------|-----------------------------------------------------|-------------|
| describeVideo        | Get video information (selectable sections)         | ✅          |
| getDownloadOptions   | Get available download formats/qualities            | ❌          |
| downloadVideo        | Download video/audio stream                         | ❌          |
| extractThumbnail     | Extract and process video thumbnail                 | ❌          |
| listSubtitleLanguages| Get available subtitle languages for a video        | ❌          |
| manageVideoStatus    | Manage video privacy status                         | ❌          |
| describeChannel      | Get public channel information                      | ❌          |
| describePlaylist     | Get public playlist information                     | ❌          |
| managePlaylistItems  | Playlist content management (add/remove/reorder)    | ❌          |

> Only `describeVideo` is currently tested and working. Others are implemented but not fully tested.

---

## 🚀 Installation

### Prerequisites

- Node.js 18+
- YouTube Data API v3 key

### Install

```bash
npm install youtube-mcp-server
```

### Environment Variables

Create a `.env` file or set these variables in your environment:

```text
YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
DOWNLOAD_BASE_DIR=./downloads
```

### Run in Development

```bash
npm run dev
```

### Run in Production

```bash
npm run build
npm start
```

---

## 🧩 MCP Integration Example

```json
{
  "mcpServers": {
    "youtube": {
      "command": "npx",
      "args": [
        "tsx",
        "/PATH/TO/YOUR_PROJECT/src/server.ts"
      ],
      "env": {
        "YOUTUBE_API_KEY": "YOUR_YOUTUBE_API_KEY"
      }
    }
  }
}
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Visit the [issues page](https://github.com/stephen9412/youtube-mcp-server/issues).

---

## 📄 License

[MIT License](LICENSE) - Copyright (c) 2025 Stephen J. Li

---

[中文版 README](README_zh-TW.md)
