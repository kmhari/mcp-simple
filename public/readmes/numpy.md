[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/colesmcintosh-numpy-mcp-badge.png)](https://mseep.ai/app/colesmcintosh-numpy-mcp)

# NumPy MCP Server

<div align="center">

<strong>A Model Context Protocol (MCP) server for numerical computations with NumPy</strong>

[![MIT licensed][mit-badge]][mit-url]

</div>

[mit-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[mit-url]: ./LICENSE
[python-badge]: https://img.shields.io/badge/python-3.8%2B-blue.svg
[python-url]: https://www.python.org/downloads/

A Model Context Protocol (MCP) server that provides mathematical calculations and operations using NumPy. This server exposes various mathematical tools through a standardized MCP interface, making it easy to perform numerical computations directly through Claude or other MCP-compatible LLMs.

## Features

- Basic arithmetic operations (addition)
- Linear algebra computations (matrix multiplication, eigendecomposition)
- Statistical analysis (mean, median, standard deviation, min, max)
- Polynomial fitting

## Installation

### Quick Setup with Claude Desktop

The fastest way to get started is to install this server directly in Claude Desktop:

```bash
# Install the server in Claude Desktop
mcp install server.py --name "NumPy Calculator"
```

### Manual Installation

This project uses UV for dependency management. To install:

```bash
# Install UV if you haven't already
curl -LsSf https://astral.sh/uv/install.sh | sh

# Clone the repository
git clone https://github.com/yourusername/math-mcp.git
cd math-mcp

# Create virtual environment and install dependencies
uv venv
source .venv/bin/activate  # On Unix/macOS
# or
# .venv\Scripts\activate  # On Windows
uv pip install -r requirements.txt
```

## Usage

### Development Testing

Test the server locally with the MCP Inspector:

```bash
mcp dev server.py
```

### Claude Desktop Integration

1. Install the server in Claude Desktop:
   ```bash
   mcp install server.py --name "NumPy Calculator"
   ```

2. The server will now be available in Claude Desktop under "NumPy Calculator"

3. You can use it by asking Claude to perform mathematical operations, for example:
   - "Calculate the eigenvalues of matrix [[1, 2], [3, 4]]"
   - "Find the mean and standard deviation of [1, 2, 3, 4, 5]"
   - "Multiply matrices [[1, 0], [0, 1]] and [[2, 3], [4, 5]]"

### Direct Execution

For advanced usage or custom deployments:

```bash
python server.py
# or
mcp run server.py
```

## Available Functions

The server provides the following mathematical functions through the MCP interface:

### Basic Arithmetic

- `add(a: int, b: int) -> int`: Add two integers together

### Linear Algebra

- `matrix_multiply(matrix_a: List[List[float]], matrix_b: List[List[float]]) -> List[List[float]]`: Multiply two matrices
- `eigen_decomposition(matrix: List[List[float]]) -> Tuple[List[float], List[List[float]]]`: Compute eigenvalues and eigenvectors of a square matrix

### Statistics

- `statistical_analysis(data: List[float]) -> dict[str, float]`: Calculate basic statistics for a dataset including:
  - Mean
  - Median
  - Standard deviation
  - Minimum value
  - Maximum value

### Data Analysis

- `polynomial_fit(x: List[float], y: List[float], degree: int = 2) -> List[float]`: Fit a polynomial of specified degree to the given data points

## Development

### Project Structure

```
math-mcp/
├── requirements.txt
├── README.md
└── server.py
```

### Code Quality

This project adheres to strict code quality standards:
- Type hints throughout the codebase
- Comprehensive docstrings following Google style
- Error handling for numerical operations

## Dependencies

- NumPy: For numerical computations and linear algebra operations
- FastMCP: For Model Context Protocol server implementation

## License

This project is licensed under the MIT License.

## Acknowledgments

- NumPy team for their excellent scientific computing library
- Model Context Protocol (MCP) for enabling standardized LLM interactions
