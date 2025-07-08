# DuckDB RAG MCP Sample

markdown ドキュメントを埋め込みベクトル化して、MCP から RAG で解説できるようにするサンプルです。

ベクトル化には [Plamo-Embedding-1B](https://tech.preferred.jp/ja/blog/plamo-embedding-1b/) を使用しています。

## 機能

- markdown ファイルからテキスト抽出・ベクトル化
- DuckDB を使用したベクトル検索
- Parquet ファイルによるベクトルデータの永続化
- MCP からベクトル検索

## 使用方法

### ベクトルデータ生成
最初に検索対象にしたい markdown ファイルを特定のディレクトリに配置し、以下のコマンドで Parquet ファイルに変換してください。

```bash
uv run main.py --directory ~/path/to/markdown/files --parquet vectors.parquet
```

### MCP の設定
#### ビルド
以下のコマンドでシングルバイナリが `dist/server` として生成されます。
```
uv run pyinstaller --clean --strip --noconfirm --onefile server.py
```

#### MCP のクライアント設定
利用したいクライアントに応じて設定してください。

Claude Desktop の場合は以下のような感じです。

VECTOR_PARQUET は先ほど変換したファイルを指定してください。

```bash
uv run mcp install server.py -v VECTOR_PARQUET=/path/to/vectors.parquet
```

以下のように設定されます。
```JSON:~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "DuckDB-RAG-MCP-Sample": {
      "command": "/path/to/dist/server",
      "env": {
        "VECTOR_PARQUET": "/path/to/vectors.parquet"
      }
    }
  }
}
```

### 開発用サーバー起動

```bash
uv run mcp dev server.py
```

## ライセンス

DuckDB RAG MCP Sampleは、Apache License, Version 2.0の下で提供されています。
