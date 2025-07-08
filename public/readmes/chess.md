# MCP Chess

A [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that provides
chess functionality for [Claude AI](https://claude.ai/) Assistant.

https://github.com/user-attachments/assets/324ed381-35f3-45b7-b877-127ef27fd97d

## Features

This server implements tools that extend Claude's capabilities to:

- Generate chess board images from a Forsyth-Edwards Notation (FEN) string
- Suggest the next move in a chess game
- Check if a move is legal

## Installation for Claude Desktop

1. Download the latest binary from the [Releases](https://github.com/alexandreroman/mcp-chess/releases) page:
    - For Windows: `mcp-chess-windows.exe`
    - For macOS: `mcp-chess-darwin`
    - For Linux: `mcp-chess-linux`

2. Make the file executable (macOS/Linux only):
   ```bash
   chmod +x mcp-chess-darwin   # for macOS
   chmod +x mcp-chess-linux    # for Linux
   ```

3. For macOS users - Bypassing Security Warnings:

   When you first try to run the application, macOS may display a security warning because the application is not signed by an identified developer. To bypass this:

    - Right-click (or Control-click) on the `mcp-chess-darwin` file
    - Select "Open" from the context menu
    - Click "Open" in the dialog box that appears

   Alternatively, you can use Terminal:
   ```bash
   xattr -d com.apple.quarantine /path/to/mcp-chess-darwin
   ```

   This only needs to be done once.

4. Configure Claude Desktop:
    - Open Claude Desktop
    - Select "Settings", and click on the "Developer" tab
    - Click "Edit Config"
    - Add the MCP server configuration
    - Save the file
    - Restart Claude Desktop

Here's an example for the MCP server configuration:

```json
{
  "mcpServers": {
    "mcp-chess": {
      "command": "/path/to/mcp-chess-binary"
    }
  }
}
```

## Using with Claude

Once properly configured, you can ask Claude to perform various chess-related tasks:

```
Show me the starting position of a chess game.
```

```
Let's play a chess game. Check that each move is legal. Suggest the best move to play.
```

```
Is Nf3 a legal move from the starting position?
```

```
What's a good move for white in this position: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2"?
```

## Technical Details

### Development

This project is built with:
- Spring Boot
- Spring AI (MCP server implementation)
- Java 21
- GraalVM native compilation

### Building from Source

```bash
# Clone the repository
git clone https://github.com/alexandreroman/mcp-chess.git
cd mcp-chess

# Build with Maven
./mvnw clean package

# Build a native executable
./mvnw -Pnative native:compile
```

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Credits

- [ChessGame](https://github.com/wolfraam/chess-game) - Java chess library
- [ChessImage](https://github.com/alexandreroman/chessimage) - Chess board renderer
- [Stockfish.online](https://stockfish.online/) - Chess engine API
- [Spring AI](https://spring.io/projects/spring-ai) - AI application framework
