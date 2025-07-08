# openEHR MCP Server

An MCP (Model Context Protocol) server designed to interface with openEHR REST APIs, specifically the EHRbase implementation. 
This server enables MCP clients like Claude Desktop to create compositions for openEHR templates and submit them to a server.
For production grade EHR integrations you must use an AI Model where you can ensure data privacy.

See https://modelcontextprotocol.io/introduction for more information about MCP.

## Version

Current version: **0.1.0**

This project follows semantic versioning. For details on our versioning strategy, see [VERSIONING.md](VERSIONING.md).

## MCP Tools 

* **openehr_template_list**: List all available openEHR templates from the EHRbase server
* **openehr_template_get**: Retrieve a specific openEHR template by its unique identifier
* **openehr_template_example_composition**: Generate an example openEHR composition based on a specific template
* **openehr_ehr_create**: Create a new EHR in the system
* **openehr_ehr_get**: Retrieve an EHR by its ID
* **openehr_ehr_list**: List all available EHRs in the system
* **openehr_ehr_get_by_subject**: Get an EHR by subject ID and namespace
* **openehr_composition_create**: Create a new openEHR composition in the Electronic Health Record
* **openehr_composition_get**: Retrieve an existing openEHR composition by its unique identifier
* **openehr_composition_update**: Update an existing openEHR composition in the Electronic Health Record
* **openehr_composition_delete**: Delete an existing openEHR composition from the Electronic Health Record
* **openehr_query_adhoc**: Execute an ad-hoc AQL query against the openEHR server

## MCP Prompts

* **vital_signs_capture**: Capture vital signs for a specific EHR ID

## MCP Resource

Not yet implemented

# Quick Start with Docker

The easiest way to get started is to use the pre-built Docker image available on Docker Hub.

## 1. Prerequisites

Ensure you have a running EHRbase server. For running one locally, see below.

## 2. Configure Claude Desktop

Edit your Claude Desktop configuration file (claude_desktop_config.json) and add an "openEHR" configuration block inside the "mcpServers" section.

This file can usually be found in the following locations:
* On macOS: ~/Library/Application Support/Claude
* On Windows: %APPDATA%\Claude

```json
{
  "mcpServers": {
    "openEHR": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--network=host",
        "-e","EHRBASE_URL=http://localhost:8080/ehrbase/rest",
        "-e","EHRBASE_JSON_FORMAT=wt_flat",
        "ctodeakai/openehr-mcp-server:latest"
      ]
    }
  }
}
```

You can point EHRBASE_URL to your own EHRbase server or use the provided docker-compose setup.

### JSON Format Configuration

The MCP server supports different JSON serialization formats for interacting with the EHRbase API. You can configure the format using the optional `EHRBASE_JSON_FORMAT` environment variable:

```json
"-e", "EHRBASE_JSON_FORMAT=wt_flat"
```

Available format options:

* **wt_flat** (default): Use the simplified data types (SDT) based on the flat web template format
* **canonical**: Uses the canonical openEHR JSON format consistently across all operations
* **wt_structured**: SDT based on the structured web template format (currently not working)



For more information on how to set up Claude Desktop with MCP servers, see https://modelcontextprotocol.io/quickstart/user.


# Setup

## Prerequisities

For this MCP server to work, you currently require
* an ehrbase server
    * a sample server is provided here: [docker-compose.yml](docker-compose/docker-compose.yml)
* an openEHR template
    * a sample template is provided here: [vital_signs_basic.opt](resources/vital_signs_basic.opt)
    * you can upload one using the script [upload_template.py](scripts/upload_template.py)
* an EHR within this server and its associated EHR ID
    * you can create one using the script [create_ehr.py](scripts/create_ehr.py)


## Local EHRBase Setup

### Prerequisites
* A working Docker installation
* Python 3 (this project was built with python 3.12, earlier versions might work) 
* A Python virtual environment (pip, conda or uv)
* Install the required dependencies in your Python environment:
   ```bash
   pip install -r requirements.txt
   ```


### Running the EHRbase Server

1. Navigate to the docker-compose directory:
   ```bash
   cd docker-compose
   ```

2. Start the EHRbase server in detached mode:
   ```bash
   docker compose up -d
   ```

3. Check the logs to verify the server is running properly:
   ```bash
   docker compose logs -f
   ```

4. The EHRbase server will be available at http://localhost:8080/ehrbase/

5. The EHRBase API documentation should be here: http://localhost:8080/ehrbase/swagger-ui/index.html


### Uploading the Vital Signs Template

After setting up the EHRbase server and your Python environment, you can upload the vital signs template:

```bash
python scripts/upload_template.py
```

You can also specify a custom template or EHRbase URL:

```bash
python scripts/upload_template.py --template path/to/template.opt --ehrbase-url http://custom-url:8080/ehrbase/rest
```

You should see output confirming the successful upload of the template to the EHRbase server.


### Creating an EHR

After uploading the template, you need to create an Electronic Health Record (EHR) to store compositions:

```bash
python scripts/create_ehr.py
```

This will create an EHR with a randomly generated subject ID. You can also specify a custom subject ID:

```bash
python scripts/create_ehr.py --subject-id "patient_12345"
```

The script will output the EHR ID, which you'll need when creating compositions or using the MCP server.


### Running the Integration Tests

To run the tests, you'll need to install the test dependencies first:

```bash
pip install -r requirements-test.txt
```

After installing the test dependencies and uploading the template, you can run the tests with:

```bash
python -m pytest tests/test_*.py -v
```

This will run all the tests in the `tests` directory.

## Running the openEHR MCP server with Docker

### Building the Docker Image

Build the Docker image from the project root:

```bash
docker build -t openehr-mcp-server .
```

### Running the Docker Container

```bash
docker run -i --rm --network=host openehr-mcp-server
```
