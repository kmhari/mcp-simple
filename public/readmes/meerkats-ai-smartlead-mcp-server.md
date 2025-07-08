# Smartlead MCP Server

This is a Model Context Protocol (MCP) server for Smartlead campaign management integration. It provides tools for creating and managing campaigns, updating campaign settings, and managing campaign sequences.

## Features

- Create new campaigns
- Update campaign schedule settings
- Update campaign general settings
- Get campaign details
- List all campaigns with filtering options
- Manage campaign email sequences (save, get, update, delete)
- Manage email accounts in campaigns (add, update, delete)
- Manage leads in campaigns (add, update, delete)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example` and add your Smartlead API key:

```
SMARTLEAD_API_KEY=your_api_key_here
```

4. Build the project:

```bash
npm run build
```

## Usage

### Standalone Usage

To start the server directly:

```bash
npm start
```

### Integration with Claude

To use this MCP server with Claude, you need to add it to the MCP settings file:

1. For Claude VSCode extension, add it to `c:\Users\<username>\AppData\Roaming\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
2. For Claude desktop app, add it to `%APPDATA%\Claude\claude_desktop_config.json` on Windows

Example configuration:

```json
{
  "mcpServers": {
    "smartlead": {
      "command": "node",
      "args": ["E:/mcp-servers/smartlead/dist/index.js"],
      "env": {
        "SMARTLEAD_API_KEY": "your_api_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Replace `your_api_key_here` with your actual Smartlead API key.

## Configuration

The server can be configured using environment variables:

- `SMARTLEAD_API_KEY` (required): Your Smartlead API key
- `SMARTLEAD_API_URL` (optional): Custom API URL (defaults to https://server.smartlead.ai/api/v1)
- `SMARTLEAD_RETRY_MAX_ATTEMPTS`: Maximum retry attempts for API calls (default: 3)
- `SMARTLEAD_RETRY_INITIAL_DELAY`: Initial delay in milliseconds for retries (default: 1000)
- `SMARTLEAD_RETRY_MAX_DELAY`: Maximum delay in milliseconds for retries (default: 10000)
- `SMARTLEAD_RETRY_BACKOFF_FACTOR`: Backoff factor for retry delays (default: 2)

## Available Tools

### smartlead_create_campaign

Create a new campaign in Smartlead.

**Parameters:**
- `name` (required): Name of the campaign
- `client_id` (optional): Client ID for the campaign

### smartlead_update_campaign_schedule

Update a campaign's schedule settings.

**Parameters:**
- `campaign_id` (required): ID of the campaign to update
- `timezone`: Timezone for the campaign (e.g., "America/Los_Angeles")
- `days_of_the_week`: Days of the week to send emails (1-7, where 1 is Monday)
- `start_hour`: Start hour in 24-hour format (e.g., "09:00")
- `end_hour`: End hour in 24-hour format (e.g., "17:00")
- `min_time_btw_emails`: Minimum time between emails in minutes
- `max_new_leads_per_day`: Maximum number of new leads per day
- `schedule_start_time`: Schedule start time in ISO format

### smartlead_update_campaign_settings

Update a campaign's general settings.

**Parameters:**
- `campaign_id` (required): ID of the campaign to update
- `name`: New name for the campaign
- `status`: Status of the campaign (active, paused, completed)
- `settings`: Additional campaign settings

### smartlead_get_campaign

Get details of a specific campaign by ID.

**Parameters:**
- `campaign_id` (required): ID of the campaign to retrieve

### smartlead_list_campaigns

List all campaigns with optional filtering.

**Parameters:**
- `status`: Filter campaigns by status (active, paused, completed, all)
- `limit`: Maximum number of campaigns to return
- `offset`: Offset for pagination

### smartlead_save_campaign_sequence

Save a sequence of emails for a campaign with A/B testing variants.

**Parameters:**
- `campaign_id` (required): ID of the campaign
- `sequences` (required): Array of email sequence items, each with:
  - `id`: ID of the sequence (only for updates, omit when creating)
  - `seq_number` (required): Sequence number (order in the sequence)
  - `seq_delay_details` (required): Delay settings with:
    - `delay_in_days` (required): Days to wait before sending this email
  - `variant_distribution_type`: Type of variant distribution (MANUAL_EQUAL, MANUAL_PERCENTAGE, AI_EQUAL)
  - `lead_distribution_percentage`: Sample percentage size of the lead pool to use to find the winner
  - `winning_metric_property`: Metric to use for determining the winning variant (OPEN_RATE, CLICK_RATE, REPLY_RATE, POSITIVE_REPLY_RATE)
  - `seq_variants`: Array of email variants, each with:
    - `subject` (required): Email subject line
    - `email_body` (required): Email body content (HTML)
    - `variant_label` (required): Label for the variant (e.g., "A", "B", "C")
    - `id`: ID of the variant (only for updates, omit when creating)
    - `variant_distribution_percentage`: Percentage of leads to receive this variant
  - `subject`: Email subject line (for simple follow-ups, blank makes it in the same thread)
  - `email_body`: Email body content (HTML) for simple follow-ups

### smartlead_get_campaign_sequence

Get the sequence of emails for a campaign.

**Parameters:**
- `campaign_id` (required): ID of the campaign

### smartlead_update_campaign_sequence

Update a specific email in a campaign sequence.

**Parameters:**
- `campaign_id` (required): ID of the campaign
- `sequence_id` (required): ID of the sequence email to update
- `subject`: Updated email subject line
- `body`: Updated email body content
- `wait_days`: Updated days to wait before sending this email

### smartlead_delete_campaign_sequence

Delete a specific email from a campaign sequence.

**Parameters:**
- `campaign_id` (required): ID of the campaign
- `sequence_id` (required): ID of the sequence email to delete

### smartlead_add_email_account_to_campaign

Add an email account to a campaign.

**Parameters:**
- `campaign_id` (required): ID of the campaign
- `email_account_id` (required): ID of the email account to add

### smartlead_update_email_account_in_campaign

Update an email account in a campaign.

**Parameters:**
- `campaign_id` (required): ID of the campaign
- `email_account_id` (required): ID of the email account to update
- `settings`: Settings for the email account in this campaign

### smartlead_delete_email_account_from_campaign

Remove an email account from a campaign.

**Parameters:**
- `campaign_id` (required): ID of the campaign
- `email_account_id` (required): ID of the email account to remove

### smartlead_add_lead_to_campaign

Add leads to a campaign (up to 100 leads at once).

**Parameters:**
- `campaign_id` (required): ID of the campaign
- `lead_list` (required): Array of lead information objects (max 100), each with:
  - `email` (required): Email address of the lead
  - `first_name`: First name of the lead
  - `last_name`: Last name of the lead
  - `company_name`: Company name of the lead
  - `phone_number`: Phone number of the lead
  - `website`: Website of the lead
  - `location`: Location of the lead
  - `custom_fields`: Custom fields for the lead (max 20 fields)
  - `linkedin_profile`: LinkedIn profile URL of the lead
  - `company_url`: Company URL of the lead
- `settings`: Settings for lead addition:
  - `ignore_global_block_list`: If true, uploaded leads will bypass the global block list
  - `ignore_unsubscribe_list`: If true, leads will bypass the comparison with unsubscribed leads
  - `ignore_community_bounce_list`: If true, uploaded leads will bypass any leads that bounced across the entire userbase
  - `ignore_duplicate_leads_in_other_campaign`: If true, leads will NOT bypass the comparison with other campaigns

### smartlead_update_lead_in_campaign

Update a lead in a campaign.

**Parameters:**
- `campaign_id` (required): ID of the campaign
- `lead_id` (required): ID of the lead to update
- `lead` (required): Updated lead information with:
  - `email`: Email address of the lead
  - `first_name`: First name of the lead
  - `last_name`: Last name of the lead
  - `company`: Company of the lead
  - `custom_variables`: Custom variables for the lead

### smartlead_delete_lead_from_campaign

Remove a lead from a campaign.

**Parameters:**
- `campaign_id` (required): ID of the campaign
- `lead_id` (required): ID of the lead to remove

## License

MIT
