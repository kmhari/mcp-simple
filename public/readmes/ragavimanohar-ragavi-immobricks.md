## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Steps to Run Figma MCP with Cursor
1. Clone Figma-Context-MCP(https://github.com/GLips/Figma-Context-MCP) repo

2. Login into Figma
  - Go to "Help and account" -> "Account settings" -> Go to "Security" Tab
  - Under the "Personal access token" section, click on "Generate New Token"

3. Create `.env` and paste the newly created personal access token in the key `FIGMA_API_KEY`

4. Install packages with `yarn` or `npm` or `pnpm`

5. Finally start the project, by default the application will run in port 3333


​The Figma-Context-MCP is an open-source Model Context Protocol (MCP) server that facilitates communication between AI-powered coding tools, such as Cursor, and Figma design files. By integrating this server, these tools can access and interpret Figma design data, enabling more accurate and efficient code generation based on design specifications. ​

This integration allows AI coding agents to programmatically read and implement UI designs from Figma, streamlining the development process and reducing the need for manual coding. The server is designed to enhance the capabilities of AI copilots by providing them with detailed layout information from Figma, resulting in cleaner and more precise HTML and CSS outputs.

## Cursor settings for Figma MCP
1. Open Cursor application on your mac

2. Go to "Settings" -> "Cursor Settings" -> Go to "MCP" tab
  - Click "Add new global MCP server"
  - This will open `mcp.json` file, paste the below snippet

```bash
  {
    "mcpServers": {
      "Figma MCP": {
        "url": "http://localhost:3333/sse"
      }
    }
  }
```

3. If the Figma-Context-MCP(https://github.com/GLips/Figma-Context-MCP) repo is up and running, you can able to view Connection as success in Cursor.

## Example Prompt
Create a "pixel perfect" new component as "Badge" from below figma link
https://www.figma.com/design/9GnS5AlvbNzpIr92f6qPEI/IMMO-Design-System--2.0-?node-id=7185-147595&t=Q1gjkJ4IgYmmbAC3-4

- create stories for this badge component using storybook
- use libraries like shadcn, tailwind, lucide-react etc
- Refer my package.json to see what are the existing libraries and try to use those alone.
- But if you're adding any new libraries final give me the NPM command
