# Safari Screenshot

A Node.js MCP Server for capturing screenshots using Safari on macOS.

## Features

- Capture window screenshots at specific sizes
- Support for different zoom levels
- Configurable wait times for page load
- Clean up after capture
- Native macOS screenshot quality

## Usage

```javascript
import { takeScreenshot } from './screenshot.js';

// Basic window screenshot
await takeScreenshot({
	url: 'https://www.apple.com',
	outputPath: './screenshot.png',
	width: 1024, // Optional: window width (default: 1024)
	height: 768, // Optional: window height (default: 768)
	waitTime: 3, // Optional: seconds to wait for load (default: 3)
	zoomLevel: 1, // Optional: page zoom level (default: 1)
});

// Responsive design testing
await takeScreenshot({
	url: 'https://www.apple.com',
	outputPath: './mobile.png',
	width: 375, // iPhone SE width
	height: 667, // iPhone SE height
	zoomLevel: 1,
});

// High-resolution capture
await takeScreenshot({
	url: 'https://www.apple.com',
	outputPath: './desktop-hd.png',
	width: 1920, // Full HD width
	height: 1080, // Full HD height
	waitTime: 5, // Wait longer for HD content
	zoomLevel: 0.8, // Zoom out slightly
});
```

## Requirements

- macOS
- Safari
- Node.js >= 14.0.0
- Terminal needs Accessibility permissions (System Preferences → Security & Privacy → Privacy → Accessibility)

## Installation

```bash
npm install safari-screenshot
```

## Options

| Option     | Type   | Default  | Description                                                                      |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------- |
| url        | string | required | The URL to capture                                                               |
| outputPath | string | auto     | Where to save the screenshot (default: ./screenshots/[hostname]-[timestamp].png) |
| width      | number | 1024     | Window width in pixels                                                           |
| height     | number | 768      | Window height in pixels                                                          |
| waitTime   | number | 3        | Seconds to wait for page load                                                    |
| zoomLevel  | number | 1        | Page zoom level (1 = 100%)                                                       |

## Common Viewport Sizes

The module is tested with these common viewport sizes:

- Desktop: 1920×1080 (Full HD)
- Laptop: 1366×768
- Tablet Landscape: 1024×768
- Tablet Portrait: 768×1024
- Mobile Large: 428×926 (iPhone 12 Pro Max)
- Mobile Medium: 390×844 (iPhone 12 Pro)
- Mobile Small: 375×667 (iPhone SE)

## How It Works

1. Opens Safari with specified window size
2. Loads the URL and waits for page load
3. Applies zoom level if specified
4. Uses native macOS screencapture for pixel-perfect results
5. Verifies screenshot was captured successfully
6. Cleans up Safari windows

## Permissions

This package requires System Events permissions to work:

1. Open System Preferences > Security & Privacy > Privacy > Accessibility
2. Add Terminal (or your IDE) to the list of allowed apps

## Using with Cursor

### Setup in Cursor

1. Open Cursor
2. Go to settings, "Add MCP Server"
3. In the configuration dialog:

   - Name: `safari-screenshot`
   - Type: `command`
   - Command: `npx -y @rogerheykoop/mcp-safari-screenshot`

   Or for local development:

   - Command: `npx -y /path/to/mcp-safari-screenshot/server.js`

### Example Commands

After connecting to the server in Cursor, you can use these commands:

```
Take a screenshot of https://apple.com at desktop size
```

Response: Will capture at 1920×1080

```
Capture https://apple.com on iPhone 12 Pro
```

Response: Will capture at 390×844

```
Screenshot github.com at 50% zoom
```

Response: Will capture with zoomLevel: 0.5

### Supported Parameters

The MCP server understands these concepts:

- Device names (e.g., "iPhone", "iPad", "desktop")
- Dimensions (e.g., "1024x768")
- Zoom levels (e.g., "50% zoom", "2x zoom")
- Wait times (e.g., "wait 5 seconds")

### Example Workflows

1. **Responsive Testing**

   ```
   Take screenshots of apple.com on iPhone, iPad, and desktop
   ```

2. **Zoom Testing**

   ```
   Capture github.com at 75% zoom and 125% zoom
   ```

3. **Custom Size**
   ```
   Screenshot example.com at 1440x900
   ```

### Tips

- Screenshots are saved to the `screenshots` directory by default
- Device names automatically set appropriate dimensions
- The server handles cleanup of Safari windows
- Use "wait X seconds" for slow-loading pages

### Troubleshooting

If you encounter issues:

1. Check Terminal has Accessibility permissions
2. Verify Safari is not in private browsing mode
3. Ensure the working directory is writable
4. Check Cursor's console for error messages

## License

MIT

## Testing Locally

You can test the MCP implementation directly:

```bash
# Test discovery
echo '{"type":"discover"}' | npx -y ./server.js

# Test screenshot
echo '{"type":"execute","tool":"take_screenshot","input":"Take a screenshot of https://apple.com","requestId":"123"}' | npx -y ./server.js
```

Expected responses:

1. Discover will return capabilities
2. Execute will:
   - Log progress to stderr
   - Return result JSON to stdout
   - Save screenshot to ./screenshots/
