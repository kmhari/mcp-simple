# じゃんけんMCPサーバー

Model Context Protocol（MCP）に対応したじゃんけんゲームを提供するサーバーです。このサーバーを使うと、LLMはじゃんけん（グー・チョキ・パー）で遊んだり、ランダムな手を取得したりすることができます。

## コンポーネント

### ツール

- **play**
  - じゃんけんをプレイする
  - 入力: `hand` (string): プレイヤーの手（"グー"、"チョキ"、"パー"のいずれか）
  - AIがランダムな手を選び、じゃんけんの結果を返します

- **random**
  - AIがランダムな手を出す
  - 入力: なし
  - AIがランダムに選んだ手（"グー"、"チョキ"、"パー"のいずれか）を返します

### リソース

- **じゃんけんのルール** (`janken://rules`)
  - じゃんけんのルールを説明するテキスト

## 設定

### Claude Desktopでの使用

Claude Desktopアプリでこのサーバーを使用するには、`claude_desktop_config.json`の「mcpServers」セクションに以下の設定を追加してください：

```json
{
  "mcpServers": {
    "janken": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-janken-server"
      ]
    }
  }
}
```

### NPXでの直接実行

```bash
npx mcp-janken-server
```

### VS Codeでの使用

VS Codeでこのサーバーを使用するには、ユーザー設定（JSON）ファイルに以下のJSONブロックを追加します。これは`Ctrl + Shift + P`を押して`Preferences: Open User Settings (JSON)`と入力することで行えます。

オプションで、`.vscode/mcp.json`という名前のファイルに追加することもできます。これにより、設定を他の人と共有できます。

```json
{
  "mcp": {
    "servers": {
      "janken": {
        "command": "npx",
        "args": [
          "-y",
          "mcp-janken-server"
        ]
      }
    }
  }
}
```

## ビルドと開発

```bash
# 依存関係をインストール
npm install

# TypeScriptをコンパイル
npm run build

# 開発モード（ファイル変更を監視）
npm run dev

# サーバーを実行
npm run start
```

## プロジェクト構造

```
mcp-janken-server/
├── src/
│   ├── index.ts      - サーバー初期化と起動
│   ├── handlers.ts   - MCPリクエストハンドラ
│   ├── game.ts       - じゃんけんゲームロジック
│   └── types.ts      - 型定義と定数
├── index.ts          - エントリーポイント
├── package.json      - プロジェクト設定
└── tsconfig.json     - TypeScript設定
```

## ライセンス

このMCPサーバーはMITライセンスの下で提供されています。これは、MITライセンスの条件に従って、ソフトウェアを自由に使用、変更、および配布できることを意味します。詳細については、プロジェクトリポジトリのLICENSEファイルを参照してください。