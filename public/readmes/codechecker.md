# CodeChecker MCP

A code review tool for Cursor IDE that uses OpenAI's GPT models to provide intelligent code analysis and suggestions.

## Features

- Real-time code review using OpenAI's GPT models
- Integration with Cursor IDE through MCP protocol
- Support for both SSE and stdio transport modes
- Detailed code analysis with specific improvement suggestions

## Prerequisites

- Python 3.10 or higher
- OpenAI API key
- Cursor IDE

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jacklandis29/codechecker-mcp.git
cd codechecker-mcp
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -e .
```

4. Create a `.env` file in the project root and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_api_key_here
```

## Usage

1. Start the server:
```bash
python main.py --transport sse --port 8000
```

2. Configure Cursor IDE:
   - Open Cursor settings
   - Add the following configuration:
```json
{
  "mcp": {
    "endpoint": "http://127.0.0.1:8000/sse",
    "enabled": true
  }
}
```

3. Use the code review tool in Cursor IDE by selecting code and providing context for review.

## Configuration

- `--transport`: Choose between "sse" (for Cursor IDE integration) or "stdio" (for command-line usage)
- `--port`: Specify the port number for the SSE server (default: 8000)

## License

MIT License 