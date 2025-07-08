# Multi-Robot Control MCP Agent

This project creates an MCP (Model Context Protocol) server that allows AI agents to control multiple robots via existing FastAPI robot control servers.

## Features

- Control multiple robots simultaneously
- Control robot movement (forward, backward, left, right)
- Play sounds through the robots' speakers
- Get robot status information
- Precise velocity control
- Access robot camera images
- Unified API with port specification

## Prerequisites

- Python 3.10+
- UV (Python package manager)
- Multiple running robot control FastAPI servers (as provided in the example)

## Setup

1. Ensure you have a Python 3.10 environment active
2. Install dependencies using UV:
   ```bash
   uv pip install -e .
   ```

## Usage

1. Start the robot control FastAPI servers:
   - First robot on port 8000
   - any other robots on 8001, 8002, etc

2. **Important Update:** The Claude desktop client now automatically runs the MCP server for you
   - No need to manually start the server with `python server.py`
   - The MCP server functionality is integrated directly into the Claude desktop client

3. The MCP server allows AI agents to control multiple robots and access their cameras.

## Available Tools

All tools accept a `port` parameter (default: 8000) to specify which robot to control.

### Movement Control
- `drive_forward`: Move a robot forward
- `drive_backward`: Move a robot backward
- `turn_left`: Turn a robot left
- `turn_right`: Turn a robot right
- `stop`: Stop robot movement
- `drive`: Control with precise velocity values

### Audio Control
- `beep`: Play a sound through a robot's speaker

### Camera Access
- `get_camera_image`: Get an image from a robot's camera

### System Information
- `robot_status`: Get robot status information
- `list_available_robots`: List all available robots and their status

## Available Resources

- `robot://info/{port}`: Get information about a specific robot's capabilities

## Examples

```python
# Get status from robot on port 8000
status_robot1 = await client.robot_status(port=8000)

# Get status from robot on port 8001
status_robot2 = await client.robot_status(port=8001)

# Make both robots beep with different tones
await client.beep(port=8000, frequency=440, duration=1.0)  # A4 note on robot 1
await client.beep(port=8001, frequency=523.25, duration=1.0)  # C5 note on robot 2

# Get a list of all available robots
robots = await client.list_available_robots()
```

## Note on Image Handling

The camera image tools use MCP's native `Image` class for handling image data. This allows the AI agent to receive the image data in a format that can be properly handled by the client without need for additional conversion.
