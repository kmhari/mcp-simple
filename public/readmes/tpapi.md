# ThemeParks.wiki API MCP Server

This is an MCP Server that exposes data from the [ThemeParks.wiki API](https://themeparks.wiki/api)
as tools.

## Features

- Get theme park operating hours
- Get attraction wait times
- Get show times

## API

### Tools 

- getEntityChildren
  - Get a list of attractions and shows in a park given the park's entity ID
  - input: `entityId` (string)
- getEntityScheduleForDate
  - Get a park's operating hours given the park's entity ID and a specific date (in yyyy-MM-dd format).
  - input: 
    - `entityId` (string)
    - `date` (string; yyyy-MM-dd)
- getAllParks
  - Get a list of all parks (including their name and entity ID)
- getParksByName
  - Get a list of parks (including their name and entity ID) given a park name or resort name
  - input: `entityId` (string)
- getEntity
  - Get an entity given its entity ID
  - input: `entityId` (string)
- getEntityLive
  - Get an attraction's wait times or a show's show times given the attraction or show entity ID
  - input: `entityId` (string)

## Building the server

To build the server as an executable JAR file, run the following command:

```shell
./gradlew build
```

This will require Java 21 (or higher) to be installed. I recommend using [SDKMAN!](https://sdkman.io) 
to install and manage Java versions.

The JAR file will be placed in `build/libs/kt-mcp-server-0.0.1-SNAPSHOT.jar`.
Do not try to run this executable JAR file yourself. The MCP Client (such as 
Claude Desktop) will run the server for you.

Optionally, to build the server as a Docker image, run the following command:

```shell
./gradlew bootBuildImage --imageName=habuma/tpapi-mcp-server
```

Do not attempt to run this Docker image yourself. The MCP Client (such as
Claude Desktop) will run the server for you.

## Usage with Claude Desktop

You can use the ThemeParks.wiki API MCP Server in Claude Desktop by adding
configuration to `claude_desktop_config.json`. Change the paths below to 
correctly reference the Java command line and the  location of the executable 
JAR file:

```json
{
  "mcpServers": {
    "tpapi": {
      "command": "/path/to/java",
      "args": [
        "-jar",
        "/path/to/project/build/libs/tpapi-mcp-server-0.0.1-SNAPSHOT.jar"
      ]
    }
  }
}
```

