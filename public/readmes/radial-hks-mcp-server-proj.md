# MCP Server PROJ

A Model Context Protocol (MCP) server for coordinate system transformations and map projections.

## Features

- Multiple coordinate system format support:
  - EPSG codes
  - WKT (Well-Known Text)
  - Proj string format
- Batch coordinate transformation
- Simple and intuitive API
- Dual-mode operation: server or library

## Installation

```bash
pip install mcp-server-proj
```

## Usage

### Server Mode

```bash
mcp-server-proj
```

### Library Mode

```python
from mcp_server_proj import CoordinateTransformer

# Create transformer instance
transformer = CoordinateTransformer()

# Set source and target coordinate systems
transformer.set_source_crs("EPSG:4326")  # WGS84
transformer.set_target_crs("EPSG:3857")  # Web Mercator

# Initialize transformer
transformer.initialize_transformer()

# Transform coordinates
x, y = transformer.transform_point(116.3, 39.9)
print(f"Transformed coordinates: ({x}, {y})")
```

## API Documentation

### CoordinateTransformer

The main coordinate transformation class provides the following methods:

- `set_source_crs(crs: str)`: Set source coordinate system
- `set_target_crs(crs: str)`: Set target coordinate system
- `initialize_transformer()`: Initialize the transformer
- `transform_point(x: float, y: float) -> tuple[float, float]`: Transform a single point

### Server

The MCP protocol server provides two tools:

- `transform-coordinates`: Transform coordinates between different systems
  ```json
  {
    "source_crs": "EPSG:4326",
    "target_crs": "EPSG:3857",
    "coordinates": [
      {"x": 116.3, "y": 39.9}
    ]
  }
  ```

- `list-supported-crs`: List all supported coordinate systems

## Supported Coordinate Systems

### 1. EPSG Codes
Standard identifiers for coordinate reference systems:
- EPSG:4326 - WGS84 Geographic
- EPSG:3857 - Web Mercator
- And many more...

### 2. WKT Format
Example of a geographic coordinate system:
```
GEOGCS["WGS 84",
  DATUM["WGS_1984",
    SPHEROID["WGS 84",6378137,298.257223563]],
  PRIMEM["Greenwich",0],
  UNIT["degree",0.0174532925199433]]
```

### 3. Proj Format
Example of WGS84:
```
+proj=longlat +datum=WGS84 +no_defs +type=crs
```

## Development

### Debugging
For the best debugging experience, use the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npx @modelcontextprotocol/inspector mcp-server-proj
```

## Dependencies

- Python >= 3.12
- mcp >= 1.3.0
- pyproj >= 3.0.0

## License

MIT

## Author

radial-hks (radialjiajie@gmail.com)

## Contributing

Issues and Pull Requests are welcome!
