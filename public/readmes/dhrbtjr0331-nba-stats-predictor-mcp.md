# MCP Server for NBA Stats Predictor Application 

An MCP-powered tool for the NBA stats predictor app that generates player performance forecasts using real-time data analysis and advanced statistical modeling.

[![Demo](https://img.youtube.com/vi/8uVuVz1Fbu0/0.jpg)](https://youtu.be/8uVuVz1Fbu0)
## Installation

### Prerequisites
- Python 3.8+
- pip
- Claude Desktop

### Step-by-Step Setup

1. Clone this repository onto your local device

2. Navigate to the project directory:
   ```bash
   cd nba-stats-predictor-application
   ```

3. Create a virtual environment:
   ```bash
   python3 -m venv venv
   ```

4. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```

5. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

6. Download the necessary data:
   ```bash
   python3 data_pipeline/download_data.py
   ```

7. Train the prediction model:
   ```bash
   python3 models/train_model.py
   ```

8. Start the FastAPI server:
   ```bash
   uvicorn api.fastapi_server:app --reload
   ```

9. Open a new terminal

10. Return to the project directory

11. Install UV package manager:
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

12. Restart the terminal in this directory

13. Run the MCP server:
    ```bash
    uv run mcp_main.py
    ```

14. Open another new terminal

15. Configure Claude Desktop:
    ```bash
    code ~/Library/Application\ Support/Claude/claude_desktop_config.json
    ```
    Note: If the file doesn't exist, create it.

16. Add the following configuration to `claude_desktop_config.json`:
    ```json
    {
        "mcpServers": {
            "NBA-stats-predictor": {
                "command": "/PATH/TO/PROJECT/DIRECTORY/.venv/bin/uv",
                "args": [
                    "--directory",
                    "/PATH/TO/PROJECT/DIRECTORY/",
                    "run",
                    "mcp_main.py"
                ]
            }
        }
    }
    ```
    Remember to replace `/PATH/TO/PROJECT/DIRECTORY/` with the actual path to your project.

17. You should now be able to use this MCP tool on Claude Desktop.

## Usage

Once configured, you can use the NBA stats predictor tool in Claude Desktop to get predictions for player performance in upcoming games.

## Troubleshooting

- Make sure all paths in the configuration are correct
- Ensure the virtual environment is activated before running commands
- Check that all dependencies are properly installed
- Verify that the FastAPI server is running before using the MCP tool
