# docker imageビルドコマンド
```
cd playwright
docker build -t playwright-mcp .
```

```
cd google-search
docker build -t google-search-mcp .
```

# WindowsでのClaude Desktopでのmcpの設定
1. `C:\Users\{ユーザー名}\AppData\Roaming\Claude\claude_desktop_config.json`を開く
2. `claude_desktop_config.json`に以下を追記
```json
{
  "mcpServers": {
    "playwright": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "playwright-mcp"]
    },
    "googlesearch": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GOOGLE_SEARCH_ENGINE_ID",
        "-e",
        "GOOGLE_API_KEY",
        "google-search-mcp"
      ],
      "env": {
        "GOOGLE_SEARCH_ENGINE_ID": "XXXXXXXXXXXXXXXX",
        "GOOGLE_API_KEY": "XXXXXXXXXXXXXX"
      }
    }
  }
}
```
3. `claude_desktop_config.json`を保存
4. Claude Desktopを再起動