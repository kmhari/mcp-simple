# design-system-mcp-sandbox

デザインシステムのコンポーネント情報を取得するための MCP サーバー（sandbox 環境）

## セットアップ

1. インストール

```bash
npm install
```

2. ビルド

```bash
npm run build
```

## 使い方

### サーバーの起動（例：Cursor）

```json
{
  "mcpServers": {
    "design-system-mcp-sandbox": {
      "command": "node",
      "args": ["/path/to/design-system-mcp-sandbox/dist/index.js"],
      "env": {
        "ROOT_DIR": "/path/to/your/design-system"
      }
    }
  }
}
```

## 利用可能なツール

### get_available_components

デザインシステムで利用可能なすべてのコンポーネントの一覧を取得します。

### get_component_files

特定のコンポーネントに関連するファイルとその内容を取得します。
