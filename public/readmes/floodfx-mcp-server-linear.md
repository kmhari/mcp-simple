# mcp-server-linear

This is a MCP server that defines tools for interacting with Linear via an MCP client.

## Current Tools

- `linear-search-issues`: Search for issues in Linear

## Future Tools

- `linear-create-issue`: Create an issue in Linear
- `linear-update-issue`: Update an issue in Linear
- `linear-get-issue`: Get an issue in Linear
- `linear-get-project-issues`: Get all issues in a project in Linear
- `linear-add-comment`: Add a comment to an issue in Linear
- `linear-create-project`: Create a project in Linear
- `linear-update-project`: Update a project in Linear

### Future Resources

- `linear-issue:///{issueId}` - View individual issue details
- `linear-project:///{projectId}` - View project details
- `linear-cycle:///{cycleId}` - View cycle details (defaults to current cycle)
- `linear-team:///{teamId}/issues` - View team issues
- `linear-user:///{userId}/assigned` - View user's assigned issues
- `linear-organization:` - View organization info

## Bun-preferred

This project uses Bun and can be run directly from Bun without transpiling (which is how I use it).  To run it with Bun, you can use the following command:

```bash
bun run index.ts
```

That said, you can run it with Node if you prefer.  To run it with Node, you can use the following command:

```bash
node build/index.js
```

## Standalone Executable
Bun projects can be [compiled into standalone executable](https://bun.sh/docs/bundler/executables).  This allows you to run the server without having to install Bun (theoretically).  To compile the project into a standalone executable, you can use the following command:

```bash
bun build:standalone
```

You may need to change the build `target` depending on the machine you are building for.  See Bun docs for more details.


## Adding to your MCP client via JSON

To add this server to your MCP client, you can use the following JSON configuration:

### Bun Runtime
```json
"linear": {
  "command": "bun",
  "args": [
    "run",
    "/path/to/linear-mcp-server/index.ts"
  ],
  "env": {
    "LINEAR_API_KEY": "lin_api_ABCD"
  }
}
```

### Node Runtime
```json
"linear": {
  "command": "node",
  "args": [
    "/path/to/linear-mcp-server/build/index/js"
  ],
  "env": {
    "LINEAR_API_KEY": "lin_api_ABCD"
  }
}
```


### Standalone Executable
```json
"linear": {
  "command": "/path/to/linear-mcp-server/standalone-linear-mcp-server",
  "args": [],
  "env": {
    "LINEAR_API_KEY": "lin_api_ABCD"
  }
}
```

## Credits

This project was inspired by [jerhadf/linear-mcp-server](https://github.com/jerhadf/linear-mcp-server).  [I and others had trouble getting it to work](https://github.com/jerhadf/linear-mcp-server/issues/5), which prompted me to create my own implementation.  The list of tools and resources seemed worth keeping.


## License

MIT

