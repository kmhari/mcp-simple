# Decent Sampler Drums MCP Server

A Model Context Protocol server for generating [Decent Sampler](https://www.decentsamples.com/product/decent-sampler-plugin/) drum kit configurations.

This TypeScript-based MCP server provides specialized tools and prompts for creating DecentSampler drum kit presets, including WAV file analysis and XML generation.

<a href="https://glama.ai/mcp/servers/phypkuqwcn"><img width="380" height="200" src="https://glama.ai/mcp/servers/phypkuqwcn/badge" alt="Decent-Sampler Drums Server MCP server" /></a>

## Demo Video

[![Watch a simple demo video on YouTube here!](http://i.ytimg.com/vi/cftEq62gfDE/hqdefault.jpg)](https://www.youtube.com/watch?v=cftEq62gfDE)

**Warning:** Creating complex presets may end up exceeding Claude Desktop's maximum message length. We are still working on streamlining this tool to work around this limitation. If you are creating simple presets without a lot of mics or other variations, the xml file should be small enough for Claude to write to a file.

## Features

- [WAV file analysis and validation](docs/tools.md#analyze_wav_samples)
- [Global pitch and envelope controls](docs/tools.md#configure_drum_controls)
- [Multi-mic routing with MIDI controls](docs/tools.md#configure_mic_routing)
- [Round robin sample playback](docs/tools.md#configure_round_robin)
- [Flexible velocity layer handling](docs/schemas.md#generate_drum_groups)
- [Muting group support](docs/schemas.md#generate_drum_groups)
- [Auxiliary output routing](docs/tools.md#configure_mic_routing)

## Documentation

- [How do I use these tools?](docs/workflows.md) - Step-by-step workflows with real examples
- [Tools Documentation](docs/tools.md) - Detailed information about each available tool
- [Input Schemas](docs/schemas.md) - TypeScript interfaces and parameter descriptions

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (usually comes with Node.js)
- Claude Desktop app (for use with Claude)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Build the server:
```bash
npm run build
```

3. Add to your Claude Desktop config:

**Windows:** `%APPDATA%/Claude/claude_desktop_config.json`
**MacOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "decent-sampler-drums": {
      "command": "npx",
      "args": [
        "-y",
        "@dandeliongold/mcp-decent-sampler-drums"
      ],
      "env": {}
    }
  }
}
```

## Development

For development with auto-rebuild:
```bash
npm run watch
```

For debugging, use the MCP Inspector:
```bash
npm run inspector
```

## Usage Guidelines

When using this MCP server to generate simple presets, you should always reference the `simple_preset_guidelines` prompt.

For more complex presets (including sections such as buses, effects, etc.), reference the `advanced_preset_guidelines` prompt. Note that creating complex presets with a large number of samples can still be unstable and may exceed Claude Desktop's maximum message length.

Both prompts will ask you to provide a samplesDirectory argument - this should be the absolute path to your drum samples folder (e.g., "C:/Users/username/Documents/DrumSamples"). The prompt will then automatically use this directory in all examples and configurations, making it easier to follow along with the correct paths for your system.

## About Decent Sampler

Decent Sampler is a FREE sampling plugin that allows you to play samples in the Decent Sampler format.

### Useful Links

- [Download Decent Sampler Plugin](https://www.decentsamples.com/product/decent-sampler-plugin/)
- [Decent Sampler Developer Resources](https://www.decentsamples.com/decent-sampler-developer-resources/)

### Sample Sources

The goal of this MCP server is to make it easier to set up your own presets, whether you're playing your kitchen utensils into your phone, or recording a full kit in a studio. To create your own drum kits, you'll also need samples.

If you don't already have samples ready to go, here are some resources to get started:

#### Free and Low-Cost Sample Resources

- **99sounds.org**
  - [Drum Samples Collection](https://99sounds.org/drum-samples/) - Various drum kits and percussion samples
  - [Dub & Reggae Sounds](https://99sounds.org/dub-reggae-sounds/) - Specialized collection of reggae drum sounds

- **Archive.org:** [Sample Pack Collection](https://archive.org/search?query=subject%3A%22Sample+Pack%22+drums&sort=-downloads) - Community-contributed drum samples, sorted by popularity. Includes some cool stuff like vintage drum machines and CMI Fairlight samples.

- **Sample Pack Nation:** [Oberheim DMX/DX Drumkits](https://samplepacknation.bandcamp.com/album/oberheim-dmx-dx-drumkits-50-sounds) - Classic drum machine sounds (Under 10 USD/EUR)
