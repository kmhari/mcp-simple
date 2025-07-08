# MCP Grpcurl

This project is an Model Context Protocol (MCP) server designed to interact with gRPC services using the `grpcurl` tool. It leverages the `grpcurl` command-line utility to perform various operations on gRPC services, such as invoking methods, listing services, and describing service details.

## Features

- **Invoke gRPC Methods**: Use reflection to invoke gRPC methods with custom headers and JSON payloads.
- **List gRPC Services**: Retrieve a list of all available gRPC services on the target server.
- **Describe gRPC Services**: Get detailed descriptions of gRPC services or message types.

## Requirements

- Go 1.23.0 or later
- `grpcurl` tool installed on your system

## Setup
1. install grpcurl: https://github.com/fullstorydev/grpcurl

2. Install the package:
   ```bash
   go install github.com/wricardo/mcp-grpcurl@latest
   ```

3. Configure Cline by adding the following to your MCP settings:
   ```json
   "mcp-grpcurl": {
     "command": "mcp-grpcurl",
     "env": {
       "ADDRESS": "localhost:8005"
     },
     "disabled": false,
     "autoApprove": []
   }
   ```

## Usage

Run the MCP server:
```bash
mcp-grpc-client
```

### Tools

- **invoke**: Invoke a gRPC method using reflection.
  - Parameters:
    - `method`: Fully-qualified method name (e.g., `package.Service/Method`).
    - `request`: JSON payload for the request.
    - `headers`: (Optional) JSON object for custom gRPC headers.

- **list**: List all available gRPC services on the target server.

- **describe**: Describe a gRPC service or message type.
  - Use dot notation for symbols (e.g., `mypackage.MyService`).
