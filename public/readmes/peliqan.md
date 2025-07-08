# Peliqan MCP Server

For more info, visit https://peliqan.io/mcp.

## Configuration

Set up the connection to your Peliqan acount.

Create a configuration file named peliqan_config.json in your home folder:

```
{
    "account_id": 1234,
    "api_token": "xxx"
}
```

Or add the environment variables:
- account_id
- api_token

## Installation

```
pip install mcp-server-peliqan
```

## Usage with Claude Desktop

Add this to your claude_desktop_config.json:

```
{
  "mcpServers": {
    "peliqan": {
      "command": "python",
      "args": [
        "-m",
        "mcp_server_peliqan"
      ],
      "env": {
        "peliqan_account_id": "1234",
        "peliqan_api_token": "xxx"
      }
    }
  }
}
```
Location on Windows: `$env:AppData\Claude\claude_desktop_config.json`

Location on Mac: `~/Library/Application\ Support/Claude/claude_desktop_config.json`

## Setup in Peliqan

1. Add an API handler script, that exposes one or more MCP methods (tools). See the "MCP" templates in Peliqan to get started.
2. Add a custom API endpoint in your Peliqan account with route `/mcp` and method POST, and link it to the API handler script.

## Supported sources

All Peliqan connectors can be used in your MCP Server to fetch data and to perform writeback, for example adding/updating resources in your SaaS business applications (contacts, invoices, deals etc.).

Peliqan connectors:

- Adobe Commerce
- AFAS
- Aircall
- Airtable
- Akeneo
- AllGravy
- Amazon QuickSight
- Apache Airflow
- Apache Superset
- Apple App Store
- Aproplan Letsbuild
- Archisnapper
- ArchX
- S3
- BambooHR
- Bank Transactions
- Benchmarking Alliance
- Bigcommerce
- BigQuery
- Billit
- Billtobox Banqup
- Billtrust (iController)
- Bol
- Brevo
- CareerPro FLA (RSZ)
- Chargebee
- Cin7 Core
- Cin7 Omni
- ClickHouse
- CreditSafe
- d2o PMI
- Docebo
- Dropbox
- Dynamics 365 Finance and Operations (AX)
- DynamoDB
- Elastic Search
- Elina PMS
- Exact Online
- Excel
- Facebook
- FDT Sellus
- FHIR
- FileMaker
- FortNox
- Freshdesk
- GeoCode API
- GeoDynamics
- GeoFleet
- Github
- Globis
- Gong
- Google Ads
- Google Analytics
- Google Calendar
- Google Docs
- Google Drive
- Gmail
- Google Play Store
- Google Sheets
- HelpScout
- Heylog
- HubSpot
- HubSpot Analytics
- IFS ERP
- Intercom
- IonBiz
- Jira
- Klarna
- Klaviyo
- Klenty
- LightSpeed eCom
- LightSpeed Retail (R-Series)
- Linkedin
- Lobster Logistics Cloud
- Looker
- Magento
- Magicline
- Mailchimp
- Mailerlite
- Metabase
- Mews
- Microsoft Business Central Custom API
- Microsoft Dynamics 365 Business Central
- Microsoft Fabric DWH
- Microsoft Outlook
- Microsoft Outlook Calendar
- Microsoft Teams
- Mixpanel
- Monday
- MongoDB
- MQTT
- SQL Server
- mWorker
- MySQL
- N11
- NetSuite
- NMBRS
- Norges Bank Currencies
- Notion
- Odoo
- OneDrive
- OpenAI
- Optioryx
- Parseur
- PayPal
- Pimcore
- Pipedrive
- Planday
- Ponto
- Postgres
- PostHog
- Postmark
- Power BI
- Power Office
- Qdrant
- Qlik
- Quickbooks
- Redshift
- Salesforce
- SAP SQL Anywhere (Sybase)
- SaySimple
- SD Worx
- SendCloud
- SFTP
- Sharepoint
- Shiji ReviewPro
- Shopify
- Simplicate
- Slack
- Snowflake
- Solvice
- Starshipit
- Stripe
- sugar CRM
- Supabase
- Superagent
- Tableau
- Teamleader Focus
- Teamleader Orbit
- Test connector
- TraxGo
- Trimble Connect
- Trino
- TripleTex
- Typeform
- Unleashed ERP
- Veroo
- VIES EU VAT validation
- Visma Bouwsoft
- Visma E-conomic
- Visma Net (Visma.net)
- Vitally.io
- Weather API
- Weclapp
- Whatsapp
- Workday
- Xero
- Yuki
- Zendesk
- Zenvoices
- Ziggu
- Zoho Creator
- Zoho CRM
- Zoho Invoice
- REST
- CSV
- API
- XML
- JSON
- API driver
- OData
- FTP
- SFTP
- Parquet

Missing a connector ? Contact Peliqan at support@peliqan.io to request new connectors.
