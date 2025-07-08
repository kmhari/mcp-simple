# arxiv_mcp

## Description
`arxiv_mcp` is an MCP (Metadata and Content Processing) service designed for searching and interpreting academic papers, particularly from arXiv.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/arxiv_mcp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd arxiv_mcp
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage
To test run the service, use the following command:
```bash
mcp dev server.py
```

### Configuration
Ensure the `cline_mcp_settings.json` file is properly configured. Example:
```json
{
  "mcpServers": {
    "arxiv-server": {
      "disabled": false,
      "timeout": 60,
      "command": "/path/to/mcp",
      "args": [
        "run",
        "/path/to/server.py"
      ],
      "env": {
        "PATH": "/path/to/env/bin:${env:PATH}"
      },
      "transportType": "stdio"
    }
  }
}
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
[Specify the license, e.g., "This project is licensed under the MIT License. See the LICENSE file for details."]