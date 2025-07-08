# JSON Schema MCP Server

An MCP server that manages JSON schemas and creates instances from them.

## Features

- **Store and retrieve JSON schemas**
- **Create new JSON schemas** with a simple tool
- **Generate instances** from schemas with custom values

## Resources

- `schema://{schema_id}` - Get a specific schema by ID
- `schemas://list` - Get a list of all available schemas

## Tools

- `create_schema` - Create a new JSON schema
- `create_instance` - Create a JSON instance from a schema

## Usage

1. Install dependencies:
   ```
   pip install mcp[cli]
   ```

2. Run the server:
   ```
   python server.py
   ```

3. Or install with Claude Desktop:
   ```
   mcp install server.py
   ```

## Examples

### Creating a Person Schema

```
// Create a schema for a person
create_schema(
  title="Person",
  properties={
    "name": {"type": "string"},
    "age": {"type": "integer"},
    "email": {"type": "string", "format": "email"}
  },
  required=["name", "email"]
)
```

### Creating an Instance

```
// Create a person instance
create_instance(
  schema_id="<schema-id-from-previous-step>",
  values={
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com"
  }
)
```
