# Coding Todo Server

This MCP server provides tools and resources for managing a coding project's todo list.

## Overview

This server allows you to:

- View the current todo list
- View details of specific todo items
- Add new todo items
- Update the status of todo items
- Delete todo items
- Update todo item details

## Resources

- `todo://list`:  Provides a list of all todo items with their status, title, priority and tags.
- `todo://item/{todo_id}`: Provides detailed information about a specific todo item, including status, priority, creation date, project, tags, and description.

## Tools

- `add_todo`: Adds a new todo item to the list.
    - Arguments:
        - `title`: Title of the todo item (required)
        - `description`: Detailed description of the todo item (required)
        - `project`: Project name (optional)
        - `priority`: Priority from 1 (lowest) to 5 (highest) (optional, default: 1)
        - `tags`: List of tags related to the todo (optional)

- `update_todo_status`: Updates the status of an existing todo item.
    - Arguments:
        - `id`: The ID of the todo item to update (required)
        - `status`: New status (pending/in_progress/completed) (required)

- `delete_todo`: Deletes a todo item from the list.
    - Arguments:
        - `id`: The ID of the todo item to delete (required)

- `update_todo`: Updates the details of an existing todo item.
    - Arguments:
        - `id`: The ID of the todo item to update (required)
        - `title`: New title (optional)
        - `description`: New description (optional)
        - `project`: New project name (optional)
        - `priority`: New priority from 1 (lowest) to 5 (highest) (optional)
        - `tags`: New list of tags (optional)

## Installation

Before running the server, you need to install the required Python packages. You can do this using pip:

```bash
pip install -r requirements.txt
```

## Usage

To run the server, execute the `coding_todo.py` script.

```bash
python coding_todo.py
```

This will start the MCP server, making its tools and resources available to MCP clients.
