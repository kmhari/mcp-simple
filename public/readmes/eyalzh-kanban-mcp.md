# MCP Kanban Memory
An MCP tool set providing internal task management state for complex multi-session workflows with AI agents. This is similar to other memory MCP tools, with the additional structure, rules and visibility of a kanban-based task management system.

The main idea is to direct the AI agent to document and save its work in a kanban board, both in the planning session and in execution sessions.

## Highlights
- Column capacity / work-in-progress limits
- Embedded DB (SQLite)
- Web UI for observing the progress of the workflow, and for modifying tasks manually
- Predefined prompts for starting and resuming a workflow

## Usage
Use the MCP prompts to start a project or to make progress on a project. 
Alternatively, ask the LLM assistant to record its plan by creating a kanban board. To make progress in a follow-up session, ask the assistant to locate a specific kanban board and resume work on it.

## Installation
Clone this repo, then run:
```sh
npm ci --prefix shared/db
npm ci --prefix mcp-server
npm run build --prefix shared/db
npm run build --prefix mcp-server
```

Then add the MCP server configuration to the MCP client (e.g. Claude Desktop):
```json
"mcpServers": {
    "kanban-mcp": {
        "command": "node",
        "args": [
            "/path/to/repo/mcp-server/dist/server.js"
        ],
        "env": {
            "MCP_KANBAN_DB_FOLDER_PATH": "/path/to/db"
        }
    }
}
```

Replace `/path/to/repo` with the location of the cloned repo.

Replace `/path/to/db` with a folder that will contain the DB files. This can be any folder with read/write access. It will be created if it doesn't exist.

## Installation with Docker
Build the Docker image:
```sh
docker build -t mcp/mcp-kanban .
```

Then add the MCP server configuration to the MCP client (e.g. Claude Desktop):
```json
"mcpServers": {
    "kanban-mcp": {
        "command": "docker",
        "args": [
            "run",
            "--rm",
            "-i",
            "-v",
            "/path/to/db:/mcp",
            "mcp/mcp-kanban"
        ]
    }
}
```

Replace `/path/to/db` with a folder that will contain the DB files. This can be any folder with read/write access. It will be created if it doesn't exist.


## Using the web UI

Build the web-ui and web-server:
```sh
npm ci --prefix shared/db
npm run build --prefix shared/db

npm ci --prefix web-ui
npm ci --prefix web-server
npm run build --prefix web-ui
npm run build --prefix web-server
```

Run the web-server:
```sh
MCP_KANBAN_DB_FOLDER_PATH=/path/to/db npm run start --prefix web-server
```

Open the browser at http://localhost:8221

## API
### Tools

- **create-kanban-board**
  - Create a new kanban board to plan and keep track of your tasks.
  - Input:
      - `name` (string): The name of the board
      - `projectGoal` (string): The goal of the project.

- **add-task-to-board**
  - Add a new task to the landing column (to-do) of a kanban board.
  - Input:
      - `boardId` (string): The ID of the board to add the task to
      - `title` (string): The title of the task
      - `content` (string): The content of the task in markdown format

- **move-task**
  - Move a task from one column to another, respecting WIP limits.
  - Input:
      - `taskId` (string): The ID of the task to move
      - `targetColumnId` (string): The ID of the column to move the task to
      - `reason` (string, optional): The reason for moving the task

- **delete-task**
  - Delete a task.
  - Input:
      - `taskId` (string): The ID of the task to delete

- **get-board-info**
  - Get the full info of a kanban board, including columns and tasks.
  - Input:
      - `boardId` (string): The ID of the board to get info for
  - Return detailed information about the board, including columns and tasks.

- **get-task-info**
  - Get the full info of a task, including its content.
  - Input:
      - `taskId` (string): The ID of the task to get info for
  - Return detailed information about the task, including its content.

- **list-boards**
  - List all kanban boards in the database.
  - Input: None
  - Return a list of all boards in the database with their names, creation times, and goals.

### Prompts

- **create-kanban-based-project**
  - Create a kanban board for a project, ask questions to divide the project into tasks, and add them to the board.
  - Input:
    - `description` (string): The description of the project


- **make-progress-on-a-project**
  - Make progress on an existing project by locating its kanban board, selecting the next task, and working on it.
  - Input:
    - `description` (string): The description of the project
