# MCP Server Database Corrections Summary

After reviewing the official GitHub repositories for each MCP server, here are the findings on which servers need correction:

## ✅ Correct Servers (No Changes Needed)

### NPX-based Servers
1. **Everything** - `@modelcontextprotocol/server-everything` - ✓ Correct
2. **Filesystem** - `@modelcontextprotocol/server-filesystem` - ✓ Correct  
3. **Memory** - `@modelcontextprotocol/server-memory` - ✓ Correct
4. **Sequential Thinking** - `@modelcontextprotocol/server-sequential-thinking` - ✓ Correct
5. **Context7** - `@upstash/context7-mcp` - ✓ Correct (needs `-y` flag)
6. **Playwright** - `@playwright/mcp@latest` - ✓ Correct

### Docker-based Servers
1. **GitHub** - `ghcr.io/github/github-mcp-server` - ✓ Correct

## ❌ Servers Needing Correction

### 1. **Fetch** 
- **Current**: `npx @modelcontextprotocol/server-fetch` ❌
- **Correct**: `uvx mcp-server-fetch` (Python-based, uses uvx)
- **Alternative**: `python -m mcp_server_fetch` (if installed via pip)
- **Package**: Should be `mcp-server-fetch` not `@modelcontextprotocol/server-fetch`

### 2. **Time**
- **Current**: `npx @modelcontextprotocol/server-time` ❌
- **Correct**: `uvx mcp-server-time` (Python-based, uses uvx)
- **Alternative**: `python -m mcp_server_time` (if installed via pip)
- **Package**: Should be `mcp-server-time` not `@modelcontextprotocol/server-time`

### 3. **Git**
- **Current Package**: `mcp-server-git` ✓
- **Current Command**: `uvx mcp-server-git` ✓
- Status: Already correct in database

### 4. **Supabase**
- **Current**: `npx @supabase/mcp-server-supabase@latest` ✓
- **Missing Required Args**: Should include `--project-ref` as required argument
- **Additional Notes**: Supports `--read-only` flag (recommended)

## Additional Observations

### Command Structure Patterns:
1. **NPX servers** (JavaScript/TypeScript): Use format `npx -y @scope/package`
2. **UVX servers** (Python): Use format `uvx package-name`
3. **Docker servers**: Use format `docker run -i --rm image:tag`

### Key Findings:
- Fetch and Time servers are Python-based and should use `uvx` not `npx`
- All NPX commands should include the `-y` flag to skip prompts
- Supabase requires `--project-ref` argument to function properly
- Some servers have optional flags that affect functionality (e.g., `--read-only` for Supabase)

## Recommended Actions:
1. ✅ Updated Fetch server to use `uvx mcp-server-fetch`
2. ✅ Updated Time server to use `uvx mcp-server-time`
3. ✅ Added `-y` flag to all NPX commands for non-interactive installation
4. ✅ Fixed package names for Fetch and Time servers
5. TODO: Consider adding a `commandType` field to distinguish between npx/uvx/docker/pip servers

## Changes Applied:
- Fixed Fetch server: package `mcp-server-fetch`, command `uvx mcp-server-fetch`
- Fixed Time server: package `mcp-server-time`, command `uvx mcp-server-time`
- Added `-y` flag to all NPX commands to prevent interactive prompts
- Supabase server: kept `--project-ref` as an optional parameter, not in the base command