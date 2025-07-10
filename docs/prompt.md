# MCP Server Database Entry Generator

## Context
You are helping to add a new MCP (Model Context Protocol) server to a database that manages over 200+ MCP servers. The database is used by developers to discover, install, and configure MCP servers for AI workflows.

## Your Task
Analyze the provided GitHub repository README and generate a properly structured JSON entry for the MCP servers database. Follow the exact schema and guidelines below.

## Database Schema
Each MCP server entry must follow this exact JSON structure:

```json
{
  "server-key": {
    "name": "Display Name",
    "githubLink": "https://github.com/owner/repo",
    "package": "npm-package-name OR python-package-name",
    "description": "Concise description (max 100 chars)",
    "installCommand": "npx -y package-name OR uvx package-name OR pip install package",
    "requiredEnvVars": ["ENV_VAR1", "ENV_VAR2"],
    "optionalParams": ["OPTIONAL_PARAM1"],
    "defaultEnvVars": {
      "PARAM_NAME": "default_value"
    },
    "usageInstructions": "How to use this server effectively",
    "category": "Category Name",
    "stars": 0,
    "lastStarUpdate": "2025-07-08T00:00:00.000Z",
    "logo": "",
    "updated_at": "2025-07-08T00:00:00.000Z"
  }
}
```

## Field Requirements

### Required Fields

1. **server-key** (JSON key)
   - Use lowercase, kebab-case
   - Should match the main package/repo name
   - Examples: `filesystem`, `github-mcp`, `brave-search`

2. **name** (string)
   - Human-readable display name
   - Title case, clear and concise
   - Examples: "Filesystem", "GitHub Integration", "Brave Search"

3. **githubLink** (string)
   - Full GitHub repository URL
   - Must start with `https://github.com/`
   - For monorepos, link to the specific server directory

4. **package** (string)
   - npm package name (for Node.js servers)
   - Python package name (for Python servers)
   - Use exact package name from package.json or pyproject.toml

5. **description** (string)
   - Concise, action-oriented description
   - Maximum 100 characters
   - Focus on what the server does, not how
   - Examples: "Local filesystem operations", "GitHub repository management"

6. **installCommand** (string)
   - Complete installation command users can copy-paste
   - Use `npx -y` for npm packages
   - Use `uvx` for Python packages (preferred)
   - Use `pip install` only if uvx is not supported

7. **category** (string)
   - Choose from existing categories or create new logical ones
   - Common categories: "Development", "AI/ML", "Databases", "Cloud Services", "Web Scraping", "File Management", "Version Control", "Automation", "Communication", "Security"

### Optional Fields

8. **requiredEnvVars** (array)
   - Environment variables that MUST be set
   - Only include truly required variables
   - Use UPPERCASE_WITH_UNDERSCORES format

9. **optionalParams** (array)
   - Optional configuration parameters
   - Include commonly used optional settings

10. **defaultEnvVars** (object)
    - Default values for environment variables
    - Only include if defaults are provided by the server

11. **usageInstructions** (string)
    - Brief guidance on effective usage
    - Focus on key workflows or important setup steps

## Installation Command Patterns

### Node.js/npm packages:
```bash
npx -y @modelcontextprotocol/server-filesystem
npx -y package-name
```

### Python packages:
```bash
uvx mcp-server-git
uvx package-name
pip install package-name  # only if uvx not supported
```

### Special installations:
```bash
python -m package_name run mcp
node server.js
```

## Category Guidelines

Choose the most appropriate category:

- **Development**: General development tools, IDEs, build tools
- **AI/ML**: Machine learning, AI services, model APIs
- **Databases**: Database connections, ORMs, data management
- **Cloud Services**: AWS, Azure, GCP, cloud APIs
- **Web Scraping**: Web crawling, content fetching, browser automation
- **File Management**: Filesystem operations, file processing
- **Version Control**: Git, SVN, repository management
- **Automation**: Workflow automation, task scheduling
- **Communication**: Slack, Discord, email, messaging
- **Security**: Authentication, encryption, security tools
- **Analytics**: Data analysis, monitoring, metrics
- **Documentation**: Wiki, docs generation, knowledge management

## Analysis Instructions

1. **Read the README carefully** to understand:
   - What the server does
   - How to install it
   - Required configuration
   - Environment variables needed

2. **Extract installation info** from:
   - Installation sections
   - Quick start guides
   - Configuration examples
   - Package.json or pyproject.toml references

3. **Identify the package name** from:
   - npm install commands
   - pip install commands
   - Package manager configurations
   - Repository structure

4. **Determine environment variables** from:
   - Configuration sections
   - Environment variable lists
   - Setup instructions
   - Code examples

5. **Categorize appropriately** based on:
   - Primary functionality
   - Target use cases
   - Integration patterns

## Output Format

Provide your response in this exact format:

```json
{
  "server-key": {
    "name": "Server Name",
    "githubLink": "https://github.com/owner/repo",
    "package": "package-name",
    "description": "Description under 100 chars",
    "installCommand": "npx -y package-name",
    "requiredEnvVars": [],
    "optionalParams": [],
    "usageInstructions": "Usage guidance",
    "category": "Category Name",
    "stars": 0,
    "lastStarUpdate": "2025-07-08T00:00:00.000Z",
    "logo": "",
    "updated_at": "2025-07-08T00:00:00.000Z"
  }
}
```

## Quality Checklist

Before submitting, verify:
- [ ] server-key is lowercase kebab-case
- [ ] name is clear and concise
- [ ] description is under 100 characters
- [ ] installCommand is copy-pasteable
- [ ] category matches existing patterns
- [ ] All required fields are present
- [ ] JSON is valid and properly formatted
- [ ] Environment variables are accurately identified
- [ ] Installation command matches the package type

## Common Mistakes to Avoid

❌ **Don't:**
- Use camelCase or spaces in server-key
- Include version numbers in package names
- Make descriptions too long or vague
- Include optional env vars in requiredEnvVars
- Create new categories unnecessarily
- Include installation flags that aren't needed

✅ **Do:**
- Keep descriptions action-oriented
- Use exact package names from repositories
- Choose the most specific appropriate category
- Include only truly required environment variables
- Make install commands copy-pasteable
- Follow existing naming patterns

Now analyze the provided README and generate the structured JSON entry following this schema exactly.