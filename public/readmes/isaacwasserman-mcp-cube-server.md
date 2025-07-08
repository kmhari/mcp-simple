# Snowflake Cube Server

[![smithery badge](https://smithery.ai/badge/@isaacwasserman/mcp_cube_server)](https://smithery.ai/server/@isaacwasserman/mcp_cube_server)

MCP Server for Interacting with Cube Semantic Layers

## Resources

### `context://data_description`
Contains a description of the data available in the Cube deployment. This is an application controlled version of the `describe_data` tool.

### `data://{data_id}`
Contains the data returned by a `read_data` call in JSON format. This resource is meant for MCP clients that wish to format or otherwise process the output of tool calls. See [`read_data`](#read_data) for more.

## Tools

### `read_data`
Accepts a query to the Cube REST API and returns the data in YAML along with a unique identifier for the data returned. This identifier can be used to a retrieve a JSON representation of the data from the resource `data://{data_id}`. See [`data://{data_id}`](#datadata_id) for more.

### `describe_data`
Describes the data available in the Cube deployment. This is an agentic version of the `context://data_description` resource.
