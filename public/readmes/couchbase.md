
# Couchbase Model Context Protocol Server

This project demonstrates the implementation of a Model Context Protocol (MCP) server that provides semantic search capabilities for Star Wars planets using Couchbase's vector search functionality.

## Overview

The Model Context Protocol (MCP) is a standardized way for AI models to interact with external tools and data sources. This implementation creates an MCP server that allows AI models to:

1. Fetch detailed information about Star Wars planets
2. Find similar planets based on vector embeddings

## How It Works

### Model Context Protocol Integration

The server implements two main MCP tools:

``` typescript
{
tools: [
{
name: "fetch_planet_name",
description: "Fetch a Star Wars planet by name",
inputSchema: // ... schema for planet name
},
{
name: "find_planets_which_are_similar",
description: "Find similar planets by name to the given name",
inputSchema: // ... schema for planet name
}
]
}
```


These tools can be discovered and called by AI models that support the Model Context Protocol.

### Couchbase Vector Search

The implementation uses Couchbase's vector search capabilities to find similar planets:

1. Each planet document in Couchbase includes an `embedding` field containing a vector representation of the planet's characteristics
2. When searching for similar planets:
   - Retrieves the source planet's embedding
   - Uses Couchbase's vector search to find planets with similar embeddings
   - Returns the top 5 most similar planets

### Key Features

- **Efficient Vector Search**: Utilizes Couchbase's vector search index for fast similarity lookups
- **Timeout Protection**: Implements timeouts for both search and document fetching operations
- **Connection Management**: Properly manages Couchbase connections with cleanup
- **Error Handling**: Comprehensive error handling and debugging support
- **Type Safety**: Full TypeScript implementation with proper type definitions

## Setup

### Prerequisites

- Node.js
- Couchbase Server with vector search capability
- Environment variables:
  ```
  COUCHBASE_URL=
  COUCHBASE_USERNAME=
  COUCHBASE_PASSWORD=
  COUCHBASE_BUCKET=
  COUCHBASE_SCOPE=
  COUCHBASE_COLLECTION=
  ```

### Data Structure

Each planet document should follow this structure:
``` typescript
interface StarWarsCharacter {
name: string;
rotation_period: string;
orbital_period: string;
diameter: string;
climate: string;
gravity: string;
terrain: string;
surface_water: string;
population: string;
residents: string[];
films: string[];
created: string;
edited: string;
url: string;
embedding?: number[]; // Vector embedding for similarity search
}
```


### Vector Search Index

Create a vector search index in Couchbase named `vector-search-index` that indexes the `embedding` field.

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. The server will listen for MCP requests via stdin/stdout.

3. AI models can interact with the server using these example queries:

   ```json
   // Fetch planet details
   {
     "name": "fetch_planet_name",
     "arguments": {
       "name": "Tatooine"
     }
   }

   // Find similar planets
   {
     "name": "find_planets_which_are_similar",
     "arguments": {
       "name": "Tatooine"
     }
   }
   ```

