# PayPal Java MCP Server

This is a Java implementation of a PayPal MCP (Merchant Capability Platform) server that provides tools for analyzing and improving payment processing.

## Features

- JSON-RPC over HTTP API for web clients
- JSON-RPC over stdio interface for Smithery integration
- Tools for analyzing authorization rates
- Basic calculator functionality for testing

## Running the Server

### Web Mode (Default)

To run the server in web mode, which exposes a REST API on port 8080:

```bash
java -jar target/paypal-java-mcp-server-0.0.1-SNAPSHOT.jar
```

In this mode, you can access the API at `http://localhost:8080/api/mcp`.

### JSON-RPC over stdio Mode

To run the server in stdio mode, which uses JSON-RPC over standard input/output:

```bash
java -Dspring.profiles.active=stdio -Dspring.main.web-application-type=NONE -Djsonrpc.stdio.interactive=true -jar target/paypal-java-mcp-server-0.0.1-SNAPSHOT-stdio.jar
```

In this mode, the server reads JSON-RPC requests from stdin and writes responses to stdout. All logs are written to stderr and a log file.

**IMPORTANT**: The JSON-RPC stdio interface requires stdin/stdout connectivity. When deploying, ensure that the process has access to stdin/stdout, typically by running it in interactive mode.

You can test the stdio mode using the provided test script:

```bash
./test-stdio.sh
```

#### Running in Non-Interactive Environments

If you need to run the server in a non-interactive environment (where stdin/stdout connectivity is not available), you can use the provided `start-non-interactive.sh` script:

```bash
./start-non-interactive.sh
```

This script:
1. Creates named pipes for stdin and stdout
2. Starts background processes to handle the pipes
3. Starts the server with the `-Djsonrpc.stdio.interactive=false` flag
4. Automatically sends an initialize request to the server
5. Provides the pipe paths for you to interact with the server

The server will pre-initialize all capabilities and tools, so it's ready to respond to requests even without initial input. You can then interact with the server by writing to the input pipe and reading from the output pipe:

```bash
# Send a request
echo '{"jsonrpc":"2.0","method":"getTools","id":"1"}' > /path/to/input_pipe

# Read responses
cat /path/to/output_pipe
```

#### Running with Docker

When running the server in a Docker container, you **MUST** use the `-i` flag to provide stdin connectivity:

```bash
docker run -i paypal-mcp-jsonrpc
```

The provided `run-docker.sh` script handles this for you:

```bash
./run-docker.sh
```

## JSON-RPC Protocol

The server supports the following JSON-RPC methods:

### initialize

Initializes the server and returns its capabilities:

```json
{"jsonrpc":"2.0","method":"initialize","id":"1"}
```

### getTools

Returns a list of available tools:

```json
{"jsonrpc":"2.0","method":"getTools","id":"2"}
```

### executeFunction

Executes a function with the specified arguments:

```json
{"jsonrpc":"2.0","method":"executeFunction","params":{"function":"calculate","arguments":{"operation":"add","a":5,"b":3}},"id":"3"}
```

## Deployment with Smithery

This server is designed to be deployed with Smithery, which requires the JSON-RPC over stdio interface.

To prepare the server for Smithery deployment:

```bash
./prepare-smithery.sh
```

This will create a `smithery-deploy` directory with all the necessary files for deployment, including:
- The server JAR file
- The Smithery configuration file
- Scripts for running in interactive and non-interactive modes
- A README with deployment instructions

### Smithery Configuration

The server includes a `smithery-config.json` file that configures the server for Smithery:

```json
{
  "name": "paypal-java-mcp-server",
  "type": "stdio",
  "interactive": true,
  "command": "java",
  "args": [
    "-Dspring.profiles.active=stdio",
    "-Dspring.main.web-application-type=NONE",
    "-DLOG_FILE=/logs/mcp-server.log",
    "-Dlogging.config=classpath:logback-stdio.xml",
    "-Djsonrpc.stdio.interactive=true",
    "-jar",
    "/app/app.jar"
  ]
}
```

**CRITICAL**: When using the server with Smithery, ensure that:
1. The `"interactive": true` flag is set in the Smithery configuration
2. The `-Djsonrpc.stdio.interactive=true` argument is included in the startup command
3. You are using the JSON-RPC over stdio interface and not attempting to connect to the server via HTTP
4. If your environment does not support interactive processes, use the `start-non-interactive.sh` script instead

### Non-Interactive Deployment

If your Smithery environment does not support interactive processes, you have two options:

1. **Use the start-non-interactive.sh script**: This script creates named pipes and handles the stdin/stdout connectivity for you.

2. **Modify the Smithery configuration**: Set `"interactive": false` in the Smithery configuration and ensure the server is started with the `-Djsonrpc.stdio.interactive=false` flag.

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

## Getting Started

### Configuration

Configure the application in `application.properties`:

```properties
# Server configuration
server.port=8080

# Logging
logging.level.com.example.mcpserver=DEBUG
```

### Building and Running

Build the application:

```bash
mvn clean package
```

## API Usage

### REST API

#### Health Check

```bash
curl http://localhost:8080/api/v1/health
```

#### Completions Endpoint

```bash
curl -X POST http://localhost:8080/api/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "query": "How can I improve my authorization rate?",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful PayPal assistant."
      },
      {
        "role": "user",
        "content": "I need to improve my authorization rate. My merchant ID is MERCH123."
      }
    ],
    "context": {
      "merchantId": "MERCH123"
    }
  }'
```

#### Authorization Rate Improvement Tool

```bash
curl -X POST http://localhost:8080/api/v1/tools/improveAuthorizationRate/execute \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "MERCH123",
    "timeframe": "last_30_days",
    "transactionType": "card"
  }'
```

#### Calculator Tool

```bash
curl -X POST http://localhost:8080/api/v1/tools/calculate/execute \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "multiply",
    "a": 6,
    "b": 7
  }'
```

### JSON-RPC over stdio

The JSON-RPC over stdio interface accepts JSON-RPC 2.0 requests on stdin and writes responses to stdout. Each request and response is a single line of JSON.

#### Completions Request

```json
{"jsonrpc":"2.0","method":"completions","params":{"query":"How can I improve my authorization rate?","messages":[{"role":"system","content":"You are a helpful PayPal assistant."},{"role":"user","content":"I need to improve my authorization rate. My merchant ID is MERCH123."}],"context":{"merchantId":"MERCH123"}},"id":"1"}
```

#### Execute Function Request

```json
{"jsonrpc":"2.0","method":"executeFunction","params":{"function":"improveAuthorizationRate","arguments":{"merchantId":"MERCH123","timeframe":"last_30_days","transactionType":"card"}},"id":"2"}
```

```json
{"jsonrpc":"2.0","method":"executeFunction","params":{"function":"calculate","arguments":{"operation":"multiply","a":6,"b":7}},"id":"3"}
```

## Response Format

### REST API Response

```json
{
  "content": "Based on the analysis of your authorization rates, here are the recommendations:

Current Authorization Rate: 85.3%
Current Decline Rate: 14.7%
Total Transactions: 12500

Top Decline Reasons:
- insufficient funds: 42.5%
- risk triggers: 23.8%
- expired card: 12.3%
- invalid data: 10.7%
- other: 10.7%

Recommendations to Improve Authorization Rate:
1. Implement Account Updater (Priority: high, Est. Impact: +3.5%)
   Use PayPal's Account Updater service to automatically update expired or replaced cards

2. Optimize AVS Settings (Priority: medium, Est. Impact: +2.1%)
   Adjust Address Verification Service settings to reduce false declines

3. Implement Intelligent Retry Logic (Priority: high, Est. Impact: +4.2%)
   Add smart retry logic for declined transactions with specific reason codes

4. Review Risk Rules (Priority: medium, Est. Impact: +2.8%)
   Analyze and adjust risk rules to reduce false positives",
  "toolCalls": [
    {
      "id": "12345-67890",
      "type": "function",
      "function": {
        "name": "improveAuthorizationRate",
        "arguments": "{\"merchantId\":\"MERCH123\",\"timeframe\":\"last_30_days\",\"transactionType\":\"all\"}"
      }
    }
  ],
  "metadata": {
    "merchantId": "MERCH123",
    "timeframe": "last_30_days"
  }
}
```

### JSON-RPC Response

```json
{"jsonrpc":"2.0","result":{"content":"Based on the analysis of your authorization rates, here are the recommendations:\n\nCurrent Authorization Rate: 85.3%\nCurrent Decline Rate: 14.7%\nTotal Transactions: 12500\n\nTop Decline Reasons:\n- insufficient funds: 42.5%\n- risk triggers: 23.8%\n- expired card: 12.3%\n- invalid data: 10.7%\n- other: 10.7%\n\nRecommendations to Improve Authorization Rate:\n1. Implement Account Updater (Priority: high, Est. Impact: +3.5%)\n   Use PayPal's Account Updater service to automatically update expired or replaced cards\n\n2. Optimize AVS Settings (Priority: medium, Est. Impact: +2.1%)\n   Adjust Address Verification Service settings to reduce false declines\n\n3. Implement Intelligent Retry Logic (Priority: high, Est. Impact: +4.2%)\n   Add smart retry logic for declined transactions with specific reason codes\n\n4. Review Risk Rules (Priority: medium, Est. Impact: +2.8%)\n   Analyze and adjust risk rules to reduce false positives","toolCalls":[{"id":"12345-67890","type":"function","function":{"name":"improveAuthorizationRate","arguments":"{\"merchantId\":\"MERCH123\",\"timeframe\":\"last_30_days\",\"transactionType\":\"all\"}"}}],"metadata":{"merchantId":"MERCH123","timeframe":"last_30_days"}},"id":"1"}
```

## Available Tools

### Authorization Rate Improvement Tool

This tool analyzes transaction data and provides recommendations to improve authorization rates.

**Parameters:**
- `merchantId` (required): The merchant ID to analyze
- `timeframe` (optional): The timeframe for analysis (default: "last_30_days")
- `transactionType` (optional): Transaction type filter (default: "all")

### Calculator Tool

This tool performs basic math operations.

**Parameters:**
- `operation` (required): The operation to perform (add, subtract, multiply, divide)
- `a` (required): First operand
- `b` (required): Second operand

## Docker Deployment

The project includes Docker support for both the REST API server and the JSON-RPC stdio server.

### Building Docker Images

#### Build Both Images Using Docker Compose

```bash
docker-compose build
```

#### Build REST API Server Image Only

```bash
docker build --target rest-api -t paypal-mcp-rest-api .
```

#### Build JSON-RPC Server Image Only

```bash
docker build -f Dockerfile.smithery -t paypal-mcp-jsonrpc .
```

### Running with Docker

#### Run REST API Server

```bash
docker run -p 8080:8080 paypal-mcp-rest-api
```

#### Run JSON-RPC Server

The JSON-RPC server reads from stdin and writes to stdout, so it **MUST** be run with interactive mode:

```bash
docker run -i paypal-mcp-jsonrpc
```

Or use the provided script:

```bash
./run-docker.sh
```

#### Using Docker Compose

Start the REST API server:

```bash
docker-compose up rest-api
```

Note: The JSON-RPC stdio server is not typically run directly with docker-compose since it requires stdin/stdout interaction.

## Troubleshooting

### Common Issues

#### "The server's tool list is not accessible"

If you see an error indicating that the server's tool list is not accessible via a network connection, this is likely because:

1. You're trying to access the server via HTTP when it's running in stdio mode
2. The server is not running in interactive mode, so it can't receive input or send output
3. The `-Djsonrpc.stdio.interactive=true` flag is missing from the startup command

**Solution**: 
- Ensure you're using the JSON-RPC over stdio interface
- Run the server with the `-i` flag if using Docker
- Add the `-Djsonrpc.stdio.interactive=true` flag to the startup command
- Use the `start-non-interactive.sh` script if running in a non-interactive environment

#### "Server fails to initialize in a non-interactive environment"

If the server fails to initialize in a non-interactive environment:

1. Use the `start-non-interactive.sh` script, which is specifically designed for non-interactive environments
2. Run the server with the `-Djsonrpc.stdio.interactive=false` flag
3. Ensure the named pipes are properly set up and accessible

**Solution**:
```bash
./start-non-interactive.sh
```

#### "No response from server"

If the server doesn't respond to requests:

1. Check that the server is running in the correct mode
2. Verify that stdin/stdout are properly connected
3. Check the logs for any errors

**Solution**:
- Run the server with the `test-stdio.sh` script to verify it works correctly
- Use the `start-non-interactive.sh` script and check the named pipes
- Check the log file for any errors

## License

This project is licensed under the MIT License - see the LICENSE file for details.
