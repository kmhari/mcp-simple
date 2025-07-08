# Cognition Wheel MCP Server

A Model Context Protocol (MCP) server that implements a "wisdom of crowds" approach to AI reasoning by consulting multiple state-of-the-art language models in parallel and synthesizing their responses.

## Quick Start

### Option 1: Use with npx (Recommended)

```bash
# Run directly with npx (no installation needed)
npx mcp-cognition-wheel

# Or install globally
npm install -g mcp-cognition-wheel
mcp-cognition-wheel
```

### Option 2: Build from source

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env` and add your API keys
4. Build the project: `pnpm run build`

## How It Works

The Cognition Wheel follows a three-phase process:

1. **Parallel Consultation**: Simultaneously queries three different AI models:
   - Claude-4-Opus (Anthropic)
   - Gemini-2.5-Pro (Google)
   - O3 (OpenAI)

2. **Anonymous Analysis**: Uses code names (Alpha, Beta, Gamma) to eliminate bias during the synthesis phase

3. **Smart Synthesis**: Randomly selects one of the models to act as a synthesizer, which analyzes all responses and produces a final, comprehensive answer

## Features

- **Parallel Processing**: All models are queried simultaneously for faster results
- **Bias Reduction**: Anonymous code names prevent synthesizer bias toward specific models
- **Internet Search**: Optional web search capabilities for all models
- **Detailed Logging**: Comprehensive debug logs for transparency and troubleshooting
- **Robust Error Handling**: Graceful degradation when individual models fail

## Installation

### Option 1: Use with npx (Recommended)

```bash
# Run directly with npx (no installation needed)
npx mcp-cognition-wheel

# Or install globally
npm install -g mcp-cognition-wheel
mcp-cognition-wheel
```

### Option 2: Build from source

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env` and add your API keys
4. Build the project: `pnpm run build`

## Usage

This is an MCP server designed to be used with MCP-compatible clients like Claude Desktop or other MCP tools.

### Required Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `GOOGLE_GENERATIVE_AI_API_KEY`: Your Google AI API key  
- `OPENAI_API_KEY`: Your OpenAI API key

### Using with Cursor

Based on the guide from [this dev.to article](https://dev.to/andyrewlee/use-your-own-mcp-on-cursor-in-5-minutes-1ag4), here's how to integrate with Cursor:

#### Option 1: Using npx (Recommended)

1. **Open Cursor Settings**:
   - Go to Settings → MCP
   - Click "Add new MCP server"

2. **Configure the server**:
   - **Name**: `cognition-wheel`
   - **Command**: `npx`
   - **Args**: `["-y", "mcp-cognition-wheel"]`
   
   Example configuration:
   ```json
   {
     "cognition-wheel": {
       "command": "npx",
       "args": ["-y", "mcp-cognition-wheel"],
       "env": {
         "ANTHROPIC_API_KEY": "your_anthropic_key",
         "GOOGLE_GENERATIVE_AI_API_KEY": "your_google_key", 
         "OPENAI_API_KEY": "your_openai_key"
       }
     }
   }
   ```

#### Option 2: Using local build

1. **Build the project** (if not already done):
   ```bash
   pnpm run build
   ```

2. **Configure the server**:
   - **Name**: `cognition-wheel`
   - **Command**: `node`
   - **Args**: `["/absolute/path/to/your/cognition-wheel/dist/app.js"]`
   
   Example configuration:
   ```json
   {
     "cognition-wheel": {
       "command": "node",
       "args": [
         "/Users/yourname/path/to/cognition-wheel/dist/app.js"
       ],
       "env": {
         "ANTHROPIC_API_KEY": "your_anthropic_key",
         "GOOGLE_GENERATIVE_AI_API_KEY": "your_google_key", 
         "OPENAI_API_KEY": "your_openai_key"
       }
     }
   }
   ```

3. **Test the integration**:
   - Enter Agent mode in Cursor
   - Ask a complex question that would benefit from multiple AI perspectives
   - The `cognition_wheel` tool should be automatically triggered

### Tool Usage

The server provides a single tool called `cognition_wheel` with the following parameters:

- `context`: Background information and context for the problem
- `question`: The specific question you want answered
- `enable_internet_search`: Boolean flag to enable web search capabilities

## Development

- `pnpm run dev`: Watch mode for development
- `pnpm run build`: Build the TypeScript code
- `pnpm run start`: Run the server directly with tsx

## Docker

Build and run with Docker:

```bash
# Build the image
docker build -t cognition-wheel .

# Run with environment variables
docker run --rm \
  -e ANTHROPIC_API_KEY=your_key \
  -e GOOGLE_GENERATIVE_AI_API_KEY=your_key \
  -e OPENAI_API_KEY=your_key \
  cognition-wheel
```

## License

MIT 