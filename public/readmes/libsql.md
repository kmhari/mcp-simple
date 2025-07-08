# LibSQL Model Context Protocol Server

The LibSQL Model Context Protocol Server is a server application designed to
interface with LibSQL databases, providing schema information and enabling table
queries. Built using Deno 2.1, this server leverages the Model Context Protocol
(MCP) to handle various requests such as listing resources, reading resource
schemas, completing prompts, and executing SQL queries. It supports both
authenticated and unauthenticated access to LibSQL databases, ensuring
flexibility and security. This project is ideal for developers looking to
integrate LibSQL database functionalities into their applications seamlessly.

## Requirements

- Deno 2.1+
- A LibSQL database URL

## Usage

Install [deno](https://docs.deno.com/runtime) (macos/linux):

```bash
curl -fsSL https://deno.land/install.sh | sh
```

Build the binary:

```bash
deno run build
```

Run the server:

```bash
# If accessing a local libsql db that does not require auth
./mcp-server-libsql <database-url>

# With Auth
./mcp-server-libsql --auth-token <token> <database-url>
```

## License

This project is licensed under the MIT License - see the
[LICENSE.txt](LICENSE.txt) file for details.
