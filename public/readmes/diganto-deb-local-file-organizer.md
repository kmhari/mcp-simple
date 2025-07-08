# Local File Organizer

A Python-based file organization system that leverages the Model Context Protocol (MCP) to safely organize and manage files across directories.

## Overview

This project implements a file organization system using the Model Context Protocol (MCP) framework to:

1. Safely access user-specified directories through robust permission checking
2. Automatically organize files by type into categorized directories
3. Search for files across allowed directories
4. Analyze directory contents and provide detailed file information

## Key Features

- **Directory Security**: Only operates on explicitly allowed directories
- **Smart Categorization**: Organizes files by extension into categories:
  - Documents (PDF, DOC, DOCX, TXT, RTF, MD, HTML, JSON, CSV, etc.)
  - Images (JPG, PNG, GIF, SVG, WEBP, HEIC, etc.)
  - Videos (MP4, MOV, AVI, MKV, etc.)
  - Audio (MP3, WAV, OGG, FLAC, etc.)
  - Archives (ZIP, RAR, 7Z, TAR, etc.)
  - Code (PY, JS, HTML, CSS, Java, etc.)
  - Applications (DMG, EXE, MSI, etc.)
  - Others (uncategorized file types)
- **Project Detection**: Identifies project directories to avoid disrupting code repositories
- **Recursive Processing**: Can analyze and organize nested directory structures
- **Resource-Efficient**: Optimized for performance with large directory structures
- **Detailed Analytics**: Provides insights into file distribution by type

## Installation

```bash
# Clone the repository
git clone https://github.com/diganto-deb/local_file_organizer.git
cd local_file_organizer

# Install requirements
pip install -r requirements.txt
```

## Usage

### 1. Configure Allowed Directories

Create or modify the `.cursor/mcp.json` file in your project directory:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/organize/dir1",
        "/path/to/organize/dir2"
      ]
    }
  }
}
```

Replace the paths with the directories you want to allow the MCP server to access.

### 2. Enable the MCP Server

After configuring the `.cursor/mcp.json` file:

1. Restart Cursor
2. Open Cursor Settings (⚙️)
3. Navigate to `MCP`
4. You should see the `filesystem` server in the list of MCP servers
   - The server should appear with the name "filesystem" . 
5. Enable it by clicking the toggle switch next to the server name

### 3. Use File Organization Commands

Once the MCP server is enabled, you can use the file organization commands directly in Cursor's Agent:

```
# List all available categories
list_categories

# Analyze a directory without making changes
analyze_directory /path/to/directory

# Create category folders in a target directory
create_category_directories /path/to/target

# Organize files by type
organize_files /path/to/directory

# Search for files
search_files /path/to/directory "*.jpg"
```

## Technical Implementation

The system uses:

- **MCP Python SDK**: For the core server implementation
- **Filesystem MCP Server**: For secure file operations
- **Pathlib**: For cross-platform path handling
- **Type Annotations**: For improved code quality and IDE support

## Planned Features

The following features are planned for upcoming releases:

1. **File Write and Edit Functionality**: Add capabilities to:
   - Modify file contents directly
   - Create new files with templates
   - Batch rename files using patterns
   - Edit file metadata

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Model Context Protocol (MCP) Team
- Cursor IDE for MCP integration 