[![Python 3.7+](https://img.shields.io/badge/python-3.7+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Particle MCP Server

A Model Context Protocol server for the Particle IoT platform that enables AI assistants to manage Particle devices using natural language.

## Features/API Endpoints Covered

### Devices
- list_devices - lists all devices in your account
- list_product_devices - list all devices in a specified product
- rename_device - rename the device but keep the node_id the same
- add_device_notes - add notes to a device
- ping_device - pings the device to see if it is online
- call_function - calls a specified function on a particular device

### Diagnostics
- get_device_vitals - gets the last known vitals from a specific device

### Organizations
- list_organizations - lists all organizations apart of your account
- list_organization_products - lists all prodcuts within an organization

### Product Firmware
- list_product_firmware - lists all firmware versions for a specific product id

## Setup and Installation

create a .env file with the sctructure shown

```
# Particle API credentials
PARTICLE_ACCESS_TOKEN = your_api_token
```

to generate a particle api token, make sure the Particle CLI is installed and do this command:

```
particle token create
```

## Usage

Clone this repo

Open Claude Desktop

Navigate to Settings

Click Developer

Click Edit Config

Paste this in:
```
{
    "mcpServers": {
        "particle": {
            "command": "uv",
            "args": [
                "--directory",
                "DIRECT/PATH/TO/particle-mcp-server",
                "run",
                "particle.py"
            ]
        }
    }
}
```

## Contributing

https://docs.particle.io/reference/cloud-apis/api/#postman

Follow along to set up the Particle API environment in Postman, and implement a tool for each API endpoint. Open a PR with your changes for review! Please keep PRs "small"
