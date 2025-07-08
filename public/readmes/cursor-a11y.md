# Cursor A11y MCP

A Model Context Protocol (MCP) server that provides accessibility testing capabilities AI agents. This tool helps identify accessibility issues in web applications using axe-core and Puppeteer.

<a href="https://glama.ai/mcp/servers/mik2l7a1tw">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/mik2l7a1tw/badge" alt="Cursor A11y MCP server" />
</a>

## Features

- Run accessibility tests on any URL or local development server
- Powered by axe-core for comprehensive accessibility testing
- Provides detailed violation reports including:
  - Impact level
  - Description of the issue
  - Help text and documentation links
  - Affected HTML elements
  - Failure summaries

## Project Structure

- `src/` - Source code for the MCP server and accessibility testing tool
- `test-site/` - A React application with intentional accessibility issues for testing
- `build/` - Compiled version of the source code

## Installation

```bash
npm install
```

Then install the test site dependencies:

```bash
cd test-site
npm install
cd ..
```

## Usage

### Starting the MCP Server

```bash
npm run build
npm start
```

### Running the Test Site

```bash
npm run start:test-site
```

The test site will be available at `http://localhost:5000`.

### Running Accessibility Tests

The tool accepts two types of inputs:

1. A full URL to test
2. A relative path that will be appended to `http://localhost:5000`

## Dependencies

- `@modelcontextprotocol/sdk`: ^1.4.1
- `puppeteer`: ^24.1.1
- `zod`: ^3.24.1

### Test Site Dependencies

- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-scripts`: 5.0.1

## Development

1. Make changes to the source code in the `src/` directory
2. Run `npm run build` to compile the changes
3. Start the server with `npm start`

## Configuring in Cursor

To add this accessibility testing tool to Cursor's MCP Server settings:

1. Open Cursor's Settings (⌘ + ,)
2. Navigate to "Features" > "MCP Servers"
3. Add a new MCP Server with the following configuration:
   - Name: `a11y`
   - Select `command` from the dropdown
   - Command: `node path/to/cursor-a11y-mcp/index/file/in/build/folder`
     (Replace `path/to/cursor-a11y-mcp/index/file/in/build/folder` with the absolute path to your index.js file in the build folder.)
4. Click `Add`
5. The accessibility testing tool will now be available in Cursor's Composer

## Usage in Composer

To use the accessibility testing tool in Cursor's Composer:

1. Run in your terminal:

```bash
npm run start:test-site
```

This will start the test site at `http://localhost:5000`

2. In Cursor's Composer, type `use a11y tool`
3. Composer will prompt you to run the tool
4. After running the tool, you will see the accessibility violations in the response, and code actions to fix the violations
5. The Composer may prompt you to use the tool again to confirm that the violations are fixed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Version

Current version: 2.0.1