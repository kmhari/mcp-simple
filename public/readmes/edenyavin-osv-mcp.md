
# MCP Server For OSV 

A lightweight MCP (Model Context Protocol) server for OSV Database API.

Example:

[![demo](assets/demo.mov)](https://github.com/user-attachments/assets/e074c1d2-c6b6-4c9f-b9da-ffb27bfe90a7)


---
## Tools Provided

### Overview
|name|description|
|---|---|
|query_package_cve|List all the CVE IDs for a specific package. Specific version can be passed as well for more narrow scope CVE IDs.|
|query_for_cve_affected|Query the OSV database for a CVE and return all affected versions of the package.|
|query_for_cve_fix_versions|Query the OSV database for a CVE and return all versions that fix the vulnerability.|
|get_ecosystems|Query the MCP for current supported ecosystems.

### Detailed Description

- **query_package_cve**
  - Query the OSV database for a package and return the CVE IDs.
  - Input parameters:
    - `package` (string, required): The package name to query
    - `version` (string, optional): The version of the package to query. If not specified, queries all versions
    - `ecosystem` (string, optional): The ecosystem of the package. Defaults to "PyPI" for Python packages
  - Returns a list of CVE IDs with their details

- **query_for_cve_affected**
  - Query the OSV database for a CVE and return all affected versions.
  - Input parameters:
    - `cve` (string, required): The CVE ID to query (e.g., "CVE-2018-1000805")
  - Returns a list of affected version strings

- **query_for_cve_fix_versions**
  - Query the OSV database for a CVE and return all versions that fix the vulnerability.
  - Input parameters:
    - `cve` (string, required): The CVE ID to query (e.g., "CVE-2018-1000805")
  - Returns a list of fixed version strings

- **get_ecosystems**
  - Query for all current supported ecosystems by the MCP servers.
  - Return a dict with the key being the ecosystem name and the value the programming language / OS.

---

## Prerequisites

1. **Python 3.11 or higher**: This project requires Python 3.11 or newer.
   ```bash
   # Check your Python version
   python --version
   ```

2. **Install uv**: A fast Python package installer and resolver.
   ```bash
   pip install uv
   ```
   Or use Homebrew:
   ```bash
   brew install uv
   ```

---

## Tested on

- [X] Cursor
- [X] Claude

---
## Installation


1. Via [Smithery](https://smithery.ai/server/@EdenYavin/OSV-MCP):
```bash
npx -y @smithery/cli install @EdenYavin/OSV-MCP --client claude
```

2. Locally:

    1. Clone the repo: ```https://github.com/EdenYavin/OSV-MCP.git```
    2. Configure your MCP Host (Cusrsor / Claude Desktop etc.):

```json
{
  "mcpServers": {
    "osv-mcp": {
      "command": "uv",
      "args": ["--directory", "path-to/OSV-MCP", "run", "osv-server"],
      "env": {}
    }
  }
}

```

---

**Leave a review on [VibeApp](https://www.vibeapp.store/app/vulnerability-osv-mcp-server)
if you enjoyed it :)!**
