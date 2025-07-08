# MCP Rand

[![npm version](https://badge.fury.io/js/mcp-rand.svg)](https://www.npmjs.com/package/mcp-rand)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A Model Context Protocol (MCP) server providing various random generation utilities, including UUID, numbers, strings, passwords, Gaussian distribution, dice rolling, and card drawing.

<a href="https://glama.ai/mcp/servers/ccd6b0hni8"><img width="380" height="200" src="https://glama.ai/mcp/servers/ccd6b0hni8/badge" alt="Rand MCP server" /></a>

## Installation

```bash
npm install mcp-rand
```

Or install globally:

```bash
npm install -g mcp-rand
```

## Features

### UUID Generator
- Generates RFC 4122 version 4 UUIDs
- Uses Node's native crypto module for secure random generation
- No parameters required

### Random Number Generator
- Generates random numbers within a specified range
- Configurable minimum and maximum values (inclusive)
- Defaults to range 0-100 if no parameters provided

### Gaussian Random Generator
- Generates random numbers following a Gaussian (normal) distribution
- Normalized to range 0-1
- No parameters required

### Random String Generator
- Generates random strings with configurable length and character sets
- Supports multiple character sets:
  * alphanumeric (default): A-Z, a-z, 0-9
  * numeric: 0-9
  * lowercase: a-z
  * uppercase: A-Z
  * special: !@#$%^&*()_+-=[]{};\'"\\|,.<>/?
- Configurable string length (defaults to 10)

### Password Generator
- Generates strong passwords with a mix of character types
- Ensures at least one character from each type (uppercase, lowercase, numbers, special)
- Configurable length (minimum 8, default 16)
- WARNING: While passwords are generated locally, it's recommended to use a dedicated password manager

### Dice Roller
- Roll multiple dice using standard dice notation
- Supports notation like "2d6" (two six-sided dice), "1d20" (one twenty-sided die)
- Returns individual rolls and total for each set of dice
- Can roll multiple different dice sets at once (e.g., "2d6", "1d20", "4d4")

### Card Drawer
- Draw cards from a standard 52-card deck
- Maintains deck state between draws using base64 encoding
- Returns drawn cards and remaining deck state
- Supports drawing any number of cards up to the deck size
- Properly shuffles available cards before each draw

## Usage

### As a CLI Tool

```bash
npx mcp-rand
```

### Integration with MCP Clients

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "mcp-rand": {
      "command": "node",
      "args": ["path/to/mcp-rand/build/index.js"],
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

### Example Usage

```typescript
// Generate UUID
const uuid = await client.callTool('generate_uuid', {});
console.log(uuid); // e.g., "550e8400-e29b-41d4-a716-446655440000"

// Generate random number
const number = await client.callTool('generate_random_number', {
  min: 1,
  max: 100
});
console.log(number); // e.g., 42

// Generate Gaussian random number
const gaussian = await client.callTool('generate_gaussian', {});
console.log(gaussian); // e.g., 0.6827

// Generate random string
const string = await client.callTool('generate_string', {
  length: 15,
  charset: 'alphanumeric'
});
console.log(string); // e.g., "aB9cD8eF7gH6iJ5"

// Generate password
const password = await client.callTool('generate_password', {
  length: 20
});
console.log(password); // e.g., "aB9#cD8$eF7@gH6*iJ5"

// Roll dice
const rolls = await client.callTool('roll_dice', {
  dice: ['2d6', '1d20', '4d4']
});
console.log(rolls);
/* Output example:
[
  {
    "dice": "2d6",
    "rolls": [3, 1],
    "total": 4
  },
  {
    "dice": "1d20",
    "rolls": [4],
    "total": 4
  },
  {
    "dice": "4d4",
    "rolls": [2, 3, 2, 3],
    "total": 10
  }
]
*/

// Draw cards
const draw1 = await client.callTool('draw_cards', {
  count: 5
});
console.log(draw1);
/* Output example:
{
  "drawnCards": [
    { "suit": "hearts", "value": "A" },
    { "suit": "diamonds", "value": "7" },
    { "suit": "clubs", "value": "K" },
    { "suit": "spades", "value": "2" },
    { "suit": "hearts", "value": "10" }
  ],
  "remainingCount": 47,
  "deckState": "t//+///bDw=="
}
*/

// Draw more cards using previous deck state
const draw2 = await client.callTool('draw_cards', {
  count: 3,
  deckState: draw1.deckState
});
console.log(draw2);
/* Output example:
{
  "drawnCards": [
    { "suit": "diamonds", "value": "Q" },
    { "suit": "clubs", "value": "5" },
    { "suit": "spades", "value": "J" }
  ],
  "remainingCount": 44,
  "deckState": "l//+//zbDw=="
}
*/
```

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

ISC
