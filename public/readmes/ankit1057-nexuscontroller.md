# NexusController - Advanced Android Automation Platform

NexusController is a comprehensive and professional-grade Android device automation platform that bridges the gap between manual testing and continuous integration. Built for QA engineers, developers, and DevOps professionals, NexusController provides a unified solution for Android device control, UI automation, and test orchestration.

## Key Features

- **Universal Device Control**: Connect to and manage multiple Android devices simultaneously via ADB with robust error handling and device state management
- **Intelligent UI Automation**: Create, record, and execute Maestro flows for reliable UI testing that survives app updates and device variations
- **Jupyter Integration**: Leverage interactive Python notebooks for exploratory testing, automation script development, and results analysis
- **CI/CD Ready**: Integrate with your continuous integration pipeline through command-line tools and GitHub Actions workflows
- **Model Context Protocol (MCP) Support**: Seamlessly integrate with LLM tools and assistants via standard MCP interface
- **Comprehensive Reporting**: Generate detailed HTML reports with screenshots, error logs, and performance metrics

## Why NexusController?

- **Reliability**: Built with robust error detection, recovery mechanisms, and logging to handle real-world testing scenarios
- **Flexibility**: Works with any Android app or device without requiring code modifications or instrumentation
- **Productivity**: Interactive menus, intuitive Jupyter interface, and reusable components accelerate test development
- **Enterprise Ready**: Designed with security, scalability and commercial deployment requirements in mind
- **Developer-Focused**: Clear documentation, modular architecture, and extensible design make it easy to adapt to your needs

## Prerequisites

- Python 3.8+
- ADB (Android Debug Bridge) installed and in PATH
- Connected Android device with USB debugging enabled
- Maestro CLI (optional, for enhanced UI automation)

## Quick Start

1. **Installation**:
```bash
pip install nexuscontroller
```

2. **Basic Usage**:
```python
from nexuscontroller import AndroidController

# Initialize controller
controller = AndroidController()

# List connected devices
devices = controller.get_devices()

# Take a screenshot
controller.take_screenshot(devices[0])

# Run a UI test
controller.run_maestro_flow(devices[0], "flows/login_test.yaml")
```

3. **Interactive Mode**:
```bash
python -m nexuscontroller
```

## AI Integration

NexusController is designed to work seamlessly with AI assistants through the Model Context Protocol (MCP). You can integrate NexusController with your AI tools to automate mobile testing and device control.

### MCP Server Usage

The MCP server can be run in several ways after installation:

```bash
# Method 1: Using the module
python -m nexuscontroller.mcp

# Method 2: Using the CLI command (available after pip install)
nexus-mcp

# Method 3: Using the included script
./start_mcp_server.py
```

All methods support these options:
- `--install-deps`: Install required dependencies
- `--debug`: Enable debug logging

### Quick Integration Example

```json
// mcp.json configuration for AI assistants
{
  "mcpServers": {
    "nexuscontroller": {
      "command": "python3",
      "args": ["-m", "nexuscontroller.mcp"],
      "transport": "stdio"
    }
  }
}
```

For more details, see the [MCP Server Documentation](nexuscontroller/mcp/README.md).

## Commercial Use

NexusController is available under MIT license with special provisions for commercial use by large enterprises. See the [LICENSE](LICENSE) file for details.

## Project Status

✅ **Project Completed!**

The NexusController project has been successfully implemented with the following components:
- Core Android device control functionality
- Model Context Protocol (MCP) integration
- Temporary file handling with proper permissions
- Screenshot and screen recording capabilities
- UI element inspection and manipulation
- Maestro flow execution support

You can now build and release this library to PyPI.

## Documentation

For full documentation, examples, and API reference, visit our [documentation site](https://github.com/ankit1057/nexuscontroller).

## Contributing

We welcome contributions from the community! See our [contribution guidelines](CONTRIBUTING.md) for more information.

## Acknowledgments

- Created and maintained by [ankit1057](https://github.com/ankit1057)
- Powered by [Maestro](https://maestro.mobile.dev/) for UI automation
- Inspired by the mobile testing needs of enterprise app development teams