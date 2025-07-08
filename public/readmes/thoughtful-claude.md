# 🤔 Thoughtful Claude - DeepSeek R1 Reasoning Server

An MCP server that enhances Claude's reasoning capabilities by integrating DeepSeek R1's advanced reasoning engine. This server provides Claude with access to DeepSeek's state-of-the-art reasoning model, developed through large-scale reinforcement learning.

## 🌟 Features

- **Advanced Reasoning Integration**
  - Leverages DeepSeek R1's reasoning engine
  - Seamlessly integrates with Claude's thought process
  - Handles complex multi-step reasoning tasks
  
- **Enterprise-Grade Security**
  - Environment variable support (.env file)
  - Secure API key handling
  - No key exposure in responses

- **MCP Protocol Support**
  - Full MCP server implementation
  - Streaming response handling
  - Proper error management

- **Modern Python Architecture**
  - Async/await for efficient processing
  - Proper exception handling
  - Clean code organization

## 📦 Installation

1. **Prerequisites**
   - Python 3.12+
   - [uv](https://github.com/astral-sh/uv) package manager
   - DeepSeek API key (get one from [platform.deepseek.com](https://platform.deepseek.com))

2. **Quick Start**
```bash
# Clone repository
git clone https://github.com/martinbowling/thoughtful-claude.git
cd thoughtful-claude

# Install MCP and dependencies
pip install "mcp[cli]" httpx python-dotenv

# Create .env file with your API key
echo "DEEPSEEK_API_KEY=your_key_here" > .env

# Install the MCP server with environment variables
mcp install server.py -f .env
```

The `mcp install` command will:
- Register the server with Claude Desktop
- Set up the environment variables from `.env`
- Configure the server to run with the correct Python interpreter

You can verify the installation by checking for the 🔨 Tools icon in Claude Desktop's interface.

## 🚀 Usage

1. **Start the Server**
The server will automatically start when you use Claude Desktop with the proper configuration.

2. **Basic Workflow**
   - Claude receives a query requiring reasoning
   - Query is sent to DeepSeek R1 for advanced reasoning
   - Reasoning is returned to Claude wrapped in `<ant_thinking>` tags
   - Claude incorporates the reasoning into its response

3. **Example Queries**
   - Mathematical comparisons: "Is 9.9 greater than 9.11?"
   - Logic puzzles: "If all A are B, and some B are C, what can we conclude?"
   - Complex analysis: "Compare and contrast quantum computing with classical computing"

## 🧠 Technical Details

### Reasoning Pipeline
1. **Query Processing**
   - Accepts context and question in structured format
   - Combines inputs for comprehensive reasoning

2. **DeepSeek R1 Integration**
   - Model: `deepseek-reasoner`
   - Stream: Enabled for real-time processing
   - Max Tokens: 1 (optimized for reasoning extraction)
   - Output: Structured reasoning content

### Error Handling
- **API Errors**
  - Graceful error wrapping in `<ant_thinking>` tags
  - Clear error messages for debugging
  - Proper exception propagation

- **Connection Issues**
  - Timeout handling (30s default)
  - Automatic stream cleanup
  - Resource management

## 🛠 Troubleshooting

**Common Issues**
```bash
# Server not found in Claude Desktop
ERROR: MCP server not detected

# Solution
Check claude_desktop_config.json path and format
```

**Performance Tips**
- Keep queries focused and specific
- Provide relevant context when available
- Use structured input format for complex queries

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- [DeepSeek R1](https://github.com/deepseek-ai/DeepSeek-R1) - For their groundbreaking work in reasoning capabilities
- [Claude](https://www.anthropic.com/claude) - For the advanced AI assistant platform
- [MCP Protocol](https://github.com/mcp-lang/mcp) - For enabling seamless AI tool integration
