# MCP Unity エディター カスタマイズ for Unity PC

### IDE統合 - パッケージキャッシュアクセス

MCP Unityは、Unityの`Library/PackedCache`フォルダーをワークスペースに追加することで、VSCode系IDE（Visual Studio
Code、Cursor、Windsurf）との自動統合を提供します。この機能により：

- Unityパッケージのコードインテリジェンスが向上
- Unityパッケージのより良いオートコンプリートと型情報が有効化
- AIコーディングアシスタントがプロジェクトの依存関係を理解するのに役立つ

### MCPサーバーツール

- `execute_menu_item`: Unityメニュー項目（MenuItem属性でタグ付けされた関数）を実行
  > **例:** "新しい空のGameObjectを作成するためにメニュー項目'GameObject/Create Empty'を実行"

- `select_gameobject`: パスまたはインスタンスIDでUnity階層内のゲームオブジェクトを選択
  > **例:** "シーン内のMain Cameraオブジェクトを選択"

- `update_component`: GameObject上のコンポーネントフィールドを更新、またはGameObjectに含まれていない場合は追加
  > **例:** "PlayerオブジェクトにRigidbodyコンポーネントを追加し、その質量を5に設定"

- `add_package`: Unityパッケージマネージャーに新��いパッケージをインストール
  > **例:** "プロジェクトにTextMeshProパッケージを追加"

- `run_tests`: Unityテストランナーを使用してテストを実行
  > **例:** "プロジェクト内のすべてのEditModeテストを実行"

- `notify_message`: Unityエディターにメッセージを表示
  > **例:** "タスクが完了したことをUnityに通知"

- `add_asset_to_scene`: AssetDatabaseからアセットをUnityシーンに追加
  > **例:** "プロジェクトからPlayerプレハブを現在のシーンに追加"

### MCPサーバーリソース

- `unity://menu-items`: `execute_menu_item`ツールを容易にするために、Unityエディターで利用可能なすべてのメニュー項目のリストを取得
  > **例:** "GameObject作成に関連する利用可能なすべてのメニュー項目を表示"

- `unity://hierarchy`: Unity階層内のすべてのゲームオブジェクトのリストを取得
  > **例:** "現在のシーンの階層構造を表示"

- `unity://gameobject/{id}`: シーン階層内のインスタンスIDまたはオブジェクトパスで特定のGameObjectに関する詳細情報を取得
  > **例:** "Player GameObjectに関する詳細情報を取得"

- `unity://logs`: Unityコンソールからのすべてのログのリストを取得
  > **例:** "Unityコン��ールからの最近のエラーメッセージを表示"

- `unity://packages`: Unityパッケージマネージャーからインストール済みおよび利用可能なパッケージに関する情報を取得
  > **例:** "Unityプロジェクトに現在インストールされているすべてのパッケージをリスト"

- `unity://assets`: Unityアセットデータベース内のアセットに関する情報を取得
  > **例:** "プロジェクト内のすべてのテクスチャアセットを検索"

- `unity://tests/{testMode}`: Unityテストランナー内のテストに関する情報を取得
  > **例:** "Unityプロジェクトで利用可能なすべてのテストをリスト"

## 要件

- Unity 2022.3以降 - [サーバーをインストール](#install-server)するため

## <a name="install-server"></a>インストール

このMCP Unityサーバーのインストールは複数ステップのプロセスです：

### ステップ1: Unityパッケージマネージャー経由でUnity MCPサーバーパッケージをインストール

1. Unityパッケージマネージャーを開く（Window > Package Manager）
2. 左上隅の"+"ボタンをクリック
3. "Add package from git URL..."を選択
4. 入力: `https://github.com/sinkect/unity-mcp-for-editor.git
5. "Add"をクリック

![package manager](https://github.com/user-attachments/assets/a72bfca4-ae52-48e7-a876-e99c701b0497)

#### Play Modeテスト実行時に `Connection failed` エラー

`run_tests` ツールの実行が次のエラーを返します：

```
Error:
Connection failed: Unknown error
```

このエラーは、Play Modeに切り替わる際にドメインがリロードされるため、ブリッジ接続が失われることで発生します。  
回避方法は、**Edit > Project Settings > Editor > "Enter Play Mode Settings"** で **Reload Domain** をオフにすることです。

## mcp.json 設定

<span style ="font-size: 1.1em; font-weight: bold;">
1.IPアドレスを確認
<br>
2.mcp.jsonを作成
</span>

### 1. IPアドレス

  <details>
  <summary><span style="font-size: 1.1em; font-weight: bold;">Windows</span></summary>


コマンドプロンプト(cmd.exe)を開いて:

  ```bash
  ipconfig
  ```

探したいもの:

Wireless LAN adapter Wi-Fi → IPv4 Address

Ethernet adapter Ethernet → IPv4 Address

短く表示する場合:

  ```bash
  ipconfig | findstr /R /C:"IPv4 Address"
  ```

  </details>

  <details>
  <summary><span style="font-size: 1.1em; font-weight: bold;">macOS</span></summary>
  タミナール（terminal)を開いて：
    
  ```bash
  ipconfig getifaddr en0
  ```

  </details>

### 2. mcp.jsonを作成



```json
{
  "mcpServers": {
    "mcp-unity": {
      "command": "node",
      "args": [
        "ABSOLUTE/PATH/TO/Server/build/index.js"
      ],
      "env": {
        "UNITY_HOST": "YOUR_IP_ADDRESS",
        "UNITY_PORT": "YOUR_PORT"
      }
    }
  }
}
```
## TCPの設定

<details>

<summary><span style="font-size: 1.1em; font-weight: bold;">Windows</span></summary>

```bash
netsh advfirewall firewall add rule name="MCP-Unity TCP YOUR_PORT" dir=in action=allow protocol=TCP localport=YOUR_PORT```
```

</details>

<details>

<summary><span style="font-size: 1.1em; font-weight: bold;">macOS</span></summary>

```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/Unity/Hub/Editor/YOUR_UNITY_VERSION/Unity.app
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --unblockapp /Applications/Unity/Hub/Editor/YOUR_UNITY_VERSION/Unity.app
```

</details>

## 貢献

貢献は大歓迎です！詳細については[貢献ガイド](CONTRIBUTING.md)をお読みください。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 謝辞

- [Model Context Protocol](https://modelcontextprotocol.io)
- [Unity Technologies](https://unity.com)
- [WebSocket-Sharp](https://github.com/sta/websocket-sharp)
- [mcp-unity](https://github.com/CoderGamester/mcp-unity)
