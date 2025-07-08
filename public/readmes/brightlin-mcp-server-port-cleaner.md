# MCP Port Cleaner Server

Node.js server implementing Model Context Protocol (MCP) for port cleanup operations in development environments.

## Features

- Finds and terminates processes occupying specified ports
- Scans and lists all processes occupying specified ports (cross-platform support)
- Safe input parameter validation using Zod schema
- Detailed error handling and response formatting
- Standard MCP protocol compliance for tool registration and request processing

## Tools

### port_scan

**Description**: Scans and lists all processes occupying a specified port (cross-platform support).

**Input Parameters**:

```json
{
  "port": {
    "type": "integer",
    "description": "scan process by specify port",
    "minimum": 1,
    "maximum": 65535
  }
}
```

**Response**:
- Success: Returns list of processes with details (PID, name, user, protocol)
- Failure: Returns error information
- Port not occupied: Returns appropriate notification

### port_clean

**Description**: Finds and terminates processes occupying a specified port to resolve development environment port conflicts.

**Input Parameters**:

```json
{
  "port": {
    "type": "integer",
    "description": "clean process by specify port",
    "minimum": 1,
    "maximum": 65535
  }
}
```

**Response**:
- Success: Returns list of terminated process IDs
- Failure: Returns error information
- Port not occupied: Returns appropriate notification

## Usage Examples

### With Claude Desktop or Trae.cn

#### Docker Configuration

TODO

#### NPX Configuration

```json
{
  "mcpServers": {
    "port-cleaner": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-server-port-cleaner"
      ]
    }
  }
}
```

or install globally:

```bash
npm install -g mcp-server-port-cleaner
```

and then:

```json
{
  "mcpServers": {
    "port-cleaner": {
      "command": "mcp-server-port-cleaner"
    }
  }
}
```

## Implementation Details

The server implements the following components:

1. **PortCleanerService**: Core business logic for port cleanup operations
2. **PortScannerService**: Cross-platform port scanning functionality
3. **MCP Server Integration**: Standard MCP protocol implementation with:
   - Tool registration (`port_clean`, `port_scan`)
   - Request handling
   - Input validation
4. **Error Handling**: Comprehensive error handling at both service and server levels

## Error Handling

The server provides detailed error responses in all failure scenarios:
- Invalid input parameters
- Process termination failures
- Unexpected runtime errors

## Development Notes

- The service uses platform-specific commands:
  - Linux/Unix: `lsof`, `kill`, `netstat`
  - Windows: `netstat`, `tasklist`, `taskkill`
- Cross-platform compatibility implemented with process detection
- The cleanup implementation terminates processes with SIGKILL (-9)

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
