# MCP Source Tree Server

指定されたディレクトリ配下のファイルツリーを生成するMCPサーバーです。
`.`で始まるディレクトリや`.gitignore` に記載された条件に従って、特定のファイルやディレクトリを除外します。
Claudeに組み込むことで、Claudeがプロジェクトの構造を素早く確認でき、Claudeが編集すべきファイルを特定するのに役立ちます。

<a href="https://glama.ai/mcp/servers/1igr60piqh"><img width="380" height="200" src="https://glama.ai/mcp/servers/1igr60piqh/badge" alt="Source Tree Server MCP server" /></a>

## 機能

- 指定されたディレクトリ配下のファイルツリーをJSON形式で取得
- `.gitignore` の条件に従ってファイル/ディレクトリを除外
- ディレクトリ構造を階層的なJSONで表現

## セットアップ

### 必要条件

- Python 3.10以上
- uv

### インストール

```bash
# uvのインストール
$ curl -LsSf https://astral.sh/uv/install.sh | sh

$ cd /path/to/mcp-src-tree
# ライブラリのインストール
$ uv sync
```

## Claude for Desktopでの設定

`claude_desktop_config.json` に以下の設定を追加してください：

```json
{
    "mcpServers": {
        "src-tree": {
            "command": "uv",
            "args": [
                "--directory",
                "/path/to/mcp-src-tree",  # このプロジェクトディレクトリの絶対パスに書き換えてください
                "run",
                "tree.py"
            ]
        }
    }
}
```

## Claudeでの使用例

指示するのはsrcの一つ上のルートディレクトリを指定してください。
`.gitignore` を考慮する場合、ルートディレクトリ直下に `.gitignore` が存在することが前提です。
`/Users/xxx/GitHub/xxx/ のソースツリーを確認してください` のように指示すると動作します

以下のように応答します
```
はい、ソースツリーを確認させていただきます。
プロジェクトの構造を確認しました。以下のような構成になっています：
src/
└── xxxx/
    ├── __init__.py
    ├── converter.py
    ├── html_converter.py
    ├── image_processor.py
    ├── toc_analyzer.py
    └── utils.py
```
これにより、Claudeが素早くプロジェクトの構造を確認できます。

## ファイル除外

`.`で始まるディレクトリは自動的に除外されます。
`.gitignore` に記載されているパターンに合致するファイルやディレクトリは、ツリーから自動的に除外されます。
例えば、以下のような `.gitignore` の設定が有効です：

```
__pycache__/
node_modules/
*.log
```
