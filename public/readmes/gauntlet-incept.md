# Gauntlet-Incept

A system for generating high-quality educational content tailored to students' knowledge levels and interests.

## Project Description

This repository contains the code and resources for the Gauntlet-Incept project, which aims to build a system that generates high-quality educational content for K-8 students. The initial scope focuses on developing educational content in the form of articles and question banks for specific subject areas.

## Documentation

- [Project Overview](docs/project-document.md) - Detailed description of the project goals and requirements
- [Implementation Checklist](docs/implementation-checklist.md) - Comprehensive checklist for project implementation
- [Original Project Brief](docs/WF%20-%20Gauntlet%20Incept%20Project%20G%20-%20250223-151531..md) - Original project brief with detailed requirements
- [MCP Server Guide](docs/mcp-server.md) - Guide for using the Model Context Protocol server with Claude Desktop

## Project Structure

```
gauntlet-incept/
├── docs/                  # Documentation files
├── src/                   # Source code
│   ├── api/               # API routes
│   ├── models/            # Data models
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   ├── data/              # Data files
│   ├── tests/             # Test files
│   ├── index.js           # Entry point for REST API
│   └── mcp-server.js      # Model Context Protocol server
├── services/              # Microservices
│   ├── qti-service/       # QTI service for content storage
│   └── llm-service/       # LLM service for content generation
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore file
├── package.json           # Node.js package file
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker configuration
└── README.md              # This file
```

## API Endpoints

The project implements six core API endpoints:

### Question Endpoints

- `POST /api/question/tag` - Tag a question with subject, grade, standard, lesson, and difficulty
- `POST /api/question/grade` - Grade a tagged question against quality standards
- `POST /api/question/generate` - Generate a question based on tags or an example question

### Article Endpoints

- `POST /api/article/tag` - Tag an article with subject, grade, standard, and lesson
- `POST /api/article/grade` - Grade a tagged article against quality standards
- `POST /api/article/generate` - Generate an article based on tags or an example article

## Model Context Protocol (MCP) Server

In addition to the REST API, this project includes an MCP server that allows Claude Desktop to interact with the Gauntlet Incept system. This enables Claude to generate, tag, and grade educational content directly.

See the [MCP Server Guide](docs/mcp-server.md) for details on how to set up and use the MCP server with Claude Desktop.

## Getting Started

### Prerequisites

- Git
- Node.js (v14 or higher)
- Access to the RDS PostgreSQL database (credentials provided by administrator)
- SSH key for database connection (if connecting through SSH tunnel)
- Docker and Docker Compose (optional, for containerized deployment)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/Gauntlet-Incept.git
   ```
2. Navigate to the project directory
   ```
   cd Gauntlet-Incept
   ```
3. Install dependencies
   ```
   npm install
   ```
4. Copy the example environment file and update it with your values
   ```
   cp .env.example .env
   ```
5. Run the project
   ```
   npm start
   ```

### Running with Docker

1. Build and start the containers
   ```
   docker-compose up -d
   ```
2. Access the API at http://localhost:3000
3. Access the MCP server at http://localhost:3001

### Database Connection

This project connects to an Amazon RDS PostgreSQL instance with the following details:

- **Host**: alphacommoncrawl-core-reboot.cluster-caeuiwckzo1a.us-east-1.rds.amazonaws.com
- **Port**: 5432
- **Database**: core
- **Username**: postgres

Note: The password is stored in environment variables and not directly in the code for security reasons.

If you need to connect through an SSH tunnel, you'll need to set up the tunnel separately before starting the application.

## Development

### Running in Development Mode

```
npm run dev
```

### Running the MCP Server

```
npm run mcp
```

### Running Tests

```
npm test
```

### Linting

```
npm run lint
```

## Project Checklist

- [x] Initialize Git repository
- [x] Create basic project structure
- [x] Add .gitignore file
- [x] Create initial commit
- [x] Set up project documentation
- [x] Create implementation checklist
- [x] Set up API routes and service structure
- [x] Implement placeholder functionality for core services
- [x] Set up Docker containerization
- [x] Implement MCP server for Claude Desktop integration
- [x] Configure connection to RDS PostgreSQL database
- [ ] Implement actual functionality with LLM integration
- [ ] Add tests
- [ ] Review and finalize

## License

MIT

## Contact

[Your contact information] 