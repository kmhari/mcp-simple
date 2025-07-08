# NCBI Datasets MCP Server Protocol

Model Context Protocol for the NCBI Datasets MCP server, following the MCP specification format.

## Features

- **OpenAPI-driven**: Loads the official NCBI Datasets v2 OpenAPI 3.0 spec for stub generation and documentation.
- **Modular endpoints**: Genome, Gene, BioSample, Prokaryote, Virus, Organelle, Taxonomy, Version.
- **Containerized**: Docker Compose & Kubernetes manifests included.
- **Interactive docs**: Built-in Swagger UI (`/docs`).
- **SDK generation**: Generate language-specific clients via `openapi-generator-cli`.

## Use with Goose

**Option 1: One‑click install**  
Copy into browser address bar to add extension:
```
goose://extension?cmd=npx&arg=-y&arg=@your-org/mcp-ncbi-datasets&id=ncbi-datasets-mcp&name=NCBI%20Datasets%20MCP&description=wraps%20NCBI%20Datasets%20OpenAPI%20in%20MCP%20server
```

**Option 2: Manual (desktop or CLI)**
```json
{
  "mcpServers": {
    "ncbiDatasets": {
      "command": "npx",
      "args": ["-y", "@your-org/mcp-ncbi-datasets"]
    }
  }
}
```

## Use with Other MCP Clients
```json
{
  "mcpServers": {
    "ncbiDatasets": {
      "command": "npx",
      "args": ["-y", "@your-org/mcp-ncbi-datasets"]
    }
  }
}
```

## Development

1. Clone repo:
   ```bash
   git clone https://github.com/your-org/mcp-ncbi-datasets.git
   cd mcp-ncbi-datasets
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run server:
   ```bash
   npm start
   ```

## Installation

### Smithery (Claude Desktop)
```bash
npx -y @smithery/cli install @your-org/mcp-ncbi-datasets --client claude
```

### Manual
```bash
npm install -g @your-org/mcp-ncbi-datasets
```

## Usage

Start the MCP server:
```bash
mcp-ncbi-datasets
```

Or via NPX in your MCP config:
```json
{
  "mcpServers": {
    "ncbiDatasets": {
      "command": "npx",
      "args": ["-y", "@your-org/mcp-ncbi-datasets"]
    }
  }
}
```

## Tools

### start_server
Launches the MCP server.
```json
{
  "tool": "start_server",
  "parameters": {}
}
```

### get_version
Retrieve current service versions.
- **Parameters:** `none`
```json
{
  "tool": "get_version",
  "parameters": {}
}
```

### get_genome_annotation_report
Fetch genome annotation report by accession.
- **Parameters:**
  - `accession` (string, required)
```json
{
  "tool": "get_genome_annotation_report",
  "parameters": {
    "accession": "GCF_000001405.39"
  }
}
```

### download_genome_package
Download genome data package.
- **Parameters:**
  - `accessions` (array of strings, required)
  - `format` (string, optional: `fasta`, `jsonl`, `tsv`)
```json
{
  "tool": "download_genome_package",
  "parameters": {
    "accessions": ["GCF_000001405.39"],
    "format": "fasta"
  }
}
```

### get_gene_dataset_report
Retrieve gene dataset report.
- **Parameters:**
  - `gene_ids` (array of ints, required)
```json
{
  "tool": "get_gene_dataset_report",
  "parameters": {
    "gene_ids": [672, 7157]
  }
}
```

### download_gene_package
Download gene sequences and metadata.
- **Parameters:**
  - `gene_ids` (array of ints, required)
  - `include` (array of strings, optional: `transcript`, `protein`)
```json
{
  "tool": "download_gene_package",
  "parameters": {
    "gene_ids": [672],
    "include": ["transcript","protein"]
  }
}
```

### get_biosample_report
Fetch BioSample report by accession.
- **Parameters:**
  - `accession` (string, required)
```json
{
  "tool": "get_biosample_report",
  "parameters": {
    "accession": "SAMN00000000"
  }
}
```

### get_taxonomy_subtree
Retrieve filtered taxonomy subtree.
- **Parameters:**
  - `taxon` (int, required)
  - `level` (string, optional)
```json
{
  "tool": "get_taxonomy_subtree",
  "parameters": {
    "taxon": 9606,
    "level": "family"
  }
}
```

## License
MIT

