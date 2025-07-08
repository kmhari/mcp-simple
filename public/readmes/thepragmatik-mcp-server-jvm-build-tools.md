# MCP Server - Build Tools

A brief overview of what the project does and its purpose.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview
Describe the project, its goals, and any background context.
For example:
This project is to demonstrate an MCP server that enables users to interact with Maven (for now) using natural language.
It aims to showcase how build tools can be exposed via MCP and offer a natural, intuitive way of building projects.

## Prerequisites
List the software and tools needed before installing the project:
- Java 21 or later
- Maven
- MCP Client (Claude, Goose etc)
- optionally, a local LLM if you are using MCP client like Goose

## Features
- **Simple to use:** Set this up with any MCP client and LLM of your choice to invoke builds using natural language. No need to remember plugins, goals and arguments! and
- **Supports Apache Maven:** For now it only support Apache Maven. We might extend it for other build tools if there is interest.


## Installation (For Claude Desktop)
1. **Add this MCP server to Claude:**

   Locate the `claude_desktop_config.json` file under Claude installation directory
 
   For MacOs, this is at:

    `~/Library/Application\ Support/Claude/claude_desktop_config.json`

    Then, add something like the following to it (replace the placeholders):
    ```
    {
        "mcpServers": {
            "maven-tools": {
                "command": "<path-to-java-home-directory>/bin/java",
                "args": [
                    "-jar",
                    "-Dmaven.home=<path-to-maven-home-directory>",
                    "<path-to-the-mcp-maven-server.jar>"
                ]
            }
        }
    }
    ```

2. You may need to restart the Claude client. This will start the MCP server for build tools.

3. You should now be ready to interact with Maven via the MCP server using the Claude desktop. Go ahead submit a task in natural language to build a project.


## Contributing
1. Use Github Issues to open issues or feature requests.

## License 
This repo is licensed under the Apache License. See the [LICENSE](LICENSE) file for details