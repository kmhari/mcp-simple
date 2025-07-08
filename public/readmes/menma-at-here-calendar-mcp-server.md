# calendar-mcp-server

googleカレンダーから予定一覧を取得するための MCP サーバです。

## 必要な準備

### Oauth2.0クライアントを作成し、認証用のJSONをルートディレクトリ下に置く

「デスクトップアプリ」でOAuth 2.0クライアントを作成してください。
詳しくは[こちら](https://developers.google.com/identity/protocols/oauth2?hl=ja)

クライアント作成後、以下のような認証用の JSON を取得し、 `redirect_uris` を以下のように `[http://localhost:3000/callback]` に変更した上で `credentials.json` という名前でルートディレクトリに保存してください。

```
{
  "installed": {
    "client_id": "hogehoge",
    ...
    "redirect_uris": ["http://localhost:3000/callback"]
  }
}
```

### Claude Desktop　の設定

Claude Desktop の `claude_desktop_config.json` を以下のように編集してください。

```
{
    "mcpServers": {
        "calendar": {
          "command": "npx",
          "args": ["ts-node",
              "--project",
            "/<path to>/mcp-calendar-server/tsconfig.json",
          "/<path to>/mcp-calendar-server/src/index.ts"]
        }
      }
}

```
