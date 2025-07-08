# ExternalAttacker MCP Server

![ExternalAttacker-MCP](/images/ExternalAttacker-MCP-Banner.png)

## Model Context Protocol (MCP) Server for External Attack Surface Management

ExternalAttacker is a powerful integration that brings automated scanning capabilities with natural language interface for comprehensive external attack surface management and reconnaissance.

> 🔍 **Automated Attack Surface Management with AI!**  
> Scan domains, analyze infrastructure, and discover vulnerabilities using natural language.

## 🔍 What is ExternalAttacker?

ExternalAttacker combines the power of:

* **Automated Scanning**: Comprehensive toolset for external reconnaissance
* **Model Context Protocol (MCP)**: An open protocol for creating custom AI tools
* **Natural Language Processing**: Convert plain English queries into scanning commands

## 📱 Community

Join our Telegram channel for updates, tips, and discussion:
- **Telegram**: [https://t.me/root_sec](https://t.me/root_sec)

## ✨ Features

* **Natural Language Interface**: Run scans using plain English
* **Comprehensive Scanning Categories**:
  * 🌐 Subdomain Discovery (subfinder)
  * 🔢 Port Scanning (naabu)
  * 🌍 HTTP Analysis (httpx)
  * 🛡️ CDN Detection (cdncheck)
  * 🔐 TLS Analysis (tlsx)
  * 📁 Directory Fuzzing (ffuf, gobuster)
  * 📝 DNS Enumeration (dnsx)

## 📋 Prerequisites

* Python 3.8 or higher
* Go (for installing tools)
* MCP Client

## 🔧 Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/mordavid/ExternalAttacker-MCP.git
    cd ExternalAttacker
    ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Install required Go tools:
   ```bash
   go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
   go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest
   go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest
   go install -v github.com/projectdiscovery/cdncheck/cmd/cdncheck@latest
   go install -v github.com/projectdiscovery/tlsx/cmd/tlsx@latest
   go install -v github.com/ffuf/ffuf@latest
   go install github.com/OJ/gobuster/v3@latest
   go install -v github.com/projectdiscovery/dnsx/cmd/dnsx@latest
   ```

4. Run ExternalAttacker-App.py
    ```bash
    python ExternalAttacker-App.py
    # Access http://localhost:6991
    ```

5. Configure the MCP Server
    ```bash
    "mcpServers": {
        "ExternalAttacker-MCP": {
            "command": "python",
            "args": [
                "<Your_Path>\\ExternalAttacker-MCP.py"
            ]
        }
    }
    ```

## 🚀 Usage

Example queries you can ask through the MCP:

* "Scan example.com for subdomains"
* "Check open ports on 192.168.1.1"
* "Analyze HTTP services on test.com"
* "Check if domain.com uses a CDN"
* "Analyze SSL configuration of site.com"
* "Fuzz endpoints on target.com"

## 📜 License

MIT License

## 🙏 Acknowledgments

* The ProjectDiscovery team for their excellent security tools
* The MCP community for advancing AI-powered tooling

---

_Note: This is a security tool. Please use responsibly and only on systems you have permission to test._