# topdesk-mcp

This project is a Model Context Protocol (MCP) server implemented in Python. It exposes the Topdesk API via the TOPdeskPy SDK.

## Project Purpose
- Acts as an MCP server to bridge MCP clients with the Topdesk API.
- Uses the [TOPdeskPy SDK](https://github.com/TwinkelToe/TOPdeskPy) (with some modifications) for all Topdesk API interactions.

## MCP Config JSON
```
{
  "servers": {
    "topdesk-mcp": {
      "type": "stdio",
      "command": "uvx",
      "args": [
        "topdesk-mcp"
      ],
      "env": {
         "TOPDESK_URL": "<your topdesk URL>",
         "TOPDESK_USERNAME": "<your topdesk username>",
         "TOPDESK_PASSWORD": "<your topdesk api key>"
      }
    }
  }
}
```

## Environment Variables
* `TOPDESK_URL`: The base URL of your Topdesk instance. e.g. `https://yourcompany.topdesk.net`
* `TOPDESK_USERNAME`: The username you generated the API token against.
* `TOPDESK_PASSWORD`: Your API token
* `TOPDESK_MCP_TRANSPORT`: (Optional) The transport to use: 'stdio', 'streamable-http', 'sse'. Defaults to 'stdio'.
* `TOPDESK_MCP_HOST`: (Optional) The host to listen on (for 'streamable-http' and 'sse'). Defaults to '0.0.0.0'.
* `TOPDESK_MCP_PORT`: (Optional) The port to listen on (for 'streamable-http' and 'sse'). Defaults to '3030'.

### Document Conversion Environment Variables
Topdesk Attachments can be converted to Markdown format by the tool. 

By default it will try to do this with simple MarkItDown library which often isn't sufficient.

These variables configure the attachment-to-markdown conversion feature to leverage a Docling or OpenAI instance instead:

* `DOCLING_ADDRESS`: (Optional) URL of a Docling API server for document conversion. e.g. `http://localhost:8080`
* `DOCLING_API_KEY`: (Optional) API key for Docling API authentication
* `DOCLING_USERNAME`: (Optional) Username for Docling API basic authentication (fallback if no API key)
* `DOCLING_PASSWORD`: (Optional) Password for Docling API basic authentication (fallback if no API key)
* `OPENAI_API_BASE`: (Optional) Base URL for OpenAI-compatible API for document conversion. e.g. `https://api.openai.com`
* `OPENAI_API_KEY`: (Optional) API key for OpenAI API authentication
* `OPENAI_MODEL_NAME`: (Optional) Model name to use for OpenAI API calls. Defaults to 'gpt-4.1'
* `SSL_VERIFY`: (Optional) Enable/disable SSL verification for API calls. Set to 'false' to disable. Defaults to 'true'.

## Setup for Local Development
1. Ensure Python 3.11+ is installed.
2. Create and activate a virtual environment:

   ```bash
   pip install uv
   uv venv
   uv pip install -e .
   uv pip install -e ".[dev]"
   ```

4. Run:
   ```bash
   python -m topdesk_mcp.main
   ```
   
### Notes:
* The server skeleton was generated using the official MCP server template.
* Contributions are welcome.

## Package Structure
```
topdesk_mcp/  # Directory for the MCP server package
    __init__.py     # Marks as a Python package
    main.py         # Entry point for the MCP server
    
    _topdesk_sdk.py # TOPdeskPy SDK
    _incident.py    # Incidents API
    _operator.py    # Operator API
    _person.py      # Person API
    _utils.py       # Helper methods for Requests

    tests/
      (unit tests)
```

## Exposed Tools

- **topdesk_get_fiql_query_howto**  
  Get a hint on how to construct FIQL queries, with examples.

- **topdesk_get_object_schemas**  
  Get the full object schemas for TOPdesk incidents and all their subfields.

- **topdesk_get_incident**  
  Get a TOPdesk incident by UUID or by Incident Number (I-xxxxxx-xxx). Both formats are accepted.

- **topdesk_get_incidents_by_fiql_query**  
  Get TOPdesk incidents by FIQL query.

- **topdesk_get_incident_user_requests**  
  Get all user requests on a TOPdesk incident.

- **topdesk_create_incident**  
  Create a new TOPdesk incident.

- **topdesk_archive_incident**  
  Archive a TOPdesk incident.

- **topdesk_unarchive_incident**  
  Unarchive a TOPdesk incident.

- **topdesk_get_timespent_on_incident**  
  Get all time spent entries for a TOPdesk incident.

- **topdesk_register_timespent_on_incident**  
  Register time spent on a TOPdesk incident.

- **topdesk_escalate_incident**  
  Escalate a TOPdesk incident.

- **topdesk_get_available_escalation_reasons**  
  Get all available escalation reasons for a TOPdesk incident.

- **topdesk_get_available_deescalation_reasons**  
  Get all available de-escalation reasons for a TOPdesk incident.

- **topdesk_deescalate_incident**  
  De-escalate a TOPdesk incident.

- **topdesk_get_progress_trail**  
  Get the progress trail for a TOPdesk incident.

- **topdesk_get_incident_attachments**  
  Get all attachments for a TOPdesk incident as base64-encoded data.

- **topdesk_get_incident_attachments_as_markdown**  
  Download and convert all attachments for a TOPdesk incident to Markdown format. Uses intelligent document conversion with support for PDFs, Office documents, images, and other file types. Attempts conversion using OpenAI API (if configured), then Docling API (if configured), and falls back to MarkItDown for local processing.

- **topdesk_get_complete_incident_overview**  
  Get a comprehensive overview of a TOPdesk incident including its details, progress trail, and attachments converted to Markdown. This tool combines the results of `topdesk_get_incident`, `topdesk_get_progress_trail`, and `topdesk_get_incident_attachments_as_markdown` into a single response for convenient access to all incident information.

- **topdesk_get_operatorgroups_of_operator**  
  Get a list of TOPdesk operator groups that an op is a member of, optionally by FIQL query or leave blank to return all groups.

- **topdesk_get_operator**  
  Get a TOPdesk operator by ID.

- **topdesk_get_operators_by_fiql_query**  
  Get TOPdesk operators by FIQL query.

- **topdesk_add_action_to_incident**  
  Add an action (ie, reply/comment) to a TOPdesk incident.

- **topdesk_get_incident_actions**  
  Get all actions (ie, replies/comments) for a TOPdesk incident.

- **topdesk_delete_incident_action**  
  Delete a specific action (ie, reply/comment) for a TOPdesk incident.

- **topdesk_get_person_by_query**  
  Get TOPdesk persons by FIQL query.

- **topdesk_get_person**  
  Get a TOPdesk person by ID.

- **topdesk_create_person**  
  Create a new TOPdesk person.

- **topdesk_update_person**  
  Update an existing TOPdesk person.

- **topdesk_archive_person**  
  Archive a TOPdesk person.

- **topdesk_unarchive_person**  
  Unarchive a TOPdesk person.

## References
- [MCP Protocol Documentation](https://modelcontextprotocol.io/llms-full.txt)
- [TOPdeskPy SDK](https://github.com/TwinkelToe/TOPdeskPy)
- [FastMCP](https://github.com/jlowin/fastmcp)

## License
MIT license.
