# Apollo.io MCP Server

This project provides an MCP server that exposes the Apollo.io API functionalities as tools. It allows you to interact with the Apollo.io API using the Model Context Protocol (MCP).

## Overview

The project consists of the following main components:

- `apollo_client.py`: Defines the `ApolloClient` class, which is used to interact with the Apollo.io API. It includes methods for people enrichment, organization enrichment, people search, organization search, and organization job postings.
- `server.py`: Defines the FastMCP server, which exposes the Apollo.io API functionalities as tools. It uses the `ApolloClient` class defined in `apollo_client.py` to interact with the API.
- `apollo/`: Contains the data models for the Apollo.io API, such as `PeopleEnrichmentQuery`, `OrganizationEnrichmentQuery`, `PeopleSearchQuery`, `OrganizationSearchQuery`, and `OrganizationJobPostingsQuery`.

## Functionalities

The following functionalities are exposed as MCP tools:

-   `people_enrichment`: Use the People Enrichment endpoint to enrich data for 1 person.
-   `organization_enrichment`: Use the Organization Enrichment endpoint to enrich data for 1 company.
-   `people_search`: Use the People Search endpoint to find people.
-   `organization_search`: Use the Organization Search endpoint to find organizations.
-   `organization_job_postings`: Use the Organization Job Postings endpoint to find job postings for a specific organization.

## Usage

To use this MCP server, you need to:

1. Set the `APOLLO_IO_API_KEY` environment variable with your Apollo.io API key. Or create '.env' file in the project root with `APOLLO_IO_API_KEY`.
2. Get dependencies: `uv sync`
3. Run the `uv run mcp run server.py`

## Data Models

The `apollo/` directory contains the data models for the Apollo.io API. These models are used to define the input and output of the MCP tools.

- `apollo/people.py`: Defines the data models for the People Enrichment endpoint.
- `apollo/organization.py`: Defines the data models for the Organization Enrichment endpoint.
- `apollo/people_search.py`: Defines the data models for the People Search endpoint.
- `apollo/organization_search.py`: Defines the data models for the Organization Search endpoint.
- `apollo/organization_job_postings.py`: Defines the data models for the Organization Job Postings endpoint.

## Testing

To test, set `APOLLO_IO_API_KEY` environment variable and run `uv run apollo_client.py`.

## Usage with Claude for Desktop

1. Configure Claude for Desktop to use these MCP servers by adding them to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "apollo-io-mcp-server": {
      "type": "stdio",
      "command": "uv",
      "args": [
        "run",
        "mcp",
        "run",
        "path/to/apollo-io-mcp-server/server.py"
      ]
    }
  }
}
```

## Resources

- [Apollo.io API Documentation](https://docs.apollo.io/reference/)
- [MCP Protocol Documentation](https://github.com/modelcontextprotocol/mcp)
- [Claude for Desktop Documentation](https://claude.ai/docs)
