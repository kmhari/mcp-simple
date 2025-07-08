# Offorte MCP Server <!-- omit in toc -->

MCP server for Offorte - Create & send proposals using AI.

This server acts as the bridge between AI agents and Offorte's proposal engine.
It enables external models to create and send proposals via Offorte.
Built for automation workflows, the [MCP](https://modelcontextprotocol.io/) makes it easy to integrate proposal actions into AI tools, chat interfaces, and autonomous systems.

> **Early technology**
> Please note that MCP (Model Context Protocol) is a new approach to AI integration.
> While powerful, it's still evolving and may occasionally produce unexpected or undesired results.

## Table of Contents <!-- omit in toc -->

- [About Offorte](#about-offorte)
- [Goals \& Coverage](#goals--coverage)
- [Prerequisites](#prerequisites)
- [Available Tools](#available-tools)
- [MCP Clients](#mcp-clients)
- [Development](#development)

## About Offorte

Offorte is automated proposal software which helps businesses create, send, and track beautiful interactive proposals.
Built for speed, flexibility, and real-world use, it combines automation and smart workflows without sacrificing the personal touch.
[Learn more about Offorte](https://www.offorte.com).

### API <!-- omit in toc -->

The MCP server is using the Offorte Public API v2.
Read the [API documentation](https://www.offorte.com/api-docs/) for more information.

### Demo <!-- omit in toc -->

Experience the future of proposals: voice-triggered, AI-powered, fully automated.
See how Offorte connects voice and workflow in [this real demo](https://www.offorte.com/en/blog/proposal-software/handsfree-proposal-sending-with-mcp).

## Goals & Coverage

The goal of this project is too create & send proposals using AI via the protocol.
Because of the experimental character, the full Offorte API is not covered and its limited to the tools needed to create & send proposals.
Tools which could lead to an LLM updating and deleting stuff are not yet implemented.
Update and delete commands might be added in the future, based on reallife results & user feedback.

## Prerequisites

- Node.js (tested with Node.js `20.x.x`)
- Offorte API Key (see [Authentication Section](https://www.offorte.com/api-docs/authentication#api-keys) of the Offorte API Docs)
- PNPM for development
- `TRANSPORT_TYPE` (optional): Set to `sse` to enable Server-Sent Events (SSE) mode, or leave unset/default for `stdio` (default: `stdio`).

## Available Tools

### Context & Setup <!-- omit in toc -->

- **get_initial_context** – **IMPORTANT:** Must be called before using any other tools to initialize context and get usage instructions

### Account <!-- omit in toc -->

- **get_users** – Lists all account users for the current account

### Automations <!-- omit in toc -->

- **get_automation_sets** – Lists automation sets which are used as an optional input to create a new proposal

### Contacts <!-- omit in toc -->

- **create_contact** – Create a new contact (organisation or person/individual)
- **get_contact_details** - Get all details for a contact by id
- **search_contact_organisations** - Search for organisations by name in the contacts
- **search_contact_people** - Search for people by name in the contacts

### Favorites <!-- omit in toc -->

- **get_proposal_templates** – Lists proposal templates which are used as starting points to create new proposals

### Proposals <!-- omit in toc -->

- **create_proposal** – Create a new proposal
- **get_proposal_directories** – Get all proposal directories grouped by status
- **search_proposals** – Search for proposals by query
- **send_proposal** – Send a proposal to its assigned contacts

### Settings <!-- omit in toc -->

- **get_design_templates** – Lists available design templates which are used to create new proposals
- **get_email_templates** – Lists available email templates which are used to send proposals
- **get_text_templates** – Lists available language text templates which are used to create new proposals

## MCP Clients

Currently, this MCP server has only been tested with Claude Desktop.
More client examples will be added in the future.

### Claude Desktop Configuration <!-- omit in toc -->

Find your `claude_desktop_config.json` at `Claude > Settings > Developer > Edit Config` and depending on which option you'd like, add **JUST ONE** of the following:

#### NPX <!-- omit in toc -->

Running it straight from the npm registry.

```json
{
	"mcpServers": {
		"offorte-proposals": {
			"command": "npx",
			"args": ["-y", "@offorte/mcp-server"],
			"env": {
				"OFFORTE_ACCOUNT_NAME": "<YOUR_ACCOUNT_NAME>",
				"OFFORTE_API_KEY": "<YOUR_TOKEN>"
			}
		}
	}
}
```

#### Local Node <!-- omit in toc -->

Dependencies should have been installed & the project is build before you use this method (`pnpm install`).

```json
{
	"mcpServers": {
		"offorte-proposals": {
			"command": "node",
			"args": ["/path/to/directory/offorte-mcp-server/dist/server.js"],
			"env": {
				"OFFORTE_ACCOUNT_NAME": "<YOUR_ACCOUNT_NAME>",
				"OFFORTE_API_KEY": "<YOUR_TOKEN>"
			}
		}
	}
}
```

## Development

To get started, clone the repository and install the dependencies.
Make sure you have an .env file and it includes the proper values.

```bash
git clone https://github.com/offorte/offorte-mcp-server.git
cd offorte-mcp-server
pnpm install
pnpm dev
```

### Commands <!-- omit in toc -->

Check the NPM scripts for all commands, below is a short summary of the most important onces.

| Script         | Info                                  |
| -------------- | ------------------------------------- |
| `pnpm build`   | Build the project for production      |
| `pnpm start`   | Start the production server           |
| `pnpm dev`     | Start the development server          |
| `pnpm inspect` | Inspect the server                    |
| `pnpm format`  | Format code using Prettier and ESLint |
