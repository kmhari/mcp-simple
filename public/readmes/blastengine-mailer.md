# blastengine-mailer MCP Server

Blastengine APIを使用してメールを送信するModel Context Protocol (MCP) サーバー

このJavaScriptベースのMCPサーバーは、LLM（大規模言語モデル）がBlastengine APIを通じてメールを送信できるようにします。

## 機能

### ツール
- `send_email` - Blastengine APIを使用してメールを送信
  - 必須パラメータ:
    - `to`: 送信先メールアドレス
    - `from`: 送信元メールアドレス
    - `subject`: メールの件名
    - `text`: メール本文
  - 送信成功時はdelivery_idを返します
  - エラー時は詳細なエラーメッセージを返します

## 前提条件

- Node.js (ESモジュール対応)
- Blastengine APIアカウントとAPIキー

## 開発

依存関係のインストール:
```bash
npm install
```

サーバーのビルド:
```bash
npm run build
```

開発時の自動リビルド:
```bash
npm run watch
```

## インストールと設定

### Claude Desktopでの使用

Claude Desktopで使用するには、以下の設定ファイルにサーバー設定を追加します:

macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "blastengine-mailer": {
      "command": "node",
      "env": {
        "BLASTENGINE_USER_ID": "userid-of-blastengine",
        "BLASTENGINE_API_KEY": "apikey-of-blastengine"
      },
      "args": [
        "/path/to/blastengine-mailer/server.js"
      ]
    }
  }
}
```

### デバッグ

MCPサーバーはstdio経由で通信するため、デバッグが困難な場合があります。[MCP Inspector](https://github.com/modelcontextprotocol/inspector)の使用を推奨します:

```bash
npm run inspector
```

インスペクターは、ブラウザでデバッグツールにアクセスするためのURLを提供します。

## 使用例

Claude Desktopで設定後、以下のようにメールを送信できます:

```
「test@example.comに『テストメール』という件名でメールを送信して」
```

## ライセンス

このプロジェクトはプライベートプロジェクトです。
