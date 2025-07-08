# AWS Cost Notifier MCP Server

AWSの月間コストを取得し、サービス別の内訳を表示するMCPサーバーです。
日次でコストの変動を監視し、前日比較のレポートをGitHub Issueとして自動作成します。

## 機能

- 日次のAWSコスト総額の取得
- サービス別のコスト内訳
- カテゴリー別のコスト集計（EC2、セキュリティ、管理、ストレージなど）
- 前日比較による変動の分析
- コスト情報のJSON形式での出力
- GitHub Issueへの自動レポート投稿

## セットアップ

1. リポジトリのクローン:
```bash
git clone https://github.com/yourusername/aws-cost-notifier-mcp-server.git
cd aws-cost-notifier-mcp-server
```

2. 依存パッケージのインストール:
```bash
npm install
```

3. 環境変数の設定:
   - `.env.example`を`.env`にコピー
   ```bash
   cp .env.example .env
   ```
   - `.env`ファイルを編集して必要な情報を設定
   ```
   # AWS Configuration
   AWS_PROFILE=default
   AWS_REGION=ap-northeast-1
   AWS_SDK_LOAD_CONFIG=1

   # GitHub Configuration
   GITHUB_TOKEN=your_github_token_here

   # Target Repository
   GITHUB_OWNER=your_organization_or_username
   GITHUB_REPO=your_repository_name
   ```

4. TypeScriptのビルド:
```bash
npm run build
```

## 実行方法

### 直接実行

```bash
node build/index.js
```

### Cursor MCPサーバーとして実行

1. `.cursor/mcp.json`に以下の設定を追加:
```json
{
  "mcpServers": {
    "aws-cost-notifier": {
      "command": "node",
      "args": ["build/index.js"],
      "cwd": "/path/to/aws-cost-notifier-mcp-server",
      "env": {
        "AWS_PROFILE": "default",
        "AWS_REGION": "ap-northeast-1",
        "AWS_SDK_LOAD_CONFIG": "1",
        "GITHUB_TOKEN": "your_github_token",
        "GITHUB_OWNER": "your_organization_or_username",
        "GITHUB_REPO": "your_repository_name"
      }
    }
  }
}
```

2. Cursorで実行:
```bash
mcp aws-cost-notifier
```

## 開発環境

### VSCode

このプロジェクトにはVSCode用の推奨設定が含まれています：

1. 推奨拡張機能:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features

2. デバッグ設定:
- F5キーでTypeScriptコードを直接デバッグ実行できます
- 環境変数は`.env`ファイルから自動的に読み込まれます

3. 自動フォーマット:
- ファイル保存時に自動フォーマット
- ESLintの自動修正が有効

## 出力形式

```json
{
  "summary": {
    "period": {
      "start": "2025-04-19",
      "end": "2025-04-20"
    },
    "totalCost": "32.14",
    "previousTotalCost": "31.98",
    "changePercentage": "+0.5",
    "currency": "USD"
  },
  "categories": [
    {
      "name": "ec2",
      "current": "22.97",
      "previous": "22.50",
      "changePercentage": "+2.1",
      "percentage": "71.5"
    }
  ],
  "details": [
    {
      "service": "Amazon Elastic Compute Cloud",
      "current": "21.7158",
      "previous": "21.2345",
      "changePercentage": "+2.3",
      "unit": "USD"
    }
  ]
}
```

## 注意事項

- コストは推定値であり、確定額は月末の請求書で確認してください
- AWS Cost Explorerの料金が発生する可能性があります
- 前日比は日次の変動を示しており、月間の傾向とは異なる可能性があります
- GitHubのAPI制限に注意してください 