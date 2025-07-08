# Perplexity AI MCP Server

This repository contains the source code for a Model Context Protocol (MCP) server that provides access to the Perplexity AI API.  This server allows users to interact with Perplexity AI through various tools, including chatting, searching, and retrieving documentation.

## Purpose

This server simplifies the integration of Perplexity AI into MCP-based systems.  It provides a convenient and standardized way to access Perplexity AI's capabilities.

## Setup

1.  **Install Node.js and npm:** Ensure you have Node.js and npm installed on your system.
2.  **Clone the repository:** Clone this repository to your local machine.
3.  **Install dependencies:** Navigate to the project directory and run `npm install`.
4.  **Configure API Key:** Set the `PERPLEXITY_API_KEY` environment variable to your Perplexity API key.
5.  **Run the server:** Run `npm start` to start the server.

## Usage

The server exposes several tools that can be accessed through the MCP system.  Refer to the MCP documentation for details on how to use these tools.

## Technologies Used

*   TypeScript
*   @modelcontextprotocol/sdk
*   axios

## Known Issues

*   The Perplexity API may be unreliable.  Error handling is included to gracefully handle API failures.

## Contributing

Contributions are welcome!  Please open an issue or submit a pull request.
