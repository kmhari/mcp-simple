# MedifinderMCP Server

An MCP (Model Context Protocol) server for medicine inventory queries, designed to work with AI assistants like Claude.

## Overview

The MedifinderMCP Server provides tools and resources for querying a medicine inventory database through the Model Context Protocol (MCP). It allows AI assistants and other clients to:

- Search for medicines by name or location
- Check medicine availability at different healthcare facilities
- Get stock information for specific medicines
- View statistics on medicine availability by region
- Analyze stock status across the healthcare system

## Database Schema

The application uses a normalized database schema:

```
Region
  - region_id (PK)
  - name
  - code
  - created_at
  - updated_at

MedicalCenter
  - center_id (PK)
  - code
  - name
  - region_id (FK -> Region)
  - category
  - reporter_name
  - institution_type
  - reporter_type
  - address
  - latitude
  - longitude
  - created_at
  - updated_at

ProductType
  - type_id (PK)
  - code
  - name
  - description
  - created_at
  - updated_at

Product
  - product_id (PK)
  - code
  - name
  - type_id (FK -> ProductType)
  - description
  - dosage_form
  - strength
  - created_at
  - updated_at

Inventory
  - inventory_id (PK)
  - center_id (FK -> MedicalCenter)
  - product_id (FK -> Product)
  - current_stock
  - avg_monthly_consumption
  - accumulated_consumption_4m
  - measurement
  - last_month_consumption
  - last_month_stock
  - status_indicator
  - cpma_12_months_ago
  - cpma_24_months_ago
  - cpma_36_months_ago
  - accumulated_consumption_12m
  - report_date
  - status
  - created_at
  - updated_at

User
  - user_id (PK)
  - phone_number
  - name
  - preferred_location
  - created_at
  - updated_at

SearchHistory
  - search_id (PK)
  - user_id (FK -> User)
  - product_query
  - location_query
  - search_radius
  - results_count
  - created_at
```

## Project Structure

```
medifinder-mcp/
├── app/
│   ├── __init__.py
│   ├── config.py            # Configuration management
│   ├── db/
│   │   ├── __init__.py
│   │   ├── connection.py    # Database connection handling
│   │   └── queries.py       # SQL queries
│   ├── models/
│   │   ├── __init__.py
│   │   ├── base.py          # Base model with timestamp fields
│   │   ├── region.py        # Region model
│   │   ├── medical_center.py # Medical center model
│   │   ├── product_type.py  # Product type model
│   │   ├── product.py       # Product model
│   │   ├── inventory.py     # Inventory model
│   │   ├── user.py          # User model
│   │   └── search_history.py # Search history model
│   ├── mcp/
│   │   ├── __init__.py
│   │   ├── server.py        # MCP server setup
│   │   ├── tools.py         # Tool implementations
│   │   ├── resources.py     # Resource implementations
│   │   └── prompts.py       # Prompt templates
│   └── utils/
│       ├── __init__.py
│       └── helpers.py       # Helper functions
├── main.py                  # Application entry point
├── requirements.txt         # Dependencies
└── README.md                # Documentation
```

## MCP Features

### Tools

- `search_medicines`: Search for medicines by name or location
- `get_medicine_locations`: Find locations where a medicine is available
- `get_medicine_stock`: Get stock information for a specific medicine
- `get_regional_statistics`: Get medicine statistics by region
- `get_medicine_status`: Get overall medicine statistics
- `diagnose_database`: Check database connectivity and content
- `troubleshoot_connection`: Detailed database connection diagnostics
- `create_database_schema`: Create database tables based on models

### Resources

- `product://{id}`: Get product details by ID
- `stock://{name}`: Get stock information for a product by name
- `locations://{region}`: Get medical centers in a specific region
- `statistics://stock`: Get overall stock statistics
- `statistics://regions`: Get regional statistics

### Prompts

- `medicine_search_prompt`: Template for searching medicines by name
- `medicine_availability_prompt`: Template for checking medicine availability
- `medicine_statistics_prompt`: Template for analyzing medicine statistics
- `regional_availability_prompt`: Template for analyzing regional medicine availability

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/medifinder-mcp.git
   cd medifinder-mcp
   ```

2. Create a virtual environment and install dependencies:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up environment variables by creating a `.env` file:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=medifinderbot
   DB_USER=your_user
   DB_PASSWORD=your_password
   DEBUG=True
   ENV=development
   SERVER_NAME=MedifinderMCP
   SERVER_VERSION=1.0.0
   MCP_SERVER_NAME=MedifinderMCP
   MCP_SERVER_DESCRIPTION=MCP server for medicine inventory queries
   MAX_SEARCH_RESULTS=50
   SEARCH_SIMILARITY_THRESHOLD=0.3
   ```

4. Create the database:
   ```
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database and user
   CREATE DATABASE medifinderbot;
   CREATE USER your_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE medifinderbot TO your_user;
   
   # Exit PostgreSQL
   \q
   ```

5. Initialize the database schema:
   After starting the server, use the `create_database_schema` tool to create the tables.

## Usage

### Running the Server Locally

You can run the MCP server directly:

```
python main.py
```

### Using MCP Inspector

For development and testing, the MCP Inspector provides a convenient way to interact with the server:

1. Install MCP CLI:
   ```
   pip install mcp[cli]
   ```

2. Run the server in development mode:
   ```
   python -m mcp dev main.py
   ```

3. The MCP Inspector will open in your browser, allowing you to:
   - Test tools and resources
   - View the output of diagnostic tools
   - Experiment with different queries

### Integration with Claude Desktop

To use the server with Claude Desktop:

1. Create a batch file for reliable startup (run-mcp-server.bat):
   ```batch
   @echo off
   cd /d %~dp0
   call venv\Scripts\activate.bat
   python main.py
   ```

2. Install the server in Claude Desktop:
   ```
   mcp install run-mcp-server.bat -f .env
   ```

3. Alternatively, edit Claude Desktop's config file manually:
   ```json
   {
     "mcpServers": {
       "MedifinderMCP": {
         "command": "C:\\path\\to\\project\\venv\\Scripts\\python.exe",
         "args": ["C:\\path\\to\\project\\main.py"],
         "env": {
           "DB_HOST": "localhost",
           "DB_PORT": "5432",
           "DB_NAME": "medifinderbot",
           "DB_USER": "your_user",
           "DB_PASSWORD": "your_password",
           "DEBUG": "True",
           "ENV": "development",
           "SERVER_NAME": "MedifinderMCP",
           "SERVER_VERSION": "1.0.0",
           "MCP_SERVER_NAME": "MedifinderMCP",
           "MCP_SERVER_DESCRIPTION": "MCP server for medicine inventory queries",
           "MAX_SEARCH_RESULTS": "50",
           "SEARCH_SIMILARITY_THRESHOLD": "0.3"
         }
       }
     }
   }
   ```

4. In Claude Desktop, select the MedifinderMCP server from the servers dropdown to enable it for your conversation.

## Troubleshooting

### Common Issues

1. **Database Connection Issues**:
   - Use the `troubleshoot_connection` tool to diagnose connection problems
   - Verify your database credentials in the .env file
   - Ensure PostgreSQL is running on the specified port

2. **Missing Tables**:
   - Use the `create_database_schema` tool to create the database tables
   - Check logs for any errors during schema creation

3. **Empty Results**:
   - If queries return no results, there might not be any data in your tables
   - You need to import data into the tables using your data ingestion process

4. **Session Binding Errors**:
   - If you see "Instance is not bound to a Session" errors, ensure model instances are converted to dictionaries within active sessions
   - See how this is handled in the queries.py file for examples

5. **Missing Dependencies**:
   - Run `pip install -r requirements.txt` to ensure all dependencies are installed
   - Common missing dependencies are: mcp, python-dotenv, psycopg2-binary

### Diagnostic Tools

When troubleshooting, use these built-in diagnostic tools:

1. `diagnose_database`: Checks if:
   - The database connection works
   - Tables exist
   - Tables contain data

2. `troubleshoot_connection`: Provides detailed information about:
   - Database connection settings
   - Connection errors
   - Table structure
   - Recommended fixes

3. `create_database_schema`: Creates the database tables and provides:
   - List of created tables
   - Any errors that occurred
   - Test record creation results

## License

[MIT License](LICENSE)

## Contributors

- Lenin Carrasco - Initial work