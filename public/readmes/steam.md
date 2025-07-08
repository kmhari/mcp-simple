# How to build

```shell
./gradlew :bootJar
```
# How to run

claude_desktop_config.json:
```json
{
  "mcpServers": {
    "spring-ai": {
      "command": "java",
      "args": [
        "-Dspring.ai.mcp.server.transport=STDIO",
        "-Dspring.ai.mcp.server.stdio=true",
        "-Dspring.main.bannerMode=off",
        "-Dlogging.pattern.console=",
        "-jar",
        "PATH_TO_PROJECT\\build\\libs\\exi-mcp-1.0-SNAPSHOT.jar",
        "--my_steam_id=YOUR_STEAM_ID",
        "--my_steam_key=YOUR_STEAM_API_KEY"
      ]
    }
  }
}
```