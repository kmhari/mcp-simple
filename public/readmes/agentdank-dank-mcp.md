# AgentDank: &nbsp;&nbsp; `dank-mcp`

`dank-mcp` is a Model Context Procotol (MCP) server that respond to questions about supported Cannabis Datasets.  It is brought to you by AgentDank for educational and legal purposes.

Here's example conversations with [Claude Desktop](#claude-desktop).  You are viewing these links on the Claude.ai website; when using this `dank-mcp` yourself, you must use Claude **Desktop** to utilize the MCP server.   Within the chat, you can expand the Tools call sections to see the SQL requests and CSV results.

 * ["Finding the Dankest Cannabis Flower in CT"](https://claude.ai/share/e64bb066-ffb5-459b-bb0e-8cdb4f5007c2)
 * ["Spicy Cannabis Edibles for Sleep"](https://claude.ai/share/8229f9b9-91b6-433d-8b5c-20d0b577fa23)
 * ["Sedative Cannabis Flower Recommendations"](https://claude.ai/share/924f8fcc-0785-4c9f-9902-97c8d3a00658)


<p align="center"><video controls src="https://private-user-images.githubusercontent.com/26842/430672597-adb8e56f-178d-4646-9e0f-4fcf57614dea.mp4" title="AgentDank "></video></p>

----

  * [Installation](#installation)
  * [Using with LLMs](#usage)
    * [Claude Desktop](#claude-desktop)
    * [Ollama and mcphost](#ollama-and-mcphost)
  * [Command Line Usage](#command-line-usage)
  * [Data Cleaning](#data-cleaning)
  * [Building](#building)
  * [Contribution and Conduct](#contribution-and-conduct)
  * [Credits and License](#credits-and-license)

Currently the following datasets are supported:

 * [US CT Medical Marijuana and Adult Use Cannabis Brand Registry](https://data.ct.gov/Health-and-Human-Services/Medical-Marijuana-and-Adult-Use-Cannabis-Brand-Reg/egd5-wb6r/about_data)

You can find snapshots of these datasets in the [AgentDant `dank-data`](https://github.com/AgentDank/dank-data) repository.

## Installation

While we'd like to have pre-built binaries and Homebrew packages, we're having an issue with that right now.  So the preferred way to install is using `go install` or [building from source](#building):

```sh
$ go install github.com/AgentDank/dank-mcp@latest
```

It will be installed in your `$GOPATH/bin` directory, which is often `~/go/bin`.


## Using with LLMs

To use this `dank-mcp` MCP server, you must configure your host program to use it.  We will illustrate with [Claude Desktop](https://claude.ai/download).  We must find the `dank-mcp` program on our system; the example below shows where `dank-mcp` is installed with my `go install`.

The following configuration JSON ([also in the repo as `mcp-config.json`](./mcp-config.json)) sets this up:

```json
{
    "mcpServers": {
      "dank": {
        "command": "~/go/bin/dank-mcp",
        "args": [
          "--root", "~",
        ]
      }
    }
  }
```

### Claude Desktop

Using Claude Desktop, you can follow [their configuration tutorial](https://modelcontextprotocol.io/quickstart/user) but substitute the configuration above.  With that in place, you can ask Claude question and it will use the `dank-mcp` server.  

Here's example conversations with Claude Desktop.  Remember you are viewing these links on the [Claude.ai](https://claude.ai) website, but you must use Claude Desktop to use the MCP server.   You can click into the Tools calls to see the SQL requests and CSV results.

 * ["Finding the Dankest Cannabis Flower in CT"](https://claude.ai/share/e64bb066-ffb5-459b-bb0e-8cdb4f5007c2)
 * ["Spicy Cannabis Edibles for Sleep"](https://claude.ai/share/8229f9b9-91b6-433d-8b5c-20d0b577fa23)
 * ["Sedative Cannabis Flower Recommendations"](https://claude.ai/share/924f8fcc-0785-4c9f-9902-97c8d3a00658)


### Ollama and `mcphost`

**I'm currently having issues with this working well, but leaving instructions for those interested. **

For local inferencing, there are MCP hosts that support [Ollama](https://ollama.com/download).  You can use any [Ollama LLM that supports "Tools"](https://ollama.com/search?c=tools).  We experimented with [`mcphost`](https://github.com/mark3labs/mcphost), authored by the developer of the [`mcp-go` library](https://github.com/mark3labs/mcp-go) that peformed the heavy lifting for us.

Here's how to install and run with it with the configuration above, stored in `mcp-config.json`:

```
$ go install github.com/mark3labs/mcphost@latest
$ ollama pull llama3.3
$ mcphost -m ollama:llama3.3 --config mcp-config.json
...chat away...
```

## Command Line Usage

Here is the command-line help:

```
usage: ./bin/dank-mcp [opts]

      --db string         DuckDB data file to use (use :memory: or '' for in-memory) (default "dank-mcp.duckdb")
      --dump              Only download files and populate DB, no MCP server
  -h, --help              Show help
  -l, --log-file string   Log file destination (or MCP_LOG_FILE envvar). Default is stderr
  -j, --log-json          Log in JSON (default is plaintext)
  -n, --no-fetch          Don't fetch any data, only use what is in current DB
      --root string       Set root location of '.dank' dir
      --sse               Use SSE Transport (default is STDIO transport)
      --sse-host string   host:port to listen to SSE connections
  -t, --token string      ct.data.gov App Token
  -v, --verbose           Verbose logging
```

You can download and dump the data by running `dank-mcp --dump`.  Snapshots of this data are curated at [AgentDank's `dank-data` repository](https://github.com/AgentDank/dank-data).

```sh
$ dank-mcp --dump
time=2025-04-03T18:18:03.177-04:00 level=INFO msg=dank-mcp
time=2025-04-03T18:18:03.185-04:00 level=INFO msg="fetching brands from ct.data.gov"
time=2025-04-03T18:18:24.055-04:00 level=INFO msg="inserting brands into db" count=26499
time=2025-04-03T18:18:52.533-04:00 level=INFO msg=finished
```

## Data Cleaning

Because the upstream datasets are not perfect, we have to "clean" it.  Such practices are opinionated, but since this is Open Source, you can inspect how we clean it by examining the code.  For example:

  * CT Brands cleaning
  * Extract "trace" values from text measurments

Generally, we simply remove weird characters.  We treat detected "trace" amounts as 0 -- and even with that, there's a decision about what field entry actually means "trace".  

We also remove rows with riduclous data -- as much as I'd love a `90,385% THC product`, I don't think it really exists.  In that case, it was an incorrect decimal point (by looking at the label picture), but not every picture validates every error.  It's also a pain -- but maybe a multi-modal vision LLM can help with that?

## Building

Building is performed with [task](https://taskfile.dev/):

```
$ task
task: [build] go build -o dank-mcp cmd/dank-mcp/main.go
```

## Notes on Design

This was quick experiment of the surface of MCPs and this data. In the current design, `dank-mcp` fetches the dataset, cleans it, populates a DuckDB with it; it then presents that DuckDB with a custom MCP server.

This could be broken into different tools.  The fetch/clean/download can be stand-alone, and we already publish data to the [`dank-data` repository](https://github.com/AgentDank/dank-data).    There is MotherDuck's generalized [`mcp-server-motherduck`](https://github.com/motherduckdb/mcp-server-motherduck), which can work with any DuckDB file.   So that MCP server could slurp the DuckDB file from that repo instead.

I do think one aspect here is that `dank-mcp` will have a bundle of Prompts and Tools that will be domain-specific?

----

## Contribution and Conduct

Pull requests and issues are welcome.  Or fork it.  You do you.

Either way, obey our [Code of Conduct](./CODE_OF_CONDUCT.md).  Be shady, but don't be a jerk.

## Credits and License

Copyright (c) 2025 Neomantra Corp.  Authored by Evan Wies for [AgentDank](https://github.com/AgentDank).

Released under the [MIT License](https://en.wikipedia.org/wiki/MIT_License), see [LICENSE.txt](./LICENSE.txt).

----
Made with :herb: and :fire: by the team behind [AgentDank](https://github.com/AgentDank).
