# MCP GitLab Review Server

MCPのGitLabサーバー拡張。マージリクエストへのレビューコメント投稿機能を提供します。

## 概要

Model Context Protocol (MCP) のGitLabサーバーに、マージリクエストのレビュー機能を追加した拡張サーバーです。以下の機能を提供します：

- マージリクエストの情報取得
- マージリクエスト最新バージョンの取得
- レビューコメントの投稿

### 環境変数の設定

```json
    "env": {
        "GITLAB_PERSONAL_ACCESS_TOKEN": "xxxxxx",
        "GITLAB_API_URL": "xxxxx"
    }
```

### APIエンドポイント

```typescript
// マージリクエストの取得
GET /api/v4/projects/:project_id/merge_requests/:merge_request_iid

// マージリクエストの最新バージョン取得
GET /api/v4/projects/:project_id/merge_requests/:merge_request_iid/versions

// レビューコメントの投稿
POST /api/v4/projects/:project_id/merge_requests/:merge_request_iid/discussions
```

## License

MIT
