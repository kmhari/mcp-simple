# PubMed MCP Server

This repository contains an MCP server that searches PubMed for article abstracts using BioPython's Entrez module. It leverages the FastMCP framework to provide asynchronous search capabilities for PubMed.

## Features

- **Search PubMed:** Query for articles based on a search term.
- **Retrieve Abstracts:** Fetch abstracts of articles returned from PubMed.
- **Asynchronous Operation:** Uses asynchronous execution (via `asyncio.to_thread`) to avoid blocking the server.

## Prerequisites

- Python 3.8 or higher
- mcp[cli]
- BioPython

## Setup

1. **Clone the Repository:**

   ```bash
   git clone PubMed-MCP-Server.git
   cd PubMed-MCP-Server
   ```

2. **Install Dependencies:**

   You can install the required packages using uv:

   ```bash
   uv add -r requirements.txt
   ```

3. **Configure Entrez Email:**

   Ensure you have set a valid email address in the code (in `main.py`):

   ```python
   Entrez.email = "give an email address"
   ```

## Running the Server

Start the PubMed MCP server by running:

```bash
uv run main.py
```

This command starts the server using the `uv` command-line tool (as specified in your configuration).

## Configuring the MCP Client

To configure your MCP client to connect to the PubMed MCP server, create or update your `config.json` file as follows:

```json
{
  "mcpServers": {
    "pubmed": {
      "command": "C:/Users/codingaslu/.local/bin/uv",
      "args": [
        "--directory",
        "C:/Users/codingaslu/OneDrive/Desktop/pubmed-mcp-server",
        "run",
        "main.py"
      ]
    }
  }
}
```

### Explanation of the Configuration

- **command:**  
  The full path to the command-line tool used to run the MCP server (in this case, `uv`).

- **args:**  
  - `--directory`: Specifies the working directory where the server is located.
  - `"C:/Users/aiany/OneDrive/Desktop/YT Video/pubmed-mcp-server"`: The path to the server's root directory.
  - `"run"` and `"main.py"`: The command and entry point to start the PubMed MCP server.

## Usage

Once the server is running and your MCP client is configured, you can use the provided tool:

- **Tool:** `search_pubmed`
- **Parameters:**  
  - `query`: The search term for PubMed (default is `"endocarditis"`).
  - `max_results`: Maximum number of articles to retrieve (default is `10`).

**Example Usage:**

```python
search_pubmed(query="endocarditis", max_results=10)
```

This will return a string with the abstracts of the articles separated by newlines.

## License

This project is licensed under the [MIT License](LICENSE).

You can adjust paths and details as needed for your specific setup.
