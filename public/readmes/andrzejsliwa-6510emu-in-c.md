# 6510 CPU Emulator

A modern C implementation of a 6510/6502 CPU emulator with disassembly support. The 6510 was used in the Commodore 64 and is compatible with the 6502 with some additional I/O port capabilities.

## Features

- Complete implementation of all official 6510/6502 CPU instructions
- Accurate cycle timing with real-time (1MHz) operation mode
- High-performance mode for maximum execution speed
- Built-in disassembler for debugging
- Register monitoring and execution tracing
- 6510-specific I/O port handling at addresses 0x0000 and 0x0001
- Performance metrics (MIPS calculation)

## Requirements

- C compiler (gcc or clang... to meet c11 standard)
- Standard C libraries
- make (for building with the provided Makefile)

## Building

Clone the repository and build using make:

```bash
git clone https://github.com/yourusername/6510-emu.git
cd 6510-emu
make
```

Getting Help about available make tasks:

```bash
make help 
Help:
  make all                 Build the 6510 emulator"
  make debug               Build with debug symbols"
  make run                 Run the emulator
  make run_disasm          Run with disassembly
  make run_regs            Run with disassembly and register display
  make run_fast            Run at maximum speed
  make run_fast_disasm     Run at maximum speed with disassembly
  make clean               Clean build artifacts
```

For a debug build with symbols:

```bash
make debug
```

## MCP Server Configuration

The project uses MCP (Make Command Protocol) servers for enhanced development experience. To set up the MCP servers:

1. First, install `uv` (a fast Python package installer and resolver):
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2. Install the MCP server for make functionality:
```bash
uv pip install mcp-server-make
```

3. The project is configured to use the `mcp-server-make` server through `uvx`. This configuration is stored in `.cursor/mcp.json` and allows for:
   - Safe execution of make targets with output capture
   - Better integration with build processes
   - Enhanced development feedback
   - Automatic make command handling through the IDE

4. To use with your IDE, ensure your configuration includes:
```json
{
  "mcpServers": {
    "make": {
      "command": "uvx",
      "args": [
        "mcp-server-make"
      ]
    }
  }
}
```

## Usage

Run the emulator with default settings:

```bash
./emu
```

### Command-line Options

- `--fast` or `-f`: Run at maximum speed (instead of real-time 1MHz)
- `--disassemble` or `-d`: Show disassembly of instructions while running
- `--registers` or `-r`: Show register values alongside disassembly

### Example Commands

Run with disassembly output:
```bash
./emu --disassemble
```

Run with disassembly and register display:
```bash
./emu --disassemble --registers
```

Run at maximum speed:
```bash
./emu --fast
```

### Makefile Shortcuts

The Makefile provides convenient shortcuts for common commands:

- `make run` - Run the emulator
- `make run_disasm` - Run with disassembly output
- `make run_regs` - Run with disassembly and register display
- `make run_fast` - Run at maximum speed
- `make run_fast_disasm` - Run at maximum speed with disassembly

## Memory Map

The emulator provides a full 64K memory space. Special handling is implemented for:

- 0x0000: 6510 I/O Port Direction Register
- 0x0001: 6510 I/O Port Data Register
- 0x0100-0x01FF: Stack
- 0xFFFC-0xFFFD: Reset vector

## Programming the Emulator

To use the emulator with your own programs, you need to load your code into memory and set up the reset vector to point to your code entry point.

Example:
```c
// Load a program that adds 5 and 10, stores result in location 0x200
cpu.Memory[0xFFFC] = 0x00;  // Reset vector LSB
cpu.Memory[0xFFFD] = 0x80;  // Reset vector MSB
   
// Program at 0x8000
cpu.Memory[0x8000] = 0xA9;  // LDA #$05
cpu.Memory[0x8001] = 0x05;
cpu.Memory[0x8002] = 0x69;  // ADC #$0A
cpu.Memory[0x8003] = 0x0A;
cpu.Memory[0x8004] = 0x8D;  // STA $0200
cpu.Memory[0x8005] = 0x00;
cpu.Memory[0x8006] = 0x02;
cpu.Memory[0x8007] = 0x00;  // BRK
```

## Using the Emulator as a Library

The emulator is designed to be easily integrated into other programs:

```c
#include "emu.h"

int main() {
    CPU cpu;
    
    // Initialize CPU
    cpu_init(&cpu);
    
    // Load program into memory
    // ...
    
    // Reset CPU to start execution
    cpu_reset(&cpu);
    
    // Main emulation loop
    while (cpu.IsRunning) {
        cpu_step(&cpu);
        
        // Your custom code here
        // ...
    }
    
    return 0;
}
```

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
