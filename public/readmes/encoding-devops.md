# 🎬 Encoding DevOps MCP Server: AI-Powered Video Encoding Assistant

[![GitHub stars](https://img.shields.io/github/stars/PatrickKalkman/encoding-devops)](https://github.com/PatrickKalkman/encoding-devops/stargazers)
[![GitHub contributors](https://img.shields.io/github/contributors/PatrickKalkman/encoding-devops)](https://github.com/PatrickKalkman/encoding-devops/graphs/contributors)
[![GitHub last commit](https://img.shields.io/github/last-commit/PatrickKalkman/encoding-devops)](https://github.com/PatrickKalkman/encoding-devops)
[![open issues](https://img.shields.io/github/issues/PatrickKalkman/encoding-devops)](https://github.com/PatrickKalkman/encoding-devops/issues)
[![Python Version](https://img.shields.io/badge/python-3.9%2B-blue)](https://www.python.org/downloads/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

Ever been woken up at 3 AM by a failed encoding job? Say goodbye to those late-night troubleshooting sessions! This Model Context Protocol (MCP) server connects Anthropic's Claude directly to your encoding workflow, making video encoding issues a breeze to handle.

## ✨ What's Cool About This?

- **Smart Error Translation**: Turns cryptic "moov atom not found" messages into plain English
- **Real-time Analysis**: Connects directly to your encoding workflow and database
- **Human-Friendly Responses**: Generates clear, actionable solutions for your team
- **Auto-Email Draft**: Creates professional client communications with context
- **Always On Guard**: Monitors your encoding jobs 24/7
- **Keeps You in Control**: Suggests actions but lets you make the final call

## 🚀 Getting Started

### You'll Need

- Python 3.11 or higher
- Claude Desktop
- Your encoding workflow API credentials
- OMDB API key (optional, for movie metadata)

### Quick Setup

1. **Install the package using UV**:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv pip install encoding-devops
```

2. **Set up your environment**:
```bash
# Copy the example config
cp .env.example .env

# Add your API keys
nano .env
```

3. **Register with Claude Desktop**:
```bash
uv run mcp install ./src/encoding_devops/main.py
```

## 💡 How to Use It

```bash
# Start the MCP server
uv run mcp dev ./src/encoding_devops/main.py

# In Claude Desktop, you can now ask things like:
"What's wrong with job XYZ-123?"
"Draft an email about the failed encoding job"
"Check the encoding cluster status"
```

## 🔧 Under the Hood

The MCP server uses three main components to help you:

1. **Resources**: Email templates, error guides, and documentation
2. **Tools**: Job status checks, log analysis, and email drafting
3. **Prompts**: Instructions that help Claude understand encoding issues

## 🤝 Want to Help?

We'd love your input! Here's how you can contribute:

1. Fork it
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request

## 📋 Coming Soon

- Integration with more encoding workflow systems
- Advanced log analysis patterns
- Automated health checks
- Slack notifications
- Custom email templates

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 Thanks To

- Anthropic team for the MCP framework
- All our contributors
- The DevOps community for feedback and suggestions

---

💤 Built by a developer who wanted to sleep through the night. If this helps you too, give us a star!

*Read the full story behind this project in my [Medium article about using MCP to handle encoding fires](https://medium.com/p/dedab6dc182b).*