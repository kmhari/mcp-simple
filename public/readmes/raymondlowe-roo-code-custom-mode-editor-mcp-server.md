# roo-code-custom-mode-editor-mcp-server

An MCP server that knows how to edit the Roo Code custom modes file

Avoids having to overwrite the `.roomodes` file using file writes or edit the json with unreliable diffs.

The MCP server exposes tools to:

* List all custom modes
* Create a new custom mode
* Get the fields of a custom mode ( "slug","name",  "roleDefinition", "customInstructions", "groups")
* Put and overwrite any one or more fields of a custom mode.

Fields are:

- slug : short string
- name : short string
- roleDefinition : long string
- customInstructions : long string
- groups : array of short strings

## Usage

This server is located at https://github.com/raymondlowe/roo-code-custom-mode-editor-mcp-server and can be run using the following command:

```bash
npx https://github.com/raymondlowe/roo-code-custom-mode-editor-mcp-server
```

## MCP Configuration

To use with Roo Code, add the server config to the MCP settings file:

```json
{
  "mcpServers": {
    "roo-code-custom-mode-editor": {
      "command": "node",
      "args": [
        "/path/to/roo-code-custom-mode-editor-mcp-server/build/index.js"
      ],
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.

## Tools

### list_custom_modes
Lists all custom modes in the `.roomodes` file.

### create_custom_mode
Creates a new custom mode with the specified fields.

Parameters:
- slug: string
- name: string
- roleDefinition: string
- customInstructions: string
- groups: string[]

### get_custom_mode_fields
Gets the fields of a custom mode.

Parameters:
- slug: string

### put_custom_mode_fields
Updates one or more fields of a custom mode.

Parameters:
- slug: string
- fields: object containing any of the following fields:
  - name: string
  - roleDefinition: string
  - customInstructions: string
  - groups: string[]
