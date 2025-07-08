# ArtistLens

[![smithery badge](https://smithery.ai/badge/@superseoworld/artistlens)](https://smithery.ai/server/@superseoworld/artistlens)
[![npm version](https://img.shields.io/npm/v/@thomaswawra/artistlens.svg)](https://www.npmjs.com/package/@thomaswawra/artistlens)

A powerful Model Context Protocol (MCP) server that provides access to the Spotify Web API. ArtistLens enables seamless interaction with Spotify's music catalog, including searching for tracks, albums, and artists, as well as accessing artist-specific information like top tracks and related artists.

**Current Version:** 0.4.12

<a href="https://glama.ai/mcp/servers/mmrvuig6tp"><img width="380" height="200" src="https://glama.ai/mcp/servers/mmrvuig6tp/badge" alt="ArtistLens MCP server" /></a>

## Installation

### Installing via Smithery

To install ArtistLens for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@superseoworld/artistlens):

```bash
npx -y @smithery/cli install @superseoworld/artistlens --client claude
```

### Manual Installation

You can install the package globally:

```bash
npm install -g @thomaswawra/artistlens
```

Or run it directly with npx:

```bash
npx -y @thomaswawra/artistlens
```

## Configuration

Add to your MCP settings file (e.g., `claude_desktop_config.json` or `cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "spotify": {
      "command": "npx",
      "args": ["-y", "@thomaswawra/artistlens"],
      "env": {
        "SPOTIFY_CLIENT_ID": "your_client_id",
        "SPOTIFY_CLIENT_SECRET": "your_client_secret"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

You'll need to provide your Spotify API credentials:
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Get your Client ID and Client Secret
4. Add them to the configuration as shown above

## Features

- Search for tracks, albums, artists, and playlists
- Get artist information including top tracks and related artists
- Get album information and tracks
- Access new releases and recommendations
- Get audiobook information with market-specific content and chapters
- Note: Audiobook endpoints may require additional authentication or market-specific access
- Get and modify playlist information (name, description, public/private status)
- Access playlist tracks and items with pagination support
- Support for both Spotify IDs and URIs
- Automatic token management with client credentials flow
- Comprehensive test suite for all functionality
- Well-organized code with separation of concerns

## Available Tools

- `get_access_token`: Get a valid Spotify access token
- `search`: Search for tracks, albums, artists, or playlists
- `get_artist`: Get artist information
- `get_artist_top_tracks`: Get an artist's top tracks
- `get_artist_related_artists`: Get artists similar to a given artist
- `get_artist_albums`: Get an artist's albums
- `get_album`: Get album information
- `get_album_tracks`: Get an album's tracks
- `get_track`: Get track information
- `get_available_genres`: Get a list of available genres for recommendations
- `get_new_releases`: Get new album releases
- `get_recommendations`: Get track recommendations based on seed tracks, artists, or genres
- `get_audiobook`: Get audiobook information with optional market parameter
- `get_multiple_audiobooks`: Get information for multiple audiobooks (max 50)
- `get_audiobook_chapters`: Get chapters of an audiobook with pagination support (1-50 chapters per request)
- `get_playlist`: Get a playlist owned by a Spotify user
- `get_playlist_tracks`: Get full details of the tracks of a playlist (1-100 tracks per request)
- `get_playlist_items`: Get full details of the items of a playlist (1-100 items per request)
- `modify_playlist`: Change playlist details (name, description, public/private state, collaborative status)
- `add_tracks_to_playlist`: Add one or more tracks to a playlist with optional position
- `remove_tracks_from_playlist`: Remove one or more tracks from a playlist with optional positions and snapshot ID
- `get_current_user_playlists`: Get a list of the playlists owned or followed by the current Spotify user (1-50 playlists per request)
- `get_featured_playlists`: Get a list of Spotify featured playlists with optional locale and pagination support
- `get_category_playlists`: Get a list of Spotify playlists tagged with a particular category

## Updating

To update to the latest version:

```bash
# If installed globally
npm update -g @thomaswawra/artistlens

# If using npx, it will automatically use the latest version
npx -y @thomaswawra/artistlens
```

## Development

This project is open source and available on GitHub at [https://github.com/superseoworld/artistlens](https://github.com/superseoworld/artistlens).

### Project Structure

The codebase is organized into the following directories:
- `src/handlers/`: Contains handler classes for different Spotify API endpoints
- `src/types/`: TypeScript interfaces for request and response objects
- `src/utils/`: Utility functions and classes for API communication
- `src/__tests__/`: Jest test files for all functionality

### Testing

The project uses Jest for testing. To run the tests:

```bash
npm test
```

To run tests in watch mode during development:

```bash
npm run test:watch
```

### Contributing

To contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Add tests for your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT License

[![smithery badge](https://smithery.ai/badge/@superseoworld/artistlens)](https://smithery.ai/server/@superseoworld/artistlens)
