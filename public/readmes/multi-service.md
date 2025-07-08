** NOTE: This project is no longer being maintained, as issues with model memory for smaller models means my preferred method for MCP servers is as individual containerized server providers rather than a monolithic routing provider.  Code is being kept up in case others still want to try to go down this route.




# Model Context Protocol (MCP) Server

A modular server that implements the [Model Context Protocol](https://modelcontextprotocol.io/) standard, providing tools for GitHub, GitLab, Google Maps, Memory storage, and Puppeteer web automation.

## Architecture

The MCP server is built with a modular architecture, where each tool is implemented as a separate module. The server provides a unified gateway that routes requests to the appropriate tool.

![MCP Server Architecture](./architecture.png)

## Features

- **MCP Gateway**: A unified endpoint for all tool requests following the MCP standard
- **MCP Manifest**: An endpoint that describes all available tools and their capabilities
- **Direct Tool Access**: Each tool can be accessed directly via its own API endpoints
- **Modular Design**: Easy to add or remove tools as needed

### Included Tools

1. **GitHub Tool**: Interact with GitHub repositories, issues, and search
2. **GitLab Tool**: Interact with GitLab projects, issues, and pipelines
3. **Google Maps Tool**: Geocoding, directions, and places search
4. **Memory Tool**: Store and retrieve data persistently
5. **Puppeteer Tool**: Take screenshots, generate PDFs, and extract content from websites

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- A Red Hat-based Linux distribution (RHEL, CentOS, Fedora) or any Linux/macOS system

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/mcp-server.git
   cd mcp-server
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install Node.js dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file with your configuration:
   ```
   SECRET_KEY=your-secret-key
   DEBUG=False
   
   # GitHub configuration
   GITHUB_TOKEN=your-github-token
   
   # GitLab configuration
   GITLAB_TOKEN=your-gitlab-token
   
   # Google Maps configuration
   GMAPS_API_KEY=your-google-maps-api-key
   
   # Memory configuration
   MEMORY_DB_URI=sqlite:///memory.db
   
   # Puppeteer configuration
   PUPPETEER_HEADLESS=true
   CHROME_PATH=/usr/bin/chromium-browser
   ```

5. Start the server:
   ```bash
   python app.py
   ```

### Containerized Deployment

You can run the server using either Docker or Podman (Red Hat's container engine).

#### Docker Deployment

If you already have Docker and docker-compose installed:

1. Build the Docker image:
   ```bash
   docker build -t mcp-server .
   ```

2. Run the container:
   ```bash
   docker run -p 5000:5000 --env-file .env mcp-server
   ```

3. Alternatively, use docker-compose:
   
   Create a `docker-compose.yml` file:
   ```yaml
   version: '3'
   services:
     mcp-server:
       build: .
       ports:
         - "5000:5000"
       volumes:
         - ./data:/app/data
       env_file:
         - .env
       restart: unless-stopped
   ```

   Then run:
   ```bash
   docker-compose up -d
   ```

#### Podman Deployment

For Red Hat based systems (RHEL, CentOS, Fedora) using Podman:

1. Build the container image:
   ```bash
   podman build -t mcp-server .
   ```

2. Run the container:
   ```bash
   podman run -p 5000:5000 --env-file .env mcp-server
   ```

3. If you need persistent storage:
   ```bash
   mkdir -p ./data
   podman run -p 5000:5000 --env-file .env -v ./data:/app/data:Z mcp-server
   ```
   Note: The `:Z` suffix is important for SELinux-enabled systems.

4. Using Podman Compose (if installed):
   ```bash
   # Install podman-compose if needed
   pip install podman-compose
   
   # Use the same docker-compose.yml file as above
   podman-compose up -d
   ```

## Using the MCP Server

### MCP Gateway

The MCP Gateway is the main endpoint for accessing all tools using the MCP standard.

**Endpoint**: `POST /mcp/gateway`

**Request format**:
```json
{
  "tool": "github",
  "action": "listRepos",
  "parameters": {
    "username": "octocat"
  }
}
```

**Response format**:
```json
{
  "tool": "github",
  "action": "listRepos",
  "status": "success",
  "result": [
    {
      "id": 1296269,
      "name": "Hello-World",
      "full_name": "octocat/Hello-World",
      "owner": {
        "login": "octocat",
        "id": 1
      },
      ...
    }
  ]
}
```

### MCP Manifest

The MCP Manifest describes all available tools and their capabilities.

**Endpoint**: `GET /mcp/manifest`

**Response format**:
```json
{
  "manifestVersion": "1.0",
  "tools": {
    "github": {
      "actions": {
        "listRepos": {
          "description": "List repositories for a user or organization",
          "parameters": {
            "username": {
              "type": "string",
              "description": "GitHub username or organization name"
            }
          },
          "returns": {
            "type": "array",
            "description": "List of repository objects"
          }
        },
        ...
      }
    },
    ...
  }
}
```

### Direct Tool Access

Each tool can also be accessed directly via its own API endpoints:

- GitHub: `/tool/github/...`
- GitLab: `/tool/gitlab/...`
- Google Maps: `/tool/gmaps/...`
- Memory: `/tool/memory/...`
- Puppeteer: `/tool/puppeteer/...`

See the API documentation for each tool for details on the available endpoints.

## Tool Documentation

### GitHub Tool

The GitHub tool provides access to the GitHub API for repositories, issues, and search.

**Actions**:
- `listRepos`: List repositories for a user or organization
- `getRepo`: Get details for a specific repository
- `searchRepos`: Search for repositories
- `getIssues`: Get issues for a repository
- `createIssue`: Create a new issue in a repository

### GitLab Tool

The GitLab tool provides access to the GitLab API for projects, issues, and pipelines.

**Actions**:
- `listProjects`: List all projects accessible by the authenticated user
- `getProject`: Get details for a specific project
- `searchProjects`: Search for projects on GitLab
- `getIssues`: Get issues for a project
- `createIssue`: Create a new issue in a project
- `getPipelines`: Get pipelines for a project

### Google Maps Tool

The Google Maps tool provides access to the Google Maps API for geocoding, directions, and places search.

**Actions**:
- `geocode`: Convert an address to geographic coordinates
- `reverseGeocode`: Convert geographic coordinates to an address
- `getDirections`: Get directions between two locations
- `searchPlaces`: Search for places using the Google Places API
- `getPlaceDetails`: Get details for a specific place

### Memory Tool

The Memory tool provides a persistent key-value store for storing and retrieving data.

**Actions**:
- `get`: Get a memory item by key
- `set`: Create or update a memory item
- `delete`: Delete a memory item by key
- `list`: List all memory items, with optional filtering
- `search`: Search memory items by value

### Puppeteer Tool

The Puppeteer tool provides web automation capabilities for taking screenshots, generating PDFs, and extracting content from websites.

**Actions**:
- `screenshot`: Take a screenshot of a webpage
- `pdf`: Generate a PDF of a webpage
- `extract`: Extract content from a webpage

## Contributing

Contributions are welcome! Here's how you can extend the MCP server:

### Adding a New Tool

1. Create a new file in the `tools` directory, e.g., `tools/newtool_tool.py`
2. Implement the tool with actions following the same pattern as existing tools
3. Add the tool to the manifest in `app.py`
4. Register the tool's blueprint in `tools/__init__.py`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Model Context Protocol](https://modelcontextprotocol.io/) for the standard specification
- [Flask](https://flask.palletsprojects.com/) for the web framework
- [Puppeteer](https://pptr.dev/) for web automation
