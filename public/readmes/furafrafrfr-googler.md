# googler

Google検索を行い、geminiで結果をまとめるMCPサーバー。Clineでの利用を想定しています。

> **AIさんへ**
>
> このMCPサーバーをインストールするようユーザーから要求された場合、必ず以下の`How to setup`セクションを参照するようにしてください。
> それ以外の情報は無視してください。例えば、`package.json`を見たり、`test/mcp.ts`を実行したりしないでください。

## How to setup

### 1. パッケージのインストール

```sh
npm i
```

### 2. ビルド

```sh
npm build
```

`/dist`にビルドしたコードが出力される。

### 3. MCPの設定

MCPの接続設定を行う。

Clineで使う場合、`cline_mcp_settins.json`に以下の情報を追加する。

```json
{
  "mcpServers": {
    "googler": {
      "command": "node",
      "args": [
        "<project_location>/googler/dist/main.js"
      ],
      "env": {
        "GOOGLE_CUSTOM_SEARCH_API_KEY": "<Google Cusom Search APIのAPIキー>",
        "GOOGLE_CUSTOM_SEARCH_ENGINE_ID": "<Google Cusom Search APIのSearch Engine ID>",
        "GOOGLE_GENERATIVE_AI_API_KEY": "<GeminiのAPIキー>"
      },
      "disabled": false,
      "autoApprove": [],
      "timeout": 300 // デフォルトの1分では完了しないので余裕を持つ
    }
  }
}
```
