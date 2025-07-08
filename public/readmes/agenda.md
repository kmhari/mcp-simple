# mcp-server-agenda

A server implementation for interacting with the Agenda app on macOS through Claude AI. This server provides tools to create notes, manage projects, and open existing notes in Agenda using x-callback-urls.

## Features

- Create notes in Agenda with various options (title, text, dates, templates, etc.)
- Create and manage projects within Agenda
- Open existing notes directly from Claude
- Full support for Agenda's x-callback-url scheme

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/mcp-server-agenda.git
    cd mcp-server-agenda
    ```

## Usage

## X-Callback-URL Integration

This server utilizes Agenda's x-callback-url scheme to interact with the app. Supported actions include:

- `create-note`
- `open-note`
- `create-project`

For more information about Agenda's x-callback-url scheme, visit their [documentation](https://agenda.community/t/x-callback-url-scheme/20489).

## Configuration

### Claude Desktop Configuration

To enable Claude to interact with the server, add the following configuration to your Claude desktop config file located at `$HOME/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
    "mcp-server-agenda": {
        "command": "uv",
        "args": [
            "--directory",
            "/Users/your.username/git/mcp-server-agenda",
            "run",
            "mcp-server-agenda"
        ]
    }
}
```

Make sure to replace `/Users/your.username` with your actual home directory path.

## Requirements

- macOS
- Python 3.7+
- Agenda app installed
- [uv](https://github.com/astral-sh/uv) - Modern Python package installer and resolver
    ```bash
    pip install uv
    ```
- Required Python packages (see requirements.txt)

### Project Setup

The project requires a `pyproject.toml` file for uv to work properly. Create one in the root directory:

```toml
[project]
name = "mcp-server-agenda"
version = "0.1.0"
description = "A server implementation for interacting with the Agenda app on macOS through Claude AI"
requires-python = ">=3.7"
dependencies = [
    "flask",
    # Add other dependencies here
]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

After setting up the pyproject.toml, you can install the project in development mode using:

```bash
uv pip install -e .
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Agenda team for providing x-callback-url support
- Inspired by the need for AI-driven note management

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.