# Google Sheets MCP Server

This MCP server provides tools to interact with Google Sheets, allowing you to read, write, and update data in your spreadsheets.

## Prerequisites

- Python 3.8 or higher
- Google Cloud Platform account
- A Google Sheet that you want to interact with

## Installation

1. Clone this repository:
```bash
git clone <your-repository-url>
cd mcp-server-demo
```

2. Install the required packages:
```bash
pip install google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

3. Download and place credentials.json:
   - Download the `credentials.json` file from your Google Cloud Console
   - Place the `credentials.json` file in the same directory as `main.py`
   - Make sure the file is named exactly `credentials.json`

## Setting up Google Cloud Platform Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the service account details:
     - Name: Choose a descriptive name
     - ID: Will be auto-generated
     - Description: Optional description
   - Click "Create and Continue"
   - For Role, select "Editor" (or appropriate role for your needs)
   - Click "Continue" and then "Done"

5. Create and download the key:
   - In the service account list, click on your newly created account
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Click "Create"
   - The JSON file will be downloaded automatically

6. Save the credentials:
   - Rename the downloaded JSON file to `credentials.json`
   - Place it in the `mcp-server-demo` directory

7. Share your Google Sheet:
   - Open your Google Sheet
   - Click the "Share" button
   - Add the service account email (found in the `client_email` field of your `credentials.json`)
   - Give it "Editor" access

## Running the Server

1. Install the MCP server:
```bash
uv run mcp install main.py
```

2. The server will start and be ready to accept commands.

## Adding to Cursor

To add this MCP server to Cursor, follow these steps:

1. Open Cursor
2. Go to Cursor -> Preferences -> Cursor Settings -> MCP -> Add new global MCP Server
3. Add the following configuration to your Cursor config file:

```json
{
  "mcpServers": {
    "GoogleSheets": {
      "command": "python",
      "args": [
        "main.py"
      ]
    }
  }
}
```

4. Restart Cursor for the changes to take effect


## Screenshots
![image](https://github.com/user-attachments/assets/233c32f1-c981-45fe-8f37-3c8e2654e6a2)

![image](https://github.com/user-attachments/assets/d6be305b-d633-4c6c-a300-d5d1032f373f)

![image](https://github.com/user-attachments/assets/9bd9eea1-221b-4ab6-a285-4bceb65e4ea7)

![image](https://github.com/user-attachments/assets/b1e8a66d-b4d4-4226-87a2-37938fc9478e)

![image](https://github.com/user-attachments/assets/d698345e-0268-4d23-b74a-47bd5c1f4f34)

## Available Tools

### List Spreadsheets
```bash
/tool list_spreadsheets
```
Lists all spreadsheets shared with the service account.

### Get Spreadsheet Info
```bash
/tool get_spreadsheet_info "spreadsheet_id"
```
Gets information about a specific spreadsheet.

### Get Sheet Content
```bash
/tool get_sheet_content "spreadsheet_id"
```
Retrieves the content of a specific sheet.

### Generate Sheet Data
```bash
/tool generate_sheet_data "spreadsheet_id"  number_of_records
```
Generates realistic data based on the sheet's attributes.

### Add Data to Sheet
```bash
/tool add_data_to_sheet "spreadsheet_id"  "data_string"
```
Adds pre-generated data to a sheet.

### Update Sheet Record
```bash
/tool update_sheet_record "spreadsheet_id"  "identifier" "updates"
```
Updates a record in the sheet based on id or name matching.

## Data Formats

### For Adding Data
The data string can be in one of these formats:
1. List of lists format: `[["value1", "value2"], ["value3", "value4"]]`
2. CSV format:
```
value1,value2
value3,value4
```

### For Updates
Provide the changes in format: `column1=value1 column2=value2`
Example: `age=25 email=xyz@example.com phone=1234567890`

## Security Notes

1. Never commit `credentials.json` to version control
2. Keep your credentials secure
3. Only share your Google Sheet with necessary service accounts
4. Regularly rotate your credentials

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Ensure the service account email has been added as an editor to the spreadsheet
   - Verify that the `credentials.json` file is valid and not corrupted
   - Check if the Google Sheets API is enabled in your Google Cloud project

2. **Permission Errors**
   - Make sure the service account has the correct permissions
   - Verify the spreadsheet is shared with the service account email
   - Check if the spreadsheet ID is correct

3. **Data Format Errors**
   - Ensure the data format matches the expected structure
   - Check if the sheet has the required columns (id or name)
   - Verify the number of columns in the data matches the sheet

## Support

If you encounter any issues or have questions, please:
1. Check the error messages in the logs
2. Verify your setup following the instructions above
3. Ensure all prerequisites are met
4. Contact aryanpandit17032002@gmail.com


