# Fireflies MCP Server

MCP Server for the Fireflies.ai API, enabling transcript retrieval, search, and summary generation.

### Features

- **Transcript Management**: Retrieve and search meeting transcripts with filtering options
- **Detailed Information**: Get comprehensive details about specific transcripts
- **Advanced Search**: Find transcripts containing specific keywords or phrases
- **Summary Generation**: Generate concise summaries of meeting transcripts in different formats


## Tools

1. `fireflies_get_transcripts`
   - Retrieve a list of meeting transcripts with optional filtering
   - Inputs:
     - `limit` (optional number): Maximum number of transcripts to return
     - `from_date` (optional string): Start date in ISO format (YYYY-MM-DD)
     - `to_date` (optional string): End date in ISO format (YYYY-MM-DD)
   - Returns: Array of transcript objects with basic information

2. `fireflies_get_transcript_details`
   - Get detailed information about a specific transcript
   - Inputs:
     - `transcript_id` (string): ID of the transcript to retrieve
   - Returns: Comprehensive transcript details including speakers, content, and metadata

3. `fireflies_search_transcripts`
   - Search for transcripts containing specific keywords
   - Inputs:
     - `query` (string): Search query to find relevant transcripts
     - `limit` (optional number): Maximum number of transcripts to return
   - Returns: Array of matching transcript objects

4. `fireflies_generate_summary`
   - Generate a summary of a meeting transcript
   - Inputs:
     - `transcript_id` (string): ID of the transcript to summarize
     - `format` (optional string): Format of the summary ('bullet_points' or 'paragraph')
   - Returns: Generated summary text

## Setup

### Fireflies API Key
[Create a Fireflies API Key](https://fireflies.ai/dashboard/settings/api) with appropriate permissions:
   - Go to the Fireflies.ai dashboard
   - Navigate to Settings > API
   - Generate a new API key
   - Copy the generated key

### Usage with Claude Desktop
To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "fireflies": {
      "command": "npx",
      "args": [
        "-y",
        "@props-labs/mcp/fireflies"
      ],
      "env": {
        "FIREFLIES_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Build the project:

```bash
npm run build
# or
pnpm build
```

## Usage

### Starting the Server

```bash
FIREFLIES_API_KEY=your_api_key npm start
# or
FIREFLIES_API_KEY=your_api_key pnpm start
```

You can also use the setup script:

```bash
./setup.sh
FIREFLIES_API_KEY=your_api_key npm start
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository. 