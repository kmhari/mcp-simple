# DICOM MCP Server

A Model Context Protocol (MCP) server for DICOM connectivity testing.

## Prerequisites

1. Install UV (required):
   ```bash
   pip install uv
   ```
   Make sure `uv` is available in your system PATH as it's required for Claude to properly execute the server.

## Installation

There are two ways to set up the server:

### 1. Traditional Setup

Install the required dependencies:

```bash
uv pip install mcp[cli]
```

### 2. MCP Installation (Recommended)

To use this server with Claude's Model Context Protocol:

```bash
mcp install server.py
```

This will register the server with Claude for DICOM operations.

## Running the Server

### Direct Execution

```bash
uv run server.py
```

### Through Claude

Once installed via MCP, the server will be automatically managed by Claude when needed.

The server will start on 0.0.0.0:8080 by default.

## Node Configuration

The server uses a `nodes.yaml` file to store DICOM node configurations. This allows you to:

1. List all configured DICOM nodes
2. Perform C-ECHO operations using node names instead of explicit AE titles, IPs, and ports
3. Use different local AE titles for C-ECHO operations

### nodes.yaml Format

```yaml
nodes:
  # Example node configuration
  main_pacs:
    ae_title: DESTINATION
    ip: 192.168.1.100
    port: 104
    description: "Main hospital PACS system"

local_ae_titles:
  - name: default
    ae_title: MCP_DICOM
    description: "Default AE title for MCP DICOM server"
  
  - name: pacs_gateway
    ae_title: PACS_GATEWAY
    description: "PACS Gateway AE title"
```

## Troubleshooting

If you encounter the "spawn uv ENOENT" error, it typically means one of the following:

1. UV is not installed or not in your PATH
2. The Python executable cannot be found by the MCP client

### Solutions:

1. Make sure UV is properly installed and in your PATH:
   ```bash
   which uv  # Should show the path to UV
   ```

2. Ensure you're using a Python environment that's accessible to the system:
   - If using a virtual environment, make sure it's activated
   - Check that Python is in your PATH

3. Try running the server with explicit UV path:
   ```bash
   /full/path/to/uv run server.py
   ```

4. Add more debugging by checking the stderr output in the logs

## Usage

The server provides several DICOM tools that can be used through the MCP interface:

### List DICOM Nodes

List all configured DICOM nodes from the nodes.yaml file:

```
list_dicom_nodes()
```

### C-ECHO by Node Name

Perform a C-ECHO operation using a node name from the configuration:

```
dicom_cecho_by_name(node_name="main_pacs", local_ae_name="default")
```

### Direct C-ECHO

Perform a C-ECHO operation with explicit parameters:

```
dicom_cecho(remote_ae_title="REMOTE_AE", ip="192.168.1.100", port=104, local_ae_title="MCP_DICOM")
```
