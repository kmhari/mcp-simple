# mcp-gamecube-bridge

[MCP](https://modelcontextprotocol.io/) bridge of [Jiangtun](https://github.com/u1f992/jiangtun). Grant Nintendo GameCube operation functionality to clients.

Bug: Python interpreter process remains after exiting Claude Desktop, use `ps` and `kill` to exit.

![](./screenshot.png)

```
$ uv venv
$ uv sync
$ source .venv/bin/activate
$ python main.py
usage: main.py [-h] [--serial-port SERIAL_PORT] [--camera CAMERA] [--skip-frames SKIP_FRAMES]

options:
  -h, --help            show this help message and exit
  --serial-port SERIAL_PORT
  --camera CAMERA
  --skip-frames SKIP_FRAMES

available ports:
  ['/dev/ttyS31', '/dev/ttyS30', '/dev/ttyS29', '/dev/ttyS28', '/dev/ttyS27', '/dev/ttyS26', '/dev/ttyS25', '/dev/ttyS24', '/dev/ttyS23', '/dev/ttyS22', '/dev/ttyS21', '/dev/ttyS20', '/dev/ttyS19', '/dev/ttyS18', '/dev/ttyS17', '/dev/ttyS16', '/dev/ttyS15',
  '/dev/ttyS14', '/dev/ttyS13', '/dev/ttyS12', '/dev/ttyS11', '/dev/ttyS10', '/dev/ttyS9', '/dev/ttyS8', '/dev/ttyS7', '/dev/ttyS6', '/dev/ttyS5', '/dev/ttyS4', '/dev/ttyS3', '/dev/ttyS2', '/dev/ttyS1', '/dev/ttyS0', '/dev/ttyACM1']

available cameras:
  ['/dev/video0', '/dev/video1', '/dev/video2', '/dev/video3', '/dev/video12', '/dev/video13']
```

##### claude_desktop_config.json

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "/home/u1f992/Documents/mcp-gamecube-bridge/.venv/bin/python",
      "args": [
        "/home/u1f992/Documents/mcp-gamecube-bridge/main.py",
        "--serial-port",
        "/dev/ttyACM0",
        "--camera",
        "/dev/video8"
      ]
    }
  }
}
```
