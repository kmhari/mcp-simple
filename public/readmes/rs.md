# mcp-rs

A Rust implementation of the MCP server (Model Context Protocol). This is a Rust port of the [original TypeScript implementation](https://github.com/wong2/litemcp).

## Features

This Rust implementation provides all the features of the original MCP:

- All core MCP server functionalities
- Built-in authentication handler
- Custom layered middleware support
- Flexible transport options (stdio and SSE)

## Quickstart

### Installation

Add this to your Cargo.toml:

```toml
[dependencies]
mcp-rs = "0.1.0"
```

### Basic Usage

Here's a basic example of how to use the library:

```rust
use mcp_rs::{Emcp, SimpleToolBuilder};
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a new server instance
    let server = Emcp::new("my-mcp-server", "1.0.0", None);
    
    // Add a tool
    let add_tool = SimpleToolBuilder::new("add", |args| async move {
        let a = args["a"].as_f64().unwrap_or(0.0);
        let b = args["b"].as_f64().unwrap_or(0.0);
        Ok(json!(a + b))
    })
    .description("Add two numbers")
    .input_schema(json!({
        "type": "object",
        "properties": {
            "a": { "type": "number" },
            "b": { "type": "number" }
        },
        "required": ["a", "b"]
    }))
    .build();
    
    server.add_tool(add_tool);
    
    // Start the server
    server.start(None).await?;
    
    Ok(())
}
```

### Authentication Example

```rust
use mcp_rs::{Emcp, EmcpOptions, SimpleToolBuilder};
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create authentication handler
    let auth_handler = Box::new(|request| {
        // Check auth headers, tokens, etc.
        Box::pin(async { 
            // Return true for authorized requests
            true 
        })
    });
    
    // Create a new server with auth handler
    let server = Emcp::new(
        "mcp-server-with-auth",
        "1.0.0",
        Some(EmcpOptions {
            authentication_handler: Some(auth_handler),
        }),
    );
    
    // Add tools, resources, or prompts...
    
    // Start the server
    server.start(None).await?;
    
    Ok(())
}
```

### Middleware Example

```rust
use mcp_rs::{Emcp, SimpleToolBuilder};
use std::time::Instant;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a new server
    let mut server = Emcp::new("mcp-server-with-middleware", "1.0.0", None);
    
    // Add timing middleware
    server.use_middleware(|request, next| {
        let start_time = Instant::now();
        let method = request.method.clone();
        
        Box::pin(async move {
            // Call next middleware in the chain
            let response = next().await;
            
            // Post-processing
            let duration = start_time.elapsed();
            println!(
                "Request completed: method={}, duration={}ms",
                method,
                duration.as_millis()
            );
            
            response
        })
    });
    
    // Add tools, resources, or prompts...
    
    // Start the server
    server.start(None).await?;
    
    Ok(())
}
```

## How Middleware Works

Middleware in mcp-rs runs in the same way as the original TypeScript implementation:

1. Middleware executes in the order it was registered
2. Each middleware can perform pre-processing before calling `next()`
3. The core MCP handler runs after all middleware pre-processing is complete
4. After the handler completes, middleware post-processing (code after the `next()` call) runs in reverse order

This creates an "onion-like" processing flow similar to frameworks like Axum, Tower, or other middleware-based systems.

### Using StdioServerTransport Directly

The library supports using the StdioServerTransport directly, similar to the Node.js MCP SDK:

```rust
use mcp_rs::{Emcp, StdioServerTransport, SimpleToolBuilder};
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create a new server
    let server = Emcp::new("my-mcp-server", "1.0.0", None);
    
    // Add your tools, resources, and prompts
    // ...
    
    // Create a StdioServerTransport
    let transport = StdioServerTransport::new();
    
    // Connect the server to the transport
    server.connect(transport).await?;
    
    Ok(())
}
```

## Running the Examples

The repository includes several examples that demonstrate the library's features:

```bash
# Run the basic example
cargo run --example basic

# Run the auth example
cargo run --example auth

# Run the middleware example
cargo run --example middleware

# Run the stdio transport example
cargo run --example stdio_transport
```

## License

MIT