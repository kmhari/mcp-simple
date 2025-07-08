# Email Checker MCP Server

For your cold outbound email, this tool will help you validate email addresses.

## Features

- Email address validation
- Simple JSON response format
- No API key required

## Prerequisites

- Python 3.x

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ravinahp/email-checker-mcp.git
cd email-checker-mcp
```

2. Install dependencies using uv:
```bash
uv sync
```

Note: We use `uv` instead of pip since the project uses `pyproject.toml` for dependency management.

## Configure as MCP Server

To add this tool as an MCP server, you'll need to modify your Claude desktop configuration file.

The configuration file location depends on your operating system:

- MacOS: `~/Library/Application\ Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`

Add the following configuration to your JSON file:

```json
{
    "email-checker-mcp": {
        "command": "uv",
        "args": [
            "--directory",
            "/Users/YOUR_USERNAME/Code/email-checker-mcp",
            "run",
            "email-checker-mcp"
        ]
    }
}
```

⚠️ IMPORTANT: 
1. Replace `YOUR_USERNAME` with your actual system username
2. Make sure the directory path matches your local installation

## Usage

The service provides a FastMCP tool for validating email addresses:

```python
@mcp.tool()
async def validate_email(email: str) -> bool:
    """Validate if an email address exists."""
```
## Example Use: 
Prompt: Does this email exist? 
<img width="769" alt="Screenshot 2025-01-08 at 10 14 43 AM" src="https://github.com/user-attachments/assets/1bee703b-3a8a-4ed0-ab0d-27b0dfdd06de" />



### Parameters:
- `email`: String containing the email address to validate

### Example Response:
```json
{
    "exist": true
}
```

## API Usage Limits

The service uses 2IP's Email API which provides:
- No API key required


## Error Handling

The service includes error handling for:
- Invalid email format
- API request failures
- Network timeouts
- Rate limiting

