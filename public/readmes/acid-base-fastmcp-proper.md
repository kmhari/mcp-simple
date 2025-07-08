# Python Best Practices Launchpad

[![CI](https://github.com/yourusername/2024-Python-Best-Practices-Launchpad/actions/workflows/main.yml/badge.svg)](https://github.com/yourusername/2024-Python-Best-Practices-Launchpad/actions/workflows/main.yml)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Code style: ruff](https://img.shields.io/badge/code%20style-ruff-000000.svg)](https://github.com/astral-sh/ruff)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository provides a modern Python project template with a functional FastAPI REST API, designed for efficient development with `uv`, `ruff`, `mypy`, `pytest`, and Git hooks powered by `pre-commit`. It demonstrates best practices for building production-ready Python applications with robust testing, containerization, and CI/CD integration.

## Features

*   **REST API with FastAPI:** Ready-to-use API with data validation using Pydantic models.
*   **Docker & Docker Compose:** Production-ready containerization with multi-stage builds.
*   **`uv` for Dependency Management:** Fast and efficient dependency resolution and virtual environment management.
*   **`ruff` for Linting and Formatting:** Enforces consistent code style, catches errors early, and provides auto-fixing capabilities.
*   **`mypy` for Type Checking:** Adds static typing to your Python code, preventing type-related errors.
*   **`pytest` for Testing:** Comprehensive test suite with unit, API, and integration tests.
*   **`pre-commit` for Git Hooks:** Automates code quality checks before every commit.
*   **GitHub Actions Workflow:** Ready-to-use CI pipeline for testing and quality assurance.
*   **Dev Container Support:** Included configuration for instant development in VS Code or GitHub Codespaces.

## Project Structure

```
2024-Python-Best-Practices-Launchpad/
├── .github/workflows/       # GitHub workflows for CI/CD
│   └── main.yml             # Main CI workflow
├── .devcontainer/           # Dev Container configuration
│   ├── devcontainer.json    # Dev container settings
│   └── Dockerfile           # Dev container image definition
├── src/                     # Source code directory
│   └── my_package/          # Main package directory
│       ├── __init__.py      # Package initialization
│       ├── api.py           # FastAPI implementation
│       ├── models.py        # Pydantic data models
│       ├── module.py        # Core functionality
│       ├── example.py       # Example calculator class
│       └── run.py           # Script to run the FastAPI server
├─�� tests/                   # Test directory
│   ├── test_api.py          # Tests for FastAPI endpoints using models
│   ├── test_endpoints.py    # Tests for API endpoints using test client
│   ├── test_module.py       # Tests for core functionality
│   ├── test_example.py      # Tests for example calculator
│   └── integration_test.py  # Integration tests
├── .pre-commit-config.yaml  # Pre-commit hooks configuration
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Multi-stage production Docker image
├── LICENSE                  # MIT License
├── pyproject.toml           # Project configuration and dependencies
├── pytest.ini               # Pytest configuration
└── README.md                # This file
```

## API Features

The included FastAPI application provides:

* Data processing API with input validation
* Proper error handling and status codes
* CORS middleware for cross-origin requests
* Automatic OpenAPI documentation (available at `/docs`)
* Pydantic models for request/response schema validation

## Getting Started

You can choose one of two approaches to set up this project:

### Option 1: Using Dev Containers (Recommended)

If you have [VS Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) or [GitHub Codespaces](https://github.com/features/codespaces), you can get started quickly without any local setup:

1. **VS Code + Dev Containers:**
   - Clone this repository
   - Open the repository folder in VS Code
   - When prompted "Reopen in Container", click "Reopen in Container"
   - (Alternatively, press F1, type "Reopen in Container" and select the option)

2. **GitHub Codespaces:**
   - Click the "Code" button on the GitHub repository
   - Select the "Codespaces" tab
   - Click "Create codespace on main"

The container includes all necessary tools and dependencies, properly configured and ready to use.

### Option 2: Using Docker Compose

To run the API using Docker Compose:

```bash
# Build and start the container
docker-compose up --build

# API will be available at http://localhost:8000
```

### Option 3: Local Setup with Linuxbrew/Homebrew

Before cloning the repository, make sure you have Linuxbrew installed (or Homebrew on macOS).

### Windows/WSL Setup

1.  **Install WSL:** Follow the official Microsoft instructions to install WSL and choose a Linux distribution (e.g., Ubuntu).

2.  **Open a *Direct* WSL Terminal:**
    *   **Do NOT use `wsl` from a Windows terminal (like PowerShell or Command Prompt).**
    *   **In VS Code:** Open a *new* integrated terminal by clicking the "+" button on the terminals tab, and select your WSL distribution (e.g., "Ubuntu", "Debian") from the dropdown menu.
    *   **From Start Menu:** Alternatively, launch your WSL distribution's terminal directly from the Windows Start Menu (e.g., "Ubuntu", "Debian").

    **All subsequent steps in this section must be executed within this *direct* WSL terminal.**

3.  **Install Base Dependencies (Within WSL):**
    ```bash
    sudo apt update && sudo apt install -y build-essential curl file git
    ```
4.  **Install Linuxbrew:**
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
5.  **Add Linuxbrew to `PATH`:**
    Add the following lines to your `~/.bashrc` or `~/.zshrc` (depending on your shell):
    ```bash
    export PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
    export MANPATH="/home/linuxbrew/.linuxbrew/share/man:$MANPATH"
    export INFOPATH="/home/linuxbrew/.linuxbrew/share/info:$INFOPATH"
    ```
    Then run `source ~/.bashrc` or `source ~/.zshrc`.
6.  **Install Python via Linuxbrew:** `brew install python`

#### macOS

1.  **Install Homebrew:** If you don't have it already, install Homebrew by running the following command in the terminal:
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
2.  **Install Python via Homebrew:** `brew install python`

#### Linux

1.  **Install Linuxbrew:** Follow the instructions on the Linuxbrew homepage: [https://brew.sh/](https://brew.sh/)
2.  **Install Python via Linuxbrew:** `brew install python`

### 2. Project Setup

Once Linuxbrew (or Homebrew on macOS) and Python are installed, you can continue with the following steps:

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd <project_name>
    ```

2.  **Create and Activate Virtual Environment:**
    ```bash
    uv venv
    ```
    This command creates a virtual environment, if one does not exist already.

3.  **Install Dependencies:**
    ```bash
     uv sync
    ```
    This command installs all dependencies from your lock file (`uv.lock`), including development dependencies.

4.  **Install Git Hooks:**
    ```bash
    pre-commit install
    ```
    This command installs the pre-commit hooks that ensure formatting and linting happen automatically before each commit.

5. **Create a lock file**:
    ```bash
    uv lock
    ```
    This command creates a lock file which locks all dependencies in the project to a known version.

## Development

*   **Run the API server:** Start the FastAPI server locally for development.
    ```bash
    python -m src.my_package.run
    ```
    or
    ```bash
    uvicorn my_package.api:app --reload
    ```

*   **Access API documentation:** Open your browser and navigate to:
    - Swagger UI: http://localhost:8000/docs
    - ReDoc: http://localhost:8000/redoc

*   **Run tests:** Use `pytest` in the root folder to run tests.
    ```bash
    pytest
    ```

### API Endpoints

* `GET /` - Root endpoint with API information
* `POST /process` - Process a list of data items
  - Accepts JSON with items array and optional name
  - Returns average, maximum, and count of processed items

## Docker Support

The project includes production-ready Docker configuration:

* Multi-stage build for smaller images
* Non-root user for security
* Proper environment variables
* Health checks
* Resource constraints

To build and run with Docker:

```bash
# Build the image
docker build -t python-best-practices .

# Run the container
docker run -p 8000:8000 python-best-practices
```

## Automatic Linting and Formatting

*   `ruff` automatically fixes formatting and linting errors when you save changes.

## Type Checking

*   `mypy` is run as part of the pre-commit hooks and will catch any type issues.

## Configuration

### Core Configuration

The project's core configuration is located in the `pyproject.toml` file.

*   **Project Metadata:**
    *   Basic project information like name, version, description, authors, etc.
    *   Python version specified in `requires-python`
*   **Dependencies:**
    *   Project's dependencies listed in the `[project.dependencies` array.
    *   Development dependencies listed in the `[project.optional-dependencies.dev]` array, or you can add additional groups.

#### `[tool.uv]`

*   `default-groups = ["dev"]`: Sets dev dependencies to be installed by default.

#### `[tool.ruff]`

*   `line-length = 100`: Sets the maximum line length.
*   `select`: List of rules enabled from `ruff` and different linters.
*   `ignore`: List of rules ignored.
*   `fix = true`: Automatically fix linting errors.
*   `per-file-ignores`: Configure specific files or patterns for ignoring certain rules.
*    `quote-style = "single"`: Sets style to use single quotes.

#### `[tool.mypy]`

*   `mypy_path = "src"`: The location of your packages for mypy type checking.
*   `python_version = "3.10"`: The Python version being used.
*   `strict = true`: Enables strict type checking options.
*   `plugins = ["pytest_mypy_plugins"]`: Makes pytest plugin available for mypy.

### Git Hooks Configuration (`.pre-commit-config.yaml`)

This file configures `pre-commit`, a tool that runs checks before each commit. It includes:

*   **General-Purpose Hooks (`pre-commit-hooks`):** Trailing whitespace removal, end-of-file newline enforcement, YAML validation, etc.
*   **`ruff` Hook (`astral-sh/ruff-pre-commit`):** Automatically fixes `Ruff` errors (`ruff --fix`).
*   **`black` Hook (`psf/black`):** Automatically reformats your code with the black formatter
*   **`mypy` Hook (`pre-commit/mirrors-mypy`):** Checks code for type errors with `mypy`

### VS Code Configuration (`.vscode/settings.json`)

This file configures the VS Code editor.

*   **Type Checking:** `python.analysis.typeCheckingMode`: Enables Python's type checker.
*   **Linting:** `python.linting.ruffEnabled`: Enables `ruff` as the linter.
*   **Formatting:** `python.formatting.provider`: Disables default formatter, since pre-commit is being used.
*   **Ruff Settings:** Settings for Ruff language server (e.g., `importStrategy`, `organizeImports`, `fixAll`, `showSyntaxErrors`).
*   `ruff.configurationPreference`: prioritize file based configs.

## Common and Useful Configurations (Not in Base Config)

Here are some additional configurations that are often useful and are commonly used or at least helpful if applicable.

### 1. Custom Ruff Rules and Ignores

*   **`[tool.ruff.lint.per-file-ignores]`:** Use this section to ignore rules for specific files. For example:

    ```toml
    [tool.ruff.lint.per-file-ignores]
    "tests/*" = ["S101", "ANN"]  # Allow asserts and skip annotations in tests.
    "src/my_package/legacy.py" = ["B001", "B002"] # Ignore specific bugbear rules for legacy code
    ```

*   **`extend-select` and `extend-ignore`:** Add additional rules or ignore rules for the project.

    ```toml
    [tool.ruff.lint
    extend-select = ["PT"] # adds rules from flake8-pytest
    extend-ignore = ["ANN101", "ANN401"] # extends the ignore rules
    ```

*   **Rule Specific Options:** Certain rules can be further configured, like for example isort options.

    ```toml
    [tool.ruff.lint.isort]
    force-wrap-aliases = true
    ```

### 2. Custom Mypy Options

*   **`ignore_missing_imports`:** If you are having issues with dependencies and type checking. Set to `true`.

    ```toml
    [tool.mypy]
    ignore_missing_imports = true
    ```

*   **`disallow_untyped_defs`:** If you want to require type annotations in function definitions, use `disallow_untyped_defs = true`.

    ```toml
    [tool.mypy]
    disallow_untyped_defs = true
    ```

*  **`disallow_any_explicit`**: If you want to disallow explicit use of `Any` types in the code.

   ```toml
   [tool.mypy]
    disallow_any_explicit = true
   ```

*   **`warn_unreachable`:** If you want to enable warning for unreachable code

    ```toml
    [tool.mypy]
    warn_unreachable = true
    ```

    See [Mypy configuration docs](https://mypy.readthedocs.io/en/stable/config_file.html) for a complete listing of available settings.

### 3. `uv` Configuration

*   **`constraint-dependencies`:** If you want to pin a transitive dependency to a specific version use `constraint-dependencies`.

    ```toml
    [tool.uv]
        constraint-dependencies = ["cryptography<42.0.0"]
    ```

*   **`override-dependencies`:** Forces a dependency to use a specific version

    ```toml
    [tool.uv]
        override-dependencies = ["cryptography==42.0.0"]
    ```

*   **`index`:** You can specify additional package indexes to get dependencies from

    ```toml
    [[tool.uv.index]]
     name = "pytorch"
     url = "https://download.pytorch.org/whl/cu121"
     explicit = true

     [tool.uv.sources]
     torch = { index = "pytorch" }
    ```

### 4. Test Configuration

*   `pytest.ini`: Create a `pytest.ini` in your root folder to configure options for `pytest`.

    ```ini
    [pytest]
    testpaths = tests
    addopts =
        --cov=src/my_package
        --cov-report term-missing
        -vv
    ```

    This will make sure that pytest runs against all tests in the tests folder

    It will also add coverage info for `src/my_package`

    It will also run in verbose mode

### 5. `pre-commit` Config

You can add additional hooks from other repositories.

You can configure existing hooks as needed. For example if you want to exclude files from ruff you can use:

```yaml
-   id: ruff
    args: ["--fix", "--exclude", "path/to/exclude"]
```

## Environment and Workspace Setup Tips

### Using Different Python Versions
- The template requires Python 3.10 or higher
- If you have multiple Python versions installed:
  - On Windows, use `py -3.10 -m venv .venv` to specify version
  - On Unix, use `python3.10 -m venv .venv`
  - With uv, specify Python version in pyproject.toml's `requires-python`

### IDE Integration
1. **VS Code**
   - Install Python and Ruff extensions
   - Use the command palette to select your Python interpreter
   - Restart VS Code after installing pre-commit hooks
   - Set "Files: Eol" to "\n" for consistent line endings

2. **PyCharm**
   - Enable "Ruff" under Languages & Frameworks > Python > Ruff
   - Set "Editor > Code Style > Line separator" to Unix
   - Configure pytest as default test runner

### Virtual Environment Best Practices
- Create one venv per project to avoid dependency conflicts
- Don't commit the .venv directory (it's in .gitignore)
- On Windows, if UV fails, fall back to `python -m venv`
- Rebuild venv if you suspect dependency issues

## Troubleshooting

### Common Issues

1. **"Command not found" errors after installing tools**
   - Make sure your PATH includes the Linuxbrew/Homebrew bin directory
   - Try restarting your terminal or running `source ~/.bashrc` (or equivalent for your shell)

2. **UV-specific issues**
   - If `uv sync` fails with "Default group 'dev' is not defined", check your pyproject.toml configuration
   - When using UV as a Python module (e.g., in scripts), install it with `pip install uv`
   - For Windows users, you may need to use the full path to Python when creating virtual environments: `python -m venv .venv`

3. **Type checking errors with third-party libraries**
   - Install type stubs for the library: `uv pip install types-libraryname`
   - Add the library to mypy's ignore list in pyproject.toml if stubs aren't available
   - If using pytest-mypy-plugins and getting errors, you can remove it from mypy configuration as it's optional

4. **Pre-commit hook configuration**
   - Run `pre-commit run --all-files` to see detailed error messages
   - Fix the issues according to the error messages or update hook configurations
   - Note that ruff-format may report as "failed" when it successfully formats files - this is expected behavior
   - If ruff configuration issues occur, start with a minimal configuration and gradually add rules

5. **Package installation and development mode**
   - When installing in development mode with `-e`, ensure you're in the correct directory
   - Virtual environment activation on Windows uses backslashes: `.venv\Scripts\activate`
   - For coverage warnings about "No source for code", ensure your package is installed in development mode

6. **Testing issues**
   - For integration tests, ensure paths use forward slashes even on Windows (pytest preference)
   - Coverage warnings about temporary files can be safely ignored during integration testing
   - When tests modify files, use tempfile.TemporaryDirectory() to avoid affecting the actual project files

### Development Tips

1. **Efficient Testing Workflow**
   - Run specific test files: `pytest tests/test_module.py -v`
   - Run tests with coverage: `pytest --cov=src/my_package`
   - Use `-v` flag for verbose output to see individual test results

2. **Type Checking Best Practices**
   - Add `-> None` return type annotation to test functions
   - Use `# type: ignore` comments judiciously for intentional type violations in tests
   - Consider running mypy separately from pre-commit for faster development iterations

3. **Code Style and Formatting**
   - Let ruff handle code formatting automatically via pre-commit
   - Use single quotes for strings (configured in ruff settings)
   - Keep line length to 100 characters (configured in ruff settings)

## Publishing Your Package to PyPI

Once your project is ready for distribution, you can publish it to the Python Package Index (PyPI) to make it available for installation via `pip` or `uv`. Here's a step-by-step guide to publishing your package:

### Preparing Your Package for Publication

1. **Ensure your `pyproject.toml` is properly configured:**
   - Verify your project metadata (name, version, description, author, etc.)
   - Check that all dependencies are correctly listed
   - Make sure you have a clear and informative README.md

2. **Create or update your package classifiers:**
   Add appropriate classifiers to help users find your package:

   ```toml
   [project]
   # ...existing metadata...
   classifiers = [
       "Development Status :: 4 - Beta",
       "Intended Audience :: Developers",
       "License :: OSI Approved :: MIT License",
       "Programming Language :: Python :: 3",
       "Programming Language :: Python :: 3.10",
       "Programming Language :: Python :: 3.11",
       "Topic :: Software Development :: Libraries",
   ]
   ```

### Building Distribution Packages

1. **Install build tools:**
   ```bash
   uv pip install build twine
   ```

2. **Build your package:**
   ```bash
   python -m build
   ```

   This creates both source distributions (`.tar.gz`) and wheel distributions (`.whl`) in the `dist/` directory.

### Testing with TestPyPI

Before publishing to the main PyPI repository, it's a good practice to test with TestPyPI:

1. **Create a TestPyPI account:**
   Register at [https://test.pypi.org/account/register/](https://test.pypi.org/account/register/)

2. **Configure your credentials:**
   Create or edit `~/.pypirc`:
   ```
   [distutils]
   index-servers =
       pypi
       testpypi

   [pypi]
   username = __token__
   password = pypi-AgEIcHlwaS5vcmc...  # Your PyPI API token

   [testpypi]
   repository = https://test.pypi.org/legacy/
   username = __token__
   password = pypi-AgEIcHlwaS5vcmc...  # Your TestPyPI API token
   ```

3. **Upload to TestPyPI:**
   ```bash
   python -m twine upload --repository testpypi dist/*
   ```

4. **Test installation from TestPyPI:**
   ```bash
   uv pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ your-package-name
   ```

### Publishing to PyPI

Once you've verified everything works correctly with TestPyPI:

1. **Create a PyPI account:**
   Register at [https://pypi.org/account/register/](https://pypi.org/account/register/)

2. **Generate an API token:**
   - Go to https://pypi.org/manage/account/token/
   - Create a token with the "Upload to PyPI" scope
   - Save this token securely as it won't be shown again

3. **Upload to PyPI:**
   ```bash
   python -m twine upload dist/*
   ```
   You'll be prompted for your username and password (or token).

4. **Verify installation from PyPI:**
   ```bash
   uv pip install your-package-name
   ```

### Automating Publication with GitHub Actions

You can automate the publication process using GitHub Actions. Here's a sample workflow:

1. **Create a GitHub Actions workflow file** in `.github/workflows/publish.yml`:

```yaml
name: Publish to PyPI

on:
  release:
    types: [created]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Set up Python
      uses: actions/setup-python@v5
      with:
        python-version: '3.10'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install build twine
    - name: Build and publish
      env:
        TWINE_USERNAME: ${{ secrets.PYPI_USERNAME }}
        TWINE_PASSWORD: ${{ secrets.PYPI_PASSWORD }}
      run: |
        python -m build
        twine upload dist/*
```

2. **Add secrets in your GitHub repository:**
   - Go to your repository settings
   - Navigate to Secrets and variables > Actions
   - Add `PYPI_USERNAME` (use `__token__`)
   - Add `PYPI_PASSWORD` (your PyPI API token)

With this workflow, a new package version will be automatically published whenever you create a new GitHub release.

### Version Management

Follow semantic versioning (MAJOR.MINOR.PATCH) for your releases:
- MAJOR: Incompatible API changes
- MINOR: New functionality in a backward-compatible manner
- PATCH: Backward-compatible bug fixes

Update your version in `pyproject.toml` before each release:
```toml
[project]
name = "my_package"
version = "0.2.0"  # Update this line
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

If you would like to add features to this template, or suggest improvements, feel free to create a pull request.
