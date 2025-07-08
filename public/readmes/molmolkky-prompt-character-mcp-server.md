# prompt-character-mcp-server

##  概要
以下のキャラクターの名台詞を取得するMCPサーバーです。

- 王騎将軍（漫画「キングダム」より、12のセリフ）

## 使い方
- このリポジトリをcloneします
- Claude DesktopのMCPサーバーの設定ファイル`claude_desktop_config.json`で以下のように設定します。すでに他のMCPサーバーを設定されている方は、カンマで区切ってから"characters"以下を追加してください。

```json
{
    "mcpServers": {
        "characters": {
            "command": "uv",
            "args": [
                "--directory",
                "<your_local_repository_path>/prompt-character-mcp-server",
                "run",
                "server.py"
            ]
        }
    }
}
```

- 早速Claude Desktopで「〇〇について、王騎将軍になったつもりで話してください」と入力してみましょう！