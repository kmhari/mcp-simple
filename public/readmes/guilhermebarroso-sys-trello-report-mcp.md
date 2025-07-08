# trello-report-mcp

A Model Context Protocol (MCP) server for generating Trello board reports by quarter or year. This tool allows you to generate detailed reports of your Trello boards' activity for specific time periods.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Features

- List all Trello boards with optional search filter
- Generate detailed reports for Trello boards by quarter (Q1, Q2, Q3, Q4) or year
- Reports include:
  - Board overview
  - Activity summary
  - List breakdown
  - Member activity
  - Label usage
  - Card flow between lists

## Prerequisites

- Node.js (tested with v23.10.0)
- npm
- Trello API credentials (API Key and Token)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GuilhermeBarroso-sys/trello-report-mcp.git
   cd trello-report-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

## Setting up with Claude

This MCP server is designed to be used with Claude. To set it up:

1. Obtain your Trello API credentials from [https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/)

2. Add the MCP server to your Claude Dev extension settings:
   - Open VSCode
   - Navigate to the Claude Dev extension settings
   - Find the MCP settings file at: `~/path/to/mcp/cline_mcp_settings.json`
   - Add the following configuration:

   ```json
   {
     "mcpServers": {
       "trello-reports": {
         "command": "node",
         "args": [
           "/path/to/trello-report-mcp/dist/index.js"
         ],
         "env": {
           "TRELLO_API_KEY": "your_trello_api_key",
           "TRELLO_API_TOKEN": "your_trello_api_token"
         }
       }
     }
   }
   ```

   Replace `/path/to/trello-report-mcp` with the actual path to your cloned repository, and add your Trello API credentials.


## Using the MCP Server

The Trello Reports MCP server provides two tools:

### 1. List Boards

Lists all Trello boards with optional search filter.

**Parameters:**
- `searchTerm` (optional): Search term to filter boards by name

**Example:**
```json
{
  "tool": "list_boards",
  "parameters": {
    "searchTerm": "Project"
  }
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "# Trello Boards\n\n| Board Name | ID | Last Activity |\n|------------|----|--------------|\n| Project Alpha | 5f7e1234abcd5678 | 2023-01-15 |\n| Project Beta | 5f7e5678abcd1234 | 2023-02-20 |\n\n*Total: 2 boards*"
    }
  ],
  "data": {
    "boards": [
      {
        "id": "5f7e1234abcd5678",
        "name": "Project Alpha",
        "dateLastActivity": "2023-01-15T10:30:00.000Z",
        "...": "..."
      },
      {
        "id": "5f7e5678abcd1234",
        "name": "Project Beta",
        "dateLastActivity": "2023-02-20T14:45:00.000Z",
        "...": "..."
      }
    ]
  }
}
```

### 2. Generate Report

Generates a detailed report for a Trello board by quarter or year.

**Parameters:**
- `boardId`: ID of the Trello board (required if boardName is not provided)
- `boardName`: Name of the Trello board (required if boardId is not provided)
- `period`: Report period
  - `type`: Period type (Q1, Q2, Q3, Q4, or year)
  - `year`: Year for the report (defaults to current year if not provided)
- `format`: Report format (optional)
  - `"full"`: Detailed report with all sections (default)
  - `"summary"`: Concise report with key insights and recommendations

**Example:**
```json
{
  "tool": "generate_report",
  "parameters": {
    "boardName": "Project Alpha",
    "period": {
      "type": "Q1",
      "year": 2023
    }
  }
}
```

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "# Trello Board Report: Project Alpha\n\n## Report Period: First Quarter 2023\n\nDate Range: 2023-01-01 to 2023-03-31\n\n## Board Overview\n\n- **Board Name**: Project Alpha\n- **Description**: Project management board for Alpha initiative\n- **URL**: https://trello.com/b/abcd1234/project-alpha\n- **Last Activity**: 2023-03-28\n- **Lists**: 5\n- **Cards**: 42 total, 35 active in this period\n- **Members**: 8\n\n..."
    }
  ],
  "data": {
    "boardInfo": {
      "id": "5f7e1234abcd5678",
      "name": "Project Alpha",
      "...": "..."
    },
    "period": {
      "type": "Q1",
      "year": 2023
    },
    "dateRange": {
      "start": "2023-01-01T00:00:00.000Z",
      "end": "2023-03-31T23:59:59.999Z"
    }
  }
}
```

## Integration with AI Assistants

This MCP server is designed to be used with AI assistants that support the Model Context Protocol. When connected, the AI can:

1. List all your Trello boards
2. Generate detailed reports for specific boards by quarter or year
3. Present the reports in a well-formatted markdown structure

Example prompts for the AI:
- "List all my Trello boards"
- "Generate a Q1 report for my Project Alpha board"
- "Show me the yearly report for my Marketing board for 2023"

## Development

### Project Structure

```
trello-report-mcp/
├── src/
│   ├── index.ts                 # Main entry point
│   ├── trello/
│   │   ├── api.ts               # Trello API client
│   │   ├── types.ts             # TypeScript interfaces for Trello objects
│   │   └── utils.ts             # Helper functions
│   └── tools/
│       ├── listBoards.ts        # Tool to list all boards
│       └── generateReport.ts    # Tool to generate reports
├── dist/                        # Compiled JavaScript files
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore file
├── CONTRIBUTING.md              # Contribution guidelines
├── CLAUDE_USAGE.md              # Documentation for using with Claude
├── LICENSE                      # ISC License
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

### Adding New Features

To add new features or tools to the MCP server:

1. Define any new types in `src/trello/types.ts`
2. Implement new API methods in `src/trello/api.ts` if needed
3. Create a new tool implementation in the `src/tools/` directory
4. Register the new tool in `src/server.ts`

## License

ISC
