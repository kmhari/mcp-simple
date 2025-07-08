# MCP Server

Python service implementing Model Context Protocol (MCP) for Python code execution via standardized API endpoints.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

1. Start the server:
```bash
python src/server.py
```

2. Send requests to the `/run_python` endpoint:
```bash
curl -X POST http://localhost:8000/run_python \
    -H "Content-Type: application/json" \
    -d '{"code": "print(\'Hello, World!\')"'
```

## Development

- Follow the modular structure
- Run tests before submitting changes
- Update documentation as needed

## License

MIT
