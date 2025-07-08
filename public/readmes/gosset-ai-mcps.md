# Biomedical MCP Servers

A collection of Model Context Protocol (MCP) servers for biomedical research, providing AI assistants with access to various biomedical databases and resources.

## What is MCP?

The Model Context Protocol (MCP) allows AI assistants like Claude to access external tools and data sources. These servers extend Claude's capabilities by providing access to specific biomedical databases.

## Available Servers

This repository contains the following MCP servers:

### PubMed MCP Server
Access the PubMed database of biomedical literature.
- Search PubMed for articles matching a query
- Retrieve abstracts for specific articles
- Find related articles based on a PMID
- Search for articles by a specific author

### BioRxiv/MedRxiv MCP Server
Access preprints from bioRxiv and medRxiv repositories.
- Get detailed information about preprints by DOI
- Find published versions of preprints
- Search for recent preprints
- Search preprints by date range and category

### ClinicalTrials.gov MCP Server
Access information about clinical trials.
- Search for trials matching specific criteria
- Get detailed information about specific trials
- Find trials by medical condition
- Find trials by location

### DrugBank MCP Server
Access drug information from DrugBank.
- Search for drugs by name
- Get detailed information about specific drugs
- Find drugs by indication
- Find drugs by category
- Get drug interaction information

### OpenTargets MCP Server
Access drug target information from Open Targets.
- Search for gene targets
- Get detailed target information
- Search for diseases
- Find disease-target associations
- Search for drugs

## Setup

1. Install dependencies for all servers:
   ```
   pip install -r requirements.txt
   ```

2. For specific servers, additional setup may be required:
   - For PubMed: Update the `EMAIL` constant in `pubmed_mcp.py` with your email address (required by NCBI)
   - For DrugBank: Add your DrugBank API key to the `API_KEY` constant in `drugbank_mcp.py`

3. Run a server:
   ```
   python pubmed_mcp.py  # Replace with the server you want to run
   ```

## Connecting to Claude for Desktop

To use these servers with Claude for Desktop:

1. Make sure you have the latest version of Claude for Desktop installed.
2. Edit your Claude for Desktop configuration file located at:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%AppData%\Claude\claude_desktop_config.json`

3. Add server configurations:
   ```json
   {
       "mcpServers": {
           "pubmed-mcp": {
               "command": "python",
               "args": [
                   "/ABSOLUTE/PATH/TO/pubmed_mcp.py"
               ]
           },
           "biorxiv-mcp": {
               "command": "python",
               "args": [
                   "/ABSOLUTE/PATH/TO/bioarxiv_mcp.py"
               ]
           },
           "clinicaltrials-mcp": {
               "command": "python",
               "args": [
                   "/ABSOLUTE/PATH/TO/clinicaltrialsgov_mcp.py"
               ]
           },
           "drugbank-mcp": {
               "command": "python",
               "args": [
                   "/ABSOLUTE/PATH/TO/drugbank_mcp.py"
               ]
           },
           "opentargets-mcp": {
               "command": "python",
               "args": [
                   "/ABSOLUTE/PATH/TO/opentargets_mcp.py"
               ]
           }
       }
   }
   ```
   Replace `/ABSOLUTE/PATH/TO/` with the absolute path to each script on your system.

4. Restart Claude for Desktop.

## Example Queries

- "Find recent research on CRISPR therapy for cancer"
- "Get me the abstract for PMID 34567890"
- "What preprints were published last week on COVID-19?"
- "What clinical trials are currently recruiting for Alzheimer's disease?"
- "Find information about the drug metformin"
- "What targets are associated with Parkinson's disease?"

## Troubleshooting

If you encounter issues:

1. Check that you've properly configured the server
2. Make sure you've restarted Claude for Desktop after updating the configuration
3. Check Claude's logs for errors:
   - macOS: `~/Library/Logs/Claude/mcp*.log`
   - Windows: `%APPDATA%\Claude\logs\mcp*.log`