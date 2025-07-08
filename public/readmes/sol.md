# Model Context Protocol Server for Solana Client

[![smithery badge](https://smithery.ai/badge/@tywenk/mcp-solana)](https://smithery.ai/server/@tywenk/mcp-solana)

### Installing via Smithery

To install mcp-solana for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@tywenk/mcp-solana):

```bash
npx -y @smithery/cli install @tywenk/mcp-solana --client claude
```

Installation of server:

```sh
git clone git@github.com:tywenk/mcp-sol.git
cd mcp-sol
uv sync
mcp install src/server.py
```

Ensure the Claude desktop JSON config at `/Users/{user}/Library/Application Support/Claude` (on a Mac) looks something like this. Note that the `uv` binary and paths are all absolute.

```json
{
  "globalShortcut": "Alt+Space",
  "mcpServers": {
    "Solana Client": {
      "command": "/Users/tywen/.local/bin/uv",
      "args": [
        "--directory",
        "/Users/tywen/Developer/mcp-sol",
        "run",
        "--with",
        "mcp",
        "mcp",
        "run",
        "/Users/tywen/Developer/mcp-sol/src/server.py"
      ]
    }
  }
}
```

List of tools:

```
get_balance
get_transaction
get_block
get_block_height
get_block_time
get_blocks
get_cluster_nodes
get_epoch_info
get_epoch_schedule
get_genesis_hash
get_identity
get_inflation_governor
get_inflation_rate
get_largest_accounts
get_latest_blockhash
get_minimum_balance_for_rent_exemption
get_program_accounts
get_recent_performance_samples
get_signature_statuses
get_slot
get_slot_leader
get_supply
get_token_account_balance
get_token_largest_accounts
get_transaction_count
get_version
get_vote_accounts
is_connected
get_block_commitment
confirm_transaction
get_account_info
get_fee_for_message
get_first_available_block
get_inflation_reward
get_leader_schedule
get_minimum_ledger_slot
get_multiple_accounts
get_signatures_for_address
get_token_accounts_by_delegate
get_token_accounts_by_owner
get_token_supply
request_airdrop
send_transaction
validator_exit
```
