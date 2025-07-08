# agoda-review-mcp

This Model Context Protocol(MCP) server enables Large Language Models (LLMs) to <br>
find 'agoda' hotel reviews <br>

It helps with your choose because you bring positive and negative reviews together

## Usage

### Prerequisites
- Java 17 or newer

### Steps
1 clone repository
```shell
git clone https://github.com/birariro/agoda-review-mcp.git && cd agoda-review-mcp
```
2 build project
```shell
./gradlew build -x test
```
3 Add the following configuration to your Claude MCP setup
```shell
{
  "mcpServers": {
    "agoda-review-mcp-server": {
      "command": "java",
      "args": [
        "-jar",
        "{path}/build/libs/agoda-review-mcp-0.0.1.jar"
      ]
  }
```

