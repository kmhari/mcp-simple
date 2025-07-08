# urlDNA MCP Server
[Blog](https://medium.com/@urldna/introducing-the-urldna-mcp-server-native-threat-intelligence-for-llm-agents-6330a35dcf05)

![Claude Prompt](https://github.com/urldna/mcp/blob/main/claude_prompt.png?raw=true)

The `urlDNA MCP Server` enables native tool use for security-focused LLM agents like OpenAI GPT-4.1 and Claude 3 Desktop, providing a direct interface to interact with the [urlDNA](https://urldna.io) threat intelligence platform via API.

---

## Hosted MCP Server

The `urlDNA MCP` server is already **hosted and available** at:

```
https://mcp.urldna.io/sse
```

This server is accessible over **Server-Sent Events (SSE)** protocol, which supports streaming interactions between LLMs and the backend tools.

You can use it directly with any platform or LLM supporting the `mcp` specification (e.g., Claude Desktop, OpenAI GPT-4.1).

---

## Supported Actions

The following tools are exposed by the MCP interface:

| Tool         | Description                                                    |
|--------------|----------------------------------------------------------------|
| `new_scan`   | Submit a new scan for a given URL                              |
| `get_scan`   | Retrieve a scan by ID                                          |
| `search`     | Search scans using text, domain, or filters                    |
| `fast_check` | Lightweight phishing detection via content + redirect analysis |

---

## Integration with Claude Desktop (Anthropic MCP)

To integrate the `urlDNA MCP server` in Claude Desktop, update your Claude configuration (typically `claude.config.json` or equivalent) like so:

```json
{
  "mcpServers": {
    "urlDNA": {
      "command": "python",
      "args": [
        "<YOUR_PATH>/run.py"
      ],
      "env": {
        "authorization": "<urlDNA_API_KEY>"
      }
    }
  }
}
```

> Replace `<YOUR_PATH>` with the actual path to `run.py`, and `<urlDNA_API_KEY>` with your API key from [https://urldna.io](https://urldna.io).

Once configured, you can prompt Claude with natural language requests like:

> **"Search in urlDNA for malicious scans with title like paypal"**

Claude will automatically call the correct tool and return results from the `urlDNA` platform.

---

## Using the MCP Server with OpenAI GPT-4.1 (Python SDK)

```python
from openai import OpenAI

# Initialize OpenAI client (assumes API key is set via env var or config)
client = OpenAI()

response = client.responses.create(
    model="gpt-4.1",
    input=[
        {
            "role": "system",
            "content": [{"type": "input_text", "text": "You are a cybersecurity analyst using urlDNA."}]
        },
        {
            "role": "user",
            "content": [{"type": "input_text", "text": "Search in urlDNA malicious scan with title like paypal"}]
        }
    ],
    text={"format": {"type": "text"}},
    reasoning={},
    tools=[
        {
            "type": "mcp",
            "server_label": "urlDNA",
            "server_url": "https://mcp.urldna.io/sse",
            "headers": {
                "Authorization": "Bearer <URLDNA_API_KEY>"
            },
            "allowed_tools": ["new_scan", "get_scan", "search", "fast_check"],
            "require_approval": "never"
        }
    ],
    temperature=0.7,
    top_p=1,
    max_output_tokens=2048,
    store=True
)

print(response.output)
```


## Requirements

- Python 3.9+

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Contact & Support

For support or API access, visit [https://urldna.io](https://urldna.io) or email urldna@urldna.io.

---
