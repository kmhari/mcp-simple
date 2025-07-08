# Secure Fetch

This project implements a secure URL fetching tool using FastMCP.

## Prerequisites

- Python 3.7+
- uv (Python package installer and environment manager)

## Installation

1. Install uv if you haven't already:

```bash
pip install uv
```

2. Create a new virtual environment and install dependencies:

```bash
uv venv
source .venv/bin/activate
uv pip install fastmcp requests
```

## Usage

1. Set the allowlist environment variable (optional):

```bash
export SECURE_FETCH_ALLOWLIST="example.com,trusted-domain.org"
```

2. Run the script:

```bash
uv run main.py
```

## Features

- Fetches URLs securely
- Resolves domains to IPs
- Checks for private/internal IPs
- Handles redirects (up to 3)
- Supports custom HTTP methods and headers
- Uses an allowlist for trusted domains/IPs

## Security Considerations

- The tool prevents access to private/internal IPs unless explicitly allowed
- Only HTTP and HTTPS schemes are permitted
- SNI is set to match the hostname for HTTPS connections

## Example Usage

Once the script is running, you can use the `fetch_url` function to securely fetch URLs. The function will return a dictionary containing the status code, response body, and content length.

## Note

This tool is designed for secure URL fetching. Always review and understand the code before using it in your environment.
