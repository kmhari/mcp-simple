# GIS MCP Server

<div align="center">
  <h3>✨ Want to perform accurate geospatial analysis in your chatbot? ✨</h3>
  <p><strong>Install GIS-MCP and transform your AI's spatial capabilities!</strong></p>
  <br/>
  <img src="docs/gis-mcp.png" alt="GIS MCP Server Logo" width="300"/>
</div>

A Model Context Protocol (MCP) server implementation that connects Large Language Models (LLMs) to GIS operations using GIS libraries, enabling AI assistants to perform geospatial operations and transformations.

> Alpha
>
> Version 0.3.0 (Alpha) is under active development. We welcome contributions and developers to join us in building this project.

## 🎥 Demo

<div align="center">
  <img src="docs/demo.gif" alt="GIS MCP Server Demo" width="800"/>
</div>

### Rasterio Demo

<div align="center">
  <a href="https://www.veed.io/view/95ff85f4-efbb-4154-9a04-d966c6ae1737?panel=share">
    <br/>
    <em>Click to watch the Rasterio demo video or go to docs folder</em>
  </a>
</div>

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [pip Installation](#-pip-installation)
  - [Development Installation](#-development-installation)
- [Available Tools](#-available-tools)
  - [Shapely Operations](#shapely-operations)
    - [Basic Operations](#basic-operations)
    - [Geometric Properties](#geometric-properties)
    - [Transformations](#transformations)
    - [Advanced Operations](#advanced-operations)
    - [Measurements](#measurements)
    - [Validation and Simplification](#validation-and-simplification)
  - [PyProj Operations](#pyproj-operations)
    - [Coordinate Transformations](#coordinate-transformations)
    - [CRS Information](#crs-information)
    - [Geodetic Calculations](#geodetic-calculations)
  - [Geopandas Operations](#geopandas-operations)
    - [I/O Operations](#i/o-operations)
    - [Join Operations](#join-operations)
  - [Rasterio Operations](#rasterio-operations)
    - [Basic Raster Operations](#basic-raster-operations)
    - [Raster Processing](#raster-processing)
    - [Raster Analysis](#raster-analysis)
- [Client Development](#-client-development)
- [Planned Features](#-planned-features)
- [Contributing](#-contributing)
- [License](#-license)
- [Related Projects](#-related-projects)
- [Support](#-support)
- [Badges](#-badges)

## 🚀 Features

- 🔍 Comprehensive geometric operations (intersection, union, buffer, etc.)
- 🌐 Advanced coordinate transformations and projections
- 📏 Precise distance and area calculations
- 🗺️ Spatial analysis and validation
- 🛠️ Easy integration with MCP-compatible clients

## 📋 Prerequisites

- Python 3.10 or higher
- MCP-compatible client (like Claude Desktop or Cursor)
- Internet connection for package installation

## 🛠️ Installation

Choose the installation method that best suits your needs:

### Installing via Smithery

To install GIS MCP Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@mahdin75/gis-mcp):

```bash
npx -y @smithery/cli install @mahdin75/gis-mcp --client claude
```

### 📦 pip Installation

The pip installation is recommended for most users:

1. Install uv package manager:

```bash
pip install uv
```

2. Create the Virtual Environment (Python 3.10+):

```bash
uv venv --python=3.10
```

3. Install the package:

```bash
uv pip install gis-mcp
```

4. Start the server:

```bash
gis-mcp
```

#### pip Configuration

To use the pip installation with Claude or Cursor, add the following configuration:

**Claude Desktop:**

**Windows:**

```json
{
  "mcpServers": {
    "gis-mcp": {
      "command": "C:\\Users\\YourUsername\\.venv\\Scripts\\gis-mcp",
      "args": []
    }
  }
}
```

**Linux/Mac:**

```json
{
  "mcpServers": {
    "gis-mcp": {
      "command": "/home/YourUsername/.venv/bin/gis-mcp",
      "args": []
    }
  }
}
```

**Cursor IDE** (create `.cursor/mcp.json`):

**Windows:**

```json
{
  "mcpServers": {
    "gis-mcp": {
      "command": "C:\\Users\\YourUsername\\.venv\\Scripts\\gis-mcp",
      "args": []
    }
  }
}
```

**Linux/Mac:**

```json
{
  "mcpServers": {
    "gis-mcp": {
      "command": "/home/YourUsername/.venv/bin/gis-mcp",
      "args": []
    }
  }
}
```

After configuration:

1. Make sure to replace `YourUsername` with your actual username
2. For development installation, replace `/path/to/gis-mcp` with the actual path to your project
3. Restart your IDE to apply the changes
4. You can now use all GIS operations through Claude or Cursor!

### 🛠️ Development Installation

For contributors and developers:

1. Install uv package manager:

```bash
pip install uv
```

2. Create the Virtual Environment:

```bash
uv venv --python=3.10
```

3. Install the package in development mode:

```bash
uv pip install -e .
```

4. Start the server:

```bash
python -m gis_mcp
```

#### Development Configuration

To use the development installation with Claude or Cursor, add the following configuration:

**Claude Desktop:**

**Windows:**

```json
{
  "mcpServers": {
    "gis-mcp": {
      "command": "C:\\path\\to\\gis-mcp\\.venv\\Scripts\\python",
      "args": ["-m", "gis_mcp"]
    }
  }
}
```

**Linux/Mac:**

```json
{
  "mcpServers": {
    "gis-mcp": {
      "command": "/path/to/gis-mcp/.venv/bin/python",
      "args": ["-m", "gis_mcp"]
    }
  }
}
```

**Cursor IDE** (create `.cursor/mcp.json`):

**Windows:**

```json
{
  "mcpServers": {
    "gis-mcp": {
      "command": "C:\\path\\to\\gis-mcp\\.venv\\Scripts\\python",
      "args": ["-m", "gis_mcp"]
    }
  }
}
```

**Linux/Mac:**

```json
{
  "mcpServers": {
    "gis-mcp": {
      "command": "/path/to/gis-mcp/.venv/bin/python",
      "args": ["-m", "gis_mcp"]
    }
  }
}
```

After configuration:

1. Make sure to replace `YourUsername` with your actual username
2. For development installation, replace `/path/to/gis-mcp` with the actual path to your project
3. Restart your IDE to apply the changes
4. You can now use all GIS operations through Claude or Cursor!

## 🛠️ Available Tools

### Shapely Operations

#### Basic Operations

| Tool                   | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `buffer`               | Create a buffer around geometries with customizable parameters |
| `intersection`         | Find intersection of two geometries                            |
| `union`                | Combine two geometries                                         |
| `difference`           | Find difference between geometries                             |
| `symmetric_difference` | Find symmetric difference between geometries                   |

#### Geometric Properties

| Tool                        | Description                                 |
| --------------------------- | ------------------------------------------- |
| `convex_hull`               | Calculate convex hull of a geometry         |
| `envelope`                  | Get bounding box of a geometry              |
| `minimum_rotated_rectangle` | Get minimum rotated rectangle of a geometry |
| `get_centroid`              | Get the centroid of a geometry              |
| `get_bounds`                | Get the bounds of a geometry                |
| `get_coordinates`           | Get the coordinates of a geometry           |
| `get_geometry_type`         | Get the type of a geometry                  |

#### Transformations

| Tool                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| `rotate_geometry`    | Rotate a geometry with specified angle and origin |
| `scale_geometry`     | Scale a geometry with x and y factors             |
| `translate_geometry` | Translate a geometry with x, y, and z offsets     |

#### Advanced Operations

| Tool                     | Description                           |
| ------------------------ | ------------------------------------- |
| `triangulate_geometry`   | Create a triangulation of a geometry  |
| `voronoi`                | Create a Voronoi diagram from points  |
| `unary_union_geometries` | Create a union of multiple geometries |

#### Measurements

| Tool         | Description                  |
| ------------ | ---------------------------- |
| `get_length` | Get the length of a geometry |
| `get_area`   | Get the area of a geometry   |

#### Validation and Simplification

| Tool         | Description                                  |
| ------------ | -------------------------------------------- |
| `is_valid`   | Check if a geometry is valid                 |
| `make_valid` | Make a geometry valid                        |
| `simplify`   | Simplify a geometry with specified tolerance |

### PyProj Operations

#### Coordinate Transformations

| Tool                    | Description                       |
| ----------------------- | --------------------------------- |
| `transform_coordinates` | Transform coordinates between CRS |
| `project_geometry`      | Project a geometry between CRS    |

#### CRS Information

| Tool                 | Description                              |
| -------------------- | ---------------------------------------- |
| `get_crs_info`       | Get detailed information about a CRS     |
| `get_available_crs`  | Get list of all available CRS            |
| `get_utm_zone`       | Get UTM zone for given coordinates       |
| `get_utm_crs`        | Get UTM CRS for given coordinates        |
| `get_geocentric_crs` | Get geocentric CRS for given coordinates |

#### Geodetic Calculations

| Tool                          | Description                                             |
| ----------------------------- | ------------------------------------------------------- |
| `get_geod_info`               | Get information about a geodetic calculation            |
| `calculate_geodetic_distance` | Calculate geodetic distance between points              |
| `calculate_geodetic_point`    | Calculate point at given distance and azimuth           |
| `calculate_geodetic_area`     | Calculate area of a polygon using geodetic calculations |

### GeoPandas Operations

#### I/O Operations

| Tool            | Description                                              |
| --------------- | -------------------------------------------------------- |
| `read_file_gpd` | Read a geospatial file and return stats and data preview |
| `to_file_gpd`   | Write a GeoDataFrame to a file                           |

#### Join Operations

| Tool         | Description                                        |
| ------------ | -------------------------------------------------- |
| `append_gpd` | Concatenate two GeoDataFrames vertically           |
| `merge_gpd`  | Perform database-style joins between GeoDataFrames |

### Rasterio Operations

#### Basic Raster Operations

| Tool                     | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `metadata_raster`        | Get metadata from a raster dataset                       |
| `get_raster_crs`         | Retrieve the CRS of a raster dataset                     |
| `extract_band`           | Extract a specific band from a multi-band raster         |
| `raster_band_statistics` | Calculate statistics (min, max, mean, std) for each band |
| `raster_histogram`       | Compute histogram of pixel values for each band          |

#### Raster Processing

| Tool                         | Description                                   |
| ---------------------------- | --------------------------------------------- |
| `clip_raster_with_shapefile` | Clip a raster using polygons from a shapefile |
| `resample_raster`            | Resample a raster by a scale factor           |
| `reproject_raster`           | Reproject a raster to a new CRS               |
| `tile_raster`                | Split a raster into square tiles              |

#### Raster Analysis

| Tool                | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| `compute_ndvi`      | Calculate Normalized Difference Vegetation Index                |
| `raster_algebra`    | Perform algebraic operations on raster bands                    |
| `concat_bands`      | Combine multiple single-band rasters into one multi-band raster |
| `weighted_band_sum` | Compute weighted sum of all bands in a raster                   |

## 🛠️ Client Development

Example usage of the tools:

### Buffer Operation

```python
Tool: buffer
Parameters: {
    "geometry": "POINT(0 0)",
    "distance": 10,
    "resolution": 16,
    "join_style": 1,
    "mitre_limit": 5.0,
    "single_sided": false
}
```

### Coordinate Transformation

```python
Tool: transform_coordinates
Parameters: {
    "coordinates": [0, 0],
    "source_crs": "EPSG:4326",
    "target_crs": "EPSG:3857"
}
```

### Geodetic Distance

```python
Tool: calculate_geodetic_distance
Parameters: {
    "point1": [0, 0],
    "point2": [10, 10],
    "ellps": "WGS84"
}
```

## 🔮 Planned Features

- Add support for more GIS libraries - GDAL/OGR
- Implement advanced spatial indexing
- Add support for raster operations
- Implement network analysis capabilities
- Add support for 3D geometries
- Implement performance optimizations

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your PR description clearly describes the problem and solution. Include the relevant issue number if applicable.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Projects

- [Model Context Protocol](https://github.com/anthropics/model-context-protocol) - The core MCP implementation
- [Shapely](https://github.com/shapely/shapely) - Python package for manipulation and analysis of geometric objects
- [PyProj](https://github.com/pyproj4/pyproj) - Python interface to PROJ library
- [GeoPandas](https://github.com/geopandas/geopandas) - Python package for working with geospatial data
- [Rasterio](https://github.com/rasterio/rasterio) - Python package for reading and writing geospatial raster data

## 📞 Support

For support, please open an issue in the GitHub repository.

## 💬 Community

Join our Discord community for discussions, updates, and support:

[![Join our Discord](https://img.shields.io/badge/Discord-Join%20our%20community-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/dzkXZsZK)

## 👥 Contributors

<a href="https://github.com/mahdin75/gis-mcp/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mahdin75/gis-mcp" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

<br/>

## 🏆 Badges

<div align="center">
  <a href="https://glama.ai/mcp/servers/@mahdin75/gis-mcp">
    <img width="380" height="200" src="https://glama.ai/mcp/servers/@mahdin75/gis-mcp/badge" alt="GIS Server MCP server" />
  </a>
  <br/><br/><br/>
  <a href="https://mcp.so/server/gis-mcp-server/mahdin75">
    <img src="https://mcp.so/logo.png" alt="MCP.so Badge" width="150"/>
  </a>
</div>
