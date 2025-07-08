# memvid-mcp-server


A Streamable-HTTP MCP Server that uses [memvid](https://github.com/Olow304/memvid) to encode text data into videos that can be quickly looked up with semantic search.


Supported Actions:
- `add_chunks`: Adds chunks to the memory video. Note: each time you add chunks, it resets the memory.mp4. Unsure if there is a way to incrementally add.
- `search`: queries for the top-matching chunks. Returns 5 by default, but can be changed with top_k param.

## Running

Set up your environment:
```bash
python3.11 -m venv my_env
. ./my_env/bin/activate
pip install -r requirements.txt
```

Run the server:
```bash
python server.py
```

With a custom port:

```bash
PORT=3002 python server.py
```

## Connect a Client

You can connect a client to your MCP Server once it's running. Configure per the client's configuration. There is the [mcp-config.json](/mcp-config.json) that has an example configuration that looks like this:
```json
{
  "mcpServers": {
    "memvid": {
      "type": "streamable-http",
      "url": "http://localhost:3000"
    }
  }
}
```

### Acknowledgements

- Obviously the modelcontextprotocol and Anthropic teams for the MCP Specification. [https://modelcontextprotocol.io/introduction](https://modelcontextprotocol.io/introduction)
- [HeyFerrante](https://heyferrante.com?ref=github-memvid-mcp-server) for enabling and sponsoring this project.
