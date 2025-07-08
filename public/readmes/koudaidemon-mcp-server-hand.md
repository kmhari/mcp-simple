# Hand Marketing MCP Server

This MCP Server analyzes user conversations to accurately extract multi-dimensional tags, intelligently matches them with product tags from an industry database, and thereby provides users with highly tailored product recommendations that align with their needs—enhancing both shopping experience and conversion rates.

## Features

- Conversation Analysis & Tag Extraction: Function: Analyzes user dialogues to extract multi-dimensional tags (e.g., preferences, scenarios, budgets) via NLP.
- Intelligent Tag Matching: Dynamically aligns user tags with product tags from an industry database using rule-based or ML-driven algorithms.
- Scalability & Real-Time Processing: Supports cross-industry databases (e-commerce, travel, etc.).
- Personalized Recommendation Engine: Generates highly tailored product recommendations based on matched tags, optimizing relevance and ranking.
- Performance Optimization: Reduces decision fatigue by filtering irrelevant options.

## Prerequisites

- Get Hand Marketing MCP Server Auth Key

## Getting started

- Configure

Please set the value for auth key

```json
{
  "mcpServers": {
    "hand-marketing-mcp-sse": {
      "url": "https://mcp.linkcrm.cn/sse?key=xxxxx"
    }
  }
}
```

- Run
Use Hand Marketing MCP Server in a MCP client, like 火山方舟/Cursor/Claude macOS app/Cherry Studio.
