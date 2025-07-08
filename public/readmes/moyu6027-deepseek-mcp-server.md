# 🧠  DeepSeek MCP Server


![DeepSeek MCP Server](public/images/deep-mcp.png)

## 🚀 Features

**Enhance Claude's reasoning capabilities** with the integration of DeepSeek R1's advanced reasoning engine. This server enables Claude to tackle complex reasoning tasks by leveraging the reasoning capabilites of deepseek r1 model.

- DeepSeek R1 (The Brain) acts as the advanced reasoning planner:

   - Plans multi-step logical analysis strategies
   - Structures cognitive frameworks
   - Evaluates confidence and uncertainty
   - Monitors reasoning quality
   - Detects edge cases and biases

- Claude (The Executor) implements the reasoning plans:

   - Executes the structured analysis
   - Implements planned strategies
   - Delivers final responses
   - Handles user interaction
   - Manages system integrations

---

## 🚀 Features

### **Advanced Reasoning Capabilities**
- Supports intricate multi-step reasoning tasks.
- Designed for precision and efficiency in generating thoughtful responses.
- 使用无问芯穹的API






---

## Complete Setup guide


### Prerequisites
- Python 3.12 or higher
- `uv` package manager
- INFINI_API_KEY For DeepSeek (Sign up at [无问芯穹](https://cloud.infini-ai.com/genstudio/model))



1. **Clone the Repository**
   ```bash
   git clone https://github.com/moyu6027/deepseek-MCP-server.git
   cd deepseek-MCP-server
   ```

2. **Ensure UV is Set Up**
   - **Windows**: Run the following in PowerShell:
     ```powershell
     powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
     ```
   - **Mac**: Run the following:
     ```bash
     curl -LsSf https://astral.sh/uv/install.sh | sh
     ```

3. **Create Virtual Environment**
   ```bash
   uv venv
   source .venv/bin/activate
   ```

4. **Install Dependencies**
   ```bash
   uv add "mcp[cli]" httpx
   ```

5. **Set Up API Key**
   ```bash
   echo "INFINI_API_KEY=your_key_here" > .env
   ```

6. **Install the Server**
   ```bash
   mcp install server.py -f .env
   ```

7. **Configure MCP Server**
   Edit the `claude_desktop_config.json` file to include the following configuration:

   ```json
   {
       "mcpServers": {
           "deepseek-mcp": {
               "command": "uv",
               "args": [
                   "--directory",
                   "PATH_TO_DEEPSEEK_MCP_SERVER",
                   "run",
                   "server.py"
               ]
           }
       }
   }
   ```

8. **Run the Server**
   ```bash
   uv run server.py
   ```

---

## 🛠 Usage

### Starting the Server
The server automatically starts when used with Claude Desktop. Ensure Claude Desktop is configured to detect the MCP server.

### Example Workflow
1. Claude receives a query requiring advanced reasoning.
2. The query is forwarded to DeepSeek R1 for processing.
3. DeepSeek R1 returns structured reasoning wrapped in `<ant_thinking>` tags.
4. Claude integrates the reasoning into its final response.

---


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
