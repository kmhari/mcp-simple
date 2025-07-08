# Google Calendar MCP Server

This MCP server allows Claude to interact with your Google Calendar, enabling capabilities like listing events, creating meetings, and finding free time slots.

## Prerequisites

- Node.js (v16 or higher)
- Claude Desktop App
- A Google Cloud Project
- Google Calendar API enabled
- OAuth 2.0 credentials

## Setup Instructions

### 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

### 2. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type (unless you have a Google Workspace organization)
3. Fill in the required information:
   - App name
   - User support email
   - Developer contact information
4. Add the following scopes:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
5. Add your email address as a test user

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Desktop app" as the application type
4. Name your client (e.g., "MCP Calendar Client")
5. Click "Create"
6. Download the client configuration file (you'll need the client ID and client secret)

### 4. Get Refresh Token

1. Create a new file named `getToken.js`:

```javascript
const { google } = require('googleapis');
const http = require('http');
const url = require('url');

// Replace these with your OAuth 2.0 credentials
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

// Configure OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Define scopes
const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
];

async function getRefreshToken() {
  return new Promise((resolve, reject) => {
    try {
      // Create server to handle OAuth callback
      const server = http.createServer(async (req, res) => {
        try {
          const queryParams = url.parse(req.url, true).query;
          
          if (queryParams.code) {
            // Get tokens from code
            const { tokens } = await oauth2Client.getToken(queryParams.code);
            console.log('\n=================');
            console.log('Refresh Token:', tokens.refresh_token);
            console.log('=================\n');
            console.log('Save this refresh token in your configuration!');
            
            // Send success response
            res.end('Authentication successful! You can close this window.');
            
            // Close server
            server.close();
            resolve(tokens);
          }
        } catch (error) {
          console.error('Error getting tokens:', error);
          res.end('Authentication failed! Please check console for errors.');
          reject(error);
        }
      }).listen(3000, () => {
        // Generate auth url
        const authUrl = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: scopes,
          prompt: 'consent'  // Force consent screen to ensure refresh token
        });

        console.log('1. Copy this URL and paste it in your browser:');
        console.log('\n', authUrl, '\n');
        console.log('2. Follow the Google authentication process');
        console.log('3. Wait for the refresh token to appear here');
      });

    } catch (error) {
      console.error('Server creation error:', error);
      reject(error);
    }
  });
}

// Run the token retrieval
getRefreshToken().catch(console.error);
```

2. Install required dependency:
```bash
npm install googleapis
```

3. Update the script with your OAuth credentials:
   - Replace `your-client-id` with your actual client ID
   - Replace `your-client-secret` with your actual client secret

4. Run the script:
```bash
node getToken.js
```

5. Follow the instructions in the console:
   - Copy the provided URL
   - Paste it into your browser
   - Complete the Google authentication process
   - Copy the refresh token that appears in the console

### 5. Configure Claude Desktop

1. Open your Claude Desktop configuration file:

**For MacOS:**
```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**For Windows:**
```bash
code %AppData%\Claude\claude_desktop_config.json
```

2. Add or update the configuration:
```json
{
    "mcpServers": {
        "google-calendar": {
            "command": "node",
            "args": [
                "/ABSOLUTE/PATH/TO/YOUR/build/index.js"
            ],
            "env": {
                "GOOGLE_CLIENT_ID": "your_client_id_here",
                "GOOGLE_CLIENT_SECRET": "your_client_secret_here",
                "GOOGLE_REDIRECT_URI": "http://localhost",
                "GOOGLE_REFRESH_TOKEN": "your_refresh_token_here"
            }
        }
    }
}
```

3. Save the file and restart Claude Desktop

## Initial Project Setup

1. Create a new directory for your project:
```bash
mkdir google-calendar-mcp
cd google-calendar-mcp
```

2. Initialize a new npm project:
```bash
npm init -y
```

3. Install dependencies:
```bash
npm install @modelcontextprotocol/sdk googleapis google-auth-library zod
npm install -D @types/node typescript
```

4. Create a tsconfig.json file:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

5. Update package.json:
```json
{
  "type": "module",
  "scripts": {
    "build": "tsc && node -e \"require('fs').chmodSync('build/index.js', '755')\""
  }
}
```

6. Create your source directory:
```bash
mkdir src
```

7. Create a .env file for local development (don't commit this file):
```bash
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
```

## Building and Running

1. Build the server:
```bash
npm run build
```

2. The server will automatically start when you open Claude Desktop

## Available Tools

The server provides the following tools:

1. `list_events`: List calendar events within a specified time range
2. `create_event`: Create a new calendar event
3. `update_event`: Update an existing calendar event
4. `delete_event`: Delete a calendar event
5. `find_free_time`: Find available time slots in the calendar

## Example Usage in Claude

After setup, you can use commands like:

- "Show me my calendar events for next week"
- "Schedule a meeting with [email_id] tomorrow at 2 PM for 1 hour"
- "Find a free 30-minute slot this afternoon"
- "Update my 3 PM meeting to 4 PM"
- "Cancel my meeting with ID [event_id]"

## Troubleshooting

### Common Issues

1. **Tools not appearing in Claude:**
   - Check Claude Desktop logs: `tail -f ~/Library/Logs/Claude/mcp*.log`
   - Verify all environment variables are set correctly
   - Ensure the path to index.js is absolute and correct

2. **Authentication Errors:**
   - Verify your OAuth credentials are correct
   - Check if refresh token is valid
   - Ensure required scopes are enabled

3. **Server Connection Issues:**
   - Check if the server built successfully
   - Verify file permissions on build/index.js (should be 755)
   - Try running the server directly: `node /path/to/build/index.js`

### Viewing Logs

To view server logs:
```bash
# For MacOS/Linux:
tail -n 20 -f ~/Library/Logs/Claude/mcp*.log

# For Windows:
Get-Content -Path "$env:AppData\Claude\Logs\mcp*.log" -Wait -Tail 20
```

### Environment Variables

If you're getting environment variable errors, verify each one:

1. GOOGLE_CLIENT_ID: Should start with something like "123456789-..."
2. GOOGLE_CLIENT_SECRET: Usually ends in ".apps.googleusercontent.com"
3. GOOGLE_REDIRECT_URI: Should be "http://localhost"
4. GOOGLE_REFRESH_TOKEN: A long string that doesn't expire

## Security Considerations

- Keep your OAuth credentials secure
- Don't commit credentials to version control
- Use environment variables for sensitive data
- Regularly rotate refresh tokens
- Monitor API usage in Google Cloud Console

## License

MIT License - See LICENSE file for details.

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Claude Desktop logs
3. Open an issue on GitHub
4. Contact the maintainer