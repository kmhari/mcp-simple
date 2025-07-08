# Kernel CVE MCP Server

This clones the linux kernel CVE List git repo, into an sqlite database and then allows querying this DB with a really basic MCP server. 

See: https://lore.kernel.org/linux-cve-announce/_/text/mirror/ for details.

## Commands

* `kernel-list-to-sqlite` - Download the Kernel CVE list into a temporary dir and save the contents into an sqlite database.
* `stio-mcp` - stdio MCP server which provides the `get_kernel_cve_info` and `search_kernel_cve_info` tools.

## Config

You need to specify the location of the DB file, so use something like this:

```
 {
  "mcpServers": {
    "kernel-cve-info": {
      "command": "/Users/mpf/Projects/kcve/stdio-mcp",
      "args": ["-db", "/Users/mpf/Projects/kcve/commits.db"]
    }
  }
}
```



