# Windsurf Supabase MCP Server

> A Windsurf-optimized MCP server for Supabase integration

This repository contains a Windsurf-optimized version of the Supabase MCP server, specifically enhanced to work seamlessly with the Windsurf Editor. It builds upon the [Model Context Protocol](https://modelcontextprotocol.io/introduction) (MCP) standard, adding crucial improvements for better error handling, response formatting, and SQL query processing.

## Key Modifications for Windsurf

### 1. Enhanced Error Handling
We faced several challenges with the original error handling system:
- Malformed SQL queries would cause silent failures
- Stream parsing errors were difficult to debug
- Error messages weren't LLM-friendly

Our solutions:
- Added structured error responses with detailed context
- Improved error messages for better LLM understanding
- Added validation for SQL query structure
- Enhanced stream error detection and recovery

### 2. Response Formatting
The original response format had limitations:
- Inconsistent JSON structure across different response types
- Missing metadata for UI components
- Limited type safety

Our improvements:
- Standardized JSON response format
- Added metadata for UI component generation
- Implemented strict TypeScript types
- Added support for streaming complex data structures

### 3. SQL to REST Conversion
We enhanced the SQL to REST conversion:
- Added support for more complex SQL operations
- Improved query validation
- Better handling of JOINs and subqueries
- Enhanced error messages for invalid SQL

### 4. Authentication & Headers
Key improvements in authentication handling:
- Flexible API key management
- Support for bearer token authentication
- Better header management for PostgREST requests
- Enhanced security validation

## Integration with Windsurf

This MCP server is specifically designed to work with the Windsurf Editor, providing:
- Seamless database interactions through natural language
- Real-time query validation and correction
- Enhanced error messages for better debugging
- Optimized response formatting for UI components

### Example Usage in Windsurf

```typescript
// Example of enhanced response handling
const response = await postgrestRequest({
  method: 'GET',
  path: '/todos?is_completed=eq.false',
});

// Response includes metadata for UI components
const { data, metadata } = response;
```

## Installation

1. Clone this repository:
```bash
git clone https://github.com/hertzfelt/windsurf-supabase-mcp.git
```

2. Install dependencies:
```bash
npm install
```

3. Configure your Supabase connection:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## Usage with Windsurf

This server provides two main tools:

1. `postgrestRequest`: Enhanced PostgREST API access
```typescript
const result = await postgrestRequest({
  method: 'GET',
  path: '/users',
});
```

2. `sqlToRest`: Improved SQL to REST conversion
```typescript
const query = 'SELECT * FROM users WHERE age > 18';
const { method, path } = await sqlToRest({ sql: query });
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
