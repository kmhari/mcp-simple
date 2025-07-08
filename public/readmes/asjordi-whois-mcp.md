# WHOIS MCP

A WHOIS lookup service implemented as a Model Context Protocol (MCP) server.

## Overview

WHOIS MCP is a Java application that provides WHOIS lookup functionality through the Model Context Protocol. It allows users to query WHOIS information for domains using a standardized interface. The server communicates over standard input/output, making it compatible with MCP clients.

## Demo

https://github.com/user-attachments/assets/037a30de-c330-4dd4-93c2-2add936b9caf

https://github.com/user-attachments/assets/2a91045a-b922-4832-9500-dc9eacb54ee0

https://github.com/user-attachments/assets/befbb1e0-137c-4534-b7f7-433305a41755

## Features

- Domain validation and sanitization
- Caching of WHOIS server information
- Fallback to IANA WHOIS server when specific servers are not found
- Comprehensive error handling
- Integration with the Model Context Protocol

## Installation

### Prerequisites

- Java 21 or higher
- Maven 3.6 or higher

### Building the Project

1. Clone the repository:
   ```
   git clone https://github.com/asjordi/whois-mcp.git
   cd whois-mcp
   ```

2. Build with Maven:
   ```
   mvn clean package
   ```
   
This will create an executable JAR file in the `target` directory.

3. You can open the project in your favorite IDE (e.g., IntelliJ IDEA, Eclipse) for easier development and debugging.

## Debugging the Server

To debug the server, you can use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).

1. First build the project with:

```
mvn clean package
```

2. Run the MCP Inspector with the following command:

```
npx @modelcontextprotocol/inspector
```

3. Set the following values:
- **Transport**: `STDIO`
- **Command**: `java`
- **Arguments**: `-jar PATH\\target\\whois-mcp-1.0-SNAPSHOT.jar`

4. Click on the **Connect** button to start the MCP Inspector and connect to the server.

## Usage

Once configured, the WHOIS MCP server will be automatically available to any MCP client that supports the protocol.

### Claude

Go to Menu > File > Settings > Developer > Edit Config and add the following to your `claude_desktop_config.json` file:

```json
{
   "mcpServers": {
      "whois-mcp-server": {
         "command": "java",
         "args": [
            "-jar",
            "PATH\\target\\whois-mcp-1.0-SNAPSHOT.jar"
         ]
      }
   }
}
```

Save the file and restart the application. You can now use the WHOIS MCP server by sending requests to it.

### VSCode

Open `settings.json` and add the following configuration:

```json
"mcp": {
 "servers": {
   "whois-mcp-server": {
     "type": "stdio",
     "command": "java",
     "args": [
       "-jar",
       "PATH\\whois-mcp\\target\\whois-mcp-1.0-SNAPSHOT.jar"
     ]
   }
 }
}
```

Save the file and restart the application. Open Copilot and set mode to `Agent` to use the WHOIS MCP server.

## Project Structure

The project is structured around the following key components:

### Main Components

- **Main**: Entry point of the application that initializes and starts the MCP server.
- **WhoisService**: Core service that performs WHOIS queries using the Apache Commons Net library.
- **WhoisCache**: Caches WHOIS server information based on domain extensions.
- **DomainValidatorUtil**: Validates domain names using the Apache Commons Validator.
- **DomainSanitizer**: Sanitizes domain names by removing unnecessary characters and ensuring proper formatting.
- **McpException**: Custom exception class for handling errors specific to the WHOIS MCP server.

### Flow

1. The MCP server receives a request with a domain name.
2. The domain is validated and sanitized.
3. The appropriate WHOIS server is determined from the cache based on the domain extension.
4. A WHOIS query is performed against the server.
5. The result is returned to the client through the MCP protocol.

### Whois Server Mapping

WHOIS server mappings are configured in the `whois-servers.properties` file, which maps top-level domains to their respective WHOIS servers. If this file is not available, a default set of servers is used.

### Dependencies

- **Model Context Protocol SDK**: For implementing the MCP server
- **SLF4J**: For logging
- **Apache Commons Net**: For WHOIS client functionality
- **Apache Commons Validator**: For domain validation
- **JUnit Jupiter**: For testing

## Testing

The project includes comprehensive unit tests for all components. Run the tests with:

```
mvn test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Jordi Ayala - [asjordi.dev](https://asjordi.dev)

[Root Zone Database](https://www.iana.org/domains/root/db)
