# MCP server in Python
## also nixified in uv
This project is derived from the template at 

```shell
nix flake init --template "github:nulladmin1/nix-flake-templates#uv"
```

And I am very thankful he figured out making python happy with nix.

To add to your Claude config:
```
"minimal-mcp-in-nix": {
  "command": "nix",
  "args": [
    "run",
    "github:mccartykim/minimal-mcp-in-nix",
  ]
}
```

This is a very simple MPC demo that offers a stub location that just says where I'm presenting my demo for the time being, plus a tool to get the current time.
