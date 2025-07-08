# Shield MCP

[![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)

A security middleware for Model Context Protocol (MCP) servers that enhances security and monitoring capabilities without modifying the official SDK. This package provides tools for securing and monitoring MCP tool calls, following the best practices outlined in the MCP documentation. Abstract yourself while interact at MCP development.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Components](#components)
- [Best Practices](#best-practices)
- [Development](#development)
- [Roadmap](#roadmap)
- [Acknowledgments](#acknowledgments)

## Features
- **Tool Access Control**: Whitelist-based access control for MCP tools
- **Result Sanitization**: Configurable sanitization of tool outputs
- **Structured Logging**: Comprehensive audit logging using structlog
- **Rate Limiting**: Token bucket algorithm for rate limiting
- **Error Handling**: Standardized error handling and formatting
- **MCP Inspector Compatible**: Works seamlessly with the MCP Inspector tool

## Requirements

### System Requirements
- Python 3.8 or higher
- pip (Python package installer)
- virtualenv (recommended for development)

## Quick Start

```python
from shieldmcp import secure_tool
from shieldmcp.sanitizers import ToolSanitizer
from shieldmcp.rate_limit import RateLimitConfig

# Define allowed tools
ALLOWED_TOOLS = {"search", "read_file", "write_file"}

# Create a text sanitizer
text_sanitizer = ToolSanitizer.createTextSanitizer(
    max_length=1000,
    sensitive_patterns=[
        r"\b\d{16}\b",  # Credit card numbers
        r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"  # Email addresses
    ]
)

# Configure rate limiting
rate_limit = RateLimitConfig(
    requests_per_minute=60,  # 1 request per second
    burst_size=10  # Allow bursts of up to 10 requests
)

# Apply the decorator to your MCP tools
@secure_tool(
    allowed_tools=ALLOWED_TOOLS,
    sanitize_fn=text_sanitizer,
    user_id="user123",
    session_id="session456",
    rate_limit=rate_limit
)
def search(query: str):
    # Your tool implementation
    return results
```

## Components

### Decorators (`decorators.py`)
The main `@secure_tool` decorator that orchestrates all security features:

```python
@secure_tool(
    allowed_tools={"tool1", "tool2"},  # Set of allowed tool names
    sanitize_fn=your_sanitizer,        # Optional result sanitization function
    user_id="user123",                 # Optional user identifier
    session_id="session456",           # Optional session identifier
    rate_limit=RateLimitConfig(        # Optional rate limit configuration
        requests_per_minute=60,
        burst_size=10
    )
)
def your_tool():
    pass
```

### Audit Logging (`audit.py`)
Structured logging using structlog:

```python
from shieldmcp import ToolAudit

audit = ToolAudit()
audit.logToolCallStart(
    tool_name="search",
    args={"query": "test"},
    user_id="user123"
)
```

### Access Control (`access.py`)
Tool access validation:

```python
from shieldmcp import ToolAccess

access = ToolAccess(allowed_tools={"tool1", "tool2"})
access.validateToolAccess("tool1")  # Raises ValueError if not allowed
```

### Sanitizers (`sanitizers.py`)
Result sanitization utilities:

```python
from shieldmcp import ToolSanitizer

# Create a custom sanitizer
sanitizer = ToolSanitizer.createTextSanitizer(
    max_length=1000,
    sensitive_patterns=[r"\b\d{16}\b"]
)

# Use it directly
clean_text = sanitizer("Your text with sensitive data")
```

### Rate Limiting (`rate_limit.py`)
Token bucket rate limiting:

```python
from shieldmcp import RateLimitConfig

# Configure rate limits
config = RateLimitConfig(
    requests_per_minute=60,
    burst_size=10
)
```

## Best Practices

### Tool Access Control
- Always define a whitelist of allowed tools
- Use the most restrictive set of tools possible
- Regularly review and update the whitelist

### Result Sanitization
- Sanitize all text output
- Define patterns for sensitive data
- Set reasonable length limits

### Logging
- Include user and session IDs when available
- Log both successful and failed operations
- Use structured logging for better analysis

### Rate Limiting
- Set appropriate limits based on tool complexity
- Consider burst sizes for better user experience
- Monitor rate limit hits in logs

## Development

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/shieldmcp/shieldmcp.git
cd shieldmcp

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install development dependencies
pip install -r requirements.txt
```

### Running Tests
```bash
pytest tests/
```

## Roadmap

### Planned Features
- Support for Clerk MCP and Github MCP
- Extended documentation
- TypeScript support

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io) for the protocol specification
- [structlog](https://www.structlog.org/) for structured logging

---

Feel free to make any inquiries.
