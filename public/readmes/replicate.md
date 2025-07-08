# MCP Server for Replicate

A FastMCP server implementation for interfacing with Replicate's API. This server provides tools for accessing various AI models hosted on Replicate through a standardized interface.

## Current Status: Early Alpha

This project is in early alpha development. Features and APIs may change significantly.

### Currently Supported
- Image generation models with:
  - Model schema inspection
  - Image generation with customizable parameters
  - Output resizing and optimization

## Roadmap

### Planned Features
1. Text Generation
   - Support for text completion models
   - Chat model integration
   - Streaming support for real-time responses

2. Video Generation
   - Support for video generation models
   - Video output handling and optimization
   - Progress tracking for long-running generations

3. Additional Features
   - Model version management
   - Better error handling and retries
   - Caching for frequently used models
   - Rate limiting and queue management

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up your Replicate API token in `.env`:
```
REPLICATE_API_TOKEN=your_token_here
```

3. Run the server:
```bash
fastmcp dev server.py
```
