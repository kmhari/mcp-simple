# mcp-taskwarrior

Author: Bruce Kroeze

A simple MCP Server that facilitates management of tasks in Taskwarrior.

Provides 4 tools:

- add_task
- update_task
- delete_task
- list_tasks

## usage - npx

```bash
npx @0xbeedao/mcp-taskwarrior
```

## Usage - local

Install locally by checking this out and then

```bash
cd mcp-taskwarrior
pnpm install
```


In Cursor, Goose, Claude or your favorite MCP client, choose "Command" style MCP, then `/path/to/this/repo/src/tasks.ts` as the argument.

## Examples

"What are my current tasks"

### Project: homesale

High Priority:
- Install photo room vent cover (waiting until Feb 24)
- Fix upstairs railing
- Repair front railing
- Sign Unitus docs

Medium Priority:
- Get white paint for upstairs BR
- Remove wood stove
