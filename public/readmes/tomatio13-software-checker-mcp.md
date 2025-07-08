<h1 align="center">Software Checker MCP</h1>

<p align="center">
   	<a href="README_JP.md"><img src="https://img.shields.io/badge/ドキュメント-日本語-white.svg" alt="JA doc"/></a>
	<a href="README.md"><img src="https://img.shields.io/badge/english-document-white.svg" alt="EN doc"></a>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Python-3.12+-blue.svg" alt="Python 3.12+"/>
    <img src="https://img.shields.io/badge/fastmcp-0.1.0+-green.svg" alt="fastmcp 0.1.0+"/>
</p>

このMCPサーバーは、Gitリポジトリの品質確認とリリースノート生成を支援するツールです。

## 📋 機能

1. **🔍 リポジトリ品質確認**: リポジトリの構造、ドキュメント、コード品質などを包括的にチェックし、改善点を提案します。
2. **📝 リリースノート生成**: 指定したGitタグ間の変更を分析し、構造化されたリリースノートを自動生成します。
3. **🔒 ソフトウェアセキュリティチェック**: ソースコードをセキュリティリスクの観点から包括的に分析し、脆弱性や改善点を特定します。

## 💡 詳細機能説明

### 🔍 リポジトリ品質確認
repository_quality_check 関数はリポジトリの品質を総合的に評価するプロンプトを生成します。
主な確認ポイント：

- README.mdの品質（構造、説明の明確さ、視覚的要素）
- ドキュメンテーション全体の一貫性
- コード品質と構造
- 環境設定とセキュリティ

### 📝 リリースノート生成
generate_release_notes 関数は、指定したGitタグ間の変更を分析し、構造化されたリリースノートを生成するプロンプトを提供します。
主な機能：
- コミット履歴の自動分析
- 変更内容のカテゴリ分類（新機能、バグ修正など）
- 統計情報の収集と表示

### 🔒 ソフトウェアセキュリティチェック
software_security_check 関数はソースコードのセキュリティリスクを分析するプロンプトを生成します。
主な確認ポイント：

- コマンド実行とユーザー入力処理の安全性
- 認証情報・トークン管理
- ファイルシステムアクセスの制限
- 通信とデータ送信の安全性
- 不審なコードパターンの検出

## 📖 プロンプト

Makiさん[Sunwood-ai-lbas](https://github.com/Sunwood-ai-labs/MysticLibrary/tree/main/prompts/coding)が公開されている
以下のプロンプトを含んでいます。
- リポジトリ品質確認プロンプト V3
- Gitリリースノート作成プロンプト V1

ソフトウェアセキュリティチェックのプロンプトは、
みうPさんが公開されている[MCPサーバーを利用する前に理解しておくべきセキュリティリスク](https://zenn.dev/sun_asterisk/articles/mcp_security_risk)を基に、claude-3.7-sonnetに作成して貰いました。
> ☢️注意：ウィルスチェックソフトではありません。悪意のあるコードの完全なチェックをできるわけではありません。最後は導入可否を自己判断してください。


## 📁ディレクトリ構成

```
software-checker-mcp/
├── pyproject.toml        # プロジェクト設定ファイル
├── README.md             # このファイル
├── start.sh              # 起動スクリプト
└── src/
    └── software_checker_mcp/
        ├── __init__.py                           # パッケージ初期化ファイル
        ├── main.py                               # MCPサーバーのメイン実装
        ├── repo-review-prompt-v3.md              # リポジトリ品質確認用プロンプト
        ├── software-security-check.md            # ソフトウェアセキュリティチェック用プロンプト
        └── git-release-notes-generator-prompt_v1.md  # リリースノート生成用プロンプト
```

## 💉インストール方法

### 前提条件

- Python 3.12以上
- uv（`pip install uv`でインストール可能）

### インストール手順

#### 方法1: uvを使用した環境構築（推奨）

uvを使用して環境をセットアップします：

```bash
# uvをインストール
pip install uv

# リポジトリをクローンまたはダウンロード
git clone https://github.com/Tomatio13/software-checker-mcp.git
cd software-checker-mcp

# 仮想環境を作成し、依存関係をインストール
uv venv
uv pip install -e .
```

## 🔧使用方法

### サーバーの起動

uvを使用して直接実行するには：

```bash
# uvコマンドでPythonモジュールを実行
uv run python -m src.software_checker_mcp.main
```

### Cursorとの連携

#### mcp.jsonの記述方法

以下のように直接uvコマンドを実行してください。

```json
{
  "mcpServers": {
    "software-checker": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/software-checker-mcp",
        "run",
        "python",
        "-m",
        "src.software_checker_mcp.main"
      ]
    }
  }
}
```


### 📚利用例

#### 🔍リポジトリ品質確認

```
MCPを使ってリポジトリの品質を確認して、改善点を提案してください。
```

##### 出力例

リポジトリ品質確認では、以下のような詳細なチェックリスト結果が得られます：

![リポジトリ品質確認の出力例](assets/quality_check_sample.png)

出力には、README.mdの品質、ドキュメントの一貫性、環境設定とセキュリティ、コード品質、プロジェクト構造に関する詳細な評価と改善提案が含まれます。


#### 📝 リリースノート生成

```
MCPを使ってv1.0.0からv1.1.0までの変更に関するリリースノートを生成してください。
```

または、タグを指定せずに自動的に最新のタグを使用することもできます：

```
MCPを使って最新のリリースのリリースノートを生成してください。
```

#### 出力例
リリースノートでは、以下のようなリリースノートが得られます：

![リリースノートの出力例](assets/release_note_sample.png)

出力には、機能概要、ドキュメント、設定変更、その他の変更、統計などが出力されます。


#### 🔒ソフトウェアセキュリティチェック

```
MCPを使ってソフトウェアのセキュリティを確認して、脆弱性と対策を提案してください。
```

##### 出力例

ソフトウェアセキュリティチェックでは、コードのセキュリティリスクに関する詳細な分析結果が得られます。結果には以下の項目が含まれます：

![セキュリティチェックの出力例](assets/software_check_sample.png)

- コマンド実行とユーザー入力処理の安全性評価
- 認証情報・トークン管理の評価
- ファイルシステムアクセスの安全性
- 通信とデータ送信のセキュリティ
- 不審なコードパターンの検出結果
- 総合的なセキュリティ評価と改善提案


### 謝辞
[Sunwood-ai-lbas](https://github.com/Sunwood-ai-labs/MysticLibrary/tree/main/prompts/coding)