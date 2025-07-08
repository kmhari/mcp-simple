# Todoist MCP Server

[![smithery badge](https://smithery.ai/badge/@stevengonsalvez/todoist-mcp)](https://smithery.ai/server/@stevengonsalvez/todoist-mcp)

A Model Context Protocol (MCP) server for Todoist, enabling advanced task and project management via Claude Desktop and other MCP-compatible clients.

## Requirements
- Node.js (v18 or higher recommended)
- npm or yarn
- A Todoist account
- A Todoist API token (see https://todoist.com/prefs/integrations)

## Features
- List, create, update, complete, reopen, and delete tasks
- List, create, update, archive, unarchive, and delete projects
- List, create, update, and delete sections
- List, create, update, and delete labels
- List, create, update, and delete comments
- Manage shared labels
- Fetch project collaborators

## All Features
- **Tasks**: List, get, create, update, complete, reopen, delete
- **Projects**: List, get, create, update, archive, unarchive, delete
- **Sections**: List (by project), get, create, update, delete
- **Labels**: List, get, create, update, delete, manage shared labels
- **Comments**: List (by task/project), get, create, update, delete
- **Collaborators**: List project collaborators

## Installation

### For Claude Desktop (JSON)
If published as an npm package, you can use it directly with npx in your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "todoist": {
      "command": "npx",
      "args": [
        "todoist-mcp"
      ],
      "env": {
        "TODOIST_API_TOKEN": "your_todoist_token"
      }
    }
  }
}
```
- Set the `TODOIST_API_TOKEN` as shown.

### Manual Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/todoist-mcp.git
   cd todoist-mcp
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Build the project:
   ```sh
   npm run build
   # or
   yarn build
   ```
4. Set your Todoist API token as an environment variable (see above).
5. Run the built server:
   ```sh
   node dist/server.js
   ```
6. Configure Claude Desktop to use your local build by adding this to your config file:
   ```json
   {
     "mcpServers": {
       "todoist": {
         "command": "node",
         "args": [
           "/path/to/todoist-mcp/dist/server.js"
         ],
         "env": {
           "TODOIST_API_TOKEN": "your_todoist_token"
         }
       }
     }
   }
   ```

## Usage Examples
- **Get top priority tasks:**
  > "Show me my top priority tasks."
- **Create and classify labels:**
  > "Create labels for my tasks and classify them by project or urgency."
- **Organize tasks by section:**
  > "Move all tasks with the label 'urgent' to the 'Today' section."
- **Project management:**
  > "Create a new project called 'Personal Growth' and add a section 'Reading List'."
- **Collaborator overview:**
  > "List all collaborators for the project 'Team Launch'."
- **Comment management:**
  > "Add a comment to the task 'Prepare slides' with the content 'Remember to include Q2 results.'"

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details. 