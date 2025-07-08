# 🌈 Iris MCP Server

<div align="center">
  <img src="assets/header.svg" alt="Iris MCP Server Header">
</div>

## 📝 概要

Iris MCP Serverは、Gitリポジトリのタグベースのリリースノートを自動生成するためのModel Context Protocolサーバーです。タグ間の差分を解析し、構造化されたリリースノートを`.iris`ディレクトリに生成します。

## ✨ 特徴

- 🏷️ タグ間の差分を自動検出
- 📊 カスタマイズ可能なリリースノートテンプレート
- 🗂️ 新機能、改善項目、バグ修正などのカテゴリ分け
- 📄 Markdown形式での出力
- 📁 `.iris`フォルダへの自動保存

## 🚀 インストール

```bash
npm install iris-mcp-server
```

## 💡 使用方法

### リリースノートの生成

```typescript
const result = await mcpClient.useTool('iris-mcp-server', 'generate_release_note', {
  startTag: 'v1.0.0',
  endTag: 'v1.1.0',
  title: 'Version 1.1.0 リリース',
  features: [
    '新しいダッシュボード機能の追加',
    'ユーザー管理システムの実装'
  ],
  improvements: [
    'パフォーマンスの最適化',
    'UIの改善'
  ],
  bugfixes: [
    'ログイン時のエラー修正',
    'データ同期の問題を解決'
  ],
  breaking: [
    'APIエンドポイントの変更',
    '設定ファイルのフォーマット更新'
  ]
});
```

## 📄 出力例

```markdown
# Version 1.1.0 リリース

リリース日: 2024-01-20

## 💥 破壊的変更

- APIエンドポイントの変更
- 設定ファイルのフォーマット更新

## ✨ 新機能

- 新しいダッシュボード機能の追加
- ユーザー管理システムの実装

## 🔧 改善項目

- パフォーマンスの最適化
- UIの改善

## 🐛 バグ修正

- ログイン時のエラー修正
- データ同期の問題を解決

## 📝 変更されたファイル

- `src/dashboard/index.ts`
- `src/users/management.ts`
- `config/settings.json`
```

## 🛠️ 開発

### ビルド

```bash
npm run build
```

### 開発モード

```bash
npm run watch
```

## 🤝 コントリビューション

プルリクエストやイシューは大歓迎です！以下の手順で貢献できます：

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m '✨ Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📜 ライセンス

MIT

## 👥 作者

- 作成者: [Your Name]
- メール: [your.email@example.com]
