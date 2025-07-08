# Liftover MCP server

## Overview

This MCP server provides a programmatic interface to the Broad Institute's Liftover tool, which is available at [liftover.broadinstitute.org](https://liftover.broadinstitute.org/).

## Status

🚧 **Under Active Development** 🚧

This project is currently under active development. Features and APIs may change without notice.

## Dependencies

- `uv`
- mcp[cli]
- fastmcp
- beautifulsoup4
- selenium

## Directory structure

```
+.
├── server.py            # Main FastMCP server entrypoint
├── liftover_api/        # Python package with tool logic and parsers
├── pyproject.toml       # Project metadata and dependencies
└── README.md           # Usage and documentation
```

## Setup and Running

### Add the MCP server to your MCP server list (Cursor)

```json
{
    "mcpServers": {
      "liftover": {
        "command": "uv",
        "args": ["--directory", "where you cloned the repo", "run", "server.py"],
        "env": {}
      }
    }
}
```

### Run MCP Inspector

```bash
# Install dependencies
uv sync

# Run MCP Inspector
uv --directory ./ run mcp dev server.py
```

### Run the MCP server

```bash
# Install dependencies
uv sync

# Run the MCP server
uv run server.py
```

## MCP tool specification

### Tool name

- liftover

### Input parameter examples

| Parameter | Type | Required | Description |
|:-------------|:-----|:-----|:-----|
| chr          | str  | Optional    | Chromosome name (e.g., "8" or "chr8") |
| position     | int  | Optional    | Single position (e.g., 141310715) |
| start        | int  | Optional    | Interval start position (e.g., 141310715) |
| end          | int  | Optional    | Interval end position (e.g., 141310720) |
| ref          | str  | Optional    | Reference allele (e.g., "T") |
| alt          | str  | Optional    | Alternate allele (e.g., "G") |
| transcript   | str  | Optional    | Transcript ID (e.g., "NM_001089.3") |
| c_dot        | str  | Optional    | c. notation (e.g., "c.875A>T") |
| p_dot        | str  | Optional    | p. notation (e.g., "p.Glu292Val") |
| from_genome  | str  | Required    | Source genome (e.g., "hg19") |
| to_genome    | str  | Required    | Target genome (e.g., "hg38") |

- Specify only the required parameters for each input format

### Input examples

- chr=8, position=141310715, from_genome=hg19, to_genome=hg38
- chr=8, start=141310715, end=141310720, from_genome=hg19, to_genome=hg38
- chr=8, position=141310715, ref=T, alt=G, from_genome=hg19, to_genome=hg38
- transcript=NM_001089.3, c_dot=c.875A>T, p_dot=p.Glu292Val, from_genome=hg19, to_genome=hg38

Please follow the [liftover.broadinstitute.org](https://liftover.broadinstitute.org/)

## Credits

This tool relies on the Broad Institute's Liftover web service. All coordinate conversion functionality is provided by their service.

Please cite and credit the Broad Institute when using this tool in your work.

Visit [liftover.broadinstitute.org](https://liftover.broadinstitute.org/) for more information about the original service.

## Release Notes

### v0.1.0-alpha (2025-04-22)

Initial alpha release with basic functionality:
- ✨ Basic liftover functionality implementation
- 🎯 Support for single position conversion
- 🎯 Support for interval conversion
- 🎯 Support for variant conversion
- 🎯 Support for HGVS notation conversion
- 📚 Basic documentation and usage examples

## License

This MCP server itself is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [liftover.broadinstitute.org](https://liftover.broadinstitute.org/)
- [FastMCP](https://github.com/jlowin/fastmcp)