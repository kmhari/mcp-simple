# YouTube Transcript Extractor

A command-line tool that extracts transcripts from YouTube videos, supporting various URL formats and outputting transcripts with optional timestamps. Built with Python and using script dependencies management.

## Features

- Extract transcripts from YouTube videos using URLs or video IDs
- Support for multiple YouTube URL formats:
  - Standard watch URLs (youtube.com/watch?v=...)
  - Shortened URLs (youtu.be/...)
  - Embed URLs (youtube.com/embed/...)
- Configurable timestamp inclusion in HH:MM:SS format
- Flexible output options (file or stdout)
- Comprehensive error handling for common scenarios

## Installation

This tool uses the script dependencies specification format:

```bash
git clone https://github.com/tlofreso/mcp-youtube-transcripts.git
cd mcp-youtube-transcripts
```

The script's dependencies are automatically managed through the script header:

```python
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "click",
#     "youtube_transcript_api",
# ]
# ///
```

## Usage

Basic command format:
```bash
python youtube_transcript.py <youtube-url> [options]
```

### Options

- `-o, --output`: Specify output file path (default: stdout)
- `--timestamps/--no-timestamps`: Include/exclude timestamps (default: include)

### Examples

1. Extract transcript to console (with timestamps):
```bash
python youtube_transcript.py "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

2. Save transcript to file (without timestamps):
```bash
python youtube_transcript.py "https://youtu.be/dQw4w9WgXcQ" -o transcript.txt --no-timestamps
```

3. Process an embed URL:
```bash
python youtube_transcript.py "https://www.youtube.com/embed/dQw4w9WgXcQ"
```

### Output Format

With timestamps (default):
```
[00:00:00] First line of the transcript
[00:00:03] Second line of the transcript
[00:00:07] Third line of the transcript
```

Without timestamps:
```
First line of the transcript
Second line of the transcript
Third line of the transcript
```

## Error Handling

The tool provides clear error messages for common scenarios:

- Transcripts disabled for the video
- Invalid or malformed YouTube URLs
- Network connectivity issues
- File permission problems
- Missing or invalid video IDs

## Requirements

- Python 3.12 or higher
- Automatically installed dependencies:
  - click: For command-line interface
  - youtube_transcript_api: For fetching transcripts

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is open source and available under the MIT License.