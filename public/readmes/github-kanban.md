[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/sunwood-ai-labs-github-kanban-mcp-server-badge.png)](https://mseep.ai/app/sunwood-ai-labs-github-kanban-mcp-server)

<div align="center">

# 🎯 GitHub Kanban MCP Server

<img src="https://raw.githubusercontent.com/Sunwood-ai-labs/github-kanban-mcp-server/main/assets/header.svg" alt="GitHub Kanban MCP Server" width="100%" />

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-9.x-red.svg)](https://www.npmjs.com/)

</div>

## 📋 概要

GitHub Kanban MCP Serverは、GitHubのissueをカンバンボード形式で管理し、LLMのタスク管理を効率化するためのModel Context Protocol（MCP）サーバーです。

## 🚀 特徴

- 🔄 GitHubのissueをカンバン形式で管理
- 🤖 LLMによる自動タスク管理
- 📊 プロジェクトの進捗可視化
- 🔗 GitHubとの完全な統合
- 💬 タスクへのコメント機能

## 📁 プロジェクト構造

```
kanban-server/
├── src/                    # ソースコードディレクトリ
│   ├── handlers/          # リクエストハンドラー
│   │   ├── comment-handlers.ts  # コメント関連の処理
│   │   ├── issue-handlers.ts    # Issue関連の処理
│   │   ├── label-handlers.ts    # ラベル関連の処理
│   │   └── tool-handlers.ts     # ツールリクエストの処理
│   ├── schemas/           # 入力スキーマ定義
│   │   ├── comment-schemas.ts   # コメント関連のスキーマ
│   │   └── issue-schemas.ts     # Issue関連のスキーマ
│   ├── utils/             # ユーティリティ関数
│   │   ├── error-handler.ts     # エラー処理
│   │   └── exec.ts             # コマンド実行関連
│   ├── server.ts          # MCPサーバーの実装
│   └── types.ts           # 型定義
├── docs/                  # ドキュメント
│   └── v0.2.0/           # バージョン別ドキュメント
└── assets/               # アセットファイル
```

## 🛠️ インストール

### 前提条件

- Node.js 18.x以上
- npm 9.x以上
- GitHub CLI (gh)

```bash
# パッケージのインストール
npm install @sunwood-ai-labs/github-kanban-mcp-server

# GitHub CLIの認証設定
gh auth login
```

## ⚙️ 設定

MCPの設定ファイルに以下を追加:

```json
{
  "mcpServers": {
    "github-kanban": {
      "command": "github-kanban-mcp-server"
    }
  }
}
```

## 🔧 使用可能なツール

### 1. list_issues
カンバンボードのissue一覧を取得します。

**入力パラメータ:**
- `repo`: GitHubリポジトリ名（必須）
- `state`: issueの状態（'open', 'closed', 'all'）
- `labels`: フィルタリングするラベルの配列

### 2. create_issue
新しいissueを作成します。

**入力パラメータ:**
- `repo`: GitHubリポジトリ名（必須）
- `title`: issueのタイトル（必須）
- `emoji`: タイトルの先頭に付与する絵文字
- `body`: issueの本文
- `labels`: ラベルの配列
- `assignees`: アサインするユーザーの配列

### 3. update_issue
既存のissueを更新します。

**入力パラメータ:**
- `repo`: GitHubリポジトリ名（必須）
- `issue_number`: issue番号（必須）
- `title`: 新しいタイトル
- `emoji`: タイトルの先頭に付与する絵文字
- `body`: 新しい本文
- `state`: 新しい状態（'open', 'closed'）
- `labels`: 新しいラベルの配列
- `assignees`: 新しいアサインの配列

### 4. add_comment
タスクにコメントを追加します。

**入力パラメータ:**
- `repo`: GitHubリポジトリ名（必須）
- `issue_number`: タスク（Issue）のID（必須）
- `body`: コメントの内容（Markdown形式対応）（必須）
- `state`: コメント時に変更するissueの状態（'open', 'closed'）

## 📝 ライセンス

MIT License - [LICENSE](LICENSE)ファイルを参照してください。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m '✨ feat: 素晴らしい機能を追加'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📮 フィードバック

問題や提案がありましたら、[Issueを作成](https://github.com/sunwood-ai-labs/github-kanban-mcp-server/issues)してください。
