# JVM Diagnostics MCP

This is an [MCP Server](https://modelcontextprotocol.io) that wraps various JVM diagnostic tools (CLI) such as `jstat`, `jcmd`, `jps`, adds a nice prompt to improve how they work, and exposes them.

## What can it do?

It has access to various JVM diagnostic tools, so it can perform tasks such as:

- Monitoring JVM performance metrics using `jstat`.
- Inspecting and managing JVM processes with `jps`.
- Executing diagnostic commands with `jcmd`.
- Analyzing thread dumps, heap dumps, and other JVM-related diagnostics.

## Is it safe to use?

As the MCP server is driven by an LLM, we recommend being cautious and validating the commands it generates. If you're using a reliable LLM like Claude 3.7 or GPT-4o, which has excellent training data on JVM tools, our experience has been very good.

Please read our [License](LICENSE) which states that "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND", so you use this MCP server at your own risk.

## Is it secured, and should I run this on a remote server?

Short answer: **NO**.

This MCP server runs JVM diagnostic commands for you and could be exploited by an attacker to run other commands. The current implementation, as with most MCP servers at the moment, only works with the `stdio` transport: it's supposed to run locally on your machine, using your JVM tools, as you would do by yourself.

In the future, it's possible to have this MCP server support the `http` transport and token-based authentication, so that it could be used remotely by different persons. This will be considered once the MCP specification and SDK are more stable.

## How do I install it?

This MCP server currently only works with the `stdio` transport, so it should run locally on your machine, using your JVM diagnostic tools.

_This server can run as a Java application or inside a Docker container._ If Java is installed on your machine, this first option is probably the easiest one. If you don't have Java installed, or if you want to have something a bit more secure, you can use the second option.

### Install and configure the server with Java

- Make sure you have Java 17 or higher installed. You can check this by running `java -version` in your terminal.
- Ensure that JVM diagnostic tools like `jstat`, `jcmd`, and `jps` are available in your environment.

Binaries are available on the [GitHub Release page](https://github.com/brunoborges/jvm-diagnostics-mcp/releases), here's how you can download the latest one with the GitHub CLI:

- Download the latest release: `gh release download --repo brunoborges/jvm-diagnostics-mcp --pattern='jvm-diagnostics-mcp.jar'`

To use the server from Claude Desktop, add the server to your `claude_desktop_config.json` file. Please note that you need to point to the location where you downloaded the `jvm-diagnostics-mcp.jar` file.

```json
{
    "mcpServers": {
        "jvm-diagnostics": {
            "command": "java",
            "args": [
                "-jar",
              "~/Downloads/jvm-diagnostics-mcp.jar"
            ]
        }
    }
}
```

To use the server from VS Code Insiders, here are the steps to configure it:

- Install GitHub Copilot
- Install this MCP Server using the command palette: `MCP: Add Server...`
- Configure GitHub Copilot to run in `Agent` mode, by clicking on the arrow at the bottom of the chat window
- On top of the chat window, you should see the `jvm-diagnostics-mcp` server configured as a tool

### Install and configure the server with Docker

To use the server from Claude Desktop, add the server to your `claude_desktop_config.json` file. The `JAVA_HOME` environment variable should be set to the location of your Java installation.

```json
{
  "mcpServers": {
    "jvm-diagnostics": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "JAVA_HOME",
        "ghcr.io/brunoborges/jvm-diagnostics-mcp:latest"
      ],
      "env": {
        "JAVA_HOME": "/path/to/java/home"
      }
    }
  }
}
```

To use the server from VS Code Insiders, here are the steps to configure it:

- Install GitHub Copilot
- Install this MCP Server using the command palette: `MCP: Add Server...`
- Configure GitHub Copilot to run in `Agent` mode, by clicking on the arrow at the bottom of the chat window
- On top of the chat window, you should see the `jvm-diagnostics-mcp` server configured as a tool

