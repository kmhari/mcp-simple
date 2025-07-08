# Simple Task Master (SimpleTM)

A lightweight task management system for Claude desktop code projects that doesn't require API keys, designed to work with Desktop Commander MCP.

## Features

- Create and track tasks with titles, descriptions, and priorities
- Break down tasks into subtasks
- Set task dependencies to enforce order of work
- Track task status (pending, in-progress, done)
- Parse PRD documents to automatically extract tasks
- Get the next task to work on based on dependencies and priorities
- Works directly with Claude desktop code and Desktop Commander MCP
- Organize tasks by project

## Quick Start

### Option 1: MCP (Recommended)

1. **Install the package**

```bash
# Navigate to the simple-task-master directory
cd simple-task-master

# Install dependencies
npm install

# Link the package for global use
npm link
```

2. **Add the MCP config to your editor**:

```json
{
  "mcpServers": {
    "simple-tm": {
      "command": "simple-tm-mcp",
      "args": [],
      "env": {
        "DEBUG": "false"
      }
    }
  }
}
```

3. **Enable the MCP** in your editor

4. **Prompt Claude** to initialize SimpleTM:

```
Can you please initialize simple-tm into my project?
```

5. **Use common commands** directly through Claude:

```
Can you list all my tasks?
What's the next task I should work on?
Can you help me implement task 3?
Can you help me break down this task into subtasks?
Can you show me all tasks for the Frontend project?
```

### Option 2: Using Command Line

#### Installation

```bash
# Navigate to the simple-task-master directory
cd simple-task-master

# Install dependencies
npm install

# Link the package for global use
npm link
```

#### Initialize a new project

```bash
# Navigate to your project directory
cd your-project-directory

# Initialize SimpleTM
simple-tm init
```

This will create a `.tasks.json` file in your project to store tasks.

#### Common Commands

```bash
# List all tasks
simple-tm list

# Add a new task
simple-tm add --title "Implement login form" --priority high

# Add a task to a specific project
simple-tm add --title "Create API endpoint" --project "Backend"

# Update a task
simple-tm update --id abc123 --status in-progress

# Parse a PRD and generate tasks
simple-tm parse-prd --path your-prd.txt

# Parse a PRD and assign tasks to a project
simple-tm parse-prd --path your-prd.txt --project "Frontend"

# Get the next task to work on
simple-tm next

# Get the next task for a specific project
simple-tm next --project "Backend"

# Break down a task into subtasks
simple-tm expand --id abc123 --subtasks "Design UI,Implement validation,Add error handling"

# List all projects
simple-tm projects

# Switch to a project
simple-tm switch --project "Frontend"
```

## MCP Tools Reference

When using Claude with Desktop Commander MCP, you can use these tools directly:

- `list_tasks` - List all tasks, optionally filtered by status and project
- `add_task` - Add a new task with optional project assignment
- `update_task` - Update an existing task
- `set_task_status` - Set the status of a task
- `parse_prd` - Parse a PRD document and extract tasks with optional project assignment
- `next_task` - Get the next task to work on, optionally filtered by project
- `expand_task` - Break down a task into subtasks
- `list_projects` - List all projects with task counts
- `switch_project` - Switch to a different project or create a new one

## Task Structure

Tasks in SimpleTM have the following structure:

- `id`: Unique identifier for the task
- `title`: Brief title of the task
- `description`: Detailed description of what the task involves
- `status`: Current state (pending, in-progress, done)
- `priority`: Importance level (high, medium, low)
- `projectName`: Name of the project this task belongs to
- `dependencies`: IDs of tasks that must be completed before this task
- `subtasks`: List of smaller, more specific tasks that make up the main task
- `createdAt`: When the task was created
- `updatedAt`: When the task was last updated

## Project-Specific Tasks

SimpleTM fully supports project-specific tasks, allowing you to:

1. **Create projects**: Assign tasks to specific projects to organize your work.

2. **Switch between projects**: Focus on one project at a time, or work across multiple projects.

3. **Project-specific views**: Filter tasks by project to see only relevant work.

4. **Project status tracking**: View task counts by project to track progress.

### Working with Projects

```bash
# List all projects
simple-tm projects

# Add a task to a specific project
simple-tm add --title "New feature" --project "Frontend"

# List tasks for a specific project
simple-tm list --project "Frontend"

# Get the next task for a specific project
simple-tm next --project "Frontend"

# Switch to a specific project as your current focus
simple-tm switch --project "Frontend"

# Extract tasks from a PRD and assign to a project
simple-tm parse-prd --path requirements.txt --project "Backend"
```

When using Claude with the MCP, you can work with projects naturally:

```
Can you show me all tasks for the Backend project?
What's the next task I should work on for the Frontend project?
Can you create a new task to implement user authentication for the Backend project?
Please switch to the Frontend project.
```

## Best Practices

1. **Start with a PRD**: Use the `parse_prd` tool to quickly extract tasks from your requirements document.

2. **Break down complex tasks**: Use the `expand_task` tool to break complex tasks into manageable subtasks.

3. **Set dependencies**: Ensure task dependencies are properly set to maintain the correct workflow.

4. **Track progress**: Regularly update task statuses to keep the project moving forward.

5. **Use Claude efficiently**: Let Claude help you manage tasks by asking about the next task to work on or breaking down complex tasks.

6. **Organize by project**: Use projects to keep different parts of your work separate and organized.

## License

MIT

---

Made for use with Claude and Desktop Commander MCP
