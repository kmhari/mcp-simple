# hotpepper-gourmet-mcp-server

ホットペッパーグルメ MCP Server  

このアプリケーションは株式会社リクルートの提供する[リクルートWEBサービス ホットペッパーグルメ](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)を利用した非公式のMCPサーバーです。

## クイックスタート

### インストール方法

#### Homebrew

```sh
brew install miyamo2/tap/hotpepper-gourmet-mcp-server
```

#### Go

```sh
go install github.com/miyamo2/hotpepper-gourmet-mcp-server@latest
```

#### リリースページからダウンロード

https://github.com/miyamo2/hotpepper-gourmet-mcp-server/releases/latest

### 使い方

#### 1. リクルートWEBサービスのAPIキーを取得する

リクルートWEBサービスのAPIキーを取得するには[こちら](https://webservice.recruit.co.jp/register)から申請してください。

#### 2. MCPサーバーを設定する

インストールしたホットペッパーグルメMCPサーバーをMCPホストから呼び出せるよう設定します。  
以下のように`mcpServers`セクションにホットペッパーグルメMCPサーバーを追加してください。  
※ 設定ファイルのフォーマットや保存場所は利用するMCPホストによって異なります。

```json5
{
  "mcpServers": {
    "hotpepper-gourmet-mcp-server": {
      "command": "hotpepper-gourmet-mcp-server",
      "env": {
        "HOTPEPPER_GOURMET_API_KEY": "<Hotpepper Gourmet API Key>"
      }
    }
  }
}
```

## 機能

### ツール

#### `gourment_search` 

ホットペッパーグルメのグルメサーチAPIを実行します。

#### `shop_search`

ホットペッパーグルメの店名サーチAPIを実行します。

#### `large_area_search`

ホットペッパーグルメの大エリアマスタAPIを実行します。

#### `middle_area_search`

ホットペッパーグルメの中エリアマスタAPIを実行します。

#### `small_area_search`

ホットペッパーグルメの小エリアマスタAPIを実行します。

#### `genre_search`

ホットペッパーグルメのジャンルマスタAPIを実行します。

#### `dinner_budget_master_search`

ホットペッパーグルメの検索用ディナー予算マスタAPIを実行します。

#### `large_service_area_master_search`

ホットペッパーグルメの大サービスエリアマスタAPIを実行します。

#### `service_area_master_search`

ホットペッパーグルメのサービスエリアマスタAPIを実行します。

#### `credit_card_master_search`

ホットペッパーグルメのクレジットカードマスタAPIを実行します。

### リソース

#### `dinner_budget_master`

ホットペッパーグルメの検索用ディナー予算マスタを取得します。

#### `large_service_area_master`

ホットペッパーグルメの大サービスエリアマスタを取得します。

#### `service_area_master`

ホットペッパーグルメのサービスエリアマスタを取得します。

#### `credit_card_master`

ホットペッパーグルメのクレジットカードマスタを取得します。

## ライセンス

**hotpepper-gourmet-mcp-server** は[MITライセンス](https://github.com/miyamo2/hotpepper-gourmet-mcp-server/blob/main/LICENSE)のもとで開発・配布されています。

## 免責事項

作者ならびにコントリビューターは当アプリケーションの不具合、当アプリケーションを使用すること、当アプリケーションを使用できなかったことによって発生した損害、  
もしくは利用者と株式会社リクルート間で発生したトラブルについて、一切責任を負いません。