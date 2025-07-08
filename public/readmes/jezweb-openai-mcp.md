# OpenAI MCP - DALL-E API Integration for Roo Code

This project provides a Model Context Protocol (MCP) server for connecting to OpenAI's DALL-E API for image generation with full support for all available options. It's specifically designed to work with Roo Code and other MCP-compatible AI assistants.

## Overview

This MCP server provides a tool for DALL-E image generation with comprehensive support for all DALL-E API options. It allows AI assistants like Roo Code to generate images through the Model Context Protocol (MCP) with fine-grained control over the generation process.

## Project Structure

- `src/` - Source code for the MCP server
  - `dalle.ts` - Implementation of the DALL-E API integration with all options
  - `index.ts` - Main server file with the DALL-E tool and input schema
  - `install.ts` - Installation script for Roo Code and Claude Desktop
- `build/` - Compiled JavaScript files
- `dalle-test.html` - HTML page to display the generated image and document available options
- `test-dalle.js` - Direct test script for the DALL-E API with examples of different options

## Setup Instructions for Roo Code

### Installation

1. Install the package globally:
   ```
   npm install -g openai-mcp
   ```

2. Run the setup command to configure Roo Code:
   ```
   openai-mcp install
   ```

3. Set your OpenAI API key in Roo Code settings:
   - Open Roo Code
   - Go to Settings
   - Add the following environment variable to the MCP server configuration:
     ```json
     "openai-mcp": {
       "env": {
         "OPENAI_API_KEY": "your-openai-api-key"
       }
     }
     ```

4. Restart Roo Code