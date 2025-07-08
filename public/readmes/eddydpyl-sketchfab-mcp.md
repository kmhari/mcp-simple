# Sketchfab MCP

A microservice for interacting with the Sketchfab API using MCP (Model Control Protocol).

## Features

- Search for downloadable models on Sketchfab
- Download a model from Sketchfab given a UID

## Environment Variables

- `SKETCHFAB_API_TOKEN`: Your Sketchfab API token

## How to use

1. Create an Sketchfab account: https://sketchfab.com/
1. You can find your Sketchfab API Token at: https://sketchfab.com/settings/password
3. Add the following MCP server as a command in Cursor:

```bash
env SKETCHFAB_API_TOKEN=PLACEHOLDER uvx sketchfab-mcp
```

## Running with Docker

```bash
docker build -t sketchfab-mcp .
docker run -it --rm -p 8000:8000 -e SKETCHFAB_API_TOKEN=PLACEHOLDER sketchfab-mcp
```
