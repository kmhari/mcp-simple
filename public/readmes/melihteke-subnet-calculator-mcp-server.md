# Subnet Calculator MCP Server
![alt text](images/image-8.png)
This project provides a simple MCP (Model Context Protocol) server for calculating subnet details based on a given CIDR (Classless Inter-Domain Routing) notation. It uses the FastMCP library to expose the subnet calculation functionality as a tool.

## Features
1. Calculate subnet details for a given CIDR.
2. Provides:
- Network address
- Broadcast address
- Netmask
- Wildcard mask
- Usable host range
- Number of usable hosts
3. Runs as an MCP server with SSE (Server-Sent Events) transport.

## Requirements
- Python 3.7+
- fastmcp library

## Installation
- Clone the repository or copy the script.
- Install the required dependencies:
```sh
pip install fastmcp mcp[cli]
```

## Usage
THis MCP runs with SSE transport mode.

Run the MCP server:
```sh
python main.py
```

## How to add this Server to your MCP Client

### Goose MCP Client
- Click Menu ("..." icon) and select Advanced settings:

![alt text](images/image.png)

![alt text](images/image-1.png)

- Go extentions section

![alt text](images/image-2.png)

- Select "Add custom extentions"

![alt text](images/image-3.png)

- Select Server-Sent Events as Type
- Select a random ID
- Select Name for the MCP Server
- Sleect Description
- Enter URI : https://mcp-subnet-calculator.mteke.com/sse
- Click Add button

![alt text](images/image-5.png)

Now the MCP Server(extention is added and enabled)
![alt text](images/image-6.png)

Now the MCP server is activated:
![alt text](images/image-7.png)


You can watch the video to demonstrate how to enable mcp server on Goose Client App:
[![Watch the demo](https://img.youtube.com/vi/SZ-UcUz4_Bk/0.jpg)](https://www.youtube.com/shorts/SZ-UcUz4_Bk)



### Claude Desktop MCP Client
- Select Claude Desktop Settings
- Select Developer and Edit config
- Change claude_desktop_config.json content to below
```sh
{
  "mcpServers": {
    "mcp-subnet-calculator-sse": {
      "command": "npx",
      "args": [
        "-y",
        "supergateway",
        "--sse",
        "https://mcp-subnet-calculator.mteke.com/sse"
      ]
    }
  }
}
```
- Close Claude Desktop App completely and restart it

You can watch the video to demonstrate how to enable mcp server on Claude Desktop Client App:

[![Watch the demo](https://img.youtube.com/vi/o2qw11WIHsA/0.jpg)](https://youtu.be/o2qw11WIHsA)


How to add Subnet Calculator MCP Server to your Goose Client

[![Watch the demo](https://img.youtube.com/vi/V-7QSZjYh0U/0.jpg)](https://youtu.be/V-7QSZjYh0U)


How to add Subnet Calculator MCP Server to N8N Instance

[![Watch the demo](https://img.youtube.com/vi/utFyDyKUIxg/0.jpg)](https://youtu.be/utFyDyKUIxg)

