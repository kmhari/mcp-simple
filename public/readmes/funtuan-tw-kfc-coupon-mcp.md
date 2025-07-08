# KFC Coupon Server

## Introduction
This project is a small tribute to my passion for KFC, built to help others discover great deals using a coupon server. A huge **thank you** to [Winedays/KCouper](https://github.com/Winedays/KCouper) for curating and sharing the KFC coupon data, which made this project possible!

## Features
This project provides a simple server to search for KFC Taiwan coupons based on specific criteria. Key features include:

- **Coupon Search**: Find coupons by keywords (e.g., "炸雞" for fried chicken, "蛋撻" for egg tarts) or price ranges.
- **Data Integration**: Pulls coupon data from the [KCouper repository](https://github.com/Winedays/KCouper) and transforms it into a structured format.
- **MCP Protocol**: Uses the Model Context Protocol (MCP) to expose a tool for querying coupons, making it compatible with AI-driven applications.

## Example Usage
To use the MCP server for querying KFC coupons, you can configure it as follows:

```json
{
  "mcpServers": {
    "kfc-coupon": {
      "command": "npx",
      "args": [
        "-y",
        "@funtuantw/tw-kfc-coupon-mcp"
      ]
    }
  }
}
```

This configuration allows you to integrate the KFC coupon MCP server into your application seamlessly. Simply execute the command to start querying coupons based on your criteria.

## Acknowledgments
Special thanks to [Winedays/KCouper](https://github.com/Winedays/KCouper) for their amazing work in collecting and organizing KFC coupon data. Their open-source contribution inspired and enabled this project.