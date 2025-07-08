# RR MCP Server for .NET Analysis

A generic MCP server for extracting .NET interface, OpenAPI, and data (models/entities/enums) information from any .NET solution using PowerShell scripts.
The goal is to provide AI with large project structure and abstraction w\o exposing the contents.

Will be updated with more tools for .Net solution AI management and automation.

## Dependencies
- [ModelContextProtocol](https://www.nuget.org/packages/ModelContextProtocol) — Official C# SDK for Model Context Protocol servers and clients. [GitHub](https://github.com/modelcontextprotocol/csharp-sdk)

## Features

- Extracts Models, Entities, Enums, and Interfaces from any .NET solution
- Gives AI agents full project structure/context to avoid redundant generation
- Ready-to-use with Cursor, Copilot, Claude, or any MCP-compatible tool
- Fast with caching, clean output (no stdout noise), full logging to files
- Auto-discovers scripts, supports relative/absolute `.sln` paths
- Cross-platform (Windows, macOS, Linux), requires PowerShell 7+

## Output Format Examples

### Data Tool (`GetData`)
- **Model/Entity:**
  ```json
  {
    "n": "UserModel",
    "b": "BaseModel",
    "p": { "Id": "string", "Name": "string", "Age": "int" },
    "prj": "My.Project.Namespace"
  }
  ```
  - Any class with `*Entity` suffix is included as an entity (no base class requirement).
- **Enum:**
  ```json
  {
    "n": "StatusType",
    "m": { "Unknown": 0, "Active": 1, "Inactive": 2 },
    "prj": "My.Project.Namespace"
  }
  ```

### Interfaces Tool (`GetInterfaces`)
- **Interface:**
  ```json
  {
    "n": "IMyService",
    "b": "IBaseService",
    "d": "Service for handling user operations.",
    "m": [
      "Task DoWork(string arg);",
      { "s": "Task<int> GetCount();", "d": "Gets the count." }
    ],
    "prj": "My.Project"
  }
  ```
  - `n`: interface name
  - `b`: base interface (optional)
  - `d`: interface documentation (optional)
  - `m`: methods (string for signature, or object with doc)
  - `prj`: project name

### Naming Conventions
- Models: `*Model`
- Entities: `*Entity`
- Enums: `*Type`
- Interfaces: `I*Service`, `I*Repository`, etc.

## Manual Script Run (for cache warmup or debugging)
You can run the PowerShell scripts directly to pre-warm the cache or debug output. Run from the repo root or RR.MCP directory:

**For interfaces:**
```sh
pwsh -File RR.MCP/GetInterfacesPwsh.ps1 -SolutionFile MySolution.sln
```

**For data (models/entities/types):**
```sh
pwsh -File RR.MCP/GetDataPwsh.ps1 -SolutionFile MySolution.sln
```

- On Windows, macOS, or Linux, ensure `pwsh` (PowerShell 7+) is in your PATH.
- You can specify a different solution file if needed.
- Output will be written to `.cache/` and logs to `mcp_debug.log`/`mcp_data_debug.log`.

## Requirements
- .NET 9.0 SDK or later
- PowerShell 7.0+ (`pwsh` must be set in PATH system variable)

## Setup

1. **Clone and build**
   ```sh
   git clone
   cd RR.MCP
   dotnet build
   ```

2. **Configure your MCP client**
   Add a stdio MCP server entry, e.g.:
   ```json
   {
     "mcpServers": {
       "rr-mcp": {
         "command": "dotnet",
         "args": ["run", "--project", "<absolute-path-to>/RR.MCP/RR.MCP.csproj"]
       }
     }
   }
   ```
   - The server will auto-register all available tools (interfaces, data, etc).

3. **Usage**
Simply add these rules for your agents to call the tools:
   - Call the `GetInterfaces` tool to extract interfaces/OpenAPI info.
   - Call the `GetData` tool to extract all Models, Entities, and Types (enums) with structure.
   - Pass the path to your `.sln` file as the `solutionFile` parameter (absolute or relative to the server working directory).

## Logging & Debugging
- All C# errors are logged to `mcp_errors.log` (in the output directory).
- All PowerShell script activity and errors are logged to `mcp_debug.log` (interfaces) and `mcp_data_debug.log` (data) next to the script.
- The PowerShell scripts will log and return an error if run with PowerShell < 7.

## PowerShell Scripts
- Scripts are always copied to the output directory and invoked with `pwsh -File ...`.
- They log all key steps, parameters, and errors.
- They will fail gracefully and log if the solution file is not found or if no data is detected.
- Caching is per-project and hash-based for fast repeated runs. (first run will be slow on big projects, you should manually run the scripts)

## Customization
- To adapt for other code analysis, edit `GetInterfacesPwsh.ps1` or `GetDataPwsh.ps1`.
- To add more tools, add new `[McpServerTool]` methods in the C# tool files.

## Integration with Any AI IDE
- This MCP server is fully generic and can be integrated with any AI IDE or tool that supports MCP stdio transport.
- Tools are auto-discovered and described via OpenAPI for easy consumption.
- No IDE-specific logic is present; all output is protocol-compliant.

---

## Cursor Integration Example
If using Cursor, add the following to your `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "rr-mcp": {
      "command": "dotnet",
      "args": ["run", "--project", "<absolute-path-to>/RR.MCP/RR.MCP.csproj"]
    }
  }
}
```

## Contributing
- PRs and issues welcome!
- Please ensure all output is protocol-compliant and all logs go to file only.

## License
MIT 
