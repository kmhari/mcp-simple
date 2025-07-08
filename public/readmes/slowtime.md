# Slowtime MCP Server

A Model Context Protocol server for secure time-based operations with timing attack protection and timelock encryption.

```
                                     ┌──────────────┐
                                     │   Claude     │
                                     │   Desktop    │
                                     └──────┬───────┘
                                            │
                                            ▼
┌──────────────┐                    ┌──────────────┐
│   Timelock   │◄──────────────────►│   Slowtime   │
│  Encryption  │                    │     MCP      │
└──────────────┘                    │    Server    │
                                    └──────┬───────┘
                                           │
                                           ▼
┌──────────────┐                   ┌──────────────┐
│    Timing    │◄─────────────────►│  Interval    │
│ Protection   │                   │   Manager    │
└──────────────┘                   └──────────────┘

```

## Features

### Time Fuzzing & Security
```
Input Time ──┐
            ┌▼─────────────┐
            │ Random Fuzz  │     ┌─────────────┐
            │ (100-5000ms) ├────►│ Jittered    │
            └─────────────┘     │ Timestamp    │
                               └─────────────┘
```

### Timelock Encryption Flow
```
Data ───────┐
           ┌▼────────────┐    ┌────────────┐    ┌────────────┐
           │  Encrypt    │    │  Interval  │    │ League of  │
           │   with     ├───►│ Duration   ├───►│  Entropy   │
           │ Timelock   │    │ Remaining  │    │  Network   │
           └────────────┘    └────────────┘    └────────────┘
```

### Interval Management
```
[Start]──►[Active]──┐
               ▲    │
               │    ▼
            [Resume] [Pause]
                    │    ▲
                    ▼    │
                 [Paused]
```

## Installation

Add to your Claude Desktop config at `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "slowtime": {
      "command": "node",
      "args": ["/path/to/slowtime-mcp-server/build/index.js"]
    }
  }
}
```

## Usage

### Basic Interval Commands
```
start_interval "Focus Time" 25  ───► [25min Interval Created]
                                          │
check_interval <id>  ◄───────────────────┘
                                          │
pause_interval <id>  ◄───────────────────┘
                                          │
resume_interval <id> ◄───────────────────┘
```

### Timelock Encryption
```
1. Start Interval:
   "Focus Time" (25min) ──► [Interval ID: abc123]

2. Encrypt Data:
   "secret" + abc123 ──► [Timelock ID: xyz789]

3. Attempt Decrypt:
   - Before interval ends: "Not yet decryptable"
   - After interval ends: "secret"
```

## Security Features

### Timing Attack Prevention
```
Operation ──┬──► Random Delay (100-5000ms)
            │
            ├──► Jittered Timestamps
            │
            └──► Constant-time Comparisons
```

### Timelock Security & Storage
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Encrypt   │    │ Distributed │    │  Timelock   │    │  DuckDB     │
│    Data    ├───►│  Randomness ├───►│  Protected  ├───►│  TimeVault  │
│            │    │  Network    │    │    Data     │    │  Storage    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                           │                     ▲
                                           │      ┌──────────────┘
                                           ▼      │
                                    ┌─────────────┴─┐
                                    │   Analytics   │
                                    │ & Statistics  │
                                    └───────────────┘
```

### TimeVault Analytics
```
Query History ──┐
               ├──► ┌─────────────┐
Filter Options ┘    │   DuckDB    │    ┌─────────────┐
                    │   WASM      ├───►│  Analytics  │
Vault Stats ───────►│   Engine    │    │   Results   │
                    └─────────────┘    └─────────────┘
```

## Architecture

The server consists of four main components:

1. **TimeFuzz**: Provides timing attack protection through:
   - Random duration fuzzing
   - Constant-time comparisons
   - Jittered timestamps
   - Random operation delays

2. **TimeKeeper**: Manages intervals with:
   - Creation/pause/resume operations
   - Progress tracking
   - Automatic cleanup
   - Fuzzing integration

3. **TimeLock**: Handles encryption with:
   - drand network integration
   - Interval-based decryption
   - Automatic cleanup
   - Secure random number generation

4. **TimeVault**: Provides persistent storage and analytics:
   - DuckDB WASM-based storage
   - Historical tracking of encrypted data
   - Analytics and statistics
   - Query capabilities with filtering

## TimeVault Commands

Query historical data and statistics about encrypted timevaults:

```
# List vault history with filtering
list_vault_history --interval_id=abc123 --decrypted_only=true --limit=10

# Get vault statistics
get_vault_stats

Example output:
Total vaults: 150
Decrypted vaults: 75
Average decryption time: 45 seconds
```

## Storage Schema

The TimeVault uses DuckDB WASM for persistent storage with the following schema:

```sql
CREATE TABLE timevaults (
  id VARCHAR PRIMARY KEY,
  encrypted_data TEXT NOT NULL,
  round_number BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  decrypted_at TIMESTAMP,
  interval_id VARCHAR NOT NULL,
  metadata JSON
);

-- Indexes for efficient querying
CREATE INDEX idx_interval_id ON timevaults(interval_id);
CREATE INDEX idx_created_at ON timevaults(created_at);
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
