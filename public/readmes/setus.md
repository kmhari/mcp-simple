# Setu MCPs

Collection of Model Context Protocol (MCP) servers for Setu's APIs, enabling Claude/ other LLMs to interact with various Setu services.

## Available MCP Servers

### KYC Verification
[`setu_mcp_kyc`](kyc/) - Provides verification tools for PAN, GST, and name matching using Setu's Digital Gateway APIs.
- PAN card verification
- GST registration verification
- Name matching with similarity scores

### UPI Deeplinks
[`setu_mcp_upi_deeplinks`](upi-deeplinks/) - Manages UPI payment links using Setu's payment infrastructure.
- Generate UPI payment links
- Check payment status
- Handle refunds
- Mock payments (sandbox mode)

## Installation

Each MCP server can be installed individually via pip:

```bash
# For KYC verification
pip install setu_mcp_kyc

# For UPI Deeplinks
pip install setu_mcp_upi_deeplinks
```

## Usage

1. Install the desired MCP server
2. Configure environment variables as specified in each server's README
3. Add the server configuration to Claude Desktop's config file
4. Start using the tools through Claude

For detailed setup and usage instructions, refer to each server's individual README:
- [KYC Server Documentation](kyc/README.md)
- [UPI Deeplinks Server Documentation](upi-deeplinks/README.md)

## Development

Each MCP server is maintained in its own directory with independent versioning and configuration. See the individual README files for development setup and contribution guidelines.

## License

MIT License - see individual server directories for specific terms.