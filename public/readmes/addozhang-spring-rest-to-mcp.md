# Spring Web to MCP Converter 🚀

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

An [OpenRewrite](https://docs.openrewrite.org/) recipe collection that automatically converts Spring Web REST APIs to Spring AI Model Context Protocol (MCP) server tools.

## 📋 Introduction

This project provides a set of OpenRewrite recipes that help you migrate traditional Spring Web REST APIs to Spring AI's Model Context Protocol (MCP) server tools. The transformation includes:

1. 🔄 Converting Spring Web annotations to Spring AI MCP `@Tool` annotations
2. 🔧 Adding necessary MCP configuration and components
3. 📦 Updating Maven dependencies to include Spring AI MCP server components

The recipes automatically extract documentation from your existing REST controllers to create properly documented MCP tools, making your APIs accessible to AI agents through the [Model Context Protocol](https://modelcontextprotocol.io/).

For more details about Spring AI's implementation of MCP, see the [Spring AI MCP documentation](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html).

## 🛠️ How to Build and Install

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Prerequisites for Target REST API Projects

To successfully migrate your Spring Web REST API to MCP, your project should:

- Use Spring Boot 3.2+ (3.2.0 or newer)
- Use Spring Web MVC for REST controllers
- Use Maven build tool

The recipe adds Spring AI MCP dependencies (version 1.0.0-SNAPSHOT or newer) to your project automatically.

### Build Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/web-to-mcp.git
   cd web-to-mcp
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

This will compile the code and install the artifact to your local Maven repository.

## 🔥 How to Use

To apply the recipes to your Spring Web project, run the following Maven command:

```bash
mvn org.openrewrite.maven:rewrite-maven-plugin:6.4.0:run \
  -Drewrite.activeRecipes=RewriteWebToMCP \
  -Drewrite.recipeArtifactCoordinates=com.atbug.rewrite:web-to-mcp:1.0-SNAPSHOT \
  -Drewrite.exportDatatables=true
```

**Important**: This command needs to be executed twice:
1. First execution will update your pom.xml to add necessary repositories and dependencies
2. Second execution will perform the actual code conversion of your Spring Web controllers to MCP tools

## ✨ Features

The recipe performs several transformations that are organized into three main components:

### 1. POM Updates (`UpdatePom`)
- Adds Spring Snapshots repository (`https://repo.spring.io/snapshot`)
- Adds Central Portal Snapshots repository (`https://central.sonatype.com/repository/maven-snapshots/`)
- Adds Spring AI MCP server WebMVC dependency (`spring-ai-starter-mcp-server-webmvc`)

### 2. Code Transformations
- **`AddToolAnnotationToMappingMethod`**: Automatically converts Spring Web controller methods to MCP tools
  - Adds `@Tool` annotations to methods with Spring Web mapping annotations (`@GetMapping`, `@PostMapping`, etc.)
  - Extracts method descriptions from JavaDoc comments to populate the `description` attribute
  - Adds `@ToolParam` annotations to method parameters, preserving their descriptions from JavaDoc
  
- **`AddToolCallbackProviderBean`**: Creates or updates a bean to register MCP tools
  - Identifies Spring Boot application entry point class
  - Creates a `ToolCallbackProvider` bean to register all controllers with `@Tool` annotations
  - Intelligently updates existing provider beans if they already exist
  
- **`AddSpringAIMcpProperties`**: Configures MCP server properties 
  - Adds required MCP server configuration to `application.properties` or `application.yml`
  - Sets server name, version, type, and message endpoints
  - Supports both YAML and Properties file formats

## 🧪 Example

### Before (Spring Web Controller)

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    /**
     * Get a user by ID
     * @param id The user identifier
     * @return The user details
     */
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        // Implementation
    }
}
```

### After (MCP Tool)

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    /**
     * Get a user by ID
     * @param id The user identifier
     * @return The user details
     */
    @GetMapping("/{id}")
    @Tool(description = "Get a user by ID")
    public User getUserById(@ToolParam(description = "The user identifier") @PathVariable Long id) {
        // Implementation
    }
}
```

### Generated MCP Configuration

The recipe will also automatically add MCP server configuration to your application properties:

```properties
spring.ai.mcp.server.name=webmvc-mcp-server
spring.ai.mcp.server.sse-message-endpoint=/mcp/messages
spring.ai.mcp.server.type=SYNC
spring.ai.mcp.server.version=1.0.0
```

And automatically register your tools by adding a `ToolCallbackProvider` bean to your Spring Boot application class:

```java
@Bean
ToolCallbackProvider toolCallbackProvider(UserController userController) {
    return MethodToolCallbackProvider.builder()
            .toolObjects(userController)
            .build();
}
```

## 🌟 Demonstration

You can try out this conversion tool with a sample Spring Boot 3 REST API project that's ready for conversion.

### Sample Project Setup

1. Clone the sample project:
   ```bash
   git clone https://github.com/addozhang/spring-boot-3-rest-api-sample.git
   cd spring-boot-3-rest-api-sample
   ```

2. Review the sample project structure:
   - It's a standard Spring Boot 3 application with REST controllers
   - Includes typical REST endpoints with various HTTP methods (GET, POST, PUT, DELETE)
   - Contains proper JavaDoc comments that will be converted to MCP tool descriptions

### Conversion Process

1. First, run the Maven command to update the POM file with required dependencies:
   ```bash
   mvn org.openrewrite.maven:rewrite-maven-plugin:6.4.0:run \
     -Drewrite.activeRecipes=RewriteWebToMCP \
     -Drewrite.recipeArtifactCoordinates=com.atbug.rewrite:spring-rest-to-mcp:1.0-SNAPSHOT \
     -Drewrite.exportDatatables=true
   ```

2. Then, run the same command again to perform the actual code conversion:
   ```bash
   mvn org.openrewrite.maven:rewrite-maven-plugin:6.4.0:run \
     -Drewrite.activeRecipes=RewriteWebToMCP \
     -Drewrite.recipeArtifactCoordinates=com.atbug.rewrite:spring-rest-to-mcp:1.0-SNAPSHOT \
     -Drewrite.exportDatatables=true
   ```

3. Verify the changes:
   - Check your controller classes for added `@Tool` and `@ToolParam` annotations
   - Look for the new `ToolCallbackProvider` bean in your main application class
   - Check that `application.properties` or `application.yml` has MCP server configuration

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

5. Test your MCP server using the official MCP Inspector:
   - Clone the MCP Inspector repository:
     ```bash
     git clone https://github.com/modelcontextprotocol/inspector.git
     cd inspector
     ```
   - Install dependencies and start the inspector:
     ```bash
     npm install
     npm run dev
     ```
   - Access the inspector in your browser at: http://localhost:5173/
   - In the left side panel, configure your MCP server with:
     - Type: SSE
     - Address: http://localhost:8080/sse
   - Once connected, you can:
     - View all available tools in the main panel
     - Test each tool interactively
     - See the responses from your MCP server

### What to Expect

After conversion, your Spring Boot application will function both as a traditional REST API and as an MCP server. This means:

- All your existing endpoints continue to work as before
- Applications that support the MCP protocol can discover and interact with your API
- AI assistants can understand how to use your tools through the MCP protocol's standardized format

Applications consuming your MCP server can be configured to connect to it with configuration like:

```json
{
  "mcpServers": {
    "spring-ai-mcp-sample": {
      "autoApprove": [],
      "disabled": false,
      "timeout": 60,
      "url": "http://localhost:8080/sse",
      "transportType": "sse"
    }
  }
}
```

This allows client applications to seamlessly discover and utilize the tools provided by your converted API.

## 📄 License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
