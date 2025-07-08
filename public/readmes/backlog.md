# mcp-backlog-server

Backlog MCP Server

これはBacklogとModel Context Protocol (MCP)を統合するTypeScriptベースのサーバーです。以下のMCPの主要概念を実装しています：

- Backlogプロジェクトを表すリソース（URIとメタデータを含む）
- Backlog APIと対話するためのツール
- Backlogデータの要約と分析を生成するためのプロンプト

## 機能

### リソース
- `backlog://project/[id]` URIを通じてBacklogプロジェクトにアクセス
- 各プロジェクトリソースにはプロジェクトのメタデータと詳細情報が含まれる
- 構造化データアクセスのためのJSON形式リソース
- プロジェクト内の課題（イシュー）へのアクセス
- プロジェクト内のWikiページへのアクセス

### ツール
- `get_backlog_user` - 現在のBacklogユーザー情報を取得
- `get_backlog_space` - Backlogスペース情報を取得
- `list_recent_projects` - 最近閲覧したBacklogプロジェクトを一覧表示
  - 件数と並び順を設定可能
- `get_project_issues` - プロジェクトの課題を取得
  - ステータス、担当者、ページネーションなどでフィルタリング可能
- `get_issue_detail` - 特定の課題の詳細情報を取得
- `get_issue_comments` - 課題のコメントを取得
- `add_issue_comment` - 課題にコメントを追加
- `get_issue_comment_count` - 課題のコメント数を取得
- `get_issue_comment` - 特定のコメントの詳細情報を取得
- `get_wiki_page_list` - Wikiページの一覧を取得
  - プロジェクトやキーワードでフィルタリング可能
- `get_wiki_page` - 特定のWikiページの詳細情報を取得
- `update_wiki_page` - Wikiページを更新

### プロンプト
- `summarize_projects` - 最近閲覧したBacklogプロジェクトの要約を生成
- `analyze_backlog_usage` - ユーザー、スペース、プロジェクトデータに基づくBacklog使用パターンの分析
- `summarize_wiki_pages` - プロジェクトのWikiページの要約を生成

## 必要条件

- API アクセス権を持つ Backlog アカウント
- 環境変数:
  - `BACKLOG_API_KEY`: Backlog API キー
  - `BACKLOG_SPACE_URL`: Backlog スペース URL (例: `https://your-space.backlog.com`)

## 開発

依存関係のインストール:
```bash
npm install
```

サーバーのビルド:
```bash
npm run build
```

自動再ビルドによる開発:
```bash
npm run watch
```

## インストール

Claude Desktopで使用するには、サーバー設定を追加します:

MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-backlog-server": {
      "command": "/path/to/mcp-backlog-server/build/index.js",
      "env": {
        "BACKLOG_API_KEY": "your-api-key",
        "BACKLOG_SPACE_URL": "https://your-space.backlog.com"
      }
    }
  }
}
```

### デバッグ

MCPサーバーは標準入出力を介して通信するため、デバッグが難しい場合があります。[MCP Inspector](https://github.com/modelcontextprotocol/inspector)の使用をお勧めします。これはパッケージスクリプトとして利用可能です:

```bash
npm run inspector
```

InspectorはブラウザでデバッグツールにアクセスするためのURLを提供します。

## 技術詳細

このサーバーは以下の主要コンポーネントで構成されています:

- `index.ts` - メインエントリーポイント、MCPサーバーの初期化と設定
- `backlog-client.ts` - Backlog APIとの通信を処理するクライアント
- `handlers/` - リソース、ツール、プロンプトのハンドラー
  - `resource-handlers.ts` - プロジェクト、課題、Wikiのリソース処理
  - `tool-handlers.ts` - Backlog APIとのインタラクションツール
  - `prompt-handlers.ts` - プロンプト生成機能
- `types.ts` - Backlog APIレスポンスの型定義
- `config.ts` - 環境変数からの設定読み込み