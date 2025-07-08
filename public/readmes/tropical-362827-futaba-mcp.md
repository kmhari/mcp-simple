# Futaba MCP

Futaba MCPは、ふたば☆ちゃんねると対話するためのModel Context Protocol（MCP）ツールを提供するPythonライブラリです。AIアシスタントがふたば☆ちゃんねるからスレッドデータを取得しできるようになります。

## 機能

- **スレッド一覧**: ふたば掲示板からスレッドのリストを取得し、勢いでソート
- **スレッド内容**: スレッドの内容(本文、そうだね数)を取得

https://github.com/user-attachments/assets/54de7dfc-d060-4f04-9536-96577aae409a

## 使用方法

### MCPサーバーの実行


```bash
# uvなどで依存関係のインストール
uv pip install --resolve uv
python main.py
```

Claudeから呼び出す場合は、 `claude_desktop_config.json` から `main.py` が読み込めるように設定する必要があります。

(WSL環境からpythonを読み込みたい場合の例)
```json
{
  "mcpServers": {
    "futaba_mcp": {
      "command": "wsl",
      "args": [
        "-d",
        "Ubuntu-22.04",
        "--",
        "bash",
        "-c",
        "/path/to/repository/futaba-mcp/.venv/bin/python /path/to/repository/futaba-mcp/main.py"
      ]
    }
  }
}
```


### 利用可能なツール

#### get_futaba()

ふたば掲示板からスレッドのリストを勢いでソートして取得します。

```python
result = await get_futaba()
print(result)
```

結果にはスレッドID、タイトル、レス数、勢いの値が含まれます。

#### get_thread(thread_id, filter_top_sod=True)

特定のスレッドの内容を取得します。

```python
# フィルタリング付きでスレッドを取得（そうだねカウント上位25%の投稿のみ）
result = await get_thread(1309537527)
print(result)

# フィルタリングなしですべての投稿を取得
result = await get_thread(1309537527, filter_top_sod=False)
print(result)
```

デフォルトでは、この関数は以下の投稿のみをフィルタリングして含めます：
- 元の投稿（OP）
- 「そうだね」カウントが上位25%の返信投稿
