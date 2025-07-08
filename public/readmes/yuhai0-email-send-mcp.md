# Email Send MCP

A Model Context Protocol server that provides email functionality. This server enables LLMs to compose and send emails, as well as search for attachments within specified directories.

## Features

- Send emails with multiple recipients
- Support for email attachments
- Search for files in directories based on pattern matching
- Secure email transmission using SMTP

### Available Tools

- `send_email` - Sends emails based on the provided subject, body, and receiver.
  - `receiver` (array of strings, required): List of recipient email addresses
  - `body` (string, required): The main content of the email
  - `subject` (string, required): The subject line of the email
  - `attachments` (array of strings or string, optional): Email attachments (filenames)

- `search_attachments` - Searches for files in a specified directory that match a given pattern.
  - `pattern` (string, required): The text pattern to search for in file names

### Prompts

- **send_email**
  - Send an email with optional attachments
  - Arguments:
    - `receiver` (required): The list of recipient email addresses
    - `body` (required): The main content of the email
    - `subject` (required): The subject line of the email
    - `attachments` (optional): Email attachments

- **search_attachments**
  - Search for files matching a pattern
  - Arguments:
    - `pattern` (required): The text pattern to search for in file names

## Usage

### Configure for Cursor/Claude

Add to your cursor/claude settings:

#### Conda
```json
{
  "mcpServers": {
    "email_send_mcp": {
      "command": "uvx",
      "args": [
        "email-send-mcp"
        "--dir",
        "C:\\Users\\YourUserName\\Desktop"
      ],
      "env": {
        "SENDER": "namexxx@gmail.com",
        "PASSWORD": "tuogk......."
      }
    }
  }
}
```

## Security Notes

- For Gmail and other services, you may need to use an app-specific password
- The server supports a limited set of attachment file types for security reasons

## Supported File Types

The server supports the following attachment file types:

- Documents: doc, docx, xls, xlsx, ppt, pptx, pdf
- Archives: zip, rar, 7z, tar, gz
- Text files: txt, log, csv, json, xml
- Images: jpg, jpeg, png, gif, bmp
- Other: md

## Example Usage

### Sending an Email

```json
{
  "receiver": ["recipient@example.com"],
  "subject": "Test Email from MCP Server",
  "body": "This is a test email sent via the MCP Email Server.",
  "attachments": ["document.pdf", "image.jpg"]
}
```

### Searching for Attachments

```json
{
  "pattern": "report"
}
```

## Contributing

We encourage contributions to help expand and improve the MCP Email Server. Whether you want to add new tools, enhance existing functionality, or improve documentation, your input is valuable.

For examples of other MCP servers and implementation patterns, see:
https://github.com/modelcontextprotocol/servers

Pull requests are welcome! Feel free to contribute new ideas, bug fixes, or enhancements to make the MCP Email Server even more powerful and useful.

## License

MCP Email Server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License.
