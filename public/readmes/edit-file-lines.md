# Edit File Lines MCP Server

A TypeScript-based MCP server that provides tools for making precise line-based edits to text files within allowed directories.

## Features

### Main Editing Tool

#### `edit_file_lines`
Make line-based edits to a file using string or regex pattern matching. Each edit can:
- Replace entire lines
- Replace specific text matches while preserving line formatting
- Use regex patterns for complex matches
- Handle multiple lines and multiple edits
- Preview changes with dry run mode

Example file (`src/components/App.tsx`):
```typescript
// Basic component with props
const Button = ({ color = "blue", size = "md" }) => {
  return <button className={`btn-${color} size-${size}`}>Click me</button>;
};

// Component with multiple props and nested structure
export const Card = ({
  title,
  subtitle = "Default subtitle",
  theme = "light",
  size = "lg",
}) => {
  const cardClass = `card-${theme} size-${size}`;
  
  return (
    <div className={cardClass}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

// Constants and configurations
const THEME = {
  light: { bg: "#ffffff", text: "#000000" },
  dark: { bg: "#000000", text: "#ffffff" },
};

const CONFIG = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
};
```

### Example Use Cases

1. Simple String Replacement
```json
{
  "p": "src/components/App.tsx",
  "e": [{
    "startLine": 2,
    "endLine": 2,
    "content": "primary",
    "strMatch": "blue"
  }],
  "dryRun": true
}
```

Output:
```diff
Index: src/components/App.tsx
===================================================================
--- src/components/App.tsx        original
+++ src/components/App.tsx        modified
@@ -1,6 +1,6 @@
 // Basic component with props
-const Button = ({ color = "blue", size = "md" }) => {
+const Button = ({ color = "primary", size = "md" }) => {
   return Click me;
 };
 
 // Component with multiple props and nested structure
 ```

State ID: fcbf740a
Use this ID with approve_edit to apply the changes.


2. Multi-line Content with Preserved Structure  
```json
{
  "p": "src/components/App.tsx",
  "e": [{
    "startLine": 16,
    "endLine": 19,
    "content": "    <div className={cardClass}>\n      <h2 className=\"title\">{title}</h2>\n      <p className=\"subtitle\">{subtitle}</p>\n    </div>",
    "regexMatch": "<div[^>]*>[\\s\\S]*?</div>"
  }],
  "dryRun": true
}
```

Output:
```diff
Index: src/components/App.tsx
===================================================================
--- src/components/App.tsx        original
+++ src/components/App.tsx        modified
@@ -13,10 +13,10 @@
   const cardClass = `card-${theme} size-${size}`;
   
   return (
     <div className={cardClass}>
-      <h2>{title}</h2>
-      <p>{subtitle}</p>
+      <h2 className="title">{title}</h2>
+      <p className="subtitle">{subtitle}</p>
     </div>
   );
 };
```
State ID: f2ce973f
Use this ID with approve_edit to apply the changes.


3. Complex JSX Structure Modification
```json
{
  "p": "src/components/App.tsx",
  "e": [{
    "startLine": 7,
    "endLine": 12,
    "content": "export const Card = ({\n  title,\n  subtitle = \"New default\",\n  theme = \"modern\",\n  size = \"responsive\"\n}) => {",
    "regexMatch": "export const Card[\\s\\S]*?\\) => \\{"
  }],
  "dryRun": true
}
```

Output:
```diff
Index: src/components/App.tsx
===================================================================
--- src/components/App.tsx        original
+++ src/components/App.tsx        modified
@@ -5,11 +5,11 @@
 // Component with multiple props and nested structure
 export const Card = ({
   title,
-  subtitle = "Default subtitle",
-  theme = "light",
-  size = "lg",
+  subtitle = "New default",
+  theme = "modern",
+  size = "responsive"
 }) => {
   const cardClass = `card-${theme} size-${size}`;
   
   return (
```   
State ID: f1f1d27b
Use this ID with approve_edit to apply the changes.


4. Configuration Update with Whitespace Preservation
```json
{
  "p": "src/components/App.tsx",
  "e": [{
    "startLine": 29,
    "endLine": 32,
    "content": "const CONFIG = {\n  baseUrl: \"https://api.newexample.com\",\n  timeout: 10000,\n  maxRetries: 5",
    "regexMatch": "const CONFIG[\\s\\S]*?retries: \\d+"
  }],
  "dryRun": true
}
```

Output:
```diff
Index: src/components/App.tsx
===================================================================
--- src/components/App.tsx        original
+++ src/components/App.tsx        modified
@@ -26,8 +26,8 @@
   dark: { bg: "#000000", text: "#ffffff" },
 };
 
 const CONFIG = {
-  apiUrl: "https://api.example.com",
-  timeout: 5000,
-  retries: 3,
+  baseUrl: "https://api.newexample.com",
+  timeout: 10000,
+  maxRetries: 5
 };
```
State ID: 20e93c34
Use this ID with approve_edit to apply the changes.

5. Flexible Whitespace Matching
```json
{
  "p": "src/components/App.tsx",
  "e": [{
    "startLine": 9,
    "endLine": 9,
    "content": "description",
    "strMatch": "subtitle   =   \"Default subtitle\""  // Extra spaces are handled
  }],
  "dryRun": true
}
```

Output:
```diff
Index: src/components/App.tsx
===================================================================
--- src/components/App.tsx        original
+++ src/components/App.tsx        modified
@@ -5,9 +5,9 @@
 // Component with multiple props and nested structure
 export const Card = ({
   title,
-  subtitle = "Default subtitle",
+  description
   theme = "light",
   size = "lg",
 }) => {
   const cardClass = `card-${theme} size-${size}`;
```

### Additional Tools

#### `approve_edit`
Apply changes from a previous dry run of `edit_file_lines`. This tool provides a two-step editing process for safety. Here is an example workflow:

1. First, make a dry run edit:
```json 
{
  "p": "src/components/App.tsx",
  "e": [{
    "startLine": 2,
    "endLine": 2,
    "content": "primary",
    "strMatch": "blue"
  }],
  "dryRun": true
}
```

Output:
```diff
Index: src/components/App.tsx
===================================================================
--- src/components/App.tsx        original
+++ src/components/App.tsx        modified
@@ -1,6 +1,6 @@
 // Basic component with props
-const Button = ({ color = "blue", size = "md" }) => {
+const Button = ({ color = "primary", size = "md" }) => {
   return <button className={`btn-${color} size-${size}`}>Click me</button>;
 };
 ```

State ID: fcbf740a
Use this ID with approve_edit to apply the changes.


2. Then, approve the changes using the state ID:
```json
{
  "stateId": "fcbf740a"
}
```

Output:
```diff
Index: src/components/App.tsx
===================================================================
--- src/components/App.tsx        original
+++ src/components/App.tsx        modified
@@ -1,6 +1,6 @@
 // Basic component with props
-const Button = ({ color = "blue", size = "md" }) => {
+const Button = ({ color = "primary", size = "md" }) => {
   return <button className={`btn-${color} size-${size}`}>Click me</button>;
 };
```

3. Verify the changes:
```json
{
  "path": "src/components/App.tsx",
  "lineNumbers": [2],
  "context": 1
}
```

Output:
```
Line 2:
  1: // Basic component with props
> 2: const Button = ({ color = "primary", size = "md" }) => {
  3:   return <button className={`btn-${color} size-${size}`}>Click me</button>;
```

Note that state IDs expire after a short time for security. Attempting to use an expired or invalid state ID will result in an error:
```json
{
  "stateId": "invalid123"
}
```

Output:
```
Error: Invalid or expired state ID
```

#### `get_file_lines`
Inspect specific lines in a file with optional context lines. This tool is useful for verifying line content before making edits.

```json
{
  "path": "src/components/App.tsx",
  "lineNumbers": [1, 2, 3],
  "context": 1
}
```

Output:
```
Line 1:
> 1: // Basic component with props
  2: const Button = ({ color = "blue", size = "md" }) => {

Line 2:
  1: // Basic component with props
> 2: const Button = ({ color = "blue", size = "md" }) => {
  3:   return Click me;

Line 3:
  2: const Button = ({ color = "blue", size = "md" }) => {
> 3:   return Click me;
  4: };
```

#### `search_file`
Search a file for text patterns or regular expressions to find specific line numbers and their surrounding context. This tool is particularly useful for locating the exact lines you want to edit with `edit_file_lines`.

Features:
- Simple text search with optional case sensitivity
- Regular expression support
- Whole word matching
- Configurable context lines
- Returns line numbers, content, and surrounding context with line numbers

Arguments:
```typescript
{
  path: string;          // Path to the file to search
  pattern: string;       // Search pattern (text or regex)
  type?: "text" | "regex"; // Type of search (default: "text")
  caseSensitive?: boolean; // Case-sensitive search (default: false)
  contextLines?: number;   // Number of context lines (default: 2, max: 10)
  maxMatches?: number;     // Maximum matches to return (default: 100)
  wholeWord?: boolean;     // Match whole words only (default: false)
  multiline?: boolean;     // Enable multiline regex mode (default: false)
}
```

Example use cases:

1. Simple text search:
```json
{
  "path": "src/components/App.tsx",
  "pattern": "const",
  "contextLines": 2
}
```

Output:
```
Found 6 matches in 0.9ms:
File size: 0.7KB

Match 1: Line 2, Column 1
----------------------------------------
     1 | // Basic component with props
>    2 | const Button = ({ color = "blue", size = "md" }) => {
     3 |   return <button className={`btn-${color} size-${size}`}>Click me</button>;
     4 | };

Match 2: Line 7, Column 8
----------------------------------------
     5 | 
     6 | // Component with multiple props and nested structure
>    7 | export const Card = ({
     8 |   title,
     9 |   subtitle = "Default subtitle",

Match 3: Line 13, Column 3
----------------------------------------
    11 |   size = "lg",
    12 | }) => {
>   13 |   const cardClass = `card-${theme} size-${size}`;
    14 |   
    15 |   return (

Match 4: Line 23, Column 4
----------------------------------------
    21 | };
    22 | 
>   23 | // Constants and configurations
    24 | const THEME = {
    25 |   light: { bg: "#ffffff", text: "#000000" },

Match 5: Line 24, Column 1
----------------------------------------
    22 | 
    23 | // Constants and configurations
>   24 | const THEME = {
    25 |   light: { bg: "#ffffff", text: "#000000" },
    26 |   dark: { bg: "#000000", text: "#ffffff" },

Match 6: Line 29, Column 1
----------------------------------------
    27 | };
    28 | 
>   29 | const CONFIG = {
    30 |   apiUrl: "https://api.example.com",
    31 |   timeout: 5000,
```

2. Case-sensitive whole word search:
```json
{
  "path": "src/components/App.tsx",
  "pattern": "props",
  "caseSensitive": true,
  "wholeWord": true,
  "contextLines": 1
}
```

Output:
```
Found 2 matches in 0.7ms:
File size: 0.7KB

Match 1: Line 1, Column 25
----------------------------------------
>    1 | // Basic component with props
     2 | const Button = ({ color = "blue", size = "md" }) => {

Match 2: Line 6, Column 28
----------------------------------------
     5 | 
>    6 | // Component with multiple props and nested structure
     7 | export const Card = ({
```

3. Finding JSX components:
```json
{
  "path": "src/components/App.tsx",
  "pattern": "<[A-Z]\\w+\\s",
  "type": "regex",
  "contextLines": 1
}
```

Output:
```
Found 2 matches in 0.6ms:
File size: 0.7KB

Match 1: Line 3, Column 10
----------------------------------------
     2 | const Button = ({ color = "blue", size = "md" }) => {
>    3 |   return <button className={`btn-${color} size-${size}`}>Click me</button>;
     4 | };

Match 2: Line 16, Column 5
----------------------------------------
    15 |   return (
>   16 |     <div className={cardClass}>
    17 |       <h2>{title}</h2>
```

Common workflows:

1. Find then edit:
```typescript
// First, search for the line
{
  "path": "src/config.ts",
  "pattern": "API_URL",
  "wholeWord": true
}

// Then use the returned line number in edit_file_lines
{
  "p": "src/config.ts",
  "e": [{
    "startLine": 23,  // Line number from search result
    "endLine": 23,
    "content": "export const API_URL = 'https://new-api.example.com';"
  }]
}
```

2. Find all usages:
```typescript
{
  "path": "src/components/App.tsx",
  "pattern": "\\buseMemo\\b",
  "type": "regex",
  "contextLines": 2,
  "maxMatches": 50
}
```

3. Find specific prop patterns:
```typescript
{
  "path": "src/components/App.tsx",
  "pattern": "className=['\"]([^'\"]+)['\"]",
  "type": "regex",
  "contextLines": 1
}
```

### Important Notes

1. Whitespace Handling
   - The tool intelligently handles whitespace in both string and regex matches
   - Original indentation is preserved in replacements
   - Multiple spaces between tokens are normalized for matching

2. Pattern Matching
   - String matches (`strMatch`) are whitespace-normalized
   - Regex patterns (`regexMatch`) support look-ahead and look-behind
   - Cannot use both `strMatch` and `regexMatch` in the same edit
   - Overlapping regex patterns are detected and prevented

3. Best Practices
   - Always use dry run first to verify changes
   - Review the diff output before approving changes
   - Keep edit operations focused and atomic
   - Use appropriate pattern matching for your use case


## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

### Testing

Run the test suite:
```bash
npm run test
```

Additional testing utilities:

#### Test Tools Script
Test the MCP tools directly against sample files:
```bash
npm run test:tools
```

This script:
- Resets test fixtures to a known state
- Connects to the MCP server
- Tests each tool in sequence:
  - `get_file_lines`
  - `edit_file_lines` (dry run)
  - `approve_edit`
- Shows the output of each operation
- Verifies changes were applied correctly

#### Reset Fixtures Script
Reset test fixtures to their original state:
```bash
npm run reset:fixtures
```

Use this script to:
- Reset test files to a known state before testing
- Clean up after failed tests
- Ensure consistent test environment
- Create missing fixture directories

## Usage

The server requires one or more allowed directories to be specified when starting:

```bash
node build/index.js <allowed-directory> [additional-directories...]
```

All file operations will be restricted to these directories for security.

### Environment Variables

- `MCP_EDIT_STATE_TTL`: Time-to-live in milliseconds for edit states (default: 60000). Edit states will expire after this duration and must be recreated.

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "edit-file-lines": {
      "command": "node",
      "args": [
        "/path/to/edit-file-lines/build/index.js",
        "<allowed-directory>"
      ],
      "env": {
        "MCP_EDIT_STATE_TTL": "300000"  // Optional: Set custom TTL (in milliseconds)
      }
    }
  }
}
```

### Error Handling

The tool provides clear error messages for common issues:

1. Match Not Found
```
Error: No string match found for "oldValue" on line 5
```

2. Invalid Regex
```
Error: Invalid regex pattern "([": Unterminated group
```

3. Multiple Edits on Same Line
```
Error: Line 5 is affected by multiple edits
```

### Security Considerations

- All file operations are restricted to explicitly allowed directories
- Symlinks are validated to prevent escaping allowed directories
- Parent directory traversal is prevented
- Path normalization is performed for consistent security checks
- Invalid line numbers and character positions are rejected
- Line ending normalization ensures consistent behavior across platforms
- Edit states expire after 60 seconds for security
- Edit approvals require exact match of file path and edits

### Debugging

Use the Test Tools script to test the MCP tools directly against sample files. The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) might help, but it currently does not support handing input that are not string values.