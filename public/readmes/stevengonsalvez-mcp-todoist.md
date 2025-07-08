# MCP-Todoist Integration

This project provides a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that integrates with Todoist, allowing language models to interact with Todoist tasks and projects.

## Features

- Complete Todoist API integration
- Create, read, update, and delete tasks, projects, sections, labels, and comments
- Access project collaborators
- Filter tasks by various criteria
- Well-documented tools and resources for use with language models

## Requirements

- Python 3.10 or higher
- Todoist account with API token
- MCP-compatible client (like Claude Desktop)

## Usage with Claude Desktop

To use this MCP server with Claude Desktop, you have two options:

### Option 1: Using uvx (Recommended)

1. Install the package using uvx:
   ```bash
   uvx install mcp-todoist
   ```

2. Add the server to Claude Desktop's MCP configuration:
   - Open Claude Desktop
   - Go to Settings > Advanced
   - Under "MCP Servers Configuration", add to the JSON configuration:
     ```json
     "mcpServers": {
       "todoist": {
         "command": "uvx",
         "args": ["mcp-todoist"],
         "env": {
           "TODOIST_API_TOKEN": "your_todoist_api_token_here"
         }
       }
     }
     ```

### Option 2: Using cloned repository

1. Clone and install the package in development mode:
   ```bash
   git clone https://github.com/your-username/mcp-todoist.git
   cd mcp-todoist
   pip install -e .
   ```

2. Add the server to Claude Desktop's MCP configuration:
   - Open Claude Desktop
   - Go to Settings > Advanced
   - Under "MCP Servers Configuration", add to the JSON configuration:
     ```json
     "mcpServers": {
       "todoist": {
         "command": "python",
         "args": ["/full/path/to/mcp-todoist/main.py"],
         "env": {
           "TODOIST_API_TOKEN": "your_todoist_api_token_here"
         }
       }
     }
     ```

### Option 3: Using uv

uv is a fast Python package installer and resolver. To use it with this project:

1. First make sure you have uv installed:
   ```bash
   # Install uv (if you haven't already)
   brew install uv  # On macOS with Homebrew
   pipx install uv  # Or use pipx
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mcp-todoist.git
   cd mcp-todoist
   ```

3. Create and maintain the lock file:
   ```bash
   # Create/update the lock file (do this when dependencies change)
   uv pip sync requirements.txt
   ```

4. Run the MCP server using uv:
   ```bash
   uv run mcp dev main.py
   ```

5. Configure Claude Desktop:
   ```json
   "mcpServers": {
     "todoist": {
       "command": "uv",
       "args": ["run", "mcp", "dev", "/full/path/to/mcp-todoist/main.py"],
       "env": {
         "TODOIST_API_TOKEN": "your_todoist_api_token_here"
       }
     }
   }
   ```

3. Save the configuration and restart Claude Desktop

4. You can now access the Todoist MCP server in your Claude conversations by asking Claude to use Todoist

### Getting a Todoist API Token

To obtain your Todoist API token:

1. Log in to your Todoist account
2. Go to Settings > Integrations
3. Copy your API token from the "API token" section

## Installation

If you want to install the package from source:

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/mcp-todoist.git
   cd mcp-todoist
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file with your Todoist API token:
   ```bash
   cp .env.example .env
   # Edit .env file to add your Todoist API token
   ```

### Running with MCP Dev Tools

For testing and development, use the MCP dev tools:

```bash
mcp run main.py
```

This will start the MCP server, allowing you to test it interactively.

To run with the MCP Inspector for visual interaction:

```bash
mcp dev main.py
```

## Available Tools

The following Todoist tools are available:

### Task Management
- `create_task` - Create a new task with title, due date, project, etc.
- `get_tasks` - Get tasks based on filters
- `get_task` - Get a specific task by ID
- `update_task` - Update an existing task
- `complete_task` - Mark a task as complete
- `uncomplete_task` - Mark a completed task as incomplete
- `delete_task` - Delete a task

### Project Management
- `get_projects` - Get all projects
- `get_project` - Get a specific project by ID
- `add_project` - Create a new project
- `update_project` - Update an existing project
- `delete_project` - Delete a project
- `archive_project` - Archive a project
- `unarchive_project` - Unarchive a project

### Section Management
- `get_sections` - Get all sections in a project
- `get_section` - Get a specific section by ID
- `add_section` - Create a new section
- `update_section` - Update an existing section
- `delete_section` - Delete a section

### Label Management
- `get_labels` - Get all labels
- `get_label` - Get a specific label by ID
- `add_label` - Create a new label
- `update_label` - Update an existing label
- `delete_label` - Delete a label

### Comment Management
- `get_comments` - Get comments for a task or project
- `get_comment` - Get a specific comment by ID
- `add_comment` - Add a comment to a task or project
- `update_comment` - Update an existing comment
- `delete_comment` - Delete a comment

### Collaboration
- `get_collaborators` - Get collaborators for a project

## Available Resources

The following Todoist resources are available:

- `todoist://tasks` - All tasks
- `todoist://tasks/project/{project_id}` - Tasks in a specific project
- `todoist://tasks/section/{section_id}` - Tasks in a specific section
- `todoist://tasks/label/{label}` - Tasks with a specific label
- `todoist://projects` - All projects
- `todoist://sections/{project_id}` - Sections in a specific project
- `todoist://labels` - All labels

## Examples

### Creating a Task

```
Please create a new task in Todoist called "Buy groceries" due tomorrow.
```

### Getting Tasks from a Project

```
Show me all tasks in my "Work" project.
```

### Completing a Task

```
Mark the "Buy groceries" task as complete.
```

### Adding a Comment to a Task

```
Add a comment to the task with ID "12345678" saying "Don't forget milk and eggs".
```

### Creating a New Project with Sections

```
Create a new project called "Home Renovation" and add sections for "Kitchen", "Bathroom", and "Living Room".
```

## Development

To contribute to the project or modify it for your needs:

1. Fork the repository
2. Make your changes
3. Test with `mcp run main.py` or `mcp dev main.py`
4. Submit a pull request

### Using uv for Development

This project supports using `uv` for faster dependency management and running:

1. Create/update the lock file when dependencies change:
   ```bash
   uv pip sync requirements.txt
   ```

2. Run the application with uv:
   ```bash
   uv run mcp dev main.py
   ```

3. If you're experiencing lock file issues, you can troubleshoot by:
   ```bash
   # Remove the lock file and regenerate it
   rm uv.lock
   uv pip sync requirements.txt

   # Or run without using the lock file (temporary solution)
   UV_LOCK=0 uv run mcp dev main.py
   ```

### Git Hooks

This project uses pre-commit hooks to ensure code quality and consistency:

1. Install the development dependencies:
   ```bash
   pip install -e ".[dev]"
   ```

2. Install the git hooks:
   ```bash
   pre-commit install
   ```

3. Now, each time you commit, the hooks will run:
   - Black for code formatting
   - isort for import sorting
   - flake8 for linting
   - Various file checks (trailing whitespace, YAML validation, etc.)

If any hook fails, the commit will be aborted. Fix the issues and try again.

You can also run the hooks manually on all files:
```bash
pre-commit run --all-files
```

### Publishing to PyPI

This project uses `setuptools_scm` for automatic versioning based on git tags:

1. Ensure all tests pass locally:
   ```bash
   pip install -e ".[dev]"
   flake8 . --exclude=.venv,venv,env
   black --check .
   isort --check-only --profile black .
   pytest
   ```

2. Create a new release with semantic versioning (no "v" prefix):
   ```bash
   # For a new version (e.g., 0.1.0)
   git tag 0.1.0
   git push origin 0.1.0
   ```

3. The GitHub Actions workflow will automatically:
   - Run tests
   - Generate a changelog from PRs and commits
   - Create a GitHub release with the changelog
   - Build and publish the package to PyPI

4. Publishing manually (if needed):
   ```bash
   pip install build twine
   python -m build
   twine check dist/*
   twine upload --repository-url https://test.pypi.org/legacy/ dist/*  # Test first
   twine upload dist/*  # Then to production PyPI
   ```

5. Alternative: Trigger manual workflow:
   - Go to the GitHub repository → Actions → "Build and Publish" workflow
   - Click "Run workflow"
   - Choose "test" for Test PyPI or "prod" for production PyPI

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.
