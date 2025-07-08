# Yandex Maps MCP Server

MCP Server for the Yandex Maps API.

> "Show me the map of Berlin"

> "Show me location of ..."

<p align="center">
  <img src="https://raw.githubusercontent.com/peschinskiy/yandex-maps-mcp/main/example-usage.png" width="60%" alt="Yandex Maps MCP Screenshot">
</p>

## Tools

1. `maps_geocode`
   - Convert address to coordinates
   - Inputs:
     - `country` (string) - The country name
     - `lang` (string) - Language code (e.g., 'ru_RU', 'en_US')
     - `state` (string, optional) - The state, region or province name
     - `city` (string, optional) - The city or locality name
     - `district` (string, optional) - The district or neighborhood within the city
     - `street` (string, optional) - The street name
     - `house_number` (string, optional) - The house or building number
   - Returns: location, formatted_address, address_components

2. `maps_reverse_geocode`
   - Convert coordinates to address
   - Inputs:
     - `latitude` (number)
     - `longitude` (number)
     - `lang` (string) - Language code (e.g., 'ru_RU', 'en_US')
   - Returns: location, formatted_address, address_components

3. `maps_render`
   - Render a map as a png image
   - Inputs:
     - `latitude` (number) - Latitude coordinate of map center
     - `longitude` (number) - Longitude coordinate of map center
     - `latitude_span` (number) - Height of map image in degrees
     - `longitude_span` (number) - Width of map image in degrees
     - `lang` (string) - Language code (e.g., 'ru_RU', 'en_US')
     - `placemarks` (array, optional) - Array of placemarks to display on the map with style "pm2rdm"
       - Each placemark should have `latitude` and `longitude` properties
   - Returns: PNG image of the map

## Setup

### API Keys
You'll need two Yandex Maps API keys:

1. "JavaScript and Geocoder API" key for geocoding functions
2. Static API key for map rendering

To generate API keys:
1. Open https://developer.tech.yandex.ru/ and authorize
2. Click "Connect APIs". Choose "JavaScript and Geocoder API" and fill the form
3. Navigate to API's dashboard page and copy API key there
4. Repeat from step 2 for Static API.

### Local Run

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your API keys:
   ```bash
   export YANDEX_MAPS_API_KEY="your-geocoder-api-key"
   export YANDEX_MAPS_STATIC_API_KEY="your-static-api-key"
   ```
4. Build server
   ```bash
   npm run build
   ```
4. Run the server:
   ```bash
   node dist/index.js
   ```

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "yandex-maps": {
      "command": "node",
      "args": [
        "path/to/index.js"
      ],
      "env": {
        "YANDEX_MAPS_API_KEY": "<YOUR_GEOCODER_API_KEY>",
        "YANDEX_MAPS_STATIC_API_KEY": "<YOUR_STATIC_API_KEY>"
      }
    }
  }
}
```

## Known Limitations

Yandex Maps Places API has no free tier, which means that LLMs cannot retrieve organization addresses and coordinates through the Yandex Maps MCP. It can only geocode places whose addresses or coordinates are already known to the model or retrieved from other sources such as explicit user input, Web Search, or third-party MCPs.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/peschinskiy/yandex-maps-mcp/blob/main/LICENSE) file for details.
