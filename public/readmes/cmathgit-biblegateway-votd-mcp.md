# BibleGateway Verse of the Day MCP Server

This is a MCP server for the BibleGateway Verse of the Day: NO API Key Required

#Example VOTD URL KJV ID: 9
```
https://www.biblegateway.com/votd/get/?format=JSON&version=9
```

[BibleGateway VOTD Documentation](https://www.biblegateway.com/share/#versehtml)

For a list of all the versions and their IDs, see:
[Version List](https://www.biblegateway.com/usage/linking/versionslist/)

#MCP Server Demo on YouTube:
[MCP Server Demo on YouTube](https://www.youtube.com/watch?v=34QvzTQ0_fg)

## Installation: use guide by [Model Context Protocol Quickstart: For Server Developers](https://modelcontextprotocol.io/quickstart/server) which uses [uv](https://docs.astral.sh/uv/getting-started/installation/) instead of pip
```
git clone https://github.com/cmathgit/biblegateway-votd-mcp.git
cd biblegateway-votd-mcp
# Create virtual environment and activate it
uv venv
.venv\Scripts\activate
# Install dependencies
uv add mcp[cli] httpx
```
#Feel free to test each of the servers by running them with uv
```
uv run biblegateway-votd.py
```

#Before adding any of the servers to the MCP configuration, be selective about which languages you add. biblegateway-votd.py has some versions that I use primarily. Feel free to add/replace any versions from the other languages that you think you'll need in this file. Please refer to the [Version List](https://www.biblegateway.com/usage/linking/versionslist/) for a list of all the versions and their IDs. I created servers for every version and language available, so you can obtain those via the GitHub repo history. Some IDEs such as Cursor will limit the number of tools that can be added to the global context. There are many languages covered by the BibleGateway VOTD, and thus many tools, so be sure to only add the versions you need. Some Plugins such as Cline and Roo Code allow Project scoped context, so you can add all the tools and only use the ones you need for a specific project.

#Add the servers to the MCP, include this configuration in your IDEs mcp json config file. Roo code, Cline, and Cursor have an MCP servers settings menu with a "Configure MCP Servers" button that will open the mcp.json file in your IDE. Cursor is known to limit the combined length of the server name and tool name to 60 characters. I am working to resolve an issue with Cline, but the tools seem to work even though the server lists an error. Roo Code sems to handle the server well. As for setting up the Claude desktop configuration, IDK.
```
{
    "mcpServers": {
        "biblegateway-votd": {
            "command": "/ABSOLUTE/PATH/TO/PARENT/FOLDER/uv",
            "args": [
                "--directory",
                "/ABSOLUTE/PATH/TO/PARENT/FOLDER/biblegateway-votd-mcp",
                "run",
                "biblegateway-votd-basic.py"
            ]
        }
    }
}
```

#To use the MCP in your agent, simple ask for the VOTD in the language/bible version of your choice.
Nueva Versión Internacional bible
```
What is the verse of the day in the Nueva Versión Internacional bible?
```
Contemporary English Version
```
What is the verse of the day in the Contemporary English Version
```
New International Version (by ID #)
```
What is the verse of the day in the bible version with ID: 31
```
Gujarati: પવિત્ર બાઈબલ (Pavitra Baibal) or Holy Bible 
```
What is the verse of the day in the bible version with ID: 278
```
Gujarati: પવિત્ર બાઈબલ (Pavitra Baibal) or Holy Bible (by ID # 278)
```
What is the verse of the day in the પવિત્ર બાઈબલ (Pavitra Baibal) or Hindi Holy Bible
```

# You mat need to tweak the tool names to fit your IDE's context length limit, but I find the ID # works well. Refer to Version List to find the ID # for the version you want: [Version List](https://www.biblegateway.com/usage/linking/versionslist/).

