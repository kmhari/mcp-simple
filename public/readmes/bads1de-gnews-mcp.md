# GNews API MCP Server

An MCP server implementation that integrates with the GNews API, providing access to the latest news articles across various categories and languages.

GNews API と連携する MCP サーバーの実装で、様々なカテゴリや言語にわたる最新のニュース記事へのアクセスを提供します。

## Features

- **Global News Coverage**: Access news from over 60,000 sources worldwide
- **Multiple Languages**: Support for 22 languages including Japanese, English, and more
- **Category-based News**: Access news from different categories like general, business, technology, sports, etc.
- **Keyword Search**: Search for news articles containing specific keywords
- **Customizable Results**: Control the number of results returned
- **Rich Content**: Get article titles, publication dates, links, and content snippets

**日本語**

- **グローバルニュースカバレッジ**: 世界中の 60,000 以上のソースからニュースにアクセス
- **複数言語対応**: 日本語、英語を含む、22 の言語をサポート
- **カテゴリベースのニュース**: 一般、ビジネス、テクノロジー、スポーツなど、様々なカテゴリのニュースにアクセス
- **キーワード検索**: 特定のキーワードを含むニュース記事を検索
- **カスタマイズ可能な結果**: 返される結果の数を制御
- **リッチコンテンツ**: 記事のタイトル、発行日、リンク、コンテンツスニペットを取得

## Tools

- **search-news**

  - Search for news articles containing specific keywords
  - Inputs:
    - `keyword` (string): Search term
    - `lang` (string, optional): Language code (default: ja)
    - `country` (string, optional): Country code (default: jp)
    - `max` (number, optional): Number of results to return (max 10, default 5)

- **get-top-headlines**
  - Retrieve the latest top headlines from a specified category
  - Inputs:
    - `category` (string, optional): News category (general, world, nation, business, technology, entertainment, sports, science, health)
    - `lang` (string, optional): Language code (default: ja)
    - `country` (string, optional): Country code (default: jp)
    - `max` (number, optional): Number of results to return (max 10, default 5)

**日本語**

- **search-news**

  - 特定のキーワードを含むニュース記事を検索
  - 入力パラメータ:
    - `keyword` (string): 検索キーワード
    - `lang` (string, オプション): 言語コード (デフォルト: ja)
    - `country` (string, オプション): 国コード (デフォルト: jp)
    - `max` (number, オプション): 返される結果の数 (最大 10、デフォルト 5)

- **get-top-headlines**
  - 指定されたカテゴリの最新トップヘッドラインを取得
  - 入力パラメータ:
    - `category` (string, オプション): ニュースカテゴリ (general, world, nation, business, technology, entertainment, sports, science, health)
    - `lang` (string, オプション): 言語コード (デフォルト: ja)
    - `country` (string, オプション): 国コード (デフォルト: jp)
    - `max` (number, オプション): 返される結果の数 (最大 10、デフォルト 5)

## Configuration

### Getting an API Key

1. Sign up for a [GNews.io](https://gnews.io/register) account
2. Choose a plan (Free tier available with 100 requests/day)
3. Generate your API key

**日本語**

1. [GNews.io](https://gnews.io/register) でアカウントを作成
2. プランを選択（無料プランは 1 日 100 リクエスト）
3. API キーを生成

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

**日本語**: `claude_desktop_config.json` に以下を追加します：

### Docker

```json
{
  "mcpServers": {
    "gnews": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GNEWS_API_KEY", "mcp/gnews"],
      "env": {
        "GNEWS_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### NPX

```json
{
  "mcpServers": {
    "gnews": {
      "command": "npx",
      "args": ["-y", "@bads1de/mcp-server-gnews"],
      "env": {
        "GNEWS_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### Local

```json
{
  "mcpServers": {
    "gnews": {
      "command": "node",
      "args": ["path/to/mcp-server-gnews/dist/index.js"],
      "env": {
        "GNEWS_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

## Build

Docker build:

```bash
# Build the Docker image
docker build -t mcp/gnews:latest .
```

**日本語**

```bash
# Dockerイメージをビルド
docker build -t mcp/gnews:latest .
```

Local build and run:

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

**日本語**

```bash
# 依存関係のインストール
npm install

# プロジェクトのビルド
npm run build
```

## Example Queries

Here are some example queries you can use with this server:

1. Search for news about a specific topic:

   ```
   Search for news about artificial intelligence
   ```

2. Get top headlines in the technology category:

   ```
   Get the latest technology headlines
   ```

3. Search for news in a specific language and country:

   ```
   Find news about climate change in English from the US
   ```

4. Get business news with a limit:
   ```
   Show me the top 3 business headlines
   ```

**日本語**

1. 特定のトピックに関するニュースを検索：

   ```
   人工知能に関するニュースを検索
   ```

2. テクノロジーカテゴリのトップヘッドラインを取得：

   ```
   最新のテクノロジーヘッドラインを取得
   ```

3. 特定の言語と国のニュースを検索：

   ```
   米国の英語で気候変動に関するニュースを探す
   ```

4. 上限を指定してビジネスニュースを取得：
   ```
   ビジネスのトップ3件のヘッドラインを表示
   ```

## Limitations

- The free plan of GNews API is limited to 100 requests per day
- The free plan does not include full article content
- Commercial use requires a paid subscription

**日本語**

- GNews API の無料プランは 1 日あたり 100 リクエストに制限されています
- 無料プランには完全な記事コンテンツは含まれません
- 商用利用には有料サブスクリプションが必要です

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License.

**日本語**

この MCP サーバーは MIT ライセンスの下でライセンスされています。これは、MIT ライセンスの利用規約に従って、ソフトウェアを自由に使用、変更、配布できることを意味します。
