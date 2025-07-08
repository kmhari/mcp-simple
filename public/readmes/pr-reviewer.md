# MCP Server



This project implements an MCP (Model Context Protocol) server integrated with Claude Desktop. The server automatically analyzes your Pull Requests, reviews your changes, and adds comments directly to the modified files. It can also approve and merge your PRs. Additionally, the review is saved to a Google Doc in your Google Drive.


## Prerequisites

Before running the MCP server, ensure you have the following libraries installed:

- `requests` 
- `python-dotenv` 
- `mcp[cli]` 
- `pydrive` 


If additional libraries are required, install them using `pip`  or `uv` as needed.

## How to Run the MCP Server

Follow these steps to set up and run the MCP server:


## Claude Desktop Configuration

After cloning  the repository, you'll need to configure Claude Desktop to run the MCP server.
1. [Download](https://claude.ai/download) Claude Desktop
2. Open **Settings** → **Developer**.
3. Click **Edit Config**, then paste the following code:

```json
{
  "mcpServers": {
    "pr_reviewer": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/mcp/project",
        "run",
        "pr-analyzer.py"
      ]
    }
  }
}
```

> **Note:**  
> If you don't have [uv](https://docs.astral.sh/uv/getting-started/installation/) installed, you can modify the config to use `python` instead of `uv` to run the MCP.

---

## GitHub Setup

To generate a GitHub token:

1. Log in to your GitHub account and navigate to **Settings** → **Developer Settings** → **Personal Access Tokens**.
2. Click **Generate New Token** (choose the **classic** version).
3. Provide a name for the token and enable the following permissions:
   - `read:org`
   - `read:repo_hook`
   - `repo`
4. Click **Generate** to create the token.
5. Save the token, you will need it in the `.env` file later.

---

## Google Drive Setup

To enable Google Drive access, make sure you set up authentication.

Follow this [guide](https://d35mpxyw7m7k7g.cloudfront.net/bigdata_1/Get+Authentication+for+Google+Service+API+.pdf) to obtain your credentials.

---

## Creating the `.env` File

Create a `.env` file in the project directory and add the following:

```env
GITHUB_TOKEN=""
GOOGLE_PARENT_FOLDER_ID="" # optional
```

`GOOGLE_PARENT_FOLDER_ID` is the ID of the Google Drive folder where your generated reviews will be organized.  
 You can find it as the last part of the URL in a link like:  
`https://drive.google.com/drive/folders/<folder_id>`

## Demo

[![Watch the video](/pr_reviewer/thumb.png)](https://www.youtube.com/watch?v=Jr7fcfBEWPQ&ab_channel=MohamedElhadjaoui)

