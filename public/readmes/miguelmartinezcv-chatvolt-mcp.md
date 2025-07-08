[![MCP Badge](https://lobehub.com/badge/mcp/miguelmartinezcv-chatvolt-mcp)](https://lobehub.com/mcp/miguelmartinezcv-chatvolt-mcp)

# Chatvolt MCP Server

A Model Context Protocol server that wraps the Chatvolt API, providing tools to manage agents, datastores, and CRM workflows.

This is a TypeScript-based MCP server that provides tools to interact with Chatvolt.

## Installation

You can install and run this server using `npx`:

```bash
npx chatvolt-mcp
```

To use with Roo, add the following to your `.roo/mcp.json` file:

```json
{
  "mcpServers": {
    "chatvolt-mcp": {
      "command": "npx",
      "args": [
        "chatvolt-mcp"
      ],
      "env": {
        "CHATVOLT_API_KEY": "{YOUR_TOKEN}"
      },
      "disabled": false,
      "alwaysAllow": [
        "get_agent"
      ]
    }
  }
}
```

## Tools

<details>
<summary><b>Agent Tools</b></summary>

- **get_agent**
  - Title: Get Agent
  - Description: Get a Chatvolt agent by its ID or handle
  - Parameters:
    - `id` (string): Agent ID or its handle (unique identifier preceded by '@', e.g., '@my-agent')
  - Read-only: **true**

- **create_agent**
  - Title: Create Agent
  - Description: Create a new Chatvolt agent
  - Parameters:
    - `name` (string): The name of the agent.
    - `description` (string, optional): A description for the agent.
    - `modelName` (string): The model name for the agent (e.g., 'gpt-4').
    - `systemPrompt` (string, optional): The system prompt for the agent.
    - `temperature` (number, optional): Model temperature (min 0.0, max 1.0).
    - `tools` (array, optional): List of tools to be associated with the agent.
  - Read-only: **false**

- **list_agents**
  - Title: List Agents
  - Description: List all Chatvolt agents
  - Parameters: None
  - Read-only: **true**

- **update_agent**
  - Title: Update Agent
  - Description: Partially updates an existing agent based on the ID.
  - Parameters:
    - `id` (string): ID of the agent to be updated.
    - `name` (string, optional): New name for the agent.
    - `description` (string, optional): New description for the agent.
    - `modelName` (string, optional): New LLM model to be used by the agent.
    - `temperature` (number, optional): New model temperature (min 0.0, max 1.0).
    - `systemPrompt` (string, optional): New system prompt for the agent.
    - `visibility` (string, optional): New visibility for the agent ('public' or 'private').
    - `handle` (string, optional): New unique identifier (slug) for the agent.
    - `interfaceConfig` (object, optional): New chat interface settings for this agent.
    - `configUrlExternal` (object, optional): New external URL configurations.
    - `configUrlInfosSystemExternal` (object, optional): New external URL configurations of the system.
    - `tools` (array, optional): List of tools for the agent.
  - Read-only: **false**

- **delete_agent**
  - Title: Delete Agent
  - Description: Permanently deletes a specific agent by its ID.
  - Parameters:
    - `id` (string): ID of the agent to be deleted.
  - Read-only: **false**

- **agent_query**
  - Title: Query Agent
  - Description: Processes a query (Ask something) through the specified agent.
  - Parameters:
    - `id` (string): ID of the agent to be queried.
    - `query` (string): Text of the question or command to be sent to the agent.
    - `conversationId` (string, optional): ID of the existing conversation.
    - `contactId` (string, optional): ID of an existing contact in the system.
    - `contact` (object, optional): Contact details.
    - `visitorId` (string, optional): ID of the visitor/participant.
    - `temperature` (number, optional): Model temperature.
    - `modelName` (string, optional): Allows overriding the LLM model.
    - `presencePenalty` (number, optional): Presence penalty.
    - `frequencyPenalty` (number, optional): Frequency penalty.
    - `topP` (number, optional): Nucleus sampling.
    - `filters` (object, optional): Filters for the query.
    - `systemPrompt` (string, optional): Allows overriding the system prompt.
    - `context` (object, optional): Additional context data.
    - `callbackURL` (string, optional): Callback URL.
  - Read-only: **true**

- **enable_disable_agent_integration**
  - Title: Enable/Disable Agent Integration
  - Description: Enable or disable an agent integration.
  - Parameters:
    - `id` (string): ID of the agent.
    - `type` (string): Type of the service provider ('whatsapp', 'telegram', 'zapi', 'instagram').
    - `enabled` (boolean): New webhook status.
  - Read-only: **false**

</details>

<details>
<summary><b>CRM Tools</b></summary>

- **list_crm_scenarios**
  - Title: List CRM Scenarios
  - Description: List CRM Scenarios
  - Parameters:
    - `agentId` (string, optional): Filter scenarios by a specific Agent ID.
  - Read-only: **true**

- **create_crm_scenario**
  - Title: Create CRM Scenario
  - Description: Create a new CRM Scenario
  - Parameters:
    - `name` (string): The name for the new CRM scenario.
    - `description` (string, optional): An optional description for the CRM scenario.
  - Read-only: **false**

- **update_crm_scenario**
  - Title: Update CRM Scenario
  - Description: Update a CRM Scenario
  - Parameters:
    - `id` (string): The ID of the CRM scenario to update.
    - `name` (string): The new name for the CRM scenario.
    - `description` (string, optional): An optional new description for the CRM scenario.
  - Read-only: **false**

- **delete_crm_scenario**
  - Title: Delete CRM Scenario
  - Description: Delete a CRM Scenario
  - Parameters:
    - `id` (string): The ID of the CRM scenario to delete.
  - Read-only: **false**

- **list_crm_steps**
  - Title: List CRM Steps
  - Description: List CRM Steps for a given scenario
  - Parameters:
    - `scenarioId` (string): The ID of the CRM scenario to list steps for.
  - Read-only: **true**

- **create_crm_step**
  - Title: Create CRM Step
  - Description: Create a new CRM Step
  - Parameters:
    - `scenarioId` (string): The ID of the CRM scenario to add the step to.
    - `name` (string): The name for the new CRM step.
    - `description` (string, optional): An optional description for the CRM step.
    - `agentId` (string, optional): Optional Agent ID to associate with this step.
    - `trigger` (string, optional): A trigger condition or keyword for this step.
    - `prompt` (string, optional): The main prompt or instruction for this step.
    - `initialMessage` (string, optional): An initial message to be sent when this step is activated.
    - `autoNextStepId` (string, optional): ID of the step to automatically transition to.
    - `autoNextTime` (integer, optional): Time in seconds to wait before auto-transitioning.
    - `defaultStatus` (string, optional): Default status for conversations at this step.
    - `defaultPriority` (string, optional): Default priority for conversations at this step.
    - `assigneeLogicType` (string, optional): Logic for assigning conversations at this step.
    - `selectedMembershipIdsForAssignee` (array, optional): List of membership IDs for assignee logic.
    - `isRequired` (boolean, optional): Indicates if this step is mandatory.
  - Read-only: **false**

- **update_crm_step**
  - Title: Update CRM Step
  - Description: Update a CRM Step
  - Parameters:
    - `id` (string): The ID of the CRM step to update.
    - `name` (string): The new name for the CRM step.
    - `description` (string, optional): An optional new description for the CRM step.
    - `agentId` (string, optional): Optional Agent ID to associate with this step.
    - `trigger` (string, optional): A trigger condition or keyword for this step.
    - `prompt` (string, optional): The main prompt or instruction for this step.
    - `initialMessage` (string, optional): An initial message to be sent when this step is activated.
    - `autoNextStepId` (string, optional): ID of the step to automatically transition to.
    - `autoNextTime` (integer, optional): Time in seconds to wait before auto-transitioning.
    - `defaultStatus` (string, optional): Default status for conversations at this step.
    - `defaultPriority` (string, optional): Default priority for conversations at this step.
    - `assigneeLogicType` (string, optional): Logic for assigning conversations at this step.
    - `selectedMembershipIdsForAssignee` (array, optional): List of membership IDs for assignee logic.
    - `isRequired` (boolean, optional): Indicates if this step is mandatory.
  - Read-only: **false**

- **delete_crm_step**
  - Title: Delete CRM Step
  - Description: Delete a CRM Step
  - Parameters:
    - `id` (string): The ID of the CRM step to delete.
  - Read-only: **false**

</details>

<details>
<summary><b>Datastore Tools</b></summary>

- **list_datastores**
  - Title: List Datastores
  - Description: List all Chatvolt datastores
  - Parameters: None
  - Read-only: **true**

- **get_datastore**
  - Title: Get Datastore
  - Description: Get a Chatvolt datastore by its ID
  - Parameters:
    - `id` (string): ID of the datastore to be retrieved.
    - `search` (string, optional): Term to search for datasources by name.
    - `status` (string, optional): Filter datasources by status.
    - `type` (string, optional): Filter datasources by type.
    - `offset` (integer, optional): Number of pages to skip for pagination.
    - `limit` (integer, optional): Maximum number of datasources to be returned per page.
    - `groupId` (string, optional): Filter datasources by a specific group ID.
  - Read-only: **true**

- **create_datastore**
  - Title: Create Datastore
  - Description: Create a new Chatvolt datastore
  - Parameters:
    - `name` (string, optional): Datastore name.
    - `description` (string, optional): Datastore description.
    - `type` (string): Datastore type (e.g., 'qdrant').
    - `isPublic` (boolean, optional): Defines whether the datastore is public or private.
    - `pluginName` (string, optional): Short name for the OpenAI plugin.
    - `pluginDescriptionForHumans` (string, optional): Human-readable description for the OpenAI plugin.
  - Read-only: **false**

- **create_datasource**
  - Title: Create Datasource
  - Description: Create a new Chatvolt datasource
  - Parameters:
    - `datastoreId` (string): The ID of the datastore to add the datasource to.
    - `name` (string): The name for the datasource, used as the filename.
    - `text` (string): The text content for the datasource.
  - Read-only: **false**

</details>

## Configuration

This server requires a Chatvolt API key to be set as an environment variable.

```bash
export CHATVOLT_API_KEY="your_api_key_here"
```

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

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
