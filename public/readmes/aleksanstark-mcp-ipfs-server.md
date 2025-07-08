# MCP Server

## 1. What is MCP (Model Context Protocol)?

Model Context Protocol (MCP) is a standard for interaction between models, agents, and contextual data. It is developed and maintained by the community. More details can be found in the official repository: [MCP GitHub](https://github.com/modelcontextprotocol).

## 2. What is IPFS?

[InterPlanetary File System (IPFS)](https://ipfs.tech/) is a distributed file system that enables decentralized data storage and sharing. It is used in MCP for storing and interacting with data, ensuring reliability and fault tolerance.

## 3. MCP Server Architecture Overview

### Components:

- **MCP Node** — the core server component that processes MCP requests.
- **IPFS** — a decentralized storage system for handling content.
- **Client** — interacts with the MCP server to send and receive data.
- **Claude AI** — used for processing and enhancing MCP interactions.

### Component Interaction:

1. The client sends a request to the MCP node.
2. The MCP node processes the request and interacts with IPFS if necessary.
3. Claude AI assists in processing and optimizing responses.
4. The response is returned to the client.

## 4. Deploying the MCP Server

### Requirements:

- Node.js (recommended version 18+)
- NPM or Yarn

### Installation

Installation will depend on whether you are using Claude Code or Claude Desktop

**Claude Code**

Run `claude mcp add` and follow the prompts with the following information:

```
Server Name: mcp-ipfs
Server Command: node
Command Arguments: node /ABSOLUTE/PATH/TO/PARENT/FOLDER/mcp-ipfs-server/build/index.js
```

**Claude Desktop**

Add the following config to `claude_desktop_config.json`

```json
  {
  "mcpServers": {
    "ipfs-mcp": {
      "command": "node",
      "args": [
        "/Absolute/path/to/mcp-ipfs-server/build/index.js"
      ]
    }
  }
}
```

### Automated Installation And Deployment

Use the following bash script to automate the server deployment:

```bash
#!/bin/bash

sudo apt update
sudo apt install -y wget tar git npm

wget https://github.com/ipfs/kubo/releases/download/v0.34.1/kubo_v0.34.1_linux-amd64.tar.gz

tar -xvzf kubo_v0.34.1_linux-amd64.tar.gz

cd kubo
sudo bash install.sh

ipfs init

sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 4001/tcp
sudo ufw allow 8080/tcp
sudo ufw allow 22/tcp
sudo ufw allow 5001/tcp
sudo ufw enable
sudo ufw status




# Clone the MCP server repository
git clone https://github.com/AleksanStark/mcp-ipfs-server.git
cd mcp-ipfs-server

# Install dependencies
npm install
npm install @modelcontextprotocol/sdk zod
npm install -D @types/node typescript
# Build the project
npm run build
ipfs daemon
```

### Usage

To start using the MCP start up Claude Code with the command `claude` or start Claude Desktop. Below are the available operations:

## File Operations

- **upload-file** to IPFS
- **get-file** by CID
- **pin-file** by CID
- **list-folder** get list of directory by CID
- **unpin-file-** by CID


## Example Prompts for Claude

Here are some examples of how to instruct Claude to use ipfs-mcp:

```
Upload an image to IPFS:
"Please upload the file at ~/Pictures/example.jpg to my Pinata account as a private file named 'My Example Image'"

Get a file from IPFS:
"Get the file from IPFS using the CID""

Pin a file to IPFS:
"Pin the file by it's CID"

Unpin a file to IPFS:
"Unpin the file based on the CID"
```

## Questions

Send us an [email](mailto:kadzutostark@gmail.com) with any issues you may encounter!

