# ClickSend MCP Server

A Model Context Protocol (MCP) server that provides SMS messaging and Text-to-Speech (TTS) call capabilities through ClickSend's API. This server enables AI models to send SMS messages and initiate voice calls programmatically.

<a href="https://glama.ai/mcp/servers/6nj3h62i6b"><img width="380" height="200" src="https://glama.ai/mcp/servers/6nj3h62i6b/badge" alt="ClickSend Server MCP server" /></a>

## Features

- **SMS Messaging**: Send SMS messages to any phone number worldwide
- **Text-to-Speech Calls**: Make voice calls with customizable text-to-speech messages
- **Rate Limiting**: Built-in protection with 5 actions per minute limit
- **Input Validation**: Comprehensive validation for phone numbers and message content
- **Error Handling**: Detailed error messages and proper error propagation

## Installation

### Prerequisites

- Node.js (v16 or higher)
- ClickSend account with API credentials
- MCP-compatible Client

### Setup

1. Clone the repository:
```bash
git clone https://github.com/J-Gal02/clicksend-mcp.git
cd clicksend-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

### Setting up the MCP Client

Add the following sections into your `cline_mcp_settings.json` file or `claude_desktop_config.json` file.

Be sure to replace the directory with the correct path to the build folder, as shown in the example below, as well as the username and API key with your own.

```json
{
    "mcpServers": {
        "clicksend": {
            "command": "node",
            "args": ["/directory/to/build/folder/clicksend-mcp/build/index.js"],
            "env": {
                "CLICKSEND_USERNAME": "example@droove.net",
                "CLICKSEND_API_KEY": "ZZZZZZZZ-YYYY-YYYY-YYYY-XXXXXXXXXXXX"
            }
        }
    }
}
```

## Usage

### Available Tools

#### 1. send_sms
Send SMS messages to specified phone numbers.

Parameters:
- `to`: Phone number in E.164 format (e.g., +61423456789)
- `message`: Text content to send

Example:
```json
{
  "name": "send_sms",
  "arguments": {
    "to": "+61423456789",
    "message": "Hello from ClickSend MCP!"
  }
}
```

#### 2. make_tts_call
Initiate Text-to-Speech calls.

Parameters:
- `to`: Phone number in E.164 format
- `message`: Text content to convert to speech
- `voice`: Voice type ('female' or 'male', defaults to 'female')

Example:
```json
{
  "name": "make_tts_call",
  "arguments": {
    "to": "+61423456789",
    "message": "This is a Text-to-Speech call from ClickSend MCP",
    "voice": "female"
  }
}
```

### Rate Limiting

The server implements a rate limit of 5 actions per minute to prevent abuse. Requests exceeding this limit will receive an error response with a retry delay suggestion.

## Development

### Available Scripts

- `npm run build`: Compile TypeScript and make the output executable
- `npm run start`: Start the MCP server
- `npm run dev`: Run TypeScript compiler in watch mode

### Project Structure

```
clicksend-mcp/
├── src/
│   ├── index.ts        # Main server implementation
│   ├── client.ts       # ClickSend API client
│   └── utils/
│       └── validation.ts # Input validation utilities
├── build/              # Compiled JavaScript output
└── package.json        # Project configuration
```

## Error Handling

The server provides detailed error messages for various scenarios:

- Invalid phone numbers
- Message content validation failures
- Rate limit exceeded
- API authentication errors
- Network connectivity issues

Error responses include appropriate error codes and descriptive messages to help diagnose issues.

## TODO
- [ ] Multiple Recepients
- [ ] Configure Sender IDs
- [x] SMS
- [x] TTS
- [ ] Email
- [ ] Media Uploading
    - [ ] Email Attachments
    - [ ] MMS
    - [ ] Letters
    - [ ] Postcards
    - [ ] Fax
- [ ] Cost Calculation and Confirmation
- [ ] Statistics
- [ ] History
- [ ] Contacts

- [ ] Automations

## License

[MIT](./LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
