# MCP Blockchain Query Server

![Logo](assets/mcp-blockchain-query.jpg)

> [!WARNING]
> Majority of the code in this repository was generated using [Grok 3 Beta](https://x.ai/blog/grok-3)

[Model Context Protocol](https://modelcontextprotocol.io) server providing tools for querying BTC data via Blockchain [Data](https://www.blockchain.com/explorer/api/blockchain_api) and [Query](https://www.blockchain.com/explorer/api/q) APIs.

## Demo

https://github.com/user-attachments/assets/b270979b-b22f-467c-bcb4-54bd48504073

## Features

- Supports both stdio and SSE transports
- Available [tools](https://modelcontextprotocol.io/docs/concepts/tools):
    - Get block by hash
    - Get transaction by hash
    - Get address by hash
    - Get block count
    - Get difficulty
    - Get address balance
    - Get hash rate
    - Get average transaction size
    - Get total bitcoins
    - Get probability of finding a block
    - Get 24-hour market price
    - Get block interval
    - Get block reward
    - Get next retarget
    - Get latest hash
    - Get unconfirmed count
    - Get 24-hour transaction count

## Installation

```
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Running

Run in stdio mode (default):

    $ python main.py

Run in SSE mode:

    $ python main.py --transport sse --port 8000

CLI Arguments:

- `--port`: Port number for SSE transport (default: 8000)
- `--transport`: Transport type (stdio or sse, default: stdio)
