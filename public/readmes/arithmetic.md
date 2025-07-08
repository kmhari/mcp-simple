# 四則演算 MCP サーバー

このMCPサーバーは、基本的な四則演算（足し算、引き算、掛け算、割り算）を実行するためのツールを提供します。

## 機能

このサーバーは以下の四則演算ツールを提供します：

1. **add** - 2つの数値を足し算します
2. **subtract** - 2つの数値を引き算します
3. **multiply** - 2つの数値を掛け算します
4. **divide** - 2つの数値を割り算します（ゼロ除算の場合はエラーを返します）

## インストール方法

1. このリポジトリをクローンまたはダウンロードします
2. 依存パッケージをインストールします：
   ```
   npm install
   ```
3. TypeScriptをコンパイルします：
   ```
   npm run build
   ```

## Clineでの設定方法

Clineでこのサーバーを使用するには、Claude Desktop Appの設定ファイルを編集する必要があります：

1. 以下のパスに設定ファイルを作成または編集します：
   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

2. 以下の内容を追加します（既存のmcpServersオブジェクトがある場合は、その中に追加します）：
   ```json
   {
     "mcpServers": {
       "arithmetic": {
         "command": "node",
         "args": ["/Users/y_nakasaka/Documents/Cline/MCP/arithmetic-server/src/index.js"],
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

3. Claude Desktop Appを再起動します

## 使用例

Clineで以下のようなプロンプトを使用することで、四則演算ツールを呼び出すことができます：

- 「5と3を足し算してください」
- 「10から7を引いてください」
- 「6と8を掛け算してください」
- 「20を4で割ってください」

## 技術的な詳細

このサーバーは以下の技術を使用しています：

- TypeScript
- Model Context Protocol (MCP) SDK
- Zod（バリデーション用）
