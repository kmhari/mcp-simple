# Spring MCP Server

The Model Context Protocol is an open standard that enables developers to build secure, two-way connections between their data sources and AI-powered tools. 
The architecture is straightforward: developers can either expose their data through MCP servers or build AI applications (MCP clients) that connect to these servers.

## Prerequisites

- Java 21
- Maven 3.9.9
- Spring Boot 3.4.4
- Spring AI 0.4.0
- Spring Model Context Protocol Server
- Claude Desktop Application

## Getting Started

In this example, we will create a simple Spring Boot application that serves as an MCP server.

### 1. Create a Spring Boot Application

Create a new Spring Boot application using the Spring Initializr or your preferred method.
You can use the following dependencies:

- Spring Model Context Protocol Server

#### Creating record

Create a record class that will represent the information you want to expose through the MCP server.

```java
package org.sehn.spring_mcp;

public record Info(String title, String url) {
}
```

#### Creating services

Create a service class that will provide the information you want to expose through the MCP server.

```java
package org.sehn.spring_mcp;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InfoService {

    private static final Logger logger = LoggerFactory.getLogger(InfoService.class);

    private List<Info> information = new ArrayList<>();

    @Tool(name = "dr_get_information", description = "Get a list of information about Deepanshu Rawat")
    public List<Info> getInformation() {
        return information;
    }

    @Tool(name = "dr_get_info", description = "Get a specific information about Deepanshu Rawat")
    public Info getInfo(String title) {
        return information.stream().filter(info -> info.title().equals(title)).findFirst().orElse(null);
    }

    @PostConstruct
    public void init() {
        information.addAll(List.of(
                new Info("Portfolio", "https://bento.me/deepanshu-rawat6"),
                new Info("GitHub", "https://github.com/deepanshu-rawat6"),
                new Info("LinkedIn", "https://www.linkedin.com/in/deepanshu-rawat6/"),
                new Info("Twitter", "https://twitter.com/deepanshuurawat")
        ));


    }
}
```

#### Creating a Tool Callback

In the `SpringMCPApplication` or your main application class, create a tool callback that will handle the requests from the MCP server.

```java
    @Bean
    public List<ToolCallback> deepanshuTools(InfoService infoService) {
        return List.of(ToolCallbacks.from(infoService));
    }
```

#### Adding Configuration

Create a configuration class that will configure the MCP server.

```properties
spring.application.name=spring_mcp
spring.main.web-application-type=none
spring.ai.mcp.server.name=spring_mcp
spring.ai.mcp.server.version=0.0.1


spring.main.banner-mode=off
logging.pattern.console=
```

### 2. Build the Application

Simply run the following command to build the application:

```bash
mvn clean package -DskipTests
```

### 3. Further configuration

Now, in order to use the MCP server, you need to add the following configuration in your `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "<name_of_the_mcp_server>": {
            "command": "java",
            "args": [
                "-jar",
                "<Path_of_the_jar_file_created_after_building>"
            ]
        }
    }
}
```
Replace `<name_of_the_mcp_server>` with the name of your MCP server and `<Path_of_the_jar_file_created_after_building>` with the path to the jar file created after building the application. 

For example, name of my MCP server is `spring_mcp`.

### 4. Testing the MCP Server

Now, start `Claude Desktop` and a few new things will appear underneath the prompt area:

#### Installed MCP Servers

![Share_context_with_Claude](./img/Share_context_with_Claude.png)

#### Available MCP tools

![Available_MCP_tools](./img/Available_MCP_tools.png)

Now, upon hitting a prompt, say for example: `Get me the information about Deepanshu Rawat`, you will get a alert about `third-party` tools being used, simply accept the alert for the current chat.
And then you will get a response, like this:

![response_from_server](./img/response_from_server.png)

