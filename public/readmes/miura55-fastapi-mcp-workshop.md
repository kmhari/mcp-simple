# FastAPI MCP Workshop
このレポジトリはMCP(Model Context Protocol)をFastAPIで実装するためのワークショップ用のサンプルコードです。

## セットアップ
以下のコマンドを実行して、Pythonのパッケージ管理ツールのuv (https://docs.astral.sh/uv/getting-started/installation/) をインストールします。

### MacOS/Linux

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Windows

```bash
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

## プロジェクトのセットアップ
以下のコマンドでソースコードをクローンします。

```bash
git clone https://github.com/Miura55/fastapi-mcp-workshop
cd fastapi-mcp-workshop
```

仮想環境を用意します。

```bash
uv venv
```

## アプリケーションの起動
以下のコマンドでアプリケーションを起動します。

```bash
uv run uvicorn main:api.app --host 0.0.0.0 --reload
```

## mcp-proxyを使って接続

追加でmcp-proxyをインストールします。

```bash
uv tool install mcp-proxy
```

Claude Desktopの設定ファイル( `claude_desktop_config.json`) を開き、お使いのOSに合わせて以下の設定を行います。

- Windows

```json
{
  "mcpServers": {
    "my-api-mcp-proxy": {
        "command": "mcp-proxy",
        "args": ["http://127.0.0.1:8000/mcp"]
    }
  }
}
```

- MacOS
MacOSの場合、mcp=proxyのパスをフルパスで指定する必要があります。 `which mcp-proxy` でフルパスを確認できます。

```json
{
  "mcpServers": {
    "my-api-mcp-proxy": {
        "command": "/Full/Path/To/Your/Executable/mcp-proxy",
        "args": ["http://127.0.0.1:8000/mcp"]
    }
  }
}
```
