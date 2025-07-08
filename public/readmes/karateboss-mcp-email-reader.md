# mcp_email_reader
Model Context Protocol (MCP) server exposes several mcp tools called search_emails, download_attachment and list_folders. This has been tested on Claude Desktop and LibreChat with Ollama.

## Installation

### Prerequisites

#### Windows
1. Install Claude Desktop (or another MCP-enabled AI tool)
   - Download [Claude for Desktop](https://claude.ai/download) 
   - Follow the current installation instructions: [Installing Claude Desktop](https://support.anthropic.com/en/articles/10065433-installing-claude-for-desktop)
     
2. Install Python 3.10 or higher:
   - Download the latest Python installer from [python.org](https://python.org)
   - Run the installer, checking "Add Python to PATH"
   - Open Command Prompt and verify installation with `python --version`

3. Install uv:
   - Open Command Prompt as Administrator
   - Run `pip install --user uv`
   - Verify installation with `uv --version`

#### macOS
1. Install Claude Desktop (or another MCP-enabled AI tool)
   - Download [Claude for Desktop](https://claude.ai/download) 
   - Follow the current installation instructions: [Installing Claude Desktop](https://support.anthropic.com/en/articles/10065433-installing-claude-for-desktop)
     
2. Install Python 3.10 or higher:
   - Using Homebrew: `brew install python`
   - Verify installation with `python3 --version`

3. Install uv:
   - Using Homebrew: `brew install uv`
   - Alternatively: `pip3 install --user uv`
   - Verify installation with `uv --version`

## Configuration

Add the following to your `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "mcp_email_reader": {
            "command": "uvx",
            "args": [
                "--from",
                "git+https://github.com/karateboss/mcp_email_reader@main",
                "mcp_email_reader"
            ],
        "env": {
            "IMAP_SERVER": "<email server>",
            "EMAIL_ACCOUNT": "<user email account>",
            "EMAIL_PASSWORD_ENC": "<encrypted password>"
            "EMAIL_SECRET_KEY": "<secret key used to encypt password>"
        }
    }
}
```
Note: Clearly, the secret key can be used to decrypt the encrypted password and is therefore a potential security risk - although claude_desktop_config.json is stored locally on your laptop/PC. It has been added to the json file above since it is not possible to add a .env file when using uvx to clone the repo dynamically.

## Attribution

This software package implements the ability to read emails into a MCP enabled framework and is developed by karateboss. 


## Contributing

We welcome contributions to improve these tools. Please submit issues and pull requests through our repository.

## Support

For questions and support:
1. Check our documentation
2. Submit an issue in our repository
