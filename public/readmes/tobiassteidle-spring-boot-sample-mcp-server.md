This is a sample implementation of a Model Context Protocol (MCP) server using Spring Boot. The server is designed to be used with the Model Context Protocol Inspector for testing and debugging. It provides a simple REST API to interact with the server and demonstrates how to set up a basic Spring Boot application. Unit tests are included to verify the functionality of the server.
## 📋 Table of Contents
- [What is MCP?](#what-is-mcp)
- [Requirements](#requirements)
- [Configuration for e.g. Claude Desktop](#configuration-for-eg-claude-desktop)
- [Development](#development)
    - [Debugging](#debugging)
        - [Install MCP Inspector](#install-mcp-inspector)
        - [Run MCP Inspector for Testing](#run-mcp-inspector-for-testing)
            - [Build MCP Server](#build-mcp-server)
            - [Run MCP Inspector](#run-mcp-inspector)


## 🧠 What is MCP?
Model Context Protocol (MCP) is an open standard that defines how AI models communicate with external tools and data sources. It creates a standardized way for AI assistants like Claude to access:
- 🌐 Real-time information
- 📊 Custom databases
- 🔄 APIs and services
- 📁 File systems

Think of MCP as the "USB standard for AI" - it provides a common interface that allows any AI model to interact with various tools through a consistent protocol.
Benefits of using MCP with Spring Boot:
- 🔄 **Seamless Integration**: Easily expose your application's functionality to AI assistants
- 🛠️ **Tool Definition**: Define custom tools using simple annotations
- 🚀 **Spring Boot Simplicity**: Leverage Spring's dependency injection and configuration management
- 📈 **Enhanced AI Capabilities**: Give AI models access to your organization's real-time data and services

### Requirements
- Java 17+
- Maven
- MCP Inspector (optional for testing)

### Configuration for e.g. Claude Desktop
``` json
{
  "mcpServers": {
    "sample-mcp-server": {
      "command": "java",
      "args": [
        "-jar",
        "sample-mcp-server-0.0.1-SNAPSHOT.jar",
        "--port",
        "8080",
        "--host",
        "localhost"
      ],
      "env": {
        "JAVA_TOOL_OPTIONS": "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"
      }
    }
  }
}
```
Note: The `JAVA_TOOL_OPTIONS` environment variable is used to set the JVM options for remote debugging. The address and port can be changed as needed.
## 💻 Development
### Debugging
#### Install MCP Inspector
``` bash
npm -g install @modelcontextprotocol/inspector
```
#### Run MCP Inspector for Testing
##### Build MCP Server
``` bash
mvn clean package
```
##### Run MCP Inspector
``` bash
npx @modelcontextprotocol/inspector \
    -e JAVA_TOOL_OPTIONS=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 \
    java -jar target/sample-mcp-server-<version>-SNAPSHOT.jar \
    --port 8080 --host localhost
```
Note: The `JAVA_TOOL_OPTIONS` environment variable is used to set the JVM options for remote debugging. The address and port can be changed as needed.
Now you can use the MCP Inspector to test and debug your Spring Boot MCP server. The inspector provides a user-friendly interface (Browser) to interact with the server and visualize the data being exchanged. The inspector can be used to send requests to the server, view the responses, and analyze the data flow between the client and server.
To debug the server, you can set breakpoints in your code and use the debugger in your IDE to step through the code and inspect variables. Attach the debugger to the running server using the remote debugging options specified in the `JAVA_TOOL_OPTIONS` environment variable.


Spring AI extends the MCP Java SDK with productivity enhancements that make it straightforward to build MCP servers [[1]](https://spring.io/blog/2025/02/14/mcp-java-sdk-released-2).
## 🔧 Using This Server with Claude Desktop
This sample server can be integrated with Claude Desktop or other AI assistants that support MCP. After [configuring the server](#configuration-for-eg-claude-desktop) in your AI assistant:
1. Start this Spring Boot MCP server
2. Open Claude Desktop and enable the server in settings
3. Ask Claude questions that require the tools provided by this server
4. Watch as Claude seamlessly uses the server to access data and perform actions


