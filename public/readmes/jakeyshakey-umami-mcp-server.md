# Umami Analytics MCP Server

A Model Context Protocol (MCP) server that enhances Claude's capabilities by providing access to website analytics data from Umami. This server allows Claude to analyze user behavior, track website performance, and provide data-driven insights.

The codebase has been generated from start to finish using Claude Sonnet 3.5 and Cursor.

![alt text](docs/images/dashboard_main.png)

## What It Does

This server connects Claude to your Umami analytics platform, enabling it to:
- Analyze user journeys and behavior patterns
- Track website performance metrics
- Monitor real-time visitor activity
- Capture and analyze webpage content
- Generate insights from historical analytics data

## How It Works

The server provides the following tools to Claude to analyze website data:

### Available Tools
- **get_websites**: Retrieve a list of websites and their IDs in your Umami account
- **get_website_stats**: Get key metrics like pageviews, visitors, bounce rate for a website
- **get_website_metrics**: Analyze specific metrics like URLs, referrers, browsers, countries
- **get_pageview_series**: Get time-series pageview data with customizable intervals
- **get_active_visitors**: Monitor current number of active visitors on a website
- **get_session_ids**: Retrieve session IDs for specific events or time periods
- **get_tracking_data**: Get detailed activity data for a specific session ID
- **get_docs**: Perform semantic search on many user journeys, returning the most relevant chunks for a given question
- **get_screenshot**: Capture visual snapshots of webpages
- **get_html**: Retrieve and analyze webpage HTML source code

Each tool has a description and a list of arguments that can be passed to it. These are used to provide context and information to allow Claude to effectively select the right tool/s for the job, and provide the correct paremeters.

Most of these tools pull data directly from the Umami API into Claude Desktop, however get_docs adds in a semantic search step to avoid context window issues with Claude as well as saving on token usage. All of the user journeys for a given event are retrieved using the Umami API and then these are chunked into smaller sections and embedded using an open soruce sentence transformer model from hugging face. Then, based on the question, the most relevant chunks are retrieved and returned to Claude, allowing for analysis of specific actions and behaviours performed by users on the website, something hard to replicate with traditional data visualisation tools. The implementation of this embedding and semantic search is in the `src/analytics_service/embeddings.py` file.

Additoanlly, the get_screenshot and get_html tools use the open source [Crawl4AI](https://github.com/unclecode/crawl4ai) web crawler to retrieve the HTML source code and screenshot of a given website. The screenshots have to be downsampled to reduce their size to avoid context window issues with Claude. This allows you to provide context to Claude about how the website is structured and how it looks, allowing for more accurate and relevant recomendations on improving site performance. The implementation of the web crawler is in the `src/analytics_service/crawler.py` file.

![alt text](docs/images/screenshot.png)

## Setup Guide

### Prerequisites

- install uv: `pip install uv`

1. **Claude Desktop Configuration**
   
   Add the following to your Claude Desktop config file:
   - MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%/Claude/claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "analytics_service": {
         "command": "uv",
         "args": [
           "--directory",
           "/path/to/analytics_service",
           "run",
           "analytics-service"
         ],
         "env": {
          "UMAMI_API_URL": "https://example.com",
          "UMAMI_USERNAME": "yourUmamiUsername",
          "UMAMI_PASSWORD": "yourUmamiPassword", 
          "UMAMI_TEAM_ID": "yourUmamiTeamId"
        }
       }
     }
   }
   ```
   Replace `/path/to/analytics_service` with the actual path to your analytics_service directory.

   For the UMAMI_API_URL, replace `https://example.com` with the URL of the version of Umami you are using (either self-hosted or hosted on Umami Cloud). 
   For the UMAMI_USERNAME and UMAMI_PASSWORD, replace `yourUmamiUsername` and `yourUmamiPassword` with your Umami account credentials.
   For the UMAMI_TEAM_ID, replace `yourUmamiTeamId` with the ID of the team you want to analyse.

2. **Opening Claude Desktop**

  When you open Claude Desktop, it will automatically begin to connect to the analytics_service MCP server. Allow up to a few minutes as the server is initialised and the correct packages are installed. When the server is ready, you will see 10 MCP tools available in the bottom right of the chat window. This is signified with a small hammer icon and the number 10 next to it.

  ![alt text](docs/images/tools.png)

  Additionally, if you haven't already, it is strongly recommended that you enable the "Analysis tool" in Feature Preview within Claude Desktop. This will allow Claude to build you dashboards as well as other visualisations for your data. To do this, in the left-hand side panel, find the "Feature Preview" tab and in it, enable the "Analysis tool". LaTeX Rendering can also be enabled in the same section.

  ![alt text](docs/images/feature_preview.png)

  ## How to Use the Server
  ### Getting Started

  The simplest way to start is to use the **Create Dashboard Prompt** provided by the server. This is selected by clicking the "Attach from MCP" attachment button at the bottom left of the chat window. Then selecting choose implementation and then the Create Dashboard Prompt.

  ![alt text](docs/videos/prompt_select.gif)

  This will guide you through the process of creating a dashboard for your website, asking for:
  1. The name of the website you want to analyze
  2. The start and end dates for the analysis
  3. The timezone of the website

  Once you have provided this information, the server will generate a txt file instructing Claude how to build the dashboard.
  Press enter in the chat window and Claude will do the rest. You can then ask Claude to make any changes to the dashboard or add any other visualisations.

  ![alt text](docs/videos/dashboard_prompt_demo.gif)

  ### Natural Language Usage

  For a more customisable experience, you can talk directly to Claude and specify your own requirements such as what data you want to see on the dashboard and what visualisations you want to use. Additionally you can analyse user journeys to pinpoint specific pain points and add screenshots from your site to give Claude extra context

  The necessary tools to complete your request will be used by Claude automatically. Simply make your request in natural language and Claude will decide which tools to use. If you want to see a list of all the tools available, you can ask Claude to list them for you or click on the hammer icon in the bottom right of the chat window.
  
  ![alt text](docs/videos/natural_language.gif)
  
  ### Create your own prompts

  You can also create your own prompts for workflows that you use regularly. To do this, you will need to:

1. **Define Your Prompt Structure**
   Create a prompt definition that includes:
   - `name`: A unique identifier for your prompt
   - `description`: A clear explanation of what the prompt does
   - `arguments`: List of input parameters your prompt needs

   Add this to the `list_prompts()` function in `src/analytics_service/server.py`:
   
   Example structure:
   ```python
   @app.list_prompts()
   async def list_prompts():
       return [
           # ... existing prompts ...
           {
               "name": "Your Prompt Name",
               "description": "Your prompt description",
               "arguments": [
                   {
                       "name": "Parameter Name 1",
                       "description": "Parameter description",
                       "required": True/False
                   },
                   {
                       "name": "Parameter Name 2",
                       "description": "Parameter description",
                       "required": True/False
                   }
               ]
           }
       ]
   ```

2. **Implement the Prompt**
   Add your prompt handling logic in the `get_prompt()` function in `src/analytics_service/server.py`:
   ```python
   @app.get_prompt()
   async def get_prompt(name: str, arguments: Any):
    # ... existing prompts ...
       if name == "Your Prompt Name":
           return {
               "messages": [
                   {
                       "role": "user",
                       "content": {
                           "type": "text",
                           "text": f"Your prompt template with {arguments['Parameter Name']}"
                       }
                   }
               ]
           }
   ```

   When defining messages in your prompt, the `role` field is crucial for structuring the conversation:
   - Use `"role": "user"` for messages that simulate user input or questions
   - Use `"role": "assistant"` for messages that represent Claude's responses or instructions
   - Use `"role": "system"` for messages that set context or provide high-level instructions
   
   The `content` field in each message must specify a `type`. Available types are:
   - `"type": "text"` - For plain text content
   - `"type": "resource"` - For including external resources like files, logs, or other data. Must include a `resource` object with:
     - `uri`: The resource identifier
     - `text`: The actual content
     - `mimeType`: The MIME type of the content (e.g., "text/plain", "text/x-python")

   While resources do include their content in the `text` field, using the `resource` type provides several important benefits:
   1. **Content Type Awareness**: The `mimeType` field tells Claude how to interpret the content (e.g., as Python code, plain text, or other formats)
   2. **Source Tracking**: The `uri` field maintains a reference to where the content came from, which can be useful for:
      - Tracking the origin of data
      - Enabling updates if the source changes
      - Providing context about the resource's location and purpose
   3. **Structured Data Handling**: The resource format allows for consistent handling of different types of content while maintaining metadata about each resource

   Here's an example showing different roles and content types:
   ```python
   "messages": [
       {
           "role": "system",
           "content": {
               "type": "text",
               "text": "Analyze the following log file and code for potential issues."
           }
       },
       {
           "role": "user",
           "content": {
               "type": "resource",
               "resource": {
                   "uri": "logs://recent",
                   "text": "[2024-03-14 15:32:11] ERROR: Connection timeout",
                   "mimeType": "text/plain"
               }
           }
       },
       {
           "role": "assistant",
           "content": {
               "type": "text",
               "text": "I notice a connection timeout error. Let me examine the related code."
           }
       },
       {
           "role": "user",
           "content": {
               "type": "resource",
               "resource": {
                   "uri": "file:///code.py",
                   "text": "def example():\n    pass",
                   "mimeType": "text/x-python"
               }
           }
       }
   ]
   ```

   For most prompts, the text type with user role is more than sufficient and allows Claude more control and creativity in its responses. For more complex workflows however, multiple messages with different roles and types allow for a more structured conversation flow and more user control over the response.

3. **Best Practices for Creating Prompts**
   - Make your prompts focused and specific
   - Include clear validation requirements for arguments
   - Use descriptive names for parameters
   - Include example values in parameter descriptions
   - Structure the prompt template to guide Claude effectively
   - Consider error handling and edge cases
   - Test the prompt with various inputs

  
