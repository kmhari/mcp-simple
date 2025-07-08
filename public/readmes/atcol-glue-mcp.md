# glue-mcp
A model context protocol (MCP) server to AWS Glue Data Catalog

## Usage

Once you've built a binary (see below), ensure you have your AWS credentials set.

Then simply start the server:

```bash
./glue-mcp
2025-04-29T21:25:37.623408Z  INFO glue_mcp: Metrics & logging initialised
2025-04-29T21:25:37.623453Z  INFO glue_mcp::util: Starting server on 127.0.0.1:8000
```

The server is ready for MCP calls on port 8000.

## Development

### Nix

Just run `nix develop`, then `cargo build`.

## Demo

We'll demonstrate using Ollama.

#### 1. Install & configure `mcphost`

```bash
go install github.com/mark3labs/mcphost@latest
```

Configure mcphost with this MCP server:

```json
{
  "mcpServers": {
    "aws_glue": {
      "url": "http://localhost:8000/sse",
      "transport": "sse"
    }
  }
}
```

####  2. Configure Ollama

Get a model:

```bash
ollama pull llama3.1:latest
```

#### 4. Run `glue-mcp`

```bash
cargo run
```

#### 5. Run mcphost & query

```bash
~/go/bin/mcphost --config ./mcp.json --model ollama:llama3.1
2025/04/27 11:46:02 INFO Initializing server... name=aws_glue
2025/04/27 11:46:02 INFO Server connected name=aws_glue             
2025/04/27 11:46:02 INFO Tools loaded server=aws_glue count=3                                                                           
                                                                                                                                        
  You: list databases             
2025/04/27 11:47:11 INFO 🔧 Using tool name=aws_glue__list_databases
                                                                    
  Assistant:                                                                                                          
                                                                                                                                        
                                                                    
  The available databases are 'reference_data' and 'unstructured'.                                                                      
                                                                                                                                        


  You: list tables per database                                     
2025/04/27 11:47:40 INFO 🔧 Using tool name=aws_glue__get_database_metadata
2025/04/27 11:47:45 INFO 🔧 Using tool name=aws_glue__get_database_metadata

  Assistant:                                                                                                          


  The 'unstructured' database is currently empty of tables. The 'reference_data' database also does not contain any   
  tables.                                                                                                             


```
