# Investec API MCP Server

This is a Model Context Protocol (MCP) server that provides tools for interacting with the Investec SA Private Banking [API](https://developer.investec.com/za/getting-started).

## Design Philosophy

This MCP server has been intentionally designed with simplicity in mind. The entire implementation is contained in a single file (`server.py`) without unnecessary abstractions or layers. This approach was deliberately chosen for security reasons to make it easy to audit and review the full codebase without exessive effort.

## Installation

1. Clone this repository
2. Install dependencies using the `uv` package manager:
   ```bash
   # Install uv if you don't have it yet
   curl -sSf https://astral.sh/uv/install.sh | bash
   
   # Create virtual environment and activate it
   uv venv
   source .venv/bin/activate
   
   # Install dependencies
   uv sync
   ```
3. Create your environment file from the example:
   ```bash
   cp .env.example .env
   ```
4. Edit the `.env` file and add your Investec API credentials:
   ```
   CLIENT_ID=your-client-id
   CLIENT_SECRET=your-client-secret
   API_KEY=your-api-key
   USE_SANDBOX=true # or false for production
   TIMEOUT=30 # seconds
   ```

## Running the Server

Test the server by running it using:

```bash
python server.py
```

## Compatible MCP Clients

This server implements the Model Context Protocol (MCP) and can be used with any compatible client. Some recommended clients include:

- [Claude Desktop App](https://claude.ai/download) - Anthropic's desktop client with full MCP support
- [Cursor](https://cursor.com) - An AI-native code editor with MCP tools support

For a full list of compatible clients, visit the [MCP Clients page](https://modelcontextprotocol.io/clients).

## Connecting to Claude Desktop

To connect this MCP server to Claude Desktop:

1. Download and install [Claude Desktop](https://claude.ai/download)
2. Configure Claude Desktop to use this MCP server by editing the configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%AppData%\Claude\claude_desktop_config.json`
   - Add the server configuration:

```json
{
    "mcpServers": {
        "investec-banking": {
            "command": "~/.local/bin/uv",
            "args": [
                "--directory",
                "/path/to/mcp-investec-sapb-simple",
                "run",
                "server.py"
            ]
        }
    }
}
```

For macOS users, this configuration:
- Uses the uv CLI tool to run the Python script
- Specifies the project directory with `--directory`
- Runs the server directly with `run server.py`

3. Save the file and restart Claude Desktop
4. You should now see the Investec tools available in Claude

For more detailed instructions, see the [MCP Quickstart Guide](https://modelcontextprotocol.io/quickstart/user).

## Connecting to Cursor

Alternatively, you can use Cursor as your MCP client:

1. Download and install [Cursor](https://cursor.com)
2. Open Cursor and follow their MCP integration [instructions](https://docs.cursor.com/context/model-context-protocol)

## Available Tools

The server provides the following tools:

### Account Information
- `get_accounts`: Get a list of accounts
- `get_account_balance`: Get the balance of a specific account
- `get_account_transactions`: Get transactions for a specific account
- `get_pending_transactions`: Get pending transactions for a specific account
- `get_profiles`: Get a list of profiles
- `get_profile_accounts`: Get accounts for a specific profile

### Beneficiaries
- `get_beneficiaries`: Get a list of beneficiaries
- `get_beneficiary_categories`: Get a list of beneficiary categories
- `get_profile_beneficiaries`: Get beneficiaries for a specific profile and account
- `get_authorisation_setup_details`: Get authorisation setup details

### Transfers
- `transfer_multiple`: Transfer funds to one or multiple accounts
- `pay_multiple`: Pay funds to one or multiple beneficiaries

### Documents
- `get_documents`: Get a list of documents for a specific account
- `get_document`: Get a specific document

## Contributing

Contributions are welcome to improve this MCP server. Beyond bug fixes, key areas for enhancement include:

- Error handling refinements
- Logging improvements
- Test coverage expansion
- Documentation enhancements
- Supporting credential retrieval from keyvaults or other secure sources
- Anything else that you consider to be needed or valuable

Please submit a pull request with your improvements. 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 