# anki-mcp

A Model Context Protocol (MCP) server for interacting with Anki flashcards via the AnkiConnect add-on. This server exposes AnkiConnect actions as MCP tools, organized into logical services.

## Prerequisites

- Anki desktop application
- AnkiConnect add-on installed and configured in Anki
- Python 3.8+
- `uv` (for running and installing dependencies, optional but recommended)

## Installation

```bash
# Clone the repository
git clone https://github.com/ujisati/anki-mcp.git
cd anki-mcp

# Install dependencies (using uv)
uv pip install -e .
```

## Usage

To run the MCP server:

```bash
uv run anki-mcp
```

The server will start and listen for MCP requests, typically interfacing with AnkiConnect at `http://127.0.0.1:8765`.

### Inspecting the Server

You can use the MCP Inspector to view the available tools:

```bash
npx @modelcontextprotocol/inspector uv run anki-mcp
```

## Configuration for MCP Clients

If you're integrating this with an MCP client (like an AI assistant framework), you'll need to configure it to find this server. Here's an example configuration snippet:

```json
{
    "mcpServers": {
        "anki": {
            "command": "uv",
            "args": [
                "run", // uv will find anki-mcp if run from project root
                "anki-mcp"
            ],
            // If running from outside the project directory, specify the path:
            // "args": [
            //     "--directory",
            //     "/ABSOLUTE/PATH/TO/anki-mcp", // Replace with actual path
            //     "run",
            //     "anki-mcp"
            // ]
        }
    }
}
```

## Available MCP Tools

This MCP server provides access to Anki functionality through tools grouped by services. The tool names correspond directly to AnkiConnect actions.

### Deck Service (`deck.*`)
- **`deck.deckNamesAndIds`**: Gets the complete list of deck names and their respective IDs.
- **`deck.getDeckConfig`**: Gets the configuration group object for a given deck name.
- **`deck.deckNames`**: Gets the complete list of deck names for the current user.
- **`deck.createDeck`**: Creates a new empty deck.
- **`deck.deleteDecks`**: Deletes specified decks.
- **`deck.changeDeck`**: Moves cards to a different deck.
- **`deck.saveDeckConfig`**: Saves a deck configuration group.

### Note Service (`note.*`)
- **`note.findNotes`**: Returns note IDs for a given Anki search query.
- **`note.notesInfo`**: Returns information for specified note IDs.
- **`note.getNoteTags`**: Gets the tags for a specific note ID.
- **`note.addNote`**: Creates a new note.
- **`note.updateNoteFields`**: Modifies the fields of an existing note.
- **`note.deleteNotes`**: Deletes specified notes.
- **`note.addNotes`**: Creates multiple notes.
- **`note.addTags`**: Adds tags to specified notes.
- **`note.removeTags`**: Removes tags from specified notes.
- **`note.updateNote`**: Modifies the fields and/or tags of an existing note.

### Card Service (`card.*`)
- **`card.findCards`**: Returns card IDs for a given Anki search query.
- **`card.cardsInfo`**: Returns information for specified card IDs.
- **`card.cardsToNotes`**: Returns note IDs for given card IDs.
- **`card.areSuspended`**: Checks if specified cards are suspended.
- **`card.cardsModTime`**: Returns modification time for specified card IDs.
- **`card.suspended`**: Checks if a single card is suspended.
- **`card.suspend`**: Suspends specified cards.
- **`card.unsuspend`**: Unsuspends specified cards.
- **`card.setSpecificValueOfCard`**: Sets specific values of a single card (use with caution).

### Model Service (`model.*`) (Note Types)
- **`model.modelNamesAndIds`**: Gets the complete list of model (note type) names and their IDs.
- **`model.findModelsByName`**: Gets model definitions for provided model names.
- **`model.modelFieldNames`**: Gets field names for a given model name.
- **`model.modelTemplates`**: Gets template content for each card of a specified model.
- **`model.modelStyling`**: Gets CSS styling for a given model name.
- **`model.createModel`**: Creates a new model (note type).
- **`model.updateModelTemplates`**: Modifies templates of an existing model.
- **`model.updateModelStyling`**: Modifies CSS styling of an existing model.
- **`model.modelFieldAdd`**: Adds a new field to an existing model.
- **`model.modelFieldRemove`**: Removes a field from an existing model.

### Media Service (`media.*`)
- **`media.retrieveMediaFile`**: Retrieves the base64-encoded contents of a media file.
- **`media.getMediaFilesNames`**: Gets names of media files matching a glob pattern.
- **`media.storeMediaFile`**: Stores a media file (from base64, path, or URL).
- **`media.deleteMediaFile`**: Deletes a specified media file.

## Development

To set up for development:

```bash
uv sync
source .venv/bin/activate

uv pip install -e .
```

### Running Tests

```bash
pytest
```

## Todo

- [ ] Finish adding all AnkiConnect tools
