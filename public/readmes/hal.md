[![MCP Badge](https://lobehub.com/badge/mcp/deanward-hal)](https://lobehub.com/mcp/deanward-hal)

# HAL (HTTP API Layer)

HAL is a Model Context Protocol (MCP) server that provides HTTP API capabilities to Large Language Models. It allows LLMs to make HTTP requests and interact with web APIs through a secure, controlled interface. HAL can also automatically generate tools from OpenAPI/Swagger specifications for seamless API integration.

## Documentation

**[Complete Documentation →](https://deanward.github.io/HAL/documentation/)**

Visit our comprehensive documentation site for detailed guides, examples, and API reference.

## Features

- **HTTP GET/POST/PUT/PATCH/DELETE/OPTIONS/HEAD Requests**: Fetch and send data to any HTTP endpoint
- **Secure Secret Management**: Environment-based secrets with `{secrets.key}` substitution and automatic redaction
- **Swagger/OpenAPI Integration**: Automatically generate tools from API specifications
- **Built-in Documentation**: Self-documenting API reference
- **Secure**: Runs in isolated environment with controlled access
- **Fast**: Built with TypeScript and optimized for performance

## Usage

HAL is designed to work with MCP-compatible clients. Here are some examples:

### Basic Usage (Claude Desktop)

Add HAL to your Claude Desktop configuration (npx will automatically install and run HAL):

```json
{
  "mcpServers": {
    "hal": {
      "command": "npx",
      "args": ["hal-mcp"]
    }
  }
}
```

### With Swagger/OpenAPI Integration and Secrets

To enable automatic tool generation from an OpenAPI specification and use secrets:

```json
{
  "mcpServers": {
    "hal": {
      "command": "npx",
      "args": ["hal-mcp"],
      "env": {
        "HAL_SWAGGER_FILE": "/path/to/your/openapi.json",
        "HAL_API_BASE_URL": "https://api.example.com",
        "HAL_SECRET_API_KEY": "your-secret-api-key",
        "HAL_SECRET_USERNAME": "your-username",
        "HAL_SECRET_PASSWORD": "your-password"
      }
    }
  }
}
```

### Direct Usage

```bash
# Start the HAL server with default tools
npx hal-mcp

# Or with Swagger/OpenAPI integration
HAL_SWAGGER_FILE=/path/to/api.yaml HAL_API_BASE_URL=https://api.example.com npx hal-mcp
```

## Configuration

HAL supports the following environment variables:

- `HAL_SWAGGER_FILE`: Path to OpenAPI/Swagger specification file (JSON or YAML format)
- `HAL_API_BASE_URL`: Base URL for API requests (overrides the servers specified in the OpenAPI spec)
- `HAL_SECRET_*`: Secret values for secure substitution in requests (e.g., `HAL_SECRET_TOKEN=abc123`)
- `HAL_ALLOW_*`: URL restrictions for namespaced secrets (e.g., `HAL_ALLOW_MICROSOFT="https://azure.microsoft.com/*"`)
- `HAL_WHITELIST_URLS`: Comma-separated list of URL patterns that are allowed (if set, only these URLs are permitted)
- `HAL_BLACKLIST_URLS`: Comma-separated list of URL patterns that are blocked (if set, these URLs are denied)

## Secret Management

HAL provides secure secret management to keep sensitive information like API keys, tokens, and passwords out of the conversation while still allowing the AI to use them in HTTP requests.

### How It Works

1. **Environment Variables**: Define secrets using the `HAL_SECRET_` prefix:
   ```bash
   HAL_SECRET_API_KEY=your-secret-api-key
   HAL_SECRET_TOKEN=your-auth-token
   HAL_SECRET_USERNAME=your-username
   ```

2. **Template Substitution**: Reference secrets in your requests using `{secrets.key}` syntax:
   - **URLs**: `https://api.example.com/data?token={secrets.token}`
   - **Headers**: `{"Authorization": "Bearer {secrets.api_key}"}`
   - **Request Bodies**: `{"username": "{secrets.username}", "password": "{secrets.password}"}`

3. **Security**: The AI never sees the actual secret values, only the template placeholders. Values are substituted at request time.

### Automatic Secret Redaction

HAL automatically redacts secret values from all responses sent back to the AI, providing an additional layer of security against credential exposure.

#### How It Works

1. **Secret Tracking**: HAL maintains a registry of all secret values from environment variables
2. **Response Scanning**: All HTTP responses (headers, bodies, error messages) are scanned for secret values
3. **Automatic Replacement**: Any occurrence of actual secret values is replaced with `[REDACTED]` before sending to the AI
4. **Comprehensive Coverage**: Redaction applies to:
   - Error messages (including URL parsing errors that might expose credentials)
   - Response headers (in case APIs echo back authentication data)
   - Response bodies (protecting against API responses that might include sensitive data)
   - All other text returned to the AI

#### Example Protection

**Before (vulnerable):**
```
Error: Request cannot be constructed from a URL that includes credentials: 
https://65GQiI8-1JCOWV1KAuYr0g:-VOIfpydl2GWfucCdEJ1BJ2vrsJyjQ@www.reddit.com/api/v1/access_token
```

**After (secure):**
```
Error: Request cannot be constructed from a URL that includes credentials: 
https://[REDACTED]:[REDACTED]@www.reddit.com/api/v1/access_token
```

This protection is automatic and requires no configuration - HAL will redact any secret values regardless of how they appear in responses, ensuring that even if an API or error message attempts to expose credentials, the AI never sees the actual values.

### Namespaces and URL Restrictions

HAL supports organizing secrets into namespaces and restricting them to specific URLs for enhanced security:

#### Namespace Convention

Use `-` for namespace separators and `_` for word separators within keys:

```bash
# Single namespace
HAL_SECRET_MICROSOFT_API_KEY=your-api-key
# Usage: {secrets.microsoft.api_key}

# Multi-level namespaces
HAL_SECRET_AZURE-STORAGE_ACCESS_KEY=your-storage-key
HAL_SECRET_AZURE-COGNITIVE_API_KEY=your-cognitive-key
HAL_SECRET_GOOGLE-CLOUD-STORAGE_SERVICE_ACCOUNT_KEY=your-service-key
# Usage: {secrets.azure.storage.access_key}
# Usage: {secrets.azure.cognitive.api_key}
# Usage: {secrets.google.cloud.storage.service_account_key}
```

#### URL Restrictions

Restrict namespaced secrets to specific URLs using `HAL_ALLOW_*` environment variables:

```bash
# Restrict Microsoft secrets to Microsoft domains
HAL_SECRET_MICROSOFT_API_KEY=your-api-key
HAL_ALLOW_MICROSOFT="https://azure.microsoft.com/*,https://*.microsoft.com/*"

# Restrict Azure Storage secrets to Azure storage endpoints
HAL_SECRET_AZURE-STORAGE_ACCESS_KEY=your-storage-key
HAL_ALLOW_AZURE-STORAGE="https://*.blob.core.windows.net/*,https://*.queue.core.windows.net/*"

# Multiple URLs are comma-separated
HAL_SECRET_GOOGLE-CLOUD_API_KEY=your-google-key
HAL_ALLOW_GOOGLE-CLOUD="https://*.googleapis.com/*,https://*.googlecloud.com/*"
```

#### How Parsing Works

Understanding how environment variable names become template keys:

```
HAL_SECRET_AZURE-STORAGE_ACCESS_KEY
│         │              │
│         │              └─ Key: "ACCESS_KEY" → "access_key" 
│         └─ Namespace: "AZURE-STORAGE" → "azure.storage"
└─ Prefix

Final template: {secrets.azure.storage.access_key}
```

**Step-by-step breakdown:**
1. Remove `HAL_SECRET_` prefix → `AZURE-STORAGE_ACCESS_KEY`
2. Split on first `_` → Namespace: `AZURE-STORAGE`, Key: `ACCESS_KEY`
3. Transform namespace: `AZURE-STORAGE` → `azure.storage` (dashes become dots, lowercase)
4. Transform key: `ACCESS_KEY` → `access_key` (underscores stay, lowercase)
5. Combine: `{secrets.azure.storage.access_key}`

#### More Examples

```bash
# Simple namespace
HAL_SECRET_GITHUB_TOKEN=your_token
→ {secrets.github.token}

# Two-level namespace  
HAL_SECRET_AZURE-COGNITIVE_API_KEY=your_key
→ {secrets.azure.cognitive.api_key}

# Three-level namespace
HAL_SECRET_GOOGLE-CLOUD-STORAGE_SERVICE_ACCOUNT=your_account
→ {secrets.google.cloud.storage.service_account}

# Complex key with underscores
HAL_SECRET_AWS-S3_BUCKET_ACCESS_KEY_ID=your_id
→ {secrets.aws.s3.bucket_access_key_id}

# No namespace (legacy style)
HAL_SECRET_API_KEY=your_key
→ {secrets.api_key}
```

#### Visual Guide: Complete Flow

```
Environment Variable          Template Usage                   URL Restriction
├─ HAL_SECRET_MICROSOFT_API_KEY    ├─ {secrets.microsoft.api_key}    ├─ HAL_ALLOW_MICROSOFT
├─ HAL_SECRET_AZURE-STORAGE_KEY    ├─ {secrets.azure.storage.key}    ├─ HAL_ALLOW_AZURE-STORAGE  
├─ HAL_SECRET_AWS-S3_ACCESS_KEY    ├─ {secrets.aws.s3.access_key}    ├─ HAL_ALLOW_AWS-S3
└─ HAL_SECRET_UNRESTRICTED_TOKEN   └─ {secrets.unrestricted.token}   └─ (no restriction)
```

#### Security Benefits

- **Principle of Least Privilege**: Secrets only work with their intended services
- **Prevents Cross-Service Leakage**: Azure secrets can't be sent to AWS APIs
- **Defense in Depth**: Even with AI errors or prompt injection, secrets are constrained
- **Clear Organization**: Namespace structure makes secret management more intuitive

#### Real-World Usage Scenarios

**Scenario 1: Multi-Cloud Application**
```bash
# Azure services
HAL_SECRET_AZURE-STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;...
HAL_SECRET_AZURE-COGNITIVE_SPEECH_KEY=abcd1234...
HAL_ALLOW_AZURE-STORAGE="https://*.blob.core.windows.net/*,https://*.queue.core.windows.net/*"
HAL_ALLOW_AZURE-COGNITIVE="https://*.cognitiveservices.azure.com/*"

# AWS services  
HAL_SECRET_AWS-S3_ACCESS_KEY=AKIA...
HAL_SECRET_AWS-LAMBDA_API_KEY=lambda_key...
HAL_ALLOW_AWS-S3="https://s3.*.amazonaws.com/*,https://*.s3.amazonaws.com/*"
HAL_ALLOW_AWS-LAMBDA="https://*.lambda.amazonaws.com/*"

# Google Cloud
HAL_SECRET_GOOGLE-CLOUD_SERVICE_ACCOUNT_KEY={"type":"service_account"...}
HAL_ALLOW_GOOGLE-CLOUD="https://*.googleapis.com/*"
```

**Usage in requests:**
```json
{
  "url": "https://mystorageaccount.blob.core.windows.net/container/file",
  "headers": {
    "Authorization": "Bearer {secrets.azure.storage.connection_string}"
  }
}
```
✅ **Works**: URL matches Azure Storage pattern  
❌ **Blocked**: If used with `https://s3.amazonaws.com/bucket` - wrong service!

**Scenario 2: Development vs Production**
```bash
# Development environment
HAL_SECRET_DEV-API_KEY=dev_key_123
HAL_ALLOW_DEV-API="https://dev-api.example.com/*,https://staging-api.example.com/*"

# Production environment  
HAL_SECRET_PROD-API_KEY=prod_key_456
HAL_ALLOW_PROD-API="https://api.example.com/*"
```

**Scenario 3: Department Isolation**
```bash
# Marketing team APIs
HAL_SECRET_MARKETING-CRM_API_KEY=crm_key...
HAL_SECRET_MARKETING-ANALYTICS_TOKEN=analytics_token...
HAL_ALLOW_MARKETING-CRM="https://api.salesforce.com/*"
HAL_ALLOW_MARKETING-ANALYTICS="https://api.googleanalytics.com/*"

# Engineering team APIs
HAL_SECRET_ENGINEERING-GITHUB_TOKEN=ghp_...
HAL_SECRET_ENGINEERING-JIRA_API_KEY=jira_key...
HAL_ALLOW_ENGINEERING-GITHUB="https://api.github.com/*"
HAL_ALLOW_ENGINEERING-JIRA="https://*.atlassian.net/*"
```

#### Error Examples

When URL restrictions are violated, you get clear error messages:

```
❌ Error: Secret 'azure.storage.access_key' (namespace: AZURE-STORAGE) is not allowed for URL 'https://api.github.com/user'. 
   Allowed patterns: https://*.blob.core.windows.net/*, https://*.queue.core.windows.net/*
```

This helps you quickly identify:
- Which secret was blocked
- What URL was attempted  
- What URLs are actually allowed

#### Quick Reference

| Environment Variable | Template Usage | URL Restriction |
|---------------------|----------------|-----------------|
| `HAL_SECRET_GITHUB_TOKEN` | `{secrets.github.token}` | `HAL_ALLOW_GITHUB` |
| `HAL_SECRET_AZURE-STORAGE_KEY` | `{secrets.azure.storage.key}` | `HAL_ALLOW_AZURE-STORAGE` |
| `HAL_SECRET_AWS-S3_ACCESS_KEY` | `{secrets.aws.s3.access_key}` | `HAL_ALLOW_AWS-S3` |
| `HAL_SECRET_GOOGLE-CLOUD_API_KEY` | `{secrets.google.cloud.api_key}` | `HAL_ALLOW_GOOGLE-CLOUD` |

**Pattern**: `HAL_SECRET_<NAMESPACE>_<KEY>` → `{secrets.<namespace>.<key>}` + `HAL_ALLOW_<NAMESPACE>`

#### Backward Compatibility

Non-namespaced secrets (without URL restrictions) continue to work as before:

```bash
HAL_SECRET_API_KEY=your-key
# Usage: {secrets.api_key} - works with any URL (no restrictions)
```

## URL Filtering

HAL supports global URL filtering to control which URLs can be accessed through whitelist or blacklist patterns. This provides an additional security layer beyond the namespace-based secret restrictions.

### Whitelist Mode

When `HAL_WHITELIST_URLS` is set, **only** URLs matching the specified patterns are allowed:

```bash
# Only allow requests to GitHub and Google APIs
HAL_WHITELIST_URLS="https://api.github.com/*,https://*.googleapis.com/*"
```

### Blacklist Mode

When `HAL_BLACKLIST_URLS` is set, all URLs are allowed **except** those matching the specified patterns:

```bash
# Block requests to internal networks and localhost
HAL_BLACKLIST_URLS="http://localhost:*,https://192.168.*,https://10.*,https://172.16.*"
```

### Pattern Syntax

URL patterns support wildcard matching using `*`:

- `https://api.example.com/*` - Matches any path under the API
- `https://*.example.com/*` - Matches any subdomain
- `*://internal.company.com/*` - Matches any protocol

### Important Notes

- **Whitelist takes precedence**: If both `HAL_WHITELIST_URLS` and `HAL_BLACKLIST_URLS` are set, the whitelist is used and a warning is logged
- **Global filtering**: This applies to all HTTP requests, regardless of secrets or tools used
- **Case-insensitive**: URL pattern matching is case-insensitive
- **No filtering by default**: If neither environment variable is set, all URLs are allowed

### Examples

```bash
# Production environment - only allow specific APIs
HAL_WHITELIST_URLS="https://api.stripe.com/*,https://*.googleapis.com/*,https://api.github.com/*"

# Development environment - block internal services
HAL_BLACKLIST_URLS="http://localhost:*,https://192.168.*,https://admin.internal.com/*"

# Restrictive setup - only allow HTTPS to specific domains
HAL_WHITELIST_URLS="https://api.trusted-service.com/*,https://webhooks.trusted-service.com/*"
```

### Example Usage

```json
{
  "url": "https://api.github.com/user",
  "headers": {
    "Authorization": "Bearer {secrets.github_token}",
    "Accept": "application/vnd.github.v3+json"
  }
}
```

The `{secrets.github_token}` will be replaced with the value of `HAL_SECRET_GITHUB_TOKEN` environment variable before making the request.

## Available Tools

### Built-in HTTP Tools

These tools are always available regardless of configuration:

#### `list-secrets`

Get a list of available secret keys that can be used with `{secrets.key}` syntax.

**Parameters:** None

**Example Response:**
```
Available secrets (3 total):

You can use these secret keys in your HTTP requests using the {secrets.key} syntax:

1. {secrets.api_key}
2. {secrets.github_token}  
3. {secrets.username}

Usage examples:
- URL: "https://api.example.com/data?token={secrets.api_key}"
- Header: {"Authorization": "Bearer {secrets.api_key}"}
- Body: {"username": "{secrets.username}"}
```

**Security Note:** Only shows the key names, never the actual secret values.

#### `http-get`

Make HTTP GET requests to any URL.

**Parameters:**
- `url` (string, required): The URL to request
- `headers` (object, optional): Additional headers to send

**Example:**
```json
{
  "url": "https://api.github.com/user",
  "headers": {
    "Authorization": "Bearer {secrets.github_token}",
    "Accept": "application/vnd.github.v3+json"
  }
}
```

#### `http-post`

Make HTTP POST requests with optional body and headers.

**Parameters:**
- `url` (string, required): The URL to request
- `body` (string, optional): Request body content
- `headers` (object, optional): Additional headers to send
- `contentType` (string, optional): Content-Type header (default: "application/json")

**Example:**
```json
{
  "url": "https://api.example.com/data",
  "body": "{\"message\": \"Hello, World!\", \"user\": \"{secrets.username}\"}",
  "headers": {
    "Authorization": "Bearer {secrets.api_key}"
  },
  "contentType": "application/json"
}
```

### Auto-generated Swagger/OpenAPI Tools

When you provide a Swagger/OpenAPI specification via `HAL_SWAGGER_FILE`, HAL will automatically generate tools for each endpoint defined in the specification. These tools are named using the pattern `swagger_{operationId}` and include:

- **Automatic parameter validation** based on the OpenAPI schema
- **Path parameter substitution** (e.g., `/users/{id}` → `/users/123`)
- **Query parameter handling**
- **Request body support** for POST/PUT/PATCH operations
- **Proper HTTP method mapping**

For example, if your OpenAPI spec defines an operation with `operationId: "getUser"`, HAL will create a tool called `swagger_getUser` that you can use directly.

## Available Resources

### `docs://hal/api`

Access comprehensive API documentation and usage examples, including documentation for any auto-generated Swagger tools.

## OpenAPI/Swagger Integration Details

### Supported OpenAPI Features

- ✅ OpenAPI 3.x and Swagger 2.x specifications
- ✅ JSON and YAML format support
- ✅ Path parameters (`/users/{id}`)
- ✅ Query parameters
- ✅ Request body (JSON, form-encoded)
- ✅ All HTTP methods (GET, POST, PUT, PATCH, DELETE, etc.)
- ✅ Parameter validation (string, number, boolean, arrays)
- ✅ Required/optional parameter handling
- ✅ Custom headers support

### Example OpenAPI Integration

Given this OpenAPI specification:

```yaml
openapi: 3.0.0
info:
  title: Example API
  version: 1.0.0
servers:
  - url: https://api.example.com/v1
paths:
  /users/{id}:
    get:
      operationId: getUser
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Success
```

HAL will automatically create a `swagger_getUser` tool that the LLM can use like:

```json
{
  "id": "123"
}
```

This will make a GET request to `https://api.example.com/v1/users/123`.

## Development

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/hal-mcp.git
cd hal-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev
```

### Scripts

- `npm run build` - Build the TypeScript project
- `npm run dev` - Run in development mode with hot reload
- `npm start` - Start the built server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Security Considerations

- HAL makes actual HTTP requests to external services
- Use appropriate authentication and authorization for your APIs
- Be mindful of rate limits and API quotas
- Consider network security and firewall rules
- When using Swagger integration, ensure your OpenAPI specifications are from trusted sources

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with the [Model Context Protocol TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- Inspired by the need for LLMs to interact with web APIs safely and efficiently
- OpenAPI integration powered by [swagger-parser](https://github.com/APIDevTools/swagger-parser) 
