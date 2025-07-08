# MCP MIDI Server

A FastMCP Server which allows an LLM to send MIDI sequences into any software that supports MIDI input.

## Features

- Creates a virtual MIDI output port
- Sends MIDI Note On/Off messages
- Sends Control Change (CC) messages
- Sequences MIDI events with precise timing
- Can be used as a MIDI input device in any application that supports MIDI

## Requirements

- Python 3.7+
- rtmidi
- fastmcp
- python-dotenv
- asyncio

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mcp-server-midi
   ```

2. Create a virtual env, activate it and install dependencies:
   ```
   python -m venv .venv
   source .venv/bin/activate

   pip install -r requirements.txt
   ```

3. Create a `.env` file with your configuration:
   ```
   PORT=8123
   ```

## Usage

Run the server:

```
python mcp_midi_server.py
```

The server creates a virtual MIDI port named "MCP MIDI Out" that can be used as a MIDI input device in other applications. This means you can:

- Connect digital audio workstations (DAWs) like Ableton Live, Logic Pro, or FL Studio to receive MIDI from this server
- Use the server to control hardware synthesizers through your computer's MIDI interface
- Connect to any other software that accepts MIDI input (virtual instruments, lighting controllers, etc.)

Simply select "MCP MIDI Out" as a MIDI input device in your preferred MIDI-compatible application.

## MCP Config

The server uses Server-Sent Events (SSE), this is how to config it in Cursor:
```
{
  "mcpServers": {
      "midi": {
          "url": "http://localhost:8123/sse"
      }
   }
}
```

## API Methods

### Send Note On

Sends a MIDI Note On message.

Parameters:
- `note`: MIDI note number (0-127)
- `velocity`: Note velocity (0-127, default 127)
- `channel`: MIDI channel (0-15, default 0)

### Send Note Off

Sends a MIDI Note Off message.

Parameters:
- `note`: MIDI note number (0-127)
- `velocity`: Note off velocity (0-127, default 64)
- `channel`: MIDI channel (0-15, default 0)

### Send Control Change

Sends a MIDI Control Change (CC) message.

Parameters:
- `controller`: CC controller number (0-127)
- `value`: CC value (0-127)
- `channel`: MIDI channel (0-15, default 0)

### Send MIDI Sequence

Sends a sequence of MIDI Note On/Off messages with specified durations.

Parameters:
- `events`: A list of event dictionaries. Each dictionary must contain:
  - `note`: MIDI note number (0-127)
  - `velocity`: Note velocity (0-127, default 127)
  - `channel`: MIDI channel (0-15, default 0)
  - `duration`: Time in seconds to hold the note before sending Note Off
  - `start_time`: Time in seconds when to start the note, relative to sequence start (default 0)

## Example

Using the API to play a C major chord:

```python
events = [
    {"note": 60, "velocity": 100, "duration": 1.0, "start_time": 0.0},  # C4
    {"note": 64, "velocity": 100, "duration": 1.0, "start_time": 0.0},  # E4
    {"note": 67, "velocity": 100, "duration": 1.0, "start_time": 0.0},  # G4
]
# Send to the MCP MIDI Server API
```

## License

MIT