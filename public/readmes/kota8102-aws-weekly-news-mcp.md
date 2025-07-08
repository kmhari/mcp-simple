# 週刊 AWS JP MCP Server

日本語版『週刊 AWS』タグ記事を取得するためのMCPサーバー

## 機能

- 指定された日数内の「週刊AWS」日本語版ブログ記事のリストを取得します。
-「週刊AWS」日本語版ブログの最新記事の詳細（本文コンテンツ含む）を取得します。
-「週刊生成AI with AWS」日本語版ブログの最新記事の詳細（本文コンテンツ含む）を取得します。

## 前提条件

- Python 3.11以上
- [uv](https://github.com/astral-sh/uv) - 高速Pythonパッケージインストーラー

## インストール

Claude DesktopやCursorなどのMCPをサポートするアプリケーションで使用するために、以下のような設定を行います（例: `~/.mcp/mcp.json`）:

```json
{
  "mcpServers": {
    "custom.weekly-aws-jp-mcp-server": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/mcp-awsnews-python", // このリポジトリをクローンしたディレクトリへの絶対パスを指定してください
        "run",
        "server.py"
      ]
    }
  }
}
```

## ツールとリソース

このサーバーは以下のツールをMCPインターフェースを通じて提供します：

- `get_weekly_jp_updates(days: int = 7, limit: int = 10)` - 指定された日数内の「週刊AWS」日本語版ブログ記事のリストを取得します。
  - `days` - 何日前までの記事を取得するか (デフォルト: 7)
  - `limit` - 最大取得件数 (デフォルト: 10)
- `get_latest_jp_update_details()` - 「週刊AWS」日本語版ブログの最新記事の詳細(本文コンテンツ含む)を1件取得します。(「週刊生成AI with AWS」の記事は除外されます)
- `get_latest_generative_ai_jp_update_details()` - 「週刊生成AI with AWS」日本語版ブログの最新記事の詳細(本文コンテンツ含む)を1件取得します。
