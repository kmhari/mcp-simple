# Pulsar MCP Server

A Model Context Protocol (MCP) server for Apache Pulsar that provides tools to interact with Pulsar clusters through MCP-compatible clients.

## Features

- **Publish Messages**: Send messages to Pulsar topics with optional properties
- **Consume Messages**: Receive messages from topics with configurable subscription settings
- **Topic Management**: Create, delete, and list topics
- **Topic Statistics**: Get detailed statistics and metadata about topics
- **Connector Management**: List, get status, and configuration of Pulsar IO connectors
- **Flexible Configuration**: Environment-based configuration with sensible defaults

## Installation

### From Source

1. Clone the repository:
```bash
git clone <repository-url>
cd pulsar-mcp-server
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Install the package in development mode:
```bash
pip install -e .
```

### Using pip (when published)

```bash
pip install pulsar-mcp-server
```

## Usage

### Command Line

After installation, you can run the server using:

```bash
pulsar-mcp-server
```

The server will start and listen for MCP requests via stdio.

### Programmatic Usage

```python
from pulsar_mcp_server import main

# Run the server
main()
```

### Cursor MCP Server Usage

In your `~/.cursor/mcp.json` file, add the following:

```json
  "pulsar": {
    "command": "pulsar-mcp-server",
    "env": {
        "PULSAR_SERVICE_URL": "pulsar://localhost:6650",
        "PULSAR_WEB_SERVICE_URL": "http://localhost:8080"
    }
}
```




## Configuration

The server can be configured using environment variables or a `.env` file:

```bash
# Pulsar connection settings
PULSAR_SERVICE_URL=pulsar://localhost:6650
PULSAR_WEB_SERVICE_URL=http://localhost:8080

# Topic and subscription settings
TOPIC_NAME=my-topic
SUBSCRIPTION_NAME=pulsar-mcp-subscription
SUBSCRIPTION_TYPE=Shared
IS_TOPIC_READ_FROM_BEGINNING=false

# Authentication (optional)
PULSAR_TOKEN=your-jwt-token
PULSAR_TLS_TRUST_CERTS_FILE_PATH=/path/to/certs
PULSAR_TLS_ALLOW_INSECURE_CONNECTION=false
```

## Available Tools

### pulsar_publish
Publish a message to a Pulsar topic.

**Parameters:**
- `topic` (string, required): The Pulsar topic to publish to
- `message` (string, required): The message content to publish
- `properties` (object, optional): Message properties as key-value pairs

### pulsar_consume
Consume messages from a Pulsar topic.

**Parameters:**
- `topic` (string, required): The Pulsar topic to consume from
- `subscription_name` (string, required): The subscription name
- `max_messages` (integer, optional): Maximum number of messages to consume (default: 10)

### pulsar_create_topic
Create a new Pulsar topic.

**Parameters:**
- `topic` (string, required): Name of the topic to create
- `partitions` (integer, optional): Number of partitions (default: 1)

### pulsar_delete_topic
Delete an existing Pulsar topic.

**Parameters:**
- `topic` (string, required): Name of the topic to delete

### pulsar_list_topics
List all topics in the Pulsar cluster.

**Parameters:** None

### pulsar_topic_stats
Get statistics and metadata about a topic.

**Parameters:**
- `topic` (string, required): Name of the topic to get stats for

### pulsar_list_connectors
List all connectors of a specified type (source or sink).

**Parameters:**
- `connector_type` (string, optional): Type of connectors to list ("source" or "sink", default: "source")

### pulsar_connector_status
Get the status of a specific connector.

**Parameters:**
- `connector_name` (string, required): Name of the connector to get status for

### pulsar_connector_config
Get the configuration of a specific connector.

**Parameters:**
- `connector_name` (string, required): Name of the connector to get configuration for

### pulsar_all_connectors
Get all connectors organized by type (source and sink).

**Parameters:** None

## Development

### Project Structure

```
pulsar-mcp-server/
├── src/
│   └── pulsar_mcp_server/
│       ├── __init__.py          # Package entry point
│       ├── server.py            # MCP server implementation
│       ├── pulsar_connector.py  # Pulsar client wrapper
│       └── settings.py          # Configuration settings
├── pyproject.toml               # Project configuration
├── requirements.txt             # Dependencies
├── test_server.py              # Test script
└── README.md                   # This file
```

### Testing

Run the test script to verify the server functionality:

```bash
python test_server.py
```

### Running with Docker

You can also run Pulsar locally using Docker for testing:

```bash
# Start Pulsar standalone
docker run -it -p 6650:6650 -p 8080:8080 apachepulsar/pulsar:latest bin/pulsar standalone
```

## Requirements

- Python 3.12+
- Apache Pulsar cluster (local or remote)
- MCP-compatible client

## Dependencies

- `mcp>=1.1.0,<2.0`: Model Context Protocol library
- `pulsar-client>=3.4.0`: Apache Pulsar Python client
- `pydantic>=2.10.3`: Data validation and settings management
- `pydantic-settings>=2.6.1`: Settings management for Pydantic

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions, please open an issue on the GitHub repository. 