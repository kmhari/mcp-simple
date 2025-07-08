
<h3 align="center">MCP Weather Server</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/sneharao/wheather-mcp-server/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/sneharao/wheather-mcp-server/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> This project is to use MCP server protocol of Anthropic to retrieve wheather alerts or details about the wheather using Claude Desktop app
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started & Usage](#getting_started)
- [Built Using](#built_using)
- [References](#references)

## 🧐 About <a name = "about"></a>

MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

​
Why MCP?
MCP helps you build agents and complex workflows on top of LLMs. LLMs frequently need to integrate with data and tools, and MCP provides:

A growing list of pre-built integrations that your LLM can directly plug into
The flexibility to switch between LLM providers and vendors
Best practices for securing your data within your infrastructure

This project creates one such MCP server , which you can interact with claude desktop client.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

1. Do a "npm i"
2. Build the project using "npm build"
3. Run the MCP server using node build/index.js
4. Modify CLAUDE_DESKTOP_CONFIG.json (found in Library/Application Support/Claude)
   If not available make a new one and paste below code.
   // {
   // "mcpServers": {
   // "weather": {
   // "command": "node",
   // "args": [
   // "/Users/spidugu/Downloads/my-projectspace/wheather/build/index.js"
   // ]
   // }
   // }
   // }
5. Restart claude desktop
   THE HAMMER ICON WOULD SHOW THE INSTALLED MCP, CHECK THE LOGS IF THERE IS ISSUE

### Prerequisites

What things you need to install the software and how to install them.

Claude Desktop (https://claude.ai/download)
Node version 20 and above (https://nodejs.org/en/download)

### Usage
<img width="758" alt="Screenshot 2025-04-13 at 07 39 51" src="https://github.com/user-attachments/assets/cf9c2b49-3911-42d0-a33e-7adaa1a49b04" />


## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ References <a name = "references"></a>

https://modelcontextprotocol.io/quickstart/server
