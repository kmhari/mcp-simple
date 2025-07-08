# React Native / Expo Helper MCP Server

[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-brightgreen)](https://modelcontextprotocol.io)

This project implements a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server designed to assist developers working with React Native and Expo projects. It provides tools, resources, and prompts to help analyze dependencies, check compatibility, and review changelogs.

## Overview

The server acts as a knowledgeable assistant for the React Native/Expo ecosystem. When connected to an MCP-compatible client (like Cursor, Genkit, Continue, etc.), it allows an LLM to:

*   Fetch detailed information about NPM packages.
*   Retrieve known compatibility information for specific Expo SDK versions.
*   Access files within the local project directory (requires `stdio` transport and careful security considerations).
*   Fetch and analyze GitHub release notes for specified version ranges.
*   Check for potential breaking changes or deprecations based on keywords in release notes.
*   Perform project health checks by analyzing `package.json` and dependencies.

## Features

The server exposes the following MCP capabilities:

### Resources

*   **`npm-package-info`** (`package://npm/{packageName}/version/{version?}`)
    *   Fetches details (version, description, repo URL, NPM URL) for an NPM package from the registry. Optionally fetches a specific version.
*   **`github-changelog`** (`changelog://github/{owner}/{repo}`)
    *   Fetches recent release notes (up to 15) from the GitHub Releases page for the specified repository. Requires GitHub API access.
*   **`expo-sdk-compatibility`** (`compatibility://expo/sdk/{sdkVersion}`)
    *   Retrieves known compatible versions (React Native, React) for a given Expo SDK version based on an internal map (requires updates for new SDKs).
*   **`project-file`** (`project://{filePath}`)
    *   Reads the content of a file within the project directory where the server is running.
    *   **Security Warning:** This resource grants file system access. Use only with trusted MCP clients and preferably via the `stdio` transport for local execution. Path validation is in place to prevent access outside the project root.

### Tools

*   **`checkProjectCompatibility`**
    *   **Arguments:** `packageJsonContent: string`, `lockfileContent?: string`, `expoSdkVersion?: string`
    *   Analyzes the provided `package.json` (and optionally lockfile) content against the known Expo SDK compatibility data. Reports potential mismatches.
*   **`findUpgradeChangelog`**
    *   **Arguments:** `packageName: string`, `fromVersion: string`, `toVersion: string`
    *   Fetches GitHub release notes for the specified package between the `fromVersion` (exclusive) and `toVersion` (inclusive).
*   **`checkBreakingChanges`**
    *   **Arguments:** `packageName: string`, `fromVersion: string`, `toVersion: string`
    *   Fetches GitHub release notes for the specified package between versions and scans them for keywords like "breaking change", "deprecated", "migration", etc., reporting relevant snippets.

### Prompts

*   **`assistUpgrade`**
    *   **Arguments:** `packageName: string`, `currentVersion: string`, `targetVersion: string`
    *   Generates a plan for an LLM to use the available tools and resources to guide a user through upgrading the specified package.
*   **`checkProjectHealth`**
    *   **Arguments:** `packageJsonPath?: string`, `lockfilePath?: string`
    *   Generates a plan for an LLM to analyze the project's dependency health by reading project files, checking compatibility, and identifying outdated major dependencies.

## Installation

1.  **Clone the repository (if applicable) or ensure you have the project files.**
2.  **Install Node.js and npm:** Ensure you have a recent version of Node.js (v18 or later recommended) and npm installed.
3.  **Install Dependencies:** Open a terminal in the project root directory and run:
    ```bash
    npm install
    ```

## Configuration

### GitHub API Token (Recommended)

The server uses the GitHub API to fetch release notes for the `github-changelog` resource and the `findUpgradeChangelog`/`checkBreakingChanges` tools. Unauthenticated requests are heavily rate-limited.

To avoid rate limiting, create a [GitHub Personal Access Token (PAT)](https://github.com/settings/tokens) with **no scopes** (public repository access is sufficient for reading releases).

Provide this token to the server via the `GITHUB_TOKEN` environment variable. The recommended way to do this is through your MCP client's configuration file.

**Example MCP Configuration (`.mcp/config.json` or similar):**

```json
{
  "mcpServers": {
    "react-native-expo-helper": {
      // Assumes the server is built and run from the project root
      "command": "node",
      "args": ["dist/version_checker_server.js"],
      "env": {
        "GITHUB_TOKEN": "YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"
        // Add other environment variables if needed
      }
    }
  }
}
```

Replace `"YOUR_GITHUB_PERSONAL_ACCESS_TOKEN"` with your actual token.

### Expo Compatibility Map

The `expo-sdk-compatibility` resource relies on a hardcoded map (`expoCompatMap`) within `src/version_checker_server.ts`. This map needs to be manually updated as new Expo SDKs are released to remain accurate.

```typescript
// src/version_checker_server.ts
const expoCompatMap: Record<string, Record<string, string>> = {
  "49.0.0": { "react-native": "0.72.6", "react": "18.2.0" },
  "50.0.0": { "react-native": "0.73.4", "react": "18.2.0" },
  "51.0.0": { "react-native": "0.74.1", "react": "18.2.0" },
  "52.0.0": { "react-native": "0.77.0", "react": "18.2.0" },
  "53.0.0": { "react-native": "0.79.0", "react": "19.0.0" },
  // Add more SDK versions and their dependencies here
};
```

Feel free to update this map and rebuild the server if needed.

## Building and Running

1.  **Build the Server:** Compile the TypeScript code to JavaScript:
    ```bash
    npm run build
    ```
    This creates the compiled output in the `dist` directory.

2.  **Run the Server:**
    *   **Directly (for testing):**
        ```bash
        npm start
        ```
        The server will start and listen for MCP requests on standard input/output. Press `Ctrl+C` to stop.
    *   **Via an MCP Client:** Configure your MCP client (e.g., Cursor, Continue) to run the server using the command `node dist/version_checker_server.js` and provide the `GITHUB_TOKEN` via the `env` configuration as shown in the [Configuration](#configuration) section. The client will manage the server process lifecycle.

## Usage with MCP Clients

Once configured in your MCP client, you can interact with the server through the client's chat or command interface.

**Example Interactions (Conceptual):**

*   `@ReactNativeExpoHelper check project health` (Invokes the `checkProjectHealth` prompt)
*   `@ReactNativeExpoHelper assist upgrade expo from 50.0.0 to latest` (Invokes the `assistUpgrade` prompt)
*   (Client might automatically use resources/tools based on context or prompts)
    *   Client asking for `package://npm/react-native` resource.
    *   Client using `findUpgradeChangelog` tool as part of the upgrade prompt execution.

Refer to your specific MCP client's documentation for details on how to interact with configured MCP servers.

## Limitations

*   **GitHub API Rate Limiting:** Without a `GITHUB_TOKEN`, you will likely hit rate limits quickly when using changelog features.
*   **Changelog Accuracy:** Changelog analysis relies on projects using GitHub Releases with standard semver tags. It may fail or be incomplete for projects with different release processes or non-standard tags. Keyword scanning for breaking changes is heuristic and not guaranteed to be exhaustive.
*   **Compatibility Data:** The Expo SDK compatibility data is based on a hardcoded map and requires manual updates for accuracy with new SDK releases. Always cross-reference with official Expo documentation.
*   **`project-file` Security:** The `project-file` resource allows reading local files. This is a potential security risk if the server is exposed or run in an untrusted environment. It's designed primarily for local `stdio` usage.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests. 