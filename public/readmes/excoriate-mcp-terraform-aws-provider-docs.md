# MCP Server: Terraform AWS Provider Docs

[![Language](https://img.shields.io/badge/language-Deno/TypeScript-blue.svg)](https://deno.land/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A [Model Context Protocol (MCP)](modelcontextprotocol.io) server built with Deno
and TypeScript, designed to provide contextual information related to
[Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest).

## Table of Contents

- [MCP Server: Terraform AWS Provider Docs](#mcp-server-terraform-aws-provider-docs)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [What is the Model Context Protocol (MCP) and how does it work?](#what-is-the-model-context-protocol-mcp-and-how-does-it-work)
    - [Why?](#why)
  - [Tools](#tools)
  - [Getting Started](#getting-started)
    - [Install and Use with Claude Desktop](#install-and-use-with-claude-desktop)
      - [Using Deno](#using-deno)
      - [Using Docker](#using-docker)
    - [Installing in IDE/Editor(s)o](#installing-in-ideeditorso)
      - [Install on Cursor](#install-on-cursor)
      - [Install on Windsurf](#install-on-windsurf)
      - [Install on VSCode](#install-on-vscode)
  - [Developing \& Contributing](#developing--contributing)
    - [Run it directly from JSR](#run-it-directly-from-jsr)
    - [Debugging \& Troubleshooting](#debugging--troubleshooting)
    - [Using Docker](#using-docker-1)
  - [Roadmap](#roadmap)
  - [Contributing](#contributing)
  - [Security](#security)
  - [License](#license)



## Overview

This server acts as an MCP server, exposing tools and resources that allow AI
agents or other MCP clients to query information about
[Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)
information, such as:

- ✅ Resources documentation.
- ✅ Provider's configuration, including ephemeral resources, guides, and
  functions.
- ✅ GitHub Issues (opened, closed, and all)
- ✅ AWS Resources examples

### What is the Model Context Protocol (MCP) and how does it work?

> The Model Context Protocol (MCP) is an open protocol that enables seamless integration between LLM applications and external data sources and tools. Whether you're building an AI-powered IDE, enhancing a chat interface, or creating custom AI workflows, MCP provides a standardized way to connect LLMs with the context they need.
>
> &mdash; [Model Context Protocol README](https://github.com/modelcontextprotocol#:~:text=The%20Model%20Context,context%20they%20need.)

---

### Why?

When writing IaC, or designing
[terraform modules](https://www.terraform.io/language/modules), it's often
required a very good knowledge, understanding and context in the actual AWS
resources, features, and capabilities in order to design a production-grade
module, with stable interfaces, composable, and reusable.

This MCP server is designed to provide just that, with the latest documentation,
issues, and examples from the
[Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)
registry site. Always up-to-date, and always from the source.

## Tools

> [!IMPORTANT]
> All tools require a valid GitHub token set as an environment variable:
> `GITHUB_TOKEN`, `GH_TOKEN`, or `GITHUB_PERSONAL_ACCESS_TOKEN`.

Currently, the following tools are available (more to come, or feel free to
submit an
[issue](https://github.com/Excoriate/mcp-terraform-aws-provider/issues) or
[PR](https://github.com/Excoriate/mcp-terraform-aws-provider/pulls)):

| Tool Name              | Purpose                                                                 | Inputs                                                                 | Outputs                                                                                                                        | Use Case                                                                                                                                                                                                                                            |
|------------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `list-resources`       | List all AWS resource documentation files with metadata                  | None                                                                   | Array of resource objects with id, subcategory, page_title, description, resource, resource_description, source, file_path      | Discover all AWS resources supported by the Terraform AWS Provider, obtain file names/paths for further queries, build dashboards, summaries, or analytics.                                                                                        |
| `get-resource-doc`     | Fetch a single AWS resource documentation file by name or fuzzy search   | `aws_resource` (string, optional): Resource name or description<br>`file_name` (string, optional): Exact file name (takes precedence) | Parsed and formatted documentation for the requested resource, with all metadata fields and full markdown body                  | Retrieve detailed documentation for a specific AWS resource, resolve ambiguous or natural language queries, provide LLMs or clients with structured resource information.                                     |
| `list-datasources`     | List all AWS datasource documentation files with metadata                | None                                                                   | Array of datasource objects with id, subcategory, page_title, description, datasource, datasource_description, source, file_path | Discover all AWS datasources supported by the Terraform AWS Provider, obtain file names/paths for further queries, build dashboards, summaries, or analytics.                                                                                      |
| `get-datasource-doc`   | Fetch a single AWS datasource documentation file by name or fuzzy search | `aws_datasource` (string, optional): Datasource name or description<br>`file_name` (string, optional): Exact file name (takes precedence) | Parsed and formatted documentation for the requested datasource, with all metadata fields and full markdown body                | Retrieve detailed documentation for a specific AWS datasource, resolve ambiguous or natural language queries, provide LLMs or clients with structured datasource information.                                 |
| `get-open-issues`      | Retrieve open issues from Terraform AWS Provider GitHub repo             | `all` (boolean, optional): Retrieve all or first 30 issues             | Array of issue objects with ID, title, description, source, state, user, labels, creation/update timestamps, comments           | Analyze, triage, or report on current open issues. Build dashboards, correlate issues with documentation, understand if a Terraform behavior is expected or related to a known issue.                                                               |
| `get-issue`            | Fetch detailed information for a specific GitHub issue                   | `issueNumber` (number, required): Exact GitHub issue number            | Detailed issue object with full metadata including body, timestamps, labels, comments                                          | Investigate a specific issue in detail, typically used after `get-open-issues` to obtain comprehensive information about a single issue of interest.                                                         |
| `list-all-releases`    | Retrieve all releases from the Terraform AWS Provider GitHub repo        | None                                                                   | Array of release objects with ID, tag, name, author, published date, URL, asset count, and summary body                        | List all available versions/releases, build dashboards, changelogs, or analytics, correlate provider versions with documentation, issues, or upgrade guides.                                                  |
| `get-release-by-tag`   | Fetch detailed information for a specific release by tag                 | `tag` (string, required): Release tag (e.g. 'v5.96.0')<br>`include_issues` (boolean, optional): Also fetch referenced issues | Release object with full metadata and, if `include_issues` is true, details for all referenced issues in the release notes     | Investigate a particular version in depth, including referenced issues. Use after `list-all-releases` or directly if the tag is known.                                                                      |
| `get-latest-release`   | Fetch detailed information for the latest release                        | `include_issues` (boolean, optional): Also fetch referenced issues     | Latest release object with full metadata and, if `include_issues` is true, details for all referenced issues in the release notes | Quickly access the most recent version, check for new features or bug fixes, and optionally see referenced issues.                                                                                           |

## Getting Started

### Install and Use with Claude Desktop

To use this Deno-based MCP server with Claude Desktop, add the following to your
`claude_desktop_config.json`:

#### Using Deno

```json
{
  "mcpServers": {
    "tf_aws_provider_docs": {
      "command": "deno",
      "args": [
        "run",
        "-A",
        "main.ts"
      ],
      "env": {
        "GITHUB_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

Or, the recommended way, with deno directly from [JSR](https://jsr.io/)

```json
{
  "mcpServers": {
    "tf_aws_provider_docs": {
      "command": "deno",
      "args": [
        "run",
        "-A",
        "jsr:@excoriate/mcp-terraform-aws-provider-docs@0.1.0"
      ],
      "env": {
        "GITHUB_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

#### Using Docker

```json
{
  "mcpServers": {
    "tf_aws_provider_docs": {
      "command": "docker",
      "args": [
        "run",
        "-e",
        "GITHUB_TOKEN=<YOUR_TOKEN>",
        "mcp-terraform-aws-provider-docs"
      ],
      "env": {
        "GITHUB_TOKEN": "<YOUR_TOKEN>"
      }
    }
  }
}
```

### Installing in IDE/Editor(s)o

#### Install on Cursor

Go to: `Settings` -> `Cursor Settings` -> `MCP` -> `Add new global MCP server`

Pasting the following configuration into your Cursor `~/.cursor/mcp.json` file
is the recommended approach. See
[Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) for
more info.

```json
{
  "mcpServers": {
    "tf_aws_provider_docs": {
      "command": "deno",
      "args": ["-A", "jsr:@excoriate/mcp-terraform-aws-provider-docs@latest"]
    }
  }
}
```

#### Install on Windsurf

Add this to your Windsurf MCP config file. See
[Windsurf MCP docs](https://docs.windsurf.com/windsurf/mcp) for more info.

```json
{
  "mcpServers": {
    "tf_aws_provider_docs": {
      "command": "deno",
      "args": ["-A", "jsr:@excoriate/mcp-terraform-aws-provider-docs@latest"]
    }
  }
}
```

#### Install on VSCode

Add this to your VSCode MCP config file. See
[VSCode MCP docs](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
for more info.

```json
{
  "servers": {
    "Context7": {
      "type": "stdio",
      "command": "deno",
      "args": ["-A", "jsr:@excoriate/mcp-terraform-aws-provider-docs@latest"]
    }
  }
}
```

## Developing & Contributing

For more details about debugging, testing, and contributing to this project,
see [DEVELOPER_GUIDE](DEVELOPER_GUIDE.md), and [CONTRIBUTING](CONTRIBUTING.md).

### Run it directly from JSR

You can use the MCP server directly from [JSR](https://jsr.io/) (Javascript
Registry ❤️)

```sh
# export your github token
export GITHUB_TOKEN=ghp_xxx...

# run it
deno run -A jsr:@excoriate/mcp-terraform-aws-provider-docs@latest
```

### Debugging & Troubleshooting

if you want to debug it, use the built-in debugger
([inspector](https://modelcontextprotocol.io/docs/tools/inspector)). There's a
justfile recipe to help you out.

```sh
# start the mcp server, and the inspector
just inspect
```

### Using Docker

Build the Docker image

```sh
docker build -t mcp-terraform-aws-provider-docs .
```

Run the MCP server in Docker

```sh
docker run -it --rm \
  -e GITHUB_TOKEN=ghp_xxx... \
  mcp-terraform-aws-provider-docs
```

> [!TIP]
> Replace `ghp_xxx...` with your
> [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
> with appropriate permissions.
>
> You can also use `GH_TOKEN` or `GITHUB_PERSONAL_ACCESS_TOKEN` as the
> environment variable name.
>
> If you want to use a local `.env` file, you can pass it with
> `--env-file .env`.

## Roadmap

- [ ] Add tool to retrieve provider's configuration.
- [ ] Integrated with dedicated backend, to index, and provide advance search/code assistant documentation avoiding GitHub API rate limits.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution
guidelines, including setup, code style, PR process, and codebase structure
reference.

## Security

See [SECURITY.md](SECURITY.md) for the project's security policy, including how
to report vulnerabilities and responsible disclosure guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
