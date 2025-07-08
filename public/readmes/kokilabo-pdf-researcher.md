# PDF検索MCPサーバー

## 概要

PDF検索に特化したMCPサーバーです。

**※注意:** 現在開発途中であり、機能や仕様は変更される可能性があります。

## デモ

https://github.com/user-attachments/assets/877163ad-5a5d-484f-839a-9b1355f1b71a

## 技術スタック

このプロジェクトで使用している主な技術スタックは以下の通り

-   **プログラミング言語:** Python 3.13
-   **パッケージ管理/仮想環境:** uv
-   **外部API:** Brave Search API
-   **コアライブラリ:** FastMCP

## 使い方

### インストール

1.  リポジトリをクローンします
    ```bash
    git clone https://github.com/kokilabo/pdf-researcher.git
    ```
2.  仮想環境を設定します
    ```bash
    cd pdf-researcher
    uv init
    ```
3.  必要なパッケージをインストールします
    ```bash
    uv add fastapi fastmcp httpx python-dotenv uvicorn
    ```
4.  `.env`ファイルを作成し、Brave Search APIキーを設定します
    ```bash
    BRAVE_API_KEY=your_api_key
    ```
5.  以下のコードをMCPクライアントに追加してください
```json
{
    "mcpServers": {
        "PDFSearcher": {
            "command": "uv",
            "args": [
                "run",
                "--with",
                "fastmcp",
                "fastmcp",
                "run",
                "/path/to/pdf-researcher/app/server.py"
            ]
        }
    }
}

```
