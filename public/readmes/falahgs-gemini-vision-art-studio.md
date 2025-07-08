# 🎨 Gemini Vision Art Studio

A powerful MCP server leveraging Google's Gemini AI for advanced image generation and transformation. This studio offers two specialized tools: a 3D cartoon generator and an image processing transformer, both powered by the cutting-edge Gemini 2.0 Flash model.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange.svg)](https://deepmind.google/technologies/gemini/)

## ✨ Features

### 1. 3D Cartoon Generator
- Generate high-quality 3D cartoon images from text descriptions
- Child-friendly designs with vibrant colors and engaging visuals
- Perfect for children's books, educational materials, and creative projects

### 2. Image Transformer
- Transform existing images using Gemini AI's vision capabilities
- Apply various artistic styles and modifications
- Enhance, modify, or completely reimagine your images

### Additional Features
- 🖼️ Automatic preview generation
- 🌐 Browser-based image viewing
- 💾 Local storage with organized output
- 🔄 Real-time processing
- 📱 Cross-platform support

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/falahgs/gemini-vision-art-studio.git

# Install dependencies
cd gemini-vision-art-studio
npm install
```

### Configuration

1. Project Configuration:
Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_api_key_here
# Set to true if running in a remote environment (no browser preview)
IS_REMOTE=true
```

2. Claude Desktop Configuration:
Add the server configuration to your Claude Desktop config file at `%AppData%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gemini-vision-art-studio": {
      "command": "node",
      "args": [
        "PATH_TO_YOUR_PROJECT\\build\\src\\index.js"
      ],
      "env": {
        "GEMINI_API_KEY": "your_gemini_api_key_here",
        "IS_REMOTE": "true"
      }
    }
  }
}
```

Replace:
- `PATH_TO_YOUR_PROJECT` with your actual project path
- `your_gemini_api_key_here` with your Gemini API key

> 💡 **Note**: On Windows, the config file is typically located at:
> `C:\Users\YourUsername\AppData\Roaming\Claude\claude_desktop_config.json`

### Remote Usage

When running the server remotely:
1. Set `IS_REMOTE=true` in your environment or Claude Desktop configuration
2. The server will:
   - Create necessary directories automatically:
     - `/app/output`: For generated images and previews
     - `/app/temp`: For temporary processing files
   - Skip browser preview attempts
   - Save all files to the `/app/output` directory
   - Return absolute file paths in the response
3. Directory Structure in Remote Mode:
   ```
   /app/
   ├── output/           # Generated images and previews
   │   ├── image1.png
   │   └── image1_preview.html
   └── temp/            # Temporary processing files
   ```

4. Troubleshooting Remote Usage:
   - Ensure the `/app` directory exists and is writable
   - Check the console output for directory creation messages
   - Look for "Image saved to:" messages in the logs
   - File paths in the response will be absolute paths

### Running the Server

1. Build the project:
```bash
npm run build
```

2. The server will be available in Claude Desktop automatically when you:
   - Open Claude Desktop
   - Start a new conversation
   - The tools will appear in the available tools list

## 🛠️ Available Tools

### 1. Generate 3D Cartoon (`generate_3d_cartoon`)

Creates a 3D-style cartoon image from your text description.

```json
{
  "name": "generate_3d_cartoon",
  "arguments": {
    "prompt": "A friendly dragon teaching math to forest animals",
    "fileName": "dragon_teacher"
  }
}
```

### 2. Process Image (`process_image`)

Transforms existing images according to your instructions.

```json
{
  "name": "process_image",
  "arguments": {
    "imagePath": "input/photo.jpg",
    "prompt": "Transform this into a watercolor painting with autumn colors",
    "outputFileName": "watercolor_autumn"
  }
}
```

## 📂 Directory Structure

```
gemini-vision-art-studio/
├── src/               # Source code
├── build/            # Compiled code
├── input/            # Input images
├── output/           # Generated images and previews
├── temp/             # Temporary processing files
└── examples/         # Example usage and images
```

## 🔧 Technical Details

- **Runtime**: Node.js v14+
- **Language**: TypeScript 5.8.3
- **AI Model**: Gemini 2.0 Flash
- **Framework**: Model Context Protocol (MCP) SDK
- **Image Processing**: Google Generative AI

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Falah G. Salieh**
- Copyright © 2025
- GitHub: [@falahgs](https://github.com/falahgs)

## 🙏 Acknowledgments

- Google Gemini AI team for the powerful image generation model
- The MCP SDK team for the excellent tooling
- All contributors and users of this project

---

<p align="center">Made with ❤️ by Falah G. Salieh</p> 