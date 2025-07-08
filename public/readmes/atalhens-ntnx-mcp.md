# Nutanix MCP Server

A Model Context Protocol (MCP) server for Nutanix Virtual Machine Management APIs with a command-line chatbot interface.

## Features

- Nutanix v4 API client integration - Add a v4 APi client and create tools for your MCP server
- LLM Provider Flexibility: Works with any Nutanix AI (NAI) LLM endpoint that follows OpenAI API standards (tested with llama-3-1-8b)
- Dynamic Tool Integration: Tools are declared in the system prompt, ensuring maximum compatibility across different LLMs.
- Server Configuration: Supports multiple MCP servers through a simple JSON configuration file like the Claude Desktop App.

## Prerequisites

- Python 3.8 or higher
- Nutanix Prism Central credentials or API key
- cluster UUID of PE cluster

## Setup

1. Clone this repository:
```bash
git clone https://github.com/savrab/nutanix-mcp.git
cd nutanix-mcp
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Nutanix credentials in `.env`
   - Add your NAI API key: `NAI_API_KEY=your_api_key_here`

5. Configure MCP servers:
   - Update `servers_config.json` with your server configuration
   - Example configuration:
   ```json
   {
       "mcpServers": {
           "nutanix mcp server": {
               "command": "/path/to/python",
               "args": ["/path/to/nutanix_mcp_server.py"]
           }
       }
   }
   ```

## Running the Application

### Option 1: Run MCP Server Inspector to test your tools. Learn more about MCP inspector in this tutorial - https://modelcontextprotocol.io/docs/tools/inspector

1. Start the MCP server:
```bash
mcp dev nutanix_mcp_server.py
```

### Option 2: After confirming your tools are running fine, you can start the chatbot or directly start the chatbot to use existing tools:
```bash
python mcp_chatbot.py
```

## Using the Chatbot

1. **Initialization**:
   - The chatbot will automatically initialize the MCP server
   - Available tools will be listed
   - System messages will be displayed

2. **Chatting**:
   - Type your message and press Enter
   - The chatbot will process your request
   - Tool execution progress will be shown
   - Results will be displayed in the terminal

3. **Tool Usage**:
   - Tools are automatically selected based on your request
   - Progress tracking is available for long-running operations
   - Error handling and retries are built-in

4. **Exiting**:
   - Type 'quit' or 'exit' to end the session
   - The chatbot will clean up resources properly

## Currently Available MCP Tools

### List Images
Lists all images available in the Nutanix cluster.


### Create Image
Creates a new image in the Nutanix cluster.

### Create VM
Creates an new VM based on the provided specs

### Collect logs
Collects log for given time period and uploads it diamond server

### Get Alerts
List the top 10 alerts on the PC 

## Environment Variables

Required environment variables:
- `NUTANIX_USERNAME`: Your Nutanix username
- `NUTANIX_PASSWORD`: Your Nutanix password
- `NUTANIX_PRISM_CENTRAL_URL`: URL of your Prism Central instance
- `NAI_API_KEY`: Your Nutanix AI API key
- `CLUSTER_UUID`: Your PE cluster UUID

## Troubleshooting

1. **Server Connection Issues**:
   - Verify server configuration in `servers_config.json`
   - Check environment variables

2. **Tool Execution Errors**:
   - Verify that the tools are working fine using MCP inspector
   - Review execution logs

3. **API Errors**:
   - Verify API keys
   - Check the LLM endpoint on ai.nutanix.com
   

