---

# MCP Server for National Park Services Data

This MCP Server provides an interface to retrieve National Park Services (NPS) data. It allows users to:
- Retrieve a list of national parks in a given U.S. state.
- Fetch detailed information about a specific national park.

It uses the National Park Service API to obtain the data.

## Requirements

- Node.js (v18+ recommended)
- npm or yarn
- A valid NPS API key (available at [https://www.nps.gov/subjects/developer/get-started.htm](https://www.nps.gov/subjects/developer/get-started.htm))
- Claude Desktop installed (for running MCP servers)

## Setup

1. Clone this repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your NPS API key:
   ```sh
   API_KEY=your_nps_api_key_here
   ```

## Running the Server

To start the MCP server:

```sh
npm run build
node ./build/server.js
```

Using Claude Desktop:

1. Add this MCP Server to the `claude_desktop_config.json`

```
{
    "mcpServers": {
        "nps": {
            "command": "node",
            "args": [
                "/<Path to Server>/build/index.js"
            ],
            "env": {
                "API_KEY": "Your NPS API Key"
            }
        }
    }
}
```

2. Start or Restart Claude Desktop
3. Ensure your MCP server is recognized and running by clicking on the tools icon at the bottom of Claude's chat window.
4. Use Claude's interface to query National Park Services data.

## API Endpoints

### Fetch List of National Parks by State

**Tool Name:** `park-list`

**Parameters:**
- `stateCode` (string) – Two-letter U.S. state code

**Response Example:**
```json
[
  {
    "fullName": "Yellowstone National Park",
    "description": "First national park in the U.S.",
    "parkCode": "yell"
  }
]
```

### Fetch Details of a National Park

**Tool Name:** `park-details`

**Parameters:**
- `parkCode` (string) – National Park lookup code

**Response Example:**
```json
[
  {
    "fullName": "Yellowstone National Park",
    "description": "First national park in the U.S.",
    "states": "WY, MT, ID"
  }
]
```

## Prompts

### Retrieve Parks in a State

**Prompt Name:** `parks-by-state`

**Parameters:**
- `stateCode` (string)

**Example:**
```text
What National Parks are in the state of CA?
```

### Get Park Details

**Prompt Name:** `details-for-park`

**Parameters:**
- `park` (string)

**Example:**
```text
Give me details about Yellowstone National Park.
```

