# Amadeus MCP Server

[![smithery badge](https://smithery.ai/badge/@donghyun-chae/mcp-amadeus)](https://smithery.ai/server/@donghyun-chae/mcp-amadeus)

**MCP-Amadeus is a community-developed [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol) server that integrates with the Amadeus Flight Offers Search API** to provide flight search capabilities through natural language interfaces. Built for use with MCP-compatible clients (e.g., Claude Desktop).

This project enables users to easily search for flight options between two locations with specific dates using the power of large language models (LLMs) and the Amadeus API.

This project uses the official [amadeus-python SDK](https://github.com/amadeus4dev/amadeus-python)

> **Disclaimer:** This is an open-source project *not affiliated with or endorsed by Amadeus IT Group.* Amadeus® is a registered trademark of Amadeus IT Group.

---

## ✨ Features

### ✈️ Flight Offers Search
Retrieve flight options between two locations for specified dates.

> "I'm looking for nonstop flights from New York to London on June 15th, any airline, for 1 adult."  
> → ✈️ Returns available flight options with details like departure time, arrival time, airline, and price.

- Powered by Amadeus Flight Offers Search API
- Requires origin, destination, number of tickets and travel date input

---

## 🌐 Demo

Once installed and connected to an MCP-compatible client (e.g., [Claude Desktop](https://claude.ai/download)), this server exposes tools that your AI assistant can use to fetch flight data.

![amadeus-mcp](https://github.com/user-attachments/assets/7cbf9dd0-aa9f-4554-8891-70a394d657a5)

---

## 🚀 Quick Start

### Installing via Smithery

To install Amadeus MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@donghyun-chae/mcp-amadeus):

```bash
npx -y @smithery/cli install @donghyun-chae/mcp-amadeus --client claude
```

### 1. Clone and Setup

``` bash
git clone https://github.com/donghyun-chae/mcp-amadeus.git
cd mcp-amadeus-flight-offers

# Install dependencies (using uv or pip)
uv sync
```

### 2. Get Your API Key and Set Environment

``` bash
cp .env.example .env
```
Then edit `.env` and add your API credentials:

``` bash
AMADEUS_CLIENT_ID=your_client_id
AMADEUS_CLIENT_SECRET=your_client_secret
```

Sign up on [https://developers.amadeus.com/](https://developers.amadeus.com/) and create an app to obtain your `Client ID` and `Client Secret`.


### 3. Configure MCP Client

Register this server in your MCP client (e.g., Claude for Desktop).

Edit ~/Library/Application Support/Claude/claude_desktop_config.json:

``` bash
{
    "mcpServers": {
        "amadeus": {
            "command": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/uv",
            "args": [
                "--directory",
                "/ABSOLUTE/PATH/TO/PARENT/FOLDER/src/",
                "run",
                "--env-file",
                "/ABSOLUTE/PATH/TO/PARENT/FOLDER/.env",
                "server.py"
            ]
        }
    }
}
```

> Replace `/ABSOLUTE/PATH/TO/PARENT/FOLDER/` with the actual path to your project folder.

my case:

``` bash
{
    "mcpServers": {
        "amadeus": {
            "command": "/Users/asena/.local/bin/uv",
            "args": [
                "--directory",
                "/Users/asena/mcp-amadeus/src/",
                "run",
                "--env-file",
                "/Users/asena/mcp-amadeus/.env",
                "server.py"
            ]
        }
    }
}

```

---

## 🛠️ Tools

After installation, the following tool is exposed to MCP clients:

### `get_flight_offers`

Retrieves flight offers from the Amadeus Flight Offers Search API.

**Request:**

``` json
{
  "action": "tool",
  "name": "get_flight_offers",
  "params": {
  "origin": "JFK",
  "destination": "LHR",
  "departure_date": "2025-06-15"
  }
}
```


**Parameters:**
| Name            | Type     | Required | Description                                   | Example        |
|-----------------|----------|----------|-----------------------------------------------|----------------|
| origin          | string   | Yes      | IATA code of departure city/airport           | JFK            |
| destination     | string   | Yes      | IATA code of destination city/airport         | LHR            |
| departure_date  | string   | Yes      | Departure date (YYYY-MM-DD)                   | 2025-06-15     |
| return_date     | string   | No       | Return date (YYYY-MM-DD). One-way if omitted  | 2025-06-20     |
| adults          | integer  | Yes      | Number of adults (1-9). Default: 1            | 2              |
| children        | integer  | No       | Number of children (2-11). Max total: 9       | 1              |
| infants         | integer  | No       | Number of infants (≤2). Max: # of adults      | 1              |
| travel_class    | string   | No       | Cabin class: ECONOMY, BUSINESS, etc.          | ECONOMY        |
| non_stop        | boolean  | No       | If true, only non-stop flights. Default: false| true           |
| currency_code   | string   | No       | Currency in ISO 4217 (e.g., USD)              | EUR            |
| max_price       | integer  | No       | Max price per traveler                        | 500            |
| max             | integer  | No       | Max number of offers. Default: 250            | 10             |

**Output:**
Returns flight offers in JSON format with airline, times, duration, and pricing details from Amadeus.


---

## 📚 References

- [Model Context Protocol Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [Amadeus Python SDK](https://github.com/amadeus4dev/amadeus-python)
- [Amadeus API Documentation](https://developers.amadeus.com/)

---

## 📝 License

[MIT License](LICENSE) © 2025 [donghyun-chae](https://github.com/donghyun-chae)
