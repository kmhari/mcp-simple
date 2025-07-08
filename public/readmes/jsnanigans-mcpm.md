# MCPM - The Model Context Protocol Manager
*Or: How I Learned to Stop Worrying and Love the JSON-RPC*

> "The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it." - Terry Pratchett

In the grand tradition of the Unseen University's library system (though with considerably fewer orangutans), MCPM brings order to the chaos of MCP servers. Think of it as your very own Hex, but instead of ants and magical thinking engines, it uses TypeScript and good old-fashioned process management.

## What This Infernal Device Does

MCPM acts as a highly trained Igor between your AI assistant (be it Claude, Cursor, or some other thaumaturgical entity) and the various MCP servers lurking in the depths of your system. It:

- **Spawns MCP servers** with all the care of a master demonologist drawing protective circles
- **Filters tools** like the Patrician filters information - only what's necessary gets through
- **Logs everything** to `mcpm.log`, because as any good wizard knows, you always write it down
- **Manages configurations** with the precision of a guild-certified assassin

## Installation (Or: The Summoning Ritual)

First, you'll need to acquire the necessary components. No dried frog pills required, just:

```bash
git clone https://github.com/jsnanigans/mcpm.git
cd mcpm
npm install     # Gathering the ingredients
npm run build   # The actual transmutation
npm link        # Binding the spell to your system
```

Now, create your grimoire (configuration file):

```bash
cp mcpm.config.example.json mcpm.config.json
```

Edit this file with the care you'd give to inscribing protective runes. One misplaced comma and BAM! - you're debugging instead of doing useful work.

## The Sacred Texts (Configuration)

Your `mcpm.config.json` should look something like this:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      },
      "tools": {
        "allow": ["create_issue", "search_issues", "create_comment"]
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/rincewind/spells"],
      "logging": true
    }
  }
}
```

Each server entry is like a page in the Octavo - handle with care:
- `command`: The incantation to summon the server
- `args`: Additional mystical parameters
- `env`: Environmental conditions (like phase of the moon, but for computers)
- `tools.allow`: Which tools the server is permitted to wield (very important - you wouldn't give a student wizard access to the really dangerous spells)
- `logging`: Whether to record this server's utterances for posterity

## Command Line Incantations

### Starting a Server (The Main Event)

```bash
mcpm --server github --agent cursor --enable-logging
```

This summons the GitHub server, tells it that Cursor is the one asking, and records everything that happens (because you're prudent like that).

### Listing Your Arsenal

```bash
mcpm server list
```

Shows all configured servers, like reviewing your spell collection.

### The Interactive Configuration Wizard

```bash
mcpm edit github
```

Launches an interactive tool selector. It's like having a conversation with a particularly helpful gargoyle about which tools you trust this server to use.

### Finding the Configuration Scroll

```bash
mcpm config
```

Reveals the location of your configuration file, in case you've forgotten where you put it (happens to the best of us).

### Watching the Crystal Ball (Logs)

```bash
mcpm log tail                    # Watch all logs
mcpm log tail -s github         # Watch logs for a specific server
```

## Integration with Cursor (Or: Teaching Your Familiar New Tricks)

Add this to your Cursor settings.json, and it'll know how to summon MCPM:

```json
{
  "mcpServers": {
    "github": {
      "command": "mcpm",
      "args": ["--server=github", "--agent=cursor"]
    },
    "filesystem": {
      "command": "mcpm",
      "args": ["--server=filesystem", "--agent=cursor"]
    }
  }
}
```

## How It Actually Works (The Science Bit)

```
┌─────────┐         ┌──────┐         ┌─────────────┐
│ Cursor  │ <-----> │ MCPM │ <-----> │ MCP Server  │
└─────────┘         └──────┘         └─────────────┘
     ^                  |                    ^
     |                  v                    |
     |              Tool Filter              |
     |                  |                    |
     |                  v                    |
     +------------- Logging -----------------+
```

MCPM sits in the middle like a particularly clever golem, intercepting messages, filtering tools based on your configuration, and keeping detailed records of who said what to whom.

## Advanced Wizardry

### Environment Variables

- `MCPM_ENABLE_LOGGING=true` - Enable logging globally (for when you really need to know what's happening)

### Tool Filtering

The tool filtering system works like the Assassins' Guild pricing structure - very selective:

```json
"tools": {
  "allow": ["tool1", "tool2", "tool3"]
}
```

Or if you prefer the old ways:

```json
"tools": {
  "allow": "tool1 tool2 tool3"
}
```

## Troubleshooting (When Things Go Pear-Shaped)

### "MCP server not found in config"
Your server key doesn't exist. Run `mcpm server list` to see what you've actually got.

### Server Won't Start
1. Check if the command exists: `which <command>`
2. Look at the logs: `mcpm log tail -s <server-name>`
3. Try running the server command directly to see what explodes

### Tools Not Appearing
The tool filter might be too restrictive. Use `mcpm edit <server>` to adjust.

## Philosophy (Or: Why We Built This)

In the words of the great philosopher Ly Tin Wheedle, "Complexity is just simplicity waiting to be discovered." MCPM takes the complexity of managing multiple MCP servers and makes it as simple as a conversation with Death (straightforward, no nonsense, gets the job done).

## Contributing (Join the Guild)

Found a bug? Want to add a feature? The guild doors are open. Just remember:

1. All pull requests must pass the tests (like graduating from the Assassins' Guild, but less stabby)
2. Keep the code clean (dirty code attracts bugs, and not the kind that make good listening devices)
3. Document your changes (future you will thank present you)

## License

MIT - which means you can do almost anything with it, except claim you wrote it when you didn't. That would be like claiming you invented the sandwich. Someone always did it first.

---

*"Real stupidity beats artificial intelligence every time." - Terry Pratchett*

But with MCPM, at least your MCP servers will be managed intelligently.