# YouTube MP3 Downloader (MCP)

[EN] A Model-Context-Protocol (MCP) server that downloads MP3 audio from YouTube URLs. Easily integrate with Claude Desktop to extract high-quality audio files.

[JA] YouTubeのURLからMP3形式の音声をダウンロードするModel-Context-Protocol (MCP) サーバーです。Claude Desktopなどと連携して、簡単に高品質な音声ファイルを取得できます。

## Features / 機能

- **MP3 Extraction**: Extract high-quality MP3 files from YouTube URLs / **MP3抽出**: YouTube URLから高品質なMP3を抽出
- **Quality Selection**: Choose from low, medium, or high quality / **音質選択**: 低・中・高の音質から選択可能
- **Custom Output**: Customize download directory / **出力先指定**: ダウンロード先をカスタマイズ可能
- **Docker Support**: Run as a Docker container / **Docker対応**: Dockerコンテナとして実行可能
- **Claude Integration**: Easy integration with Claude Desktop / **Claude連携**: Claude Desktopと簡単に連携

## Installation & Setup / インストールと設定

### Standard Installation / 通常のインストール

```bash
# Clone repository / リポジトリのクローン
git clone https://github.com/bads1de/youtube-mp3-mcp.git
cd youtube-mp3-mcp

# Install dependencies / 依存関係のインストール
npm install

# Build / ビルド
npm run build
```

### Docker Installation / Dockerを使用したインストール

```bash
# Clone repository / リポジトリのクローン
git clone https://github.com/bads1de/youtube-mp3-mcp.git
cd youtube-mp3-mcp

# Build Docker image / Dockerイメージのビルド
docker build -t youtube-mp3-mcp .
```

### Environment Variables / 環境変数

[EN] Customize the application with these environment variables:

- `YOUTUBE_MP3_OUTPUT_DIR`: Output directory for MP3 files (default: `~/Downloads`)
- `YOUTUBE_MP3_DEFAULT_QUALITY`: Audio quality (`low`, `medium`, `high`, default: `medium`)
- `YOUTUBE_MP3_TEMP_DIR`: Temporary files directory (default: system temp dir)

[JA] 以下の環境変数でアプリケーションをカスタマイズできます：

- `YOUTUBE_MP3_OUTPUT_DIR`: MP3ファイルの出力先 (デフォルト: `~/Downloads`)
- `YOUTUBE_MP3_DEFAULT_QUALITY`: 音質 (`low`, `medium`, `high`, デフォルト: `medium`)
- `YOUTUBE_MP3_TEMP_DIR`: 一時ファイルの保存先 (デフォルト: システムの一時ディレクトリ)

### Claude Desktop Configuration / Claude Desktopの設定

#### Standard Setup / 通常の設定

[EN] Add this to your `claude_desktop_config.json`:

[JA] `claude_desktop_config.json`に以下のように設定します：

```json
{
  "mcpServers": {
    "youtube-mp3": {
      "command": "node",
      "args": ["path/to/youtube-mp3-mcp/dist/index.js"],
      "env": {
        "YOUTUBE_MP3_OUTPUT_DIR": "C:/Users/username/Downloads",
        "YOUTUBE_MP3_DEFAULT_QUALITY": "high"
      }
    }
  }
}
```

#### Docker Setup / Dockerを使用した設定

```json
{
  "mcpServers": {
    "youtube-mp3": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-v",
        "C:/Users/username/Downloads:/downloads",
        "youtube-mp3-mcp"
      ],
      "env": {
        "YOUTUBE_MP3_DEFAULT_QUALITY": "high"
      }
    }
  }
}
```

[EN] The `-v` option mounts your host directory (e.g., `C:/Users/username/Downloads`) to the container's `/downloads` directory. Downloaded MP3 files will be saved to this directory. **Note**: On Windows, use forward slashes (`/`) in paths.

[JA] `-v`オプションでホストのディレクトリ（例: `C:/Users/username/Downloads`）をコンテナの`/downloads`ディレクトリにマウントします。ダウンロードしたMP3ファイルはこのディレクトリに保存されます。**注意**: Windowsではパスにフォワードスラッシュ(`/`)を使用してください。

## Architecture / アーキテクチャ

[EN] This project uses a simple service-oriented architecture implementing the Model-Context-Protocol (MCP):

- **Service Layer**: YouTubeService and DownloaderService provide core functionality
- **MCP Layer**: Exposes functionality through resources and tools
- **Type Definitions**: Defines types used throughout the application

[JA] このプロジェクトはシンプルなサービス指向アーキテクチャを採用し、Model-Context-Protocol (MCP) を実装しています：

- **サービス層**: YouTubeServiceとDownloaderServiceが主要機能を提供
- **MCP層**: リソースとツールを通じて機能を公開
- **型定義**: アプリケーション全体で使用される型を定義

### MCP Tool / MCPツール

- **download-mp3**: Download MP3 from YouTube URL / YouTubeのURLからMP3をダウンロード
  - `url`: YouTube video URL (required) / YouTube動画のURL (必須)
  - `quality`: Audio quality (`low`, `medium`, `high`) (optional) / 音質設定 (オプション)
  - `outputDir`: Output directory (optional) / 出力ディレクトリ (オプション)

## Notes / 注意事項

[EN]

- Use this application only in compliance with YouTube's terms of service
- Users are responsible for legal compliance when downloading copyrighted content
- youtube-dl-exec uses Python and ffmpeg internally

[JA]

- このアプリケーションはYouTubeの利用規約を遵守する範囲でのみ使用してください
- 著作権保護されたコンテンツのダウンロードに関する法的責任はユーザーにあります
- youtube-dl-execは内部でPythonとffmpegを使用します

## License / ライセンス

MIT
