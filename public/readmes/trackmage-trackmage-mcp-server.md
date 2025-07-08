# TrackMage MCP Server - Shipment Tracking API & Logistics API Integration

A Model Context Protocol (MCP) server for shipment tracking api, package monitoring, and logistics management using the TrackMage API. Supports tracking across 1600+ carriers worldwide.

## Features

- **Carrier Support**: Track packages across 1600+ carriers worldwide ([full list](https://trackmage.com/carriers/))
- **Resources**: Workspaces, shipments, orders, carriers, tracking statuses
- **Tools**: Create shipments/orders, get shipment checkpoints, carrier detection
- **Authentication**: OAuth with client credentials

## ⚠️ Data Privacy Notice

**Data sharing with your LLM provider**: This MCP server provides data to whichever LLM you're using (Claude, ChatGPT, etc.). While this is the expected behavior for MCP servers, please ensure you're comfortable sharing logistics data including tracking numbers, customer emails, addresses, and shipment details with your chosen LLM provider.

**Best practices:**
- Only use with non-sensitive or test data if you have privacy concerns
- Check your LLM provider's data handling policies
- Consider opting out of training data programs if available
- Ensure compliance with your organization's data policies

## Prerequisites

- Node.js v18+
- TrackMage account

## Getting Credentials

1. Register and log into [TrackMage](https://app.trackmage.com).
2. Go to **Settings > API KEYS**.
3. Enter an **App Name** (e.g., "MCP") and **App URL** (e.g., `http://localhost:3000`).
4. Click **Generate** and copy your **Client ID** and **Client Secret**.
5. Note your **Workspace ID** from the dashboard URL.

## Installation

### Option 1: Local Setup

```bash
git clone https://github.com/yourusername/trackmage-mcp-server.git
cd trackmage-mcp-server
npm install
cp .env.example .env
# Edit .env with your credentials
npm start
```

## Configuration

Edit `.env`:

```
TRACKMAGE_CLIENT_ID=your_client_id_here
TRACKMAGE_CLIENT_SECRET=your_client_secret_here
TRACKMAGE_WORKSPACE_ID=your_workspace_id_here
```

## Usage

Run the server:

```bash
npm start
```
and then use
```
{
  "mcpServers": {
    "trackmage": {
      "transport": {
        "type": "http",
        "host": "localhost",
        "port": 3000
      }
    }
  }
}

```
or using file process:
```
{
  "mcpServers": {

    "trackmage": {
      "command": "node",
      "args": ["/path/to/trackmage-mcp-server/index.js"],
      "env": {
        "TRACKMAGE_CLIENT_ID": "your_client_id_here",
        "TRACKMAGE_CLIENT_SECRET": "your_client_secret_here",
        "TRACKMAGE_WORKSPACE_ID": "your_workspace_id_here"
      }
    }

  }
}
```

### MCP Resources

- `trackmage:///workspaces/{id}`
- `trackmage:///shipments/{id}`
- `trackmage:///orders/{id}`
- `trackmage:///carriers/{id}`
- `trackmage:///tracking_statuses/{id}`

### MCP Tools

#### Shipment Management

- **`create_shipment`**: Create a new shipment
  - Parameters: `{ trackingNumber, originCarrier?, email?, workspaceId? }`
  - Returns: Created shipment object

- **`update_shipment`**: Update an existing shipment
  - Parameters: `{ shipmentId, trackingNumber?, originCarrier?, email?, status? }`
  - Returns: Updated shipment object

- **`list_shipments`**: List shipments from workspace
  - Parameters: `{ workspaceId?, page?, itemsPerPage? }`
  - Returns: Array of shipment objects

- **`get_shipment_checkpoints`**: Get tracking checkpoints for a shipment
  - Parameters: `{ shipmentId }`
  - Returns: Array of tracking checkpoint events

- **`retrack_shipments`**: Retrack multiple shipments by tracking numbers
  - Parameters: `{ trackingNumbers: [{ number, originCarrier? }], workspaceId? }`
  - Returns: Retracking results

#### Order Management

- **`create_order`**: Create a new order
  - Parameters: `{ orderNumber, email?, workspaceId? }`
  - Returns: Created order object

- **`update_order`**: Update an existing order
  - Parameters: `{ orderId, orderNumber?, email?, status? }`
  - Returns: Updated order object

- **`list_orders`**: List orders from workspace
  - Parameters: `{ workspaceId?, page?, itemsPerPage? }`
  - Returns: Array of order objects

#### Carrier Management

- **`list_carriers`**: List available carriers
  - Parameters: `{ page?, itemsPerPage? }`
  - Returns: Array of carrier objects with codes and names

- **`detect_carrier`**: Detect possible carriers for a tracking number
  - Parameters: `{ trackingNumber }`
  - Returns: Array of possible carrier matches

## Testing

```bash
npm test
```
