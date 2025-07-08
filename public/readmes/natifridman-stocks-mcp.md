# Stock Information MCP Server

This project provides a simple MCP (Modular Command Protocol) server and client for fetching stock information from Google Finance.

This project is built using [FastMCP](https://gofastmcp.com/getting-started/welcome), a Pythonic framework that simplifies the creation of MCP servers and clients. FastMCP handles all the complex protocol details and server management, allowing for clean and intuitive implementation of MCP tools.

## Features

- Fetch real-time stock prices from Google Finance
- Get company descriptions 
- Simple command-line interface
- Easy to integrate with other applications

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/natifridman/stocks-mcp.git
   cd stocks-mcp
   ```

2. Install the required dependencies:

   **Using uv (recommended):**
   ```
   uv sync
   source .venv/bin/activate
   ```
   This will create a virtual environment, install all dependencies from the lock file, and activate the environment.

   **Or using pip:**
   ```
   pip install fastmcp aiohttp beautifulsoup4
   ```

## Usage

### Starting the Server

1. Run the server in a terminal:
   ```
   uv run my_server.py
   ```
   The server will start and display a message like: "Starting server 'Stock Information MCP Server'..."

2. Keep this terminal open while using the client.

### Using the Client

The client can be used in several ways:

1. **With Command Line Arguments**:
   ```
   uv run my_client.py IBM:NYSE
   ```
   Replace `IBM:NYSE` with your desired stock ticker.

2. **Interactive Mode**:
   ```
   uv run my_client.py
   ```
   Then enter the ticker when prompted.

### Stock Ticker Format

Use the format `TICKER:EXCHANGE` for best results:

- `AAPL:NASDAQ` - Apple
- `MSFT:NASDAQ` - Microsoft
- `TSLA:NASDAQ` - Tesla
- `AMZN:NASDAQ` - Amazon
- `GOOGL:NASDAQ` - Google/Alphabet
- `IBM:NYSE` - IBM
- `DIS:NYSE` - Disney

## Adding MCP Config in VS Code or Cursor

To use this MCP tool in your editor:

1. **Cursor Configuration**:
   - Open or create the MCP configuration file at `~/.cursor/mcp.json`
   - Add the following configuration:
   ```json
   {
     "mcpServers": {
       "stock-info": {
         "command": "/path/to/your/stocks-mcp/.venv/bin/python",
         "args": ["/path/to/your/stocks-mcp/my_server.py"]
       }
     }
   }
   ```
   - Replace `/path/to/your/` with your actual project path

2. **VS Code Configuration**:
   - For VS Code, the configuration format might vary depending on the extension you're using


## API Reference

### Server Tools

The server provides the following tool:

- `get_stock_info(ticker: str)`: Returns stock information including price and description

### Client Functions

- `get_stock_info(ticker: str)`: Fetches and displays stock information

## Troubleshooting

- Make sure the server is running before using the client
- Check your internet connection if stock data isn't loading
- Verify the ticker symbol format is correct

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0) - see the [LICENSE](LICENSE) file for details.
