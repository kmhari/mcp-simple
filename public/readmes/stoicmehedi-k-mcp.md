# K-MCP: Kali Model Context Protocol Server
K-MCP is a powerful API bridge that connects AI assistants (like Claude, GPT, etc.) to a Kali Linux terminal, enabling AI-driven penetration testing, CTF solving, and security research.

## 🔍 Overview

K-MCP extends the capabilities of AI assistants by giving them direct access to the Kali Linux command line. This enables your AI partner to:

- Execute security tools like `nmap`, `gobuster`, `sqlmap`, etc.
- Interact with remote systems via SSH, Evil-WinRM, and similar tools
- Solve CTF challenges in real-time
- Help with machines from HackTheBox or TryHackMe
- Automate repetitive security tasks
- Assist during penetration tests

## 🚀 Key Features

- 🧠 **AI Integration**: Works with Claude Desktop, 5ire, and other MCP-enabled AI interfaces
- 🔧 **Tool Access**: Execute any Kali Linux security tool through a secure API
- 🔄 **Interactive Shell Sessions**: Maintains persistent interactive sessions for SSH, Evil-WinRM, etc.
- 🔍 **Automatic Tool Detection**: Intelligently detects and handles interactive vs. non-interactive tools
- 🔐 **Security Focus**: Purpose-built for penetration testers, CTF players, and security researchers
- 📝 **Session Management**: Track and manage multiple concurrent interactive sessions
- 🌐 **Network Tools Support**: Full support for tools that require continuous network connection

## 📋 Requirements

- Kali Linux or similar security-focused distribution
- Python 3.7+ on both server and client
- An MCP-compatible AI interface (Claude Desktop, 5ire, etc.)
- Network connectivity between the AI client and Kali server

## 🛠️ Installation

### 1. On Your Kali Linux Machine

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/K-MCP.git

# Navigate to project directory
cd K-MCP

#Install necessary dependencies
pip install -r requirements.txt

# Start the Kali server
python3 kali_server.py
```

### 2: On Your Client Machine (Windows/Linux/Mac)

```bash
# Navigate to project directory
cd K-MCP

#Install necessary dependencies
pip install -r requirements.txt

#Edit the mcp_server.py file and change the ip
DEFAULT_KALI_SERVER = "http://XXX.XXX.XX.XX:5000" # change to your linux IP

# Run the MCP client, checking connectionto to your Kali server ( test purposes only ).You don't need to keep running this file.
python mcp_server.py
 
```

### 3. Configure Claude Desktop

Edit `C:\Users\USERNAME\AppData\Roaming\Claude\claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "kali_mcp": {
            "command": "python",
            "args": [
                "E:\\Paste_your_path_to_code\\mcp_server.py"
            ]
        }
    }
}
```

### 4: Run the claude desktop 

### Example Conversations with Claude
### 1. Basic Network Reconnaissance
```
User: Can you help me scan the target 192.168.1.100?

Claude: I'll help you perform a basic network reconnaissance. Let's start with a quick port scan to identify open services.

[Claude executes nmap_scan]
nmap_scan(
    target="192.168.1.100",
    scan_type="-sV",
    ports="1-1000",
    additional_args="-T4"
)

[After receiving results]
I see several open ports. Let's check the web server on port 80 in more detail.

[Claude executes gobuster_scan]
gobuster_scan(
    url="http://192.168.1.100",
    mode="dir",
    wordlist="/usr/share/wordlists/dirb/common.txt",
    additional_args="-x php,html,txt"
)
```

### 2. Web Application Testing
```
User: I found a login page at http://192.168.1.100/login.php. Can you help test it?

Claude: I'll help you test the login page for common vulnerabilities. Let's start with SQL injection testing.

[Claude executes sqlmap_scan]
sqlmap_scan(
    url="http://192.168.1.100/login.php",
    data="username=admin&password=test",
    additional_args="--batch --level=5 --risk=3"
)

[After receiving results]
I see some potential SQL injection points. Let's also check for common directories that might reveal more information.

[Claude executes nikto_scan]
nikto_scan(
    target="http://192.168.1.100",
    additional_args="-h"
)
```

### 3. Windows Machine Enumeration
```
User: I found a Windows machine at 192.168.1.100. Can you help enumerate it?

Claude: I'll help you enumerate the Windows machine using multiple tools. Let's start with a basic Windows enumeration.

[Claude executes enum4linux_scan]
enum4linux_scan(
    target="192.168.1.100",
    additional_args="-a"
)
```

## 💻 Usage Examples

### Running Security Tools

K-MCP lets your AI execute any Kali Linux tool directly:

```
execute_command("nmap -sV -p- 10.10.10.10")
execute_command("gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt")
execute_command("sqlmap -u 'http://target.com/page.php?id=1' --dbs")
```

### Working with Interactive Tools

Interactive tools are automatically detected and handled:

```
execute_command("ssh user@10.10.10.10")
execute_command("evil-winrm -i 10.129.27.195 -u htb-student -p 'Password123!'")
execute_command("mysql -u root -p")
```

The system will:
1. Recognize these as interactive commands
2. Create a persistent session
3. Return a session ID for further interaction

### Interactive Session Management

Once a session is created:

```
# Send a command to the session
interactive_send(session_id="your-session-id", command="whoami")

# Read output without sending a command
interactive_read(session_id="your-session-id")

# Close the session when done
interactive_close(session_id="your-session-id")

# List all active sessions
list_active_sessions()
```

### Using Evil-WinRM Helper

For convenience with Evil-WinRM:

```
evil_winrm_connect(
    ip="10.129.27.195", 
    username="htb-student", 
    password="Password123!"
)
```
## 🔐 Security Considerations

- This tool enables remote command execution on your system
- Only use on secure networks or with proper network isolation
- Consider implementing authentication for the API
- Review all commands before allowing AI to execute them
- Designed for educational and professional security testing - use responsibly

## 🛤️ Advanced Use Cases

K-MCP enables AI to assist with many security tasks:

- **Network Discovery & Enumeration**: Using nmap, enum4linux, and netcat
- **Web Application Testing**: Using gobuster, sqlmap, nikto, etc.
- **Windows Domain Testing**: Using impacket, CrackMapExec, and Evil-WinRM
- **Password Attacks**: Using hydra, john, hashcat, etc.
- **Forensic Analysis**: Using volatility, autopsy, and other tools
- **Exploit Development**: For researching, modifying, and testing exploits
- **CTF Challenges**: For real-time assistance in solving CTF tasks

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs and suggest features
- Submit pull requests
- Improve documentation
- Share usage examples

## ⚠️ Disclaimer

K-MCP is intended solely for educational and authorized testing purposes. Any misuse of the information or tools provided — including unauthorized access, exploitation, or malicious activity — is strictly prohibited. The authors assume no responsibility for misuse.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements
- Special thanks to the Kali Linux team for their amazing security distribution
