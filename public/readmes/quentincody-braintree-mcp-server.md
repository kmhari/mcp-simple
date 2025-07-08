# Braintree MCP Server

An unofficial Model Context Protocol (MCP) server for interacting with PayPal Braintree payment processing services.

## License and Citation

This project is available under the MIT License with an Academic Citation Requirement. This means you can freely use, modify, and distribute the code, but any academic or scientific publication that uses this software must provide appropriate attribution.

### For academic/research use:
If you use this software in a research project that leads to a publication, presentation, or report, you **must** cite this work according to the format provided in [CITATION.md](CITATION.md).

### For commercial/non-academic use:
Commercial and non-academic use follows the standard MIT License terms without the citation requirement.

By using this software, you agree to these terms. See [LICENSE.md](LICENSE.md) for the complete license text.

## Server Versions

There are two versions of the Braintree MCP server available:

### 1. STDIO Transport Server (`braintree_server.py`)

- Uses standard input/output (STDIO) for communication
- Designed for integrations with Claude Desktop and other MCP clients that support STDIO
- Each client session spawns a new server process
- The server terminates when the client disconnects

**Usage with Claude Desktop:**
1. Configure `claude_desktop_config.json` to point to this server
2. Open Claude Desktop and select the Braintree tool

### 2. SSE Transport Server (`braintree_sse_server.py`)

- Uses Server-Sent Events (SSE) for communication
- Designed as a standalone web server that can handle multiple client connections
- Server runs persistently until manually stopped
- Binds to `127.0.0.1:8001` by default (configurable)

**Manual Usage:**
```bash
python braintree_sse_server.py
```

**Connecting to the SSE server:**
Use an MCP client that supports SSE transport and connect to `http://127.0.0.1:8001/sse`

## Overview

This server implements the Model Context Protocol (MCP) specification to provide AI assistant models with direct, structured access to Braintree's payment processing capabilities via GraphQL API. It enables AI systems to perform payment operations like fetching transactions, creating payments, and managing customer data through MCP tools.

## Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/braintree-mcp-server.git
cd braintree-mcp-server
```

2. Set up a Python 3.13+ environment
```bash
# If using pyenv
pyenv install 3.13.0
pyenv local 3.13.0

# Or using another method to ensure Python 3.13+
```

3. Install dependencies
```bash
pip install -e .
```

## Configuration

Create a `.env` file in the project root with your Braintree credentials:

```
BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key
BRAINTREE_ENVIRONMENT=sandbox  # or production
```

You can obtain these credentials from your Braintree Control Panel.

## Usage

### Running the server

#### Default STDIO Transport
```bash
python braintree_server.py
```

The server runs using stdio transport by default, which is suitable for integration with AI assistant systems that support MCP.

#### Server-Sent Events (SSE) Transport
```bash
python braintree_sse_server.py
```

The SSE server provides a web-based transport layer that allows multiple persistent client connections. This is useful for standalone deployments where multiple clients need to access the Braintree functionality.

Default configuration:
- Host: 127.0.0.1 (localhost)
- Port: 8001
- Environment: Defined in your .env file

See `requirements.txt` for the required dependencies.

### Available MCP Tools

#### braintree_ping

Simple connectivity test to check if your Braintree credentials are working.

```python
response = await braintree_ping()
# Returns "pong" if successful
```

#### braintree_execute_graphql

Execute arbitrary GraphQL queries against the Braintree API.

```python
query = """
query GetTransactionDetails($id: ID!) {
  node(id: $id) {
    ... on Transaction {
      id
      status
      amount {
        value
        currencyCode
      }
      createdAt
    }
  }
}
"""

variables = {"id": "transaction_id_here"}

response = await braintree_execute_graphql(query, variables)
# Returns JSON response from Braintree
```

## Common GraphQL Operations

### Fetch Customer

```graphql
query GetCustomer($id: ID!) {
  node(id: $id) {
    ... on Customer {
      id
      firstName
      lastName
      email
      paymentMethods {
        edges {
          node {
            id
            details {
              ... on CreditCardDetails {
                last4
                expirationMonth
                expirationYear
                cardType
              }
            }
          }
        }
      }
    }
  }
}
```

### Create Transaction

```graphql
mutation CreateTransaction($input: ChargePaymentMethodInput!) {
  chargePaymentMethod(input: $input) {
    transaction {
      id
      status
      amount {
        value
        currencyCode
      }
    }
  }
}
```

With variables:
```json
{
  "input": {
    "paymentMethodId": "payment_method_id_here",
    "transaction": {
      "amount": "10.00",
      "orderId": "order123",
      "options": {
        "submitForSettlement": true
      }
    }
  }
}
```

## Troubleshooting

- Ensure your Braintree credentials are correct in the `.env` file
- Verify your network connection can reach Braintree's API endpoints
- Check for any rate limiting or permission issues with your Braintree account