
## Build the project

```
mvn clean package
```

## Configure Claude Desktop

```
{
    "mcpServers": {
        "java-mcp": {
            "command": "java",
            "args": [
                "-jar",
                "/home/kenneth/Projects/java-mcp-server/target/java-mcp-server-1.0-SNAPSHOT-with-dependencies.jar"
            ]
        }
    }
}
```