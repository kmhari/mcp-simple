# RootData MCP Server

English | [简体中文](./README_zh.md)

A comprehensive Model Context Protocol (MCP) server that provides access to RootData's crypto asset data platform API, enabling seamless integration of crypto project, investor, and market data into AI applications.

## Features

- 🔍 **Entity Search**: Search for projects, VCs, and people in the crypto space
- 📊 **Detailed Analysis**: Get comprehensive information about projects, investors, and individuals
- 📈 **Market Trends**: Track hot projects, funding rounds, and social metrics
- 🔄 **Cross-functional Analysis**: Combine multiple API endpoints for holistic insights
- 💰 **Funding Data**: Access detailed fundraising round information
- 🌐 **Ecosystem Mapping**: Explore relationships between projects and ecosystems
- 👥 **Social Metrics**: Track X (Twitter) engagement and influence rankings

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/rootdata-mcp

# Install dependencies
npm install

# Build file
npm run build

# Create .env file
cp .env.example .env

# Add your RootData API key to .env
ROOTDATA_API_KEY=your_api_key_here
```

## Configuration

1. Get your API key from [RootData](https://www.rootdata.com/Api)
2. Create a `.env` file in the root directory:

```env
ROOTDATA_API_KEY=your_api_key_here
```

3. Add the server to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "rootdata": {
      "command": "node",
      "args": ["path/to/rootdata-mcp/build/index.js"], //change to build directory
      "env": {
        "ROOTDATA_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

### 1. Core API Functions

#### `searchEntities`
Search for projects, VCs, or people by keywords.

```typescript
{
  query: string;         // Search keywords
  preciseXSearch?: boolean; // Search by X handle (@...)
}
```

#### `getProject`
Get detailed project information.

```typescript
{
  projectId: number;     // Project ID
  includeTeam?: boolean; // Include team members
  includeInvestors?: boolean; // Include investors
}
```

#### `getOrg`
Get detailed VC/organization information.

```typescript
{
  orgId: number;         // Organization ID
  includeTeam?: boolean; // Include team members
  includeInvestments?: boolean; // Include investments
}
```

### 2. Advanced Analysis Tools

#### `analyzeComprehensive`
Comprehensive analysis combining multiple RootData endpoints.

```typescript
{
  query: string;        // Natural language query
  analysisType?: 'project' | 'investor' | 'ecosystem' | 'trends' | 'fundraising' | 'comprehensive';
  timeframe?: string;   // Time period for analysis
  depth?: 'basic' | 'detailed' | 'full';
  includeRelated?: boolean; // Include related entities
}
```

#### `investigateEntity`
Deep dive into a specific entity with all related information.

```typescript
{
  entityName: string;   // Name of the project, investor, or person
  entityType?: 'project' | 'investor' | 'person' | 'auto';
  investigationScope?: 'basic' | 'funding' | 'social' | 'ecosystem' | 'all';
}
```

#### `trackTrends`
Track market trends across projects, funding, and social metrics.

```typescript
{
  category: 'hot_projects' | 'funding' | 'job_changes' | 'new_tokens' | 'ecosystem' | 'all';
  timeRange?: '1d' | '7d' | '30d' | '3m';
  filterBy?: {
    ecosystem?: string;
    tags?: string;
    minFunding?: number;
  };
}
```

#### `compareEntities`
Compare multiple projects or investors side by side.

```typescript
{
  entities: string[];   // List of entity names to compare
  compareType?: 'metrics' | 'funding' | 'ecosystem' | 'social' | 'all';
}
```

### 3. Market Analysis Tools

#### `getHotProjects`
Get top 100 hot crypto projects.

```typescript
{
  days: number;         // Time period (1 or 7 days)
}
```

#### `getXHotProjects`
Get X platform hot projects rankings.

```typescript
{
  heat?: boolean;       // Get heat ranking
  influence?: boolean;  // Get influence ranking
  followers?: boolean;  // Get followers ranking
}
```

#### `getNewTokens`
Get newly issued tokens in the past 3 months.

#### `getFundingRounds`
Get fundraising rounds information.

```typescript
{
  page?: number;
  pageSize?: number;
  startTime?: string;   // yyyy-MM
  endTime?: string;     // yyyy-MM
  minAmount?: number;
  maxAmount?: number;
  projectId?: number;
}
```

## Example Usage

### 1. Project Analysis
```
"Give me a comprehensive analysis of Ethereum including funding, ecosystem, and social metrics"
```

### 2. Investor Research
```
"Investigate Binance Labs and show me their recent investments and portfolio"
```

### 3. Market Trends
```
"Track the hottest AI projects in the crypto space with recent funding"
```

### 4. Entity Comparison
```
"Compare Ethereum, Polygon, and Solana across funding, ecosystem, and social metrics"
```

### 5. Ecosystem Analysis
```
"Show me all Layer 2 projects with their funding and hot rankings"
```

## API Rate Limits

- 30 requests per minute per API key
- Different endpoints have different credit costs (1-50 credits per request)
- Monitor your usage to avoid hitting limits

## Development

### Build
```bash
npm run build
```

### Watch Mode
```bash
npm run watch
```

### Clean
```bash
npm run clean
```

## Error Handling

The server includes comprehensive error handling:
- API authentication errors
- Invalid parameters
- Rate limiting
- Network issues
- Data parsing errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [RootData](https://www.rootdata.com) for providing the comprehensive crypto data API
- [Anthropic](https://www.anthropic.com) for the Model Context Protocol framework

## Support

For issues and feature requests, please open an issue on GitHub or contact support@rootdata.com for API-related questions.

---

Made with ❤️ for the crypto community