# Acalytica MCP Client

Welcome to the official MCP (Model Context Protocol) declaration repository for [Acalytica](https://acalytica.com) — a digital infrastructure platform for creators, small businesses, and digital entrepreneurs.

## 🔍 What is Acalytica?

Acalytica enables individuals and businesses to:
- Build beautiful, one-page websites (MyLinks)
- Track and analyze user engagement
- Create QR codes, social proof notifications, and digital storefronts
- Monetize their content and services with built-in tools

## 📦 MCP Readiness

Acalytica is fully MCP-compliant and optimized for AI agent interoperability.

### ✅ Implemented Features

| Feature                          | Status | Description |
|----------------------------------|--------|-------------|
| `mcp:site-function` tag         | ✅     | Declares functional purpose to AI agents |
| `mcp:target-user` tag           | ✅     | Specifies intended user segments |
| `mcp:ai-compatible` tag         | ✅     | Confirms AI-readiness |
| `mcp.json` Manifest             | ✅     | Publicly available at `/mcp.json` |
| JSON-LD Structured Data         | ✅     | Includes `WebSite`, `Organization`, `SoftwareApplication` |
| MCP Manifest Link Tag           | ✅     | `<link rel="mcp-manifest" href="/mcp.json">` |
| Public API Support              | ✅     | Documented endpoints under `/api/v1/` |

---

## 📄 MCP Manifest

- URL: [`https://acalytica.com/mcp.json`](https://acalytica.com/mcp.json)
- Type: `SiteContext`
- Context: AI-native infrastructure for digital identity, analytics, link-in-bio tools, and monetization

### Manifest Sample

```json
{
  "site": "https://acalytica.com",
  "context": {
    "domain": "digital-identity",
    "subdomain": "creator-tools",
    "functions": [
      "page-builder",
      "web-analytics",
      "qr-code-generator",
      "social-proof",
      "link-in-bio",
      "digital storefronts"
    ],
    "audience": [
      "creators",
      "influencers",
      "startups",
      "digital marketers",
      "SMEs"
    ],
    "revenueModel": [
      "subscription",
      "transaction-based (10%)"
    ],
    "aiReady": true,
    "dataExport": ["csv", "json"],
    "interactions": [
      {
        "inputType": "text",
        "outputType": "html",
        "api": "https://acalytica.com/api/v1/"
      }
    ]
  }
}
