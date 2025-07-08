# Me MCP Server

A MCP (Model Context Protocol) server for learning about and interacting with YOU.

## Features

This MCP server provides the following capabilities:

### Prompts
- **JobSearch** - Generate job search instructions tailored to your profile with specified salary range, location, and company type preferences.

### Resources
- **Resume Text** - Access your full resume text (`candidate-info://resume`)
- **Resume URL** - Get the URL to your resume PDF (`candidate-info://resume-url`)
- **LinkedIn Profile URL** - Access your LinkedIn profile (`candidate-info://linkedin-url`)
- **GitHub Profile URL** - Access your GitHub profile (`candidate-info://github-url`)
- **Website URL** - Get your personal website URL (`candidate-info://website-url`)
- **Website Contents** - Fetch and analyze the HTML contents of your website (`candidate-info://website-contents`)

## Running the server

### Using Docker

The easiest way to run the server is using Docker Compose:

```bash
docker-compose up -d
```

This will start the server on port 3000.

## Transport Options

This MCP server supports two different transport mechanisms:

### SSE (Server-Sent Events) Transport

The SSE transport allows the server to communicate over HTTP with clients that support server-sent events. This is useful for web-based clients or any client that can establish an HTTP connection.

To run the server with SSE transport:

```bash
dart bin/sse_server.dart
```

The SSE server will start on the configured host and port (default: 0.0.0.0:3000).

### Stdio Transport

The Stdio transport uses standard input/output streams for communication. This is ideal for integration with desktop clients like Claude Desktop that launch the MCP server as a subprocess.

To run the server with Stdio transport:

```bash
dart bin/stdio_server.dart
```

#### Configuring Claude Desktop

To use the MCP server with Claude Desktop, add the following to your Claude configuration:

```json
{
  "mcpServers": {
    "me_mcp": {
      "command": "dart",
      "args": [
        "path/to/bin/stdio_server.dart"
      ]
    }
  }
}
```

Alternatively, you can compile the server to a standalone executable:

```bash
dart compile exe bin/stdio_server.dart -o ./mcp_server
```

And then configure Claude Desktop to use the compiled version:

```json
{
  "mcpServers": {
    "me_mcp": {
      "command": "path/to/mcp_server"
    }
  }
}
```

## Configuration

The server uses a hybrid configuration approach:

1. **Server settings** - Configured using environment variables
2. **Personal information** - Configured using a `me.yaml` file

### Environment Variables

Server-related settings are configured through environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| HOST | Host address to bind to | 0.0.0.0 |
| PORT | Port to listen on | 3000 |
| ENVIRONMENT | Environment (development, production) | development |

### YAML Configuration

Personal information and job search preferences are configured through the `me.yaml` file.

#### Initializing Configuration

To create a default configuration file:

```bash
dart bin/me_init.dart [path]
```

This will generate a `me.yaml` file (or at the specified path) with default values that you can edit.

#### Example Configuration

```yaml
# Personal information
name: Jake Gaylor
resume_url: https://example.com/resume.pdf
website_url: https://jakegaylor.com
linkedin_url: https://linkedin.com/in/jakegaylor
github_url: https://github.com/jhgaylor

# Optional content (can be loaded from URLs above if not specified)
resume_text: |
  Jake Gaylor
  Software Engineer

  Experience:
  - Example Company (2020-Present)
    Senior Software Engineer
  
  Skills:
  - Dart, JavaScript, TypeScript
  - Cloud Infrastructure

website_text: ""  # Will be fetched from website_url if empty

# Job search preferences
job_search:
  min_salary: 150000
  max_salary: 250000
  location: Remote
  company_type: Startup
  industry: Technology
  description: "Looking for senior engineering roles with focus on cloud infrastructure"
```

### YAML Configuration Options

| Section | Option | Description | Default |
|---------|--------|-------------|---------|
| - | name | Your profile/candidate name | Jane Smith |
| - | resume_url | URL to the resume | https://example.com/resume.pdf |
| - | linkedin_url | URL to LinkedIn profile | https://linkedin.com/in/example |
| - | github_url | URL to GitHub profile | https://github.com/example |
| - | website_url | URL to personal website | https://example.com |
| - | resume_text | Full text content of the resume | An empty resume. |
| job_search | min_salary | Minimum salary for job search | 100000 |
| job_search | max_salary | Maximum salary for job search | 500000 |
| job_search | location | Preferred job location | Remote |
| job_search | company_type | Preferred company type | Startup |
| job_search | industry | Preferred industry | Technology |
| job_search | description | Additional job search details | "" |

### Type-Safe Configuration (For Developers)

The YAML configuration is parsed into strongly-typed Dart objects:

```dart
import 'package:me_mcp_server/me_mcp_server.dart';

// Create a configuration programmatically
final config = MeConfig(
  name: 'Jane Smith',
  resumeUrl: 'https://example.com/resume.pdf',
  jobSearch: JobSearchConfig(
    minSalary: 150000,
    maxSalary: 250000,
    location: 'Remote',
  ),
);

// Convert to YAML
final yamlString = configToYaml(config);
```

### Running Locally

To run the server locally:

1. Ensure you have Dart SDK 3.7.2 or later installed
2. Install dependencies: `dart pub get`
3. Create a `me.yaml` file in the root directory with your configuration
   ```bash
   dart bin/me_init.dart
   ```
4. Set any environment variables as needed
5. Run the server with your preferred transport: 
   - SSE: `dart bin/sse_server.dart`
   - Stdio: `dart bin/stdio_server.dart`

## Development

### Building the Docker Image

```bash
docker build -t jhgaylor/me-mcp-server:local .
```

### Running the Docker Image

```bash
docker run -p 3000:3000 \
  -v $(pwd)/me.yaml:/app/me.yaml \
  -e PORT=3000 \
  -e ENVIRONMENT=production \
  jhgaylor/me-mcp-server:local
```

## Docker Configuration

When using Docker, you can:

1. **Mount your me.yaml file**:
   ```bash
   -v $(pwd)/me.yaml:/app/me.yaml
   ```

2. **Set environment variables**:
   ```bash
   -e HOST=0.0.0.0 -e PORT=3000 -e ENVIRONMENT=production
   ```

3. **Use docker-compose.yml**:
   ```yaml
   services:
     mcp-server:
       volumes:
         - ./me.yaml:/app/me.yaml
       environment:
         - HOST=0.0.0.0
         - PORT=3000
         - ENVIRONMENT=production
   ```

## Deployment Examples

### Deploying to a Custom Domain

You can deploy this MCP server to your own domain. Here's an example of a deployment that runs at `mcp.jakegaylor.com`:

- GitHub Repository: [jhgaylor/jakegaylor-com-mcp-server](https://github.com/jhgaylor/jakegaylor-com-mcp-server)

