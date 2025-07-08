# Gmail MCP Server

A Model Context Protocol (MCP) server implementation for Gmail API integration, enabling AI assistants to interact with Gmail services.

## Features

### Core Functionality
- **Email Operations**
  - List emails with advanced filtering
  - Read specific emails with full content
  - Create and send new emails
- **Draft Management**
  - Create new drafts
  - List existing drafts
  - Read draft content
  - Update draft content and recipients
  - Delete drafts
- **Calendar Operations**
  - List upcoming calendar events
  - Read detailed event information
  - Create new calendar events
  - Event filtering and search
  - Timezone support
  - iOS calendar sync support
  
### Search & Filtering
- Gmail search query support
- Label-based filtering
- Customizable result limits
- Calendar event search capabilities

### Security
- Google OAuth2.0 integration
- Secure credential management
- Refresh token handling
- Multi-scope authorization support

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Cloud Platform account with Gmail and Calendar APIs enabled
- OAuth 2.0 credentials with appropriate scopes

### Installation

1. Clone and install dependencies:
   ```bash
   git clone [repository-url]
   cd gmail-mcp-server
   npm install
   ```

2. Configure environment:
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Add your credentials:
   GOOGLE_CLIENT_ID="your_client_id"
   GOOGLE_CLIENT_SECRET="your_client_secret"
   REDIRECT_URI="http://localhost:4100/code"
   GOOGLE_REFRESH_TOKEN="your_refresh_token"
   ```

3. Build and run:
   ```bash
   npm run build
   npm start
   ```

## Development

### Available Scripts
- `npm run dev` - Build and run with watch mode
- `npm run build` - Build the project
- `npm run clean` - Clean build artifacts
- `npm run watch` - Watch for changes

### Project Structure
```
gmail-mcp-server/
├── src/
│   ├── config/         # Configuration and setup
│   ├── services/       # Core business logic
│   │   ├── gmail/      # Gmail services
│   │   └── calendar/   # Calendar services
│   ├── tools/          # MCP tool implementations
│   │   ├── calendar/   # Calendar tools
│   │   ├── drafts/     # Draft management tools
│   │   └── messages/   # Email tools
│   ├── types/          # TypeScript definitions
│   └── index.ts        # Server entry point
├── dist/              # Compiled JavaScript
└── tests/             # Test files (pending)
```

### API Interface

#### List Messages
```typescript
listEmails({
  maxResults?: number,    // Default: 10
  query?: string,         // Gmail search query
  labelIds?: string[],    // Filter by labels
  verbose?: boolean       // Include details
})
```

#### Read Message
```typescript
readEmail({
  messageId: string    // Message ID to fetch
})
```

#### Draft Operations
```typescript
// List Drafts
listDrafts({
  maxResults?: number,    // Default: 10
  query?: string,         // Search query
  verbose?: boolean       // Include details
})

// Read Draft
readDraft({
  draftId: string        // Draft ID to fetch
})

// Create Draft
draftEmail({
  to: string[],
  subject: string,
  body: string,
  cc?: string[],
  bcc?: string[],
  isHtml?: boolean
})

// Update Draft
updateDraft({
  draftId: string,       // Draft ID to update
  to?: string[],         // New recipients
  cc?: string[],         // New CC recipients
  bcc?: string[],         // New BCC recipients
  subject?: string,      // New subject
  body?: string,         // New body content
  isHtml?: boolean       // Content type flag
})

// Delete Draft
deleteDraft({
  draftId: string        // Draft ID to delete
})
```

#### Send Email
```typescript
sendEmail({
  to: string[],
  subject: string,
  body: string,
  cc?: string[],
  bcc?: string[],
  isHtml?: boolean,
  draftId?: string    // Optional: send existing draft
})
```

#### Calendar Operations
```typescript
// List Events
listEvents({
  maxResults?: number,    // Default: 25
  timeMin?: string,       // Start time (ISO 8601)
  timeMax?: string,       // End time (ISO 8601)
  query?: string,         // Text search term
  timeZone?: string      // Default: Australia/Brisbane
})

// Read Event Details
readEvent({
  eventId: string,       // Event ID to fetch details
  timeZone?: string     // Default: Australia/Brisbane
})

// Create Event
createEvent({
  summary: string,       // Event title
  start: {
    dateTime: string,    // ISO 8601 start time
    timeZone?: string    // Start time timezone
  },
  end: {
    dateTime: string,    // ISO 8601 end time
    timeZone?: string    // End time timezone
  },
  description?: string,  // Optional event description
  location?: string,     // Optional event location
  attendees?: Array<{    // Optional attendees
    email: string,
    displayName?: string,
    optional?: boolean
  }>,
  status?: 'confirmed' | 'tentative' | 'cancelled',
  sendNotifications?: boolean
})
```

## Error Handling
The server implements comprehensive error handling for:
- Authentication failures
- API rate limits
- Invalid requests
- Network issues
- Calendar sync issues
- Event ID validation
- Timezone validation

## Contributing
Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Changelog
See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## Roadmap
See [Backlog.md](Backlog.md) for planned features and improvements.

## License
MIT License - see [LICENSE](LICENSE) for details.