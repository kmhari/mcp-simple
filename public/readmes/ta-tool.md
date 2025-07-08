# LumiFAI MCP Technical Analysis Server

A FastMCP server that provides technical analysis tools for cryptocurrency trading data, specifically focusing on Exponential Moving Average (EMA) calculations for Binance pairs. The server defaults to SSE transport layer for communication.

## Features

- Calculate EMAs (12 and 26 periods) for cryptocurrency price data
- Real-time date and time information
- MongoDB integration for data storage and retrieval (Fetches data from DB resource which contains OHLCV data)
- SSE (Server-Sent Events) transport support

## Prerequisites

- Python 3.13 or higher
- MongoDB instance
- [uv](https://github.com/astral-sh/uv) package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lumifai-mcp-ta
```

2. Create and activate a virtual environment and install dependencies:
```bash
uv sync
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following content:
```env
MONGODB_URI=your_mongodb_connection_string
```

## Usage

Run the server:
```bash
uv run mcp-server.py
```

### Available Tools

1. `get_emas(agent_name: str, time_ago: str, interval: int, interval_frequency: str)`
   - Calculates EMAs for specified cryptocurrency trading pairs
   - Returns a DataFrame with fast (12-period) and slow (26-period) EMAs

2. `get_date_time()`
   - Returns the current date and time
