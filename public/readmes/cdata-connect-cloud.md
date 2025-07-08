# !!【お願い】!!  [CData社](https://www.cdata.com/jp/) が Official で出している 「 [CData Connect Cloud](https://www.cdata.com/jp/cloud/) 」に対応したMCP サーバー( [Connect Cloud MCP Server](https://github.com/CDataSoftware/connectcloud-mcp-server) ) の OSS実装がありますので [そちら](https://github.com/CDataSoftware/connectcloud-mcp-server) [https://github.com/CDataSoftware/connectcloud-mcp-server](https://github.com/CDataSoftware/connectcloud-mcp-server) を使用してください！

# MCP server for CData Connect Cloud サンプル

## 使い方

### 1. ソースコードをダウンロードする

ダウンロード先はどこでも構いませんが、半角英数のみで構成される、あいだにスペースを含まないパスに入れるのが良いと思います。

### 2. Node.jsをインストールする

Node.js 18 以降を使用してください。

### 3. npm installする

```bash
npm i
```

### 4. Claude Desktopアプリの設定ファイルを編集する

claude_desktop_config.json という設定ファイルを探して、以下を参考に、このファイルの "mcpServers" の項に設定を追加してください。

```json
{
  "mcpServers": {
    "cdata-connect-cloud": {
      "command": "node",
      "env": {
        "CDATA_CONNECT_CLOUD_CATALOG_NAME": "CData Connect Cloud の Connection Name",
        "CDATA_CONNECT_CLOUD_USER": "CData Connect Cloud へ接続するユーザー名",
        "CDATA_CONNECT_CLOUD_PAT": "CData Connect Cloud へ接続するための PAT"
      },
      "args": [
        "[cdata-connect-cloud-mcp-serverを配置したパス]/server.js"
      ]
    }
  }
}
```

### 5. Claude Desktopアプリを再起動する

claude_desktop_config.json への変更を保存したのち、Claude Desktopアプリを一度終了させて再起動してください。
アプリを終了させたように見えても常駐したまま残っている場合があるため、常駐アイコンを右クリックしてQuitしてください。

