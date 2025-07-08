# MCP Server

MCP (Machine Control Protocol) Server that provides browser automation capabilities through a simple API.

## Description

This server creates an API endpoint that allows you to run browser automation tasks using natural language commands. It utilizes:

- **FastMCP**: For creating a simple API server
- **browser-use**: For browser automation capabilities
- **OpenAI's GPT models**: To interpret natural language commands

## Prerequisites

- Python 3.11+
- Poetry for dependency management
- OpenAI API key

## Setup

### 1. Install dependencies


```bash
poetry install
```


### 2. Configure environment variables

Create a `.env` file in the root directory with:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Run

```bash
poetry run python main.py
```


The server will start with SSE (Server-Sent Events) transport on the default port.

## Features

### Browser Automation

Use the `/run_browser_task` endpoint to execute browser automation tasks using natural language. For example:
