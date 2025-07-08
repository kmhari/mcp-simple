# WhatsApp Message Sender MCP Tool

This is a MCP (Model Context Protocol) that sends WhatsApp messages using the Meta (Facebook) WhatsApp Business API.

## Requirements

- Python 3.12 or higher
- uv (Python package manager)
- Meta WhatsApp Business API credentials

## Installation

1. Clone the repository:
```bash
git clone https://github.com/deuslirio/mcp-server-whatsapp-message.git
cd mcp-server-whatsapp-message
```

2. Install dependencies using uv:
```bash
uv pip install -e .
```

## Running the Server

### Standalone Mode
Start the server with:
```bash
uv run python main.py
```

The server will be running and ready to receive requests.

### Integration with Claude Local
To add this tool to your Claude Local configuration, add the following to your Claude's configuration:

```json
{
    "mcpServers": {
        "whatsapp": {
            "command": "uv",
            "args": [
                "run",
                "\\\\wsl.localhost\\Ubuntu-24.04\\home\\deuslirio\\PycharmProjects\\mcp-server-whatsapp-message\\main.py"
            ],
            "env": {
                "META_ACCESS_TOKEN": "your-token-here",
                "META_PHONE_NUMBER_ID": "your-phone-id-here"
            }
        }
    }
}
```

**Note**: Replace the environment variable values with your actual Meta API credentials.

## Available Tools

### send_whatsapp_message
Sends a WhatsApp message to a specified phone number.

**Parameters**:
- `phone_number`: The recipient's phone number (string, international format, e.g., +5562995631588)
- `message`: The message to send (string)

**Usage Example**:
```json
{
    "phone_number": "+5562000000000",
    "message": "Hello! This is a test message!"
}
```

## Available Resources

### contacts
Returns a list of contacts with their names and phone numbers.

**URI**: `resource://contacts`

**Example Response**:
```json
[
    {"name": "João da Silva", "phone_number": "+55629999999999"}
]
```

## Demo

Here are some screenshots demonstrating the WhatsApp Message Sender MCP Tool in action:

### Sending a Message
![Sending a WhatsApp message](https://github.com/user-attachments/assets/58fc3c58-b584-4d7f-9646-c4eb23c2af81)

### Receiving a Message
![Receiving a WhatsApp message](https://github.com/user-attachments/assets/c9e6a5d3-e488-4900-a222-6fff1e403f28)

### Using the Contacts Resource
![Accessing the contacts resource](https://github.com/user-attachments/assets/dd13c180-d286-4284-bb9c-f086b321f1b4)

### Received Message
![Received Message](https://github.com/user-attachments/assets/d5862915-1787-4c95-81c1-8eca7388bdc3)

## Troubleshooting

### Common Issues

1. **FastMCP Import Error**:
   - Verify that the `mcp` package is installed correctly:
     ```bash
     uv pip install mcp==1.6.0
     ```

2. **Environment Variables Error**:
   - Make sure the environment variables are correctly set in your Claude Local configuration
   - Verify that the variable values are correct

3. **Error when running with uv run**:
   - Try clearing the uv cache:
     ```bash
     uv cache clean
     ```
   - Reinstall dependencies:
     ```bash
     uv pip install -e .
     ```

## Project Structure

```
mcp-server-whatsapp-message/
├── main.py                  # Server entry point
├── mcp_server/              # Main module
│   ├── __init__.py          # Module initialization
│   └── whatsapp_handler.py  # WhatsApp message handler
├── pyproject.toml           # Project configuration
├── requirements.txt         # Project dependencies
└── .env                     # Environment variables (not versioned)
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
