# pay-up
PayUp is a MCP server that is meant to be a replacement for Splitwise for all my future trips. 


## How to use it? 
1. Clone the repo
2. Run make 
3. Add the following to your `claude_desktop_config.json` file, and it should just work.   
```
{
  "mcpServers": {
    "weather": {
         }, 
    "payup": {
        "command" : "/Users/shreyesh/projects/payup/payup"
    }
  }
}
```

## Improvements

This definitely needs a better client than the existing one because right now my prompts have to be too long for it to understand what it needs to do. Ideally, the MCP client should have the prompts built in for each of the use-cases and then it just calls the relevant MCP server tools as required. 


## Some Screenshots 

![My chat with Claude](assets/chat_claude.png)
![My DB entry](assets/mysql_sc.png)
