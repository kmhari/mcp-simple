# Strava MCP Server

A Model Context Protocol (MCP) server that provides access to the Strava API. This server enables language models to interact with Strava data, including activities, athlete information, and more.

## Features

- 🏃‍♂️ Activity tracking and analysis
- 📊 Athlete statistics
- 🗺️ Route visualization
- 🏆 Achievement tracking
- 🤝 Social features (kudos, comments)

## Prerequisites

- Python 3.12+
- Strava API credentials
- pip (Python package installer)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/strava_mcp.git
cd strava_mcp
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Configuration

1. Create a `config/.env` file with your Strava API credentials:
```bash
STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_client_secret
STRAVA_REFRESH_TOKEN=your_refresh_token
```

2. To obtain Strava API credentials:
   - Go to https://www.strava.com/settings/api
   - Create a new application
   - Note down the Client ID and Client Secret
   - Follow the OAuth 2.0 flow to get your refresh token

## Usage

### Using with Claude

Once connected, you can interact with your Strava data through Claude in various ways:

#### Activity Queries
- "Show me my recent activities"
- "Get details about my last run"
- "What was my longest ride this month?"
- "Show me activities where I set personal records"
- "Display the route map for my latest activity"

#### Performance Analysis
- "What's my average running pace this year?"
- "Compare my cycling performance between last month and this month"
- "Show me my heart rate zones from yesterday's workout"
- "What's my total elevation gain for all activities?"
- "Calculate my weekly mileage for running"

#### Social Interactions
- "Who gave kudos on my latest activity?"
- "Show me comments on my marathon run"
- "List all my club activities"
- "Find activities I did with friends"

#### Achievement Tracking
- "List all my segment achievements"
- "Show my personal records on local segments"
- "What achievements did I earn this week?"
- "Display my progress on yearly goals"

#### Data Available Through Claude
1. Activity Details:
   - Distance, duration, pace
   - Route maps and elevation profiles
   - Heart rate, power, and cadence data
   - Splits and lap information
   - Weather conditions during activity

2. Athlete Statistics:
   - Year-to-date and all-time totals
   - Personal records and achievements
   - Training load and fitness trends
   - Equipment usage and maintenance

3. Social Data:
   - Kudos and comments
   - Club activities and leaderboards
   - Friend activities and challenges
   - Segment efforts and rankings

4. Route Information:
   - Detailed maps with elevation data
   - Segment analysis
   - Popular routes and segments
   - Route planning and analysis

### As an MCP Server

Update your Claude Desktop configuration:

```json
{
    "mcpServers": {
        "Strava": {
            "command": "python",
            "args": ["src/strava_server.py"],
            "cwd": "/path/to/strava_mcp",
            "env": {
                "STRAVA_CLIENT_ID": "your_client_id",
                "STRAVA_CLIENT_SECRET": "your_client_secret",
                "STRAVA_REFRESH_TOKEN": "your_refresh_token"
            }
        }
    }
}
```

### As an HTTP Server

1. Start the server:
```bash
./run_server.sh
```

2. Access the API at `http://localhost:8000`

Available endpoints:
- GET `/activities/recent` - List recent activities
- GET `/activities/{id}` - Get activity details
- GET `/activities/{id}/map` - Get activity map visualization
- GET `/athlete/stats` - Get athlete statistics

## Development

### Project Structure
```
strava_mcp/
├── src/
│   ├── strava_server.py      # MCP server implementation
│   ├── strava_http_server.py # HTTP API server
│   ├── map_utils.py          # Map visualization utilities
│   └── templates.py          # HTML templates
├── config/
│   └── .env                  # Environment variables (not in git)
├── requirements.txt          # Python dependencies
└── run_server.sh            # Server startup script
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Security

- Never commit `.env` files or API credentials
- The `.gitignore` file is configured to prevent sensitive data from being committed
- Use environment variables for all sensitive configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Strava API Documentation
- Model Context Protocol (MCP) Specification
- Contributors and maintainers 