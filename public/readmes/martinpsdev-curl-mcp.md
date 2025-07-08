# Curl MCP - Natural Language Curl Commander

Execute curl commands using natural language in English and Spanish.

## Prerequisites

- Python 3.13 or higher
- curl (usually pre-installed on Linux)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MartinPSDev/curl-mcp.git
cd curl-mcp
```

2. Create and activate a virtual environment:
```bash
python3 -m venv .env
source .env/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the MCP server:
```bash
python3 main.py
```

<img src="./demo.png" width="70%" height="70%" alt="demo">

## Configuration

Add this to your MCP settings:

```json
{
    "mcpServers": {
        "curl-mcp": {
            "command": "/usr/bin/python3",
            "args": [
                "/path/to/your/curl-mcp/main.py"
            ],
            "env": {
                "PYTHONPATH": "/path/to/your/curl-mcp/.env/lib/python3.11/site-packages"
            }
        }
    }
}
```

Note: Replace `/path/to/your/curl-mcp` with the actual path where you cloned the repository.

## Usage

1. Start the MCP server:
```bash
python3 main.py
```

2. The server can now receive natural language commands in English or Spanish. Here are some examples:

### Basic Examples:
- "Get headers from https://example.com"
- "Show raw response from https://api.example.com"
- "Download https://example.com and save as page.html"

### Advanced Examples:
- Headers and Authentication:
  - "Make a request to https://api.example.com with header Authorization: Bearer mytoken"
  - "Get https://api.example.com using basic auth user:password"

- Data Handling:
  - "POST to https://api.example.com/users with data name=John and age=25"
  - "Send form data to https://upload.example.com with file image.jpg"
  - "POST urlencoded data user=test+name to https://api.example.com"

- Security and Options:
  - "Get https://example.com ignoring SSL verification"
  - "Request https://api.example.com with timeout 30 seconds"
  - "Get https://example.com through proxy localhost:8080"

- User Agents:
  - "Get https://example.com as Chrome"
  - "Request https://mobile.example.com as iPhone"
