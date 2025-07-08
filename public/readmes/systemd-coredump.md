# systemd-coredump MCP Server

A Model Context Protocol (MCP) server for interacting with systemd-coredump functionality. This enables MCP-capable applications to access, manage, and analyze system core dumps.

[![npm version](https://img.shields.io/npm/v/@taskjp/server-systemd-coredump.svg?v=0.1.1)](https://www.npmjs.com/package/@taskjp/server-systemd-coredump)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- List all available coredumps in the system
- Get detailed information about specific coredumps
- Extract coredump files to a specified location
- Remove coredumps from the system

## Prerequisites

- Node.js 18+ and npm
- systemd-coredump must be installed and configured on the system
- `coredumpctl` command-line utility must be available

## Installation

### From npm (recommended)

#### Global Installation

```bash
npm install -g @taskjp/server-systemd-coredump
```

#### Local Installation

```bash
npm install @taskjp/server-systemd-coredump
```

### From Source

1. Clone the repository or download the source code
2. Install dependencies:

```bash
cd systemd-coredump-server
npm install
```

3. Build the server:

```bash
npm run build
```

## Configuration

Add the server to your MCP settings configuration file:

### If installed from npm globally:

```json
"systemd-coredump": {
  "command": "systemd-coredump-server",
  "args": [],
  "disabled": false,
  "autoApprove": []
}
```

### If installed from npm locally:

```json
"systemd-coredump": {
  "command": "node",
  "args": ["node_modules/@taskjp/server-systemd-coredump/build/index.js"],
  "disabled": false,
  "autoApprove": []
}
```

### If installed from source:

```json
"systemd-coredump": {
  "command": "node",
  "args": ["/path/to/systemd-coredump-server/build/index.js"],
  "disabled": false,
  "autoApprove": []
}
```

## Usage

### Available Tools

The server provides the following tools:

1. **list_coredumps**: List all available coredumps in the system

   ```json
   {
     "name": "list_coredumps"
   }
   ```

2. **get_coredump_info**: Get detailed information about a specific coredump

   ```json
   {
     "name": "get_coredump_info",
     "arguments": {
       "id": "2023-04-20 12:34:56-12345"
     }
   }
   ```

3. **extract_coredump**: Extract a coredump to a file

   ```json
   {
     "name": "extract_coredump",
     "arguments": {
       "id": "2023-04-20 12:34:56-12345",
       "outputPath": "/path/to/output/core.dump"
     }
   }
   ```

4. **remove_coredump**: Remove a coredump from the system

   ```json
   {
     "name": "remove_coredump",
     "arguments": {
       "id": "2023-04-20 12:34:56-12345"
     }
   }
   ```

5. **get_coredump_config**: Get the current core dump configuration of the system

   ```json
   {
     "name": "get_coredump_config"
   }
   ```

   This tool returns information about the current core dump configuration, including:
   - Whether core dumps are enabled
   - The current core pattern
   - The core size limit
   - Whether systemd is handling the core dumps

6. **set_coredump_enabled**: Enable or disable core dump generation

   ```json
   {
     "name": "set_coredump_enabled",
     "arguments": {
       "enabled": true
     }
   }
   ```

   Setting `enabled` to `true` will enable core dumps, while `false` will disable them.
   Note: This changes the ulimit settings for the current shell. For permanent system-wide
   changes, root privileges and modification of system configuration files would be required.

7. **get_stacktrace**: Get stack trace from a coredump using GDB

   ```json
   {
     "name": "get_stacktrace",
     "arguments": {
       "id": "2023-04-20 12:34:56-12345"
     }
   }
   ```

   This tool uses GDB to extract a formatted stack trace from the coredump.
   Note: Requires the GDB debugger to be installed on the system.

### Available Resources

The server exposes two types of resources:

1. **Coredump Information**
   - URI format: `coredump:///<id>`
   - Returns JSON with detailed coredump information

2. **Stack Traces**
   - URI format: `stacktrace:///<id>`
   - Returns a formatted stack trace from the coredump

Where `<id>` is the unique identifier for a coredump in the format: `<timestamp>-<pid>`.

For example:

```
coredump:///2023-04-20 12:34:56-12345
stacktrace:///2023-04-20 12:34:56-12345
```

## Note on Permissions

Some operations may require elevated privileges, especially when extracting or removing coredumps. Ensure the user running the MCP server has appropriate permissions to access system coredumps.

## License

MIT
