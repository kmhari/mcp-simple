# 10XResearcher

[English](./README.md) | [中文](./README.zh-CN.md)

Run ChatGPT and Manus-like deep research at your desktop for just $20/month by transforming Claude into a powerful research agent with local data storage.

## What is 10XResearcher?

10XResearcher transforms Claude into a systematic research agent that follows an iterative methodology, stores all findings locally, and produces high-quality research outcomes.

### Key Benefits

- **Cost-effective**: Only requires Claude Desktop's $20/month subscription
- **Local storage**: All research files and findings stored locally
- **Systematic approach**: Alternating Discussion and Research phases
- **Evidence-based**: All claims linked to stored references
- **Resumable research**: Can pause and continue research across multiple conversations by simply referencing the project name

## System Requirements

- Claude Desktop subscription
- Python 3.10+
- Node.js 14+
- Git

## Installation

### 1. Install Required Software

1. Install Python from [python.org](https://python.org)
2. Install Node.js from [nodejs.org](https://nodejs.org)
3. Subscribe to Claude Desktop from [anthropic.com](https://www.anthropic.com/claude)

### 2. Install Dependencies

```bash
# Install uvx for MCP server capabilities
pip install uvx

# For desktop commander, follow Option 5 from the GitHub repository:
# 1. Clone the repo: git clone https://github.com/wonderwhy-er/DesktopCommanderMCP.git
# 2. Navigate to the directory: cd DesktopCommanderMCP
# 3. Run: npm install
# 4. Build: npm run build
```

### 3. Configure MCP Servers

1. Open Claude Desktop → Settings → MCP Servers
2. Add the following configuration (update paths for your system):

```json
{
  "mcpServers": {
    "git": {
      "timeout": 60,
      "command": "/path/to/python/bin/uvx",
      "args": [
        "mcp-server-git",
        "--repository",
        "/path/to/your/research/directory"
      ],
      "transportType": "stdio"
    },
    "browser-use": {
      "disabled": false,
      "timeout": 60,
      "command": "uvx",
      "args": [
        "mcp-browser-use"
      ],
      "transportType": "stdio"
    },
    "desktop-commander": {
      "timeout": 60,
      "command": "node",
      "args": [
        "/path/to/your/DesktopCommanderMCP/dist/index.js"
      ],
      "transportType": "stdio"
    }
  }
}
```

**Important notes:**
- Replace `/path/to/python/bin/uvx` with your actual uvx path
- Replace `/path/to/your/research/directory` with where you want research stored
- Replace `/path/to/your/DesktopCommanderMCP/dist/index.js` with the path to your locally built DesktopCommanderMCP's dist/index.js file

We use the following MCP implementations:
- Browser: [mcp-browser-use](https://github.com/vinayak-mehta/mcp-browser-use)
- Desktop commands: [DesktopCommanderMCP](https://github.com/wonderwhy-er/DesktopCommanderMCP)
- Git: [mcp-server-git](https://github.com/modelcontextprotocol/servers/tree/main/src/git)

#### Finding Your Python Path

On macOS/Linux:
```bash
which uvx
```

On Windows:
```
where uvx
```

### 4. Create Research Directory

```bash
mkdir -p ~/claude_space/research
```

## Usage with Claude Projects

### Setting Up a Research Project

1. Open Claude Desktop → Projects → New Project
2. Name the project based on your research topic
3. Click "Set project instructions"
4. Copy the entire contents of [prompt_instructions.md](./prompt_instructions.md) into this field
5. Click "Save"

### Starting Research

1. Open your project
2. Start a new conversation within this project
3. Describe your research request
4. Claude will begin with a Discussion phase to understand your needs

### Resuming Research

1. Open the same project
2. Start a new conversation
3. Reference your research project name (e.g., "Continue my RenewableEnergyMarket research")
4. Claude will read the existing repository and resume where you left off

### Example Prompts

To start research:
```
I need to research renewable energy market trends for potential investments
```

To resume research:
```
Continue my RenewableEnergyMarket research. What's the current status?
```

### Best Practices

- Keep all research conversations within the same project
- Start each new conversation with a clear reference to your research project name
- Let Claude complete each phase before interrupting
- Review the local repository files periodically to see stored research

## How It Works

10XResearcher implements a structured research methodology:

1. **Discussion Phase**: Claude gathers requirements and develops a research plan
2. **Research Phase**: Claude conducts web research with comprehensive documentation
3. **Repeat**: The process cycles between discussion and research phases until completion

All research is stored in local git repositories with detailed documentation.

## Troubleshooting

### MCP Server Connection Issues
- Verify correct paths in configuration
- Check that all dependencies are installed
- Ensure Claude Desktop has permissions to execute commands

### Repository Access Issues
- Confirm the repository path exists and is accessible
- Check file permissions on the directory
- Verify git is installed and accessible

### Browser Issues
- Confirm browser-use MCP server is enabled
- Check that your system has a compatible browser installed

## Known Issues

1. **Truncated Responses**: Claude may stop mid-response when generating lengthy content. Type "Continue" to have it resume.

2. **Long Conversation Limits**: After multiple "Continue" prompts, you may see a warning about usage limits. This indicates potential throttling and increased risk of Claude stopping unexpectedly. To mitigate this, start a new chat at convenient checkpoints and reference your project name to resume.

3. **MCP Authorization**: You need to authorize each MCP action at least once when opening a new chat. While this setup also works with Claude (Cline), the auto-approval function may not work consistently.

4. **Token Costs with Other Clients**: Using this setup with Cursor or Cline will incur token costs, unlike the fixed-fee Claude Desktop.

## Additional Resources

- [prompt_instructions.md](./prompt_instructions.md) - The core prompt system
- [example_project](./example_project/) - Sample research project structure

## Support and Feedback

For feature requests, bug reports, or general discussions, please contact [@chcharcharlie on Twitter](https://twitter.com/chcharcharlie).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
