# MCP Source Relation Server

指定されたディレクトリの `src` 配下のソースコードの関連性を解析するMCPサーバーです。
言語ごとのインポート文を解析し、ファイル間の依存関係を特定します。
Claudeに組み込むことで、Claudeがプロジェクトの依存関係を素早く確認でき、関連するファイルの特定に役立ちます。

<a href="https://glama.ai/mcp/servers/jmnzj9317i"><img width="380" height="200" src="https://glama.ai/mcp/servers/jmnzj9317i/badge" alt="Source Relation Server MCP server" /></a>

## 機能

- 複数言語のインポート解析をサポート
  - TypeScript/JavaScript: `import`文、`require`文
  - Python: `import`文、`from ... import`文
  - Ruby: `require`文、`require_relative`文
  - Rust: `mod`宣言、`use`文
- tsconfig.jsonのパスエイリアス（`@/components/...`など）に対応
- 言語ごとの特殊な機能に対応
  - Python: `__init__.py`、相対インポート
  - Rust: `mod.rs`パターン
  - TypeScript: エイリアス、`index.ts`
  - Ruby: 拡張子なしのrequire

## セットアップ

### 必要条件

- Python 3.10以上
- uv

### インストール

```bash
# uvのインストール
$ curl -LsSf https://astral.sh/uv/install.sh | sh

$ cd /path/to/mcp-source-relation
# ライブラリのインストール
$ uv sync
```

## Claude for Desktopでの設定

`claude_desktop_config.json` に以下の設定を追加してください：

```json
{
    "mcpServers": {
        "source-relation": {
            "command": "uv",
            "args": [
                "--directory",
                "/path/to/mcp-source-relation",  # このプロジェクトディレクトリの絶対パスに書き換えてください
                "run",
                "source_relation.py"
            ]
        }
    }
}
```

## 使用方法

### Claudeでの使用


`/Users/xxx/GitHub/xxx/ のソースの依存関係を確認して` のように指示すると動作します  

```
`/Users/owa/GitHub/mcp-source-relation/` のソースコードの依存関係を確認してみましょう。

依存関係の分析結果から、以下のような構造が確認できます：

1. メインの解析モジュール: `src/source_analyzer.py`
   - 各言語固有の解析モジュールを利用しています（Ruby, Python, TypeScript, Rust）

2. 言語別の解析モジュール:
   - `src/analyzers/ruby.py`
   - `src/analyzers/python.py` 
   - `src/analyzers/typescript.py`
   - `src/analyzers/rust.py`
   - すべて `src/analyzers/base.py` を継承しています

3. 共通基盤:
   - `src/analyzers/base.py`: 基本的な解析機能を提供
   - `src/utils/path.py`: パス操作のユーティリティ
   - `src/configs/typescript.py`: TypeScript固有の設定

特徴的な点：
- 各言語の解析モジュールは共通の基底クラス（base.py）を継承しており、一貫性のある設計になっています
- TypeScriptのみ独自の設定ファイル（configs/typescript.py）を持っています
- パス操作は共通のユーティリティモジュール（utils/path.py）に集約されています

この構造から、新しい言語のサポートを追加する場合は、`src/analyzers/` に新しいモジュールを追加し、`base.py` を継承することで実現できる設計になっていることがわかります。
```
ディレクトリを指定した場合はその下の `src` ディレクトリを解析します
ファイルを指定した場合はそのファイルを基準に解析します
promptからのパス入力にも対応しています
promptで利用する場合は、`Attach from MCP`->`Choose an integration`->`source-relation`を選択してください

## 出力形式

解析結果は以下のようなJSON形式で出力されます：

```json
{
  "dependencies": {
    "components/Button.tsx": [
      "types/index.ts",
      "utils/theme.ts"
    ],
    "pages/index.tsx": [
      "components/Button.tsx",
      "utils/api.ts"
    ]
  }
}
```

すべてのパスは`src`ディレクトリを基準とした相対パスで表示されます。

## サポートされるインポート形式

### TypeScript/JavaScript
- `import { Component } from './Component'`
- `import type { Type } from '@/types'`
- `import './styles.css'`
- `require('./module')`
- エイリアスパス（`@/components/...`）

### Python
- `import module`
- `from module import name`
- `from .module import name`
- `from ..module import name`

### Ruby
- `require 'module'`
- `require_relative './module'`
- 拡張子なしのrequire

### Rust
- `mod module;`
- `use crate::module;`
- `use super::module;`
- `use self::module;`
