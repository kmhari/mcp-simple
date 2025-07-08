# Open Deep Research MCP Server

An AI-powered research assistant that performs deep, iterative research on any topic. It combines search engines, web scraping, and AI to explore topics in depth and generate comprehensive reports. Available as a Model Context Protocol (MCP) tool or standalone CLI. Look at exampleout.md to see what a report might look like.

## Quick Start

1. Clone and install:
```bash
git clone https://github.com/Ozamatash/deep-research
cd deep-research
npm install
```

2. Set up environment in `.env.local`:
```bash
# Copy the example environment file
cp .env.example .env.local
```

3. Build:
```bash
# Build the server
npm run build
```

4. Run the cli version:
```bash
npm run start
```
5. Test MCP Server with Claude Desktop:  
Follow the guide thats at the bottom of server quickstart to add the server to Claude Desktop:  
https://modelcontextprotocol.io/quickstart/server

For remote servers: Streamable HTTP
```bash
npm run start:http
```
Server runs on `http://localhost:3000/mcp` without session management.

## Features

- Performs deep, iterative research by generating targeted search queries
- Controls research scope with depth (how deep) and breadth (how wide) parameters
- Evaluates source reliability with detailed scoring (0-1) and reasoning
- Prioritizes high-reliability sources (≥0.7) and verifies less reliable information
- Generates follow-up questions to better understand research needs
- Produces detailed markdown reports with findings, sources, and reliability assessments
- Available as a Model Context Protocol (MCP) tool for AI agents
- For now MCP version doesn't ask follow up questions

## How It Works

```mermaid
flowchart TB
    subgraph Input
        Q[User Query]
        B[Breadth Parameter]
        D[Depth Parameter]
        FQ[Feedback Questions]
    end

    subgraph Research[Deep Research]
        direction TB
        SQ[Generate SERP Queries]
        SR[Search]
        RE[Source Reliability Evaluation]
        PR[Process Results]
    end

    subgraph Results[Research Output]
        direction TB
        L((Learnings with
        Reliability Scores))
        SM((Source Metadata))
        ND((Next Directions:
        Prior Goals,
        New Questions))
    end

    %% Main Flow
    Q & FQ --> CQ[Combined Query]
    CQ & B & D --> SQ
    SQ --> SR
    SR --> RE
    RE --> PR

    %% Results Flow
    PR --> L
    PR --> SM
    PR --> ND

    %% Depth Decision and Recursion
    L & ND --> DP{depth > 0?}
    DP -->|Yes| SQ
    
    %% Final Output
    DP -->|No| MR[Markdown Report]

    %% Styling
    classDef input fill:#7bed9f,stroke:#2ed573,color:black
    classDef process fill:#70a1ff,stroke:#1e90ff,color:black
    classDef output fill:#ff4757,stroke:#ff6b81,color:black
    classDef results fill:#a8e6cf,stroke:#3b7a57,color:black,width:150px,height:150px

    class Q,B,D,FQ input
    class SQ,SR,RE,PR process
    class MR output
    class L,SM,ND results
```
## Advanced Setup

### Using Local Firecrawl (Free Option)

Instead of using the Firecrawl API, you can run a local instance. You can use the official repo or my fork which uses searXNG as the search backend to avoid using a searchapi key:

1. Set up local Firecrawl:
```bash
git clone https://github.com/Ozamatash/localfirecrawl
cd localfirecrawl
# Follow setup in localfirecrawl README
```

2. Update `.env.local`:
```bash
FIRECRAWL_BASE_URL="http://localhost:3002"
```

### Optional: Observability

Add observability to track research flows, queries, and results using Langfuse:

```bash
# Add to .env.local
LANGFUSE_PUBLIC_KEY="your_langfuse_public_key"
LANGFUSE_SECRET_KEY="your_langfuse_secret_key"
```

The app works normally without observability if no Langfuse keys are provided.

## License

MIT License
