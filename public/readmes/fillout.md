# Fillout.io MCP Server

MCP Server for the Fillout.io API, enabling form management, response handling, and analytics.

## Token Setup

1. Get your Fillout.io API Key:
   - Log in to your Fillout.io account
   - Go to Account Settings → API & Webhooks
   - Click "Create new API Key"
   - Copy your new API key

2. API Key Information:
   - Production keys start with `fo_live_`
   - Test keys start with `fo_test_`
   - Test keys only work with test forms
   - API keys provide access to all resources in your account

3. Replace `your-fillout-api-key` in the configuration with your API key.

⚠️ Security Notes:
- Keep your API key secure and private
- Use test keys for development
- Store keys in environment variables
- Rotate keys periodically
- Never commit keys to version control

## Token Troubleshooting

### Common Error Messages

1. "Invalid API key provided" or "Authentication failed"
   - **Cause**: API key is missing, malformed, or invalid
   - **Solution**: 
     - Verify key starts with `fo_live_` or `fo_test_`
     - Check for extra spaces or characters
     - Ensure environment variable is set correctly
     - Create a new key if necessary

2. "Test mode key used with live form"
   - **Cause**: Using test key (`fo_test_`) with production form
   - **Solution**:
     - Use live key for production forms
     - Create test form for development
     - Switch to appropriate key type

3. "Rate limit exceeded"
   - **Cause**: Too many API requests
   - **Solution**:
     - Implement request throttling
     - Check usage in dashboard
     - Optimize request patterns

### Validation Steps

1. Check API Key Format:
   ```bash
   # Key should:
   - Start with 'fo_live_' or 'fo_test_'
   - Be approximately 50 characters
   - Contain only letters, numbers, and underscores
   ```

2. Test API Key:
   ```bash
   curl -H "Authorization: Bearer your-api-key" \
     https://api.fillout.com/v1/api/forms
   ```

## Features

### Form Management
- List all forms
- Get form details
- Create new forms
- Delete forms
- Update form settings

### Response Handling
- Submit form responses
- Get form submissions
- Filter responses
- Export responses

### Analytics
- Response rates
- Completion times
- Submission trends

## Tools

1. `list_forms`
   - Get all accessible forms
   - Parameters:
     - `limit` (optional): Number of forms to return
     - `offset` (optional): Pagination offset
   - Returns: Array of form objects

2. `get_form`
   - Get detailed form information
   - Parameters:
     - `formId` (string): Form identifier
   - Returns: Form details including questions and settings

3. `create_form`
   - Create a new form
   - Parameters:
     - `name` (string): Form name
     - `description` (optional string): Form description
     - `questions` (array): Array of question objects
       - `type`: Question type (e.g., 'ShortAnswer', 'MultipleChoice')
       - `name`: Question text
       - `required`: Whether question is required
       - `choices`: Array of choices for multiple choice questions
   - Returns: Created form object

4. `get_form_responses`
   - Get form submissions
   - Parameters:
     - `formId` (string): Form identifier
     - `filters` (optional): Response filters
     - `pageSize` (optional): Results per page
     - `afterDate` (optional): Filter by submission date
     - `beforeDate` (optional): Filter by submission date
     - `status` (optional): Filter by completion status
   - Returns: Array of form responses

5. `submit_form_response`
   - Submit a new response
   - Parameters:
     - `formId` (string): Form identifier
     - `responses` (array): Array of answers
       - `questionId`: Question identifier
       - `value`: Response value
     - `calculations` (optional): Custom calculations
   - Returns: Submission confirmation

## Setup

### Usage with Claude Desktop

#### Docker Configuration
```json
{
  "mcpServers": {
    "fillout": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "FILLOUT_API_KEY",
        "mcp/fillout"
      ],
      "env": {
        "FILLOUT_API_KEY": "your-fillout-api-key"
      }
    }
  }
}
```

#### NPX Configuration
```json
{
  "mcpServers": {
    "fillout": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fillout"
      ],
      "env": {
        "FILLOUT_API_KEY": "your-fillout-api-key"
      }
    }
  }
}
```

## Building

### Prerequisites
- Node.js 18 or later
- npm or yarn
- Docker (optional)

### Local Development
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

### Docker Build
```bash
# Build image
docker build -t mcp/fillout .

# Run container
docker run -e FILLOUT_API_KEY=your-key mcp/fillout
```

## Examples

### Creating a Form
```typescript
const form = await client.createForm({
  name: "Customer Feedback",
  description: "Please share your experience",
  questions: [
    {
      type: "ShortAnswer",
      name: "What did you like most?",
      required: true
    },
    {
      type: "MultipleChoice",
      name: "Would you recommend us?",
      required: true,
      choices: ["Yes", "No", "Maybe"]
    }
  ]
});
```

### Submitting a Response
```typescript
const response = await client.submitFormResponse(formId, {
  responses: [
    {
      questionId: "q1",
      value: "Great customer service!"
    },
    {
      questionId: "q2",
      value: "Yes"
    }
  ]
});
```

## Error Handling

The server provides detailed error messages for common issues:

```typescript
try {
  const forms = await client.listForms();
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Handle invalid API key
  } else if (error instanceof FilloutError) {
    // Handle API-specific errors
  } else {
    // Handle unexpected errors
  }
}
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.