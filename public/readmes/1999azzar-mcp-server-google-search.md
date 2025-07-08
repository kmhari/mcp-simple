# Google Search MCP Server

A microservice for Google Custom Search with caching, rate-limiting, metrics, and robust error handling.

## Features

- Centralized error handling middleware
- Config validation via Zod (fail-fast)
- Redis + LRU caching with stale-while-revalidate
- Prometheus metrics endpoint (`/metrics`)
- Rate limiting via `express-rate-limit`
- Swagger UI documentation (`/docs`)
- REST endpoints: `/health`, `/ready`, `/`, `/search`, `/search-file-type`, `/extract`, `/filters`, `/tools`, `/metrics`
- Unit tests with Jest + Supertest
- ESLint + TypeScript linting
- GraphQL endpoint (`/graphql`) with Apollo Server Sandbox UI

## Quickstart

### Prerequisites

- Node.js >= v14
- npm >= v6
- Google API Key with Custom Search API enabled
- Google CSE ID
- Redis instance (optional)

### Installation

```bash
git clone https://github.com/azzar/mcp-server-google-search.git
cd mcp-server-google-search
npm install
cp .env.example .env
```

### Configuration

Edit `.env` to set:
```ini
GOOGLE_API_KEY=your_api_key
GOOGLE_CSE_ID=your_cse_id
PORT=3000
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600
LRU_CACHE_SIZE=500
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=30
CB_TIMEOUT_MS=5000
CB_ERROR_THRESHOLD=50
CB_RESET_TIMEOUT_MS=30000
LOG_LEVEL=info
```

Alternatively, adjust settings directly in `config.ts` for advanced use.

### Running in Development

```bash
npm run dev
```
- Live reload with ts-node
- Swagger UI available at `http://localhost:3000/docs`
- GraphQL Sandbox UI available at `http://localhost:3000/graphql`

### Running in Production

```bash
npm run build
npm start
```

### API Usage Examples

**Health Check**
```bash
curl http://localhost:3000/health
```

**Readiness**
```bash
curl http://localhost:3000/ready
```

**Search**
```bash
curl "http://localhost:3000/search?q=openai&safe=active"
```

**Filters**
```bash
curl http://localhost:3000/filters
```

**Tools**
```bash
curl http://localhost:3000/tools
```

**Search by file type**
```bash
curl "http://localhost:3000/search-file-type?q=openai&fileType=pdf"
```

**Extract**
```bash
curl "http://localhost:3000/extract?url=https://example.com"
```

**Metrics**
```bash
curl http://localhost:3000/metrics
```

**Swagger UI**
Visit `http://localhost:3000/docs`

**GraphQL (UI)**
Visit Apollo Sandbox at `http://localhost:3000/graphql`

**GraphQL Schema (SDL)**
```bash
curl http://localhost:3000/graphql/schema
```

**GraphQL (Query)**
```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ search(q:\"openai\") }"}'
```

### Testing & Linting

```bash
npm run lint
npm test
```

### Docker

**Dockerfile**
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install --production
CMD ["npm", "start"]
```

**Build & Run**
```bash
docker build -t mcp-google-search .
docker run -d -p 3000:3000 --env-file .env mcp-google-search
```

## Environment Variables

| Variable                 | Description                                | Default                     |
|--------------------------|--------------------------------------------|-----------------------------|
| `GOOGLE_API_KEY`         | Google API key                             | (required)                  |
| `GOOGLE_CSE_ID`          | Custom Search Engine ID                    | (required)                  |
| `PORT`                   | HTTP port                                  | `3000`                      |
| `REDIS_URL`              | Redis connection URL                       | `redis://localhost:6379`    |
| `CACHE_TTL`              | Redis cache TTL (seconds)                  | `3600`                      |
| `LRU_CACHE_SIZE`         | Fallback LRU cache max entries             | `500`                       |
| `RATE_LIMIT_WINDOW_MS`   | Rate limit window (ms)                     | `60000`                     |
| `RATE_LIMIT_MAX`         | Max requests per window                    | `30`                        |
| `CB_TIMEOUT_MS`          | Circuit breaker timeout (ms)               | `5000`                      |
| `CB_ERROR_THRESHOLD`     | Circuit breaker error threshold (%)        | `50`                        |
| `CB_RESET_TIMEOUT_MS`    | Circuit breaker reset timeout (ms)         | `30000`                     |
| `LOG_LEVEL`              | Pino log level                             | `info`                      |

## API Reference

### GET /health

Liveness probe. Returns `200 OK`.

### GET /ready

Readiness probe. Checks Redis & Google API reachability. Returns `200 OK` or `503 Service Unavailable` with JSON `{ checks: {...} }`.

### GET /

Root endpoint. Returns JSON `{ status: 'ok' }`.

### GET /search

Perform a Google Custom Search.

**Query Parameters**:
- `q` (string, required): search query
- Optional filters: `searchType`, `fileType`, `siteSearch`, `dateRestrict`, `safe`, `exactTerms`, `excludeTerms`, `sort`, `gl`, `hl`, `num`, `start`

**Response**: JSON from Google API.

### GET /search-file-type

Search only specific file types.

**Query Parameters**:
- `q` (string, required): search query
- `fileType` (string, required): file type

**Response**: JSON from Google API.

### GET /extract

Extract main content and sentiment from a URL.

**Query Parameters**:
- `url` (string, required): URL to extract

**Response**: JSON with extracted content and sentiment.

### GET /filters

List supported filters.

### GET /tools

List available tool descriptions.
```json
{
  "tools": [
    {
      "name": "search",
      "method": "GET",
      "path": "/search",
      "description": "Perform a Google Custom Search with optional filters",
      "parameters": {
        "q": "string",
        "searchType": "string",
        "fileType": "string",
        "siteSearch": "string",
        "dateRestrict": "string",
        "safe": "string",
        "exactTerms": "string",
        "excludeTerms": "string",
        "sort": "string",
        "gl": "string",
        "hl": "string",
        "num": "string",
        "start": "string"
      }
    },
    {
      "name": "searchFileType",
      "method": "GET",
      "path": "/search-file-type",
      "description": "Search only specific file types",
      "parameters": { "q": "string", "fileType": "string" }
    },
    {
      "name": "extract",
      "method": "GET",
      "path": "/extract",
      "description": "Extract main content and sentiment from a URL",
      "parameters": { "url": "string" }
    }
  ]
}
```

### GET /metrics

Prometheus metrics in plain text.

### GET /graphql

GraphQL interactive UI (Apollo Server Sandbox).

### POST /graphql

GraphQL endpoint. Accepts JSON `{ "query": "<GraphQL Query>" }` and returns JSON response.

## Testing

Run unit tests and coverage:

```bash
npm test
```

Coverage report in `coverage/`.

## License

MIT
