# scdl-mcp

Download songs and playlists from Soundcloud with Claude. After installing, ask Claude about available features.

## Installation

```bash
git clone https://github.com/arnavsurve/scdl-mcp
cd scdl-mcp
uv run mcp install server.py
```

You can use the Claude desktop client or any other LLM client that supports [MCP](https://www.anthropic.com/news/model-context-protocol). After running `uv run mcp install server.py` from the project directory, restart Claude desktop.

## Dependencies

```bash
brew install ffmpeg pipx
```

```bash
pipx install scdl
```

or whatever package manager your OS uses. idc
