# usgs-quakes-mcp
[![smithery badge](https://smithery.ai/badge/@blake365/usgs-quakes-mcp)](https://smithery.ai/server/@blake365/usgs-quakes-mcp)
Claude MCP server for USGS Quakes API

An MCP server implementation for providing access to the [USGS Quakes API](https://earthquake.usgs.gov/fdsnws/event/1/) within [Claude Desktop](https://claude.ai/download).

## Overview

This Model Context Protocol (MCP) server enables AI assistants and applications to:

- Get earthquake data through a wide variety of search parameters
- Get details about a specific earthquake

Users can run queries using natural language.

## Sample Output

**Q: find earthquakes over 2 magnitude in florida over the last 20 years**

**A:** I'll help you search for earthquakes in Florida with a magnitude greater than 2.0 over the past 20 years.

View Result from find-earthquakes from usgs-quakes (local)

```json
{
  "endTime": "2024-12-28T23:59:59",
  "startTime": "2004-12-28T00:00:00",
  "maxLatitude": 31.000888,
  "minLatitude": 24.396308,
  "maxLongitude": -80.031362,
  "minLongitude": -87.634896,
  "minmagnitude": 2
}
```

Based on the USGS earthquake data, there have been three notable earthquakes in or near Florida over the past 20 years:

1. A magnitude 5.9 earthquake in the Gulf of Mexico on September 10, 2006
Located offshore at coordinates 26.319°N, 86.606°W
Depth: 14 km
This was the largest earthquake in the region during this period
It was widely felt, with 5,763 people reporting feeling the quake

2. A magnitude 2.8 earthquake near Jay, Florida on March 6, 2019
Located at coordinates 30.9718°N, 87.1719°W
Depth: 5 km
49 people reported feeling this earthquake


3. A magnitude 2.7 earthquake near Century, Florida on March 24, 2019
Located at coordinates 30.9622°N, 87.2384°W
Depth: 5 km
4 people reported feeling this earthquake

It's worth noting that Florida experiences relatively few earthquakes compared to more seismically active regions of the United States. The two 2019 earthquakes occurred in the Florida panhandle, while the larger 2006 event was offshore in the Gulf of Mexico.

**Q: get the details of the Jay Florida earthquake**

**A:** I'll get the detailed information about the magnitude 2.8 earthquake that occurred near Jay, Florida.

View Result from find-earthquake-details from usgs-quakes (local)

```json
{
  "eventid": "us1000jbw4"
}
```

Here are the key details about the Jay, Florida earthquake:
Date and Time: March 7, 2019, at 04:45:52 UTC
Location: 2 km (1.2 miles) Northwest of Jay, Florida
Coordinates: 30.9718°N, 87.1719°W
Depth: 5 kilometers (3.1 miles)
Magnitude: 2.8 mb_lg (body wave magnitude)

Additional details:
- 49 people reported feeling the earthquake
- The Community Internet Intensity Map (CIIM) showed a maximum intensity of 2.7
- There was no tsunami generated
- The earthquake was reviewed and confirmed by USGS scientists
- The location had a horizontal error margin of about 6.2 km
- The magnitude calculation used data from 11 seismic stations
- The earthquake was also detected by the New Mexico seismic network (NM), which calculated a slightly different magnitude of 2.63

Technical measurements:

- Azimuthal gap: 243 degrees (indicates moderate coverage by seismic stations)
- RMS error: 0.59 (indicates reasonable quality of the location estimate)
- Minimum distance to nearest station: 0.222 degrees
- Standard error for magnitude: 0.154

This was a relatively minor earthquake, but notable for Florida which rarely experiences seismic activity. The fact that it was felt by 49 people suggests it was noticeable to residents in the immediate area, though no significant damage would be expected from an earthquake of this magnitude.

## Installation

### Installing via Smithery

To install USGS Earthquake Data for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@blake365/usgs-quakes-mcp):

```bash
npx -y @smithery/cli install @blake365/usgs-quakes-mcp --client claude
```

### Manual Installation
Installing this might be tricky if you're not familiar with Node.js and the MCP protocol.

1. Install [Node.js](https://nodejs.org/en/download)
2. Clone this repository to a folder on your local machine
3. The server is already built so you can skip the build step.

### Extra Steps

If you want to make changes to the server you can do so by editing the `src/index.ts` file.
- Run `npm install` to install dependencies
- Run `npm run build` to build the server
- Quit and restart Claude Desktop after making changes


## Connecting with Claude Desktop

1. Open your Claude Desktop configuration at:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the server configuration:
```json 
{
    "mcpServers": {
        "usgs-quakes": {
            "command": "node",
            "args": [
                "/Full/Route/to/Folder/usgs-quakes/build/index.js"
            ]
        }
    }
}
```

3. Close/Quit then restart Claude Desktop

Once you restart you should see a small hammer icon in the lower right corner of the textbox. If you hover over the icon you'll see the number of MCP tools available.

## Troubleshooting

If you get errors when running the server you may need to provide the full path to the `node` command. For example, on macOS: `/usr/local/bin/node`
