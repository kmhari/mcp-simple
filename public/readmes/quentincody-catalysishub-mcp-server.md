# Catalysis Hub MCP Server

A Model Context Protocol (MCP) server interface to Catalysis Hub's GraphQL API, enabling programmatic access to catalysis research data through flexible GraphQL queries.

## Key Features

- **Direct GraphQL Access**: Execute any valid GraphQL query against Catalysis Hub's API
- **Comprehensive Data Access**:
  - Catalytic reactions (equations, conditions, catalysts)
  - Material systems (structures, properties, descriptors)
  - Research publications (titles, DOIs, authors)
  - Surface reaction data (adsorption energies, binding sites)
- **MCP Standard Compliance**: Implements the Model Context Protocol for AI-agent interoperability
- **Flexible Query Support**: Execute complex queries with variables parameterization
- **Error Handling**: Robust error reporting for API connectivity and query execution

## License and Citation

This project is available under the MIT License with an Academic Citation Requirement. This means you can freely use, modify, and distribute the code, but any academic or scientific publication that uses this software must provide appropriate attribution.

### For academic/research use:
If you use this software in a research project that leads to a publication, presentation, or report, you **must** cite this work according to the format provided in [CITATION.md](CITATION.md).

### For commercial/non-academic use:
Commercial and non-academic use follows the standard MIT License terms without the citation requirement.

By using this software, you agree to these terms. See [LICENSE.md](LICENSE.md) for the complete license text.

## Implementation Details

- **Server Configuration** (matches `claude_desktop_config.json`):
  ```json
  {
    "command": "/Users/quentincody/.env/bin/python3",
    "args": ["/Users/quentincody/catalysishub-mcp-server/catalysishub_mcp_server.py"],
    "options": {
      "cwd": "/Users/quentincody/catalysishub-mcp-server"
    }
  }
  ```
- **Core Dependency**: `httpx` for asynchronous HTTP requests
- **Transport**: Standard input/output communication following MCP specifications

## Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd catalysishub-mcp-server
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Verify installation**:
   ```bash
   python3 catalysishub_mcp_server.py --version
   # Should output: catalysishub-mcp-server 0.1.0
   ```

## Usage Examples

### Basic Query Execution
```python
from mcp.client import MCPClient

async with MCPClient("catalysishub") as hub:
    result = await hub.catalysishub_graphql(
        query="""{
            reactions(first: 5) {
                edges {
                    node {
                        id
                        Equation
                        Temperature
                    }
                }
            }
        }"""
    )
    print(json.loads(result))
```

### Parameterized Query with Variables
```python
variables = {
    "materialId": "mp-1234",
    "firstResults": 5
}

response = await hub.catalysishub_graphql(
    query="""query GetMaterial($materialId: String!, $firstResults: Int!) {
        systems(uniqueId: $materialId) {
            edges {
                node {
                    energy
                    Cifdata
                    relatedReactions(first: $firstResults) {
                        edges {
                            node {
                                id
                                Equation
                            }
                        }
                    }
                }
            }
        }
    }""",
    variables=variables
)
```

## Query Optimization Tips

1. **Use GraphQL Fragments**:
   ```graphql
   fragment ReactionDetails on Reaction {
       id
       Equation
       ActivationEnergy
       Catalyst {
           formula
           surface
       }
   }
   
   query {
       reactions(first: 10) {
           edges {
               node {
                   ...ReactionDetails
               }
           }
       }
   }
   ```

2. **Batch Related Queries**:
   ```graphql
   query BatchQuery {
       reactions: reactions(first: 5) { edges { node { id Equation } } }
       materials: systems(first: 5) { edges { node { formula energy } } }
   }
   ```

## Response Structure

Successful responses follow this structure:
```json
{
    "data": { /* Query results */ },
    "extensions": {
        "responseMetadata": {
            "requestDuration": 145,
            "apiVersion": "2024-06"
        }
    }
}
```

Error responses include detailed diagnostics:
```json
{
    "errors": [{
        "message": "Cannot query field 'invalidField' on type 'Reaction'",
        "locations": [{"line": 5, "column": 21}],
        "path": ["query", "reactions", "edges", "node", "invalidField"]
    }]
}
```

## Troubleshooting

**Common Issues**:
- `HTTP Request Error`: Verify network connectivity to `api.catalysis-hub.org`
- `JSON Decode Error`: Check query syntax using Catalysis Hub's [GraphQL Playground](https://www.catalysis-hub.org/api/graphql)
- `Timeout Errors`: Add `timeout` parameter to complex queries

## Acknowledgements

This project builds on the Model Context Protocol (MCP) framework and is designed to interface with the Catalysis Hub database, a comprehensive resource for catalysis research data.