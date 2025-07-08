# poly-mcp-client

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple Python client library for managing connections to MCP (Model Context Protocol) servers, built on top of the official [mcp-sdk](https://github.com/modelcontextprotocol/python-sdk). It adapts tool definitions for use with different LLM vendors like Anthropic, OpenAI, and Gemini.

## Features

*   **Vendor-Agnostic Tool Handling:**
    *   Retrieve available tool definitions in a Canonical format.
    *   Convert tool definitions on-the-fly to formats compatible with **Anthropic**, **OpenAI**, and **Gemini**.
*   **Prefixed Naming:** Automatically prefixes tool names and resource URIs with `mcp-{server_name}-` (customizable). This allows handling servers that might expose tools/resources with the same original name without conflicts.
*   **Flexible Configuration:** Define MCP servers using a JSON configuration file similar to Claude Desktop's `claude_desktop_config.json`.

## Status

### Version 0.0.1

*   Core functionality (tool listing, conversion, execution) is implemented.
*   Resource listing and reading are implemented but needs further testing.
*   SSE transport support is implemented but needs further testing.
*   Prompt-related features are not yet implemented.
*   This is an early alpha version. APIs might change. Use with caution.

### Version 0.0.4
*   Streamable-HTTP Transport Support (Stateless Only).


## Installation

```bash
git clone https://github.com/your-username/poly-mcp-client.git
cd poly-mcp-client
pip install .
```

## Configuration

Create a JSON file (e.g., `mcp_servers.json`) to define your MCP servers. The structure is similar to Claude Desktop's configuration:

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/your/accessible/directory"
      ],
      "env": null
    },
    "sequential-thinking": {
      "type": "stdio",
      "command": "npx",
      "args": [
          "-y", "@modelcontextprotocol/server-sequential-thinking"
      ]
    }
  }
}

```

**Note:** Ensure the `command` and `args` are correct for your environment and server setup. Use absolute paths where necessary. You'll also need `npx` (usually installed with Node.js) for this example config.

## Basic Usage

This example shows how to get tools from MCP servers managed by `PolyMCPClient` and use them.

### Anthropic

```python
import asyncio
import logging
import json
import os
from poly_mcp_client import PolyMCPClient # Use the correct class name
from anthropic import Anthropic # Import Anthropic library
from dotenv import load_dotenv

load_dotenv()

# Setup logging (optional but recommended)
logging.basicConfig(level=logging.INFO)
# You might want finer control, e.g., logging only poly_mcp_client messages
# logging.getLogger("poly_mcp_client").setLevel(logging.DEBUG)

# --- Anthropic API Key ---
# Make sure your ANTHROPIC_API_KEY environment variable is set
# e.g., export ANTHROPIC_API_KEY='your-api-key'
anthropic_client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY")) # client() initializes from ANTHROPIC_API_KEY env var

async def main():
    # Initialize the PolyMCPClient
    mcp_client = PolyMCPClient() # Default prefix is "mcp-"
    await mcp_client.initialize(config_path="./mcp_servers.json") # Adjust path if needed

    # Wait for initial connections
    print("Waiting for initial connections...")
    connection_results = await mcp_client.wait_for_initial_connections(timeout=45.0)
    print("Initial Connection Results:", connection_results)

    # Check if any servers successfully connected
    successful_connections = [name for name, (success, _) in connection_results.items() if success]
    if not successful_connections:
        print("No MCP servers connected successfully. Exiting.")
        await mcp_client.shutdown()
        return

    print(f"Successfully connected to: {successful_connections}")

    try:
        # 1. Get available tools in Anthropic format
        print("\nFetching tools for Anthropic...")
        anthropic_tools = await mcp_client.get_available_tools(vendor="anthropic")
        print(f"Found {len(anthropic_tools)} tools (Anthropic format).")

        # 2. Define the user's message
        # Example: Ask Claude to list files on the Desktop using the filesystem server
        user_message = "Can you list all the files in my folder?"

        messages = [{"role": "user", "content": user_message}]

        print(f"\nSending request to Claude with {len(anthropic_tools)} tools...")

        # 3. Call Anthropic API (initial request)
        response = anthropic_client.messages.create(
            model="claude-3-7-sonnet-20250219", # Or your preferred model
            max_tokens=1024,
            messages=messages,
            tools=anthropic_tools,
        )

        print("\nClaude's initial response type:", response.stop_reason)

        # 4. Process the response - Check for tool use
        while response.stop_reason == "tool_use":
            tool_results = []
            for content_block in response.content:
                if content_block.type == "tool_use":
                    tool_name = content_block.name
                    tool_input = content_block.input
                    tool_use_id = content_block.id

                    print(f"\nClaude wants to use tool: {tool_name}")
                    print(f"With input: {tool_input}")

                    # 5. Execute the tool using PolyMCPClient
                    try:
                        tool_output_content = await mcp_client.execute_mcp_tool(
                            full_tool_name=tool_name,
                            arguments=tool_input
                        )
                        print(f"Tool '{tool_name}' executed successfully.")

                        # 6. Format the result for Anthropic
                        # The 'tool_output_content' received from 'execute_mcp_tool' is a list
                        # of content items (like TextContent, ImageContent). Conveniently,
                        # the MCP SDK's structure for this list is designed to be directly
                        # compatible with the list format expected by Anthropic's 'tool_result'
                        # content block.
                        # Therefore, for Anthropic, we can pass 'tool_output_content' directly.
                        # If using a different vendor (like OpenAI or Gemini), you would need
                        # to convert 'tool_output_content' into that vendor's specific
                        # required format here (e.g., a single JSON string for OpenAI function calls).

                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": tool_use_id,
                            "content": tool_output_content, # Pass the list directly for Anthropic
                            # Note: If execute_mcp_tool raised an error handled below,
                            # this 'content' will be overwritten by the error message content.
                        })

                    except (ValueError, ConnectionError, RuntimeError, TimeoutError, Exception) as e:
                        print(f"Error executing tool '{tool_name}': {e}")
                        # Report the error back to Claude
                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": tool_use_id,
                            "content": f"Error executing tool: {str(e)}",
                        })

            # If there were tool results, add them to the message history
            if tool_results:
                messages.append({"role": "assistant", "content": response.content}) # Add Claude's turn
                messages.append({"role": "user", "content": tool_results}) # Add the tool results

                # 7. Call Anthropic API again with the tool results
                print("\nSending tool results back to Claude...")
                response = anthropic_client.messages.create(
                    model="claude-3-5-sonnet-20240620",
                    max_tokens=1024,
                    messages=messages,
                    tools=anthropic_tools,
                )
                print("\nClaude's response type after tool execution:", response.stop_reason)
            else:
                # Should not happen if stop_reason was tool_use, but break defensively
                print("Warning: stop_reason was 'tool_use' but no tool results generated.")
                break


        # 8. Handle the final response from Claude
        print("\nClaude's Final Response:")
        final_text = ""
        for content_block in response.content:
            if content_block.type == "text":
                print(content_block.text)
                final_text += content_block.text + "\n"
        
        if not final_text:
            print("(No text content in final response)")
            print("Full final response object:", response)


    except Exception as e:
        print(f"\nAn unexpected error occurred: {e}")
        logging.exception("Error during main execution:") # Log stack trace
    finally:
        # Shutdown the client gracefully
        print("\nShutting down PolyMCPClient...")
        await mcp_client.shutdown()
        print("Shutdown complete.")

if __name__ == "__main__":
    # Example of running the async main function
    # Ensure you run this in an environment where top-level await is supported
    # or use asyncio.run()
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nInterrupted by user.")
```

### Gemini (Google AI Studio)

```python
import asyncio
import logging
import os
from poly_mcp_client import PolyMCPClient
from dotenv import load_dotenv
from google import genai
from google.genai.types import (
    ToolConfig,
    FunctionCallingConfig,
    GenerateContentConfig,
    Content,
    Part,
    Tool,
    FunctionDeclaration,
)

# Load environment variables (for API key)
load_dotenv()

# Setup logging (optional)
logging.basicConfig(level=logging.INFO)

# --- Google API Key ---
# Make sure your GEMINI_API_KEY environment variable is set
# e.g., export GEMINI_API_KEY='your-api-key'
genai_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

async def main():
    # Initialize the PolyMCPClient
    mcp_client = PolyMCPClient() # Default prefix is "mcp-"
    await mcp_client.initialize(config_path="./mcp_servers.json")

    # Wait for initial connections (important!)
    print("Waiting for initial connections...")
    connection_results = await mcp_client.wait_for_initial_connections(timeout=45.0)
    print("Initial Connection Results:", connection_results)

    # Check if any servers successfully connected
    successful_connections = [name for name, (success, _) in connection_results.items() if success]
    if not successful_connections:
        print("No MCP servers connected successfully. Exiting.")
        await mcp_client.shutdown()
        return

    print(f"Successfully connected to: {successful_connections}")

    try:
        # 1. Get available tools in Gemini format
        print("\nFetching tools for Google Gemini...")
        # The get_available_tools method returns dictionaries suitable for FunctionDeclaration
        gemini_tool_dicts = await mcp_client.get_available_tools(vendor="google")
        print(f"Found {len(gemini_tool_dicts)} tools (Gemini format).")

        # Prepare the tools for the API call
        if gemini_tool_dicts:
            gemini_tools = [Tool(function_declarations=[FunctionDeclaration(**tool) for tool in gemini_tool_dicts])]
            tool_config = ToolConfig(
                function_calling_config=FunctionCallingConfig(mode='AUTO') # Mode 'ANY': Allows the model to predict a function call on any turn.
            )
        else:
            gemini_tools = []
            tool_config = None # No tools, no tool config needed


        # 2. Define the user's message
        # Adjust the user message based on your configured server and path
        user_message = "Can you list all the files in my folder? path/to/folder"

        # 3. Initialize chat history
        history = []
        latest_content = Content(parts=[Part.from_text(text=user_message)], role="user")
        history.append(latest_content) # Add initial user message to history

        print(f"\nSending request to Gemini with {len(gemini_tool_dicts)} tools...")

        while True: # Keep interacting until the model responds with text
            # 4. Prepare generation config for the API call
            generation_config = GenerateContentConfig(
                temperature=0.7, # Adjust generation parameters as needed
                max_output_tokens=1024,
                tools=gemini_tools if gemini_tools else None, # Pass tools if available
                tool_config=tool_config if tool_config else None, # Pass tool_config if available
            )

            # 5. Call Google Gemini API
            response = await genai_client.aio.models.generate_content(
                model="gemini-2.0-flash", # Use appropriate model name
                contents=history, # Pass the full chat history
                config=generation_config
            )

            # 6. Process the response - Check for function call or text
            candidate = response.candidates[0] # Get the first candidate
            first_part = candidate.content.parts[0] if candidate.content.parts else None

            if first_part and hasattr(first_part, 'function_call') and first_part.function_call:
                function_call = first_part.function_call
                print(f"\nGemini wants to use tool: {function_call.name}")
                print(f"With input: {function_call.args}")

                # Add the model's request to use the function to history
                model_turn_parts = [Part.from_function_call(name=function_call.name, args=function_call.args)]
                history.append(Content(role="model", parts=model_turn_parts))

                # 7. Execute the tool using PolyMCPClient
                try:
                    # Arguments are expected as a dict by execute_mcp_tool
                    tool_args_dict = dict(function_call.args.items()) if function_call.args else {}
                    tool_output_content = await mcp_client.execute_mcp_tool(
                        full_tool_name=function_call.name,
                        arguments=tool_args_dict
                    )
                    print(f"Tool '{function_call.name}' executed successfully.")

                    # 8. Format the result for Gemini
                    # Convert the list of MCP content items (TextContent, etc.)
                    # into a list of Gemini Part objects using Part.from_function_response.
                    function_response_parts = []
                    for mcp_item in tool_output_content:
                        # Gemini's function response 'response' field expects a dict.
                        # We wrap the MCP item's details (converted to dict) here.
                        # Adjust this logic if tools return non-text content (e.g., images).
                        if hasattr(mcp_item, 'text'):
                            # Pass the MCP item's dictionary representation
                            response_data = {"content": mcp_item.model_dump()}
                            function_response_parts.append(
                                Part.from_function_response(
                                    name=function_call.name,
                                    response=response_data
                                )
                            )
                        # else: Handle other MCP content types (ImageContent, etc.) if needed

                    if not function_response_parts:
                        # Handle cases where the tool executes but has no suitable output for Gemini
                        print(f"Warning: Tool '{function_call.name}' executed but produced no convertible output for Gemini.")
                        function_response_parts.append(
                            Part.from_function_response(
                                name=function_call.name,
                                response={"content": "Tool executed successfully, but no standard output provided."}
                            )
                        )

                    # Add the function execution result to history (as 'user' role according to Gemini docs)
                    history.append(Content(role="user", parts=function_response_parts))
                    print("\nSending tool results back to Gemini...")
                    # Loop continues to call generate_content again

                    tool_config = ToolConfig(
                        function_calling_config=FunctionCallingConfig(mode='AUTO') # Mode 'AUTO': model is automatically deciding whether to use a function call or not.
                    )

                except (ValueError, ConnectionError, RuntimeError, TimeoutError, Exception) as e:
                    print(f"Error executing tool '{function_call.name}': {e}")
                    # Report the error back to Gemini
                    error_response_part = Part.from_function_response(
                            name=function_call.name,
                            # Provide error information in the response content
                            response={"error": f"Failed to execute tool: {str(e)}"}
                        )
                    # Add error result to history
                    history.append(Content(role="user", parts=[error_response_part]))
                    print("\nSending error information back to Gemini...")
                    # Loop continues to call generate_content again

            elif first_part and hasattr(first_part, 'text'):
                # 9. Handle the final text response from Gemini
                print("\nGemini's Final Response:")
                final_text = ""
                # Iterate through all parts in the final response in case of multiple text parts
                for part in candidate.content.parts:
                    if hasattr(part, 'text'):
                        print(part.text)
                        final_text += part.text + "\n"

                if not final_text:
                    print("(No text content in final response)")
                    # print("Full final response object:", response) # For debugging

                # Add final model response to history (optional, if continuing chat)
                history.append(candidate.content)
                break # Exit the loop as we have a final text response

            else:
                # Handle unexpected response content
                print("\nReceived unexpected response content from Gemini:")
                print(response)
                break # Exit loop on unexpected response

    except Exception as e:
        print(f"\nAn unexpected error occurred: {e}")
        logging.exception("Error during main execution:") # Log stack trace
    finally:
        # Shutdown the client gracefully
        print("\nShutting down PolyMCPClient...")
        await mcp_client.shutdown()
        print("Shutdown complete.")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nInterrupted by user.")
```


## Dependencies

*   [mcp-sdk](https://github.com/modelcontextprotocol/python-sdk)
*   [pydantic](https://docs.pydantic.dev/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
