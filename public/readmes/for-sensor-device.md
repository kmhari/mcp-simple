# MCP Server for sensor device

This project is a Node.js application designed for use with Claude Desktop. It simulates a CO2 sensor device and provides a JSON-RPC server to interact with the device. The application can run in both simulation mode and real mode, where it connects to a Raspberry Pi Pico via USB to read CO2 levels.

## Features

- Simulates a CO2 sensor device with random CO2 levels in simulation mode.
- Connects to a Raspberry Pi Pico via USB to read real CO2 levels.
- Provides device information, sensor data, and network status via JSON-RPC.
- Supports commands to publish data to MQTT, reconnect WiFi, and reconnect MQTT (some functionalities are mocked).

## Installation

You need to have Node.js installed on your machine to run this application. If you don't have Node.js installed, you can download it from the [official website](https://nodejs.org/).
1. Clone the repository.
2. Install the dependencies using npm:

   ```sh
   npm install
   ```

## Configuration

Ensure that the `claude_desktop_config.json` file is correctly configured to run the server. Example configuration:

```json
{
  "mcpServers": {
    "CO2 sensor": {
      "command": "node",
      "args": [
        "...mcp-server-for-sensor-device/index.js"
      ],
      "env": {}
    }
  }
}
```

## Usage

To start the server, run the following command:

```sh
node index.js
```

## JSON-RPC Methods

### `initialize`

Initializes the server and returns server capabilities.

### `shutdown`

Shuts down the server.

### `resources/list`

Lists available resources.

### `resources/read`

Reads the specified resource.

### `tools/list`

Lists available tools.

### `tools/call`

Calls the specified tool.

## DeviceState Class

The `DeviceState` class simulates the device state and provides methods to get device information, sensor data, and network status. It also handles the connection to the Raspberry Pi Pico and reads CO2 levels.

### Methods

- `getDeviceInfo()`: Returns device information.
- `getSensorData()`: Returns sensor data.
- `getNetworkStatus()`: Returns network status (mocked functionality).
- `publishToMQTT()`: Simulates publishing data to MQTT (mocked functionality).
- `reconnectWiFi()`: Simulates reconnecting to WiFi (mocked functionality).
- `reconnectMQTT()`: Simulates reconnecting to MQTT (mocked functionality).

## Logging

The application logs CO2 levels and other information to a log file located in the user's home directory (`co2_level.log`).

## License

This project is licensed under the MIT License.
