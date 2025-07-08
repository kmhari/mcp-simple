# Time MCP Server

A Model Context Protocol server that provides time and timezone conversion capabilities. This server enables LLMs to get current time information and perform timezone conversions using IANA timezone names, with automatic system timezone detection.

### Available Tools

- `get_current_time` - Get current time in a specific timezone or system timezone.
  - Required arguments:
    - `timezone` (string): IANA timezone name (e.g., 'America/New_York', 'Europe/London')

- `convert_time` - Convert time between timezones.
  - Required arguments:
    - `source_timezone` (string): Source IANA timezone name
    - `time` (string): Time in 24-hour format (HH:MM)
    - `target_timezone` (string): Target IANA timezone name

## Installation

### Using uv (recommended)

When using [`uv`](https://docs.astral.sh/uv/) no specific installation is needed. We will
use [`uvx`](https://docs.astral.sh/uv/guides/tools/) to directly run *mcp-server-time*.

### Using PIP

Alternatively you can install `time-mcp-local` via pip:

```bash
pip install time-mcp-local
```

After installation, you can run it as a script using:

```bash
python -m time-mcp-local
```

## Configuration

### Configure for Claude.app

Add to your Claude settings:

<details>
<summary>Using uvx</summary>

```json
"mcpServers": {
  "time": {
    "command": "uvx",
    "args": ["time-mcp-local"]
  }
}
```
</details>

<details>
<summary>Using pip installation</summary>

```json
"mcpServers": {
  "time": {
    "command": "python",
    "args": ["-m", "time_mcp_local"]
  }
}
```
</details>

### Configure for Zed

Add to your Zed settings.json:

<details>
<summary>Using uvx</summary>

```json
"context_servers": [
  "mcp-server-time": {
    "command": "uvx",
    "args": ["time-mcp-local"]
  }
],
```
</details>

<details>
<summary>Using pip installation</summary>

```json
"context_servers": {
  "mcp-server-time": {
    "command": "python",
    "args": ["-m", "time_mcp_local"]
  }
},
```
</details>

### Customization - System Timezone

By default, the server automatically detects your system's timezone. You can override this by adding the argument `--local-timezone` to the `args` list in the configuration.

Example:
```json
{
  "command": "python",
  "args": ["-m", "time_mcp_local", "--local-timezone=America/New_York"]
}
```

## Example Interactions

1. Get current time:
```json
{
  "name": "get_current_time",
  "arguments": {
    "timezone": "Europe/Warsaw"
  }
}
```
Response:
```json
{
  "timezone": "Europe/Warsaw",
  "datetime": "2024-01-01T13:00:00+01:00",
  "is_dst": false
}
```

2. Convert time between timezones:
```json
{
  "name": "convert_time",
  "arguments": {
    "source_timezone": "America/New_York",
    "time": "16:30",
    "target_timezone": "Asia/Tokyo"
  }
}
```
Response:
```json
{
  "source": {
    "timezone": "America/New_York",
    "datetime": "2024-01-01T12:30:00-05:00",
    "is_dst": false
  },
  "target": {
    "timezone": "Asia/Tokyo",
    "datetime": "2024-01-01T12:30:00+09:00",
    "is_dst": false
  },
  "time_difference": "+13.0h",
}
```

## Debugging

You can use the MCP inspector to debug the server. For uvx installations:

```bash
npx @modelcontextprotocol/inspector uvx time-mcp-local
```

Or if you've installed the package in a specific directory or are developing on it:

```bash
cd path/to/servers/src/time
npx @modelcontextprotocol/inspector uv run time-mcp-local
```

## Examples of Questions for Claude

1. "What time is it now?" (will use system timezone)
2. "What time is it in Tokyo?"
3. "When it's 4 PM in New York, what time is it in London?"
4. "Convert 9:30 AM Tokyo time to New York time"

## build

```bash
uv build --wheel
uv publish --token xxx
```
