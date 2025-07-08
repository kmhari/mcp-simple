> [!NOTE]  
> Brought to you by [Bytebase](https://www.bytebase.com/), open-source database DevSecOps platform.

<p align="center">
<a href="https://dbhub.ai/" target="_blank">
<picture>
  <img src="https://raw.githubusercontent.com/bytebase/dbhub/main/resources/images/logo-full.webp" width="50%">
</picture>
</a>
</p>

<p align="center">
  <a href="https://cursor.com/install-mcp?name=dbhub&config=eyJjb21tYW5kIjoibnB4IEBieXRlYmFzZS9kYmh1YiIsImVudiI6eyJUUkFOU1BPUlQiOiJzdGRpbyIsIkRTTiI6InBvc3RncmVzOi8vdXNlcjpwYXNzd29yZEBsb2NhbGhvc3Q6NTQzMi9kYm5hbWU%2Fc3NsbW9kZT1kaXNhYmxlIiwiUkVBRE9OTFkiOiJ0cnVlIn19"><img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add dbhub MCP server to Cursor" height="32" /></a>
  <a href="https://discord.gg/BjEkZpsJzn"><img src="https://img.shields.io/badge/%20-Hang%20out%20on%20Discord-5865F2?style=for-the-badge&logo=discord&labelColor=EEEEEE" alt="Join our Discord" height="32" /></a>
</p>

DBHub is a universal database gateway implementing the Model Context Protocol (MCP) server interface. This gateway allows MCP-compatible clients to connect to and explore different databases.

```bash
 +------------------+    +--------------+    +------------------+
 |                  |    |              |    |                  |
 |                  |    |              |    |                  |
 |  Claude Desktop  +--->+              +--->+    PostgreSQL    |
 |                  |    |              |    |                  |
 |  Claude Code     +--->+              +--->+    SQL Server    |
 |                  |    |              |    |                  |
 |  Cursor          +--->+    DBHub     +--->+    SQLite        |
 |                  |    |              |    |                  |
 |  Other Clients   +--->+              +--->+    MySQL         |
 |                  |    |              |    |                  |
 |                  |    |              +--->+    MariaDB       |
 |                  |    |              |    |                  |
 |                  |    |              |    |                  |
 +------------------+    +--------------+    +------------------+
      MCP Clients           MCP Server             Databases
```

## Demo HTTP Endpoint

https://demo.dbhub.ai/message connects a [sample employee database](https://github.com/bytebase/employee-sample-database). You can point Cursor or MCP Inspector to it to see it in action.

![mcp-inspector](https://raw.githubusercontent.com/bytebase/dbhub/main/resources/images/mcp-inspector.webp)

## Supported Matrix

### Database Resources

| Resource Name               | URI Format                                             | PostgreSQL | MySQL | MariaDB | SQL Server | SQLite |
| --------------------------- | ------------------------------------------------------ | :--------: | :---: | :-----: | :--------: | :----: |
| schemas                     | `db://schemas`                                         |     ✅     |  ✅   |   ✅    |     ✅     |   ✅   |
| tables_in_schema            | `db://schemas/{schemaName}/tables`                     |     ✅     |  ✅   |   ✅    |     ✅     |   ✅   |
| table_structure_in_schema   | `db://schemas/{schemaName}/tables/{tableName}`         |     ✅     |  ✅   |   ✅    |     ✅     |   ✅   |
| indexes_in_table            | `db://schemas/{schemaName}/tables/{tableName}/indexes` |     ✅     |  ✅   |   ✅    |     ✅     |   ✅   |
| procedures_in_schema        | `db://schemas/{schemaName}/procedures`                 |     ✅     |  ✅   |   ✅    |     ✅     |   ❌   |
| procedure_details_in_schema | `db://schemas/{schemaName}/procedures/{procedureName}` |     ✅     |  ✅   |   ✅    |     ✅     |   ❌   |

### Database Tools

| Tool        | Command Name  | Description                                                         | PostgreSQL | MySQL | MariaDB | SQL Server | SQLite |
| ----------- | ------------- | ------------------------------------------------------------------- | :--------: | :---: | :-----: | :--------: | ------ |
| Execute SQL | `execute_sql` | Execute single or multiple SQL statements (separated by semicolons) |     ✅     |  ✅   |   ✅    |     ✅     | ✅     |

### Prompt Capabilities

| Prompt              | Command Name   | PostgreSQL | MySQL | MariaDB | SQL Server | SQLite |
| ------------------- | -------------- | :--------: | :---: | :-----: | :--------: | ------ |
| Generate SQL        | `generate_sql` |     ✅     |  ✅   |   ✅    |     ✅     | ✅     |
| Explain DB Elements | `explain_db`   |     ✅     |  ✅   |   ✅    |     ✅     | ✅     |

## Installation

### Docker

```bash
# PostgreSQL example
docker run --rm --init \
   --name dbhub \
   --publish 8080:8080 \
   bytebase/dbhub \
   --transport http \
   --port 8080 \
   --dsn "postgres://user:password@localhost:5432/dbname?sslmode=disable"
```

```bash
# Demo mode with sqlite sample employee database
docker run --rm --init \
   --name dbhub \
   --publish 8080:8080 \
   bytebase/dbhub \
   --transport http \
   --port 8080 \
   --demo
```


### NPM

```bash
# PostgreSQL example
npx @bytebase/dbhub --transport http --port 8080 --dsn "postgres://user:password@localhost:5432/dbname?sslmode=disable"

# Demo mode with sqlite sample employee database
npx @bytebase/dbhub --transport http --port 8080 --demo
```

```bash
# Demo mode with sample employee database
npx @bytebase/dbhub --transport http --port 8080 --demo
```

> Note: The demo mode includes a bundled SQLite sample "employee" database with tables for employees, departments, salaries, and more.

### Claude Desktop

![claude-desktop](https://raw.githubusercontent.com/bytebase/dbhub/main/resources/images/claude-desktop.webp)

- Claude Desktop only supports `stdio` transport https://github.com/orgs/modelcontextprotocol/discussions/16

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "dbhub-postgres-docker": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "bytebase/dbhub",
        "--transport",
        "stdio",
        "--dsn",
        // Use host.docker.internal as the host if connecting to the local db
        "postgres://user:password@host.docker.internal:5432/dbname?sslmode=disable"
      ]
    },
    "dbhub-postgres-npx": {
      "command": "npx",
      "args": [
        "-y",
        "@bytebase/dbhub",
        "--transport",
        "stdio",
        "--dsn",
        "postgres://user:password@localhost:5432/dbname?sslmode=disable"
      ]
    },
    "dbhub-demo": {
      "command": "npx",
      "args": ["-y", "@bytebase/dbhub", "--transport", "stdio", "--demo"]
    }
  }
}
```

### Claude Code

Check https://docs.anthropic.com/en/docs/claude-code/mcp

### Cursor

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=dbhub&config=eyJjb21tYW5kIjoibnB4IEBieXRlYmFzZS9kYmh1YiIsImVudiI6eyJUUkFOU1BPUlQiOiJzdGRpbyIsIkRTTiI6InBvc3RncmVzOi8vdXNlcjpwYXNzd29yZEBsb2NhbGhvc3Q6NTQzMi9kYm5hbWU%2Fc3NsbW9kZT1kaXNhYmxlIiwiUkVBRE9OTFkiOiJ0cnVlIn19)

![cursor](https://raw.githubusercontent.com/bytebase/dbhub/main/resources/images/cursor.webp)

- Cursor supports both `stdio` and `http`.
- Follow [Cursor MCP guide](https://docs.cursor.com/context/model-context-protocol) and make sure to use [Agent](https://docs.cursor.com/chat/agent) mode.

## Usage

### SSL Connections

You can specify the SSL mode using the `sslmode` parameter in your DSN string:

| Database   | `sslmode=disable` | `sslmode=require` |      Default SSL Behavior      |
| ---------- | :---------------: | :---------------: | :----------------------------: |
| PostgreSQL |        ✅         |        ✅         |    Certificate verification    |
| MySQL      |        ✅         |        ✅         |    Certificate verification    |
| MariaDB    |        ✅         |        ✅         |    Certificate verification    |
| SQL Server |        ✅         |        ✅         |    Certificate verification    |
| SQLite     |        ❌         |        ❌         |        N/A (file-based)        |

**SSL Mode Options:**

- `sslmode=disable`: All SSL/TLS encryption is turned off. Data is transmitted in plaintext.
- `sslmode=require`: Connection is encrypted, but the server's certificate is not verified. This provides protection against packet sniffing but not against man-in-the-middle attacks. You may use this for trusted self-signed CA.

Without specifying `sslmode`, most databases default to certificate verification, which provides the highest level of security.

Example usage:

```bash
# Disable SSL
postgres://user:password@localhost:5432/dbname?sslmode=disable

# Require SSL without certificate verification
postgres://user:password@localhost:5432/dbname?sslmode=require

# Standard SSL with certificate verification (default)
postgres://user:password@localhost:5432/dbname
```

### Read-only Mode

You can run DBHub in read-only mode, which restricts SQL query execution to read-only operations:

```bash
# Enable read-only mode
npx @bytebase/dbhub --readonly --dsn "postgres://user:password@localhost:5432/dbname"
```

In read-only mode, only [readonly SQL operations](https://github.com/bytebase/dbhub/blob/main/src/utils/allowed-keywords.ts) are allowed.

This provides an additional layer of security when connecting to production databases.

### Configure your database connection

You can use DBHub in demo mode with a sample employee database for testing:

```bash
npx @bytebase/dbhub  --demo
```

> [!WARNING]
> If your user/password contains special characters, you need to escape them first. (e.g. `pass#word` should be escaped as `pass%23word`)

For real databases, a Database Source Name (DSN) is required. You can provide this in several ways:

- **Command line argument** (highest priority):

  ```bash
  npx @bytebase/dbhub  --dsn "postgres://user:password@localhost:5432/dbname?sslmode=disable"
  ```

- **Environment variable** (second priority):

  ```bash
  export DSN="postgres://user:password@localhost:5432/dbname?sslmode=disable"
  npx @bytebase/dbhub
  ```

- **Environment file** (third priority):
  - For development: Create `.env.local` with your DSN
  - For production: Create `.env` with your DSN
  ```
  DSN=postgres://user:password@localhost:5432/dbname?sslmode=disable
  ```

> [!WARNING]
> When running in Docker, use `host.docker.internal` instead of `localhost` to connect to databases running on your host machine. For example: `mysql://user:password@host.docker.internal:3306/dbname`

DBHub supports the following database connection string formats:

| Database   | DSN Format                                                | Example                                                                                                        |
| ---------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| MySQL      | `mysql://[user]:[password]@[host]:[port]/[database]`      | `mysql://user:password@localhost:3306/dbname?sslmode=disable`                                                  |
| MariaDB    | `mariadb://[user]:[password]@[host]:[port]/[database]`    | `mariadb://user:password@localhost:3306/dbname?sslmode=disable`                                                |
| PostgreSQL | `postgres://[user]:[password]@[host]:[port]/[database]`   | `postgres://user:password@localhost:5432/dbname?sslmode=disable`                                               |
| SQL Server | `sqlserver://[user]:[password]@[host]:[port]/[database]`  | `sqlserver://user:password@localhost:1433/dbname?sslmode=disable`                                              |
| SQLite     | `sqlite:///[path/to/file]` or `sqlite:///:memory:`        | `sqlite:///path/to/database.db`, `sqlite:C:/Users/YourName/data/database.db (windows)` or `sqlite:///:memory:` |


#### SQL Server

Extra query parameters:

#### authentication

- `authentication=azure-active-directory-access-token`. Only applicable when running from Azure. See [DefaultAzureCredential](https://learn.microsoft.com/en-us/azure/developer/javascript/sdk/authentication/credential-chains#use-defaultazurecredential-for-flexibility).

### Transport

- **stdio** (default) - for direct integration with tools like Claude Desktop:

  ```bash
  npx @bytebase/dbhub --transport stdio --dsn "postgres://user:password@localhost:5432/dbname?sslmode=disable"
  ```

- **http** - for browser and network clients:
  ```bash
  npx @bytebase/dbhub --transport http --port 5678 --dsn "postgres://user:password@localhost:5432/dbname?sslmode=disable"
  ```

### Command line options

| Option    | Environment Variable | Description                                                      | Default                      |
| --------- | -------------------- | ---------------------------------------------------------------- | ---------------------------- |
| dsn       | `DSN`                | Database connection string                                       | Required if not in demo mode |
| transport | `TRANSPORT`          | Transport mode: `stdio` or `http`                                | `stdio`                      |
| port      | `PORT`               | HTTP server port (only applicable when using `--transport=http`) | `8080`                       |
| readonly  | `READONLY`           | Restrict SQL execution to read-only operations                   | `false`                      |
| demo      | N/A                  | Run in demo mode with sample employee database                   | `false`                      |

The demo mode uses an in-memory SQLite database loaded with the [sample employee database](https://github.com/bytebase/dbhub/tree/main/resources/employee-sqlite) that includes tables for employees, departments, titles, salaries, department employees, and department managers. The sample database includes SQL scripts for table creation, data loading, and testing.

## Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

1. Run in development mode:

   ```bash
   pnpm dev
   ```

1. Build for production:
   ```bash
   pnpm build
   pnpm start --transport stdio --dsn "postgres://user:password@localhost:5432/dbname?sslmode=disable"
   ```

### Testing

The project uses Vitest for comprehensive unit and integration testing:

- **Run all tests**: `pnpm test`
- **Run tests in watch mode**: `pnpm test:watch`
- **Run integration tests**: `pnpm test:integration`

#### Integration Tests

DBHub includes comprehensive integration tests for all supported database connectors using [Testcontainers](https://testcontainers.com/). These tests run against real database instances in Docker containers, ensuring full compatibility and feature coverage.

##### Prerequisites

- **Docker**: Ensure Docker is installed and running on your machine
- **Docker Resources**: Allocate sufficient memory (recommended: 4GB+) for multiple database containers
- **Network Access**: Ability to pull Docker images from registries

##### Running Integration Tests

**Note**: This command runs all integration tests in parallel, which may take 5-15 minutes depending on your system resources and network speed.

```bash
# Run all database integration tests
pnpm test:integration
```

```bash
# Run only PostgreSQL integration tests
pnpm test src/connectors/__tests__/postgres.integration.test.ts
# Run only MySQL integration tests
pnpm test src/connectors/__tests__/mysql.integration.test.ts
# Run only MariaDB integration tests
pnpm test src/connectors/__tests__/mariadb.integration.test.ts
# Run only SQL Server integration tests
pnpm test src/connectors/__tests__/sqlserver.integration.test.ts
# Run only SQLite integration tests
pnpm test src/connectors/__tests__/sqlite.integration.test.ts
# Run JSON RPC integration tests
pnpm test src/__tests__/json-rpc-integration.test.ts
```

All integration tests follow these patterns:

1. **Container Lifecycle**: Start database container → Connect → Setup test data → Run tests → Cleanup
2. **Shared Test Utilities**: Common test patterns implemented in `IntegrationTestBase` class
3. **Database-Specific Features**: Each database includes tests for unique features and capabilities
4. **Error Handling**: Comprehensive testing of connection errors, invalid SQL, and edge cases

##### Troubleshooting Integration Tests

**Container Startup Issues:**

```bash
# Check Docker is running
docker ps

# Check available memory
docker system df

# Pull images manually if needed
docker pull postgres:15-alpine
docker pull mysql:8.0
docker pull mariadb:10.11
docker pull mcr.microsoft.com/mssql/server:2019-latest
```

**SQL Server Timeout Issues:**

- SQL Server containers require significant startup time (3-5 minutes)
- Ensure Docker has sufficient memory allocated (4GB+ recommended)
- Consider running SQL Server tests separately if experiencing timeouts


**Network/Resource Issues:**

```bash
# Run tests with verbose output
pnpm test:integration --reporter=verbose

# Run single database test to isolate issues
pnpm test:integration -- --testNamePattern="PostgreSQL"

# Check Docker container logs if tests fail
docker logs <container_id>
```

#### Pre-commit Hooks (for Developers)

The project includes pre-commit hooks to run tests automatically before each commit:

1. After cloning the repository, set up the pre-commit hooks:

   ```bash
   ./scripts/setup-husky.sh
   ```

2. This ensures the test suite runs automatically whenever you create a commit, preventing commits that would break tests.

### Debug with [MCP Inspector](https://github.com/modelcontextprotocol/inspector)

#### stdio

```bash
# PostgreSQL example
TRANSPORT=stdio DSN="postgres://user:password@localhost:5432/dbname?sslmode=disable" npx @modelcontextprotocol/inspector node /path/to/dbhub/dist/index.js
```

#### HTTP

```bash
# Start DBHub with HTTP transport
pnpm dev --transport=http --port=8080

# Start the MCP Inspector in another terminal
npx @modelcontextprotocol/inspector
```

Connect to the DBHub server `/message` endpoint

## Contributors

<a href="https://github.com/bytebase/dbhub/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bytebase/dbhub" />
</a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=bytebase/dbhub&type=Date)](https://www.star-history.com/#bytebase/dbhub&Date)
