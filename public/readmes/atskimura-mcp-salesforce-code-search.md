# Salesforce Code Search MCP Server

Salesforce公式サンプルアプリのコードを検索するためのModel Context Protocol（MCP）サーバーです。

## 機能

- Salesforce公式サンプルリポジトリからコードスニペットを検索
- コンポーネントタイプ（LWC、Apex、Auraなど）によるフィルタリング
- ファイル拡張子によるフィルタリング
- リポジトリの追加・削除・更新
- コードスニペットの表示と関連ファイルの取得

## 対応リポジトリ

デフォルトでは以下のリポジトリに対応しています：

- [lwc-recipes](https://github.com/trailheadapps/lwc-recipes) - Lightning Web Componentsのレシピ集
- [ebikes-lwc](https://github.com/trailheadapps/ebikes-lwc) - E-Bikesサンプルアプリ
- [apex-recipes](https://github.com/trailheadapps/apex-recipes) - Apexのレシピ集
- [easy-spaces-lwc](https://github.com/trailheadapps/easy-spaces-lwc) - Easy Spacesサンプルアプリ

## 前提条件

- Node.js 18以上
- npm 9以上
- Git

## インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/mcp-salesforce-code.git
cd mcp-salesforce-code

# 依存関係をインストール
npm install

# 環境変数ファイルを作成
cp .env.example .env

# ビルド
npm run build
```

## 使い方

### サーバーの起動

```bash
npm start
```

### 開発モード

```bash
npm run dev
```

## MCPツール

### search-code

コードを検索するツールです。

**パラメータ**:
- `query` (必須): 検索するコードパターン
- `repository` (オプション): 検索対象のリポジトリ名
- `fileType` (オプション): 検索対象のファイル拡張子（例: .js, .cls）
- `componentType` (オプション): 検索対象のコンポーネントタイプ（LWC, APEX, AURA, VISUALFORCE, METADATA, OTHER）
- `maxResults` (オプション): 最大結果数（デフォルト: 10）

**使用例**:
```json
{
  "query": "wire service",
  "repository": "lwc-recipes",
  "componentType": "LWC",
  "maxResults": 5
}
```

### get-file

ファイルの内容を取得するツールです。

**パラメータ**:
- `repository` (必須): リポジトリ名
- `path` (必須): ファイルパス

**使用例**:
```json
{
  "repository": "lwc-recipes",
  "path": "force-app/main/default/lwc/miscToastNotification/miscToastNotification.js"
}
```

### update-repository

リポジトリを更新するツールです。

**パラメータ**:
- `repository` (必須): 更新するリポジトリ名（"all"を指定すると全リポジトリを更新）

**使用例**:
```json
{
  "repository": "all"
}
```

### configure-repository

リポジトリの設定を変更するツールです。

**パラメータ**:
- `action` (必須): 実行するアクション（"add", "remove", "update"）
- `repository` (必須): リポジトリ設定
  - `name` (必須): リポジトリ名
  - `url` (追加時は必須): リポジトリURL
  - `branch` (オプション): ブランチ名（デフォルト: "main"）
  - `description` (オプション): 説明

**使用例**:
```json
{
  "action": "add",
  "repository": {
    "name": "new-repo",
    "url": "https://github.com/trailheadapps/new-repo",
    "branch": "main",
    "description": "新しいリポジトリの説明"
  }
}
```

## MCPリソース

### repositories

すべてのリポジトリ情報を取得するリソースです。

**URI**: `salesforce://repositories`

### repository-info

特定のリポジトリの詳細情報を取得するリソースです。

**URI**: `salesforce://repository/{name}`

**パラメータ**:
- `name`: リポジトリ名

### file-content

ファイルの内容を取得するリソースです。

**URI**: `salesforce://file/{repository}/{path}`

**パラメータ**:
- `repository`: リポジトリ名
- `path`: ファイルパス

## Clineでの使用方法

Clineでこのサーバーを使用するには、以下の設定を追加します：

```json
{
  "mcpServers": {
    "salesforce-code-search": {
      "disabled": false,
      "timeout": 60,
      "command": "node",
      "args": [
        "/path/to/your/mcp-salesforce-code/build/index.js"
      ],
      "env": {
        "AUTO_UPDATE_REPOSITORIES": "true"
      },
      "transportType": "stdio"
    }
  }
}
```
   
> **注意**: `/path/to/your/mcp-salesforce-code` は、実際のプロジェクトディレクトリのパスに置き換えてください。

## カスタマイズ

### リポジトリの追加

`config/repositories.json`ファイルを編集するか、`configure-repository`ツールを使用してリポジトリを追加できます。

### 環境変数

`.env`ファイルで以下の設定を変更できます：

- `AUTO_UPDATE_REPOSITORIES`: サーバー起動時にリポジトリを自動更新するかどうか
- `REPOSITORIES_PATH`: リポジトリのローカルパス
- `MAX_SEARCH_RESULTS`: 検索結果の最大数

## ライセンス

MIT
