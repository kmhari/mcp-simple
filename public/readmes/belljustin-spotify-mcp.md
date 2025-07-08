# Spotify Model Context Protocol (MCP)

A Spotify MCP for creating playlists based on a description.

## Prerequisites

- Python 3.6 or higher
- Spotify Developer credentials (Client ID and Client Secret)

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/spotify-mcp.git
   cd spotify-mcp
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your Spotify Developer credentials:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Set up your environment variables:
     ```bash
     echo SPOTIFY_CLIENT_ID='your_client_id' >> .env
     echo SPOTIFY_CLIENT_SECRET='your_client_secret' >> .env
     ```


## Usage

### Starting the Authentication Server

1. Set up your redirect URI in the Spotify Developer Dashboard:
   - Go to your app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Click "Edit Settings"
   - Add `http://localhost:5000/callback` to the Redirect URIs
   - Save the changes

2. Start the authentication server:
   ```bash
   python main.py
   ```
   This will start a local server on port 5000 that handles Spotify OAuth authentication.

3. Visit `http://localhost:5000` in your browser to authenticate with Spotify.
   After successful authentication, your access token will be saved for use with the MCP.

### Integrating with Cursor

1. Open Cursor and go to Settings
2. Navigate to the "Model Context Protocols" section
3. Click "Add MCP"
4. Enter the following details in your mcp.json, replacing PATH-TO-BASE-DIR:
```
{
  "mcpServers": {
    "spotify": {
        "command": "uv",
        "args": [
          "--directory",
          "PATH-TO-BASE-DIR/spotify-mcp",
          "run",
          "spotify.py"
        ]
    }
  }
}
```

Now you can use the Spotify MCP commands in Cursor to create and manage playlists directly from your editor!
