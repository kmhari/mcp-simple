# Neo4j MCP Server

A comprehensive Model Context Protocol (MCP) server for Neo4j graph database. This server allows AI assistants to interact with Neo4j databases using natural language through the MCP protocol.

## Features

- **Schema Exploration**: Get detailed information about the database schema, including node labels, relationship types, and properties.
- **Query Execution**: Execute Cypher queries to read and write data to the database.
- **Database Management**: Create and manage indexes and constraints.
- **Data Exploration**: Find nodes, relationships, and paths in the database.
- **Graph Algorithms**: Find shortest paths and all paths between nodes.
- **Database Statistics**: Get statistics about the database, including node and relationship counts.

## Installation

```bash
# Clone the repository
git clone https://github.com/nature-lover-iv/neo4j-mcp.git
cd neo4j-mcp

# Install the package
pip install -e .
or pip install git+https://github.com/nature-lover-iv/neo4j-mcp.git
```

## Usage

### Command Line

```bash
# Start the server with default settings
neo4j-mcp

# Start the server with custom Neo4j connection
neo4j-mcp --uri bolt://localhost:7687 --username neo4j --password password

# Start the server with custom configuration file
neo4j-mcp --config /path/to/config.json

# Get help
neo4j-mcp --help
```

### Configuration

You can configure the server using a JSON configuration file. The default configuration file is located at `~/.neo4j-mcp/config.json`.

```json
{
  "neo4j": {
    "uri": "bolt://localhost:7687",
    "username": "neo4j",
    "password": "password",
    "database": null
  },
  "server": {
    "name": "neo4j-mcp-server",
    "version": "0.1.0"
  },
  "logging": {
    "level": "INFO",
    "file": null
  }
}
```

### Environment Variables

You can also configure the server using environment variables:

```bash
# Set Neo4j connection details
export NEO4J_URL=bolt://localhost:7687
export NEO4J_USERNAME=neo4j
export NEO4J_PASSWORD=password
export NEO4J_DATABASE=neo4j

# Start the server
neo4j-mcp
```

## Using with Cline

To use the Neo4j MCP server with Cline, add the following to your `cline_mcp_settings.json` file:

```json
{
  "mcpServers": {
    "github.com/neo4j-contrib/mcp-neo4j": {
      "command": "neo4j-mcp",
      "args": [],
      "env": {
        "NEO4J_URL": "bolt://localhost:7687",
        "NEO4J_USERNAME": "neo4j",
        "NEO4J_PASSWORD": "your-password"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Available Tools

The Neo4j MCP server provides the following tools:

### Schema Tools

- `get_neo4j_schema`: Get a list of all node types in the graph database, their attributes with name, type, and relationships to other node types.
- `get_database_info`: Get information about the Neo4j database, including version, edition, and address.

### Query Tools

- `read_neo4j_cypher`: Execute Cypher read queries to read data from the database.
- `write_neo4j_cypher`: Execute updating Cypher queries to modify the database.
- `explain_neo4j_cypher`: Explain a Cypher query execution plan.

### Database Statistics Tools

- `get_database_statistics`: Get statistics about the Neo4j database, including node and relationship counts.
- `get_node_counts_by_label`: Get the number of nodes for each label in the database.
- `get_relationship_counts_by_type`: Get the number of relationships for each type in the database.

### Database Management Tools

- `get_indexes`: Get all indexes in the database.
- `get_constraints`: Get all constraints in the database.
- `create_index`: Create a new index in the database.
- `create_constraint`: Create a new constraint in the database.
- `drop_index`: Drop an index from the database.
- `drop_constraint`: Drop a constraint from the database.

### Data Exploration Tools

- `get_sample_data`: Get sample data for each node label in the database.
- `find_nodes`: Find nodes in the database based on label and property conditions.
- `find_relationships`: Find relationships in the database based on type and property conditions.
- `find_paths`: Find paths between nodes in the database.

### Graph Algorithms

- `find_shortest_path`: Find the shortest path between two nodes.
- `find_all_paths`: Find all paths between two nodes.

## Testing

The Neo4j MCP server includes a comprehensive test suite to ensure its functionality:

### Unit Tests

Unit tests verify the functionality of individual components without requiring a Neo4j database:

```bash
# Run unit tests only
python3 tests/run_tests.py --unit
```

### Integration Tests

Integration tests verify the functionality of the server with a real Neo4j database:

```bash
# Run integration tests only
python3 tests/run_tests.py --integration
```

### MCP Tool Tests

MCP tool tests verify the functionality of the MCP tools directly:

```bash
# Run MCP tool tests only
python3 tests/run_tests.py --mcp
```

### Running All Tests

You can run all tests with:

```bash
# Run all tests
python3 tests/run_tests.py
```

## License

MIT
