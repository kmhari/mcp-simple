# Flatfile MCP Server

The Flatfile MCP Server enables AI assistants such as Claude Desktop, Claude Code, Cursor, and other to interact directly with your Flatfile data. This MCP Server creates a seamless bridge between AI assistants and Flatfile.

## ✨ Features

- Supports 100+ Flatfile API endpoints
- View and manage Sheets, Workbooks, Spaces, and more
- Add, edit, and delete Records
- Ask questions about your data
- Generate Sheets from natural language
- Create new Workbooks from scratch
- And more!

## 🛠️ Setup

You will need either a Flatfile Personal Access Token or a Flatfile API Key.

### API Key

Access your API Key by [following these instructions](https://flatfile.com/docs/documentation/authentication/authentication).

### Personal Access Token

Create a Flatfile Personal Access Token by [following these instructions](https://flatfile.com/docs/documentation/authentication/account-token#personal-access-tokens).

### Filtering Tools

Flatfile provides over 100 API endpoints, with a tool to interact with each of them. It is strongly recommended to filter the tools to only include the ones you need. This can be done by passing the `--enabled-tools` flag to the MCP Server along with a comma-separated list of the tools you want to enable. If the `--enabled-tools` flag is not passed, all tools will be enabled.

Example:
```json
{
  "mcpServers": {
      // ...
      "mcp-server-flatfile": {
         "command": "npx",
         "args": ["-y", "@flatfile/mcp-server", "--enabled-tools", "getRecords,updateRecords"],
         // ...
      }
      // ...
  }
}
```

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-server-flatfile": {
      "command": "npx",
      "args": ["-y", "@flatfile/mcp-server", "--enabled-tools", "..."], // Replace with the tools you want to enable
      "env": {
        "FLATFILE_BEARER_TOKEN": "pat_your_token_here",
        "FLATFILE_API_URL": "https://platform.flatfile.com/api/v1" // Optional, for non-US regions or self-hosting
      }
    }
  }
}
```

### Usage with Claude Code

Add the following to your `.claude/code/config.json`:

```bash
claude mcp add mcp-server-flatfile -e FLATFILE_API_URL=https://platform.flatfile.com/api/v1 -e FLATFILE_BEARER_TOKEN=pat_your_token_here -- npx -y @flatfile/mcp-server --enabled-tools ... // Replace with the tools you want to enable
```

[Claude Code instructions](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/tutorials#set-up-model-context-protocol-mcp) on how to add a MCP Server.

### Usage with Cursor

Add the following to your `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "mcp-server-flatfile": {
      "command": "npx",
      "args": ["-y", "@flatfile/mcp-server", "--enabled-tools", "..."], // Replace with the tools you want to enable
      "env": {
        "FLATFILE_BEARER_TOKEN": "pat_your_token_here",
        "FLATFILE_API_URL": "https://platform.flatfile.com/api/v1" // Optional, for non-US regions or self-hosting
      }
    }
  }
}
```

## 🔧 Available Tools

* **ackEvent** - Acknowledge an event: Acknowledge an event
* **ackJob** - Acknowledge a job: Acknowledge a job and return the job
* **ackOutcomeJob** - Acknowledge a job outcome: Acknowledge a job outcome and return the job
* **archiveSpace** - Archives a space: Sets archivedAt timestamp on a space
* **assignAgentRole** - Assign Role to Agent: Assigns a role to a agent.
* **assignGuestRole** - Assign Role to Guest: Assigns a role to a guest.
* **assignUserRole** - Assign Role to User: Assigns a role to a user.
* **bulkCreateActions** - Create several actions: Create several actions
* **bulkDeleteSpace** - Delete spaces: Delete multiple spaces by id
* **cancelJob** - Cancel a job: Cancel a job and return the job
* **completeJob** - Complete a job: Complete a job and return the job
* **createAction** - Create an action: Create an action
* **createAgent** - Create an agent: Create an agent
* **createAndInviteUser** - Create and Invite User: Creates and invites a new user to your account.
* **createApp** - Create an app: Creates an app
* **createAssistant** - Create a prompt: Creates a prompt
* **createCanvasArea** - Create a canvas area: Creates a new canvas area
* **createConstraintApp** - Create constraint: Creates a new constraint for an app
* **createDataRetentionPolicy** - Create a data retention policy: Add a new data retention policy to the space
* **createDocument** - Create a document: Add a new document to the space
* **createDraftSpace** - Create a draft of a space: Creates a draft of a space
* **createEnvironment** - Create an environment: Create a new environment
* **createEvent** - Create an event: Create an event
* **createGuidanceSpace** - Create a new guidance: Creates a new guidance
* **createGuideEnvironment** - Create a guide: Creates a guide
* **createIdVersion** - createId: createId
* **createJob** - Create a job: Create a job
* **createMappingProgram** - Create a mapping between two schemas: Creates a list of mapping rules based on two provided schemas
* **createRoutine** - Create a routine: Creates a new routine
* **createRulesMapping** - Add mapping rules to a program: Add mapping rules to a program
* **createRunbook** - Create a runbook: Creates a new runbook
* **createSnapshot** - Create a snapshot: Creates a snapshot of a sheet
* **createSpace** - Create a space: Creates a new space based on an existing Space Config
* **createView** - Create a view: Add a new view to the space
* **createWorkbook** - Create a workbook: Creates a workbook and adds it to a space
* **deleteAction** - Delete an action: Delete an action
* **deleteAgent** - Delete an agent: Deletes a single agent
* **deleteAgentExport** - Delete an agent export: Delete an agent export
* **deleteAgentRole** - Remove Role from Agent: Removes a role from an agent.
* **deleteAllHistoryForUserMapping** - Delete all history for the authenticated user: Deletes all history for the authenticated user
* **deleteApp** - Delete an app: Deletes an app
* **deleteAssistant** - Delete a prompts: Deletes a prompts
* **deleteCanvasArea** - Delete a canvas area: Deletes a specific canvas area
* **deleteConstraintApp** - Delete constraint: Deletes a specific constraint
* **deleteDataRetentionPolicy** - Delete a data retention policy: Deletes a single data retention policy
* **deleteDocument** - Delete a document: Deletes a single document
* **deleteEnvironment** - Delete an environment: Deletes a single environment
* **deleteFile** - Delete a file: Delete a file
* **deleteGuest** - Delete a guest: Deletes a single guest
* **deleteGuestRole** - Remove Role from Guest: Removes a role from a guest.
* **deleteGuidanceSpace** - Delete a guidance: Deletes a guidance by its id
* **deleteGuideEnvironment** - Delete a guide: Deletes a guide
* **deleteJob** - Delete a job: Delete a job
* **deleteMappingProgram** - Delete a mapping program: Deletes a mapping program
* **deleteMultipleRulesMapping** - Delete multiple mapping rules: Deletes multiple mapping rules from a program
* **deleteRecords** - Delete records: Deletes records from a workbook sheet
* **deleteRoutine** - Delete a routine: Deletes a routine
* **deleteRuleMapping** - Delete a mapping rule: Deletes a mapping rule from a program
* **deleteRunbook** - Delete a runbook: Deletes a runbook
* **deleteSecret** - Delete a secret by it
* **deleteSheet** - Delete a sheet: Deletes a specific sheet from a workbook
* **deleteSnapshot** - Delete a snapshot: Deletes a snapshot of a sheet
* **deleteSpace** - Delete a space: Delete a space
* **deleteUser** - Delete a user: Deletes a user
* **deleteUserRole** - Remove Role from User: Removes a role from a user.
* **deleteView** - Delete a view: Deletes a single view
* **deleteWorkbook** - Delete a workbook: Deletes a workbook and all of its record data permanently
* **downloadAgentExport** - Download an agent export: Download an agent export
* **downloadFile** - Download a file: Download a file
* **duplicateSheet** - Duplicate a sheet: Creates a copy of a sheet including all its data within the same workbook
* **executeJob** - Execute a job: Execute a job and return the job
* **failJob** - Fail a job: Fail a job and return the job
* **getAction** - Get an action: Get an action
* **getAgent** - Get an agent: Get an agent
* **getAgentExport** - Get an agent export: Get an agent export
* **getAgentLog** - Get an agent log: Get an agent log
* **getAgentLogs** - Get logs for an agent: Get logs for an agent
* **getAllActions** - Get all actions for the space: Get all actions for the space
* **getApp** - Get an app: Returns an app
* **getAssistant** - Get a prompt: Returns a prompt
* **getCalculationsSheet** - List calculations: Returns all calculations for a sheet
* **getCanvasArea** - Get a canvas area: Returns a specific canvas area by ID
* **getCellValuesSheet** - Get record cells by field: Returns record cell values grouped by all fields in the sheet
* **getCommit** - Get a commit version: Returns the details of a commit version
* **getConstraintByIdApp** - Get constraint by ID: Returns a specific constraint
* **getConstraintsApp** - Get constraints: Returns constraints for an app
* **getConstraintVersionApp** - Get constraint version: Returns a specified version of a specific constraint
* **getConstraintVersionsApp** - Get constraint versions: Returns the versions of a specific constraint
* **getCurrentAccounts** - Get the current account: Get the current account
* **getDataRetentionPolicy** - Get a data retention policy: Returns a single data retention policy
* **getDocument** - Get a document: Returns a single document
* **getEnvironment** - Get an environment: Returns a single environment
* **getEnvironmentAgentExecutionsAgents** - Get all executions in your environment: Get all executions in your environment
* **getEnvironmentAgentLogsAgents** - Get all agent logs in your environment: Get all agent logs in your environment
* **getEvent** - Get an event: Get an event
* **getEventTokenEvents** - Get subscription credentials: Get a token which can be used to subscribe to events for this space
* **getExecutionPlanJob** - Get a job
* **getFile** - Get a file: Get a file
* **getGuest** - Get a guest: Returns a single guest
* **getGuestToken** - Get guest token: Returns a single guest token
* **getGuidanceSpace** - Get a guidance: Retrieves a guidance by its id
* **getGuideEnvironment** - Get a guide: Returns a guide
* **getGuideVersionEnvironment** - Get guide version: Returns a specified version of a specific guide
* **getJob** - Get a job: Get a job
* **getMappingProgram** - Get a mapping program: Get a mapping program
* **getRecordCountsSheet** - Get record counts: Returns counts of records from a sheet
* **getRecords** - Get records: Returns records from a sheet in a workbook
* **getRecordsAsCsvSheet** - Download records as a CSV file: Returns records from a sheet in a workbook as a csv file
* **getRoutine** - Get a routine: Returns a routine
* **getRuleMapping** - Get a mapping rule: Get a mapping rule from a program
* **getRunbook** - Get a runbook: Returns a runbook
* **getSftpCredentialsAuth** - Get SFTP credentials for Space: Get SFTP credentials for Space
* **getSheet** - Get a sheet: Returns a sheet in a workbook
* **getSheetCommits** - Get commit versions for a sheet: Returns the commit versions for a sheet
* **getSnapshot** - Get a snapshot: Gets a snapshot of a sheet
* **getSnapshotRecords** - Get records from a snapshot: Gets records from a snapshot of a sheet
* **getSpace** - Get a space: Returns a single space
* **getUser** - Get a user: Gets a user
* **getView** - Get a view: Returns a single view
* **getWorkbook** - Get a workbook: Returns a single workbook
* **getWorkbookCommits** - Get commits for a workbook: Returns the commits for a workbook
* **indicesRecords** - Get record Indices: Returns indices of records from a sheet in a workbook
* **insertRecords** - Insert records: Adds records to a workbook sheet
* **listAgentExports** - List agent exports: List agent exports
* **listAgentRoles** - List Agent Roles: Lists roles assigned to an agent.
* **listAgents** - List agents: List agents
* **listApps** - List apps: Returns apps in an account
* **listAssistant** - List prompts: Returns prompts created by user
* **listCanvasAreas** - List canvas areas: Returns a list of canvas areas filtered by canvas, space, or environment
* **listDocuments** - List documents: Returns all documents for a space
* **listEntitlements** - List entitlements: Returns all entitlements matching a filter for resourceId
* **listEnvironments** - List environments: Get all environments
* **listEvents** - List events: Event topics that the Flatfile Platform emits.
* **listFiles** - List files: List files
* **listGuestRoles** - List Guest Roles: Lists roles assigned to a guest.
* **listGuests** - List guests: Returns all guests
* **listGuidanceSpace** - List guidances: Lists guidances
* **listGuidesEnvironment** - List guides: Returns guides in an account
* **listJobs** - List jobs: List jobs
* **listMappingPrograms** - List mapping programs: List all mapping programs
* **listRoles** - List roles: List all roles for an account
* **listRoutines** - List routines: Returns a list of routines
* **listRulesMapping** - List mapping rules: List all mapping rules in a program
* **listRunbooks** - List runbooks: Returns a list of runbooks
* **listSecrets** - List secrets: Fetch all secrets for a given environmentId and optionally apply space overrides
* **listSheets** - List sheets: Returns sheets in a workbook
* **listSnapshots** - List snapshots: List all snapshots of a sheet
* **listSpaceDrafts** - List drafts for a space: Lists drafts for a space
* **listSpaces** - List spaces: Returns all spaces for an account or environment
* **listUserRoles** - List User Roles: Lists roles assigned to a user.
* **listUsers** - List users: Gets a list of users
* **listVersionsAgent** - List agent versions for an agent: List agent versions for an agent
* **listViews** - List views by Sheet: Returns all views for the sheet
* **listWorkbooks** - List workbooks: Returns all workbooks matching a filter for an account or space
* **lockSheet** - Lock a sheet: Locks a sheet
* **previewMutationJob** - Preview a mutation: Preview the results of a mutation
* **resendInviteUser** - Resend User Invite: Resends an invite to a user for your account.
* **restoreSnapshot** - Restore a snapshot: Restores a snapshot of a sheet
* **retryJob** - Retry a failed job: Retry a failt job and return the job
* **revertAgent** - Revert to a specific agent version: Revert to a specific agent version
* **splitJob** - Split a job: Split a job and return the job
* **unarchiveSpace** - Unarchives a space: Sets archivedAt timestamp on a space to null
* **unlockSheet** - Unlock a sheet: Removes a lock from a sheet
* **updateAction** - Update an action: Update an action
* **updateApp** - Update an app: Updates an app
* **updateAssistant** - Update a prompt: Updates a prompt
* **updateCanvasArea** - Update a canvas area: Updates an existing canvas area
* **updateConstraintApp** - Update constraint: Updates a specific constraint
* **updateCurrentAccount** - Update the current account: Update the current account
* **updateDataRetentionPolicy** - Update a data retention policy: Updates a single data retention policy
* **updateDocument** - Update a document: updates a single document, for only the body and title
* **updateEnvironment** - Update an environment: Updates a single environment, to change the name for example
* **updateExecutionPlanFieldsJob** - Update a job
* **updateExecutionPlanJob** - Replace a job
* **updateFile** - Update a file: Update a file, to change the workbook id for example
* **updateGuest** - Update a guest: Updates a single guest, for example to change name or email
* **updateGuidanceSpace** - Update a guidance: Updates a guidance with the given id
* **updateGuideEnvironment** - Update a guide: Updates a guide
* **updateJob** - Update a job: Update a job
* **updateMappingProgram** - Update a mapping program: Updates a mapping program
* **updateRecords** - Update records: Updates existing records in a workbook sheet
* **updateRoutine** - Update a routine: Updates a routine
* **updateRuleMapping** - Update a mapping rule: Updates a mapping rule in a program
* **updateRulesMapping** - Update a list of mapping rules: Updates a list of mapping rules in a program
* **updateRunbook** - Update a runbook: Updates a runbook
* **updateSheet** - Update a sheet: Updates Sheet
* **updateSpace** - Update a space: Update a space, to change the name for example
* **updateUser** - Update a user: Updates a user
* **updateView** - Update a view: Updates a single view
* **uploadFile** - Upload a file: Upload a file
* **upsertSecret** - Upsert a Secret: Insert or Update a Secret by name for environment or space
* **validateSheet** - Validate a sheet: Trigger data hooks and validation to run on a sheet
