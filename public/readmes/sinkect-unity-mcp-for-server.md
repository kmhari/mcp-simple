# MCP Unity エディター MCP PC (LLM)


## 要件
- Node.js 18以降 - [サーバーを起動](#start-server)するため
- npm 9以降 - [サーバーをデバッグ](#debug-server)するため

## <a name="install-server"></a>インストール


### ステップ1: Node.jsをインストール
> MCP Unityサーバーを実行するには、コンピューターにNode.js 18以降がインストールされている必要があります：

<details>
<summary><span style="font-size: 1.1em; font-weight: bold;">Windows</span></summary>

1. [Node.jsダウンロードページ](https://nodejs.org/en/download/)にアクセス
2. LTSバージョンのWindowsインストーラー（.msi）をダウンロード（推奨）
3. インストーラーを実行し、インストールウィザードに従う
4. PowerShellを開いて以下を実行してインストールを確認：
   ```bash
   node --version
   ```
</details>

<details>
<summary><span style="font-size: 1.1em; font-weight: bold;">macOS</span></summary>

1. [Node.jsダウンロードページ](https://nodejs.org/en/download/)にアクセス
2. LTSバージョンのmacOSインストーラー（.pkg）をダウンロード（推奨）
3. インストーラーを実行し、インストールウィザードに従う
4. または、Homebrewがインストールされている場合は以下を実行：
   ```bash
   brew install node@18
   ```
5. ターミナルを開いて以下を実行してインストールを確認：
   ```bash
   node --version
   ```
</details>

<br>

### ステップ2: 手動設定

AIクライアントのMCP設定ファイル（例：Claude Desktopのclaude_desktop_config.json）を開き、以下のテキストをコピー：

```json
{
  "mcpServers": {
    "mcp-unity": {
      "command": "node",
      "args": [
        "ABSOLUTE/PATH/TO/Server/build/index.js"
      ],
       "env": {
          "UNITY_HOST" : "YOUR_IP_ADDRESS",
          "UNITY_PORT" : "YOUR_PORT"
       }
    }
  }
}
```

## <a name="start-server"></a>サーバーの起動

MCP Unityサーバーを起動するには2つの方法があります：

### オプション1: Unityエディター経由で起動
1. Unityエディターを開く
2. Tools > MCP Unity > Server Windowに移動
3. "Start Server"ボタンをクリック

### オプション2: コマンドラインから起動
1. ターミナルまたはコマンドプロンプトを開く
2. MCP Unityサーバーディレクトリに移動
3. 以下のコマンドを実行：
   ```bash
   node Server/build/index.js
   ```

## <a name="debug-server"></a>サーバーのデバッグ

MCP Unityサーバーをデバッグするには、以下の方法を使用できます：

### オプション1: Unityエディターを使用してデバッグ
1. Unityエディターを開く
2. Tools > MCP Unity > Server Windowに移動
3. "Debug Server"ボタンをクリック

### オプション2: コマンドラインを使用してデバッグ
1. ターミナルまたはコマンドプロンプトを開く
2. MCP Unityサーバーディレクトリに移動
3. 以下のコマンドを実行：
   ```bash
   npm run debug
   ```

## トラブルシューティング

<details>
<summary><span style="font-size: 1.1em; font-weight: bold;">接続の問題</span></summary>

- WebSocketサーバーが実行中であることを確認してください（UnityのServer Windowを確認）
- ファイアウォールの制限が接続を妨げていないか確認してください
- ポート番号が正しいことを確認してください（デフォルトは8080）
- UnityエディターのMCP Serverウィンドウでポート番号を変更できます（ツール > MCP Unity > Server Window）
</details>

<details>
<summary><span style="font-size: 1.1em; font-weight: bold;">サーバーが起動しない</span></summary>

- Unityコンソールにエラーメッセージがないか確認してください
- Node.jsが正しくインストールされ、PATHで利用可能であることを確認してください
- Serverディレクトリ内の依存関係がすべてインストールされていることを確認してください
</details>

<details>
<summary><span style="font-size: 1.1em; font-weight: bold;">Play Modeテスト実行時の接続失敗</span></summary>

`run_tests` ツールは以下の応答を返します：
```
Error:
Connection failed: Unknown error
```

このエラーは、Play Modeへ切り替える際にドメインリロードが発生し、ブリッジ接続が失われるために発生します。  
回避策は、**Edit > Project Settings > Editor > "Enter Play Mode Settings"** で **Reload Domain** をオフにすることです。
</details>

## ライセンス

本プロジェクトは [MIT License](License.md) の下で提供されています。

## 謝辞

- [Model Context Protocol](https://modelcontextprotocol.io)
- [Unity Technologies](https://unity.com)
- [Node.js](https://nodejs.org)
- [WebSocket-Sharp](https://github.com/sta/websocket-sharp)

## 貢献

貢献は大歓迎です！詳細については[貢献ガイド](CONTRIBUTING.md)をお読みください。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 謝辞

- [Model Context Protocol](https://modelcontextprotocol.io)
- [Unity Technologies](https://unity.com)
- [Node.js](https://nodejs.org)
- [WebSocket-Sharp](https://github.com/sta/websocket-sharp)
- [mcp-unity](https://github.com/CoderGamester/mcp-unity)