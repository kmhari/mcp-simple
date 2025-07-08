# Shopify Python MCP Server

Shopify APIと連携するMCPサーバーです。このサーバーを使用することで、Claude DesktopからShopifyの商品情報を取得・操作することができます。

<a href="https://glama.ai/mcp/servers/zfff0mhppb">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/zfff0mhppb/badge" alt="Shopify Python Server MCP server" />
</a>

## 機能

### ツール

このサーバーは以下のツールを提供します：

1. **list_products**: 商品一覧を取得する
   - `limit`: 取得する商品数（最大250、デフォルト値は50）

2. **get_product**: 商品の詳細情報を取得する
   - `product_id`: 商品ID（必須）

3. **create_product**: 新しい商品を作成する
   - `title`: 商品名（必須）
   - `body_html`: 商品の説明（HTML形式）
   - `vendor`: ベンダー名
   - `product_type`: 商品タイプ
   - `tags`: タグ（カンマ区切り）
   - `status`: ステータス（active/draft/archived）
   - `variants`: バリエーション
   - `options`: オプション
   - `images`: 画像

4. **update_product**: 商品を更新する
   - `product_id`: 商品ID（必須）
   - `title`: 商品名
   - `body_html`: 商品の説明（HTML形式）
   - `vendor`: ベンダー名
   - `product_type`: 商品タイプ
   - `tags`: タグ（カンマ区切り）
   - `status`: ステータス（active/draft/archived）
   - `variants`: バリエーション
   - `options`: オプション
   - `images`: 画像

5. **delete_product**: 商品を削除する
   - `product_id`: 商品ID（必須）

## 設定

### 必要な環境変数

このサーバーを使用するには、以下の環境変数を設定する必要があります：

- `SHOPIFY_SHOP_URL`: ShopifyストアのURL（例: mystore.myshopify.com）
- `SHOPIFY_API_KEY`: Shopify Admin APIのAPIキー
- `SHOPIFY_API_PASSWORD`: Shopify Admin APIのAPIパスワード（Secret）
- `SHOPIFY_API_VERSION`: Shopify APIのバージョン（デフォルト: 2023-10）

### Claude Desktopでの設定

Claude Desktopで使用する場合は、以下の設定をclaude_desktop_config.jsonに追加します：

#### macOS
設定ファイルの場所: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
"mcpServers": {
  "shopify-py-mcp": {
    "command": "uv",
    "args": [
      "--directory",
      "/your_path/shopify-py-mcp",
      "run",
      "shopify-py-mcp"
    ],
    "env": {
      "SHOPIFY_SHOP_URL": "your-store.myshopify.com",
      "SHOPIFY_API_KEY": "your-api-key",
      "SHOPIFY_API_PASSWORD": "your-api-password",
      "SHOPIFY_API_VERSION": "2023-10"
    }
  }
}
```

## 使用方法

Claude Desktopでこのサーバーを使用するには、以下のようにツールを呼び出します：

### 商品一覧の取得

```
商品一覧を取得してください。
```

### 商品の詳細情報の取得

```
商品ID 1234567890の詳細情報を取得してください。
```

### 新しい商品の作成

```
以下の情報で新しい商品を作成してください：
- 商品名: サンプル商品
- 説明: これはサンプル商品です。
- 価格: 1000円
```

### 商品の更新

```
商品ID 1234567890を以下の情報で更新してください：
- 商品名: 更新後の商品名
- 価格: 2000円
```

### 商品の削除

```
商品ID 1234567890を削除してください。
```

## 開発

### 依存関係のインストール

```bash
cd shopify-py-mcp
uv sync --dev --all-extras
```

### デバッグ

MCP Inspectorを使用してデバッグすることができます：

```bash
npx @modelcontextprotocol/inspector uv --directory /your_path/shopify-py-mcp run shopify-py-mcp
```

### ビルドと公開

パッケージを配布用に準備するには：

1. 依存関係を同期してロックファイルを更新：
```bash
uv sync
```

2. パッケージのビルド：
```bash
uv build
```

3. PyPIに公開：
```bash
uv publish
```

注意: PyPIの認証情報を環境変数またはコマンドフラグで設定する必要があります：
- トークン: `--token` または `UV_PUBLISH_TOKEN`
- またはユーザー名/パスワード: `--username`/`UV_PUBLISH_USERNAME` と `--password`/`UV_PUBLISH_PASSWORD`