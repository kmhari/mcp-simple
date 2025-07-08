# Review Toolkit MCP

A Model Context Protocol (MCP) service to help AI agents manage and track code review sessions.

## Features

- Start new review sessions or resume existing ones
- Track files that need review
- Track review status for each file
- Store AI agent reviews for each file
- Generate review reports including agent reviews
- Token counting to manage context limits (includes file content and agent reviews)
- Persistent sessions stored in user's home directory
- Automatic token count reset when resuming sessions
- Built-in agent instructions accessible via tool

## Configuration

The MCP supports the following command-line arguments:

- `--session-dir`: Custom directory path to store review sessions
  - Default: `~/.review-toolkit-sessions/`

## Setting up in Cursor

To use this MCP in Cursor, add the following configuration to your Cursor settings:

### Mac/Linux

```json
{
  "mcpServers": {
    "review-toolkit": {
      "command": "npx",
      "args": ["-y", "review-toolkit-mcp"]
    }
  }
}
```

### Windows

```json
{
  "mcpServers": {
    "review-toolkit": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "review-toolkit-mcp"]
    }
  }
}
```

### Custom Session Directory

If you want to specify a custom directory for storing sessions, you can add the `--session-dir` argument:

#### Mac/Linux

```json
{
  "mcpServers": {
    "review-toolkit": {
      "command": "npx",
      "args": [
        "-y",
        "review-toolkit-mcp",
        "--session-dir=/path/to/your/sessions/directory"
      ]
    }
  }
}
```

#### Windows

```json
{
  "mcpServers": {
    "review-toolkit": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "review-toolkit-mcp",
        "--session-dir=C:\\path\\to\\your\\sessions\\directory"
      ]
    }
  }
}
```

## Usage

This MCP provides tools for AI agents to manage code review sessions. It supports:

1. Starting/resuming review sessions
2. Tracking review progress
3. Managing agent reviews for each file
4. Generating reports
5. Token management for context limits

## Working with Agents

### Preparation Before Starting a Review

Before initiating a code review, consider these preparation steps:

1. **Create Code Review Rules**

   - Define specific rules tailored to your project's needs and code review format
   - Examples:
     - Code style and formatting standards
     - Architecture and design principles
     - Security requirements
     - Performance considerations
     - Documentation requirements

2. **Import Manual Rules**
   - If your project has existing manual rules or style guides, provide them to the agent
   - These could be company-wide standards, framework-specific conventions, or project-specific guidelines

### Example Prompts

#### Starting a New Code Review

```
I'd like you to perform a code review on my project. Please use the review-toolkit MCP to:

1. Start a new review session using the "glob" mode with the pattern "**/*.js" (or "changed" mode to review recent changes)
2. Review each file methodically, checking for:
   - Code quality and best practices
   - Potential bugs or errors
   - Security vulnerabilities
   - Performance concerns
   - Documentation completeness
3. For each file, provide specific feedback with line references
4. After reviewing all files, generate a comprehensive report

Here are my project-specific code review rules to follow:
[List your custom rules here]
```

#### Resuming an Existing Review

```
Let's continue the code review session that was started earlier. Please:

1. Resume the existing review session for my project
2. Continue reviewing the remaining files
3. Apply the same review criteria we established earlier
4. Generate a final report once all files have been reviewed

If you encounter token limits, please let me know so we can start a new chat session while preserving the review progress.
```

## Tools

### get-agent-instructions

Get detailed instructions for how agents should use the review toolkit MCP tools. This is typically the first tool that an agent should call when working with the review toolkit.

Parameters:

- None

### start-review-session

Start a new code review session or resume an existing one. This should be the first tool called when starting or resuming a review process. When resuming, token count is automatically reset.

Parameters:

- `projectRoot` (string): The root directory of the project
- `mode` (string): The mode for listing files: 'glob', 'changed', 'staged', or 'resume' to resume an existing session
- `glob` (string | optional): The glob pattern to match files against (required if mode is 'glob')
- `files` (string[] | optional): Array of file paths to review (overrides mode if provided)
- `tokenLimit` (number | optional): Maximum token limit for the session (default: 10000)
- `forceNew` (boolean | optional): Force creation of a new session even if one exists

### get-next-review-file

Get the next file that needs to be reviewed.

Parameters:

- `key` (string): Session ID or project root path

### submit-file-review

Submit a review for a file. The tool counts tokens for the file content and agent review.

Parameters:

- `key` (string): Session ID or project root path
- `filePath` (string): The file path that was reviewed
- `agentReview` (string): The AI agent's review of the file
- `projectRoot` (string | optional): The project root directory (if different from key)

### complete-review-session

Mark a review session as completed.

Parameters:

- `key` (string): Session ID or project root path

### generate-review-report

Generate a report for a review session, including agent reviews.

Parameters:

- `key` (string): Session ID or project root path

## Session Persistence

Review sessions are saved in `~/.review-toolkit-sessions/` directory. Each project can have one active session at a time.

## License

MIT
