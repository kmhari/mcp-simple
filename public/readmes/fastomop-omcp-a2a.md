# Agent2Agent OMCP

## MCP Server

The MCP (Model-Context-Protocol) server provides a set of tools for interacting with OMOP CDM databases and generating SQL queries using natural language processing. The server is built using FastMCP and integrates with Ollama for LLM capabilities.

### Features

#### SQL Server Tools
- `Execute_SQL_Query`: Execute SQL queries against an OMOP database and return results in CSV format
- `Test_Connection`: Test if a database connection is valid
- `Get_OMOP_Schema`: Get the OMOP CDM schema information for prompting

#### Validation Server Tools
- `Validate_SQL_Query`: Validate SQL queries against OMOP CDM validation rules

#### Ollama Server Tools
- `Generate_SQL`: Generate SQL from natural language using an LLM, incorporating medical concept codes
- `Generate_Explanation`: Generate an explanation for an SQL query
- `Generate_Answer`: Generate a natural language answer based on query, SQL, and results
- `List_Available_Models`: List available LLM models from Ollama

### Configuration

The server uses a configuration file (`config/config.json`) that specifies:
- Database connection strings
- Schema directory location
- Ollama API settings
- OMOP CDM validation rules and schema files

### Medical Concept Integration

The SQL generation tool accepts medical concepts in the following format:
```json
{
    "conditions": [
        {
            "concept_id": 12345,
            "concept_name": "Diabetes",
            "vocabulary_id": "SNOMED"
        }
    ],
    "drugs": [
        {
            "concept_id": 11111,
            "concept_name": "Metformin",
            "vocabulary_id": "RxNorm"
        }
    ],
    "measurements": [
        {
            "concept_id": 22222,
            "concept_name": "Blood Pressure",
            "vocabulary_id": "LOINC"
        }
    ]
}
```

### Requirements

- Python 3.13 or higher
- PostgreSQL database with OMOP CDM schema
- Ollama running locally for LLM capabilities

### Dependencies

- mcp
- httpx
- sqlalchemy
- pydantic
- pydantic-settings
- python-multipart
- sse-starlette

### Usage

The MCP server can be used as a standalone service or integrated into other applications. To use it:

1. Ensure all dependencies are installed:
```bash
uv pip install -e .
```

2. Configure the database connection and other settings in `config/config.json`

3. Start the server:
```python
from src.unified_mcp import mcp
mcp.run(transport="stdio")
```

### Example

```python
# Generate SQL with medical concepts
medical_concepts = {
    "conditions": [
        {"concept_id": 12345, "concept_name": "Diabetes", "vocabulary_id": "SNOMED"}
    ]
}

schema = mcp.tools["Get_OMOP_Schema"]()
sql_query, confidence = await mcp.tools["Generate_SQL"](
    prompt="Find all patients with diabetes",
    medical_concepts=medical_concepts,
    schema=schema
)

# Validate the generated SQL
validation_result = mcp.tools["Validate_SQL_Query"](sql_query)

# Execute the query if valid
if validation_result["is_valid"]:
    results = mcp.tools["Execute_SQL_Query"](sql_query)
```
