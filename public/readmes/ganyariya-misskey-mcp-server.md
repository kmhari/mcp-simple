<div align="center">
    <img src="./docs/images/logo.png" height="300" alt="misskey-mcp-server logo">
</div>
<br/>
<div align="center">

![GitHub stars](https://img.shields.io/github/stars/ganyariya/misskey-mcp-server?style=social)
![GitHub forks](https://img.shields.io/github/forks/ganyariya/misskey-mcp-server?style=social)
![GitHub issues](https://img.shields.io/github/issues/ganyariya/misskey-mcp-server)
![GitHub pull requests](https://img.shields.io/github/issues-pr/ganyariya/misskey-mcp-server)
![GitHub license](https://img.shields.io/github/license/ganyariya/misskey-mcp-server)
![GitHub contributors](https://img.shields.io/github/contributors/ganyariya/misskey-mcp-server)
![GitHub last commit](https://img.shields.io/github/last-commit/ganyariya/misskey-mcp-server)
[![GoDoc](https://pkg.go.dev/badge/github.com/ganyariya/misskey-mcp-server.svg)](https://pkg.go.dev/github.com/ganyariya/misskey-mcp-server)
[![Go Report Card](https://goreportcard.com/badge/github.com/ganyariya/misskey-mcp-server)](https://goreportcard.com/report/github.com/ganyariya/misskey-mcp-server)

</div>

# misskey-mcp-server

misskey-mcp-server is an **unofficial** MCP (Model Context Protocol) server for [Misskey](https://misskey-hub.net/).   
Currently, it only has **the bare minimum functionality: posting notes**.   
So, I would appreciate contributions (PRs) from everyone!

## Features

### MCP Tools Implementation Status

| MCP Tool Name | Misskey API Endpoint | Status |
|--------------|---------------------|---------|
| post_misskey_note | `/notes/create` | ✅ |
| get_misskey_note | `/notes/show` | ❌ |
| get_misskey_timeline | `/notes/timeline` | ❌ |
| get_misskey_user | `/users/show` | ❌ |
| get_misskey_user_notes | `/users/notes` | ✅ |
| get_misskey_user_following | `/users/following` | ❌ |
| get_misskey_user_followers | `/users/followers` | ❌ |
| get_misskey_notifications | `/i/notifications` | ❌ |
| get_misskey_mentions | `/notes/mentions` | ❌ |
| get_misskey_antenna | `/antennas/show` | ❌ |
| get_misskey_antenna_notes | `/antennas/notes` | ❌ |
| get_misskey_channel | `/channels/show` | ❌ |
| get_misskey_channel_notes | `/channels/notes` | ❌ |
| get_misskey_gallery | `/gallery/posts/show` | ❌ |
| get_misskey_gallery_posts | `/gallery/posts` | ❌ |
| get_misskey_page | `/pages/show` | ❌ |
| get_misskey_drive_files | `/drive/files` | ❌ |
| post_misskey_reaction | `/notes/reactions/create` | ❌ |
| delete_misskey_reaction | `/notes/reactions/delete` | ❌ |
| post_misskey_follow | `/following/create` | ❌ |
| delete_misskey_follow | `/following/delete` | ❌ |
| post_misskey_renote | `/notes/create` (renote) | ❌ |
| post_misskey_reply | `/notes/create` (reply) | ❌ |
| get_misskey_search | `/notes/search` | ❌ |
| get_misskey_search_by_tag | `/notes/search-by-tag` | ❌ |
| get_misskey_hashtags | `/hashtags/trend` | ❌ |
| get_misskey_emoji | `/emojis` | ❌ |
| get_misskey_meta | `/meta` | ❌ |
| get_misskey_instance | `/federation/instances` | ❌ |
| get_misskey_stats | `/stats` | ❌ |

## Usage

### Install

From go install

```shell
GOBIN="$HOME/go/bin" go install github.com/ganyariya/misskey-mcp-server/cmd/misskey-mcp-server@latest
```

Build your own

```shell
git clone https://github.com/ganyariya/misskey-mcp-server
cd misskey-mcp-server
go build -o misskey-mcp-server cmd/misskey-mcp-server/main.go
```

### Setup

Setup your mcp.json as below.

```json
{
  "mcpServers": {
    "misskey-mcp-server": {
      "command": "misskey-mcp-server",
      "args": [],
      "env": {
        // https://misskey-hub.net/ja/docs/for-developers/api/token/
        "MISSKEY_API_TOKEN": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        // http or https
        "MISSKEY_PROTOCOL": "https",
        // your misskey server's domain
        "MISSKEY_DOMAIN": "misskey.io", 
        "MISSKEY_PATH": ""
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

# Thanks to reference

- MCP Go Implementation
  - https://github.com/metoro-io/mcp-golang
- MCP Server References
  - https://github.com/metoro-io/metoro-mcp-server
  - https://github.com/grafana/mcp-grafana
- Misskey Go API SDK
  - https://github.com/yitsushi/go-misskey

### `get_misskey_user_notes`

Retrieves notes for a specific Misskey user.

**Arguments:**

- `userId` (string, required): The ID of the user whose notes you want to retrieve.

**Example Request:**
```json
{
  "userId": "some_user_id"
}
```
