# Notion MCP Server

A Model Context Protocol server for Notion integration, allowing Claude and other LLMs to interact with your Notion workspace.

## Features

- **Search Notion**: Search across your entire Notion workspace
- **Get Page**: Retrieve content from a specific Notion page
- **Create Page**: Create new pages in your Notion workspace
- **Update Page**: Update existing pages with new content or titles
- **Create Database**: Create new databases with custom properties
- **Query Database**: Query databases with filters and sorting
- **Update Database Entry**: Update properties of database entries
- **Create Database Row**: Add new rows to existing databases with custom properties

## Setup

1. **Clone this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your Notion API key**
   - Create an integration in the [Notion Developers portal](https://www.notion.so/my-integrations)
   - Copy your API key
   - You can either:
     - Edit the `.env` file and replace `your_notion_api_key_here` with your actual API key, or
     - Pass it directly in the Claude for Desktop configuration (recommended, see below)

4. **Build the server**
   ```bash
   npm run build
   ```

5. **Running the server**
   ```bash
   npm start
   ```

## Setting up with Claude for Desktop

1. Install Claude for Desktop (if not already installed)
2. Open your Claude for Desktop App configuration:
   - On macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Create the file if it doesn't exist

3. Add the Notion server to your configuration:
   ```json
   {
     "mcpServers": {
       "notion": {
         "command": "node",
         "args": [
           "/Users/shaheerahmad/Documents/notion-mcp-server/dist/index.js",
           "--notion-api-key=YOUR_ACTUAL_API_KEY_HERE"
         ]
       }
     }
   }
   ```
   Replace:
   - `/Users/shaheerahmad/Documents/notion-mcp-server` with the full path to your project directory
   - `YOUR_ACTUAL_API_KEY_HERE` with your actual Notion API key

4. Restart Claude for Desktop

## Using the Server

Once connected to Claude for Desktop, you can use the server by asking Claude questions like:

- "Search for meeting notes in my Notion workspace"
- "Get the content of my project planning page" (you'll need the page ID)
- "Create a new page in Notion with a list of tasks"
- "Update my Notion page with ID 1aaada269d1b8003adceda69cf7bcd97 with content 'Here is some new content to add to the page.'"
- "Create a new database in my Notion page with ID 1aaada269d1b8003adceda69cf7bcd97"
- "Query my Notion database with ID 1aaada269d1b8003adceda69cf7bcd97 for items with status 'Completed'"

Claude will automatically use the appropriate tools based on your request.

### Tool Usage Examples

#### Search Notion
```
Search for "meeting notes" in my Notion workspace
```

#### Get Page Content
```
Get the content of my Notion page with ID 1aaada269d1b8003adceda69cf7bcd97
```

#### Create a New Page
```
Create a new page in Notion with title "Weekly Report" and content "This week we accomplished the following tasks..."
```

#### Update an Existing Page
```
Update my Notion page with ID 1aaada269d1b8003adceda69cf7bcd97 with content "Adding this new information to the page."
```
You can also update the title:
```
Update my Notion page with ID 1aaada269d1b8003adceda69cf7bcd97 with title "New Title" and content "New content to add."
```

#### Create a New Database
```
Create a new database in my Notion page with ID 1aaada269d1b8003adceda69cf7bcd97 with title "Task Tracker" and properties {
  "Task Name": { "title": {} },
  "Status": {
    "select": {
      "options": [
        { "name": "Not Started", "color": "red" },
        { "name": "In Progress", "color": "yellow" },
        { "name": "Completed", "color": "green" }
      ]
    }
  },
  "Priority": {
    "select": {
      "options": [
        { "name": "Low", "color": "blue" },
        { "name": "Medium", "color": "yellow" },
        { "name": "High", "color": "red" }
      ]
    }
  },
  "Due Date": { "date": {} }
}
```

#### Query a Database
```
Query my Notion database with ID 1aaada269d1b8003adceda69cf7bcd97 with filter {
  "property": "Status",
  "select": {
    "equals": "Completed"
  }
}
```

You can also add sorting:
```
Query my Notion database with ID 1aaada269d1b8003adceda69cf7bcd97 with sort {
  "property": "Due Date",
  "direction": "ascending"
}
```

#### Update Database Entry

Update properties of an existing database entry (page within a database).

```json
{
  "tool_name": "update-database-entry",
  "tool_params": {
    "pageId": "page_id_of_database_entry",
    "properties": {
      "Status": {
        "select": {
          "name": "Completed"
        }
      },
      "Priority": {
        "select": {
          "name": "High"
        }
      },
      "Due Date": {
        "date": {
          "start": "2023-12-31"
        }
      }
    }
  }
}
```

The `properties` parameter should match the structure expected by the Notion API for the specific property types in your database. Different property types (text, select, date, etc.) require different formats.

#### Create Database Row

Add a new row to an existing database with custom properties.

```json
{
  "tool_name": "create-database-row",
  "tool_params": {
    "databaseId": "your_database_id_here",
    "properties": {
      "Name": {
        "title": [
          {
            "text": {
              "content": "New Task"
            }
          }
        ]
      },
      "Status": {
        "select": {
          "name": "Not Started"
        }
      },
      "Priority": {
        "select": {
          "name": "Medium"
        }
      },
      "Due Date": {
        "date": {
          "start": "2023-12-15"
        }
      },
      "Notes": {
        "rich_text": [
          {
            "text": {
              "content": "This is a new task created via the API"
            }
          }
        ]
      }
    }
  }
}
```

The `properties` parameter must include all required properties for the database and follow the Notion API structure for each property type.

## Troubleshooting

- If tools aren't showing up, check the Claude for Desktop logs:
  ```bash
  tail -n 20 -f ~/Library/Logs/Claude/mcp*.log
  ```

- Make sure your Notion API key is correctly set and that your integration has been granted access to the pages you want to interact with.

- If you see "Unexpected token" errors in the logs, it's likely that console.log statements are interfering with the MCP protocol. This version of the server has been updated to avoid those issues.

## Future Improvements

- Add database query capabilities
- Implement better content formatting
- Add support for more block types 