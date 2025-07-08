# gqai
*graphql → ai*

**gqai** is a lightweight proxy that exposes GraphQL operations as
[Model Context Protocol (MCP)](https://platform.openai.com/docs/guides/function-calling) tools for AI like
Claude, Cursor, and ChatGPT.  
Define tools using regular GraphQL queries/mutations against your GraphQL backend, and gqai automatically
generates an MCP server for you.

🔌 Powered by your GraphQL backend  
⚙️ Driven by `.graphqlrc.yml` + plain `.graphql` files  

---

## ✨ Features

- 🧰 Define tools using GraphQL operations
- 🗂 Automatically discover operations from `.graphqlrc.yml`
- 🧾 Tool metadata compatible with OpenAI function calling / MCP

---

## 🛠️ Installation

```bash
go install github.com/fotoetienne/gqai@latest
```


## 🚀 Quick Start
1. Create a .graphqlrc.yml:

```yaml
schema: https://graphql.org/graphql/
documents: .
```

This file tells gqai where to find your GraphQL schema and operations.

*Note: The `schema` parameter tells gqai where to execute the operations. This must be a live server rather than a static schema file*

2. Add a GraphQL operation

`get_all_films.graphql`:
```graphql
# Get all Star Wars films
query get_all_films {
  allFilms {
    films {
      title
      episodeID
    }
  }
}
```

3. Add gqai to your `mcp.json` file:

```
  "gqai": {
    "command": "gqai",
    "args": [
      "run",
      "--config"
      ".graphqlrc.yml"
    ]
  }
```

That's it! Your AI model can now call the `get_all_films` tool.

## Usage
### Configuration
#### GraphQL Config
The [graphql config](https://the-guild.dev/graphql/config/docs/user/schema)
file is a YAML file that defines the GraphQL endpoint and the operations
you want to expose as tools. It should be named `.graphqlrc.yml` and placed in the root of your project.

```yaml
schema: https://graphql.org/graphql/
documents: operations
```

The `schema` field specifies the GraphQL endpoint, and the `documents` field specifies the directory where your GraphQL operations are located.

In this example, the `operations` directory contains all the GraphQL operations you want to expose as tools.
Operations are defined in `.graphql` files, and gqai will automatically discover them.

##### Headers
You can also specify headers to be sent with each request to the GraphQL endpoint. This is useful for authentication or other custom headers.

```yaml
schema:
  - https://graphql.org/graphql/:
      headers:
        Authorization: Bearer YOUR_TOKEN
        X-Custom-Header: CustomValue
documents: .
```

##### Using Environment Variables in Headers
You can reference environment variables in header values using the `${VARNAME}` syntax. For example:

```yaml
schema:
  - https://graphql.org/graphql/:
      headers:
        Authorization: Bearer ${MY_AUTH_TOKEN}
documents: .
```

You can also provide a default value using the `${VARNAME:-default}` syntax:

```yaml
schema:
  - https://graphql.org/graphql/:
      headers:
        Authorization: Bearer ${MY_AUTH_TOKEN:-default-token}
documents: .
```

When gqai loads the config, it will substitute `${MY_AUTH_TOKEN}` with the value of the `MY_AUTH_TOKEN` environment variable, or use `default-token` if the variable is not set. This allows you to keep secrets out of your config files.

If the environment variable is not set and no default is provided, the value will be left as-is.

##### Using Environment Variables in Config
You can use environment variables in any part of your `.graphqlrc.yml` config: schema URLs, document paths, include/exclude globs, and header values. Use `${VARNAME}` or `${VARNAME:-default}` syntax:

```yaml
schema:
  - ${MY_SCHEMA_URL:-https://default/graphql}:
      headers:
        Authorization: Bearer ${MY_AUTH_TOKEN}
documents:
  - ${MY_DOCS_PATH:-operations/**/*.graphql}
include: ${MY_INCLUDE:-operations/include.graphql}
exclude: ${MY_EXCLUDE:-operations/exclude.graphql}
```

gqai will substitute these with the value of the environment variable, or use the default if not set. This keeps secrets and environment-specific paths out of your config files.

#### MCP Configuration
##### Claude Desktop
To use gqai with Claude Desktop, you need to add the following configuration to your `mcp.json` file:

```json
{
  "gqai": {
    "command": "gqai",
    "args": [
      "run",
      "--config",
      ".graphqlrc.yml"
    ]
  }
}
```


### 🧪 CLI Testing
#### Call a tool via CLI to test:

```bash
gqai tools/call get_all_films
```

This will execute the `get_all_films` tool and print the result.

```shell
{
  "data": {
    "allFilms": {
      "films": [
        {
          "id": 4,
          "title": "A New Hope"
        },
        {
          "id": 5,
          "title": "The Empire Strikes Back"
        },
        {
          "id": 6,
          "title": "Return of the Jedi"
        },
        ...
      ]
    }
  }
}
```
#### Call a tool with arguments:

Create a GraphQL operation that takes arguments, and these will be the tool inputs:

`get_film_by_id.graphql`:
```graphql
query get_film_by_id($id: ID!) {
  film(filmID: $id) {
    episodeID
    title
    director
    releaseDate
  }
}
```

Call the tool with arguments:

```bash
gqai tools/call get_film_by_id '{"id": "1"}'
```

This will execute the `get_film_by_id` tool with the provided arguments.

```shell
{
  "data": {
    "film": {
      "episodeID": 1,
      "title": "A New Hope",
      "director": "George Lucas",
      "releaseDate": "1977-05-25"
    }
  }
}
```

## Development

### Prerequisites
- Go 1.20+

### Build
```bash
go build -o gqai main.go
```

### Test
```bash
go test ./...
```

### Format
```bash
go fmt ./...
```

### Run MCP server
```bash
./gqai run --config .graphqlrc.yml
```

### Run CLI
```bash
./gqai tools/call get_all_films
```


## About GQAI

### 🤖 Why gqai?
gqai makes it easy to turn your GraphQL backend into a model-ready tool layer — no code, no extra infra. Just define your operations and let AI call them.

### 📜 License
MIT — fork it, build on it, all the things.

### 👋 Author
Made with ❤️ and 🤖vibes by Stephen Spalding && `<your-name-here>`
