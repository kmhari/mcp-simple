English [中文](README_CN.md)

Below is a revised and polished version of the README.md for the `mcp-sentry-custom` project, formatted properly for clarity, correctness, and professionalism. It adheres to standard Markdown conventions and organizes the content into logical sections.


---

# mcp-sentry-custom: A Sentry MCP Server

## Overview

`mcp-sentry-custom` is a Model Context Protocol (MCP) server designed to retrieve and analyze issues from [Sentry.io](https://sentry.io) or self-hosted Sentry instances. This server provides tools to inspect error reports, stack traces, and other debugging information directly from your Sentry account.

## Features

### Tools

1. **`get_sentry_issue`**
   - **Description**: Retrieve and analyze a specific Sentry issue by its ID or URL.
   - **Input**:
     - `issue_id_or_url` (string): The Sentry issue ID or full URL to analyze.
   - **Returns**: Detailed issue information, including:
     - Title
     - Issue ID
     - Status
     - Level
     - First seen timestamp
     - Last seen timestamp
     - Event count
     - Full stack trace

2. **`get_list_issues`**
   - **Description**: Retrieve and analyze a list of Sentry issues for a specific project.
   - **Input**:
     - `project_slug` (string): The Sentry project slug.
     - `organization_slug` (string): The Sentry organization slug.
   - **Returns**: A list of issues with details, including:
     - Title
     - Issue ID
     - Status
     - Level
     - First seen timestamp
     - Last seen timestamp
     - Event count
     - Basic issue information

### Prompts

1. **`sentry-issue`**
   - **Description**: Retrieve formatted issue details from Sentry for use in conversation context.
   - **Input**:
     - `issue_id_or_url` (string): The Sentry issue ID or URL.
   - **Returns**: Formatted issue details.

## Installation

### Installing via Smithery

To install `mcp-sentry-custom` for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@javaDer/mcp-sentry-custom):

```bash
npx -y @smithery/cli install @javaDer/mcp-sentry-custom --client claude
```

### Using `uv` (Recommended)

When using `uv`, no specific installation is required. You can run `mcp-sentry-custom` directly with `uvx`:

```bash
uvx mcp-sentry-custom --auth-token YOUR_SENTRY_TOKEN --project-slug YOUR_PROJECT_SLUG --organization-slug YOUR_ORGANIZATION_SLUG --sentry-url YOUR_SENTRY_URL
```

### Using `pip`

Alternatively, install `mcp-sentry-custom` via `pip`:

```bash
pip install mcp-sentry-custom
```

Or, with `uv`:

```bash
uv pip install -e .
```

After installation, run it as a script:

```bash
python -m mcp_sentry
```

## Configuration

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

#### Using `uvx`
```json
{
  "mcpServers": {
    "sentry": {
      "command": "uvx",
      "args": [
        "mcp-sentry-custom",
        "--auth-token", "YOUR_SENTRY_TOKEN",
        "--project-slug", "YOUR_PROJECT_SLUG",
        "--organization-slug", "YOUR_ORGANIZATION_SLUG",
        "--sentry-url", "YOUR_SENTRY_URL"
      ]
    }
  }
}
```

#### Using Docker
```json
{
  "mcpServers": {
    "sentry": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "mcp/sentry",
        "--auth-token", "YOUR_SENTRY_TOKEN",
        "--project-slug", "YOUR_PROJECT_SLUG",
        "--organization-slug", "YOUR_ORGANIZATION_SLUG",
        "--sentry-url", "YOUR_SENTRY_URL"
      ]
    }
  }
}
```

#### Using `pip` Installation
```json
{
  "mcpServers": {
    "sentry": {
      "command": "python",
      "args": [
        "-m", "mcp_sentry",
        "--auth-token", "YOUR_SENTRY_TOKEN",
        "--project-slug", "YOUR_PROJECT_SLUG",
        "--organization-slug", "YOUR_ORGANIZATION_SLUG",
        "--sentry-url", "YOUR_SENTRY_URL"
      ]
    }
  }
}
```

### Usage with Zed

Add the following to your `settings.json` in Zed:

#### Using `uvx`
```json
{
  "context_servers": {
    "mcp-sentry-custom": {
      "command": {
        "path": "uvx",
        "args": [
          "mcp-sentry-custom",
          "--auth-token", "YOUR_SENTRY_TOKEN",
          "--project-slug", "YOUR_PROJECT_SLUG",
          "--organization-slug", "YOUR_ORGANIZATION_SLUG",
          "--sentry-url", "YOUR_SENTRY_URL"
        ]
      }
    }
  }
}
```

#### Using `pip` Installation
```json
{
  "context_servers": {
    "mcp-sentry-custom": {
      "command": "python",
      "args": [
        "-m", "mcp_sentry",
        "--auth-token", "YOUR_SENTRY_TOKEN",
        "--project-slug", "YOUR_PROJECT_SLUG",
        "--organization-slug", "YOUR_ORGANIZATION_SLUG",
        "--sentry-url", "YOUR_SENTRY_URL"
      ]
    }
  }
}
```

#### Using `pip` Installation with Custom Path
```json
{
  "context_servers": {
    "mcp-sentry-custom": {
      "command": "python",
      "args": [
        "-m", "mcp_sentry",
        "--auth-token", "YOUR_SENTRY_TOKEN",
        "--project-slug", "YOUR_PROJECT_SLUG",
        "--organization-slug", "YOUR_ORGANIZATION_SLUG",
        "--sentry-url", "YOUR_SENTRY_URL"
      ],
      "env": {
        "PYTHONPATH": "path/to/mcp-sentry-custom/src"
      }
    }
  }
}
```

## Debugging

Use the MCP inspector to debug the server.

### For `uvx` Installations
```bash
npx @modelcontextprotocol/inspector uvx mcp-sentry-custom --auth-token YOUR_SENTRY_TOKEN --project-slug YOUR_PROJECT_SLUG --organization-slug YOUR_ORGANIZATION_SLUG --sentry-url YOUR_SENTRY_URL
```

### For Local Development
If you've installed the package in a specific directory or are developing it:

```bash
cd path/to/mcp-sentry-custom/src
npx @modelcontextprotocol/inspector uv run mcp-sentry-custom --auth-token YOUR_SENTRY_TOKEN --project-slug YOUR_PROJECT_SLUG --organization-slug YOUR_ORGANIZATION_SLUG --sentry-url YOUR_SENTRY_URL
```

Or, with a custom directory:

```bash
npx @modelcontextprotocol/inspector uv --directory /path/to/mcp-sentry-custom/src run mcp_sentry --auth-token YOUR_SENTRY_TOKEN --project-slug YOUR_PROJECT_SLUG --organization-slug YOUR_ORGANIZATION_SLUG --sentry-url YOUR_SENTRY_URL
```

## Forked From

This project is forked from:  
[https://github.com/modelcontextprotocol/servers/tree/main/src/sentry](https://github.com/modelcontextprotocol/servers/tree/main/src/sentry)

## License

This MCP server is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, see the `LICENSE` file in the project repository.

---

### Notes on Changes
1. **Formatting**: Used proper Markdown headings, lists, and code blocks for readability.
2. **Consistency**: Standardized terminology (e.g., `mcp_sentry` vs. `mcp-sentry-custom`) and removed redundant `<TEXT>` and `<JSON>` tags.
3. **Clarity**: Rewrote sections like "Overview" and "Features" for conciseness and precision.
4. **Completeness**: Fixed incomplete sentences and ensured all configuration examples were properly structured.
5. **Professional Tone**: Adjusted wording to sound more formal and polished.

Let me know if you'd like further refinements!