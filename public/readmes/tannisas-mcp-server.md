# TweetScheduler

**TweetScheduler** is an automation tool for scheduling tweets. It integrates with Google Sheets to fetch tweets, posts them to Twitter using Selenium, and updates their status in the sheet once posted. This tool is also integrated with the MCP (Machine Communication Protocol) server, enabling external systems to schedule and manage tweets programmatically.

---

## Features

- Fetch tweet content from Google Sheets.
- Post tweets automatically using Selenium.
- Update the status of tweets in the sheet after successful posting.
- Integrate with MCP for enhanced automation and control.

---

## Prerequisites

### Google Cloud API Setup

1. Create a service account in Google Cloud.
2. Download the service account JSON key and place it in the project directory.
3. Enable the Google Sheets and Google Drive APIs.

### Python Dependencies

Install required Python libraries:

```bash
pip install gspread oauth2client selenium mcp pydantic
```
### Selenium WebDriver Setup

1. **Download and Install ChromeDriver**  
   Download the ChromeDriver version that is compatible with your Chrome browser version from the official site: [ChromeDriver Download](https://sites.google.com/a/chromium.org/chromedriver/).

2. **Add ChromeDriver to Your System PATH**  
   Once ChromeDriver is downloaded, add its directory to your system's PATH variable to allow Selenium to use it directly.
## Setup

### Clone the Repository:

```bash
git clone https://github.com/your-username/TweetScheduler.git
cd TweetScheduler
```
## Google Sheets Configuration

1. Place the service account JSON file in the project directory and update its path in the script:

   ```python
   'C:/Users/KIIT/Desktop/KIIT/MCP/service_account.json'
   ```
## Twitter Credentials

Replace the placeholders in the script with your Twitter credentials:

```python
username_field.send_keys("username")  # Replace with your Twitter username
password_field.send_keys("password")  # Replace with your Twitter password
```
## Google Sheet Format

Ensure your Google Sheet has the following columns:

| Tweet Content              | Status   |
|----------------------------|----------|
| [Your tweet text here]     | [Status] |

## Usage

### Standalone Execution
1. Edit the script to provide the `sheet_url` and `sheet_name` of your Google Sheet.
2. Run the script:

   ```bash
   python tweet_scheduler.py
   ```
## MCP Integration

1. Start the MCP server:

   ```bash
   python tweet_scheduler.py
2. Use MCP clients to interact with the schedule-tweets tool, providing the required sheet_url and sheet_name parameters.
   ## MCP Endpoints

### Tools

#### schedule-tweets:
**Description**: Fetches and posts tweets from a Google Sheet.

**Input Schema**:

```json
{
  "type": "object",
  "properties": {
    "sheet_url": {"type": "string"},
    "sheet_name": {"type": "string"}
  },
  "required": ["sheet_url", "sheet_name"]
}
```
## Notes
- Use a dedicated Twitter account for testing, as automated posting may violate Twitter’s terms of service.
- Ensure proper handling of sensitive information like credentials.

