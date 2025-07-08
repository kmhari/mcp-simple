# Yahoo Finance Model Context Protocol (MCP) for LLaMA 3.2 3B

This repository contains a Model Context Protocol (MCP) implementation that integrates Yahoo Finance API with LLaMA 3.2 3B. The MCP allows the model to retrieve real-time financial data, stock information, and market news while preserving all of LLaMA's regular capabilities.

## Features

- Get real-time stock prices directly within LLaMA 3.2 3B
- Retrieve detailed company information (sector, industry, market cap, etc.)
- Fetch historical stock data with customizable time periods and intervals
- Get latest market news headlines
- Seamlessly enhances LLaMA's capabilities without interfering with non-financial queries

## Requirements

- Python 3.8+
- [Ollama](https://ollama.ai/) - For running LLaMA 3.2 3B locally
- LLaMA 3.2 3B model pulled in Ollama
- Python packages:
  - ollama
  - yfinance
  - requests
  - pandas

## Installation

1. Install Ollama from https://ollama.ai/

2. Pull the LLaMA 3.2 3B model using Ollama:
   ```bash
   ollama pull llama3.2:3b
   ```

3. Clone this repository:
   ```bash
   git clone <repository-url>
   cd mcp_yahoo_finance
   ```

4. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Running the MCP with Ollama Integration

To use the Yahoo Finance MCP with LLaMA 3.2 3B through Ollama:

```bash
python mcp_ollama_integration.py
```

This will start an interactive session where you can:
- Ask financial questions that will be enriched with Yahoo Finance data
- Ask any other questions which will be handled normally by LLaMA 3.2 3B

### Example Queries

#### Financial Queries (Enhanced with Yahoo Finance data)

- "What is the current price of Apple stock?"
- "Tell me about Tesla as a company"
- "How has Microsoft's stock performed over the past month?"
- "What are the latest market news headlines?"
- "What is the 52-week high for Amazon?"
- "What sector does Nvidia operate in?"
- "How has the S&P 500 performed this year?"

#### Non-Financial Queries (Handled normally by LLaMA)

- "What is the capital of France?"
- "Explain quantum computing"
- "Write a poem about autumn"
- "What is the Pythagorean theorem?"

### Using a Different LLaMA Model

You can specify a different model with the `--model` parameter:

```bash
python mcp_ollama_integration.py --model llama3.2:8b
```

## How It Works

1. The MCP analyzes each user query to determine if it's finance-related
2. For financial queries, it:
   - Identifies the relevant financial function to call (price, info, history, news)
   - Calls the Yahoo Finance API through the MCP
   - Formats the real-time data and feeds it to LLaMA 3.2 3B as context
   - LLaMA 3.2 3B provides a natural response incorporating the financial data
3. For non-financial queries, it passes them directly to LLaMA 3.2 3B without modification

This approach seamlessly enhances LLaMA's capabilities with real-time financial data while preserving all of its original functionality.

## Advanced Usage

### Direct API Functions

If you want to use the Yahoo Finance MCP functions directly in your code:

```python
from yahoo_finance_mcp import YahooFinanceMCP

# Initialize the MCP
mcp = YahooFinanceMCP()

# Get stock price
price_data = mcp.execute_function("get_stock_price", {"symbol": "AAPL"})

# Get company information
company_data = mcp.execute_function("get_stock_info", {"symbol": "TSLA"})

# Get historical data
history_data = mcp.execute_function("get_stock_history", {"symbol": "MSFT", "period": "1mo"})

# Get market news
news_data = mcp.execute_function("get_market_news", {"limit": 5})
```

## Troubleshooting

- **"Error connecting to Ollama"**: Make sure Ollama is installed and running
- **Company not found**: Try using the official ticker symbol instead of the company name
- **LLaMA 3.2 3B model not found**: Run `ollama pull llama3.2:3b` to download the model

## Acknowledgements

This project uses the [yfinance](https://github.com/ranaroussi/yfinance) library for retrieving Yahoo Finance data and [Ollama](https://ollama.ai/) for running LLaMA 3.2 3B locally. 