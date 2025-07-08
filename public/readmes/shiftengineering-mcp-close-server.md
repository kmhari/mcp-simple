# Close.com MCP Server

An MCP (Model Context Protocol) server that connects to Close.com API, allowing AI assistants to search and retrieve lead and contact information.

## Features

- Lead Management
  - Search leads with query and limit
  - Get detailed lead information
- Contact Management
  - Get detailed contact information
- Email Activity Management
  - Get email details
  - Create, update, and delete emails
  - Support for email templates and attachments
- Task Management
  - Create, update, and delete tasks
  - Get detailed task information
- Opportunity Management
  - Create, update, and delete opportunities
  - Get detailed opportunity information
  - Track opportunity values and confidence levels
  - Manage opportunity status and won dates
- Call Activity Management
  - Get call details
  - Create, update, and delete calls
  - Track call duration, disposition, and cost
  - Support for call recordings
- User Management
  - Get detailed user information
  - List all users
  - Check user availability status
- API Connection Testing
  - Verify Close.com API connectivity

## Prerequisites

- Node.js 17 or higher
- Close.com API key
- An MCP client (like Claude Desktop)

## Installation

### Option 1: Install via npm/npx (Recommended)

1. Install the package globally:
   ```bash
   npm install -g @shiftengineering/mcp-close-server
   ```

2. Configure Claude Desktop to use this server by editing your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "close": {
      "command": "npx",
      "args": [
        "@shiftengineering/mcp-close-server"
      ],
      "env": {
        "CLOSE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Option 2: Install from source

1. Clone this repository:
   ```bash
   git clone https://github.com/shiftengineering/mcp-close-server.git
   cd mcp-close-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Running the server directly

Make sure to set your Close.com API key as an environment variable:

```bash
export CLOSE_API_KEY="your_api_key_here"
npm start
```

### Using with Claude Desktop

1. If you installed via npm/npx, skip to step 2. If you installed from source, build the project as described above.

2. Configure Claude Desktop to use this server by editing your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "close": {
      "command": "node",
      "args": [
        "/absolute/path/to/mcp-close-server/build/index.js"
      ],
      "env": {
        "CLOSE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

3. Restart Claude Desktop

### Example Queries

After setting up the server with Claude Desktop, you can ask Claude questions like:

- "Can you search for leads related to Acme Corp?"
- "Find any contacts named John Smith"
- "Get details for lead with ID lead_abc123"
- "Search for leads in the Technology sector"
- "Find contacts with email addresses from google.com domain"
- "Can you check if our Close.com API connection is working?"

## Available Tools

### search_leads

Search for leads in Close.com.

Parameters:
- `query` (string): Search query string (e.g., company name, contact, etc.)
- `limit` (number, optional): Maximum number of results to return (default: 10)

### get_lead_details

Get detailed information about a specific lead.

Parameters:
- `lead_id` (string): The ID of the lead to retrieve

### get_contact_details

Get detailed information about a specific contact.

Parameters:
- `contact_id` (string): The ID of the contact to retrieve

### get_email_details

Get detailed information about a specific email.

Parameters:
- `email_id` (string): The ID of the email to retrieve

### create_email

Create a new email in Close.com.

Parameters:
- `lead_id` (string): The ID of the lead to create the email for
- `status` (string): Email status ('inbox', 'draft', 'scheduled', 'outbox', 'sent')
- `subject` (string): Email subject
- `body_text` (string, optional): Plain text email body
- `body_html` (string, optional): HTML email body
- `template_id` (string, optional): Email template ID
- `date_scheduled` (string, optional): Scheduled date (ISO format)
- `send_in` (number, optional): Seconds until sending
- `followup_date` (string, optional): Follow-up date (ISO format)
- `sender` (string, optional): Sender email address
- `attachments` (array, optional): Array of attachment objects

### update_email

Update an existing email in Close.com.

Parameters:
- `email_id` (string): The ID of the email to update
- `status` (string, optional): Email status
- `subject` (string, optional): Email subject
- `body_text` (string, optional): Plain text email body
- `body_html` (string, optional): HTML email body
- `date_scheduled` (string, optional): Scheduled date (ISO format)
- `followup_date` (string, optional): Follow-up date (ISO format)

### delete_email

Delete an email in Close.com.

Parameters:
- `email_id` (string): The ID of the email to delete

### create_task

Create a new task in Close.com.

Parameters:
- `lead_id` (string): The ID of the lead to create the task for
- `text` (string): The task description
- `date` (string): The task date (ISO format)
- `assigned_to` (string, optional): The ID of the user to assign the task to

### get_task_details

Get detailed information about a specific task.

Parameters:
- `task_id` (string): The ID of the task to retrieve

### update_task

Update an existing task in Close.com.

Parameters:
- `task_id` (string): The ID of the task to update
- `assigned_to` (string, optional): The ID of the user to assign the task to
- `date` (string, optional): The new task date (ISO format)
- `is_complete` (boolean, optional): Whether the task is complete
- `text` (string, optional): The new task description

### delete_task

Delete a task in Close.com.

Parameters:
- `task_id` (string): The ID of the task to delete

### create_opportunity

Create a new opportunity in Close.com.

Parameters:
- `lead_id` (string, optional): The ID of the lead
- `status_id` (string, optional): The status ID
- `value` (number, optional): Opportunity value
- `value_period` (string, optional): Value period ('one_time', 'monthly', 'annual')
- `confidence` (number, optional): Confidence level
- `note` (string, optional): Opportunity note
- `custom` (object, optional): Custom fields

### get_opportunity_details

Get detailed information about a specific opportunity.

Parameters:
- `opportunity_id` (string): The ID of the opportunity to retrieve

### update_opportunity

Update an existing opportunity in Close.com.

Parameters:
- `opportunity_id` (string): The ID of the opportunity to update
- `status_id` (string, optional): The status ID
- `value` (number, optional): Opportunity value
- `value_period` (string, optional): Value period ('one_time', 'monthly', 'annual')
- `confidence` (number, optional): Confidence level
- `note` (string, optional): Opportunity note
- `custom` (object, optional): Custom fields
- `date_won` (string, optional): Date won (ISO format)

### delete_opportunity

Delete an opportunity in Close.com.

Parameters:
- `opportunity_id` (string): The ID of the opportunity to delete

### get_call_details

Get detailed information about a specific call.

Parameters:
- `call_id` (string): The ID of the call to retrieve

### create_call

Create a new call in Close.com.

Parameters:
- `lead_id` (string): The ID of the lead
- `status` (string, optional): Call status ('completed')
- `direction` (string, optional): Call direction ('outbound', 'inbound')
- `duration` (number, optional): Call duration in seconds
- `recording_url` (string, optional): URL of call recording
- `note_html` (string, optional): HTML formatted note
- `note` (string, optional): Plain text note
- `disposition` (string, optional): Call disposition
- `cost` (number, optional): Call cost

### update_call

Update an existing call in Close.com.

Parameters:
- `call_id` (string): The ID of the call to update
- `note_html` (string, optional): HTML formatted note
- `note` (string, optional): Plain text note
- `recording_url` (string, optional): URL of call recording
- `disposition` (string, optional): Call disposition
- `cost` (number, optional): Call cost

### delete_call

Delete a call in Close.com.

Parameters:
- `call_id` (string): The ID of the call to delete

### get_user_details

Get detailed information about a specific user.

Parameters:
- `user_id` (string): The ID of the user to retrieve

### list_users

List all users in the organization.

No parameters required.

### get_user_availability

Get user availability status.

Parameters:
- `organization_id` (string, optional): The ID of the organization

### test_connection

Test the connection to Close.com API.

No parameters required.

## Security

This server performs read and write operations on your Close.com account. The API key should be kept secure and not shared.

## License

MIT
