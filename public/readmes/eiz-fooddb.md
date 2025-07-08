# FoodDB - USDA Food Database MCP Server

An MCP server for querying USDA Food Data Central information. It provides tools to search for foods and get detailed nutritional information.

> **Note**: This project was 100% created with Claude AI. No human has directly edited any code files. All development was done through AI-assisted programming.

## Data Source

To use this project, you'll need to download the USDA Food Data Central dataset:

1. Visit [USDA FDC Download Datasets](https://fdc.nal.usda.gov/download-datasets.html)
2. Download the "Full Download" package
3. Extract the CSV files to the `./data` directory in this project

## Features

- Import USDA Food Data Central CSV files into a SQLite database
- Model Context Protocol (MCP) server for integration with Claude for Desktop and other MCP clients
- Smart keyword-based search for food items
- Semantic vector search using OpenAI embeddings
- Comprehensive nutritional data including calories, macros, and serving sizes

## Installation

```bash
# Install in development mode
uv pip install -e .
```

## Usage

### Initialize the Database

Before using the server, you need to import the USDA data:

```bash
# Import data from the default location (./data) with embeddings generation
uv run food init-db

# Custom data and database paths
uv run food init-db --data-dir /path/to/data --db-path custom.sqlite

# Skip embeddings generation
uv run food init-db --no-embeddings
```

### Generate Embeddings

If you need to generate or update embeddings for vector search:

```bash
# Generate ALL embeddings for foods that don't have them yet
uv run food generate-embeddings

# Process foods in larger batches (default is 1000)
uv run food generate-embeddings --batch-size 5000
```

For vector search to work, you need to set the `OPENAI_API_KEY` environment variable:

```bash
export OPENAI_API_KEY=your-api-key
```

### Search for Foods

You can search for foods using the CLI:

```bash
# Search for foods matching a query
uv run food search "ice cream" --limit 5
```

### Get Food Information

Get detailed information about a specific food by its ID:

```bash
# Display detailed nutrition information for a food
uv run food info 167575
```

### Run the MCP Server

Run the server with the stdio transport (for use with Claude Desktop):

```bash
uv run food run-server
```

Or with the HTTP transport for other clients:

```bash
uv run food run-server --transport http --port 8000
```

## Integrating with Claude for Desktop

To use this server with Claude for Desktop, add it to your Claude Desktop configuration at `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "fooddb": {
            "command": "uv",
            "args": [
                "--directory",
                "/path/to/fooddb",
                "run",
                "food",
                "run-server"
            ],
            "env": {
                "OPENAI_API_KEY": "your-openai-api-key-here"
            }
        }
    }
}
```

**Important**: 
- Replace `/path/to/fooddb` with the absolute path to your fooddb installation
- Replace `your-openai-api-key-here` with your actual OpenAI API key
- The `env` section is required for vector search functionality
- Without a valid OpenAI API key, only basic text matching searches will work

## MCP Tools

The server provides the following MCP tools:

### food_search

Search for foods using semantic vector search via embeddings. This can find foods that match the concept even if they don't contain the exact keywords.

```python
food_search(query: str, limit: int = 10, model: str = "text-embedding-3-small") -> List[Dict]
```

### food_info

Get detailed information about a specific food by ID, including nutritional content, portions, and brand information.

```python
food_info(food_id: int) -> str
```

## Development

### Running Tests

```bash
uv run pytest
```

### Linting

```bash
uv run ruff check .
```

## Data Structure

The USDA Food Data Central dataset includes:

- **Food**: Basic food information (name, category, etc.)
- **Nutrient**: Definitions of nutrients (calories, protein, etc.)
- **FoodNutrient**: Mapping of foods to their nutrient values
- **FoodPortion**: Serving size information for foods
- **FoodEmbeddings**: Vector embeddings for semantic search

## Vector Search

The system uses OpenAI's text-embedding-3-small model to generate vector embeddings for food descriptions. These embeddings are stored in the SQLite database using the sqlite-vec extension, which enables efficient similarity searches.

For vector search functionality:

1. Make sure the sqlite-vec extension is installed and available
2. Set the OPENAI_API_KEY environment variable
3. Generate embeddings during database initialization or with the generate-embeddings command
4. Use the semantic_food_search MCP tool for natural language food searches