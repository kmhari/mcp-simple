# Cloud Run Logs MCP

Google Cloud RunのログをMCPのインターフェースを介して確認するためのツールです。

## 機能

- Google Cloudのアプリケーションデフォルトクレデンシャルを使用して認証
- プロジェクトID、サービス名、時間範囲、ログレベル、キーワードなどでフィルタリング
- テキスト形式またはJSON形式での出力

## 前提条件

このツールは、Google Cloudのアプリケーションデフォルトクレデンシャルを使用して認証を行います。以下のいずれかの方法で認証情報を設定してください：

1. `gcloud auth application-default login`コマンドを実行
2. GOOGLE_APPLICATION_CREDENTIALS環境変数にサービスアカウントキーのパスを設定
3. Google Cloud環境（Compute Engine、Cloud Run、GKEなど）で実行する場合は、自動的に認証情報が提供されます

## MCPサーバーとしての使用

このツールは、Model Context Protocol (MCP) サーバーとしても機能します。MCPサーバーを使用すると、AIアシスタントがCloud Runのログやサービス情報を直接取得できるようになります。

## MCPサーバーの設定(バイナリをダウンロードする場合)

GitHubのリリースページからバイナリをダウンロードして使用することもできます。
https://github.com/maito1201/cloudrun-logs-mcp/releases

macOS(Apple Silicon)
```bash
curl -L https://github.com/maito1201/cloudrun-logs-mcp/releases/latest/download/cloudrun-logs-mcp_Darwin_arm64.tar.gz -o cloudrun-logs-mcp.tar.gz
```
macOS(Intel)
```
curl -L https://github.com/maito1201/cloudrun-logs-mcp/releases/latest/download/cloudrun-logs-mcp_Darwin_x86_64.tar.gz -o cloudrun-logs-mcp.tar.gz
```

```
# 解凍
tar -xzf cloudrun-logs-mcp.tar.gz

# 実行権限を付与
chmod +x cloudrun-logs-mcp

# 必要に応じて、パスの通った場所に移動
# 例：
# sudo mv cloudrun-logs-mcp /usr/local/bin/
```

MCPサーバーの設定(Clineの場合)

```
{
  "mcpServers": {
    "cloudrun-logs": {
      "autoApprove": [],
      "disabled": false,
      "timeout": 60,
      "command": "/your-installed-path/cloudrun-logs-mcp",
      "args": [],
      "transportType": "stdio"
    }
  }
}
```

## MCPサーバーの設定(ビルドする場合)

```bash
# リポジトリをクローンしてビルド
git clone https://github.com/maito1201/cloudrun-logs-mcp.git
cd cloudrun-logs-mcp
go build
```

MCPサーバーの設定(Clineの場合)

```
{
  "mcpServers": {
    "cloudrun-logs": {
      "autoApprove": [],
      "disabled": false,
      "timeout": 60,
      "command": "/your-build-path/cloudrun-logs-mcp",
      "args": [],
      "transportType": "stdio"
    }
  }
}
```

## MCPサーバーの設定(go install)

```bash
go install github.com/maito1201/cloudrun-logs-mcp@latest
```

MCPサーバーの設定(Clineの場合)

```
{
  "mcpServers": {
    "cloudrun-logs": {
      "autoApprove": [],
      "disabled": false,
      "timeout": 60,
      "command": "cloudrun-logs-mcp",
      "args": [],
      "transportType": "stdio"
    }
  }
}
```

## 利用可能なツール

MCPサーバーは以下のツールを提供します：

#### get_logs

Google Cloud Runのログを取得します。

**パラメータ：**

| パラメータ名 | 説明 | 必須 | デフォルト値 |
|------------|------|------|-------------|
| project_id | Google Cloudプロジェクトのプロジェクトid | はい | - |
| service_name | Cloud Runのサービス名 | いいえ | - |
| start_time | ログの開始時間（RFC3339形式、例: 2023-01-01T00:00:00Z） | いいえ | - |
| end_time | ログの終了時間（RFC3339形式、例: 2023-01-01T00:00:00Z） | いいえ | - |
| log_level | ログレベル（INFO, ERROR, WARNINGなど） | いいえ | - |
| keywords | 検索キーワードの配列 | いいえ | - |
| limit | 取得するログエントリの最大数 | いいえ | 100 |

**使用例：**

```json
{
  "project_id": "your-project-id",
  "service_name": "your-service-name",
  "log_level": "ERROR",
  "keywords": ["error", "exception"],
  "limit": 50
}
```

#### get_services

Google Cloud Runのサービス一覧を取得します。

**パラメータ：**

| パラメータ名 | 説明 | 必須 | デフォルト値 |
|------------|------|------|-------------|
| project_id | Google Cloudプロジェクトのプロジェクトid | はい | - |
| region | Cloud Runのリージョン | いいえ | us-central1 |

**使用例：**

```json
{
  "project_id": "your-project-id",
  "region": "us-central1"
}
```

### AIアシスタントとの連携

AIアシスタントとMCPサーバーを連携するには、以下の手順を実行します：

1. MCPサーバーを起動します
2. AIアシスタントにMCPサーバーのURLを提供します（例：`http://localhost:3000`）
3. AIアシスタントがMCPサーバーを通じてCloud Runのログやサービス情報を取得できるようになります

### 使用例

AIアシスタントとの対話例：

```
ユーザー: project-idが「my-project」のCloud Runサービス一覧を取得してください

AIアシスタント: Cloud Runサービス一覧を取得します。

[AIアシスタントがMCPサーバーを使用してサービス一覧を取得]

以下がプロジェクト「my-project」のCloud Runサービス一覧です：

名前: service-1
URL: https://service-1-xxx.run.app
ステータス: Ready
作成日時: 2023-01-01T00:00:00Z

名前: service-2
URL: https://service-2-xxx.run.app
ステータス: Ready
作成日時: 2023-01-02T00:00:00Z

合計2件のサービスが見つかりました。
```

## CLIツールとしての使用

CLIツールとして本機能を利用可能です。
以下の2つのコマンドがあります：

- `logs`: Cloud Runのログを取得
- `services`: Cloud Runのサービス一覧を取得

### ログの取得

```bash
# 基本的な使い方（プロジェクトIDは必須）
./cloudrun-logs logs --project=your-project-id

# サービス名を指定
./cloudrun-logs logs --project=your-project-id --service=your-service-name

# 時間範囲を指定
./cloudrun-logs logs --project=your-project-id --start-time=2023-01-01T00:00:00Z --end-time=2023-01-02T00:00:00Z

# ログレベルを指定
./cloudrun-logs logs --project=your-project-id --level=ERROR

# キーワードで検索
./cloudrun-logs logs --project=your-project-id --keyword=error --keyword=exception

# 取得するログエントリの最大数を指定
./cloudrun-logs logs --project=your-project-id --limit=50

# JSON形式で出力
./cloudrun-logs logs --project=your-project-id --json
```

### サービス一覧の取得

```bash
# 基本的な使い方（プロジェクトIDは必須）
./cloudrun-logs services --project=your-project-id

# リージョンを指定
./cloudrun-logs services --project=your-project-id --region=us-central1

# JSON形式で出力
./cloudrun-logs services --project=your-project-id --json
```

### オプション一覧

#### logsコマンドのオプション

| オプション | 短縮形 | 説明 | 必須 | デフォルト値 |
|------------|--------|------|------|-------------|
| --project | -p | Google Cloudプロジェクトのプロジェクトid | はい | - |
| --service | -s | Cloud Runのサービス名 | いいえ | - |
| --start-time | -st | ログの開始時間（RFC3339形式） | いいえ | - |
| --end-time | -et | ログの終了時間（RFC3339形式） | いいえ | - |
| --level | -l | ログレベル（INFO, ERROR, WARNINGなど） | いいえ | - |
| --keyword | -k | 検索キーワード（複数指定可） | いいえ | - |
| --limit | -n | 取得するログエントリの最大数 | いいえ | 100 |
| --json | -j | ログをJSON形式で出力 | いいえ | false |

#### servicesコマンドのオプション

| オプション | 短縮形 | 説明 | 必須 | デフォルト値 |
|------------|--------|------|------|-------------|
| --project | -p | Google Cloudプロジェクトのプロジェクトid | はい | - |
| --region | -r | Cloud Runのリージョン | いいえ | us-central1 |
| --json | -j | サービス一覧をJSON形式で出力 | いいえ | false |

## ライブラリとしての使用

このツールは、ライブラリとしても使用できます。以下は使用例です：

### ログの取得

```go
package main

import (
	"context"
	"fmt"
	"time"

	"github.com/maito1201/cloudrun-logs-mcp/logs"
)

func main() {
	// フィルターオプションを設定
	opts := logs.FilterOptions{
		ProjectID:   "your-project-id",
		ServiceName: "your-service-name",
		StartTime:   time.Now().Add(-24 * time.Hour), // 24時間前から
		LogLevel:    "ERROR",
		Keywords:    []string{"error", "exception"},
		Limit:       50,
	}

	// ログを取得
	ctx := context.Background()
	entries, err := logs.GetCloudRunLogs(ctx, opts)
	if err != nil {
		fmt.Printf("エラー: %v\n", err)
		return
	}

	// 結果を処理
	for _, entry := range entries {
		fmt.Printf("[%s] %s: %s\n", entry.Timestamp.Format(time.RFC3339), entry.Severity, entry.Message)
	}
}
```

### サービス一覧の取得

```go
package main

import (
	"context"
	"fmt"
	"time"

	"github.com/maito1201/cloudrun-logs-mcp/logs"
)

func main() {
	// プロジェクトIDとリージョンを指定
	projectID := "your-project-id"
	region := "us-central1"

	// サービス一覧を取得
	ctx := context.Background()
	services, err := logs.GetCloudRunServices(ctx, projectID, region)
	if err != nil {
		fmt.Printf("エラー: %v\n", err)
		return
	}

	// 結果を処理
	for _, service := range services {
		fmt.Printf("名前: %s\n", service.Name)
		if service.Description != "" {
			fmt.Printf("説明: %s\n", service.Description)
		}
		fmt.Printf("URL: %s\n", service.URL)
		fmt.Printf("ステータス: %s\n", service.Status)
		fmt.Printf("作成日時: %s\n", service.CreateTime.Format(time.RFC3339))
		fmt.Printf("更新日時: %s\n", service.UpdateTime.Format(time.RFC3339))
		fmt.Println()
	}
}
```


## ライセンス

MIT
