# Twitter Username Changes MCP Server

An MCP server that tracks the historical changes of Twitter usernames—frequent screen name changes in crypto projects can be a red flag for potential scam risks.

![License](https://img.shields.io/badge/License-MIT-green.svg)
![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)

## Features

- **Username Change History**: Query the historical usernames of a Twitter user by their current screen name (e.g., `@OSINT_Ukraine` or `@Mormonger`).
- **Prompt Support**: Includes a prompt template to guide users in formulating queries.
- **Lightweight Design**: Built with minimal dependencies (`mcp` and `requests`) for easy setup.

## Installation

### Prerequisites

- Python 3.10+
- `pip` or `uv` for dependency management
- [Claude Desktop](https://www.anthropic.com/) (optional, for MCP integration)

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kukapay/twitter-username-changes-mcp.git
   cd twitter-username-changes-mcp
   ```

2. **Install Dependencies**:
   ```bash
   pip install mcp[cli] requests
   ```

## Usage

### Running the Server

Start the server in development mode to test locally:
```bash
mcp dev main.py
```

This launches the MCP Inspector, where you can:
- List available tools (`query_username_changes`).
- Test queries (e.g., `screen_name: "OSINT_Ukraine"`).
- Debug prompts.

### Integrating with Claude Desktop

1. **Configure MCP Server**:
   Edit the Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

   Add the server:
   ```json
   {
     "mcpServers": {
       "twitter-username-changes": {
         "command": "python",
         "args": [
           "/absolute/path/to/twitter-username-changes-mcp/main.py"
         ]
       }
     }
   }
   ```
   Replace `/absolute/path/to/` with the full path to `main.py`.

2. **Install the Server**:
   ```bash
   mcp install main.py --name "TwitterUsernameChanges"
   ```

3. **Query in Claude Desktop**:
   - Open Claude Desktop and look for the hammer icon (indicating MCP tools).
   - Enter a query like:
     ```
     Show the username change history for Twitter user @OSINT_Ukraine
     ```
   - Expected output:
     ```
     Username change history for OSINT_Ukraine:

     User ID 4725638310:
     - The_HelpfulHand (2016-01-09 to 2020-09-27)
     - nftpromo_s (2022-02-10 to 2022-02-23)
     - OSINT_Ukraine (2022-02-24 to 2022-02-25)
     ```

### Example Queries

1. **Query `@Mormonger`**:
   
   Tool input: `screen_name: "Mormonger"`
   
   Output:
   ```
   Username change history for Mormonger:

   User ID 1408886100:
   - colenoorda (2016-04-02)
   - Mormonger (2017-01-19 to 2025-02-25)
   ```

2. **Query Invalid Handle**:
   
   Tool input: `screen_name: "InvalidUser123"`
   
   Output:
   ```
   No username change history found for InvalidUser123
   ```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

