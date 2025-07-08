# Midjourney MCP

A MCP server implementation for generating images with Midjourney.



```json
{
    "mcpServers": {
        "midjourney": {
            "command": "uvx",
            "args": [
                "midjourney-mcp"
            ]
        }
    }

}
```


- `TOKEN_R`: Midjourney auth token R
- `TOKEN_I`: Midjourney auth token I
- `API_BASE`: Midjourney API base URL (optional, defaults to "midjourney.com")
- `SUFFIX`: Midjourney suffix (optional, defaults to "--v 6.1")


## API

The server provides the following tool:

- `generating_image(prompt: str, aspect_ratio: str) -> str`
  - `prompt`: Description of the image you want to generate
  - `aspect_ratio`: Aspect ratio of the image (e.g. "16:9")

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0). This means: