# Argus - Repository Analysis and Security Assessment Tool

A powerful Model Context Protocol (MCP) tool for analyzing code repositories, performing security scans, and assessing code quality across multiple programming languages.

## Features

- **Multi-Language Support**
  - Go: gocyclo, golangci-lint analysis
  - Java: PMD static analysis
  - Python: Pylint, Bandit security checks
  - JavaScript/TypeScript: ESLint analysis
  - Automatic language detection

- **Security Scanning**
  - Integrated Trivy vulnerability scanner
  - Comprehensive security reports
  - Support for multiple branches

- **Git Operations**
  - Branch enumeration and management
  - Commit history analysis
  - Diff comparisons
  - Repository structure visualization

## Installation

### Prerequisites

- Python 3.8+
- Git
- libmagic (system dependency)

### System Dependencies

#### macOS
```bash
brew install libmagic
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install -y libmagic1
```

### Installation via uv

```bash
uvx argus
```

## Usage

### Basic MCP Commands

```python
# Analyze repository structure
analyze_repository_structure(
    repo_url="https://gitlab.com/user/repo",
    gitlab_credentials={"api_key": "your-token"},  # Optional
    branch="main"  # Optional
)

# Perform code quality analysis
analyze_code_quality(
    repo_url="https://gitlab.com/user/repo",
    language="python"  # Optional, will auto-detect if not specified
)

# Security scan
security_scan_repository(
    repo_url="https://gitlab.com/user/repo",
    scan_type="trivy"
)

# Compare changes
compare_git_changes(
    repo_url="https://gitlab.com/user/repo",
    source="feature-branch",
    target="main"
)

# Security scan repository
security_scan_repository(
    repo_url="https://gitlab.com/user/repo",
    scan_type="trivy"
)

### MCP Configuration

```json
{
    "command": "uvx",
    "args": [
        "--from",
        "git+https://github.com/athapong/argus",
        "argus"
    ],
    "alwaysAllow": [
        "get_commit_history",
        "enumerate_branches",
        "compare_git_changes",
        "analyze_code_quality",
        "security_scan_repository"  
    ],
    "timeout": 300
}
```

## Supported Analysis Tools

| Language   | Tools                    | Installation                                    |
|------------|-------------------------|------------------------------------------------|
| Go         | gocyclo, golangci-lint  | `go install github.com/fzipp/gocyclo/cmd/gocyclo@latest` |
| Java       | PMD                     | macOS: `brew install pmd`, Linux: Auto-installed |
| Python     | Pylint, Bandit         | Auto-installed via dependencies                |
| JavaScript | ESLint                 | `npm install -g eslint`                        |

## Environment Variables

- `SKIP_SYSTEM_CHECK`: Set to any value to skip system dependency checks
- `PATH`: Automatically updated for tool installations

## Error Handling

The tool provides detailed error messages and graceful fallbacks:
- Dependency installation failures show warnings instead of errors
- Language detection falls back to specified language if auto-detection fails
- Tool execution errors are captured in the response structure

## License

MIT License

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

