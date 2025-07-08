# Deepseek r1 reasoning extension for locally running models

Aim: provide locally runnable technical agent system, using a combination of models and no remote models.

Uses deepseek r1 as a reasoning model, which can then be coupled with a tool calling model, for example in the case of goose agent below.
Deepseek r1 and other reasoning models often can't effectively do tool calling, but can be combined with other models which while not as good at reasoning, can do tool calling.

Below is a diagram of how it works with the "project goose" agent, which makes use of ollama with all local models:

![image](https://github.com/user-attachments/assets/f017ece0-f352-4c24-8fa2-7faba4578fad)

This is a generic MCP server so should work with any agent system, as long as ollama is running, and can run entirely locally.

Usage:

```sh
npx -y deepseek-reasoner-mcp
```

This can be used in any agent system.
