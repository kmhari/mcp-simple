# FindMine Shopping Stylist

A Model Context Protocol (MCP) server that integrates FindMine's powerful product styling and outfitting recommendations with Claude and other MCP-compatible applications.

## Overview

This MCP server connects to FindMine's styling API and exposes its functionality to Large Language Models through the Model Context Protocol. It allows users to:

- Browse product and outfit information
- Get outfit recommendations for specific products
- Find visually similar products
- Access style guidance and fashion advice

## Features

### Resources
- **Products**: Detailed product information with `product:///` URI scheme
- **Looks**: Complete outfit recommendations with `look:///` URI scheme

### Tools
- **get_style_guide**: Access detailed fashion advice and styling guidelines
- **get_complete_the_look**: Get outfit recommendations for a product
- **get_visually_similar**: Find visually similar products

### Prompts
- **outfit_completion**: Get styling advice for complete outfits
- **styling_guide**: Access comprehensive fashion styling guidelines
- **findmine_help**: Learn how to use FindMine's tools and resources

## Installation

### Option 1: Install from npm

```bash
# Install and run directly (recommended)
npx findmine-mcp

# Or install globally
npm install -g findmine-mcp
findmine-mcp
```

### Option 2: Run with Docker

```bash
docker run -e FINDMINE_APP_ID=your_app_id findmine/mcp-server:latest
```

### Option 3: Clone and build from source

```bash
# Clone the repository
git clone https://github.com/findmine/findmine-mcp.git
cd findmine-mcp

# Install dependencies
npm install

# Build the server
npm run build

# For development with auto-rebuild
npm run watch
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FINDMINE_API_URL` | FindMine API base URL | https://api.findmine.com |
| `FINDMINE_APP_ID` | Your FindMine application ID | DEMO_APP_ID |
| `FINDMINE_API_VERSION` | API version to use | v3 |
| `FINDMINE_DEFAULT_REGION` | Default region code | us |
| `FINDMINE_DEFAULT_LANGUAGE` | Default language code | en |
| `FINDMINE_CACHE_ENABLED` | Enable response caching | true |
| `FINDMINE_CACHE_TTL_MS` | Cache time-to-live in ms | 3600000 (1 hour) |
| `NODE_ENV` | Set to "development" for sample data | - |

## Usage with Claude Desktop

The server automatically configures Claude Desktop during installation. To verify:

**macOS:**
```bash
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**
```
type %APPDATA%\Claude\claude_desktop_config.json
```

## Development

### MCP Inspector

The MCP Inspector is a development tool for testing your server:

```bash
npm run inspector
```

This will open a web interface at http://localhost:5173 where you can interact with your server.

### Development Mode

Run the server with sample data:

```bash
NODE_ENV=development npm run build && node build/index.js
```

### Customizing the Style Guide

The style guide can be customized to match your brand's specific styling philosophies and fashion guidance. To customize the style guide:

1. Locate the style guides in `src/index.ts` (search for `styleGuides`)
2. Modify the content for each category (`general`, `color_theory`, `body_types`, etc.)
3. Add new categories by extending the `styleGuides` object
4. Customize occasion-specific and seasonal advice

Example of adding a custom style guide category:

```typescript
// In src/index.ts
const styleGuides: Record<string, string> = {
  // Existing categories...
  
  // Add your custom category
  your_brand_style: `# Your Brand Style Guide
  
## Brand Aesthetic
- Key elements of your brand's visual identity
- Core style principles
- Signature looks and combinations

## Your Brand's Styling Do's
- Brand-specific styling recommendations
- Preferred color combinations
- Signature styling techniques

## Your Brand's Styling Don'ts
- Combinations to avoid
- Styling approaches that don't align with brand identity
- Common styling mistakes to avoid
`
};
```

For complete customization, you can modify the entire `get_style_guide` handler in `src/index.ts`.

### Project Structure

- `src/index.ts`: Main MCP server implementation
- `src/api/`: FindMine API client
- `src/services/`: Business logic and service layer
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions and helpers

## API Examples

### Get Style Guide

```json
{
  "name": "get_style_guide",
  "arguments": {
    "category": "color_theory",
    "occasion": "wedding"
  }
}
```

### Get Complete the Look

```json
{
  "name": "get_complete_the_look",
  "arguments": {
    "product_id": "P12345",
    "product_color_id": "C789"
  }
}
```

### Get Visually Similar Products

```json
{
  "name": "get_visually_similar",
  "arguments": {
    "product_id": "P12345",
    "product_color_id": "C789",
    "limit": 5
  }
}
```

## Publishing

### Publishing to npm

```bash
# Login to npm
npm login

# Publish the package
npm publish

# Update the version for future releases
npm version patch
```

### Publishing to Docker Hub

```bash
# Build the Docker image
docker build -t findmine/mcp-server:latest .

# Login to Docker Hub
docker login

# Push the image
docker push findmine/mcp-server:latest
```

## License

This project is licensed under the MIT License.
