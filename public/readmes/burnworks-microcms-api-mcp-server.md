# microCMS MCP サーバ

このプロジェクトは、[Model Context Protocol (MCP)](https://modelcontextprotocol.io) を使用して microCMS の API にアクセスするサーバを実装したものです。

## 概要

microCMS MCP サーバは以下の機能を提供します：

1. **コンテンツ一覧取得**：指定したエンドポイントからコンテンツ一覧を取得
2. **特定コンテンツ取得**：ID を指定して特定のコンテンツを取得
3. **コンテンツ検索**：キーワード検索によるコンテンツの取得
4. **フィルター検索**：複雑な条件でのコンテンツのフィルタリング

## インストール

```bash
# リポジトリのクローン
git clone https://github.com/burnworks/microcms-api-mcp-server
cd microcms-api-mcp-server

# 依存関係のインストール
npm install
```

## 使用方法

### 必要なファイルのビルド

```bash
# TypeScriptをコンパイル
npm run build
```

`dist/` ディレクトリ内に必要なファイルが生成されます。

### MCP クライアントからの使用

このサーバは MCP プロトコルに準拠しており、任意の MCP クライアントから接続して使用できます。

#### Claude デスクトップアプリでの利用

`claude_desktop_config.json` に下記のように設定してください。

```json
{
  "mcpServers": {
    "microcms": {
      "command": "node",
      "args": [
        "/[__path__]/microcms-api-mcp-server/dist/index.js"
      ],
      "env": {
        "MICROCMS_API_KEY": "__your_api_key_here__",
        "MICROCMS_BASE_URL": "https://your-service.microcms.io"
      }
    }
  }
}
```

Windows 環境であれば下記のような設定になるかもしれません。

```json
{
  "mcpServers": {
    "microcms": {
      "command": "C:/Program Files/nodejs/node.exe",
      "args": [
        "C:/[__path__]/microcms-api-mcp-server/dist/index.js"
      ],
      "env": {
        "MICROCMS_API_KEY": "__your_api_key_here__",
        "MICROCMS_BASE_URL": "https://your-service.microcms.io"
      }
    }
  }
}
```

## 利用可能なツール

例えば下記のようなプロンプトで microCMS API にアクセスできます。

```
blog エンドポイントから、最新の記事10件分のタイトルを取得して
```

### `get_contents`

コンテンツ一覧を取得します。

**パラメータ**:
- `endpoint`: 取得したい microCMS の API エンドポイント（例: 'blog'）
- `limit`: 取得する件数（オプション、デフォルト: 10、最大: 100）
- `offset`: 取得開始位置のオフセット（オプション）
- `orders`: 並び替え（オプション、例: 'publishedAt' または '-publishedAt'）
- `q`: 全文検索クエリ（オプション）
- `filters`: フィルタ条件（オプション、例: 'title[contains]テスト'）
- `fields`: 取得フィールド（オプション、例: 'id,title,publishedAt'）
- `depth`: 参照の深さ（オプション、1-3）

### `get_content`

特定のコンテンツを取得します。

**パラメータ**:
- `endpoint`: 取得したい microCMS の API エンドポイント（例: 'blog'）
- `contentId`: 取得したいコンテンツの ID
- `fields`: 取得フィールド（オプション、例: 'id,title,publishedAt'）
- `depth`: 参照の深さ（オプション、1-3）
- `draftKey`: 下書きコンテンツを取得するためのキー（オプション）

### `search_contents`

キーワード検索でコンテンツを取得します。

**パラメータ**:
- `endpoint`: 検索対象の microCMS の API エンドポイント（例: 'blog'）
- `q`: 検索キーワード
- `limit`: 取得する件数（オプション、デフォルト: 10、最大: 100）
- `offset`: 取得開始位置のオフセット（オプション）
- `fields`: 取得フィールド（オプション、例: 'id,title,publishedAt'）
- `depth`: 参照の深さ（オプション、1-3）

### `filter_contents`

複雑な条件でコンテンツをフィルタリングします。

**パラメータ**:
- `endpoint`: 検索対象の microCMS の API エンドポイント（例: 'blog'）
- `filters`: フィルター条件（例: 'category[equals]news[and]createdAt[greater_than]2023-01-01'）
- `limit`: 取得する件数（オプション、デフォルト: 10、最大: 100）
- `offset`: 取得開始位置のオフセット（オプション）
- `fields`: 取得フィールド（オプション、例: 'id,title,publishedAt'）
- `depth`: 参照の深さ（オプション、1-3）

## 利用可能なリソース

### `microcms://{endpoint}/{contentId}`

特定の ID のコンテンツを取得するためのリソース URI テンプレート。

### `microcms://{endpoint}`

コンテンツ一覧を取得するためのリソース URI テンプレート。

## ライセンス

MIT
