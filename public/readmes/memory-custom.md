# Memory Custom

[![smithery badge](https://smithery.ai/badge/@BRO3886/mcp-memory-custom)](https://smithery.ai/server/@BRO3886/mcp-memory-custom)

This project adds new features to the Memory server offered by the MCP team. It allows for the creation and management of a knowledge graph that captures interactions via a language model (LLM).

<a href="https://glama.ai/mcp/servers/w6hi2myrxq">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/w6hi2myrxq/badge" alt="Memory Custom MCP server" />
</a>

## New Features

### 1. Custom Memory Paths

- Users can now specify different memory file paths for various projects.
- **Why?**: This feature enhances organization and management of memory data, allowing for project-specific memory storage.

### 2. Timestamping

- The server now generates timestamps for interactions.
- **Why?**: Timestamps enable tracking of when each memory was created or modified, providing better context and history for the stored data.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)

### Installing via Smithery

To install Knowledge Graph Memory Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@BRO3886/mcp-memory-custom):

```bash
npx -y @smithery/cli install @BRO3886/mcp-memory-custom --client claude
```

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:BRO3886/mcp-memory-custom.git
   cd mcp-memory-custom
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

Before running the server, you can set the `MEMORY_FILE_PATH` environment variable to specify the path for the memory file. If not set, the server will default to using `memory.json` in the same directory as the script.

### Running the Server

#### Updating the mcp server json file

Add this to your `claude_desktop_config.json` / `.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "memory": {
      "command": "node",
      "args": ["/path/to/mcp-memory-custom/dist/index.js"]
    }
  }
}
```

System Prompt changes:

```
Follow these steps for each interaction:
1. The memoryFilePath for this project is /path/to/memory/project_name.json - always pass this path to the memory file operations (when creating entities, relations, or retrieving memory etc.)
2. User Identification:
   - You should assume that you are interacting with default_user
   - If you have not identified default_user, proactively try to do so.

3. Memory Retrieval:
   - Always begin your chat by saying only "Remembering..." and retrieve all relevant information from your knowledge graph
   - Always refer to your knowledge graph as your "memory"

4. Memory
   - While conversing with the user, be attentive to any new information that falls into these categories:
     a) Basic Identity (age, gender, location, job title, education level, etc.)
     b) Behaviors (interests, habits, etc.)
     c) Preferences (communication style, preferred language, etc.)
     d) Goals (goals, targets, aspirations, etc.)
     e) Relationships (personal and professional relationships up to 3 degrees of separation)

5. Memory Update:
   - If any new information was gathered during the interaction, update your memory as follows:
     a) Create entities for recurring organizations, people, and significant events, add timestamps to wherever required. You can get current timestamp via get_current_time
     b) Connect them to the current entities using relations
     c) Store facts about them as observations, add timestamps to observations via get_current_time


IMPORTANT: Provide a helpful and engaging response, asking relevant questions to encourage user engagement. Update the memory during the interaction, if required, based on the new information gathered (point 4).
```

#### Running the Server Locally

To start the Knowledge Graph Memory Server, run:

```bash
npm run build
node dist/index.js
```

The server will listen for requests via standard input/output.

## API Endpoints

The server exposes several tools that can be called with specific parameters:

- **Get Current Time**
- **Set Memory File Path**
- **Create Entities**
- **Create Relations**
- **Add Observations**
- **Delete Entities**
- **Delete Observations**
- **Delete Relations**
- **Read Graph**
- **Search Nodes**
- **Open Nodes**

## Acknowledgments

- Inspired by the Memory server from Anthropic.
