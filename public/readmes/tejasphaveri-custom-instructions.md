I updated the [ultimatememory system](https://github.com/freezscholte/AI-Codex/blob/main/docs/Prompts/Cline/Ultimate%20Memory%20Bank%20System/Ultimate_Memory_Bank_System.md) from @freezscholte, to enhance scalability, collaboration, and tool optimization.

Deeply integrated Context7 and Sequential Thinking MCP tools across all protocols to improve accuracy and reasoning in memory management and task execution.

**Changes and Additions in Simple Terms:**
- **Before (Old Instructions):** The original system focused on basic memory management with a structure for organizing project information, tasks, and decisions. It had protocols for analyzing, planning, and executing tasks but lacked advanced tools for technical accuracy and complex reasoning.
- **After (New Instructions):** The updated system adds two powerful tools:
  - **Context7 Tool:** Helps get the latest information on software libraries and technologies to keep technical details accurate and up-to-date.
  - **Sequential Thinking Tool:** Breaks down complicated problems into step-by-step thinking to make decisions clearer and more logical.
- **New Features:** Added support for very large projects with a tiered memory system, improved teamwork between multiple AI agents, and updated all workflows to use these new tools for better results.

Highly, highly recommend using these custom instructions with grok 3 as it actually follows the instructions exactly.


Add theese mcp servers.

{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ]
    },
    "context7": {
      "command": "bunx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}


Updates

Will implement git to local commit after every task 