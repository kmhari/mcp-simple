# Binary Reader MCP

A Model Context Protocol server for reading and analyzing binary files. This server provides tools for reading and analyzing various binary file formats, with initial support for Unreal Engine asset files (.uasset).

## Features

- Read and analyze Unreal Engine .uasset files
- Extract binary file metadata and structure
- Auto-detect file formats
- Extensible architecture for adding new binary format support

## Installation

1. Clone the repository:
```bash
git clone https://github.com/berlinbra/binary-reader-mcp.git
cd binary-reader-mcp
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

The server provides several tools through the Model Context Protocol:

### 1. Read Unreal Asset Files

```python
# Example usage through MCP
tool: read-unreal-asset
arguments:
    file_path: "path/to/your/asset.uasset"
```

### 2. Read Generic Binary Files

```python
# Example usage through MCP
tool: read-binary-metadata
arguments:
    file_path: "path/to/your/file.bin"
    format: "auto"  # or "unreal", "custom"
```

## Development

### Project Structure

```
binary-reader-mcp/
├── README.md
├── requirements.txt
├── main.py
├── src/
│   ├── __init__.py
│   ├── binary_reader/
│   │   ├── __init__.py
│   │   ├── base_reader.py
│   │   ├── unreal_reader.py
│   │   └── utils.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── schemas.py
│   └── config.py
└── tests/
    ├── __init__.py
    ├── test_binary_reader.py
    └── test_api.py
```

### Adding New Binary Format Support

To add support for a new binary format:

1. Create a new reader class that inherits from `BinaryReader`
2. Implement the required methods (`read_header`, `read_metadata`)
3. Add the new format to the format auto-detection logic
4. Update the tools list to include the new format

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.