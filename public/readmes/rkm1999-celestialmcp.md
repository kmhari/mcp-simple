# CelestialMCP

A Model Context Protocol (MCP) server designed for AI assistants like Claude. It provides tools to access astronomical data, such as celestial object positions, rise/set times, visibility, and catalog information.

## Overview

CelestialMCP is built with the mcp-framework and leverages the astronomy-engine library to provide accurate astronomical calculations. It offers several tools for determining positions of celestial objects, calculating their rise and set times, and listing available objects from star and deep sky object catalogs.

### Features

- **Real-time Celestial Data**: Access current astronomical data for a variety of objects.
- **Comprehensive Object Details**: Retrieve equatorial and horizontal (altitude/azimuth) coordinates, visibility status, rise/transit/set times.
- **Specialized Data**: For relevant objects, get distance (solar system objects), phase illumination (Moon and planets), and upcoming lunar phases (Moon).
- **Extensive Catalogs**: Utilizes local catalogs for:
    - Solar system objects (Sun, Moon, planets).
    - Stars (e.g., from HYG database).
    - Deep Sky Objects (DSOs) including Messier, NGC, and IC objects.
- **Configurable Observer**: All calculations are based on a pre-configured observer location (default: Vancouver, Canada) and the current system time.
- **Easy Catalog Updates**: Includes a script to download and update comprehensive astronomical catalogs.

### Tools

The server provides three primary tools for the AI to use:

1.  **`getCelestialDetails`**: Retrieves detailed astronomical information for a specific celestial object.
2.  **`listCelestialObjects`**: Lists available celestial objects known to the system, filterable by category.
3.  **`getStarHoppingPath`**: Calculates a star hopping path from a bright start star to a target celestial object.

## Setup and Installation

### Prerequisites
- Node.js (version >=18.19.0, as specified in `package.json`)
- npm (usually comes with Node.js)

### Steps

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/Rkm1999/CelestialMCP
    cd CelestialMCP
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Download Astronomical Catalogs:**
    This step is crucial for accessing a wide range of stars and deep sky objects.
    ```bash
    npm run fetch-catalogs
    ```
    This script downloads the HYG star database and the OpenNGC (New General Catalogue) deep sky object catalog into the `data/` directory. If these files are not downloaded, the application will attempt to use `sample_stars.csv` and `sample_dso.csv` from the `data/` directory if present. If no catalog files are found, the respective catalogs will be empty.

4.  **Build the project:**
    This compiles the TypeScript code to JavaScript.
    ```bash
    npm run build
    ```

5.  **Start the server:**
    ```bash
    npm start
    ```
    The MCP server will start, and the tools will become available to a connected AI assistant.

## Using with Claude Desktop

To use CelestialMCP with Claude Desktop for local development, add the following configuration to your Claude Desktop config file:

```bash
# Install dependencies
npm install

# Fetch star and deep sky object catalogs (IMPORTANT!)
npm run fetch-catalogs

# Build the project
npm run build

# Start the server
npm start
```

Windows: %APPDATA%/Claude/claude_desktop_config.json
MacOS: ~/Library/Application Support/Claude/claude_desktop_config.json

{
  "mcpServers": {
    "CelestialMCP": {
      "command": "node", // Or your node executable path
      "args":["/absolute/path/to/your/CelestialMCP/project/dist/index.js"] // Replace with the actual absolute path
    }
  }
}

### Catalog Data

The `npm run fetch-catalogs` script downloads:
- `hygdata_v41.csv`: The HYG star database (approx. 120,000 stars).
- `ngc.csv`: The OpenNGC catalog (approx. 14,000 deep sky objects).

These files are stored in the `data/` directory. If these primary catalog files are not found, the application will attempt to load `sample_stars.csv` and `sample_dso.csv` if they exist in the `data/` directory. For comprehensive data, running `npm run fetch-catalogs` is highly recommended.

## Tool Usage

All astronomical calculations performed by these tools use the **pre-configured observer location** (see `src/config.ts`) and the **current system time** when the request is made.

### 1. `getCelestialDetails`

**Purpose:** Retrieves comprehensive astronomical data for a specific celestial object. This includes its current position (equatorial and horizontal coordinates), visibility (e.g., above/below horizon, visibility quality), rise/transit/set times for the current day, and, for relevant objects, distance from Earth, illumination phase, and upcoming lunar phases (for the Moon).

**Parameters:**
-   `objectName` (string): The name or catalog identifier of the celestial object. The tool can resolve common names (e.g., "Andromeda Galaxy") to their catalog IDs (e.g., "M31").
    *Examples: "Mars", "Sirius", "M42", "NGC 253", "Orion Nebula", "Moon", "Sun"*

**Example Claude Prompts:**
-   "Get details for Jupiter from the configured location."
-   "What are the current coordinates of the Moon?"
-   "Tell me about the star Vega, including its rise and set times for today."
-   "Is the Whirlpool Galaxy (M51) visible tonight?"
-   "Show me information about the Sun's current position and rise/set times."

### 2. `listCelestialObjects`

**Purpose:** Lists celestial objects known to the system, which can then be queried using `getCelestialDetails`. Objects can be filtered by category. This helps in discovering what objects are available for querying.

**Parameters:**
-   `category` (string, optional): Filters the list of objects by a specific category. If omitted, it defaults to "all". Valid categories are:
    -   `planets`: Solar System objects (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto).
    -   `stars`: Named or cataloged stars.
    -   `messier`: Objects from the Messier catalog (e.g., M1, M31).
    -   `ic`: Objects from the Index Catalogue (e.g., IC 434).
    -   `ngc`: Objects from the New General Catalogue (e.g., NGC 7000).
    -   `dso`: All Deep Sky Objects (combines Messier, IC, NGC, and other DSOs like common named nebulae or galaxies not in these specific catalogs if available).
    -   `all`: All available objects from all categories (default).

**Example Claude Prompts:**
-   "List all available Messier objects."
-   "What planets can I get information on?"
-   "Show me some bright stars I can look up using the `stars` category."
-   "List all NGC objects in the catalog."
-   "What deep sky objects (`dso`) are available?"
-   "Can you list all objects known to the system?"

### 3. `getStarHoppingPath`

**Purpose:** Calculates a star hopping path from a bright start star to a target celestial object. Each hop is within the specified Field of View (FOV). This tool helps observers manually locate dimmer objects by "hopping" from one recognizable star to another.

**Parameters:**
-   `targetObjectName` (string): The name or catalog identifier of the celestial object to find.
    *Examples: "M13", "Andromeda Galaxy", "Mars", "NGC 7000"*
-   `fovDegrees` (number, positive): The Field of View (FOV) of the user's equipment in degrees (e.g., binoculars, telescope eyepiece).
    *Example: 5.0*
-   `maxHopMagnitude` (number, optional, default: 8.0): The maximum (dimmest) stellar magnitude for stars to be included in the hopping path. Brighter stars have lower magnitude values.
    *Example: 7.5*
-   `initialSearchRadiusDegrees` (number, positive, optional, default: 20.0): The angular radius (in degrees) around the target object to search for a suitable bright starting star.
    *Example: 25.0*
-   `startStarMagnitudeThreshold` (number, optional, default: 3.5): The maximum (dimmest) magnitude for a star to be considered a good, bright "starting star" for the hop sequence.
    *Example: 4.0*

**Example Claude Prompts:**
-   "Find a star hopping path to M13 with a 5 degree FOV."
-   "Can you give me a star hop sequence to the Ring Nebula (M57) using an 8x50 binocular (FOV around 6 degrees) and stars no dimmer than magnitude 7?"
-   "I need to find NGC 253. My telescope has a 1 degree field of view. Find a path starting from a star brighter than magnitude 3, within 20 degrees of the target."
-   "Generate a star hopping guide to the Sombrero Galaxy, assuming a 2 degree FOV and max hop magnitude of 8.5."

## Project Structure

```text
CelestialMCP/
├── src/
│   ├── tools/                      # MCP Tools provided to the AI
│   │   ├── CelestialDetailsTool.ts   # Tool to get detailed info for an object
│   │   ├── ListCelestialObjectsTool.ts # Tool to list available objects
│   │   └── StarHoppingTool.ts        # Tool to calculate star hopping paths
│   ├── utils/                      # Utility functions
│   │   └── astronomy.ts            # Core astronomy calculations and catalog loading
│   ├── config.ts                   # Observer's location and atmospheric conditions configuration
│   └── index.ts                    # MCP Server entry point
├── scripts/
│   └── fetch-catalogs.js           # Script to download astronomical catalogs
├── data/                           # Directory for catalog data files (e.g., hygdata_v41.csv, ngc.csv)
│   ├── README.md                   # Information about data files
│   ├── sample_dso.csv            # Sample DSO data if full catalog isn't downloaded
│   └── sample_stars.csv          # Sample star data if full catalog isn't downloaded
├── package.json
└── tsconfig.json
```

## Default Configuration

By default, the observer's location is set to Vancouver, Canada. You can change this in `src/config.ts`:
This configuration is used for all calculations unless a tool specifically allows overriding it (current tools do not).
```typescript
export const OBSERVER_CONFIG = {
  latitude: 49.2827,    // Observer latitude
  longitude: -123.1207, // Observer longitude
  altitude: 30,         // Observer altitude in meters
  temperature: 15,      // Default temperature in Celsius
  pressure: 1013.25     // Default pressure in hPa
};
```

## License

MIT

## Acknowledgements

- [astronomy-engine](https://github.com/cosinekitty/astronomy) for core astronomical calculations
- [mcp-framework](https://github.com/QuantGeekDev/mcp-framework) for the MCP server implementation
- HYG Database for star data
- OpenNGC for deep sky object data
