# Modbus MCP Server

An MCP server that standardizes and contextualizes Modbus data, enabling seamless integration of AI agents with industrial IoT systems.

![GitHub License](https://img.shields.io/github/license/kukapay/crypto-trending-mcp)
![Python Version](https://img.shields.io/badge/python-3.10+-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

## Features

- **Modbus Tools**:
  - Read/write holding registers (`read_register`, `write_register`).
  - Read/write coils (`read_coils`, `write_coil`).
  - Read input registers (`read_input_registers`).
  - Read multiple holding registers (`read_multiple_holding_registers`).
- **Prompt**: Analyze Modbus register values with a customizable prompt (`analyze_register`).
- **Flexible Connections**: Supports Modbus over TCP, UDP, or serial, configured via environment variables.

## Requirements

- **Python**: 3.10
- **uv** for dependency and virtual environment management.

## Installation

1. **Install `uv`**:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/kukapay/modbus-mcp.git
   cd modbus-mcp
   ```

3. **Install Dependencies**:
   ```bash
   uv sync
   ```

## Configuration

The server connects to a Modbus device using parameters specified via environment variables. Set these variables in a `.env` file or your shell environment.

### Environment Variables

| Variable                   | Description                                      | Default              | Required |
|-------------------------   |--------------------------------------------------|----------------------|----------|
| `MODBUS_TYPE`              | Connection type: `tcp`, `udp`, or `serial`       | `tcp`                | Yes      |
| `MODBUS_HOST`              | Host address for TCP/UDP                        | `127.0.0.1`          | For TCP/UDP |
| `MODBUS_PORT`              | Port for TCP/UDP                                | `502`                | For TCP/UDP |
| `MODBUS_DEFAULT_SLAVE_ID`  | Slave ID                                        | `1`                  | For TCP/UDP |
| `MODBUS_SERIAL_PORT`       | Serial port (e.g., `/dev/ttyUSB0`, `COM1`)      | `/dev/ttyUSB0`       | For serial |
| `MODBUS_BAUDRATE`          | Serial baud rate                                | `9600`               | For serial |
| `MODBUS_PARITY`            | Serial parity: `N` (none), `E` (even), `O` (odd) | `N`                 | For serial |
| `MODBUS_STOPBITS`          | Serial stop bits                                | `1`                  | For serial |
| `MODBUS_BYTESIZE`          | Serial byte size                                | `8`                  | For serial |
| `MODBUS_TIMEOUT`           | Serial timeout (seconds)                        | `1`                  | For serial |

### Example `.env` File

For TCP:
```
MODBUS_TYPE=tcp
MODBUS_HOST=192.168.1.100
MODBUS_PORT=502
MODBUS_SLAVE_ID=1
```

For Serial:
```
MODBUS_TYPE=serial
MODBUS_SERIAL_PORT=/dev/ttyUSB0
MODBUS_BAUDRATE=9600
MODBUS_PARITY=N
MODBUS_STOPBITS=1
MODBUS_BYTESIZE=8
MODBUS_TIMEOUT=1
```

## Usage

### Installing for Claude Desktop

The configuration file:

```json
{
   "mcpServers": {
       "Modbus MCP Server": {
           "command": "uv",
           "args": [ "--directory", "/path/to/modbus-mcp", "run", "modbus-mcp" ],
           "env": { "MODBUS_TYPE": "tcp", "MODBUS_HOST": "127.0.0.1", "MODBUS_PORT": 502 },
       }
   }
}
```

### Using Tools

**Note**: Natural language support depends on the client’s ability to parse and map prompts to tools. The MCP Inspector requires structured JSON, but the examples below show how conversational inputs translate.

1. **Read a Holding Register**:
   - **Prompt**:
     ```
     Please read the value of Modbus holding register 0.
     ```
   - **MCP Inspector JSON**:
     ```json
     {
       "tool": "read_register",
       "parameters": {"address": 0, "slave_id": 1}
     }
     ```
   - **Expected Output**: `Value: <register_value>`

2. **Write to a Holding Register**:
   - **Prompt**:
     ```
     Set Modbus holding register 10 to the value 100.
     ```
   - **MCP Inspector JSON**:
     ```json
     {
       "tool": "write_register",
       "parameters": {"address": 10, "value": 100, "slave_id": 1}
     }
     ```
   - **Expected Output**: `Successfully wrote 100 to register 10`

3. **Read Coils**:
   - **Prompt**:
     ```
     Check the status of the first 5 Modbus coils starting at address 0.
     ```
   - **MCP Inspector JSON**:
     ```json
     {
       "tool": "read_coils",
       "parameters": {"address": 0, "count": 5, "slave_id": 1}
     }
     ```
   - **Expected Output**: `Coils 0 to 4: [False, False, False, False, False]`

4. **Write to a Coil**:
   - **Prompt**:
     ```
     Turn on Modbus coil 5.
     ```
   - **MCP Inspector JSON**:
     ```json
     {
       "tool": "write_coil",
       "parameters": {"address": 5, "value": true, "slave_id": 1}
     }
     ```
   - **Expected Output**: `Successfully wrote True to coil 5`

5. **Read Input Registers**:
   - **Prompt**:
     ```
     Read the values of 3 Modbus input registers starting from address 2.
     ```
   - **MCP Inspector JSON**:
     ```json
     {
       "tool": "read_input_registers",
       "parameters": {"address": 2, "count": 3, "slave_id": 1}
     }
     ```
   - **Expected Output**: `Input Registers 2 to 4: [<value1>, <value2>, <value3>]`

6. **Read Multiple Holding Registers**:
   - **Prompt**:
     ```
     Get the values of Modbus holding registers 0 through 2.
     ```
   - **MCP Inspector JSON**:
     ```json
     {
       "tool": "read_multiple_holding_registers",
       "parameters": {"address": 0, "count": 3, "slave_id": 1}
     }
     ```
   - **Expected Output**: `Holding Registers 0 to 2: [<value1>, <value2>, <value3>]`


## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
