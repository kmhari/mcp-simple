# Neo4j MCP Server

Fork of the Neo4j Model Context Protocol (MCP) server with environment variable support and improved configuration options.

## Features

* Environment variable configuration for Neo4j connection
* Support for custom ports and remote Neo4j instances
* Improved error handling and logging
* Compatible with the [Model Context Protocol](https://modelcontextprotocol.io/introduction)

## Configuration

The server can be configured using the following environment variables:

* `NEO4J_URL` - Neo4j connection URL (default: "bolt://localhost:7687")
* `NEO4J_USER` - Neo4j username (default: "neo4j")
* `NEO4J_PASSWORD` - Neo4j password (default: "neo4j")

Example:
```bash
NEO4J_URL="bolt://192.168.0.157:28687" \
NEO4J_USER="neo4j" \
NEO4J_PASSWORD="your-password" \
node dist/servers/mcp-neo4j-memory/main.js
```

## Available Tools

### mcp-neo4j-memory

Knowledge graph memory stored in Neo4j with the following capabilities:

* `create_entities` - Create multiple new entities in the knowledge graph
* `create_relations` - Create relations between entities (in active voice)
* `add_observations` - Add new observations to existing entities
* `delete_entities` - Delete entities and their relations
* `delete_observations` - Delete specific observations from entities
* `delete_relations` - Delete specific relations
* `read_graph` - Read the entire knowledge graph
* `search_nodes` - Search for nodes based on a query
* `open_nodes` - Open specific nodes by their names

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Start the server
npm start
```

## Changes from Upstream

* Added environment variable support for Neo4j connection details
* Improved error handling and connection management
* Added detailed logging for debugging
* Updated configuration to support remote Neo4j instances

## License

MIT
