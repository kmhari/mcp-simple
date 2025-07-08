# HubSpot MCP Server

A Model Context Protocol (MCP) server implementation for HubSpot, providing a standardized interface for interacting with HubSpot's API.

## Overview

This package implements an MCP server that acts as a bridge between applications and HubSpot's API. It provides a standardized way to interact with HubSpot's services through the Model Context Protocol.

## Example Usage

Ever wondered how AI can transform your HubSpot workflow? Watch how these real-world scenarios come to life with just a simple conversation:

> 💡 **Sales & Project Management**
> 
> *"I just had a great meeting with Sarah from TechCorp about their cloud migration project. Create a new deal for $250K, associate it with their company record, and schedule a follow-up call with their CTO next week to discuss the implementation timeline."*

> 🚀 **Client Onboarding**
> 
> *"Our biggest client, Enterprise Solutions, is expanding their team. Create a new contact for their new CTO, link them to the 'Digital Transformation' project, and set up a series of onboarding meetings with our technical team over the next two weeks."*

> ⚡ **Project Handover**
> 
> *"The 'AI Integration' project is moving to the final stage. Update the deal status, create a new support ticket for the handover process, and schedule a training session with the client's team for next month, making sure to include all relevant contacts from their IT department."*

## Usage

### Running as a Command Line Tool

The server runs on stdio and can be used as a command-line tool:

```bash
hubspot-mcp-server
```

### Integration with Claude Desktop

To use this server with Claude Desktop, add the following configuration to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": [
        "-y",
        "@naoraideas/hubspot-mcp-server"
      ],
      "env": {
        "HUBSPOT_API_KEY": "your_hubspot_api_key_here"
      }
    }
  }
}
```

## Installation

```bash
npm install @NaorAIdeas/hubspot-mcp-server
```

## Prerequisites

- [Node.js](https://nodejs.org/en) (version 14 or higher) - Download and install from the official website
- A HubSpot API key (Personal Access Token)

## Configuration

### Obtaining HubSpot API Key

To get started with the HubSpot MCP Server, you'll need to obtain an API key. Here's a detailed guide:

1. **Log in to your HubSpot account**
   - Visit [HubSpot's website](https://app.hubspot.com/) and sign in to your account

2. **Navigate to Private Apps**
   - Go to Settings > Account Setup > Integrations > Private Apps
   - If you don't see this option, ensure you have the necessary permissions

3. **Create a new Private App**
   - Click "Create a private app"
   - Give your app a descriptive name (e.g., "HubSpot MCP Server")
   - Add a description of what the app will be used for

4. **Configure Scopes**
   - Select the following scopes (minimum required):
     - `crm.objects.contacts.read`
     - `crm.objects.contacts.write`
     - `crm.objects.companies.read`
     - `crm.objects.companies.write`
     - `crm.objects.deals.read`
     - `crm.objects.deals.write`
     - `crm.objects.custom.read`
     - `crm.objects.custom.write`
     - `crm.associations.read`
     - `crm.associations.write`
     - `timeline.read`
     - `timeline.write`

5. **Save and Get Your API Key**
   - Click "Create app"
   - Copy the generated access token immediately
   - Store it securely as it will only be shown once

## Available Tools

### Contacts Management
- "I got a call from (415) 555-0123, who is this?"
- "Update John Smith's role to VP of Sales at Acme Corp"
- "Find me the email of Emma Wilson from TechStart Inc"

### Companies Management
- "Show me all companies in the San Francisco area"
- "Create a new company record for 'CloudTech Solutions' in the IT sector"
- "Update the annual revenue for Microsoft to $200B"

### Deals Management
- "What's the status of the 'Enterprise Cloud Migration' deal?"
- "Create a new deal for 'AI Integration Project' worth $150K"
- "Move the 'Digital Transformation' deal to the 'Contract Sent' stage"

### Custom Objects
- "Show me all active projects in the 'Product Development' pipeline"
- "Create a new support ticket for 'Server Downtime' issue"
- "Update the priority of project 'Mobile App Launch' to High"

### Associations
- "Which contacts are associated with the 'Enterprise Solutions' company?"
- "Link Sarah Johnson to the 'Cloud Migration' project"
- "Remove the association between Mark Davis and the 'Legacy System' project"

### Timeline Events
- "Show me all meetings scheduled with Google this month"
- "Create a new follow-up call with Amazon for next Tuesday"
- "Update the description of yesterday's product demo with Microsoft"

## Development

### Environment Setup

Create a `.env` file in your project root with the following content:

```
HUBSPOT_API_KEY=your_hubspot_api_key_here
```

### Building the Project

```bash
npm run build
```

### Development Mode

To run the project in watch mode:

```bash
npm run watch
```

## Dependencies

- @hubspot/api-client: HubSpot API client
- @modelcontextprotocol/sdk: Model Context Protocol SDK
- dotenv: Environment variable management
- zod: Schema validation

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author

**Naor Hemed**  
AI Integration Expert & Software Engineer  
Passionate about building intelligent systems that transform business workflows.  
Let's connect and explore how AI can revolutionize your HubSpot experience!  

[GitHub](https://github.com/NaorAIdeas) | [LinkedIn](https://www.linkedin.com/in/naor-hemed) | [Email](mailto:naorhemed@gmail.com)

## Contributing

This project was built with ❤️ and a passion for making HubSpot more accessible through AI.  
Feel free to reach out if you'd like to contribute, have questions, or just want to chat about AI powered workflows!