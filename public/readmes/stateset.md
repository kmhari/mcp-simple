# StateSet MCP Server

[![CI/CD Pipeline](https://github.com/stateset/mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/stateset/mcp-server/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/stateset/mcp-server/branch/main/graph/badge.svg)](https://codecov.io/gh/stateset/mcp-server)
[![npm version](https://badge.fury.io/js/stateset-mcp-server.svg)](https://badge.fury.io/js/stateset-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A world-class Model Context Protocol (MCP) server for StateSet API integration, providing comprehensive e-commerce operations management through a standardized interface.

## 🚀 Features

- **Comprehensive API Coverage**: Full support for StateSet's e-commerce operations
- **Type-Safe**: Built with TypeScript for maximum type safety
- **Production-Ready**: Includes health checks, metrics, and graceful shutdown
- **Well-Tested**: Extensive test coverage with unit, integration, and E2E tests
- **Observable**: Built-in logging, metrics, and request tracing
- **Scalable**: Rate limiting, connection pooling, and efficient resource management
- **Secure**: API key redaction, secure configuration, and input validation
- **Developer-Friendly**: Hot reloading, detailed documentation, and helpful error messages

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Installation

### Using npm

```bash
npm install -g stateset-mcp-server
```

### Using Docker

```bash
docker pull stateset/mcp-server:latest
```

### From Source

```bash
git clone https://github.com/stateset/mcp-server.git
cd mcp-server
npm install
npm run build
```

## 🏃 Quick Start

1. **Set up environment variables**:

```bash
cp .env.example .env
# Edit .env with your StateSet API credentials
```

2. **Run the server**:

```bash
# Using npm
stateset-mcp-server

# Using Docker
docker run --env-file .env stateset/mcp-server

# From source
npm start
```

3. **Connect your MCP client**:

```javascript
import { Client } from '@modelcontextprotocol/sdk';

const client = new Client({
  name: 'my-app',
  version: '1.0.0',
});

await client.connect(transport);
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `STATESET_API_KEY` | Your StateSet API key | - | ✅ |
| `STATESET_BASE_URL` | StateSet API base URL | `https://api.stateset.io/v1` | ❌ |
| `REQUESTS_PER_HOUR` | Rate limit for API requests | `1000` | ❌ |
| `API_TIMEOUT_MS` | Request timeout in milliseconds | `10000` | ❌ |
| `LOG_LEVEL` | Logging level | `info` | ❌ |
| `ENABLE_METRICS` | Enable metrics collection | `true` | ❌ |
| `ENABLE_HEALTH_CHECK` | Enable health check endpoint | `true` | ❌ |

### Advanced Configuration

Create a `config/custom.json` file for advanced configuration:

```json
{
  "rateLimit": {
    "requestsPerHour": 2000,
    "retryAttempts": 5,
    "retryDelay": 2000
  },
  "features": {
    "enableMetrics": true,
    "enableHealthCheck": true,
    "enableRequestLogging": true
  }
}
```

## 🏗️ Architecture

### Directory Structure

```
src/
├── config/         # Configuration management
├── core/           # Core server implementation
├── services/       # Business logic and API clients
├── tools/          # MCP tool implementations
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── middleware/     # Request/response middleware
```

### Key Components

- **Server Core**: Handles MCP protocol communication
- **StateSet Client**: Manages API interactions with rate limiting
- **Tool Registry**: Organizes and validates tool implementations
- **Metrics Collector**: Tracks performance and usage metrics
- **Error Handler**: Provides consistent error responses

## 📚 API Reference

### Tools

The server exposes 100+ tools organized by domain:

#### Orders & Returns
- `stateset_create_order` - Create a new order
- `stateset_update_order` - Update order details
- `stateset_get_order` - Retrieve order information
- `stateset_list_orders` - List orders with pagination
- [View all order tools →](docs/tools/orders.md)

#### Inventory & Products
- `stateset_create_product` - Add a new product
- `stateset_update_inventory` - Update inventory levels
- `stateset_get_product` - Get product details
- [View all inventory tools →](docs/tools/inventory.md)

#### Financial
- `stateset_create_invoice` - Generate an invoice
- `stateset_process_payment` - Process a payment
- `stateset_list_transactions` - List financial transactions
- [View all financial tools →](docs/tools/financial.md)

### Resources

Access StateSet resources through URI templates:

```
stateset-order:///ORDER-123
stateset-customer:///CUST-456
stateset-product:///PROD-789
```

### Prompts

Pre-configured prompts for common workflows:

- `order-fulfillment` - Complete order fulfillment workflow
- `return-processing` - Handle product returns
- `inventory-management` - Manage inventory levels

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- TypeScript >= 5.0.0

### Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run linting
npm run lint

# Format code
npm run format

# Type check
npm run typecheck
```

### Project Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run docs` | Generate API documentation |

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── unit/           # Unit tests for individual components
├── integration/    # Integration tests for API interactions
├── e2e/           # End-to-end tests for complete workflows
└── fixtures/      # Test data and mocks
```

### Writing Tests

```typescript
import { createServer } from '@core/server';
import { mockConfig } from '../fixtures/config';

describe('Server', () => {
  it('should start successfully', async () => {
    const server = await createServer(mockConfig);
    await expect(server.start()).resolves.not.toThrow();
  });
});
```

## 🚀 Deployment

### Docker Deployment

```bash
# Build image
docker build -t stateset-mcp-server .

# Run container
docker run -d \
  --name stateset-mcp \
  --env-file .env \
  -p 3000:3000 \
  stateset-mcp-server
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: stateset-mcp-server
spec:
  replicas: 3
  selector:
    matchLabels:
      app: stateset-mcp
  template:
    metadata:
      labels:
        app: stateset-mcp
    spec:
      containers:
      - name: server
        image: stateset/mcp-server:latest
        envFrom:
        - secretRef:
            name: stateset-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### Cloud Deployment

- **AWS**: Use ECS or EKS with the provided Docker image
- **Google Cloud**: Deploy to Cloud Run or GKE
- **Azure**: Use Container Instances or AKS

## 📊 Monitoring

### Health Checks

The server exposes health check endpoints:

```bash
# Liveness probe
curl http://localhost:3000/health/live

# Readiness probe
curl http://localhost:3000/health/ready
```

### Metrics

Prometheus-compatible metrics are available:

```bash
curl http://localhost:3000/metrics
```

Key metrics:
- `stateset_api_requests_total` - Total API requests
- `stateset_api_request_duration_seconds` - Request duration histogram
- `stateset_api_errors_total` - Total API errors
- `stateset_rate_limit_queue_size` - Current rate limit queue size

### Logging

Structured JSON logs with configurable levels:

```json
{
  "level": "info",
  "time": "2024-01-01T12:00:00.000Z",
  "context": "api",
  "method": "POST",
  "url": "/orders",
  "duration": 123,
  "status": 200,
  "msg": "API request completed"
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Maintain 80%+ test coverage
- Use conventional commits
- Document all public APIs
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://github.com/modelcontextprotocol) for the MCP specification
- [StateSet](https://stateset.io) for the comprehensive e-commerce API
- All our contributors and users

## 📞 Support

- 📧 Email: support@stateset.io
- 💬 Discord: [Join our community](https://discord.gg/stateset)
- 📚 Documentation: [docs.stateset.io](https://docs.stateset.io)
- 🐛 Issues: [GitHub Issues](https://github.com/stateset/mcp-server/issues)
