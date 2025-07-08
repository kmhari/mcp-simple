# Gatherings MCP Server

A Model Context Protocol server for managing gatherings and expense sharing.

## Dependency Management

This project uses `uv` for Python dependency management instead of `pip`. This change is necessary due to dependency requirements from the [Model Context Protocol Python SDK](https://github.com/modelcontextprotocol/python-sdk).

Ensure you have `uv` installed or install it via pip:
```bash
pip install uv
```

To install project dependencies:
```bash
uv pip install -r requirements.txt
```

## Overview

The Gatherings MCP Server provides an API that allows AI assistants to interact with the Gatherings application through the Machine Conversation Protocol. This enables AI systems to help users manage shared expenses for social events, outings, or any gathering where costs are split among participants.

## Features

- Create and manage gatherings with multiple members
- Add expenses for specific members
- Calculate fair reimbursements
- Record payments and reimbursements
- Generate detailed payment summaries
- Add/remove members from gatherings
- Rename members as needed

## Installation

### Prerequisites

- Python 3.8+
- SQLAlchemy
- MCP SDK

### Setup

1. Clone this repository:
   ```bash
   git clone https://your-repository.git
   cd accel
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set environment variables (optional):
   ```bash
   # Custom database location
   export GATHERINGS_DB_PATH=path/to/database.db
   
   # Custom script location
   export GATHERINGS_SCRIPT=path/to/gatherings.py
   ```

## Usage

Start the MCP server:

```bash
python gatherings_mcp_server.py
```

The server runs on stdio, which makes it compatible with MCP protocol clients.

## API Reference

The MCP server exposes the following tools:

### `create_gathering(gathering_id: str, members: int)`
Create a new gathering with the specified number of members.

### `add_expense(gathering_id: str, member_name: str, amount: float)`
Add an expense for a member in a gathering.

### `calculate_reimbursements(gathering_id: str)`
Calculate who owes what to whom for a gathering.

### `record_payment(gathering_id: str, member_name: str, amount: float)`
Record a payment made by a member (positive value) or a reimbursement to a member (negative value).

### `rename_member(gathering_id: str, old_name: str, new_name: str)`
Rename a member in a gathering.

### `show_gathering(gathering_id: str)`
Show details of a gathering including expenses and payment status.

### `list_gatherings()`
List all gatherings in the database.

### `close_gathering(gathering_id: str)`
Mark a gathering as closed.

### `delete_gathering(gathering_id: str, force: bool = False)`
Delete a gathering and all associated data. Set `force=True` to delete closed gatherings.

### `add_member(gathering_id: str, member_name: str)`
Add a new member to an existing gathering.

### `remove_member(gathering_id: str, member_name: str)`
Remove a member from a gathering (only if they have no expenses).

## Example Flow

1. Create a gathering for a dinner with 5 friends:
   ```
   create_gathering("2023-10-15-dinner", 5)
   ```

2. Add expenses as people pay for things:
   ```
   add_expense("2023-10-15-dinner", "Alice", 120.50)
   add_expense("2023-10-15-dinner", "Bob", 35.00)
   ```

3. Calculate reimbursements:
   ```
   calculate_reimbursements("2023-10-15-dinner")
   ```

4. Record payments as people settle up:
   ```
   record_payment("2023-10-15-dinner", "Charlie", 31.10)
   ```

5. Close the gathering when all payments are settled:
   ```
   close_gathering("2023-10-15-dinner")
   ```

## Architecture

The Gatherings MCP server consists of three main components:

1. **MCP Server Interface** (`gatherings_mcp_server.py`): Provides the MCP protocol interface that AI tools can interact with.

2. **Service Layer** (`services.py`): Contains business logic for managing gatherings, expenses, and payments.

3. **Data Layer** (`models.py`): Defines the database schema using SQLAlchemy ORM and handles data persistence.

## Data Model

- **Gathering**: Represents a social event with expenses to split
- **Member**: A participant in a gathering
- **Expense**: Money spent by a member for the gathering
- **Payment**: Money paid by a member to settle balances


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.