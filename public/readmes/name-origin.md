# Name Origin Predictor

A Python-based MCP (Model Context Protocol) server that predicts the origin of names using the Nationalize.io API.

## Features

- Predict the origin of a single name
- Batch prediction for multiple names
- Real-time API integration with Nationalize.io
- MCP protocol support for seamless integration

## Prerequisites

- Python 3.x
- Virtual environment (recommended)
- Required packages:
  - httpx
  - mcp-server

## Installation

1. Clone the repository:
```bash
git clone https://github.com/allglenn/mcp-name-origin-server.git
cd mcp-name-origin-server
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Unix/macOS
# or
.\venv\Scripts\activate  # On Windows
```

3. Install dependencies:
```bash
pip install httpx
```

## Configuration

1. Create a `claude_desktop_config.json` file:
```json
{
    "mcpServers": {
        "origin": {
            "command": "source",
            "args": [
                "venv/bin/activate",
                "&&",
                "python3",
                "-u",
                "mcp-server.py"
            ],
            "shell": true,
            "env": {
                "PYTHONPATH": ".",
                "PYTHONUNBUFFERED": "1"
            }
        }
    },
    "defaultServer": "origin",
    "version": "0.1.0"
}
```

## Usage

### Starting the Server

```bash
python mcp-server.py
```

### Available Methods

1. `predict_origin(name: str)`: Predicts the origin of a single name
   - Input: A string containing the name
   - Output: JSON object with country predictions and probabilities

2. `batch_predict(names: list[str])`: Predicts origins for multiple names
   - Input: A list of names
   - Output: JSON object with predictions for each name

### Example Response

```json
{
    "name": "glenn",
    "country": [
        {
            "country_id": "US",
            "probability": 0.421
        },
        {
            "country_id": "AU",
            "probability": 0.044
        }
    ]
}
```

## API Reference

This project uses the [Nationalize.io API](https://nationalize.io/) to predict name origins. The API is free for basic usage with rate limits.

## Error Handling

The server handles various error cases:
- Invalid name format
- API connection issues
- Rate limiting
- Server errors

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Nationalize.io](https://nationalize.io/) for providing the name origin prediction API
- MCP protocol for the server implementation framework