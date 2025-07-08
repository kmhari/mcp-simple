<div align="center">

![](docs/ideogram-image_2025-05-18T06-31-45-777Z.png)

  <h1>🎨 Ideogram MCP Server</h1>

  <p>
    <img alt="GitHub" src="https://img.shields.io/github/license/sunwood-ai-labs/ideagram-mcp-server">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/sunwood-ai-labs/ideagram-mcp-server">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/sunwood-ai-labs/ideagram-mcp-server">
    <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/sunwood-ai-labs/ideagram-mcp-server">
    <img alt="npm" src="https://img.shields.io/npm/v/@sunwood-ai-labs/ideagram-mcp-server">
    <img alt="npm" src="https://img.shields.io/npm/dt/@sunwood-ai-labs/ideagram-mcp-server">
  </p>

  <p>
    Ideogram APIを使って画像生成を提供するModel Context Protocol (MCP) サーバーだよ！<br>
    <b>Ideogram 3.0</b>対応で、Claude DesktopやMCPクライアントから爆速連携できるのが神✨
  </p>
</div>

---

## 📦 プロジェクト概要

- Ideogram API (v3.0) をMCPサーバー経由で使えるTypeScript製ツール
- 画像生成・スタイル参照・マジックプロンプト・アスペクト比・モデル選択など多機能
- Claude Desktopや他MCPクライアントから即利用OK

---


## ⚡️ クイックスタート

Claude Desktopや他MCPクライアントで爆速連携したいなら、  
下記JSONスニペットを設定ファイルにコピペでOK！✨

```json
{
  "mcpServers": {
    "ideogram": {
      "command": "npx",
      "args": [
        "@sunwood-ai-labs/ideagram-mcp-server"
      ],
      "env": {
        "IDEOGRAM_API_KEY": "your_api_key_here"
      }
    }
  }
}
```


---

## 🛠️ MCPツール仕様

### generate_image

#### パラメータ一覧（最新版）

| パラメータ         | 型         | 説明                                                                                 | 必須/任意 | 備考                      |
|--------------------|------------|--------------------------------------------------------------------------------------|-----------|---------------------------|
| prompt             | string     | 画像生成プロンプト（英語推奨）                                                        | 必須      |                           |
| aspect_ratio       | string     | アスペクト比（例: "1x1", "16x9", "4x3" など）                                        | 任意      | 15種類                    |
| resolution         | string     | 解像度（公式ドキュメント参照、全69種）                                               | 任意      |                           |
| seed               | integer    | 乱数シード（再現性担保用）                                                            | 任意      | 0～2147483647             |
| magic_prompt       | string     | マジックプロンプト（"AUTO"|"ON"|"OFF"）                                               | 任意      | デフォルト"AUTO"          |
| rendering_speed    | string     | v3用レンダリング速度（"TURBO"|"DEFAULT"|"QUALITY"）                                  | 任意      |                           |
| style_codes        | string[]   | 8文字のスタイルコード配列                                                             | 任意      |                           |
| style_type         | string     | スタイルタイプ（"AUTO"|"GENERAL"|"REALISTIC"|"DESIGN"）                              | 任意      |                           |
| negative_prompt    | string     | 除外要素（英語推奨）                                                                  | 任意      |                           |
| num_images         | number     | 生成画像数（1～8）                                                                    | 任意      |                           |
| style_reference    | object     | スタイル参照（Ideogram 3.0新機能）                                                   | 任意      | 下記詳細                   |
| └ urls             | string[]   | 参照画像URL配列（最大3つ）                                                            | 任意      |                           |
| └ style_code       | string     | スタイルコード                                                                        | 任意      |                           |
| └ random_style     | boolean    | ランダムスタイル使用                                                                  | 任意      |                           |
| output_dir         | string     | 画像保存ディレクトリ（デフォルト: "docs"）                                            | 任意      |                           |
| base_filename      | string     | 保存ファイル名のベース（デフォルト: "ideogram-image"）                                | 任意      | タイムスタンプ・ID付与     |
| blur_mask          | boolean    | 画像の縁をぼかす（trueでマスク合成）                                                  | 任意      | デフォルト: false          |

#### 📝 使用例

```typescript
const result = await use_mcp_tool({
  server_name: "ideagram-mcp-server",
  tool_name: "generate_image",
  arguments: {
    prompt: "A beautiful sunset over mountains",
    aspect_ratio: "16x9",
    rendering_speed: "QUALITY",
    num_images: 2,
    style_reference: {
      urls: [
        "https://example.com/ref1.jpg",
        "https://example.com/ref2.jpg"
      ],
      random_style: false
    },
    blur_mask: true
  }
});
```

---

## 🧑‍💻 開発・ビルド・テスト

- `npm run build` ... TypeScriptビルド
- `npm run watch` ... 開発モード（自動ビルド）
- `npm run lint` ... コードリント
- `npm test` ... テスト実行

---

## 🗂️ ディレクトリ構成

```bash
ideagram-mcp-server/
├── assets/
├── docs/
│   └── ideogram-image_2025-05-18T06-31-45-777Z.png
├── src/
│   ├── tools/
│   ├── types/
│   ├── utils/
│   ├── ideogram-client.ts
│   ├── index.ts
│   ├── server.ts
│   └── test.ts
├── .env.example
├── package.json
├── tsconfig.json
├── README.md
└── ...（省略）
```

---

## 📝 コントリビューション

1. このリポジトリをフォーク
2. 新ブランチ作成 (`git checkout -b feature/awesome`)
3. 変更コミット（コミットメッセージは日本語＋絵文字推奨！）
4. プッシュ＆プルリク作成

---

## 🚀 デプロイ & リリース

- GitHub Actionsで自動npm公開
- バージョン更新→タグpushで自動デプロイ

```bash
npm version patch|minor|major
git push --follow-tags
```

詳細は [docs/npm-deploy.md](docs/npm-deploy.md) を参照！

---

## 📄 ライセンス

MIT

---

<div align="center">

![](assets/header-animation.svg)

</div>
