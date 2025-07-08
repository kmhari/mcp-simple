# Supernotes to Obsidian

A Python script to import Supernotes exports into Obsidian daily notes using the Model Context Protocol (MCP).

## Setup

1. Install dependencies:
```bash
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv add mcp
```

2. Configure the settings in `config.py`:
```python
TEMPLATE_PATH = '/path/to/your/template.md'
EXPORT_FOLDER = '/path/to/supernote/exports'
DAILY_NOTES_FOLDER = 'Daily Notes'
```

3. Run the script:
```bash
python src/main.py
```

## Features

- Imports Supernotes exports into Obsidian daily notes
- Creates daily notes from template if they don't exist
- Cleans up note formatting
- Adds wikilinks for proper nouns
- Handles OCR errors

## Configuration

See `config.py` for all available settings.