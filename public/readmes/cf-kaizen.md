# cf-kaizen

[![GA](https://img.shields.io/badge/Release-Alpha-darkred)](https://img.shields.io/badge/Release-Alpha-darkred) ![Github Action CI Workflow Status](https://github.com/cf-toolsuite/cf-kaizen/actions/workflows/ci.yml/badge.svg) [![Known Vulnerabilities](https://snyk.io/test/github/cf-toolsuite/cf-kaizen/badge.svg?style=plastic)](https://snyk.io/test/github/cf-toolsuite/cf-kaizen) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Introduction

cf-kaizen is a multi-module Spring Boot project that leverages Spring AI to provide a natural language interface for interacting with Cloud Foundry foundations. The project hosts clients generated from OpenAPI derivatives of [cf-butler](https://github.com/cf-toolsuite/cf-butler) and [cf-hoover](https://github.com/cf-toolsuite/cf-hoover) APIs, combined with Spring AI implementation to enable conversational interaction with Cloud Foundry resources.

The primary use case is to allow users to interact with one or more Cloud Foundry foundations using natural language without explicitly having to be aware of the Cloud Foundry APIs.

* [Architecture](#architecture)
* [Tech stack](#tec)
* How to
    * [Build](#how-to-build)
    * [Run](#how-to-run)
    * Integrate w/ cf-butler and cf-hoover hosted on
      * [Cloud Foundry](docs/CF.md)
      * [Korifi](docs/KORIFI.md) (under development)
    * Run with
      * [Claude Desktop](docs/CLAUDE.md)
      * [LibreChat](docs/LIBRECHAT.md)

## Architecture

cf-kaizen follows a modular architecture with several components working together:

### Core Components

1. **MCP Servers**
    - Butler Server: Provides API access to Cloud Foundry foundation resources (organizations, spaces, applications, service instances, etc.)
    - Hoover Server: Provides aggregated API access to Cloud Foundry foundations' resources

2. **MCP Clients**
    - Butler Frontend: A reactive web application that serves as the chat UI for interacting with Butler server
    - Hoover Frontend: A reactive web application that serves as the chat UI for interacting with Hoover server

3. **Model Context Protocol (MCP) Integration**
    - Enables the clients to connect to AI models like Claude Desktop through standardized protocol
    - Allows AI models to access tools and resources defined in cf-kaizen

### Architectural Diagram

```
                     ┌───────────────────┐
                     │                   │
                 ┌───┤  Claude Desktop   │
                 │   │  or LibreChat     │
                 │   │                   │
                 │   └─────────────────��─┘
                 ▼
┌─────────────────┐     ┌───────────────────┐
│                 │     │                   │
│  cf-kaizen      │◄────┤  Spring AI MCP    │
│  MCP Servers    │     │  Client           │
│                 │     │                   │
└────────┬────────┘     └───────────────────┘
         │
         ▼
┌─────────────────┐     ┌───────────────────┐
│                 │     │                   │
│  cf-butler and  │     │  Cloud Foundry    │
│  cf-hoover APIs │◄────┤  Foundation       │
│                 │     │                   │
└─────────────────┘     └───────────────────┘
```

## Technology Stack

### Backend

- **Java 21**: Base programming language
- **Spring Boot 3.4.x+**: Primary application framework
- **Spring WebFlux**: Reactive web framework
- **Spring AI**: Framework for AI model integration
- **Model Context Protocol (MCP)**: Protocol for AI model interaction with external tools
- **Spring Cloud**: For Cloud Foundry integration
- **Caffeine**: In-memory caching
- **Resilience4j**: Fault tolerance library

### Frontend

- **React 18**: JavaScript library for building UI
- **Vite**: Build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible components
- **React Markdown**: Markdown rendering

### Build Tools

- **Maven 3.9.x+**: Primary build tool
- **frontend-maven-plugin**: For integrating frontend build with Maven
- **Node.js v23.4.0**: JavaScript runtime for frontend build
- **npm 10.9.2**: Package manager for JavaScript dependencies

## How to Build

### Prerequisites

- Git CLI (2.43.0 or better)
- GitHub CLI (2.65.0 or better)
- Java SDK (21 or better)
- Maven (3.9.9 or better)

### Building the Project

1. Clone the repository:

```bash
git clone https://github.com/cf-toolsuite/cf-kaizen
```

2. Navigate to the project directory:

```bash
cd cf-kaizen
```

3. Build with Maven:

```bash
mvn clean install
```

This will:

- Build the Java backend components
- Download and install Node.js and npm (via frontend-maven-plugin)
- Install JavaScript dependencies
- Build the React frontend applications
- Package everything into executable JARs

## How to Run

### Running with JDK/JRE and Maven

1. Start Butler:

```bash
# Open a terminal session
# Target root of cf-kaizen project source, then...
cd butler
# Replace the application domain below with your own
export CF_APP_DOMAIN=apps.dhaka.cf-app.com
# If the name of the cf-butler instance on the foundation
# you are targeting is named differently, be sure to update the value
export CF_BUTLER_API_ENDPOINT=https://cf-butler.${CF_APP_DOMAIN}
mvn spring-boot:run -Dspring-boot.run.profiles=cloud,dev
# Open a separate terminal session, target the root of cf-kaizen project source, then...
cd clients/butler
mvn spring-boot:run -Dspring-boot.run.profiles=openai,dev
```

2. Start Hoover:

```bash
# Open a terminal session
# Target root of cf-kaizen project source, then...
cd hoover
# Replace the application domain below with your own
export CF_APP_DOMAIN=apps.dhaka.cf-app.com
# If the name of the cf-hoover instance on the foundation
# you are targeting is named differently, be sure to update the value
export CF_BUTLER_API_ENDPOINT=https://cf-hoover.${CF_APP_DOMAIN}
# Open a separate terminal session, target the root of cf-kaizen project source, then...
cd clients/hoover
mvn spring-boot:run -Dspring-boot.run.profiles=openai,dev
```

3. Access the applications in your browser:
    - Butler frontend: http://localhost:8081
    - Hoover frontend: http://localhost:8083

### Integration with Claude Desktop

1. Install Claude Desktop
2. Create a configuration file:

```json
"cf-kaizen-butler-client": {
  "command": "java",
  "args": [
    "-jar",
    "-Ddefault.url=<cf-butler-application-instance-api-endpoint>",
    "<path-to-project>/target/cf-kaizen-butler-server-0.0.1-SNAPSHOT.jar"
  ]
}
```

3. Replace placeholders with appropriate values
4. Restart Claude Desktop
5. Verify that new tool calls are available in Claude

## Configuration Options

cf-kaizen supports multiple configuration profiles:

### Spring AI Configuration

The application can be configured to use different AI model providers:

- **OpenAI** (default)
- **Groq Cloud**
- **Ollama** (local models)
- **OpenRouter**

Configuration is specified in `application.yml` and can be overridden with environment variables or command-line arguments.

### Sample Configuration

```yaml
spring:
  application:
    name: cf-kaizen-butler-frontend

  ai:
    mcp:
      client:
        name: ${MCP_CLIENT_NAME:butler}
        request-timeout: 120s
        type: ASYNC
        sse:
          connections:
            butler:
              url: ${CF_KAIZEN_BUTLER_SERVER_URL:http://localhost:8082}

  # Additional configuration options...
```

## Cloud Foundry Deployment

cf-kaizen can be deployed to Cloud Foundry using standard cf CLI commands:

E.g.,

```bash
cf push cf-kaizen-butler-frontend -m 1G -p ./target/cf-kaizen-butler-frontend-0.0.1-SNAPSHOT.jar
```

Consult the [documentation](https://github.com/cf-toolsuite/cf-kaizen/blob/main/docs/CF.md) for detailed deployment instructions on Cloud Foundry.

## Development

### Project Structure

```
cf-kaizen/
├── butler/               # Butler MCP server
├── clients/              # Frontend clients
│   ├── butler/           # Butler client frontend
│   ├── hoover/           # Hoover client frontend
│   └── docker/           # Docker configurations
├── config/               # Configuration files
├── docs/                 # Documentation
├── hoover/               # Hoover MCP server
└── scripts/              # Helper scripts
```

### Adding Features

1. Create a new tool in the appropriate MCP server
2. Implement the tool functionality
3. Configure the MCP client to discover and use the tool
4. Update the system prompt if needed

## Conclusion

cf-kaizen provides a powerful, AI-driven interface to Cloud Foundry foundations, enabling natural language interactions with Cloud Foundry resources. By leveraging Spring AI and the Model Context Protocol, it offers a standardized way to connect AI models with Cloud Foundry data and operations.

## Resources

- [cf-butler](https://github.com/cf-toolsuite/cf-butler)
- [cf-hoover](https://github.com/cf-toolsuite/cf-hoover)
- [Spring AI Documentation](https://docs.spring.io/spring-ai/reference/index.html)
- [Model Context Protocol](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html)
