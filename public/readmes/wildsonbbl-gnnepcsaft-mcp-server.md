# GNNEPCSAFT MCP Server

## What is GNNEPCSAFT MCP Server?

GNNEPCSAFT MCP Server is an implementation of the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) for [GNNePCSAFT](https://github.com/wildsonbbl/gnnepcsaft) tools. It enables seamless communication and context management between large language models (LLMs) and clients for advanced thermodynamic calculations. GNNePCSAFT leverages Graph Neural Networks (GNNs) to estimate [ePC-SAFT](https://en.wikipedia.org/wiki/PC-SAFT) parameters, allowing property predictions such as density and vapor pressure for any molecule, even without experimental data. [FeOS](https://github.com/feos-org/feos) is used for PC-SAFT calculations.

---

## Key Features

- **Estimate ePC-SAFT parameters** using GNNs
- **Calculate density, vapor pressure, enthalpy of vaporization, critical points, and others**
- **Support for pure components and mixtures**
- **Automatic data collection from PubChem** for any molecule
- **Designed for thermodynamics-aware LLMs**

---

## How to Use

### Installation

You need [uvx](https://docs.astral.sh/uv/) installed.

### Starting the Server

```bash
uvx --from gnnepcsaft-mcp-server gnnepcsaftmcp
```

### Example: Claude Desktop Configuration

```json
{
  "mcpServers": {
    "gnnepcsaft": {
      "command": "uvx",
      "args": ["--from", "gnnepcsaft-mcp-server", "gnnepcsaftmcp"]
    }
  }
}
```

---

## Use Cases

- Predicting thermodynamic properties for new or existing molecules
- Running property calculations for mixtures in research or industry
- Integrating with LLMs for chemistry and materials science applications
- Automating data collection and property estimation in pipelines

---

## FAQ

**Q: What do I need to run the server?**  
A: You need Python, [uvx](https://docs.astral.sh/uv/), and the GNNEPCSAFT MCP Server package.

**Q: Can I use this for mixtures as well as pure components?**  
A: Yes, the server supports both pure components and mixtures.

**Q: Where does the molecular data come from?**  
A: The server can automatically fetch molecular information from PubChem.

**Q: What calculations are supported?**  
A: Density, vapor pressure, enthalpy of vaporization, critical points, and ePC-SAFT parameter estimation.

**Q: Is this open source?**  
A: Yes, it is licensed under the GNU General Public License v3.0.

---

## License

GNU General Public License v3.0
