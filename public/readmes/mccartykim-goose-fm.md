# Goose FM

A simple demonstration of how MCP servers work for a tech talk at work!

With an rtl-sdr dongle and an antenna, your AI assistant can tune into radio stations and play them via your speakers.

## Usage

The command to run this stdio server:

```
nix run github:mccartykim/goose_fm
```

To add to Claude desktop:
```
"GooseFM": {
  "command": "nix",
  "args": [
    "run",
    "github:mccartykim/goose_fm",
  ]
}
```

Known issues: Nix flake doesn't seem to properly encapsulate sox and rtl_fm in their scope... yet
